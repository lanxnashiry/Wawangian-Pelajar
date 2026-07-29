"use client";

import { useState } from "react";
import { simpanRekapDonasi } from "@/app/admin/(terlindungi)/donasi/tindakan";
import { formatRupiah } from "@/data/produk";

const kelasInput = "mt-2 min-h-11 w-full rounded-xl border border-[#CFC3B2] bg-white px-3 py-2 text-sm outline-none focus:border-[#087477] focus:ring-3 focus:ring-[#087477]/10";

export function FormulirRekapDonasi({ pesan }: { pesan?: string }) {
  const [untungBersih, setUntungBersih] = useState(0);
  const jumlahDonasi = Math.floor(Math.max(untungBersih, 0) * 20 / 100);

  return (
    <form action={simpanRekapDonasi} className="space-y-5 rounded-2xl border border-[#DED3C2] bg-white p-5">
      {pesan ? <p role="status" className="rounded-xl bg-[#E5F2EF] px-4 py-3 text-sm font-bold text-[#087477]">{pesan}</p> : null}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold text-[#102A43]">Periode mulai<input className={kelasInput} name="periode_mulai" type="date" required /></label>
        <label className="text-sm font-bold text-[#102A43]">Periode selesai<input className={kelasInput} name="periode_selesai" type="date" required /></label>
        <label className="text-sm font-bold text-[#102A43]">Sumber rekap<select className={kelasInput} name="sumber" defaultValue="gabungan"><option value="shopee">Shopee</option><option value="tiktok">TikTok Shop</option><option value="gabungan">Gabungan marketplace</option></select></label>
        <label className="text-sm font-bold text-[#102A43]">Untung bersih periode<input className={kelasInput} name="untung_bersih" type="number" min="0" step="1" required value={untungBersih} onChange={(acara) => setUntungBersih(Number(acara.target.value))} /></label>
      </div>
      <div className="rounded-2xl border border-[#D9BC7B] bg-[#FAF7F1] p-5">
        <p className="text-xs font-black tracking-[0.14em] text-[#765B2B] uppercase">Donasi 20% · dihitung sistem</p>
        <output className="mt-2 block text-3xl font-black text-[#102A43]" aria-live="polite">{formatRupiah(jumlahDonasi)}</output>
        <p className="mt-2 text-xs leading-5 text-[#282B2F]">Nilai ini hanya pratinjau. Database menghitung ulang dan menyimpan hasilnya sebagai kolom read-only.</p>
      </div>
      <label className="block text-sm font-bold text-[#102A43]">Catatan metode dan sumber<textarea className={kelasInput} name="catatan_metode" rows={4} minLength={10} required placeholder="Contoh: rekap laba bersih laporan marketplace setelah biaya platform dan retur." /></label>
      <button className="min-h-12 rounded-full bg-[#087477] px-6 py-3 text-sm font-black text-white hover:bg-[#075E61]">Simpan rekap</button>
    </form>
  );
}
