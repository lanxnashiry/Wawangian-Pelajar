import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import test from "node:test";
import {
  ambilLokasiFotoProduk,
  susunFotoProduk,
} from "../lib/admin/foto-produk.ts";
import { ambilFotoProduk } from "../data/produk.ts";

const baca = (jalur: string) =>
  readFileSync(new URL(jalur, import.meta.url), "utf8");

test("susunan foto mempertahankan urutan dan membatasi empat URL unik", () => {
  assert.deepEqual(
    susunFotoProduk(
      ["https://cdn.test/a.webp", "https://cdn.test/b.webp", "https://cdn.test/a.webp"],
      ["https://cdn.test/c.webp", "https://cdn.test/d.webp", "https://cdn.test/e.webp"],
    ),
    [
      "https://cdn.test/a.webp",
      "https://cdn.test/b.webp",
      "https://cdn.test/c.webp",
      "https://cdn.test/d.webp",
    ],
  );
});

test("lokasi Storage hanya diekstrak dari bucket produk project sendiri", () => {
  assert.equal(
    ambilLokasiFotoProduk(
      "https://jttepaxwjmmopflpgbac.supabase.co/storage/v1/object/public/produk/id-produk/foto.webp",
    ),
    "id-produk/foto.webp",
  );
  assert.equal(ambilLokasiFotoProduk("/produk-decant-mykonos.webp"), undefined);
  assert.equal(
    ambilLokasiFotoProduk(
      "https://example.com/storage/v1/object/public/produk/id/foto.webp",
    ),
    undefined,
  );
});

test("Decant memakai foto Admin bila ada dan fallback lokal bila kosong", () => {
  assert.deepEqual(
    ambilFotoProduk("decant", ["https://cdn.test/foto-admin.webp"]),
    ["https://cdn.test/foto-admin.webp"],
  );
  assert.deepEqual(ambilFotoProduk("decant", []), ["/produk-decant-mykonos.webp"]);
});

test("galeri Produk accessible, tanpa autoplay, dan memakai object-contain", () => {
  const galeri = baca("../components/galeri-produk.tsx");
  assert.match(galeri, /aria-label="Foto sebelumnya"/);
  assert.match(galeri, /aria-label="Foto berikutnya"/);
  assert.match(galeri, /aria-live="polite"/);
  assert.match(galeri, /object-contain/);
  assert.match(galeri, /overflow-x-auto/);
  assert.doesNotMatch(galeri, /setInterval|autoplay|swiper|embla/i);
});

test("detail memakai GaleriProduk sedangkan kartu tetap menampilkan foto pertama utuh", () => {
  const detail = baca("../app/(publik)/produk/[slug]/page.tsx");
  const visual = baca("../components/visual-data.tsx");
  assert.match(detail, /<GaleriProduk produk=\{produk\}/);
  const sumberVisualProduk = visual.slice(
    visual.indexOf("export function VisualProduk"),
    visual.indexOf("export function VisualArtikel"),
  );
  assert.match(sumberVisualProduk, /object-contain/);
  assert.doesNotMatch(sumberVisualProduk, /object-cover/);
});

test("Admin mendukung maksimal empat foto, urutan utama, dan penghapusan", () => {
  const formulir = baca("../components/admin/formulir-produk.tsx");
  const pengelola = baca("../components/admin/pengelola-foto-produk.tsx");
  const tindakan = baca("../app/admin/(terlindungi)/produk/tindakan.ts");
  assert.match(formulir, /<PengelolaFotoProduk/);
  assert.match(pengelola, /multiple/);
  assert.match(pengelola, /Maksimal 4 foto/);
  assert.match(pengelola, /Jadikan utama/);
  assert.match(pengelola, /Hapus/);
  assert.match(tindakan, /formulir\s*\.getAll\("foto"\)/);
  assert.match(tindakan, /susunFotoProduk/);
  assert.match(tindakan, /\.remove\(lokasiFotoDihapus\)/);
});

test("seluruh permukaan memakai satu logo asli tanpa edit", () => {
  const url = new URL("../public/logo-wawangian-pelajar-resmi.png", import.meta.url);
  assert.ok(existsSync(url));
  assert.equal(statSync(url).size, 1_265_733);
  assert.equal(
    createHash("sha256").update(readFileSync(url)).digest("hex"),
    "06bc362ff15041486c74a1bb9a97c2a4956b4535353dc4cdb18ff863b52ce08b",
  );

  for (const jalur of [
    "../components/navigasi-utama.tsx",
    "../components/footer-utama.tsx",
    "../app/layout.tsx",
    "../components/skema-artikel.tsx",
  ]) {
    assert.match(baca(jalur), /logo-wawangian-pelajar-resmi\.png/);
  }
  assert.match(baca("../app/layout.tsx"), /WAWANGIAN PELAJAR — FRAGRANCE HOME/);
});
