"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { wajibAdmin } from "@/lib/admin/otorisasi";

function kembali(tujuan: string, pesan: string): never {
  const aman = tujuan.startsWith("/admin/donasi") ? tujuan : "/admin/donasi";
  redirect(`${aman}?pesan=${encodeURIComponent(pesan)}`);
}

function perbaruiHalamanDonasi() {
  revalidatePath("/");
  revalidatePath("/donasi");
  revalidatePath("/admin");
  revalidatePath("/admin/donasi");
}

export async function simpanRekapDonasi(formulir: FormData) {
  const { supabase } = await wajibAdmin();
  const periodeMulai = String(formulir.get("periode_mulai") ?? "");
  const periodeSelesai = String(formulir.get("periode_selesai") ?? "");
  const sumber = String(formulir.get("sumber") ?? "");
  const untungBersih = Number(formulir.get("untung_bersih"));
  const catatanMetode = String(formulir.get("catatan_metode") ?? "").trim();

  if (!periodeMulai || !periodeSelesai || periodeSelesai < periodeMulai) {
    kembali("/admin/donasi/rekap", "Periode rekap tidak valid.");
  }
  if (!["shopee", "tiktok", "gabungan"].includes(sumber)) {
    kembali("/admin/donasi/rekap", "Sumber rekap tidak valid.");
  }
  if (!Number.isSafeInteger(untungBersih) || untungBersih < 0 || catatanMetode.length < 10) {
    kembali("/admin/donasi/rekap", "Untung bersih atau catatan metode tidak valid.");
  }

  const { error } = await supabase.from("rekap_donasi").insert({
    periode_mulai: periodeMulai,
    periode_selesai: periodeSelesai,
    sumber,
    untung_bersih: untungBersih,
    persentase: 20,
    catatan_metode: catatanMetode,
  });
  if (error) kembali("/admin/donasi/rekap", error.message);

  perbaruiHalamanDonasi();
  revalidatePath("/admin/log");
  redirect("/admin/donasi/rekap?pesan=Rekap+berhasil+disimpan+dan+donasi+dihitung+otomatis");
}

export async function simpanPenyaluranDonasi(formulir: FormData) {
  const { supabase } = await wajibAdmin();
  const idTersimpan = String(formulir.get("id") ?? "");
  const id = idTersimpan || crypto.randomUUID();
  const tujuanKembali = idTersimpan ? `/admin/donasi/penyaluran/${id}` : "/admin/donasi/penyaluran";
  const tanggal = String(formulir.get("tanggal") ?? "");
  const jumlah = Number(formulir.get("jumlah"));
  const penerimaNama = String(formulir.get("penerima_nama") ?? "").trim();
  const penerimaJenis = String(formulir.get("penerima_jenis") ?? "");
  const tujuanDeskripsi = String(formulir.get("tujuan_deskripsi") ?? "").trim();
  const status = String(formulir.get("status") ?? "draft");
  const artikelId = String(formulir.get("artikel_id") ?? "").trim() || null;

  if (!tanggal || !Number.isSafeInteger(jumlah) || jumlah <= 0) kembali(tujuanKembali, "Tanggal atau jumlah penyaluran tidak valid.");
  if (penerimaNama.length < 3 || tujuanDeskripsi.length < 10) kembali(tujuanKembali, "Penerima atau tujuan penyaluran belum lengkap.");
  if (!["pelajar", "mahasiswa", "guru", "lembaga"].includes(penerimaJenis)) kembali(tujuanKembali, "Jenis penerima tidak valid.");
  if (!["draft", "terpublikasi"].includes(status)) kembali(tujuanKembali, "Status penyaluran tidak valid.");

  let buktiTersimpan: string[] = [];
  try { buktiTersimpan = JSON.parse(String(formulir.get("bukti_tersimpan") ?? "[]")); } catch { buktiTersimpan = []; }

  const buktiBaru = formulir.get("bukti");
  let lokasiBuktiBaru: string | null = null;
  if (buktiBaru instanceof File && buktiBaru.size > 0) {
    if (buktiBaru.size > 5 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(buktiBaru.type)) {
      kembali(tujuanKembali, "Bukti harus berupa JPEG, PNG, atau WebP maksimal 5 MB.");
    }
    const ekstensi = buktiBaru.name.split(".").pop()?.toLowerCase() || "jpg";
    lokasiBuktiBaru = `${id}/${crypto.randomUUID()}.${ekstensi}`;
    const { error: galatUnggah } = await supabase.storage.from("bukti-donasi").upload(lokasiBuktiBaru, buktiBaru, { contentType: buktiBaru.type });
    if (galatUnggah) kembali(tujuanKembali, `Bukti gagal diunggah: ${galatUnggah.message}`);
    const { data: urlBukti } = supabase.storage.from("bukti-donasi").getPublicUrl(lokasiBuktiBaru);
    buktiTersimpan = [...buktiTersimpan, urlBukti.publicUrl];
  }

  if (status === "terpublikasi" && buktiTersimpan.length === 0) {
    if (lokasiBuktiBaru) await supabase.storage.from("bukti-donasi").remove([lokasiBuktiBaru]);
    kembali(tujuanKembali, "Penyaluran tanpa bukti hanya dapat disimpan sebagai draft.");
  }

  const muatan = { tanggal, jumlah, penerima_nama: penerimaNama, penerima_jenis: penerimaJenis, tujuan_deskripsi: tujuanDeskripsi, bukti: buktiTersimpan, artikel_id: artikelId, status };
  const hasil = idTersimpan
    ? await supabase.from("penyaluran_donasi").update(muatan).eq("id", id).select("id").single()
    : await supabase.from("penyaluran_donasi").insert({ id, ...muatan }).select("id").single();

  if (hasil.error || !hasil.data) {
    if (lokasiBuktiBaru) await supabase.storage.from("bukti-donasi").remove([lokasiBuktiBaru]);
    kembali(tujuanKembali, hasil.error?.message ?? "Penyaluran gagal disimpan.");
  }

  perbaruiHalamanDonasi();
  revalidatePath(`/donasi/${id}`);
  revalidatePath("/admin/donasi/penyaluran");
  revalidatePath("/admin/log");
  redirect(`/admin/donasi/penyaluran/${id}?pesan=Penyaluran+berhasil+disimpan`);
}
