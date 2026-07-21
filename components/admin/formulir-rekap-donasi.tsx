"use client";

import { useState } from "react";
import { simpanRekapDonasi } from "@/app/admin/(terlindungi)/donasi/tindakan";
import { formatRupiah } from "@/data/produk";

const kelasInput = "mt-2 min-h-11 w-full rounded-xl border border-[#cbd4e1] bg-white px-3 py-2 text-sm outline-none focus:border-[#0f6b62] focus:ring-3 focus:ring-[#0f6b62]/10";

export function FormulirRekapDonasi({ pesan }: { pesan?: string }) {
  const [untungBersih, setUntungBersih] = useState(0);
  const jumlahDonasi = Math.floor(Math.max(untungBersih, 0) * 20 / 100);

  return (
    <form action={simpanRekapDonasi} className="space-y-5 rounded-2xl border border-[#e3e8ef] bg-white p-5">
      {pesan ? <p role="status" className="rounded-xl bg-[#e7f4f1] px-4 py-3 text-sm font-bold text-[#0f6b62]">{pesan}</p> : null}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold text-[#14223d]">Periode mulai<input className={kelasInput} name="periode_mulai" type="date" required /></label>
        <label className="text-sm font-bold text-[#14223d]">Periode selesai<input className={kelasInput} name="periode_selesai" type="date" required /></label>
        <label className="text-sm font-bold text-[#14223d]">Sumber rekap<select className={kelasInput} name="sumber" defaultValue="gabungan"><option value="shopee">Shopee</option><option value="tiktok">TikTok Shop</option><option value="gabungan">Gabungan marketplace</option></select></label>
        <label className="text-sm font-bold text-[#14223d]">Untung bersih periode<input className={kelasInput} name="untung_bersih" type="number" min="0" step="1" required value={untungBersih} onChange={(acara) => setUntungBersih(Number(acara.target.value))} /></label>
      </div>
      <div className="rounded-2xl border border-[#ead18b] bg-[#fffaf0] p-5">
        <p className="text-xs font-black tracking-[0.14em] text-[#8a6508] uppercase">Donasi 20% · dihitung sistem</p>
        <output className="mt-2 block text-3xl font-black text-[#14223d]" aria-live="polite">{formatRupiah(jumlahDonasi)}</output>
        <p className="mt-2 text-xs leading-5 text-slate-600">Nilai ini hanya pratinjau. Database menghitung ulang dan menyimpan hasilnya sebagai kolom read-only.</p>
      </div>
      <label className="block text-sm font-bold text-[#14223d]">Catatan metode dan sumber<textarea className={kelasInput} name="catatan_metode" rows={4} minLength={10} required placeholder="Contoh: rekap laba bersih laporan marketplace setelah biaya platform dan retur." /></label>
      <button className="min-h-12 rounded-full bg-[#0f6b62] px-6 py-3 text-sm font-black text-white hover:bg-[#0b554e]">Simpan rekap</button>
    </form>
  );
}
