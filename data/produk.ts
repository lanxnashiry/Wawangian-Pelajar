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

export function ambilNilaiDecant(produk: Produk) {
  if (produk.kategori !== "decant" || produk.harga <= 0) return undefined;

  const ukuranMl = Number.parseFloat(produk.ukuran.replace(/\s*ml\s*$/i, ""));
  if (!Number.isFinite(ukuranMl) || ukuranMl <= 0) return undefined;

  const label = ukuranMl === 1
    ? "Paling ringan untuk mencoba"
    : ukuranMl === 10
      ? "Paling hemat per ml"
      : ukuranMl === 5
        ? "Seimbang untuk mencoba lebih lama"
        : "Praktis untuk beberapa kali pemakaian";

  return {
    hargaPerMl: Math.round(produk.harga / ukuranMl),
    label,
  };
}
