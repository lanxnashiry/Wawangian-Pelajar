"use client";

import { useRef, useState } from "react";
import type { Produk } from "@/data/produk";
import {
  labelMarketplace,
  tautanMarketplaceValid,
  type TujuanMarketplace,
} from "@/lib/marketplace/tautan";

type PilihanMarketplace = {
  tujuan: TujuanMarketplace;
  url?: string;
};

type Properti = {
  produkId?: string;
  namaProduk: string;
  tersedia: boolean;
  linkMarketplace?: Produk["linkMarketplace"];
  sumberData?: Produk["sumberData"];
};

const urutanMarketplace: TujuanMarketplace[] = ["shopee", "tiktok"];

export function JembatanMarketplace({
  produkId,
  namaProduk,
  tersedia,
  linkMarketplace,
  sumberData,
}: Properti) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [pesanStatus, setPesanStatus] = useState("");

  const pilihanNyata = urutanMarketplace.flatMap((tujuan) => {
    const url = linkMarketplace?.[tujuan];
    return tautanMarketplaceValid(tujuan, url) ? [{ tujuan, url }] : [];
  });
  const modeContoh = sumberData === "contoh" && pilihanNyata.length === 0;
  const pilihanDialog: PilihanMarketplace[] = modeContoh
    ? urutanMarketplace.map((tujuan) => ({ tujuan }))
    : pilihanNyata;

  function catatKlik(tujuan: TujuanMarketplace) {
    setPesanStatus(`Membuka ${labelMarketplace[tujuan]} di tab baru.`);
    dialog.current?.close();

    if (!produkId || sumberData !== "supabase") return;
    void fetch("/api/klik-keluar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ produkId, marketplace: tujuan }),
      keepalive: true,
    });
  }

  if (!tersedia) {
    return (
      <button
        type="button"
        disabled
        className="mt-6 min-h-13 w-full cursor-not-allowed rounded-full bg-slate-200 px-6 py-3 text-sm font-black text-slate-500"
      >
        Produk belum tersedia
      </button>
    );
  }

  if (pilihanNyata.length === 0 && !modeContoh) {
    return (
      <button
        type="button"
        disabled
        className="mt-6 min-h-13 w-full cursor-not-allowed rounded-full bg-slate-200 px-6 py-3 text-sm font-black text-slate-500"
      >
        Tautan marketplace belum tersedia
      </button>
    );
  }

  const pilihanTunggal = pilihanNyata.length === 1 ? pilihanNyata[0] : undefined;

  return (
    <div className="mt-6">
      {pilihanTunggal ? (
        <a
          href={pilihanTunggal.url}
          target="_blank"
          rel="noreferrer"
          onClick={() => catatKlik(pilihanTunggal.tujuan)}
          className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-[#0f6b62] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#0f6b62]/20 hover:bg-[#0b554e] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0f6b62]"
        >
          Beli di {labelMarketplace[pilihanTunggal.tujuan]} ↗
        </a>
      ) : (
        <button
          type="button"
          onClick={() => dialog.current?.showModal()}
          className="min-h-13 w-full rounded-full bg-[#0f6b62] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#0f6b62]/20 hover:bg-[#0b554e] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0f6b62]"
        >
          {modeContoh ? "Pratinjau pilihan marketplace" : "Beli sekarang"}
        </button>
      )}

      <dialog
        ref={dialog}
        aria-labelledby="judul-pilihan-marketplace"
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-[2rem] border-0 bg-white p-0 text-[#14223d] shadow-2xl backdrop:bg-[#14223d]/65"
      >
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[0.14em] text-[#0f6b62] uppercase">
                {modeContoh ? "Simulasi lokal · Data Contoh" : "Toko resmi"}
              </p>
              <h2 id="judul-pilihan-marketplace" className="mt-2 text-2xl font-black">
                Beli lewat mana?
              </h2>
            </div>
            <form method="dialog">
              <button
                type="submit"
                aria-label="Tutup pilihan marketplace"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e3e8ef] text-xl hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6b62]"
              >
                ×
              </button>
            </form>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {modeContoh
              ? `Ini hanya pratinjau dialog untuk ${namaProduk}. Tautan produk asli belum diberikan dan tidak ada klik yang dicatat.`
              : `${namaProduk} tersedia di dua marketplace. Pilih toko resmi yang kamu gunakan.`}
          </p>
          <div className="mt-5 grid gap-3">
            {pilihanDialog.map((pilihan) =>
              pilihan.url ? (
                <a
                  key={pilihan.tujuan}
                  href={pilihan.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => catatKlik(pilihan.tujuan)}
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#0f6b62] px-5 py-3 text-sm font-black text-white hover:bg-[#0b554e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6b62]"
                >
                  Beli di {labelMarketplace[pilihan.tujuan]} ↗
                </a>
              ) : (
                <button
                  key={pilihan.tujuan}
                  type="button"
                  disabled
                  className="min-h-12 cursor-not-allowed rounded-2xl border border-[#d8dee8] bg-slate-50 px-5 py-3 text-sm font-black text-slate-400"
                >
                  {labelMarketplace[pilihan.tujuan]} · tautan asli menyusul
                </button>
              ),
            )}
          </div>
          <p className="mt-5 rounded-2xl bg-[#fffaf0] p-4 text-xs leading-5 text-[#70510a]">
            Pembayaran, pengiriman, dan komisi dasar afiliasi ditangani marketplace. Website ini hanya mencatat minat klik-keluar.
          </p>
        </div>
      </dialog>
      <span className="sr-only" aria-live="polite">{pesanStatus}</span>
    </div>
  );
}
