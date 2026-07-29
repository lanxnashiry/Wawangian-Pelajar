"use client";

import { useMemo, useState } from "react";
import {
  labelKategori,
  type Produk,
  type KategoriProduk,
} from "@/data/produk";
import { KartuProduk } from "./kartu-produk";

type PilihanKategori = "semua" | KategoriProduk;
type PilihanUrutan = "unggulan" | "harga-rendah" | "harga-tinggi" | "nama";

const kategori: Array<{ nilai: PilihanKategori; label: string }> = [
  { nilai: "semua", label: "Semua" },
  ...Object.entries(labelKategori).map(([nilai, label]) => ({
    nilai: nilai as KategoriProduk,
    label,
  })),
];

export function KatalogInteraktif({ daftarProduk }: { daftarProduk: Produk[] }) {
  const [kategoriAktif, setKategoriAktif] =
    useState<PilihanKategori>("semua");
  const [kataKunci, setKataKunci] = useState("");
  const [urutan, setUrutan] = useState<PilihanUrutan>("unggulan");

  const hasil = useMemo(() => {
    const kata = kataKunci.trim().toLocaleLowerCase("id-ID");
    const tersaring = daftarProduk.filter((produk) => {
      const cocokKategori =
        kategoriAktif === "semua" || produk.kategori === kategoriAktif;
      const bahanPencarian = [
        produk.nama,
        produk.ringkasan,
        ...produk.profilAroma.karakter,
        ...produk.profilAroma.atas,
        ...produk.profilAroma.tengah,
        ...produk.profilAroma.dasar,
      ]
        .join(" ")
        .toLocaleLowerCase("id-ID");

      return cocokKategori && (!kata || bahanPencarian.includes(kata));
    });

    return [...tersaring].sort((produkA, produkB) => {
      if (urutan === "harga-rendah") {
        if (produkA.harga === 0) return 1;
        if (produkB.harga === 0) return -1;
        return produkA.harga - produkB.harga;
      }
      if (urutan === "harga-tinggi") return produkB.harga - produkA.harga;
      if (urutan === "nama") return produkA.nama.localeCompare(produkB.nama, "id-ID");
      return Number(produkB.unggulan) - Number(produkA.unggulan);
    });
  }, [daftarProduk, kataKunci, kategoriAktif, urutan]);

  function resetFilter() {
    setKategoriAktif("semua");
    setKataKunci("");
    setUrutan("unggulan");
  }

  return (
    <div>
      <div className="gulir-tanpa-bilah -mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        <div className="flex min-w-max gap-2" aria-label="Filter kategori produk">
          {kategori.map((item) => (
            <button
              key={item.nilai}
              type="button"
              onClick={() => setKategoriAktif(item.nilai)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087477] ${
                kategoriAktif === item.nilai
                  ? "border-[#087477] bg-[#087477] text-white"
                  : "border-[#D9CEBF] bg-white text-[#282B2F] hover:border-[#087477] hover:text-[#087477]"
              }`}
              aria-pressed={kategoriAktif === item.nilai}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 rounded-3xl border border-[#DED3C2] bg-white p-4 shadow-sm md:grid-cols-[1fr_240px]">
        <label className="relative block">
          <span className="sr-only">Cari produk berdasarkan nama atau aroma</span>
          <span
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#687078]"
            aria-hidden="true"
          >
            ⌕
          </span>
          <input
            type="search"
            value={kataKunci}
            onChange={(peristiwa) => setKataKunci(peristiwa.target.value)}
            placeholder="Cari nama atau karakter aroma"
            className="h-12 w-full rounded-2xl border border-[#D9CEBF] bg-[#FAF7F1] pr-4 pl-11 text-sm text-[#102A43] outline-none placeholder:text-[#687078] focus:border-[#087477] focus:ring-3 focus:ring-[#087477]/10"
          />
        </label>
        <label>
          <span className="sr-only">Urutkan produk</span>
          <select
            value={urutan}
            onChange={(peristiwa) =>
              setUrutan(peristiwa.target.value as PilihanUrutan)
            }
            className="h-12 w-full rounded-2xl border border-[#D9CEBF] bg-[#FAF7F1] px-4 text-sm font-bold text-[#102A43] outline-none focus:border-[#087477] focus:ring-3 focus:ring-[#087477]/10"
          >
            <option value="unggulan">Urutkan: Unggulan</option>
            <option value="harga-rendah">Harga terendah</option>
            <option value="harga-tinggi">Harga tertinggi</option>
            <option value="nama">Nama A–Z</option>
          </select>
        </label>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 text-sm text-[#4A4D52]">
        <p aria-live="polite">{hasil.length} produk ditemukan</p>
        <p className="hidden sm:block">Data aktif dari sumber katalog.</p>
      </div>

      {hasil.length > 0 ? (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {hasil.map((produk) => (
            <KartuProduk key={produk.slug} produk={produk} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-[#CFC3B2] bg-white px-5 py-14 text-center">
          <span className="text-4xl" aria-hidden="true">
            ⌕
          </span>
          <h2 className="mt-4 text-2xl font-black text-[#102A43]">
            Belum ada yang cocok
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#282B2F]">
            Coba kata kunci lain atau reset filter. Produk nyata akan ditambahkan
            setelah data bisnis dan foto asli tersedia.
          </p>
          <button
            type="button"
            onClick={resetFilter}
            className="mt-6 rounded-full bg-[#087477] px-5 py-3 text-sm font-black text-white hover:bg-[#075E61] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087477]"
          >
            Reset filter
          </button>
        </div>
      )}
    </div>
  );
}
