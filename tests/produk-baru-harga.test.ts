import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const migrasi = readFileSync(
  new URL(
    "../supabase/migrations/202608090015_tambah_lima_produk_dan_harga.sql",
    import.meta.url,
  ),
  "utf8",
);

const produkBaru = [
  ["mykonos-invade-50ml", "319000"],
  ["mykonos-reflection-50ml", "319000"],
  ["mykonos-reflection-elixir-50ml", "319000"],
  ["mykonos-conquer-100ml", "548000"],
  ["mykonos-penthouse-50ml", "319000"],
] as const;

const hargaBaru = [
  ["mykonos-glitch-100ml", "548000"],
  ["mykonos-monaco-royale-100ml", "548000"],
  ["mykonos-dreamscape-100ml", "548000"],
  ["mykonos-glitch-50ml", "319000"],
  ["mykonos-dreamscape-50ml", "298000"],
] as const;

test("migrasi memuat lima Produk baru dengan harga dan foto kosong", () => {
  for (const [slug, harga] of produkBaru) {
    assert.match(migrasi, new RegExp(`'${slug}'[\\s\\S]{0,80}${harga}`));
  }
  assert.match(migrasi, /'\{\}'::text\[\]/);
  assert.match(migrasi, /on conflict \(slug\) do update/i);
});

test("migrasi memperbarui tepat lima harga target", () => {
  for (const [slug, harga] of hargaBaru) {
    assert.match(migrasi, new RegExp(`\\('${slug}', ${harga}\\)`));
  }
  assert.match(migrasi, /diharapkan 5/i);
});

test("data aroma baru bersumber dari kanal resmi dan tidak memuat klaim performa", () => {
  assert.match(migrasi, /officialmykonos\.com/);
  assert.match(migrasi, /mykonos\.com\.my\/product\/invade/);
  assert.doesNotMatch(migrasi, /tahan lama seharian|12 jam|24 jam|projection|sillage/i);
});

test("nama Conquer mengikuti nama resmi, bukan Conqueror", () => {
  assert.match(migrasi, /Mykonos Conquer 100ml/);
  assert.doesNotMatch(migrasi, /Conqueror/i);
});
