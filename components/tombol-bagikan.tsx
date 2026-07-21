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
        className="rounded-full bg-[#0f6b62] px-5 py-3 text-sm font-black text-white hover:bg-[#0b554e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6b62]"
      >
        Bagikan artikel
      </button>
      <button
        type="button"
        onClick={salinTautan}
        className="rounded-full border border-[#cbd4e1] bg-white px-5 py-3 text-sm font-bold text-[#14223d] hover:border-[#0f6b62] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6b62]"
      >
        {pesan}
      </button>
      <span className="sr-only" aria-live="polite">
        {pesan}
      </span>
    </div>
  );
}
