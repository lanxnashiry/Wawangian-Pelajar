import assert from "node:assert/strict";
import test from "node:test";
import {
  validasiBarisArtikel,
  validasiBarisProduk,
  validasiDuplikatSlug,
} from "../lib/admin/entri-massal/validasi.ts";

const produkSah = {
  nama: "Wangi Uji 5 ml",
  slug: "",
  kategori: "decant",
  ukuran: "5 ml",
  harga: "69000",
  ringkasan: "Wangi uji untuk memeriksa impor.",
  deskripsi: "Deskripsi produk uji yang lengkap.",
  aroma_atas: "Bergamot, Lemon",
  aroma_tengah: "Jasmine",
  aroma_dasar: "Musk",
  karakter: "fresh, clean",
  cocok_untuk: "siang, kuliah",
  foto_url: "https://contoh.test/foto.webp",
  link_shopee: "https://shopee.co.id/produk-uji",
  link_tiktok: "",
  unggulan: "tidak",
  tersedia: "ya",
  aktif: "ya",
  warna: "krem",
};

const artikelSah = {
  judul: "Artikel Uji Entri Massal",
  slug: "",
  kategori: "edukasi",
  cuplikan: "Cuplikan yang menjelaskan isi artikel uji.",
  isi_markdown: "Paragraf pembuka.\n\n## Subjudul\n\nIsi berikutnya.",
  meta_judul: "Artikel Uji",
  meta_deskripsi: "Deskripsi pencarian artikel uji.",
  fokus_kata_kunci: "artikel uji",
  foto_url: "https://contoh.test/artikel.webp",
  foto_alt: "Ilustrasi artikel uji",
  warna: "tosca",
  menit_baca: "4",
  penulis: "Wawangian Pelajar",
  share_aktif: "ya",
  status: "terbit",
};

test("produk sah dinormalisasi dan slug dibuat otomatis", () => {
  const hasil = validasiBarisProduk(produkSah, 2);
  assert.equal(hasil.galat.length, 0);
  assert.equal(hasil.data?.slug, "wangi-uji-5-ml");
  assert.equal(hasil.data?.harga, 69000);
  assert.deepEqual(hasil.data?.aroma_atas, ["Bergamot", "Lemon"]);
  assert.equal(hasil.data?.aktif, true);
  assert.deepEqual(hasil.data?.foto, ["https://contoh.test/foto.webp"]);
});

test("produk menolak harga desimal, kategori salah, dan URL marketplace palsu", () => {
  const hasil = validasiBarisProduk({
    ...produkSah,
    harga: "69.5",
    kategori: "palsu",
    link_shopee: "https://jahat.test/shopee",
  }, 7);
  assert.match(hasil.galat.join(" "), /harga/i);
  assert.match(hasil.galat.join(" "), /kategori/i);
  assert.match(hasil.galat.join(" "), /Shopee/i);
});

test("produk inspirasi tetap menjalankan BR-4", () => {
  const hasil = validasiBarisProduk({
    ...produkSah,
    kategori: "inspirasi",
    aroma_tengah: "Dior Sauvage",
  }, 3);
  assert.match(hasil.galat.join(" "), /dior/i);
});

test("artikel sah selalu menjadi draft walau workbook meminta terbit", () => {
  const hasil = validasiBarisArtikel(artikelSah, 2);
  assert.equal(hasil.galat.length, 0);
  assert.equal(hasil.data?.slug, "artikel-uji-entri-massal");
  assert.equal(hasil.data?.status, "draft");
  assert.equal(hasil.data?.tanggal_terbit, null);
  assert.equal(hasil.peringatan.some((item) => /draft/i.test(item)), true);
});

test("artikel menolak H1 Markdown dan metadata terlalu panjang", () => {
  const hasil = validasiBarisArtikel({
    ...artikelSah,
    isi_markdown: "# H1 liar\n\nIsi.",
    meta_judul: "x".repeat(71),
    meta_deskripsi: "y".repeat(201),
  }, 9);
  assert.match(hasil.galat.join(" "), /H1/i);
  assert.match(hasil.galat.join(" "), /70/);
  assert.match(hasil.galat.join(" "), /200/);
});

test("slug ganda antarbaris ditandai pada semua baris terkait", () => {
  const hasil = validasiDuplikatSlug([
    { baris: 2, slug: "sama" },
    { baris: 3, slug: "berbeda" },
    { baris: 4, slug: "sama" },
  ]);
  assert.deepEqual(hasil.get(2), ["Slug sama dipakai lebih dari sekali dalam berkas."]);
  assert.deepEqual(hasil.get(4), ["Slug sama dipakai lebih dari sekali dalam berkas."]);
  assert.equal(hasil.has(3), false);
});

test("URL foto harus HTTPS dan boolean harus eksplisit", () => {
  const hasil = validasiBarisProduk({
    ...produkSah,
    foto_url: "http://contoh.test/foto.jpg",
    aktif: "mungkin",
  }, 5);
  assert.match(hasil.galat.join(" "), /HTTPS/i);
  assert.match(hasil.galat.join(" "), /aktif/i);
});
