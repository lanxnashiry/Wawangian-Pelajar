"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { KategoriProduk, Produk } from "@/data/produk";
import { wajibAdmin } from "@/lib/admin/otorisasi";
import { buatSlug, periksaProfilAroma, pisahkanDaftar } from "@/lib/admin/validasi-produk";
import { pesanGalatTautanMarketplace } from "@/lib/marketplace/tautan";
import {
  ambilLokasiFotoProduk,
  susunFotoProduk,
} from "@/lib/admin/foto-produk";

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
  const profilRekomendasiId = String(
    formulir.get("profil_rekomendasi_id") ?? "",
  ).trim();
  const aromaAtas = pisahkanDaftar(formulir.get("aroma_atas"));
  const aromaTengah = pisahkanDaftar(formulir.get("aroma_tengah"));
  const aromaDasar = pisahkanDaftar(formulir.get("aroma_dasar"));
  const karakter = pisahkanDaftar(formulir.get("karakter"));
  const galatMerek = periksaProfilAroma(kategori, [...aromaAtas, ...aromaTengah, ...aromaDasar, ...karakter]);
  if (galatMerek) kembaliDenganPesan(tujuan, galatMerek);

  const nilaiHarga = String(formulir.get("harga") ?? "").trim();
  const harga = Number(nilaiHarga);
  if (!nama || !/^\d+$/.test(nilaiHarga) || !Number.isSafeInteger(harga)) {
    kembaliDenganPesan(tujuan, "Nama dan harga produk tidak valid.");
  }

  if (profilRekomendasiId) {
    const { data: profil, error: galatProfil } = await supabase
      .from("profil_rekomendasi")
      .select("id")
      .eq("id", profilRekomendasiId)
      .eq("aktif", true)
      .maybeSingle();
    if (galatProfil || !profil) {
      kembaliDenganPesan(
        tujuan,
        "Profil rekomendasi tidak tersedia atau sudah dinonaktifkan.",
      );
    }
  }

  const linkShopee = String(formulir.get("link_shopee") ?? "").trim();
  const linkTiktok = String(formulir.get("link_tiktok") ?? "").trim();
  const galatTautan =
    pesanGalatTautanMarketplace("shopee", linkShopee) ??
    pesanGalatTautanMarketplace("tiktok", linkTiktok);
  if (galatTautan) kembaliDenganPesan(tujuan, galatTautan);

  const fotoBaru = formulir
    .getAll("foto")
    .filter((nilai): nilai is File => nilai instanceof File && nilai.size > 0);
  if (fotoBaru.length > 4) {
    kembaliDenganPesan(tujuan, "Maksimal 4 foto dapat dipilih sekaligus.");
  }
  if (
    fotoBaru.some(
      (foto) =>
        foto.size > 5 * 1024 * 1024 ||
        !["image/jpeg", "image/png", "image/webp"].includes(foto.type),
    )
  ) {
    kembaliDenganPesan(
      tujuan,
      "Setiap foto harus berformat JPEG, PNG, atau WebP dan berukuran maksimal 5 MB.",
    );
  }

  let fotoTersimpan: string[] = [];
  try {
    const hasilFotoTersimpan = JSON.parse(String(formulir.get("foto_tersimpan") ?? "[]"));
    fotoTersimpan = Array.isArray(hasilFotoTersimpan)
      ? hasilFotoTersimpan
          .filter((nilai): nilai is string => typeof nilai === "string")
          .slice(0, 4)
      : [];
  } catch {
    fotoTersimpan = [];
  }

  const { data: produkSebelumnya } = id
    ? await supabase.from("produk").select("foto").eq("id", id).maybeSingle()
    : { data: null };
  const fotoSebelumnya = Array.isArray(produkSebelumnya?.foto)
    ? produkSebelumnya.foto.filter((nilai): nilai is string => typeof nilai === "string")
    : [];
  fotoTersimpan = fotoTersimpan.filter((url) => fotoSebelumnya.includes(url));

  if (fotoTersimpan.length + fotoBaru.length > 4) {
    kembaliDenganPesan(tujuan, "Jumlah foto tersimpan dan foto baru tidak boleh melebihi 4.");
  }

  const slug = buatSlug(String(formulir.get("slug") ?? "") || nama);
  const muatan = {
    nama,
    slug,
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
    foto: fotoBaru.length > 0 ? fotoSebelumnya : fotoTersimpan,
    link_shopee: linkShopee || null,
    link_tiktok: linkTiktok || null,
    unggulan: formulir.get("unggulan") === "on",
    tersedia: formulir.get("tersedia") === "on",
    aktif: formulir.get("aktif") === "on",
    warna: String(formulir.get("warna") ?? "tosca") as Produk["warna"],
    profil_rekomendasi_id: profilRekomendasiId || null,
  };

  const hasil = id
    ? await supabase.from("produk").update(muatan).eq("id", id).select("id").single()
    : await supabase.from("produk").insert(muatan).select("id").single();
  if (hasil.error || !hasil.data) {
    kembaliDenganPesan(
      tujuan,
      hasil.error?.code === "23505"
        ? "Slug sudah dipakai produk lain. Gunakan slug yang berbeda."
        : "Produk gagal disimpan. Periksa kembali data lalu coba lagi.",
    );
  }

  const urlFotoBaru: string[] = [];
  const lokasiFotoBaru: string[] = [];
  const ekstensiPerTipe: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };
  for (const foto of fotoBaru) {
    const lokasi = `${hasil.data.id}/${crypto.randomUUID()}.${ekstensiPerTipe[foto.type]}`;
    const unggah = await supabase.storage
      .from("produk")
      .upload(lokasi, foto, { contentType: foto.type });
    if (unggah.error) {
      if (lokasiFotoBaru.length > 0) {
        await supabase.storage.from("produk").remove(lokasiFotoBaru);
      }
      kembaliDenganPesan(
        `/admin/produk/${hasil.data.id}`,
        `Produk tersimpan, tetapi foto gagal diunggah: ${unggah.error.message}`,
      );
    }
    lokasiFotoBaru.push(lokasi);
    const { data: url } = supabase.storage.from("produk").getPublicUrl(lokasi);
    urlFotoBaru.push(url.publicUrl);
  }

  const fotoAkhir = susunFotoProduk(fotoTersimpan, urlFotoBaru);
  const pembaruanFoto = await supabase
    .from("produk")
    .update({ foto: fotoAkhir })
    .eq("id", hasil.data.id);
  if (pembaruanFoto.error) {
    if (lokasiFotoBaru.length > 0) {
      await supabase.storage.from("produk").remove(lokasiFotoBaru);
    }
    kembaliDenganPesan(
      `/admin/produk/${hasil.data.id}`,
      "Produk tersimpan, tetapi galeri foto gagal diperbarui. Foto lama tetap aman.",
    );
  }

  const kandidatFotoDihapus = fotoSebelumnya.filter(
    (url) => !fotoAkhir.includes(url),
  );
  const lokasiFotoDihapus: string[] = [];
  for (const url of kandidatFotoDihapus) {
    const lokasi = ambilLokasiFotoProduk(url);
    if (!lokasi) continue;
    const { count } = await supabase
      .from("produk")
      .select("id", { count: "exact", head: true })
      .neq("id", hasil.data.id)
      .contains("foto", [url]);
    if ((count ?? 0) === 0) lokasiFotoDihapus.push(lokasi);
  }
  if (lokasiFotoDihapus.length > 0) {
    await supabase.storage.from("produk").remove(lokasiFotoDihapus);
  }

  revalidatePath("/");
  revalidatePath("/katalog");
  revalidatePath("/temukan");
  revalidatePath(`/produk/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/produk");
  revalidatePath("/admin/profil-rekomendasi");
  redirect("/admin/produk?pesan=Produk+berhasil+disimpan");
}

export async function nonaktifkanProduk(formulir: FormData) {
  const { supabase } = await wajibAdmin();
  const id = String(formulir.get("id") ?? "");
  if (id) await supabase.from("produk").update({ aktif: false }).eq("id", id);
  revalidatePath("/"); revalidatePath("/katalog"); revalidatePath("/admin/produk");
  redirect("/admin/produk?pesan=Produk+dinonaktifkan");
}
