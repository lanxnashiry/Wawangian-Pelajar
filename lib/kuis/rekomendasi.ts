import type { Produk } from "../../data/produk.ts";
import {
  labelTagAroma,
  labelTagIntensitas,
  labelTagKegiatan,
  labelTagKesan,
  labelTagWaktu,
  nilaiTagAroma,
  nilaiTagIntensitas,
  nilaiTagKegiatan,
  nilaiTagKesan,
  nilaiTagWaktu,
  type ProfilRekomendasi,
} from "../../data/profil-rekomendasi.ts";

export type JawabanKuis = {
  aroma: string;
  kesan: string;
  intensitas: string;
  waktu: string;
  kegiatan: string;
};

export type KunciJawaban = keyof JawabanKuis;

export type OpsiKuis = {
  nilai: string;
  label: string;
  deskripsi: string;
};

export type PertanyaanKuis = {
  kunci: KunciJawaban;
  judul: string;
  bantuan: string;
  opsi: OpsiKuis[];
};

export type HasilRekomendasi = {
  profil: ProfilRekomendasi;
  varian: Produk[];
  produkUtama: Produk;
  skor: number;
  jumlahKecocokan: number;
  alasan: string[];
  tingkat: "Sangat sesuai" | "Sesuai" | "Paling mendekati";
};

function menjadiOpsi(
  nilai: readonly string[],
  label: Record<string, string>,
  deskripsi: Record<string, string>,
): OpsiKuis[] {
  return nilai.map((item) => ({
    nilai: item,
    label: label[item],
    deskripsi: deskripsi[item],
  }));
}

export const opsiAroma = menjadiOpsi(nilaiTagAroma, labelTagAroma, {
  "segar-akuatik": "Bersih, berair, citrus, atau seperti udara pantai.",
  "manis-gourmand": "Karamel, praline, vanilla, atau kesan pencuci mulut.",
  "floral-lembut": "Mawar, bunga putih, creamy, atau terasa halus.",
  "woody-hangat": "Kayu, amber, moss, atau kesan hangat yang dewasa.",
  "fruity-ceria": "Buah tropis, pear, berry, atau kesan juicy.",
});

export const opsiKesan = menjadiOpsi(nilaiTagKesan, labelTagKesan, {
  "bersih-ringan": "Terasa rapi, segar, dan mudah dipakai.",
  "ceria-playful": "Menyenangkan, ekspresif, dan tidak terlalu serius.",
  "hangat-nyaman": "Lembut, akrab, dan memberi kesan cozy.",
  "elegan-dewasa": "Rapi, berkelas, dan lebih tenang.",
  "romantis-lembut": "Manis yang halus, intim, dan memikat.",
});

export const opsiIntensitas = menjadiOpsi(
  nilaiTagIntensitas,
  labelTagIntensitas,
  {
    ringan: "Hadir dekat dan terasa santai.",
    sedang: "Cukup terasa tanpa terlalu mendominasi.",
    kuat: "Berkarakter dan lebih mudah menarik perhatian.",
  },
);

export const opsiWaktu = menjadiOpsi(nilaiTagWaktu, labelTagWaktu, {
  "siang-panas": "Untuk aktivitas terang, luar ruang, atau cuaca hangat.",
  "malam-sejuk": "Untuk malam, ruangan ber-AC, atau suasana lebih intim.",
  fleksibel: "Ingin aroma yang mudah dipakai kapan saja.",
});

export const opsiKegiatan = menjadiOpsi(
  nilaiTagKegiatan,
  labelTagKegiatan,
  {
    "kampus-kerja": "Kelas, organisasi, magang, atau rutinitas kerja.",
    "sehari-hari": "Pemakaian santai dan kegiatan rutin.",
    "hangout-aktif": "Jalan-jalan, kumpul, olahraga ringan, atau liburan.",
    kencan: "Pertemuan dekat dan suasana romantis.",
    "formal-acara-khusus": "Presentasi, pesta, atau acara yang lebih rapi.",
  },
);

export const pertanyaanKuis: PertanyaanKuis[] = [
  {
    kunci: "aroma",
    judul: "Keluarga aroma mana yang paling menarik buatmu?",
    bantuan: "Pilih berdasarkan kesan pertama yang paling ingin kamu cium.",
    opsi: opsiAroma,
  },
  {
    kunci: "kesan",
    judul: "Kesan seperti apa yang ingin kamu tampilkan?",
    bantuan: "Tidak perlu memikirkan istilah parfum—pilih yang terasa paling kamu.",
    opsi: opsiKesan,
  },
  {
    kunci: "intensitas",
    judul: "Seberapa terasa wanginya yang kamu inginkan?",
    bantuan: "Ini klasifikasi karakter aroma, bukan janji ketahanan mutlak.",
    opsi: opsiIntensitas,
  },
  {
    kunci: "waktu",
    judul: "Kapan atau dalam suasana apa paling sering dipakai?",
    bantuan: "Pilih kondisi yang paling sering kamu temui.",
    opsi: opsiWaktu,
  },
  {
    kunci: "kegiatan",
    judul: "Kegiatan utama apa yang ingin ditemani aroma ini?",
    bantuan: "Pilih satu kebutuhan utama; hasil tetap menampilkan pilihan terdekat.",
    opsi: opsiKegiatan,
  },
];

const bobot: Record<KunciJawaban, number> = {
  aroma: 5,
  kesan: 4,
  intensitas: 1,
  waktu: 2,
  kegiatan: 3,
};

const daftarOpsi: Record<KunciJawaban, OpsiKuis[]> = {
  aroma: opsiAroma,
  kesan: opsiKesan,
  intensitas: opsiIntensitas,
  waktu: opsiWaktu,
  kegiatan: opsiKegiatan,
};

export const jawabanKuisKosong: JawabanKuis = {
  aroma: "",
  kesan: "",
  intensitas: "",
  waktu: "",
  kegiatan: "",
};

function pilihanSah(kunci: KunciJawaban, nilai: string) {
  return daftarOpsi[kunci].some((opsi) => opsi.nilai === nilai);
}

export function jawabanKuisLengkap(jawaban: JawabanKuis) {
  return (Object.keys(daftarOpsi) as KunciJawaban[]).every((kunci) =>
    pilihanSah(kunci, jawaban[kunci]),
  );
}

export function labelJawabanKuis(jawaban: JawabanKuis) {
  return (Object.keys(daftarOpsi) as KunciJawaban[]).reduce(
    (hasil, kunci) => {
      hasil[kunci] =
        daftarOpsi[kunci].find((opsi) => opsi.nilai === jawaban[kunci])
          ?.label ?? "";
      return hasil;
    },
    {} as Record<KunciJawaban, string>,
  );
}

export function parameterJawabanKuis(jawaban: JawabanKuis) {
  const parameter = new URLSearchParams();
  (Object.keys(daftarOpsi) as KunciJawaban[]).forEach((kunci) => {
    if (pilihanSah(kunci, jawaban[kunci])) parameter.set(kunci, jawaban[kunci]);
  });
  return parameter;
}

function angkaUkuran(ukuran: string) {
  const nilai = Number.parseFloat(ukuran.replace(",", "."));
  return Number.isFinite(nilai) ? nilai : Number.MAX_SAFE_INTEGER;
}

export function urutkanVarian(daftar: Produk[]) {
  return [...daftar].sort((a, b) => {
    const selisihUkuran = angkaUkuran(a.ukuran) - angkaUkuran(b.ukuran);
    return selisihUkuran || a.nama.localeCompare(b.nama, "id-ID");
  });
}

export function ambilProdukDecant(daftarProduk: Produk[]) {
  return urutkanVarian(
    daftarProduk.filter(
      (produk) =>
        produk.kategori === "decant" &&
        produk.aktif !== false &&
        produk.tersedia,
    ),
  );
}

function kelompokkanProduk(daftarProduk: Produk[]) {
  const kelompok = new Map<string, { profil: ProfilRekomendasi; varian: Produk[] }>();
  for (const produk of daftarProduk) {
    const profil = produk.profilRekomendasi;
    if (
      produk.kategori === "decant" ||
      produk.aktif === false ||
      !produk.tersedia ||
      !profil?.aktif
    ) continue;
    const tersedia = kelompok.get(profil.id) ?? { profil, varian: [] };
    tersedia.varian.push(produk);
    kelompok.set(profil.id, tersedia);
  }
  return [...kelompok.values()].map((item) => ({
    ...item,
    varian: urutkanVarian(item.varian),
  }));
}

function tingkatKecocokan(jumlah: number): HasilRekomendasi["tingkat"] {
  if (jumlah >= 4) return "Sangat sesuai";
  if (jumlah === 3) return "Sesuai";
  return "Paling mendekati";
}

export function rekomendasikanProduk(
  daftarProduk: Produk[],
  jawaban: JawabanKuis,
): HasilRekomendasi[] {
  if (!jawabanKuisLengkap(jawaban)) return [];

  return kelompokkanProduk(daftarProduk)
    .map(({ profil, varian }) => {
      const kecocokan = [
        {
          kunci: "aroma" as const,
          cocok: profil.tagAroma.includes(jawaban.aroma as ProfilRekomendasi["tagAroma"][number]),
          alasan: `keluarga aroma ${labelJawabanKuis(jawaban).aroma.toLocaleLowerCase("id-ID")}`,
        },
        {
          kunci: "kesan" as const,
          cocok: profil.tagKesan.includes(jawaban.kesan as ProfilRekomendasi["tagKesan"][number]),
          alasan: `kesan ${labelJawabanKuis(jawaban).kesan.toLocaleLowerCase("id-ID")}`,
        },
        {
          kunci: "intensitas" as const,
          cocok: profil.tagIntensitas.includes(jawaban.intensitas as ProfilRekomendasi["tagIntensitas"][number]),
          alasan: `intensitas ${labelJawabanKuis(jawaban).intensitas.toLocaleLowerCase("id-ID")}`,
        },
        {
          kunci: "waktu" as const,
          cocok: profil.tagWaktu.includes(jawaban.waktu as ProfilRekomendasi["tagWaktu"][number]),
          alasan: `suasana ${labelJawabanKuis(jawaban).waktu.toLocaleLowerCase("id-ID")}`,
        },
        {
          kunci: "kegiatan" as const,
          cocok: profil.tagKegiatan.includes(jawaban.kegiatan as ProfilRekomendasi["tagKegiatan"][number]),
          alasan: `kegiatan ${labelJawabanKuis(jawaban).kegiatan.toLocaleLowerCase("id-ID")}`,
        },
      ];
      const yangCocok = kecocokan.filter((item) => item.cocok);
      return {
        profil,
        varian,
        produkUtama: varian[0],
        skor: yangCocok.reduce((total, item) => total + bobot[item.kunci], 0),
        jumlahKecocokan: yangCocok.length,
        alasan: yangCocok.map((item) => item.alasan),
        tingkat: tingkatKecocokan(yangCocok.length),
      } satisfies HasilRekomendasi;
    })
    .sort((a, b) => {
      if (b.skor !== a.skor) return b.skor - a.skor;
      if (b.jumlahKecocokan !== a.jumlahKecocokan) {
        return b.jumlahKecocokan - a.jumlahKecocokan;
      }
      const unggulanA = a.varian.some((produk) => produk.unggulan);
      const unggulanB = b.varian.some((produk) => produk.unggulan);
      if (unggulanA !== unggulanB) return Number(unggulanB) - Number(unggulanA);
      return a.profil.nama.localeCompare(b.profil.nama, "id-ID");
    })
    .slice(0, 3);
}

const petaKarakterLama: Record<string, Pick<JawabanKuis, "aroma" | "kesan">> = {
  manis: { aroma: "manis-gourmand", kesan: "hangat-nyaman" },
  fresh: { aroma: "segar-akuatik", kesan: "bersih-ringan" },
  woody: { aroma: "woody-hangat", kesan: "elegan-dewasa" },
  floral: { aroma: "floral-lembut", kesan: "romantis-lembut" },
};

const petaWaktuLama: Record<string, string> = {
  siang: "siang-panas",
  malam: "malam-sejuk",
};

const petaOkasiLama: Record<string, string> = {
  "sehari-hari": "sehari-hari",
  "kuliah-kerja": "kampus-kerja",
  formal: "formal-acara-khusus",
  aktif: "hangout-aktif",
};

export function petakanJawabanKuisLama(parameter: {
  karakter?: string;
  waktu?: string;
  okasi?: string;
}): JawabanKuis | undefined {
  const karakter = petaKarakterLama[parameter.karakter ?? ""];
  const waktu = petaWaktuLama[parameter.waktu ?? ""];
  const kegiatan = petaOkasiLama[parameter.okasi ?? ""];
  if (!karakter || !waktu || !kegiatan) return undefined;
  return {
    ...karakter,
    intensitas: "sedang",
    waktu,
    kegiatan,
  };
}
