"use client";

import Image from "next/image";
import { useState } from "react";

export function PengelolaFotoProduk({ fotoAwal = [] }: { fotoAwal?: string[] }) {
  const [foto, setFoto] = useState(
    fotoAwal.filter((sumber) => /^https:\/\//.test(sumber)).slice(0, 4),
  );

  const jadikanUtama = (indeks: number) => {
    setFoto((daftar) => [daftar[indeks], ...daftar.filter((_, posisi) => posisi !== indeks)]);
  };

  const hapus = (indeks: number) => {
    setFoto((daftar) => daftar.filter((_, posisi) => posisi !== indeks));
  };

  return (
    <fieldset className="rounded-2xl border border-[#DED3C2] bg-white p-5 lg:col-span-2">
      <legend className="px-2 font-black text-[#102A43]">Galeri foto Produk</legend>
      <input type="hidden" name="foto_tersimpan" value={JSON.stringify(foto)} />

      {foto.length > 0 ? (
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {foto.map((sumber, indeks) => (
            <div key={sumber} className="rounded-2xl border border-[#DED3C2] p-3">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-[#FAF7F1]">
                <Image src={sumber} alt={`Foto tersimpan ${indeks + 1}`} fill sizes="180px" className="object-contain p-2" />
              </div>
              <p className="mt-2 text-xs font-black text-[#102A43]">
                {indeks === 0 ? "Foto utama" : `Foto ${indeks + 1}`}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {indeks > 0 ? (
                  <button type="button" onClick={() => jadikanUtama(indeks)} className="text-xs font-bold text-[#087477] hover:underline">
                    Jadikan utama
                  </button>
                ) : null}
                <button type="button" onClick={() => hapus(indeks)} className="text-xs font-bold text-[#9E3024] hover:underline">
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-[#4A4D52]">Belum ada foto tersimpan.</p>
      )}

      <label className="mt-5 block text-sm font-bold text-[#102A43]">
        Tambah foto
        <input
          className="mt-2 min-h-11 w-full rounded-xl border border-[#CFC3B2] bg-white px-3 py-2 text-sm outline-none focus:border-[#087477] focus:ring-3 focus:ring-[#087477]/10"
          name="foto"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
        />
      </label>
      <p className="mt-2 text-xs leading-5 text-[#4A4D52]">
        Maksimal 4 foto total · JPEG/PNG/WebP · maksimal 5 MB per foto. Foto pertama menjadi gambar utama di katalog dan SEO. Foto baru ditambahkan setelah foto tersimpan.
      </p>
    </fieldset>
  );
}
