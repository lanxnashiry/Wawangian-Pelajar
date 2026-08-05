export const nilaiTagAroma = [
  "segar-akuatik",
  "manis-gourmand",
  "floral-lembut",
  "woody-hangat",
  "fruity-ceria",
] as const;

export const nilaiTagKesan = [
  "bersih-ringan",
  "ceria-playful",
  "hangat-nyaman",
  "elegan-dewasa",
  "romantis-lembut",
] as const;

export const nilaiTagIntensitas = ["ringan", "sedang", "kuat"] as const;

export const nilaiTagWaktu = [
  "siang-panas",
  "malam-sejuk",
  "fleksibel",
] as const;

export const nilaiTagKegiatan = [
  "kampus-kerja",
  "sehari-hari",
  "hangout-aktif",
  "kencan",
  "formal-acara-khusus",
] as const;

export type TagAroma = (typeof nilaiTagAroma)[number];
export type TagKesan = (typeof nilaiTagKesan)[number];
export type TagIntensitas = (typeof nilaiTagIntensitas)[number];
export type TagWaktu = (typeof nilaiTagWaktu)[number];
export type TagKegiatan = (typeof nilaiTagKegiatan)[number];

export type ProfilRekomendasi = {
  id: string;
  kode: string;
  nama: string;
  tagAroma: TagAroma[];
  tagKesan: TagKesan[];
  tagIntensitas: TagIntensitas[];
  tagWaktu: TagWaktu[];
  tagKegiatan: TagKegiatan[];
  aktif: boolean;
};

export const labelTagAroma: Record<TagAroma, string> = {
  "segar-akuatik": "Segar / Akuatik",
  "manis-gourmand": "Manis / Gourmand",
  "floral-lembut": "Floral / Lembut",
  "woody-hangat": "Woody / Hangat",
  "fruity-ceria": "Fruity / Ceria",
};

export const labelTagKesan: Record<TagKesan, string> = {
  "bersih-ringan": "Bersih / Ringan",
  "ceria-playful": "Ceria / Playful",
  "hangat-nyaman": "Hangat / Nyaman",
  "elegan-dewasa": "Elegan / Dewasa",
  "romantis-lembut": "Romantis / Lembut",
};

export const labelTagIntensitas: Record<TagIntensitas, string> = {
  ringan: "Ringan",
  sedang: "Sedang",
  kuat: "Kuat",
};

export const labelTagWaktu: Record<TagWaktu, string> = {
  "siang-panas": "Siang / Cuaca panas",
  "malam-sejuk": "Malam / Suasana sejuk",
  fleksibel: "Fleksibel",
};

export const labelTagKegiatan: Record<TagKegiatan, string> = {
  "kampus-kerja": "Kampus / Kerja",
  "sehari-hari": "Sehari-hari",
  "hangout-aktif": "Hangout / Aktif",
  kencan: "Kencan",
  "formal-acara-khusus": "Formal / Acara khusus",
};
