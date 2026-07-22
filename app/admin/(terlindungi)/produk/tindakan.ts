"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { KategoriProduk, Produk } from "@/data/produk";
import { wajibAdmin } from "@/lib/admin/otorisasi";
import { buatSlug, periksaProfilAroma, pisahkanDaftar } from "@/lib/admin/validasi-produk";
import { pesanGalatTautanMarketplace } from "@/lib/marketplace/tautan";

function kembaliDenganPesan(tujuan: string, pesan: string): never {
  const aman = tujuan.startsWith("/admin/produk") ? tujuan : "/admin/produk";
  redirect(`${aman}?pesan=${encodeURIComponent(pesan)}`);
}

export async function simpanProduk(formulir: FormData) {
  const { supabase } = await wajibAdmin();
  const id = String(formulir.get("id") ?? "");
  const tujuan = String(formulir.get("tujuan_kembali") ?? "/admin/produk");
  const nama = String(formulir.get("nama") ?? "").trim();
  const kategori = String(formulir.get("kategori") ?? "") as KategoriProduk;
  const aromaAtas = pisahkanDaftar(formulir.get("aroma_atas"));
  const aromaTengah = pisahkanDaftar(formulir.get("aroma_tengah"));
  const aromaDasar = pisahkanDaftar(formulir.get("aroma_dasar"));
  const karakter = pisahkanDaftar(formulir.get("karakter"));
  const galatMerek = periksaProfilAroma(kategori, [...aromaAtas, ...aromaTengah, ...aromaDasar, ...karakter]);
  if (galatMerek) kembaliDenganPesan(tujuan, galatMerek);

  const harga = Number(formulir.get("harga"));
  if (!nama || !Number.isFinite(harga) || harga < 0) kembaliDenganPesan(tujuan, "Nama dan harga produk tidak valid.");

  const linkShopee = String(formulir.get("link_shopee") ?? "").trim();
  const linkTiktok = String(formulir.get("link_tiktok") ?? "").trim();
  const galatTautan =
    pesanGalatTautanMarketplace("shopee", linkShopee) ??
    pesanGalatTautanMarketplace("tiktok", linkTiktok);
  if (galatTautan) kembaliDenganPesan(tujuan, galatTautan);

  let fotoTersimpan: string[] = [];
  try { fotoTersimpan = JSON.parse(String(formulir.get("foto_tersimpan") ?? "[]")); } catch { fotoTersimpan = []; }
  const muatan = {
    nama,
    slug: buatSlug(String(formulir.get("slug") ?? "") || nama),
    kategori,
    ukuran: String(formulir.get("ukuran") ?? "").trim(),
    harga,
    ringkasan: String(formulir.get("ringkasan") ?? "").trim(),
    deskripsi: String(formulir.get("deskripsi") ?? "").trim(),
    aroma_atas: aromaAtas,
    aroma_tengah: aromaTengah,
    aroma_dasar: aromaDasar,
    karakter,
    cocok_untuk: pisahkanDaftar(formulir.get("cocok_untuk")),
    foto: fotoTersimpan,
    link_shopee: linkShopee || null,
    link_tiktok: linkTiktok || null,
    unggulan: formulir.get("unggulan") === "on",
    tersedia: formulir.get("tersedia") === "on",
    aktif: formulir.get("aktif") === "on",
    warna: String(formulir.get("warna") ?? "tosca") as Produk["warna"],
  };

  const hasil = id
    ? await supabase.from("produk").update(muatan).eq("id", id).select("id").single()
    : await supabase.from("produk").insert(muatan).select("id").single();
  if (hasil.error || !hasil.data) kembaliDenganPesan(tujuan, hasil.error?.message ?? "Produk gagal disimpan.");

  const foto = formulir.get("foto");
  if (foto instanceof File && foto.size > 0) {
    if (foto.size > 5 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(foto.type)) {
      kembaliDenganPesan(`/admin/produk/${hasil.data.id}`, "Produk tersimpan, tetapi foto harus JPEG/PNG/WebP maksimal 5 MB.");
    }
    const ekstensi = foto.name.split(".").pop()?.toLowerCase() || "jpg";
    const lokasi = `${hasil.data.id}/${crypto.randomUUID()}.${ekstensi}`;
    const unggah = await supabase.storage.from("produk").upload(lokasi, foto, { contentType: foto.type });
    if (unggah.error) kembaliDenganPesan(`/admin/produk/${hasil.data.id}`, `Produk tersimpan, tetapi foto gagal diunggah: ${unggah.error.message}`);
    const { data: url } = supabase.storage.from("produk").getPublicUrl(lokasi);
    await supabase.from("produk").update({ foto: [...fotoTersimpan, url.publicUrl] }).eq("id", hasil.data.id);
  }

  revalidatePath("/"); revalidatePath("/katalog"); revalidatePath("/admin"); revalidatePath("/admin/produk");
  redirect(`/admin/produk/${hasil.data.id}?pesan=Produk+berhasil+disimpan`);
}

export async function nonaktifkanProduk(formulir: FormData) {
  const { supabase } = await wajibAdmin();
  const id = String(formulir.get("id") ?? "");
  if (id) await supabase.from("produk").update({ aktif: false }).eq("id", id);
  revalidatePath("/"); revalidatePath("/katalog"); revalidatePath("/admin/produk");
  redirect("/admin/produk?pesan=Produk+dinonaktifkan");
}
