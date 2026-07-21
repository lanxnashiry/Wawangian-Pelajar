import { daftarArtikel, type Artikel, type BagianArtikel } from "@/data/artikel";
import { daftarProduk, type Produk } from "@/data/produk";
import { konfigurasiSupabasePublikTersedia } from "@/lib/supabase/konfigurasi";
import { buatKlienSupabaseServer } from "@/lib/supabase/klien-server";

type BarisProduk = {
  id: string;
  nama: string;
  slug: string;
  kategori: Produk["kategori"];
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
  warna: Produk["warna"];
};

type BarisArtikel = {
  id: string;
  judul: string;
  slug: string;
  kategori: Artikel["kategori"];
  cuplikan: string;
  bagian: BagianArtikel[];
  foto_utama: string | null;
  warna: Artikel["warna"];
  menit_baca: number;
  share_aktif: boolean;
  penulis: string;
  tanggal_terbit: string | null;
  status: "draft" | "terbit";
};

export function petakanProduk(baris: BarisProduk): Produk {
  return {
    id: baris.id,
    nama: baris.nama,
    slug: baris.slug,
    kategori: baris.kategori,
    ukuran: baris.ukuran,
    harga: Number(baris.harga),
    ringkasan: baris.ringkasan,
    deskripsi: baris.deskripsi,
    profilAroma: {
      atas: baris.aroma_atas,
      tengah: baris.aroma_tengah,
      dasar: baris.aroma_dasar,
      karakter: baris.karakter,
      cocokUntuk: baris.cocok_untuk,
    },
    foto: baris.foto,
    linkMarketplace: {
      shopee: baris.link_shopee ?? undefined,
      tiktok: baris.link_tiktok ?? undefined,
    },
    unggulan: baris.unggulan,
    tersedia: baris.tersedia,
    aktif: baris.aktif,
    warna: baris.warna,
    sumberData: "supabase",
  };
}

export function petakanArtikel(baris: BarisArtikel): Artikel {
  return {
    id: baris.id,
    judul: baris.judul,
    slug: baris.slug,
    kategori: baris.kategori,
    cuplikan: baris.cuplikan,
    bagian: baris.bagian,
    fotoUtama: baris.foto_utama ?? undefined,
    warna: baris.warna,
    menitBaca: baris.menit_baca,
    shareAktif: baris.share_aktif,
    penulis: baris.penulis,
    status: baris.status,
    tanggal: baris.tanggal_terbit
      ? new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(
          new Date(baris.tanggal_terbit),
        )
      : "Belum diterbitkan",
    sumberData: "supabase",
  };
}

export async function ambilDaftarProdukPublik(): Promise<Produk[]> {
  if (!konfigurasiSupabasePublikTersedia()) return daftarProduk;
  const supabase = await buatKlienSupabaseServer();
  const { data, error } = await supabase
    .from("produk")
    .select("*")
    .eq("aktif", true)
    .order("unggulan", { ascending: false })
    .order("nama");
  if (error) return daftarProduk;
  return (data as BarisProduk[]).map(petakanProduk);
}

export async function ambilProdukPublik(slug: string): Promise<Produk | undefined> {
  const semuaProduk = await ambilDaftarProdukPublik();
  return semuaProduk.find((produk) => produk.slug === slug);
}

export async function ambilDaftarArtikelPublik(): Promise<Artikel[]> {
  if (!konfigurasiSupabasePublikTersedia()) return daftarArtikel;
  const supabase = await buatKlienSupabaseServer();
  const { data, error } = await supabase
    .from("artikel")
    .select("*")
    .eq("status", "terbit")
    .order("tanggal_terbit", { ascending: false });
  if (error) return daftarArtikel;
  return (data as BarisArtikel[]).map(petakanArtikel);
}

export async function ambilArtikelPublik(slug: string): Promise<Artikel | undefined> {
  const semuaArtikel = await ambilDaftarArtikelPublik();
  return semuaArtikel.find((artikel) => artikel.slug === slug);
}
