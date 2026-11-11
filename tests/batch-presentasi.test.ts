import assert from "node:assert/strict";
import test from "node:test";
import * as presentasi from "../lib/batch/validasi.ts";

test("presentasi membedakan sukses, penarikan, nonaktif, dan menolak status asing", () => {
  assert.equal(typeof presentasi.presentasiStatusBatch, "function");
  const tampil = presentasi.presentasiStatusBatch;
  assert.deepEqual(tampil("diedarkan"), { heading: "Batch terdaftar di Wawangian Pelajar", instruksi: "Kode pada kemasan ini cocok dengan catatan batch produksi kami.", label: "Diedarkan", tingkat: "sukses" });
  assert.deepEqual(tampil("ditarik"), { heading: "Batch ini sedang ditarik dari peredaran", instruksi: "Hentikan penggunaan dan hubungi Wawangian Pelajar untuk petunjuk penanganan.", label: "Ditarik dari peredaran", tingkat: "bahaya" });
  assert.deepEqual(tampil("nonaktif"), { heading: "Catatan batch ini dinonaktifkan", instruksi: "Hubungi Wawangian Pelajar untuk memastikan informasi batch pada kemasan ini.", label: "Nonaktif", tingkat: "peringatan" });
  for (const nilai of ["draft", "asing", null, undefined, "toString"]) assert.equal(tampil(nilai), null);
});
// Fixture terisolasi; tidak pernah dimasukkan ke database.
const contoh = { kode_batch: "UJI-MC-20261021-01", nama_varian: "Nama snapshot uji", tanggal_produksi: "2026-10-21", status: "diedarkan", keterangan_publik: null };

test("tanggal kalender Indonesia dan data RPC rusak gagal tertutup", () => {
  assert.equal(typeof presentasi.formatTanggalBatch, "function");
  assert.equal(presentasi.formatTanggalBatch("2026-10-21"), "21 Oktober 2026");
  assert.equal(presentasi.formatTanggalBatch("2024-02-29"), "29 Februari 2024");
  for (const nilai of ["2026-02-29", "2026-02-31", "2026-10-21T00:00:00Z", "", null]) assert.equal(presentasi.formatTanggalBatch(nilai), null);
  assert.deepEqual(presentasi.bacaBatchPublik(contoh, contoh.kode_batch), contoh);
  for (const ubah of [{ status: "draft" }, { status: "asing" }, { tanggal_produksi: "2026-02-31" }, { nama_varian: "" }, { kode_batch: "UJI-LAIN" }, { keterangan_publik: {} }]) assert.equal(presentasi.bacaBatchPublik({ ...contoh, ...ubah }, contoh.kode_batch), null);
  assert.equal(presentasi.bacaBatchPublik(null, contoh.kode_batch), null);
  assert.equal(presentasi.bacaBatchPublik({ ...contoh, keterangan_publik: "" }, contoh.kode_batch)?.keterangan_publik, "");
  assert.equal(presentasi.bacaBatchPublik({ ...contoh, nama_varian: "<script>uji</script>" }, contoh.kode_batch)?.nama_varian, "<script>uji</script>");
});

test("kontak WhatsApp mengganti text tanpa merusak query dan fallback kanal resmi", () => {
  assert.equal(typeof presentasi.buatKontakBatch, "function");
  const pesan = "Halo Wawangian Pelajar, saya ingin menanyakan Nama & Uji, batch UJI-MC-01. Status di halaman: Diedarkan.";
  const hasil = presentasi.buatKontakBatch({ whatsapp: "https://wa.me/620000000?text=lama&asal=web", email: "mailto:uji@example.com" }, pesan);
  const url = new URL(hasil!.url);
  assert.equal(url.searchParams.getAll("text").length, 1);
  assert.equal(url.searchParams.get("text"), pesan);
  assert.equal(url.searchParams.get("asal"), "web");
  for (const whatsapp of [null, "", "javascript:alert(1)", "https://palsu.example/123", "https://wa.me/"]) assert.deepEqual(presentasi.buatKontakBatch({ whatsapp, email: "mailto:uji@example.com" }, pesan), { url: "mailto:uji@example.com", label: "Hubungi Wawangian Pelajar" });
  assert.equal(presentasi.buatKontakBatch({ whatsapp: null, email: null }, pesan), null);
});
 