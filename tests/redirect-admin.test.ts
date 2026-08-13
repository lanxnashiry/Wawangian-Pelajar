import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function baca(jalur: string) {
  return readFileSync(new URL(jalur, import.meta.url), "utf8");
}

test("simpan Produk sukses kembali ke daftar Produk", () => {
  const tindakan = baca("../app/admin/(terlindungi)/produk/tindakan.ts");
  assert.match(tindakan, /redirect\("\/admin\/produk\?pesan=Produk\+berhasil\+disimpan"\)/);
  assert.doesNotMatch(tindakan, /redirect\(`\/admin\/produk\/\$\{hasil\.data\.id\}/);
});

test("simpan Artikel sukses kembali ke daftar Konten", () => {
  const tindakan = baca("../app/admin/(terlindungi)/konten/tindakan.ts");
  assert.match(tindakan, /redirect\("\/admin\/konten\?pesan=Artikel\+berhasil\+disimpan"\)/);
  assert.doesNotMatch(tindakan, /redirect\(`\/admin\/konten\/\$\{hasil\.data\.id\}/);
});
