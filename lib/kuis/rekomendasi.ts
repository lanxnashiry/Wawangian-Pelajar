import type { Produk } from "@/data/produk";

export type JawabanKuis = {
  karakter: string;
  waktu: string;
  okasi: string;
};

export type OpsiKuis = {
  nilai: string;
  label: string;
  cocokDengan: string[];
};

export type HasilRekomendasi = {
  produk: Produk;
  skor: number;
  alasan: string[];
};

export const opsiKarakter: OpsiKuis[] = [
  { nilai: "manis", label: "Manis", cocokDengan: ["manis", "nyaman"] },
  { nilai: "fresh", label: "Fresh", cocokDengan: ["fresh", "bersih", "ringan"] },
  { nilai: "woody", label: "Woody", cocokDengan: ["woody", "hangat", "dewasa"] },
  { nilai: "floral", label: "Floral", cocokDengan: ["floral", "lembut", "elegan"] },
];

export const opsiWaktu: OpsiKuis[] = [
  { nilai: "siang", label: "Siang", cocokDengan: ["siang"] },
  { nilai: "malam", label: "Malam", cocokDengan: ["malam"] },
];

export const opsiOkasi: OpsiKuis[] = [
  { nilai: "sehari-hari", label: "Sehari-hari", cocokDengan: ["sehari-hari", "santai"] },
  { nilai: "kuliah-kerja", label: "Kuliah / Kerja", cocokDengan: ["kuliah", "kerja"] },
  { nilai: "formal", label: "Formal", cocokDengan: ["formal"] },
  { nilai: "aktif", label: "Aktivitas aktif", cocokDengan: ["olahraga ringan", "siang"] },
];

function normalkan(nilai: string) {
  return nilai.trim().toLocaleLowerCase("id-ID");
}

function cariOpsi(daftar: OpsiKuis[], nilai: string) {
  return daftar.find((opsi) => opsi.nilai === nilai);
}

function jumlahKecocokan(sumber: string[], target: string[]) {
  const sumberNormal = sumber.map(normalkan);
  return target.filter((item) => sumberNormal.includes(normalkan(item))).length;
}

export function jawabanKuisLengkap(jawaban: JawabanKuis) {
  return Boolean(
    cariOpsi(opsiKarakter, jawaban.karakter) &&
    cariOpsi(opsiWaktu, jawaban.waktu) &&
    cariOpsi(opsiOkasi, jawaban.okasi),
  );
}

export function labelJawabanKuis(jawaban: JawabanKuis) {
  return {
    karakter: cariOpsi(opsiKarakter, jawaban.karakter)?.label ?? "",
    waktu: cariOpsi(opsiWaktu, jawaban.waktu)?.label ?? "",
    okasi: cariOpsi(opsiOkasi, jawaban.okasi)?.label ?? "",
  };
}

export function rekomendasikanProduk(
  daftarProduk: Produk[],
  jawaban: JawabanKuis,
): HasilRekomendasi[] {
  const karakter = cariOpsi(opsiKarakter, jawaban.karakter);
  const waktu = cariOpsi(opsiWaktu, jawaban.waktu);
  const okasi = cariOpsi(opsiOkasi, jawaban.okasi);
  if (!karakter || !waktu || !okasi) return [];

  return daftarProduk
    .filter((produk) => produk.tersedia && produk.aktif !== false)
    .map((produk) => {
      const cocokKarakter = jumlahKecocokan(
        produk.profilAroma.karakter,
        karakter.cocokDengan,
      );
      const cocokWaktu = jumlahKecocokan(
        produk.profilAroma.cocokUntuk,
        waktu.cocokDengan,
      );
      const cocokOkasi = jumlahKecocokan(
        produk.profilAroma.cocokUntuk,
        okasi.cocokDengan,
      );
      const alasan = [
        cocokKarakter ? `karakter ${karakter.label.toLocaleLowerCase("id-ID")}` : "",
        cocokWaktu ? `nyaman dipakai ${waktu.label.toLocaleLowerCase("id-ID")}` : "",
        cocokOkasi ? `sesuai untuk ${okasi.label.toLocaleLowerCase("id-ID")}` : "",
      ].filter(Boolean);

      return {
        produk,
        skor: cocokKarakter * 4 + cocokWaktu * 2 + cocokOkasi * 3,
        alasan,
      };
    })
    .filter((hasil) => hasil.skor > 0)
    .sort((hasilA, hasilB) =>
      hasilB.skor !== hasilA.skor
        ? hasilB.skor - hasilA.skor
        : Number(hasilB.produk.unggulan) - Number(hasilA.produk.unggulan),
    )
    .slice(0, 3);
}
