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
              className={`rounded-full border px-4 py-2 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6b62] ${
                kategoriAktif === item.nilai
                  ? "border-[#0f6b62] bg-[#0f6b62] text-white"
                  : "border-[#d8dee8] bg-white text-slate-600 hover:border-[#0f6b62] hover:text-[#0f6b62]"
              }`}
              aria-pressed={kategoriAktif === item.nilai}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 rounded-3xl border border-[#e3e8ef] bg-white p-4 shadow-sm md:grid-cols-[1fr_240px]">
        <label className="relative block">
          <span className="sr-only">Cari produk berdasarkan nama atau aroma</span>
          <span
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          >
            ⌕
          </span>
          <input
            type="search"
            value={kataKunci}
            onChange={(peristiwa) => setKataKunci(peristiwa.target.value)}
            placeholder="Cari nama atau karakter aroma"
            className="h-12 w-full rounded-2xl border border-[#d8dee8] bg-[#f9fafc] pr-4 pl-11 text-sm text-[#14223d] outline-none placeholder:text-slate-400 focus:border-[#0f6b62] focus:ring-3 focus:ring-[#0f6b62]/10"
          />
        </label>
        <label>
          <span className="sr-only">Urutkan produk</span>
          <select
            value={urutan}
            onChange={(peristiwa) =>
              setUrutan(peristiwa.target.value as PilihanUrutan)
            }
            className="h-12 w-full rounded-2xl border border-[#d8dee8] bg-[#f9fafc] px-4 text-sm font-bold text-[#14223d] outline-none focus:border-[#0f6b62] focus:ring-3 focus:ring-[#0f6b62]/10"
          >
            <option value="unggulan">Urutkan: Unggulan</option>
            <option value="harga-rendah">Harga terendah</option>
            <option value="harga-tinggi">Harga tertinggi</option>
            <option value="nama">Nama A–Z</option>
          </select>
        </label>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-500">
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
        <div className="mt-6 rounded-3xl border border-dashed border-[#cbd4e1] bg-white px-5 py-14 text-center">
          <span className="text-4xl" aria-hidden="true">
            ⌕
          </span>
          <h2 className="mt-4 text-2xl font-black text-[#14223d]">
            Belum ada yang cocok
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
            Coba kata kunci lain atau reset filter. Produk nyata akan ditambahkan
            setelah data bisnis dan foto asli tersedia.
          </p>
          <button
            type="button"
            onClick={resetFilter}
            className="mt-6 rounded-full bg-[#0f6b62] px-5 py-3 text-sm font-black text-white hover:bg-[#0b554e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6b62]"
          >
            Reset filter
          </button>
        </div>
      )}
    </div>
  );
}
