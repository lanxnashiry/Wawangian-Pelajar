import assert from "node:assert/strict";
import test from "node:test";
import ExcelJS from "exceljs";
import JSZip from "jszip";
import {
  buatTemplateEntriMassal,
  bacaWorkbookEntriMassal,
  HEADER_ARTIKEL,
  HEADER_PRODUK,
  periksaKeamananArsipXlsx,
} from "../lib/admin/entri-massal/workbook.ts";

async function workbookUji() {
  const workbook = new ExcelJS.Workbook();
  const produk = workbook.addWorksheet("Produk");
  produk.addRow(["nama", "slug", "kategori", "ukuran", "harga", "ringkasan", "deskripsi", "aroma_atas", "aroma_tengah", "aroma_dasar", "karakter", "cocok_untuk", "foto_url", "link_shopee", "link_tiktok", "unggulan", "tersedia", "aktif", "warna"]);
  produk.addRow(["Produk A", "", "decant", "5 ml", 69000, "Ringkas", "Deskripsi", "Lemon", "Jasmine", "Musk", "fresh", "siang", "", "https://shopee.co.id/a", "", "tidak", "ya", "ya", "krem"]);
  produk.addRow(["Produk Rusak", "", "salah", "", "abc"]);

  const artikel = workbook.addWorksheet("Artikel");
  artikel.addRow(["judul", "slug", "kategori", "cuplikan", "isi_markdown", "meta_judul", "meta_deskripsi", "fokus_kata_kunci", "foto_url", "foto_alt", "warna", "menit_baca", "penulis", "share_aktif", "status"]);
  artikel.addRow(["Artikel Uji Bagus", "", "edukasi", "Cuplikan", "Pembuka\n\n## Isi\n\nParagraf", "", "", "", "", "", "tosca", 3, "Wawangian Pelajar", "ya", "terbit"]);
  return Buffer.from(await workbook.xlsx.writeBuffer());
}

test("template memiliki tiga sheet dan header kontrak", async () => {
  const buffer = await buatTemplateEntriMassal();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer as unknown as ExcelJS.Buffer);
  assert.deepEqual(workbook.worksheets.map((sheet) => sheet.name), ["Petunjuk", "Produk", "Artikel"]);
  assert.equal(workbook.getWorksheet("Produk")?.getRow(1).getCell(1).value, "nama");
  assert.equal(workbook.getWorksheet("Artikel")?.getRow(1).getCell(1).value, "judul");
  assert.equal(workbook.getWorksheet("Produk")?.rowCount, 1);
  assert.equal(workbook.getWorksheet("Artikel")?.rowCount, 1);
});

test("pembaca workbook memisahkan data produk dan artikel", async () => {
  const hasil = await bacaWorkbookEntriMassal(await workbookUji());
  assert.equal(hasil.produk.length, 2);
  assert.equal(hasil.artikel.length, 1);
  assert.equal(hasil.produk[0].baris, 2);
  assert.equal(hasil.produk[0].nilai.nama, "Produk A");
  assert.equal(hasil.artikel[0].nilai.isi_markdown, "Pembuka\n\n## Isi\n\nParagraf");
});

test("workbook tanpa sheet yang dikenali ditolak", async () => {
  const workbook = new ExcelJS.Workbook();
  workbook.addWorksheet("Lain").addRow(["x"]);
  const buffer = Buffer.from(await workbook.xlsx.writeBuffer());
  await assert.rejects(() => bacaWorkbookEntriMassal(buffer), /Produk.*Artikel/i);
});

test("header yang berubah ditolak agar kolom tidak bergeser diam-diam", async () => {
  const workbook = new ExcelJS.Workbook();
  workbook.addWorksheet("Produk").addRow(["nama_salah", "slug"]);
  const buffer = Buffer.from(await workbook.xlsx.writeBuffer());
  await assert.rejects(() => bacaWorkbookEntriMassal(buffer), /header.*Produk/i);
});

test("workbook dengan sheet atau kolom tambahan ditolak", async () => {
  const terlaluBanyakSheet = new ExcelJS.Workbook();
  terlaluBanyakSheet.addWorksheet("Produk").addRow([...HEADER_PRODUK]);
  terlaluBanyakSheet.addWorksheet("Artikel").addRow([...HEADER_ARTIKEL]);
  terlaluBanyakSheet.addWorksheet("Petunjuk");
  terlaluBanyakSheet.addWorksheet("Tersembunyi");
  const bufferBanyakSheet = Buffer.from(await terlaluBanyakSheet.xlsx.writeBuffer());
  await assert.rejects(
    () => bacaWorkbookEntriMassal(bufferBanyakSheet),
    /tiga sheet/i,
  );

  const kolomTambahan = new ExcelJS.Workbook();
  kolomTambahan.addWorksheet("Produk").addRow([
    "nama", "slug", "kategori", "ukuran", "harga", "ringkasan", "deskripsi",
    "aroma_atas", "aroma_tengah", "aroma_dasar", "karakter", "cocok_untuk",
    "foto_url", "link_shopee", "link_tiktok", "unggulan", "tersedia", "aktif", "warna", "kolom_liar",
  ]);
  const bufferKolomTambahan = Buffer.from(await kolomTambahan.xlsx.writeBuffer());
  await assert.rejects(
    () => bacaWorkbookEntriMassal(bufferKolomTambahan),
    /kolom tambahan/i,
  );
});

test("arsip XLSX yang mengembang berlebihan atau memiliki traversal ditolak sebelum ExcelJS", async () => {
  const zipBomb = new JSZip();
  zipBomb.file("xl/worksheets/sheet1.xml", "0".repeat(26 * 1024 * 1024));
  const bufferBomb = await zipBomb.generateAsync({ type: "nodebuffer", compression: "DEFLATE", compressionOptions: { level: 9 } });
  assert.equal(bufferBomb.length < 5 * 1024 * 1024, true);
  await assert.rejects(() => periksaKeamananArsipXlsx(bufferBomb), /ekstraksi|terlalu besar/i);

  const traversal = new JSZip();
  traversal.file("../rahasia.txt", "x");
  const bufferTraversal = await traversal.generateAsync({ type: "nodebuffer" });
  await assert.rejects(() => periksaKeamananArsipXlsx(bufferTraversal), /nama berkas|aman/i);
});

test("arsip dengan terlalu banyak entry ditolak", async () => {
  const zip = new JSZip();
  for (let i = 0; i < 101; i += 1) zip.file(`xl/data/${i}.xml`, "x");
  const buffer = await zip.generateAsync({ type: "nodebuffer" });
  await assert.rejects(() => periksaKeamananArsipXlsx(buffer), /100 entry/i);
});
