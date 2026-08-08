import assert from "node:assert/strict";
import test from "node:test";
import {
  ambilNilaiDecant,
  type Produk,
} from "../data/produk.ts";

function buatProduk(kategori: Produk["kategori"], ukuran: string, harga: number): Produk {
  return {
    slug: "produk-uji",
    nama: "Produk Uji",
    kategori,
    ukuran,
    harga,
    ringkasan: "Ringkasan",
    deskripsi: "Deskripsi",
    profilAroma: { atas: [], tengah: [], dasar: [], karakter: [], cocokUntuk: [] },
    unggulan: false,
    tersedia: true,
    warna: "krem",
    sumberData: "supabase",
  };
}

test("nilai Decant menghitung harga per ml dari harga dan ukuran", () => {
  assert.deepEqual(ambilNilaiDecant(buatProduk("decant", "5 ml", 69_000)), {
    hargaPerMl: 13_800,
    label: "Seimbang untuk mencoba lebih lama",
  });
});

test("Decant 10 ml diberi label paling hemat per ml", () => {
  assert.deepEqual(ambilNilaiDecant(buatProduk("decant", "10 ml", 129_000)), {
    hargaPerMl: 12_900,
    label: "Paling hemat per ml",
  });
});

test("Produk non-Decant atau ukuran tidak valid tidak mendapat nilai per ml", () => {
  assert.equal(ambilNilaiDecant(buatProduk("ori", "50 ml", 289_000)), undefined);
  assert.equal(ambilNilaiDecant(buatProduk("decant", "Pilih ukuran", 69_000)), undefined);
});

test("Decant 1 ml diberi label paling ringan untuk mencoba", () => {
  assert.deepEqual(ambilNilaiDecant(buatProduk("decant", "1 ml", 19_000)), {
    hargaPerMl: 19_000,
    label: "Paling ringan untuk mencoba",
  });
});
