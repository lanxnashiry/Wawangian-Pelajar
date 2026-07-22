"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { bacaLaporanAfiliasiCsv, normalisasiHandle } from "@/lib/afiliasi/csv";
import { wajibAdmin } from "@/lib/admin/otorisasi";

function kembali(pesan: string): never {
  redirect(`/admin/afiliasi?pesan=${encodeURIComponent(pesan)}`);
}

function perbaruiHalamanAfiliasi() {
  revalidatePath("/admin/afiliasi");
  revalidatePath("/admin/log");
  revalidatePath("/afiliasi/dashboard");
  revalidatePath("/afiliasi/materi");
  revalidatePath("/afiliasi/leaderboard");
}

export async function ubahStatusAfiliasi(formulir: FormData) {
  const { supabase, pengguna } = await wajibAdmin();
  const id = String(formulir.get("id") ?? "");
  const status = String(formulir.get("status") ?? "");
  const alasan = String(formulir.get("alasan_status") ?? "").trim();
  if (!id || !["aktif", "nonaktif", "menunggu"].includes(status)) kembali("Status afiliasi tidak valid.");
  if (status === "nonaktif" && alasan.length < 5) kembali("Alasan penonaktifan minimal 5 karakter.");

  const { error } = await supabase.from("afiliasi").update({
    status,
    alasan_status: alasan || null,
    diverifikasi_oleh: status === "menunggu" ? null : pengguna.id,
    diverifikasi_pada: status === "menunggu" ? null : new Date().toISOString(),
  }).eq("id", id);
  if (error) kembali(error.message);
  perbaruiHalamanAfiliasi();
  kembali(`Status afiliasi berhasil diubah menjadi ${status}.`);
}

export async function perbaruiHandleAfiliasi(formulir: FormData) {
  const { supabase } = await wajibAdmin();
  const id = String(formulir.get("id") ?? "");
  const handleTiktok = normalisasiHandle(String(formulir.get("handle_tiktok") ?? ""));
  const handleShopee = normalisasiHandle(String(formulir.get("handle_shopee") ?? ""));
  if (!id || (!handleTiktok && !handleShopee)) kembali("Minimal satu handle marketplace wajib tersedia.");
  if ((handleTiktok && !/^[a-z0-9._-]{2,60}$/.test(handleTiktok)) || (handleShopee && !/^[a-z0-9._-]{2,60}$/.test(handleShopee))) {
    kembali("Format handle marketplace tidak valid.");
  }

  const { error } = await supabase.from("afiliasi").update({
    handle_tiktok: handleTiktok || null,
    handle_shopee: handleShopee || null,
  }).eq("id", id);
  if (error) kembali(error.message);
  perbaruiHalamanAfiliasi();
  kembali("Handle afiliasi berhasil diperbarui dan siap diverifikasi.");
}

export async function simpanTingkatBonus(formulir: FormData) {
  const { supabase } = await wajibAdmin();
  const nama = String(formulir.get("nama") ?? "").trim();
  const minimalPcs = Number(formulir.get("minimal_pcs"));
  const bonusPerPcs = Number(formulir.get("bonus_per_pcs"));
  if (nama.length < 3 || nama.length > 40) kembali("Nama tingkat harus terdiri dari 3–40 karakter.");
  if (!Number.isSafeInteger(minimalPcs) || minimalPcs < 1) kembali("Minimal pcs harus bilangan bulat positif.");
  if (!Number.isSafeInteger(bonusPerPcs) || bonusPerPcs < 0) kembali("Bonus per pcs tidak valid.");

  const { error } = await supabase.from("tingkat_bonus_afiliasi").insert({ nama, minimal_pcs: minimalPcs, bonus_per_pcs: bonusPerPcs });
  if (error) kembali(error.message);
  perbaruiHalamanAfiliasi();
  kembali("Tingkat bonus berhasil disimpan.");
}

export async function ubahKeaktifanTingkat(formulir: FormData) {
  const { supabase } = await wajibAdmin();
  const id = String(formulir.get("id") ?? "");
  const aktif = String(formulir.get("aktif") ?? "") === "true";
  const { error } = await supabase.from("tingkat_bonus_afiliasi").update({ aktif }).eq("id", id);
  if (error) kembali(error.message);
  perbaruiHalamanAfiliasi();
  kembali(`Tingkat bonus berhasil ${aktif ? "diaktifkan" : "dinonaktifkan"}.`);
}

export async function unggahLaporanAfiliasi(formulir: FormData) {
  const { supabase } = await wajibAdmin();
  const platform = String(formulir.get("platform") ?? "");
  const periodeMulai = String(formulir.get("periode_mulai") ?? "");
  const periodeSelesai = String(formulir.get("periode_selesai") ?? "");
  const berkas = formulir.get("laporan");
  if (!["shopee", "tiktok"].includes(platform)) kembali("Platform laporan tidak valid.");
  if (!periodeMulai || !periodeSelesai || periodeSelesai < periodeMulai) kembali("Periode laporan tidak valid.");
  if (!(berkas instanceof File) || berkas.size === 0) kembali("Berkas CSV wajib dipilih.");
  if (berkas.size > 2 * 1024 * 1024 || !berkas.name.toLowerCase().endsWith(".csv")) kembali("Laporan wajib berupa CSV maksimal 2 MB.");

  let baris;
  try {
    baris = bacaLaporanAfiliasiCsv(await berkas.text());
  } catch (galat) {
    kembali(galat instanceof Error ? galat.message : "Laporan CSV tidak dapat dibaca.");
  }

  const lokasi = `${platform}/${periodeMulai}-${periodeSelesai}-${crypto.randomUUID()}.csv`;
  const { error: galatUnggah } = await supabase.storage.from("laporan-afiliasi").upload(lokasi, berkas, { contentType: "text/csv" });
  if (galatUnggah) kembali(`Laporan gagal diunggah: ${galatUnggah.message}`);

  const namaBerkas = berkas.name.replace(/[^A-Za-z0-9._ -]/g, "_").slice(0, 120);
  const { error } = await supabase.rpc("proses_laporan_afiliasi", {
    platform_baru: platform,
    periode_mulai_baru: periodeMulai,
    periode_selesai_baru: periodeSelesai,
    nama_berkas_baru: namaBerkas,
    lokasi_berkas_baru: lokasi,
    baris_baru: baris.map((item) => ({ handle: item.handle, jumlah_pcs: item.jumlahPcs })),
  });
  if (error) {
    await supabase.storage.from("laporan-afiliasi").remove([lokasi]);
    kembali(error.message);
  }

  perbaruiHalamanAfiliasi();
  kembali(`Laporan berhasil diproses: ${baris.length} handle unik.`);
}

export async function tandaiBonusDibayar(formulir: FormData) {
  const { supabase } = await wajibAdmin();
  const id = String(formulir.get("id") ?? "");
  const bukti = formulir.get("bukti_transfer");
  if (!id || !(bukti instanceof File) || bukti.size === 0) kembali("Bukti transfer wajib dipilih.");
  const tipeBoleh = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
  if (bukti.size > 5 * 1024 * 1024 || !tipeBoleh.includes(bukti.type)) kembali("Bukti harus berupa JPEG, PNG, WebP, atau PDF maksimal 5 MB.");

  const { data: bonus } = await supabase.from("bonus_afiliasi").select("id,bonus_dihitung,status_cocok,status_payout").eq("id", id).maybeSingle();
  if (!bonus || bonus.status_cocok !== "cocok" || Number(bonus.bonus_dihitung) <= 0 || bonus.status_payout === "dibayar") kembali("Bonus belum memenuhi syarat pembayaran.");

  const ekstensi = bukti.name.split(".").pop()?.toLowerCase() || "bin";
  const lokasi = `${id}/${crypto.randomUUID()}.${ekstensi}`;
  const { error: galatUnggah } = await supabase.storage.from("bukti-bonus-afiliasi").upload(lokasi, bukti, { contentType: bukti.type });
  if (galatUnggah) kembali(`Bukti gagal diunggah: ${galatUnggah.message}`);

  const { error } = await supabase.from("bonus_afiliasi").update({ status_payout: "dibayar", bukti_transfer: lokasi, dibayar_pada: new Date().toISOString() }).eq("id", id);
  if (error) {
    await supabase.storage.from("bukti-bonus-afiliasi").remove([lokasi]);
    kembali(error.message);
  }
  perbaruiHalamanAfiliasi();
  kembali("Bonus ditandai dibayar dan bukti transfer tersimpan privat.");
}

export async function simpanMateriPromosi(formulir: FormData) {
  const { supabase } = await wajibAdmin();
  const tipe = String(formulir.get("tipe") ?? "");
  const judul = String(formulir.get("judul") ?? "").trim();
  const deskripsi = String(formulir.get("deskripsi") ?? "").trim();
  const isiTeks = String(formulir.get("isi_teks") ?? "").trim();
  const berkas = formulir.get("berkas");
  if (!["story", "caption", "skrip"].includes(tipe)) kembali("Tipe materi tidak valid.");
  if (judul.length < 3 || judul.length > 100 || deskripsi.length < 10 || deskripsi.length > 300) kembali("Judul atau deskripsi materi belum lengkap.");

  let lokasi: string | null = null;
  if (berkas instanceof File && berkas.size > 0) {
    const tipeBoleh = ["image/jpeg", "image/png", "image/webp", "application/pdf", "text/plain"];
    if (berkas.size > 10 * 1024 * 1024 || !tipeBoleh.includes(berkas.type)) kembali("Materi harus berupa gambar, PDF, atau teks maksimal 10 MB.");
    const ekstensi = berkas.name.split(".").pop()?.toLowerCase() || "bin";
    lokasi = `${tipe}/${crypto.randomUUID()}.${ekstensi}`;
    const { error } = await supabase.storage.from("materi-afiliasi").upload(lokasi, berkas, { contentType: berkas.type });
    if (error) kembali(`Materi gagal diunggah: ${error.message}`);
  }
  if (!isiTeks && !lokasi) kembali("Isi teks atau berkas materi wajib tersedia.");

  const { error } = await supabase.from("materi_promosi").insert({ tipe, judul, deskripsi, isi_teks: isiTeks || null, lokasi_berkas: lokasi });
  if (error) {
    if (lokasi) await supabase.storage.from("materi-afiliasi").remove([lokasi]);
    kembali(error.message);
  }
  perbaruiHalamanAfiliasi();
  kembali("Materi promosi berhasil disimpan.");
}

export async function ubahKeaktifanMateri(formulir: FormData) {
  const { supabase } = await wajibAdmin();
  const id = String(formulir.get("id") ?? "");
  const aktif = String(formulir.get("aktif") ?? "") === "true";
  const { error } = await supabase.from("materi_promosi").update({ aktif }).eq("id", id);
  if (error) kembali(error.message);
  perbaruiHalamanAfiliasi();
  kembali(`Materi berhasil ${aktif ? "diaktifkan" : "dinonaktifkan"}.`);
}
