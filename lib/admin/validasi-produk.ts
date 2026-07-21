import type { KategoriProduk } from "@/data/produk";

const merekTerlarang = [
  "chanel", "dior", "gucci", "yves saint laurent", "ysl", "armani",
  "versace", "creed", "tom ford", "jo malone", "lancome", "bvlgari",
  "hermes", "hugo boss", "paco rabanne", "carolina herrera",
  "maison francis kurkdjian", "byredo", "le labo", "azzaro", "burberry",
  "calvin klein", "dolce & gabbana",
];

export function buatSlug(teks: string) {
  return teks.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function pisahkanDaftar(nilai: FormDataEntryValue | null) {
  return String(nilai ?? "").split(",").map((item) => item.trim()).filter(Boolean);
}

export function periksaProfilAroma(kategori: KategoriProduk, nilai: string[]) {
  if (kategori !== "inspirasi" && kategori !== "signature") return undefined;
  const gabungan = nilai.join(" ").toLocaleLowerCase("id-ID");
  const ditemukan = merekTerlarang.find((merek) => gabungan.includes(merek));
  return ditemukan
    ? `Profil aroma racikan sendiri tidak boleh memuat nama merek asli: ${ditemukan}.`
    : undefined;
}
