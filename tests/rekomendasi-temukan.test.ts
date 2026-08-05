import assert from "node:assert/strict";
import test from "node:test";
import type { Produk } from "../data/produk.ts";
import type { ProfilRekomendasi } from "../data/profil-rekomendasi.ts";
import {
  ambilProdukDecant,
  opsiAroma,
  opsiIntensitas,
  opsiKegiatan,
  opsiKesan,
  opsiWaktu,
  parameterJawabanKuis,
  petakanJawabanKuisLama,
  rekomendasikanProduk,
  type JawabanKuis,
} from "../lib/kuis/rekomendasi.ts";

const profil: ProfilRekomendasi[] = [
  {
    id: "1", kode: "california-blue", nama: "Mykonos California Blue",
    tagAroma: ["segar-akuatik", "fruity-ceria", "manis-gourmand"],
    tagKesan: ["bersih-ringan", "ceria-playful"], tagIntensitas: ["ringan"],
    tagWaktu: ["siang-panas"], tagKegiatan: ["sehari-hari", "hangout-aktif"], aktif: true,
  },
  {
    id: "2", kode: "california-signature", nama: "Mykonos California Signature",
    tagAroma: ["segar-akuatik", "woody-hangat"],
    tagKesan: ["bersih-ringan", "elegan-dewasa"], tagIntensitas: ["sedang"],
    tagWaktu: ["siang-panas"], tagKegiatan: ["kampus-kerja", "sehari-hari", "hangout-aktif"], aktif: true,
  },
  {
    id: "3", kode: "dreamscape", nama: "Mykonos Dreamscape",
    tagAroma: ["fruity-ceria", "manis-gourmand"],
    tagKesan: ["ceria-playful", "hangat-nyaman"], tagIntensitas: ["kuat"],
    tagWaktu: ["fleksibel"], tagKegiatan: ["sehari-hari", "hangout-aktif"], aktif: true,
  },
  {
    id: "4", kode: "monaco-royale", nama: "Mykonos Monaco Royale",
    tagAroma: ["segar-akuatik", "fruity-ceria", "woody-hangat", "manis-gourmand"],
    tagKesan: ["elegan-dewasa", "hangat-nyaman", "romantis-lembut"], tagIntensitas: ["sedang"],
    tagWaktu: ["malam-sejuk", "fleksibel"], tagKegiatan: ["sehari-hari", "kencan"], aktif: true,
  },
  {
    id: "5", kode: "royal-ispahan", nama: "Mykonos Royal Ispahan",
    tagAroma: ["floral-lembut", "fruity-ceria", "manis-gourmand"],
    tagKesan: ["romantis-lembut", "hangat-nyaman", "elegan-dewasa"], tagIntensitas: ["kuat"],
    tagWaktu: ["malam-sejuk", "fleksibel"], tagKegiatan: ["sehari-hari", "kencan", "formal-acara-khusus"], aktif: true,
  },
];

function produkUntuk(profilRekomendasi: ProfilRekomendasi, ukuran: string): Produk {
  return {
    id: `${profilRekomendasi.id}-${ukuran}`,
    slug: `${profilRekomendasi.kode}-${ukuran.replace(/\s/g, "")}`,
    nama: `${profilRekomendasi.nama} ${ukuran}`,
    kategori: "ori",
    ukuran,
    harga: ukuran === "15 ml" ? 119000 : ukuran === "50 ml" ? 289000 : 539000,
    ringkasan: "Produk fixture khusus pengujian.",
    deskripsi: "Produk fixture khusus pengujian.",
    profilAroma: { atas: ["Lemon"], tengah: ["Jasmine"], dasar: ["Musk"], karakter: ["Fresh"], cocokUntuk: ["Siang"] },
    profilRekomendasi,
    unggulan: profilRekomendasi.kode === "california-blue",
    tersedia: true,
    aktif: true,
    warna: "tosca",
    sumberData: "supabase",
  };
}

const semuaProduk = profil.flatMap((item) => ["100 ml", "15 ml", "50 ml"].map((ukuran) => produkUntuk(item, ukuran)));
const produkDecant: Produk = {
  ...produkUntuk(profil[0], "1 ml"),
  id: "decant-1",
  slug: "decant-mykonos-1ml",
  nama: "Decant Mykonos 1 ml",
  kategori: "decant",
  profilRekomendasi: undefined,
};

test("seluruh 1.125 kombinasi menghasilkan tiga keluarga unik tanpa decant", () => {
  let jumlah = 0;
  for (const aroma of opsiAroma) {
    for (const kesan of opsiKesan) {
      for (const intensitas of opsiIntensitas) {
        for (const waktu of opsiWaktu) {
          for (const kegiatan of opsiKegiatan) {
            const jawaban: JawabanKuis = {
              aroma: aroma.nilai,
              kesan: kesan.nilai,
              intensitas: intensitas.nilai,
              waktu: waktu.nilai,
              kegiatan: kegiatan.nilai,
            };
            const hasil = rekomendasikanProduk([...semuaProduk, produkDecant], jawaban);
            assert.equal(hasil.length, 3);
            assert.equal(new Set(hasil.map((item) => item.profil.id)).size, 3);
            assert.equal(hasil.some((item) => item.varian.some((produk) => produk.kategori === "decant")), false);
            assert.equal(hasil.every((item) => item.varian.length === 3), true);
            jumlah += 1;
          }
        }
      }
    }
  }
  assert.equal(jumlah, 1125);
});

test("hasil memakai bobot baku dan mengurutkan ukuran dari kecil", () => {
  const jawaban: JawabanKuis = {
    aroma: "segar-akuatik",
    kesan: "bersih-ringan",
    intensitas: "ringan",
    waktu: "siang-panas",
    kegiatan: "hangout-aktif",
  };
  const hasil = rekomendasikanProduk(semuaProduk, jawaban);
  assert.equal(hasil[0].profil.kode, "california-blue");
  assert.equal(hasil[0].skor, 15);
  assert.equal(hasil[0].tingkat, "Sangat sesuai");
  assert.deepEqual(hasil[0].varian.map((item) => item.ukuran), ["15 ml", "50 ml", "100 ml"]);
});

test("produk nonaktif atau tidak tersedia tidak ikut hasil", () => {
  const jawaban: JawabanKuis = {
    aroma: "floral-lembut",
    kesan: "romantis-lembut",
    intensitas: "kuat",
    waktu: "malam-sejuk",
    kegiatan: "formal-acara-khusus",
  };
  const tidakTersedia = semuaProduk.map((item) =>
    item.profilRekomendasi?.kode === "royal-ispahan" ? { ...item, tersedia: false } : item,
  );
  const hasil = rekomendasikanProduk(tidakTersedia, jawaban);
  assert.equal(hasil.some((item) => item.profil.kode === "royal-ispahan"), false);
});

test("decant hanya diambil oleh daftar CTA", () => {
  assert.deepEqual(ambilProdukDecant([...semuaProduk, produkDecant]).map((item) => item.slug), ["decant-mykonos-1ml"]);
});

test("tautan lama dipetakan ke lima jawaban dan URL baru", () => {
  const jawaban = petakanJawabanKuisLama({ karakter: "fresh", waktu: "siang", okasi: "kuliah-kerja" });
  assert.deepEqual(jawaban, {
    aroma: "segar-akuatik",
    kesan: "bersih-ringan",
    intensitas: "sedang",
    waktu: "siang-panas",
    kegiatan: "kampus-kerja",
  });
  assert.equal(parameterJawabanKuis(jawaban!).toString(), "aroma=segar-akuatik&kesan=bersih-ringan&intensitas=sedang&waktu=siang-panas&kegiatan=kampus-kerja");
});

test("jawaban tidak lengkap tidak membuka rekomendasi", () => {
  assert.deepEqual(rekomendasikanProduk(semuaProduk, {
    aroma: "segar-akuatik", kesan: "", intensitas: "", waktu: "", kegiatan: "",
  }), []);
});
