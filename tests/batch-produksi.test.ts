import assert from "node:assert/strict";
import test from "node:test";
import {
  buatUrlBatch,
  kodeBatchValid,
  kodeFormulaValid,
  normalisasiKodeBatch,
  statusBatchPublik,
  validasiBatch,
  validasiTransisiStatus,
} from "../lib/batch/validasi.ts";

test("kode batch lama tetap dinormalisasi dan kode formula menolak karakter berbahaya", () => {
  assert.equal(normalisasiKodeBatch(" av-t03-mc-20261021-01 "), "AV-T03-MC-20261021-01");
  assert.equal(kodeBatchValid("AV-T03-MC-20261021-01"), true);
  assert.equal(kodeFormulaValid(" av-t03 "), true);
  for (const kode of ["", "AV T03", "AV/T03", "AV-Т03", "-AV", "AV-", "AV--T03", "X".repeat(21)]) {
    assert.ok(validasiBatch({ kodeFormula: kode, produkId: "p", tanggalProduksi: "2026-08-18" }, "2026-08-18").kodeFormula, kode);
  }
});

test("validasi batch menolak field wajib, batas teks, dan tanggal masa depan Jakarta", () => {
  const galat = validasiBatch({ produkId: "", tanggalProduksi: "2026-08-19", kodeFormula: "x".repeat(21), catatanInternal: "x".repeat(2001), keteranganPublik: "x".repeat(501) }, "2026-08-18");
  assert.deepEqual(Object.keys(galat).sort(), ["catatanInternal", "keteranganPublik", "kodeFormula", "produkId", "tanggalProduksi"].sort());
});

test("transisi status memerlukan alasan dan keterangan sesuai aturan", () => {
  assert.equal(validasiTransisiStatus("draft", "diedarkan", "", ""), null);
  assert.match(validasiTransisiStatus("diedarkan", "ditarik", "", "Hentikan penggunaan") ?? "", /alasan/i);
  assert.match(validasiTransisiStatus("diedarkan", "nonaktif", "Alasan", "") ?? "", /keterangan publik/i);
  assert.match(validasiTransisiStatus("ditarik", "draft", "Alasan", "Info") ?? "", /tidak diizinkan/i);
});

test("proyeksi status dan URL QR stabil tidak membocorkan data internal", () => {
  assert.deepEqual(statusBatchPublik("ditarik"), { label: "Ditarik", bahaya: true });
  assert.equal(buatUrlBatch("https://www.wawangianpelajar.com/", "mc-01"), "https://www.wawangianpelajar.com/batch/MC-01");
  assert.throws(() => buatUrlBatch("http://localhost:3000", "MC-01"), /HTTPS/);
});
