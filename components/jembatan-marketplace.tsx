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
};

const urutanMarketplace: TujuanMarketplace[] = ["shopee", "tiktok"];

export function JembatanMarketplace({
  produkId,
  namaProduk,
  tersedia,
  linkMarketplace,
}: Properti) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [pesanStatus, setPesanStatus] = useState("");

  const pilihanNyata = urutanMarketplace.flatMap((tujuan) => {
    const url = linkMarketplace?.[tujuan];
    return tautanMarketplaceValid(tujuan, url) ? [{ tujuan, url }] : [];
  });
  const pilihanDialog: PilihanMarketplace[] = pilihanNyata;

  function catatKlik(tujuan: TujuanMarketplace) {
    setPesanStatus(`Membuka ${labelMarketplace[tujuan]} di tab baru.`);
    dialog.current?.close();

    if (!produkId) return;

    // Kirim event ke Umami supaya klik-beli bisa dibandingkan dengan jumlah
    // pengunjung dan sumber trafik. Analitik klik-keluar di admin tetap jadi
    // catatan resmi; ini hanya pelengkap untuk mengukur konversi.
    if (typeof window !== "undefined" && window.umami) {
      window.umami.track("klik-beli", {
        marketplace: tujuan,
        produk: namaProduk,
      });
    }
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
        className="mt-6 min-h-13 w-full cursor-not-allowed rounded-full bg-slate-200 px-6 py-3 text-sm font-black text-[#4A4D52]"
      >
        Produk belum tersedia
      </button>
    );
  }

  if (pilihanNyata.length === 0) {
    return (
      <button
        type="button"
        disabled
        className="mt-6 min-h-13 w-full cursor-not-allowed rounded-full bg-slate-200 px-6 py-3 text-sm font-black text-[#4A4D52]"
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
          className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-[#087477] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#087477]/20 hover:bg-[#075E61] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#087477]"
        >
          Beli di {labelMarketplace[pilihanTunggal.tujuan]} ↗
        </a>
      ) : (
        <button
          type="button"
          onClick={() => dialog.current?.showModal()}
          className="min-h-13 w-full rounded-full bg-[#087477] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#087477]/20 hover:bg-[#075E61] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#087477]"
        >
          Beli sekarang
        </button>
      )}

      <dialog
        ref={dialog}
        aria-labelledby="judul-pilihan-marketplace"
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-[2rem] border-0 bg-white p-0 text-[#102A43] shadow-2xl backdrop:bg-[#102A43]/65"
      >
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[0.14em] text-[#087477] uppercase">
                Toko resmi
              </p>
              <h2 id="judul-pilihan-marketplace" className="mt-2 text-2xl font-black">
                Beli lewat mana?
              </h2>
            </div>
            <form method="dialog">
              <button
                type="submit"
                aria-label="Tutup pilihan marketplace"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DED3C2] text-xl hover:bg-[#FAF7F1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087477]"
              >
                ×
              </button>
            </form>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#282B2F]">
            {namaProduk} tersedia di dua marketplace. Pilih toko resmi yang kamu gunakan.
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
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#087477] px-5 py-3 text-sm font-black text-white hover:bg-[#075E61] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087477]"
                >
                  Beli di {labelMarketplace[pilihan.tujuan]} ↗
                </a>
              ) : (
                <button
                  key={pilihan.tujuan}
                  type="button"
                  disabled
                  className="min-h-12 cursor-not-allowed rounded-2xl border border-[#D9CEBF] bg-[#FAF7F1] px-5 py-3 text-sm font-black text-[#687078]"
                >
                  {labelMarketplace[pilihan.tujuan]} · tautan asli menyusul
                </button>
              ),
            )}
          </div>
          <p className="mt-5 rounded-2xl bg-[#FAF7F1] p-4 text-xs leading-5 text-[#6D5426]">
            Pembayaran, pengiriman, dan komisi dasar afiliasi ditangani marketplace. Website ini hanya mencatat minat klik-keluar.
          </p>
        </div>
      </dialog>
      <span className="sr-only" aria-live="polite">{pesanStatus}</span>
    </div>
  );
}
