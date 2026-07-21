"use client";

import { useState } from "react";
import {
  labelKategoriArtikel,
  type Artikel,
  type KategoriArtikel,
} from "@/data/artikel";
import { KartuArtikel } from "./kartu-artikel";

type FilterArtikel = "semua" | KategoriArtikel;

const filterArtikel: Array<{ nilai: FilterArtikel; label: string }> = [
  { nilai: "semua", label: "Semua" },
  ...Object.entries(labelKategoriArtikel).map(([nilai, label]) => ({
    nilai: nilai as KategoriArtikel,
    label,
  })),
];

export function DaftarArtikelInteraktif({ daftarArtikel }: { daftarArtikel: Artikel[] }) {
  const [filterAktif, setFilterAktif] = useState<FilterArtikel>("semua");
  const artikelTampil = daftarArtikel.filter(
    (artikel) => filterAktif === "semua" || artikel.kategori === filterAktif,
  );

  return (
    <div>
      <div className="gulir-tanpa-bilah -mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        <div className="flex min-w-max gap-2" aria-label="Filter kategori artikel">
          {filterArtikel.map((filter) => (
            <button
              key={filter.nilai}
              type="button"
              onClick={() => setFilterAktif(filter.nilai)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6b62] ${
                filterAktif === filter.nilai
                  ? "border-[#0f6b62] bg-[#0f6b62] text-white"
                  : "border-[#d8dee8] bg-white text-slate-600 hover:border-[#0f6b62] hover:text-[#0f6b62]"
              }`}
              aria-pressed={filterAktif === filter.nilai}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {artikelTampil.length ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {artikelTampil.map((artikel) => (
            <KartuArtikel key={artikel.slug} artikel={artikel} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-dashed border-[#cbd4e1] bg-white px-5 py-14 text-center">
          <span className="text-4xl" aria-hidden="true">
            ✎
          </span>
          <h2 className="mt-4 text-2xl font-black text-[#14223d]">
            Cerita pertama segera hadir
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">
            Kami sedang menyiapkan kisah dan artikel yang dapat dipertanggungjawabkan.
          </p>
        </div>
      )}
    </div>
  );
}
