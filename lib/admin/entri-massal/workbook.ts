import ExcelJS from "exceljs";
import JSZip from "jszip";
import type { BarisMentah } from "./validasi.ts";

const BATAS_ENTRY_ZIP = 100;
const BATAS_ENTRY_TEREKSTRAK = 10 * 1024 * 1024;
const BATAS_TOTAL_TEREKSTRAK = 25 * 1024 * 1024;

type EntryZipDenganUkuran = JSZip.JSZipObject & {
  unsafeOriginalName?: string;
  _data?: { uncompressedSize?: number };
};

export async function periksaKeamananArsipXlsx(buffer: Buffer) {
  let zip: JSZip;
  try {
    zip = await JSZip.loadAsync(buffer, { checkCRC32: false, createFolders: false });
  } catch {
    throw new Error("Berkas bukan arsip XLSX yang valid.");
  }
  const entries = Object.values(zip.files) as EntryZipDenganUkuran[];
  if (entries.length > BATAS_ENTRY_ZIP) throw new Error("Arsip XLSX maksimal memiliki 100 entry.");
  let total = 0;
  for (const entry of entries) {
    const nama = entry.unsafeOriginalName ?? entry.name;
    if (nama.startsWith("/") || nama.includes("\\") || nama.split("/").includes("..")) {
      throw new Error("Nama berkas di dalam arsip XLSX tidak aman.");
    }
    if (entry.dir) continue;
    const ukuran = entry._data?.uncompressedSize;
    if (!Number.isSafeInteger(ukuran) || ukuran === undefined || ukuran < 0) {
      throw new Error("Ukuran ekstraksi XLSX tidak dapat diverifikasi.");
    }
    if (ukuran > BATAS_ENTRY_TEREKSTRAK) throw new Error("Satu entry XLSX terlalu besar setelah ekstraksi.");
    total += ukuran;
    if (total > BATAS_TOTAL_TEREKSTRAK) throw new Error("Total ekstraksi XLSX melebihi batas aman 25 MB.");
  }
}

export const HEADER_PRODUK = [
  "nama", "slug", "kategori", "ukuran", "harga", "ringkasan", "deskripsi",
  "aroma_atas", "aroma_tengah", "aroma_dasar", "karakter", "cocok_untuk",
  "foto_url", "link_shopee", "link_tiktok", "unggulan", "tersedia", "aktif", "warna",
] as const;

export const HEADER_ARTIKEL = [
  "judul", "slug", "kategori", "cuplikan", "isi_markdown", "meta_judul",
  "meta_deskripsi", "fokus_kata_kunci", "foto_url", "foto_alt", "warna",
  "menit_baca", "penulis", "share_aktif", "status",
] as const;

export type BarisWorkbook = { baris: number; nilai: BarisMentah };

function nilaiSelKeTeks(nilai: ExcelJS.CellValue): string | number | boolean {
  if (nilai === null || nilai === undefined) return "";
  if (typeof nilai === "string" || typeof nilai === "number" || typeof nilai === "boolean") return nilai;
  if (nilai instanceof Date) return nilai.toISOString();
  if ("text" in nilai && typeof nilai.text === "string") return nilai.text;
  if ("result" in nilai && nilai.result !== undefined && nilai.result !== null) return String(nilai.result);
  if ("richText" in nilai && Array.isArray(nilai.richText)) return nilai.richText.map((item) => item.text).join("");
  return String(nilai);
}

function bacaSheet(sheet: ExcelJS.Worksheet, header: readonly string[]) {
  const aktual = header.map((_, indeks) => String(sheet.getRow(1).getCell(indeks + 1).value ?? "").trim());
  if (aktual.join("|") !== header.join("|")) {
    throw new Error(`Header sheet ${sheet.name} tidak sesuai template. Unduh template terbaru lalu salin data ke sana.`);
  }
  const hasil: BarisWorkbook[] = [];
  for (let nomor = 2; nomor <= sheet.rowCount; nomor += 1) {
    const row = sheet.getRow(nomor);
    const nilai: BarisMentah = {};
    let terisi = false;
    header.forEach((nama, indeks) => {
      const isi = nilaiSelKeTeks(row.getCell(indeks + 1).value);
      nilai[nama] = isi;
      if (String(isi).trim()) terisi = true;
    });
    if (terisi) hasil.push({ baris: nomor, nilai });
  }
  return hasil;
}

function gayaHeader(sheet: ExcelJS.Worksheet, jumlah: number) {
  const row = sheet.getRow(1);
  row.font = { bold: true, color: { argb: "FFFFFFFF" } };
  row.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF102A43" } };
  row.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
  row.height = 30;
  sheet.views = [{ state: "frozen", ySplit: 1 }];
  sheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: jumlah } };
  for (let kolom = 1; kolom <= jumlah; kolom += 1) sheet.getColumn(kolom).width = 20;
}

type SheetDenganValidasiRentang = ExcelJS.Worksheet & {
  dataValidations: {
    add: (rentang: string, validasi: ExcelJS.DataValidation) => void;
  };
};

function namaKolomExcel(indeks: number) {
  let hasil = "";
  let nilai = indeks;
  while (nilai > 0) {
    nilai -= 1;
    hasil = String.fromCharCode(65 + (nilai % 26)) + hasil;
    nilai = Math.floor(nilai / 26);
  }
  return hasil;
}

function tambahValidasi(sheet: ExcelJS.Worksheet, kolom: number, daftar: string[]) {
  const huruf = namaKolomExcel(kolom);
  (sheet as SheetDenganValidasiRentang).dataValidations.add(`${huruf}2:${huruf}501`, {
    type: "list",
    allowBlank: true,
    formulae: [`"${daftar.join(",")}"`],
    showErrorMessage: true,
    errorTitle: "Nilai tidak valid",
    error: `Pilih salah satu: ${daftar.join(", ")}`,
  });
}

export async function buatTemplateEntriMassal() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Wawangian Pelajar";
  workbook.created = new Date();
  const petunjuk = workbook.addWorksheet("Petunjuk");
  petunjuk.columns = [{ width: 28 }, { width: 95 }];
  petunjuk.addRows([
    ["ENTRI MASSAL", "Isi sheet Produk dan/atau Artikel. Jangan mengubah nama sheet atau header baris pertama."],
    ["Batas", "Maksimal 500 baris per sheet dan ukuran berkas 5 MB."],
    ["Daftar", "Pisahkan aroma/karakter/cocok_untuk dengan koma."],
    ["Boolean", "Gunakan ya atau tidak."],
    ["Slug", "Boleh kosong; sistem membuat otomatis. Slug ganda atau yang sudah ada akan ditolak."],
    ["Artikel", "Semua artikel hasil impor selalu disimpan sebagai draft, walau kolom status berisi terbit."],
    ["Foto", "Opsional. Isi URL HTTPS publik; unggah file gambar massal tidak didukung."],
    ["Keamanan", "Unggah selalu masuk pratinjau. Data baru disimpan setelah Admin menekan Impor baris valid."],
  ]);
  petunjuk.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  petunjuk.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF087477" } };

  const produk = workbook.addWorksheet("Produk");
  produk.addRow([...HEADER_PRODUK]);
  gayaHeader(produk, HEADER_PRODUK.length);
  tambahValidasi(produk, 3, ["ori", "decant", "inspirasi", "signature"]);
  tambahValidasi(produk, 16, ["ya", "tidak"]);
  tambahValidasi(produk, 17, ["ya", "tidak"]);
  tambahValidasi(produk, 18, ["ya", "tidak"]);
  tambahValidasi(produk, 19, ["krem", "tosca", "emas", "navy", "merahMuda"]);

  const artikel = workbook.addWorksheet("Artikel");
  artikel.addRow([...HEADER_ARTIKEL]);
  gayaHeader(artikel, HEADER_ARTIKEL.length);
  tambahValidasi(artikel, 3, ["cerita_misi", "edukasi", "tips", "komunitas"]);
  tambahValidasi(artikel, 11, ["tosca", "emas", "navy", "merahMuda"]);
  tambahValidasi(artikel, 14, ["ya", "tidak"]);
  tambahValidasi(artikel, 15, ["draft", "terbit"]);
  artikel.getColumn(5).width = 80;
  artikel.getColumn(5).alignment = { wrapText: true, vertical: "top" };

  return Buffer.from(await workbook.xlsx.writeBuffer());
}

export async function bacaWorkbookEntriMassal(buffer: Buffer) {
  await periksaKeamananArsipXlsx(buffer);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer as unknown as ExcelJS.Buffer);
  if (workbook.worksheets.length > 3) throw new Error("Workbook maksimal memiliki tiga sheet: Petunjuk, Produk, dan Artikel.");
  const produk = workbook.getWorksheet("Produk");
  const artikel = workbook.getWorksheet("Artikel");
  if (!produk && !artikel) throw new Error("Workbook wajib memiliki sheet Produk dan/atau Artikel.");
  if ((produk?.columnCount ?? 0) > HEADER_PRODUK.length || (artikel?.columnCount ?? 0) > HEADER_ARTIKEL.length) {
    throw new Error("Workbook memiliki kolom tambahan di luar template.");
  }
  return {
    produk: produk ? bacaSheet(produk, HEADER_PRODUK) : [],
    artikel: artikel ? bacaSheet(artikel, HEADER_ARTIKEL) : [],
  };
}
