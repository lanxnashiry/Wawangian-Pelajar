"use client";

import { useState } from "react";

export function TombolBagikan({ judul }: { judul: string }) {
  const [pesan, setPesan] = useState("Salin tautan");

  async function salinTautan() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setPesan("Tautan tersalin");
    } catch {
      setPesan("Salin dari bilah alamat");
    }
  }

  async function bagikanArtikel() {
    const dataBagikan = {
      title: judul,
      text: `Baca artikel “${judul}” dari Wawangian Pelajar.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(dataBagikan);
        setPesan("Berhasil dibagikan");
        return;
      } catch {
        return;
      }
    }

    await salinTautan();
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={bagikanArtikel}
        className="rounded-full bg-[#087477] px-5 py-3 text-sm font-black text-white hover:bg-[#075E61] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087477]"
      >
        Bagikan artikel
      </button>
      <button
        type="button"
        onClick={salinTautan}
        className="rounded-full border border-[#CFC3B2] bg-white px-5 py-3 text-sm font-bold text-[#102A43] hover:border-[#087477] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087477]"
      >
        {pesan}
      </button>
      <span className="sr-only" aria-live="polite">
        {pesan}
      </span>
    </div>
  );
}
