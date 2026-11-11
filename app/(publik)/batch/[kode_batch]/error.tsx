"use client";

import { kanalResmi } from "@/data/kanal-resmi";
import { buatKontakBatch } from "@/lib/batch/validasi";

export default function Galat({ retry }: { retry: () => void }) {
  const kontak = buatKontakBatch(kanalResmi, "Halo Wawangian Pelajar, pemeriksaan batch sementara belum tersedia. Saya ingin meminta bantuan.");
  return <main className="mx-auto max-w-xl px-5 py-20 text-[#102A43]">
    <meta name="robots" content="noindex, follow" />
    <h1 className="text-3xl font-black">Pemeriksaan sementara belum tersedia</h1>
    <p className="mt-3">Silakan coba lagi nanti atau hubungi Wawangian Pelajar.</p>
    <button onClick={retry} className="mt-6 min-h-11 rounded-full bg-[#087477] px-6 py-3 font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4">Coba lagi</button>
    {kontak && <a href={kontak.url} rel="noreferrer" className="mt-4 flex min-h-11 items-center font-bold underline focus-visible:outline-2 focus-visible:outline-offset-4">{kontak.label}</a>}
  </main>;
}
