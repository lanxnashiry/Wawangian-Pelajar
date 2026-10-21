import assert from "node:assert/strict";
import test from "node:test";
import {
  buatUrlBatch,
  normalisasiKodeBatch,
  statusBatchPublik,
  validasiBatch,
  validasiTransisiStatus,
} from "../lib/batch/validasi.ts";

test("kode batch dinormalisasi konsisten dan menolak karakter berbahaya", () => {
  assert.equal(normalisasiKodeBatch(" mc-20260818-01 "), "MC-20260818-01");
  for (const kode of ["MC 01", "MC/01", "MС-01", "-MC", "MC-", "MC--01"]) {
    assert.ok(validasiBatch({ kodeBatch: kode, produkId: "p", tanggalProduksi: "2026-08-18" }, "2026-08-18").kodeBatch);
  }
});

test("validasi batch menolak field wajib, batas teks, dan tanggal masa depan Jakarta", () => {
  const galat = validasiBatch({ kodeBatch: "", produkId: "", tanggalProduksi: "2026-08-19", kodeFormula: "x".repeat(101), catatanInternal: "x".repeat(2001), keteranganPublik: "x".repeat(501) }, "2026-08-18");
  assert.deepEqual(Object.keys(galat).sort(), ["catatanInternal", "keteranganPublik", "kodeBatch", "kodeFormula", "produkId", "tanggalProduksi"].sort());
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
