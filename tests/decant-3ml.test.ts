import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const jalurMigrasi = new URL(
  "../supabase/migrations/202608100016_tambah_decant_mykonos_3ml.sql",
  import.meta.url,
);

test("migrasi menambahkan Decant Mykonos 3 ml seharga Rp45.000", () => {
  const migrasi = readFileSync(jalurMigrasi, "utf8");

  assert.match(migrasi, /Decant Mykonos Original 3ml – Pilih Varian/);
  assert.match(migrasi, /decant-mykonos-original-3ml-pilih-varian/);
  assert.match(migrasi, /'3 ml'/);
  assert.match(migrasi, /45000/);
  assert.match(migrasi, /Paling Direkomendasikan/i);
  assert.match(migrasi, /on conflict \(slug\) do update/i);
});

test("Decant 3 ml menyalin galeri Decant yang sudah ada tanpa URL baru", () => {
  const migrasi = readFileSync(jalurMigrasi, "utf8");

  assert.match(migrasi, /decant-mykonos-original-10ml-pilih-varian/);
  assert.match(migrasi, /foto_sumber/);
  assert.doesNotMatch(migrasi, /https?:\/\/[^'\s]+\.(?:png|jpe?g|webp)/i);
  assert.match(migrasi, /cardinality\(foto_sumber\) = 0/i);
});

test("deskripsi Decant 3 ml jujur dan tidak menjamin jumlah semprotan", () => {
  const migrasi = readFileSync(jalurMigrasi, "utf8");

  assert.match(migrasi, /tanpa pengenceran/i);
  assert.match(migrasi, /bukan botol full size/i);
  assert.match(migrasi, /beberapa kali pemakaian/i);
  assert.doesNotMatch(migrasi, /\d+\s*[–-]\s*\d+\s*kali semprot/i);
});
