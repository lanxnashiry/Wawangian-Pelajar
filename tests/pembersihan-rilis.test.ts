import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const akar = process.cwd();
const baca = (path: string) => readFileSync(join(akar, path), "utf8");

test("runtime tidak lagi memiliki sakelar atau dataset Data Contoh", () => {
  const berkas = [
    ".env.example",
    "data/produk.ts",
    "data/artikel.ts",
    "lib/data/publik.ts",
    "lib/data/donasi.ts",
    "app/(publik)/layout.tsx",
  ];
  const gabungan = berkas.map(baca).join("\n");
  assert.doesNotMatch(gabungan, /MODE_PRATINJAU_DATA_CONTOH|Data Contoh|daftarProduk|daftarArtikel|ringkasanDonasiContoh/);
});

test("kegagalan Supabase publik fail closed, bukan fallback ke data buatan", () => {
  const publik = baca("lib/data/publik.ts");
  assert.match(publik, /konfigurasiSupabasePublikTersedia\(\)\) return \[\]/);
  assert.doesNotMatch(publik, /return daftarProduk|return daftarArtikel/);
});

test("route agregat publik memakai ISR lima menit", () => {
  for (const path of ["app/(publik)/page.tsx", "app/(publik)/katalog/page.tsx", "app/(publik)/donasi/page.tsx"]) {
    assert.match(baca(path), /export const revalidate = 300/);
  }
});

test("detail Produk memasang schema Product dan Offer", () => {
  const komponen = baca("components/skema-produk.tsx");
  const halaman = baca("app/(publik)/produk/[slug]/page.tsx");
  assert.match(komponen, /"@type": "Product"/);
  assert.match(komponen, /"@type": "Offer"/);
  assert.match(halaman, /<SkemaProduk produk=\{produk\}/);
});
