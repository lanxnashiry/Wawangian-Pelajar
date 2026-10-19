import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { tanggalKalenderValid, validasiTransisiStatus } from "../lib/batch/validasi.ts";

const baca = (path: string) => readFileSync(path, "utf8");
const sql = baca("supabase/migrations/202610180017_m6_batch_produksi_qr.sql");

test("tanggal kalender mustahil ditolak", () => {
  assert.equal(tanggalKalenderValid("2026-02-31"), false);
  assert.equal(tanggalKalenderValid("2024-02-29"), true);
  assert.equal(tanggalKalenderValid("2026-02-28"), true);
});

test("state machine menolak transisi arbitrer dan mewajibkan alasan", () => {
  assert.match(validasiTransisiStatus("draft", "ditarik", "alasan", "publik") ?? "", /tidak diizinkan/i);
  assert.match(validasiTransisiStatus("diedarkan", "diedarkan", "", "") ?? "", /tidak diizinkan/i);
  assert.equal(validasiTransisiStatus("ditarik", "diedarkan", "sudah diverifikasi", ""), null);
});

test("RPC adalah trust boundary dan snapshot nama berasal dari Produk relevan", () => {
  assert.doesNotMatch(sql, /p_nama\s+text/i);
  assert.match(sql, /from public\.produk where id = p_produk/i);
  assert.match(sql, /produk\.aktif is not true or produk\.kategori not in \('inspirasi', 'signature'\)/i);
  assert.match(sql, /nama_varian[\s\S]*produk\.nama|produk\.nama[\s\S]*nama_varian/i);
  assert.doesNotMatch(sql, /trim\(produk\.nama\) <> lama\.nama_varian/i);
  assert.match(sql, /nama_varian = case when lama\.status = 'draft'[\s\S]*else lama\.nama_varian/i);
  assert.match(sql, /char_length\(kode\) not between 3 and 40/i);
  assert.match(sql, /p_status not in \('draft', 'diedarkan', 'ditarik', 'nonaktif'\)/i);
  assert.match(sql, /p_tanggal[\s\S]*make_date|make_date[\s\S]*p_tanggal/i);
});

test("SQL mengunci identitas, RLS/grant minimal, whitelist publik, dan audit atomik", () => {
  assert.match(sql, /Identitas batch terbit dikunci/i);
  assert.match(sql, /enable row level security/i);
  assert.match(sql, /revoke all on public\.batch_produksi from anon, authenticated/i);
  assert.match(sql, /returns table\(\s*kode_batch text,\s*nama_varian text,\s*tanggal_produksi date,\s*status text,\s*keterangan_publik text\s*\)/i);
  assert.match(sql, /insert into public\.log_audit/i);
  assert.match(sql, /transisi status tidak diizinkan/i);
});

test("UI tidak menerima snapshot nama tersembunyi dan QR tidak memakai HTML mentah", () => {
  const form = baca("components/admin/formulir-batch.tsx");
  const qr = baca("app/admin/(terlindungi)/batch/[id]/qr/page.tsx");
  assert.doesNotMatch(form, /name=["']nama_varian["']/);
  assert.match(form, /name=["']konfirmasi_terbit["']/);
  const tindakan = baca("app/admin/(terlindungi)/batch/tindakan.ts");
  assert.match(tindakan, /konfirmasiTerbit/);
  assert.doesNotMatch(qr, /dangerouslySetInnerHTML/);
  assert.match(qr, /force-dynamic/);
  assert.match(qr, /noStore\(\)/);
});

test("rute dan navigasi Modul Batch tersedia", () => {
  const nav = baca("components/admin/navigasi-admin.tsx");
  const footer = baca("components/footer-utama.tsx");
  assert.match(nav, /\/admin\/batch/);
  assert.match(footer, /\/cek-batch/);
  for (const path of [
    "app/(publik)/cek-batch/page.tsx",
    "app/(publik)/batch/[kode_batch]/page.tsx",
    "app/admin/(terlindungi)/batch/page.tsx",
  ]) assert.ok(baca(path).length > 0);
});
