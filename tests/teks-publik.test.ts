import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function bacaSumber(jalur: string) {
  return readFileSync(new URL(jalur, import.meta.url), "utf8");
}

const sumberHalamanPublik = [
  "../app/(publik)/page.tsx",
  "../app/(publik)/katalog/page.tsx",
  "../app/(publik)/temukan/page.tsx",
  "../app/(publik)/donasi/page.tsx",
  "../app/(publik)/cerita/page.tsx",
  "../app/(publik)/cerita/[slug]/page.tsx",
  "../app/(publik)/produk/[slug]/page.tsx",
  "../app/(publik)/afiliasi/page.tsx",
  "../components/kartu-produk.tsx",
  "../components/kuis-temukan-wangimu.tsx",
  "../components/visual-data.tsx",
].map(bacaSumber).join("\n");

test("halaman publik tidak menampilkan catatan implementasi", () => {
  const frasaDilarang = [
    "Data terverifikasi",
    "Data contoh",
    "Portal afiliasi website dibangun pada M5",
    "Halaman transparansi lengkap dibangun pada M3",
    "Foto referensi menggunakan kemasan 50 ml",
    "dibaca dari penyimpanan resmi",
    "placeholder ditampilkan sementara",
    "Entri tanpa bukti tetap menjadi draft",
    "Konten contoh M1",
    "dinonaktifkan oleh Admin",
    "laporan platform yang diunggah Admin",
    "menyimpan jawaban ke database",
    "profil baku keluarga aroma",
  ];

  for (const frasa of frasaDilarang) {
    assert.doesNotMatch(sumberHalamanPublik, new RegExp(frasa, "i"));
  }
});

test("detail Produk hanya menampilkan tiga lapisan aroma", () => {
  const sumberDetailProduk = bacaSumber("../app/(publik)/produk/[slug]/page.tsx");
  const sumberVisualProduk = bacaSumber("../components/visual-data.tsx");

  assert.match(sumberDetailProduk, /\["Atas", produk\.profilAroma\.atas\]/);
  assert.match(sumberDetailProduk, /\["Tengah", produk\.profilAroma\.tengah\]/);
  assert.match(sumberDetailProduk, /\["Dasar", produk\.profilAroma\.dasar\]/);
  assert.doesNotMatch(sumberDetailProduk, /profilAroma\.karakter/);
  assert.doesNotMatch(sumberDetailProduk, /profilAroma\.cocokUntuk/);
  assert.match(sumberVisualProduk, /Foto produk \$\{produk\.nama\}/);
});

test("detail Produk menyediakan CTA ganda dan WhatsApp sekunder", () => {
  const sumberDetailProduk = bacaSumber("../app/(publik)/produk/[slug]/page.tsx");

  assert.equal((sumberDetailProduk.match(/<JembatanMarketplace/g) ?? []).length, 2);
  assert.match(sumberDetailProduk, /Tanya lewat WhatsApp/);
  assert.match(sumberDetailProduk, /encodeURIComponent/);
  assert.match(sumberDetailProduk, /kanalResmi\.whatsapp/);
});

test("harga Decant menampilkan nilai per ml tanpa harga coret palsu", () => {
  const sumberKartu = bacaSumber("../components/kartu-produk.tsx");
  const sumberDetail = bacaSumber("../app/(publik)/produk/[slug]/page.tsx");
  const gabungan = `${sumberKartu}\n${sumberDetail}`;

  assert.match(sumberKartu, /ambilNilaiDecant/);
  assert.match(sumberDetail, /ambilNilaiDecant/);
  assert.match(gabungan, /\/ml/);
  assert.doesNotMatch(gabungan, /<del|line-through|hargaCoret|harga_coret/);
});
