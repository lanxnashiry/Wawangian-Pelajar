import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import test from "node:test";

const sumber = readFileSync(new URL("../app/(publik)/page.tsx", import.meta.url), "utf8");

const aset = [
  "beranda-koleksi-wawangian.webp",
  "prinsip-sumber-tepercaya.webp",
  "prinsip-untuk-pendidikan.webp",
  "prinsip-pilihan-terjangkau.webp",
];

test("homepage memakai visual kiriman pemilik pada hero dan tiga prinsip", () => {
  for (const nama of aset) {
    assert.match(sumber, new RegExp(`/${nama}`));
    assert.ok(statSync(new URL(`../public/${nama}`, import.meta.url)).size < 250_000);
  }
});

test("visual homepage memiliki alt deskriptif dan tidak menggantikan foto Produk", () => {
  assert.match(sumber, /alt="Koleksi parfum Wawangian Pelajar"/);
  assert.match(sumber, /alt=\{alasan\.alt\}/);
  assert.doesNotMatch(sumber, /VisualProduk produk=\{produkHero\}/);
});
