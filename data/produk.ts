import type { ProfilRekomendasi } from "@/data/profil-rekomendasi";

export type KategoriProduk = "ori" | "decant" | "inspirasi" | "signature";

export type Produk = {
  id?: string;
  slug: string;
  nama: string;
  kategori: KategoriProduk;
  ukuran: string;
  harga: number;
  ringkasan: string;
  deskripsi: string;
  profilAroma: {
    atas: string[];
    tengah: string[];
    dasar: string[];
    karakter: string[];
    cocokUntuk: string[];
  };
  profilRekomendasi?: ProfilRekomendasi;
  unggulan: boolean;
  tersedia: boolean;
  aktif?: boolean;
  warna: "krem" | "tosca" | "emas" | "navy" | "merahMuda";
  foto?: string[];
  linkMarketplace?: { shopee?: string; tiktok?: string };
  sumberData: "supabase";
};

export const labelKategori: Record<KategoriProduk, string> = {
  ori: "Ori",
  decant: "Decant",
  inspirasi: "Inspirasi",
  signature: "Signature",
};

export function formatRupiah(nilai: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}
