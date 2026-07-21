"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { BagianArtikel, KategoriArtikel } from "@/data/artikel";
import { buatSlug } from "@/lib/admin/validasi-produk";
import { wajibAdmin } from "@/lib/admin/otorisasi";

function ubahTeksMenjadiBagian(teks: string): BagianArtikel[] {
  const blok = teks.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean);
  const bagian: BagianArtikel[] = [];
  for (const item of blok) {
    if (item.startsWith("## ")) bagian.push({ judul: item.slice(3).trim(), paragraf: [] });
    else if (bagian.length) bagian[bagian.length - 1].paragraf.push(item);
    else bagian.push({ paragraf: [item] });
  }
  return bagian.filter((item) => item.judul || item.paragraf.length);
}

function kembali(tujuan: string, pesan: string): never {
  const aman = tujuan.startsWith("/admin/konten") ? tujuan : "/admin/konten";
  redirect(`${aman}?pesan=${encodeURIComponent(pesan)}`);
}

export async function simpanArtikel(formulir: FormData) {
  const { supabase } = await wajibAdmin();
  const id = String(formulir.get("id") ?? "");
  const tujuan = String(formulir.get("tujuan_kembali") ?? "/admin/konten");
  const judul = String(formulir.get("judul") ?? "").trim();
  const isi = String(formulir.get("isi") ?? "").trim();
  const menitBaca = Number(formulir.get("menit_baca"));
  if (judul.length < 5 || !isi || !Number.isInteger(menitBaca) || menitBaca < 1) kembali(tujuan, "Judul, isi, atau waktu baca tidak valid.");

  const muatan = {
    judul,
    slug: buatSlug(String(formulir.get("slug") ?? "") || judul),
    kategori: String(formulir.get("kategori") ?? "edukasi") as KategoriArtikel,
    cuplikan: String(formulir.get("cuplikan") ?? "").trim(),
    bagian: ubahTeksMenjadiBagian(isi),
    foto_utama: String(formulir.get("foto_tersimpan") ?? "").trim() || null,
    warna: String(formulir.get("warna") ?? "tosca"),
    menit_baca: menitBaca,
    share_aktif: formulir.get("share_aktif") === "on",
    status: String(formulir.get("status") ?? "draft"),
    penulis: String(formulir.get("penulis") ?? "Wawangian Pelajar").trim(),
  };
  const hasil = id
    ? await supabase.from("artikel").update(muatan).eq("id", id).select("id").single()
    : await supabase.from("artikel").insert(muatan).select("id").single();
  if (hasil.error || !hasil.data) kembali(tujuan, hasil.error?.message ?? "Artikel gagal disimpan.");

  const foto = formulir.get("foto");
  if (foto instanceof File && foto.size > 0) {
    if (foto.size > 5 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(foto.type)) kembali(`/admin/konten/${hasil.data.id}`, "Artikel tersimpan, tetapi gambar harus JPEG/PNG/WebP maksimal 5 MB.");
    const ekstensi = foto.name.split(".").pop()?.toLowerCase() || "jpg";
    const lokasi = `${hasil.data.id}/${crypto.randomUUID()}.${ekstensi}`;
    const unggah = await supabase.storage.from("artikel").upload(lokasi, foto, { contentType: foto.type });
    if (unggah.error) kembali(`/admin/konten/${hasil.data.id}`, `Artikel tersimpan, tetapi gambar gagal diunggah: ${unggah.error.message}`);
    const { data: url } = supabase.storage.from("artikel").getPublicUrl(lokasi);
    await supabase.from("artikel").update({ foto_utama: url.publicUrl }).eq("id", hasil.data.id);
  }

  revalidatePath("/"); revalidatePath("/cerita"); revalidatePath("/admin"); revalidatePath("/admin/konten");
  redirect(`/admin/konten/${hasil.data.id}?pesan=Artikel+berhasil+disimpan`);
}

export async function hapusArtikel(formulir: FormData) {
  const { supabase } = await wajibAdmin();
  const id = String(formulir.get("id") ?? "");
  if (id) await supabase.from("artikel").delete().eq("id", id);
  revalidatePath("/"); revalidatePath("/cerita"); revalidatePath("/admin/konten");
  redirect("/admin/konten?pesan=Artikel+dihapus");
}
