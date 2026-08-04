import assert from "node:assert/strict";
import test from "node:test";
import { prosesBarisEntriMassal } from "../lib/admin/entri-massal/proses.ts";

const produk = {
  nama: "Produk Uji", slug: "produk-uji", kategori: "decant", ukuran: "5 ml", harga: "69000",
  ringkasan: "Ringkasan", deskripsi: "Deskripsi", aroma_atas: "Lemon", aroma_tengah: "Jasmine",
  aroma_dasar: "Musk", karakter: "fresh", cocok_untuk: "siang", foto_url: "",
  link_shopee: "", link_tiktok: "", unggulan: "tidak", tersedia: "ya", aktif: "ya", warna: "krem",
};
const artikel = {
  judul: "Artikel Uji Impor", slug: "artikel-uji", kategori: "edukasi", cuplikan: "Cuplikan",
  isi_markdown: "Pembuka\n\n## Isi\n\nParagraf", meta_judul: "", meta_deskripsi: "",
  fokus_kata_kunci: "", foto_url: "", foto_alt: "", warna: "tosca", menit_baca: "3",
  penulis: "Wawangian Pelajar", share_aktif: "ya", status: "draft",
};

test("proses menandai slug yang sudah ada di database", () => {
  const hasil = prosesBarisEntriMassal(
    { produk: [{ baris: 2, nilai: produk }], artikel: [{ baris: 2, nilai: artikel }] },
    new Set(["produk-uji"]), new Set(["artikel-uji"]),
  );
  assert.match(hasil.produk[0].galat.join(" "), /sudah ada/i);
  assert.match(hasil.artikel[0].galat.join(" "), /sudah ada/i);
  assert.equal(hasil.ringkasan.valid, 0);
  assert.equal(hasil.ringkasan.galat, 2);
});

test("proses menandai slug ganda antarbaris dan menghitung ringkasan", () => {
  const hasil = prosesBarisEntriMassal({
    produk: [{ baris: 2, nilai: produk }, { baris: 3, nilai: { ...produk, nama: "Produk Kedua" } }],
    artikel: [{ baris: 2, nilai: { ...artikel, slug: "artikel-lain" } }],
  }, new Set(), new Set());
  assert.equal(hasil.produk.every((baris) => baris.galat.some((g) => /lebih dari sekali/.test(g))), true);
  assert.equal(hasil.ringkasan.total, 3);
  assert.equal(hasil.ringkasan.valid, 1);
  assert.equal(hasil.ringkasan.galat, 2);
});

test("batas 500 baris per sheet ditolak", () => {
  const banyak = Array.from({ length: 501 }, (_, i) => ({ baris: i + 2, nilai: { ...produk, slug: `produk-${i}` } }));
  assert.throws(() => prosesBarisEntriMassal({ produk: banyak, artikel: [] }, new Set(), new Set()), /500/);
});
