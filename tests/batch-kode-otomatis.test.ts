import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const baca = (path: string) => readFileSync(path, "utf8");
const sql = baca("supabase/migrations/202610210018_m6_kode_batch_otomatis.sql");

test("kode batch dibuat server dari formula, varian, tanggal, dan urutan", () => {
  assert.match(sql, /p_formula \|\| '-' \|\| p_varian \|\| '-' \|\| to_char\(p_tanggal, 'YYYYMMDD'\)/);
  assert.match(sql, /lpad\(urut::text, 2, '0'\)/);
  assert.match(sql, /kode := public\.buat_kode_batch\(formula, varian, tanggal\)/);
  assert.doesNotMatch(sql, /kode text := upper\(trim\(p_kode\)\)/);
});

test("pembuatan kode aman saat simpan bersamaan dan dibatasi 99 urutan", () => {
  assert.match(sql, /pg_advisory_xact_lock\(hashtextextended\(awalan, 0\)\)/);
  assert.match(sql, /urut > 99/);
});

test("identitas terbit tetap terkunci dan draft hanya membuat kode baru bila identitas berubah", () => {
  assert.match(sql, /Identitas batch terbit dikunci/);
  assert.match(sql, /formula is distinct from lama\.kode_formula/);
  assert.match(sql, /kode := lama\.kode_batch;/);
  assert.match(sql, /if lama\.status = 'draft' then/);
});

test("kode varian empat racikan di-seed tepat dan formula wajib untuk batch baru", () => {
  for (const [slug, kode] of [["main-character-30ml", "MC"], ["afterclass-30ml", "AC"], ["secret-crush-30ml", "SC"], ["first-bell-30ml", "FB"]]) {
    assert.match(sql, new RegExp(`'${slug}' then '${kode}'`));
  }
  assert.match(sql, /jumlah <> 4/);
  assert.match(sql, /Kode formula wajib/);
  assert.match(sql, /produk\.kategori not in \('inspirasi', 'signature'\)/);
});

test("form tidak lagi menerima kode batch manual", () => {
  const form = baca("components/admin/formulir-batch.tsx");
  const tindakan = baca("app/admin/(terlindungi)/batch/tindakan.ts");
  assert.doesNotMatch(form, /name=["']kode_batch["']/);
  assert.match(form, /Dibuat otomatis saat disimpan/);
  assert.match(form, /name="kode_formula" required/);
  assert.doesNotMatch(tindakan, /form\.get\("kode_batch"\)/);
  assert.match(tindakan, /p_kode: ""/);
});
