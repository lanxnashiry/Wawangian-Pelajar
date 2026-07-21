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
  sumberData?: "contoh" | "supabase";
};

export const labelKategoriArtikel: Record<KategoriArtikel, string> = {
  cerita_misi: "Cerita Misi",
  edukasi: "Edukasi",
  tips: "Tips",
  komunitas: "Komunitas",
};

export const daftarArtikel: Artikel[] = [
  {
    slug: "berawal-dari-pelajar",
    judul: "Berawal dari pelajar, bertumbuh untuk pendidikan",
    kategori: "cerita_misi",
    cuplikan:
      "Mengapa Wawangian Pelajar memilih pendidikan sebagai arah perjalanan brand.",
    tanggal: "21 Juli 2026",
    menitBaca: 4,
    warna: "emas",
    bagian: [
      {
        paragraf: [
          "Nama Wawangian Pelajar lahir dari keyakinan bahwa produk yang dekat dengan anak muda juga bisa membawa manfaat yang lebih luas.",
          "Kami ingin setiap langkah bisnis bertumbuh bersama komitmen untuk pendidikan, dengan laporan yang jujur dan dapat diperiksa publik.",
        ],
      },
      {
        judul: "Transparansi sejak awal",
        paragraf: [
          "Perjalanan ini masih baru. Karena itu kami tidak menampilkan angka atau cerita dampak yang belum memiliki sumber dan bukti.",
          "Ketika penyaluran pertama dilakukan, bukti dan metodenya akan tersedia melalui halaman Dana Cahaya Pendidikan.",
        ],
      },
    ],
  },
  {
    slug: "beda-decant-ori-dan-inspirasi",
    judul: "Beda decant, ori, dan parfum inspirasi",
    kategori: "edukasi",
    cuplikan:
      "Panduan ringkas memahami tiga pilihan parfum sebelum menentukan yang paling cocok.",
    tanggal: "21 Juli 2026",
    menitBaca: 5,
    warna: "tosca",
    bagian: [
      {
        paragraf: [
          "Parfum ori adalah produk asli dalam kemasan resminya. Decant adalah parfum asli yang dipindahkan ke botol lebih kecil agar lebih mudah dicoba.",
          "Parfum inspirasi adalah racikan sendiri dengan karakter aroma tertentu. Produk ini bukan salinan merek dan selalu diberi label Racikan Sendiri.",
        ],
      },
      {
        judul: "Pilih sesuai kebutuhan",
        paragraf: [
          "Decant cocok untuk mencoba aroma dengan anggaran ringan. Botol ori cocok saat kamu sudah yakin, sedangkan racikan sendiri menawarkan karakter yang dirancang lebih terjangkau.",
        ],
      },
    ],
  },
  {
    slug: "parfum-tahan-lebih-lama",
    judul: "Biar parfum terasa lebih lama",
    kategori: "tips",
    cuplikan:
      "Cara sederhana menyemprot dan menyimpan parfum tanpa kebiasaan yang merusak aromanya.",
    tanggal: "21 Juli 2026",
    menitBaca: 3,
    warna: "navy",
    bagian: [
      {
        paragraf: [
          "Semprotkan parfum pada kulit yang bersih dan tidak terlalu kering. Area nadi seperti pergelangan tangan dan leher membantu aroma menyebar dengan lembut.",
          "Hindari menggosok pergelangan tangan setelah menyemprot karena dapat mengubah perkembangan lapisan aromanya.",
        ],
      },
      {
        judul: "Simpan dengan benar",
        paragraf: [
          "Jauhkan botol dari cahaya matahari langsung dan perubahan suhu ekstrem. Lemari yang sejuk dan kering biasanya lebih baik daripada kamar mandi.",
        ],
      },
    ],
  },
  {
    slug: "memilih-aroma-untuk-kuliah",
    judul: "Memilih aroma nyaman untuk kuliah",
    kategori: "edukasi",
    cuplikan:
      "Karakter fresh dan ringan dapat menjadi titik awal untuk ruang kelas dan aktivitas harian.",
    tanggal: "21 Juli 2026",
    menitBaca: 4,
    warna: "merahMuda",
    bagian: [
      {
        paragraf: [
          "Untuk ruang bersama, pilih aroma yang terasa bersih dan tidak terlalu memenuhi ruangan. Citrus, aquatic, atau musk ringan sering mudah digunakan pada siang hari.",
          "Mulai dengan sedikit semprotan, lalu kenali bagaimana parfum berkembang pada kulitmu sebelum menambahnya.",
        ],
      },
    ],
  },
  {
    slug: "mengapa-bukti-donasi-penting",
    judul: "Mengapa bukti donasi perlu dibuka",
    kategori: "cerita_misi",
    cuplikan:
      "Prinsip yang kami gunakan agar niat baik tidak berubah menjadi klaim yang sulit diperiksa.",
    tanggal: "21 Juli 2026",
    menitBaca: 4,
    warna: "emas",
    bagian: [
      {
        paragraf: [
          "Kepercayaan tidak cukup dibangun dengan angka besar. Setiap angka perlu memiliki metode, dan setiap penyaluran perlu memiliki bukti.",
          "Karena itu angka terkumpul nantinya dihitung dari keuntungan bersih, sementara penyaluran baru tampil ke publik setelah bukti dan data penerima lengkap.",
        ],
      },
    ],
  },
];

daftarArtikel.forEach((artikel) => {
  artikel.sumberData = "contoh";
});

export function ambilArtikel(slug: string) {
  return daftarArtikel.find((artikel) => artikel.slug === slug);
}
