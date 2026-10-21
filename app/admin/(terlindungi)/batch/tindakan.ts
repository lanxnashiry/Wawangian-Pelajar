"use server";

import { wajibAdmin } from "@/lib/admin/otorisasi";
import { normalisasiKodeBatch, type StatusBatch, validasiBatch, validasiTransisiStatus } from "@/lib/batch/validasi";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const STATUS: readonly StatusBatch[] = ["draft", "diedarkan", "ditarik", "nonaktif"];

function urlKembali(id: string, form: FormData, pesan: string) {
  const query = new URLSearchParams({ pesan });
  for (const nama of ["kode_batch", "produk_id", "tanggal_produksi", "kode_formula", "catatan_internal", "keterangan_publik", "status_tujuan", "alasan_status"]) {
    const nilai = String(form.get(nama) ?? "");
    if (nilai && nilai.length <= 2000) query.set(nama, nilai);
  }
  return `${id ? `/admin/batch/${encodeURIComponent(id)}` : "/admin/batch/baru"}?${query}`;
}

export async function simpanBatch(form: FormData) {
  const { supabase } = await wajibAdmin();
  const id = String(form.get("id") ?? "");
  const data = {
    kodeBatch: String(form.get("kode_batch") ?? ""),
    produkId: String(form.get("produk_id") ?? ""),
    tanggalProduksi: String(form.get("tanggal_produksi") ?? ""),
    kodeFormula: String(form.get("kode_formula") ?? ""),
    catatanInternal: String(form.get("catatan_internal") ?? ""),
    keteranganPublik: String(form.get("keterangan_publik") ?? ""),
  };
  const galat = validasiBatch(data);
  if (Object.keys(galat).length) redirect(urlKembali(id, form, Object.values(galat)[0]!));

  const statusTujuan = String(form.get("aksi")) === "draft" ? "draft" : String(form.get("status_tujuan") ?? "diedarkan");
  if (!STATUS.includes(statusTujuan as StatusBatch)) redirect(urlKembali(id, form, "Status tujuan tidak valid."));
  const alasan = String(form.get("alasan_status") ?? "");
  const konfirmasiTerbit = form.get("konfirmasi_terbit") === "ya";

  if (statusTujuan === "diedarkan" && (!id || String(form.get("aksi")) !== "draft") && !konfirmasiTerbit) {
    const { data: lama } = id
      ? await supabase.from("batch_produksi").select("status").eq("id", id).maybeSingle()
      : { data: null };
    if (!lama || lama.status === "draft") {
      redirect(urlKembali(id, form, "Konfirmasi varian, kode batch, dan tanggal sebelum menerbitkan."));
    }
  }

  if (id) {
    const { data: lama, error } = await supabase.from("batch_produksi").select("status").eq("id", id).single();
    if (error || !lama || !STATUS.includes(lama.status)) redirect(urlKembali(id, form, "Batch gagal dimuat. Coba lagi."));
    if (lama.status !== statusTujuan) {
      const pesan = validasiTransisiStatus(lama.status, statusTujuan as StatusBatch, alasan, data.keteranganPublik);
      if (pesan) redirect(urlKembali(id, form, pesan));
    }
  } else if (!(["draft", "diedarkan"] as string[]).includes(statusTujuan)) {
    redirect(urlKembali(id, form, "Status awal tidak valid."));
  }

  const { error } = await supabase.rpc("simpan_batch", {
    p_id: id || null,
    p_kode: normalisasiKodeBatch(data.kodeBatch),
    p_produk: data.produkId,
    p_tanggal: data.tanggalProduksi,
    p_formula: data.kodeFormula,
    p_catatan: data.catatanInternal,
    p_publik: data.keteranganPublik,
    p_status: statusTujuan,
    p_versi: Number(form.get("versi") ?? 1),
    p_alasan: alasan,
    p_konfirmasi_terbit: konfirmasiTerbit,
  });
  if (error) {
    const pesan = error.code === "40001" ? "Konflik versi. Muat ulang data."
      : error.code === "23505" ? "Kode batch sudah dipakai."
      : "Batch gagal disimpan. Periksa data dan coba lagi.";
    redirect(urlKembali(id, form, pesan));
  }
  revalidatePath("/admin/batch");
  revalidatePath(`/batch/${normalisasiKodeBatch(data.kodeBatch)}`);
  redirect("/admin/batch?pesan=Batch+berhasil+disimpan");
}
