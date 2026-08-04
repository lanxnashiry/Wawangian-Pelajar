export type KategoriArtikel =
  | "cerita_misi"
  | "edukasi"
  | "tips"
  | "komunitas";

export type BagianArtikel = {
  judul?: string;
  paragraf: string[];
};

export type Artikel = {
  id?: string;
  slug: string;
  judul: string;
  kategori: KategoriArtikel;
  cuplikan: string;
  tanggal: string;
  menitBaca: number;
  warna: "tosca" | "emas" | "navy" | "merahMuda";
  bagian: BagianArtikel[];
  fotoUtama?: string;
  shareAktif?: boolean;
  penulis?: string;
  status?: "draft" | "terbit";
  sumberData: "supabase";
  isiMarkdown?: string;
  metaJudul?: string;
  metaDeskripsi?: string;
  fotoAlt?: string;
  fokusKataKunci?: string;
  tanggalTerbitIso?: string;
};

export const labelKategoriArtikel: Record<KategoriArtikel, string> = {
  cerita_misi: "Cerita Misi",
  edukasi: "Edukasi",
  tips: "Tips",
  komunitas: "Komunitas",
};
