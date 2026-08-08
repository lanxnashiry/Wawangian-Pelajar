import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import test from "node:test";
import { ambilFotoProduk, selaraskanRingkasanProduk } from "../data/produk.ts";

test("Produk Decant memakai foto Admin dan fallback WebP saat galeri kosong", () => {
  assert.deepEqual(
    ambilFotoProduk("decant", ["https://example.com/foto-admin.webp"]),
    ["https://example.com/foto-admin.webp"],
  );
  assert.deepEqual(
    ambilFotoProduk("decant", []),
    ["/produk-decant-mykonos.webp"],
  );

  const ukuran = statSync(new URL("../public/produk-decant-mykonos.webp", import.meta.url)).size;
  assert.ok(ukuran <= 200_000, `Aset Decant terlalu besar: ${ukuran} byte`);
});

test("Produk non-Decant mempertahankan foto database", () => {
  assert.deepEqual(
    ambilFotoProduk("ori", ["https://example.com/foto-besar.png"]),
    ["https://example.com/foto-besar.png"],
  );
});

test("ringkasan Decant menyelaraskan hitungan enam varian production", () => {
  assert.equal(
    selaraskanRingkasanProduk("decant", "Tersedia dalam lima varian pilihan."),
    "Tersedia dalam enam varian pilihan.",
  );
  assert.equal(
    selaraskanRingkasanProduk("ori", "Tersedia dalam lima varian pilihan."),
    "Tersedia dalam lima varian pilihan.",
  );
});

test("Detail Decant menjelaskan enam varian tanpa selector checkout", () => {
  const sumber = readFileSync(
    new URL("../app/(publik)/produk/[slug]/page.tsx", import.meta.url),
    "utf8",
  );

  for (const nama of [
    "California Blue",
    "California Signature",
    "Dreamscape",
    "Glitch",
    "Monaco Royale",
    "Royal Ispahan",
  ]) {
    assert.match(sumber, new RegExp(nama));
  }
  assert.match(sumber, /Pilihan aroma dilakukan di Shopee/);
  assert.doesNotMatch(sumber, /<select[^>]*name=["']varian/);
});

test("Artikel menyediakan jalur internal ke kuis dan katalog atau Decant", () => {
  const sumber = readFileSync(
    new URL("../app/(publik)/cerita/[slug]/page.tsx", import.meta.url),
    "utf8",
  );

  assert.match(sumber, /href="\/temukan"/);
  assert.match(sumber, /href="\/katalog"/);
  assert.match(sumber, /href="\/produk\/decant-mykonos-original-5ml-pilih-varian"/);
  assert.match(sumber, /artikel\.kategori === "edukasi"/);
});
