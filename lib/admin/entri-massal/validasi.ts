import { buatSlug, periksaProfilAroma } from "../validasi-produk.ts";

export type BarisMentah = Record<string, unknown>;

export type ProdukImpor = {
  nama: string;
  slug: string;
  kategori: "ori" | "decant" | "inspirasi" | "signature";
  ukuran: string;
  harga: number;
  ringkasan: string;
  deskripsi: string;
  aroma_atas: string[];
  aroma_tengah: string[];
  aroma_dasar: string[];
  karakter: string[];
  cocok_untuk: string[];
  foto: string[];
  link_shopee: string | null;
  link_tiktok: string | null;
  unggulan: boolean;
  tersedia: boolean;
  aktif: boolean;
  warna: "krem" | "tosca" | "emas" | "navy" | "merahMuda";
};

export type ArtikelImpor = {
  judul: string;
  slug: string;
  kategori: "cerita_misi" | "edukasi" | "tips" | "komunitas";
  cuplikan: string;
  bagian: Array<{ judul?: string; paragraf: string[] }>;
  isi_markdown: string;
  meta_judul: string | null;
  meta_deskripsi: string | null;
  fokus_kata_kunci: string | null;
  foto_utama: string | null;
  foto_alt: string | null;
  warna: "tosca" | "emas" | "navy" | "merahMuda";
  menit_baca: number;
  share_aktif: boolean;
  status: "draft";
  tanggal_terbit: null;
  penulis: string;
};

export type HasilValidasi<T> = {
  baris: number;
  data?: T;
  galat: string[];
  peringatan: string[];
};

const kategoriProduk = ["ori", "decant", "inspirasi", "signature"] as const;
const warnaProduk = ["krem", "tosca", "emas", "navy", "merahMuda"] as const;
const kategoriArtikel = ["cerita_misi", "edukasi", "tips", "komunitas"] as const;
const warnaArtikel = ["tosca", "emas", "navy", "merahMuda"] as const;

function teks(nilai: unknown) {
  if (nilai === null || nilai === undefined) return "";
  return String(nilai).trim();
}

function daftar(nilai: unknown) {
  return teks(nilai).split(",").map((item) => item.trim()).filter(Boolean);
}

function booleanEksplisit(nilai: unknown, nama: string, galat: string[], bawaan: boolean) {
  const normalized = teks(nilai).toLocaleLowerCase("id-ID");
  if (!normalized) return bawaan;
  if (["ya", "true", "1"].includes(normalized)) return true;
  if (["tidak", "false", "0"].includes(normalized)) return false;
  galat.push(`Kolom ${nama} harus diisi ya atau tidak.`);
  return bawaan;
}

function urlHttps(nilai: unknown, nama: string, galat: string[]) {
  const hasil = teks(nilai);
  if (!hasil) return null;
  try {
    const url = new URL(hasil);
    if (url.protocol !== "https:") throw new Error();
    return hasil;
  } catch {
    galat.push(`${nama} harus berupa URL HTTPS yang valid.`);
    return null;
  }
}

function urlMarketplace(nilai: unknown, jenis: "Shopee" | "TikTok", galat: string[]) {
  const hasil = urlHttps(nilai, `Link ${jenis}`, galat);
  if (!hasil) return null;
  const host = new URL(hasil).hostname.toLowerCase();
  const sah = jenis === "Shopee"
    ? host === "shopee.co.id" || host.endsWith(".shopee.co.id")
    : host === "tiktok.com" || host.endsWith(".tiktok.com");
  if (!sah) galat.push(`Link ${jenis} harus memakai domain resmi ${jenis}.`);
  return sah ? hasil : null;
}

function wajib(nilai: unknown, nama: string, galat: string[]) {
  const hasil = teks(nilai);
  if (!hasil) galat.push(`${nama} wajib diisi.`);
  return hasil;
}

export function ubahMarkdownMenjadiBagian(isi: string) {
  const blok = isi.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean);
  const bagian: Array<{ judul?: string; paragraf: string[] }> = [];
  for (const item of blok) {
    if (item.startsWith("## ") && !item.startsWith("### ")) {
      bagian.push({ judul: item.slice(3).trim(), paragraf: [] });
    } else if (bagian.length) {
      bagian[bagian.length - 1].paragraf.push(item);
    } else {
      bagian.push({ paragraf: [item] });
    }
  }
  return bagian.filter((item) => item.judul || item.paragraf.length);
}

export function validasiBarisProduk(baris: BarisMentah, nomorBaris: number): HasilValidasi<ProdukImpor> {
  const galat: string[] = [];
  const peringatan: string[] = [];
  const nama = wajib(baris.nama, "Nama", galat);
  const kategori = teks(baris.kategori);
  if (!kategoriProduk.includes(kategori as typeof kategoriProduk[number])) galat.push("Kategori produk tidak valid.");
  const ukuran = wajib(baris.ukuran, "Ukuran", galat);
  const nilaiHarga = teks(baris.harga);
  const harga = Number(nilaiHarga);
  if (!/^\d+$/.test(nilaiHarga) || !Number.isSafeInteger(harga)) galat.push("Harga harus berupa bilangan bulat tidak negatif.");
  const ringkasan = wajib(baris.ringkasan, "Ringkasan", galat);
  const deskripsi = wajib(baris.deskripsi, "Deskripsi", galat);
  const aromaAtas = daftar(baris.aroma_atas);
  const aromaTengah = daftar(baris.aroma_tengah);
  const aromaDasar = daftar(baris.aroma_dasar);
  const karakter = daftar(baris.karakter);
  const cocokUntuk = daftar(baris.cocok_untuk);
  for (const [nilai, label] of [[aromaAtas, "Aroma atas"], [aromaTengah, "Aroma tengah"], [aromaDasar, "Aroma dasar"], [karakter, "Karakter"], [cocokUntuk, "Cocok untuk"]] as const) {
    if (!nilai.length) galat.push(`${label} wajib diisi.`);
  }
  if (kategoriProduk.includes(kategori as typeof kategoriProduk[number])) {
    const galatMerek = periksaProfilAroma(kategori as ProdukImpor["kategori"], [...aromaAtas, ...aromaTengah, ...aromaDasar, ...karakter]);
    if (galatMerek) galat.push(galatMerek);
  }
  const fotoUrl = urlHttps(baris.foto_url, "Foto URL", galat);
  const linkShopee = urlMarketplace(baris.link_shopee, "Shopee", galat);
  const linkTiktok = urlMarketplace(baris.link_tiktok, "TikTok", galat);
  const warna = teks(baris.warna) || "tosca";
  if (!warnaProduk.includes(warna as typeof warnaProduk[number])) galat.push("Warna produk tidak valid.");
  const slug = buatSlug(teks(baris.slug) || nama);
  if (!slug) galat.push("Slug tidak dapat dibuat dari nama produk.");

  const data: ProdukImpor = {
    nama, slug, kategori: kategori as ProdukImpor["kategori"], ukuran, harga,
    ringkasan, deskripsi, aroma_atas: aromaAtas, aroma_tengah: aromaTengah,
    aroma_dasar: aromaDasar, karakter, cocok_untuk: cocokUntuk,
    foto: fotoUrl ? [fotoUrl] : [], link_shopee: linkShopee, link_tiktok: linkTiktok,
    unggulan: booleanEksplisit(baris.unggulan, "unggulan", galat, false),
    tersedia: booleanEksplisit(baris.tersedia, "tersedia", galat, true),
    aktif: booleanEksplisit(baris.aktif, "aktif", galat, true),
    warna: warna as ProdukImpor["warna"],
  };
  return { baris: nomorBaris, data: galat.length ? undefined : data, galat, peringatan };
}

export function validasiBarisArtikel(baris: BarisMentah, nomorBaris: number): HasilValidasi<ArtikelImpor> {
  const galat: string[] = [];
  const peringatan: string[] = [];
  const judul = wajib(baris.judul, "Judul", galat);
  if (judul && judul.length < 5) galat.push("Judul minimal 5 karakter.");
  const kategori = teks(baris.kategori) || "edukasi";
  if (!kategoriArtikel.includes(kategori as typeof kategoriArtikel[number])) galat.push("Kategori artikel tidak valid.");
  const cuplikan = wajib(baris.cuplikan, "Cuplikan", galat);
  const isi = wajib(baris.isi_markdown, "Isi Markdown", galat);
  if (/^#\s+/m.test(isi)) galat.push("Isi Markdown tidak boleh memuat H1 (# Judul). Gunakan ## untuk subjudul.");
  const metaJudul = teks(baris.meta_judul);
  const metaDeskripsi = teks(baris.meta_deskripsi);
  if (metaJudul.length > 70) galat.push("Judul pencarian maksimal 70 karakter.");
  if (metaDeskripsi.length > 200) galat.push("Deskripsi pencarian maksimal 200 karakter.");
  const nilaiMenit = teks(baris.menit_baca);
  const menitBaca = Number(nilaiMenit);
  if (!/^\d+$/.test(nilaiMenit) || !Number.isSafeInteger(menitBaca) || menitBaca < 1) galat.push("Menit baca harus berupa bilangan bulat minimal 1.");
  const warna = teks(baris.warna) || "tosca";
  if (!warnaArtikel.includes(warna as typeof warnaArtikel[number])) galat.push("Warna artikel tidak valid.");
  const fotoUtama = urlHttps(baris.foto_url, "Foto URL", galat);
  const slug = buatSlug(teks(baris.slug) || judul);
  if (!slug) galat.push("Slug tidak dapat dibuat dari judul artikel.");
  if (teks(baris.status).toLowerCase() === "terbit") peringatan.push("Status diubah menjadi draft agar artikel ditinjau sebelum terbit.");

  const data: ArtikelImpor = {
    judul, slug, kategori: kategori as ArtikelImpor["kategori"], cuplikan,
    bagian: ubahMarkdownMenjadiBagian(isi), isi_markdown: isi,
    meta_judul: metaJudul || null, meta_deskripsi: metaDeskripsi || null,
    fokus_kata_kunci: teks(baris.fokus_kata_kunci) || null,
    foto_utama: fotoUtama, foto_alt: teks(baris.foto_alt) || null,
    warna: warna as ArtikelImpor["warna"], menit_baca: menitBaca,
    share_aktif: booleanEksplisit(baris.share_aktif, "share aktif", galat, true),
    status: "draft", tanggal_terbit: null,
    penulis: teks(baris.penulis) || "Wawangian Pelajar",
  };
  return { baris: nomorBaris, data: galat.length ? undefined : data, galat, peringatan };
}

export function validasiDuplikatSlug(baris: Array<{ baris: number; slug: string }>) {
  const kelompok = new Map<string, number[]>();
  for (const item of baris) kelompok.set(item.slug, [...(kelompok.get(item.slug) ?? []), item.baris]);
  const hasil = new Map<number, string[]>();
  for (const nomor of kelompok.values()) {
    if (nomor.length < 2) continue;
    for (const barisTerkait of nomor) hasil.set(barisTerkait, ["Slug sama dipakai lebih dari sekali dalam berkas."]);
  }
  return hasil;
}
