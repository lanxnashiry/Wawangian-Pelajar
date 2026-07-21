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
  unggulan: boolean;
  tersedia: boolean;
  aktif?: boolean;
  warna: "tosca" | "emas" | "navy" | "merahMuda";
  foto?: string[];
  linkMarketplace?: { shopee?: string; tiktok?: string };
  sumberData?: "contoh" | "supabase";
};

export const labelKategori: Record<KategoriProduk, string> = {
  ori: "Ori",
  decant: "Decant",
  inspirasi: "Inspirasi",
  signature: "Signature",
};

export const daftarProduk: Produk[] = [
  {
    slug: "decant-aoud-malam",
    nama: "Decant Aoud Malam",
    kategori: "decant",
    ukuran: "5 ml",
    harga: 30000,
    ringkasan: "Manis, woody, dan hangat untuk suasana malam.",
    deskripsi:
      "Pilihan ukuran kecil untuk mencoba karakter aroma hangat tanpa membeli botol penuh.",
    profilAroma: {
      atas: ["rempah lembut", "buah kering"],
      tengah: ["kayu", "resin"],
      dasar: ["musk", "amber"],
      karakter: ["hangat", "woody", "manis"],
      cocokUntuk: ["malam", "acara santai"],
    },
    unggulan: true,
    tersedia: true,
    warna: "navy",
  },
  {
    slug: "inspirasi-fresh-pagi",
    nama: "Inspirasi Fresh Pagi",
    kategori: "inspirasi",
    ukuran: "35 ml",
    harga: 65000,
    ringkasan: "Citrus, aquatic, dan ringan untuk memulai hari.",
    deskripsi:
      "Racikan segar dengan kesan bersih yang nyaman untuk aktivitas harian.",
    profilAroma: {
      atas: ["jeruk", "daun hijau"],
      tengah: ["aquatic", "teh putih"],
      dasar: ["musk", "kayu ringan"],
      karakter: ["fresh", "ringan", "bersih"],
      cocokUntuk: ["siang", "kuliah", "kerja"],
    },
    unggulan: true,
    tersedia: true,
    warna: "tosca",
  },
  {
    slug: "ori-floral-signature",
    nama: "Ori Floral Signature",
    kategori: "ori",
    ukuran: "50 ml",
    harga: 250000,
    ringkasan: "Mawar, musk, dan nuansa elegan untuk acara khusus.",
    deskripsi:
      "Data contoh lini parfum ori dengan karakter floral yang lembut dan rapi.",
    profilAroma: {
      atas: ["pir", "citrus lembut"],
      tengah: ["mawar", "bunga putih"],
      dasar: ["musk", "kayu lembut"],
      karakter: ["floral", "elegan", "lembut"],
      cocokUntuk: ["formal", "malam"],
    },
    unggulan: true,
    tersedia: true,
    warna: "merahMuda",
  },
  {
    slug: "inspirasi-sweet-vanilla",
    nama: "Inspirasi Sweet Vanilla",
    kategori: "inspirasi",
    ukuran: "35 ml",
    harga: 65000,
    ringkasan: "Vanila, karamel, dan musk dengan kesan manis.",
    deskripsi:
      "Racikan manis dan hangat untuk kamu yang menyukai aroma nyaman sehari-hari.",
    profilAroma: {
      atas: ["vanila", "buah lembut"],
      tengah: ["karamel", "bunga putih"],
      dasar: ["musk", "kayu hangat"],
      karakter: ["manis", "hangat", "nyaman"],
      cocokUntuk: ["sehari-hari", "santai", "malam"],
    },
    unggulan: true,
    tersedia: true,
    warna: "emas",
  },
  {
    slug: "decant-woody-siang",
    nama: "Decant Woody Siang",
    kategori: "decant",
    ukuran: "5 ml",
    harga: 32000,
    ringkasan: "Cedar, vetiver, dan kesegaran yang tetap ringan.",
    deskripsi:
      "Ukuran praktis dengan profil woody segar untuk dibawa beraktivitas.",
    profilAroma: {
      atas: ["bergamot", "daun hijau"],
      tengah: ["vetiver", "rempah ringan"],
      dasar: ["cedar", "musk"],
      karakter: ["woody", "fresh", "rapi"],
      cocokUntuk: ["siang", "kerja", "kuliah"],
    },
    unggulan: false,
    tersedia: true,
    warna: "navy",
  },
  {
    slug: "inspirasi-citrus-sport",
    nama: "Inspirasi Citrus Sport",
    kategori: "inspirasi",
    ukuran: "35 ml",
    harga: 60000,
    ringkasan: "Jeruk, mint, dan nuansa energik yang mudah dipakai.",
    deskripsi:
      "Racikan berkarakter aktif dengan bukaan citrus dan sensasi segar.",
    profilAroma: {
      atas: ["jeruk", "lemon"],
      tengah: ["mint", "aromatic"],
      dasar: ["musk", "kayu kering"],
      karakter: ["fresh", "energik", "ringan"],
      cocokUntuk: ["siang", "olahraga ringan", "kuliah"],
    },
    unggulan: false,
    tersedia: true,
    warna: "tosca",
  },
  {
    slug: "ori-amber-elegan",
    nama: "Ori Amber Elegan",
    kategori: "ori",
    ukuran: "50 ml",
    harga: 275000,
    ringkasan: "Amber, kayu, dan kesan hangat yang dewasa.",
    deskripsi:
      "Data contoh lini parfum ori untuk profil aroma amber dan woody.",
    profilAroma: {
      atas: ["rempah", "citrus"],
      tengah: ["amber", "bunga kering"],
      dasar: ["kayu", "musk"],
      karakter: ["hangat", "elegan", "dewasa"],
      cocokUntuk: ["formal", "malam"],
    },
    unggulan: false,
    tersedia: true,
    warna: "emas",
  },
  {
    slug: "signature-cahaya",
    nama: "Signature Cahaya",
    kategori: "signature",
    ukuran: "Segera hadir",
    harga: 0,
    ringkasan: "Racikan khas Wawangian Pelajar sedang disiapkan.",
    deskripsi:
      "Produk signature masih dalam pengembangan dan belum ditawarkan untuk pembelian.",
    profilAroma: {
      atas: ["sedang dirancang"],
      tengah: ["sedang dirancang"],
      dasar: ["sedang dirancang"],
      karakter: ["segera hadir"],
      cocokUntuk: ["segera diumumkan"],
    },
    unggulan: false,
    tersedia: false,
    warna: "merahMuda",
  },
];

daftarProduk.forEach((produk) => {
  produk.sumberData = "contoh";
});

export function formatRupiah(nilai: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

export function ambilProduk(slug: string) {
  return daftarProduk.find((produk) => produk.slug === slug);
}
