"use client";

import Image from "next/image";
import { useState } from "react";
import type { Produk } from "@/data/produk";
import { PlaceholderVisual } from "./placeholder-visual";

export function GaleriProduk({ produk }: { produk: Produk }) {
  const foto = produk.foto?.slice(0, 4) ?? [];
  const [indeksAktif, setIndeksAktif] = useState(0);

  if (foto.length === 0) {
    return <PlaceholderVisual warna={produk.warna} />;
  }

  const pindah = (arah: -1 | 1) => {
    setIndeksAktif((indeks) => (indeks + arah + foto.length) % foto.length);
  };

  return (
    <section aria-label={`Galeri foto ${produk.nama}`}>
      <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-[#FAF7F1]">
        <Image
          src={foto[indeksAktif]}
          alt={`Foto ${indeksAktif + 1} dari ${foto.length}: ${produk.nama}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className="object-contain p-4 sm:p-6"
        />
        {foto.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Foto sebelumnya"
              onClick={() => pindah(-1)}
              className="absolute top-1/2 left-3 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#DED3C2] bg-white/95 text-xl font-black text-[#102A43] shadow-sm transition hover:bg-[#E5F2EF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087477]"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              type="button"
              aria-label="Foto berikutnya"
              onClick={() => pindah(1)}
              className="absolute top-1/2 right-3 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#DED3C2] bg-white/95 text-xl font-black text-[#102A43] shadow-sm transition hover:bg-[#E5F2EF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087477]"
            >
              <span aria-hidden="true">›</span>
            </button>
          </>
        ) : null}
      </div>

      <p aria-live="polite" className="sr-only">
        Foto {indeksAktif + 1} dari {foto.length}
      </p>

      {foto.length > 1 ? (
        <div className="mt-3 flex snap-x gap-3 overflow-x-auto pb-2" aria-label="Pilih foto Produk">
          {foto.map((sumber, indeks) => (
            <button
              key={`${sumber}-${indeks}`}
              type="button"
              onClick={() => setIndeksAktif(indeks)}
              aria-label={`Tampilkan foto ${indeks + 1}`}
              aria-current={indeks === indeksAktif ? "true" : undefined}
              className={`relative h-20 w-20 shrink-0 snap-start overflow-hidden rounded-2xl border-2 bg-[#FAF7F1] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087477] ${
                indeks === indeksAktif ? "border-[#087477]" : "border-[#DED3C2] hover:border-[#87B9B6]"
              }`}
            >
              <Image
                src={sumber}
                alt=""
                fill
                sizes="80px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
