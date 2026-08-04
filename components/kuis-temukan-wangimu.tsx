"use client";

import Link from "next/link";
import { useState } from "react";
import { KartuProduk } from "@/components/kartu-produk";
import type { Produk } from "@/data/produk";
import {
  jawabanKuisLengkap,
  labelJawabanKuis,
  opsiKarakter,
  opsiOkasi,
  opsiWaktu,
  rekomendasikanProduk,
  type JawabanKuis,
  type OpsiKuis,
} from "@/lib/kuis/rekomendasi";

type KunciJawaban = keyof JawabanKuis;

const pertanyaan: Array<{
  kunci: KunciJawaban;
  judul: string;
  opsi: OpsiKuis[];
}> = [
  { kunci: "karakter", judul: "Kamu suka wangi seperti apa?", opsi: opsiKarakter },
  { kunci: "waktu", judul: "Paling sering dipakai kapan?", opsi: opsiWaktu },
  { kunci: "okasi", judul: "Untuk kegiatan apa?", opsi: opsiOkasi },
];

const jawabanContoh: JawabanKuis = {
  karakter: "fresh",
  waktu: "siang",
  okasi: "kuliah-kerja",
};

const tautanJawabanContoh = `/temukan?${new URLSearchParams(
  jawabanContoh,
).toString()}#hasil-kuis`;

export function KuisTemukanWangimu({
  daftarProduk,
  jawabanAwal,
}: {
  daftarProduk: Produk[];
  jawabanAwal: JawabanKuis;
}) {
  const [pesan, setPesan] = useState("");
  const hasilTerbuka = jawabanKuisLengkap(jawabanAwal);
  const hasil = rekomendasikanProduk(daftarProduk, jawabanAwal);
  const labelJawaban = labelJawabanKuis(jawabanAwal);

  async function bagikanHasil() {
    const teks = `Wangiku: ${labelJawaban.karakter}, ${labelJawaban.waktu}, ${labelJawaban.okasi}.`;
    const dataBagikan = {
      title: "Hasil Temukan Wangimu",
      text: `${teks} Lihat rekomendasinya di Wawangian Pelajar.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(dataBagikan);
        setPesan("Hasil berhasil dibagikan.");
      } catch {
        return;
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setPesan("Tautan hasil tersalin.");
    } catch {
      setPesan("Salin tautan hasil dari bilah alamat.");
    }
  }

  return (
    <div>
      <form action="/temukan#hasil-kuis" method="get">
        <div className="grid gap-4 lg:grid-cols-3">
          {pertanyaan.map((item, indeks) => (
            <fieldset
              key={item.kunci}
              className="rounded-3xl border border-[#DED3C2] bg-white p-5 shadow-sm sm:p-6"
            >
              <legend className="px-2 text-sm font-black text-[#102A43]">
                {indeks + 1}. {item.judul}
              </legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.opsi.map((opsi) => (
                  <label key={opsi.nilai} className="cursor-pointer">
                    <input
                      type="radio"
                      name={item.kunci}
                      value={opsi.nilai}
                      defaultChecked={jawabanAwal[item.kunci] === opsi.nilai}
                      required
                      className="peer sr-only"
                    />
                    <span className="block rounded-full border border-[#D9CEBF] bg-[#FAF7F1] px-4 py-2.5 text-sm font-bold text-[#282B2F] transition hover:border-[#087477] hover:text-[#087477] peer-checked:border-[#087477] peer-checked:bg-[#087477] peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#087477]">
                      {opsi.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center">
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button
              type="submit"
              className="min-h-13 w-full rounded-full bg-[#087477] px-7 py-3 text-sm font-black text-white shadow-lg shadow-[#087477]/20 hover:bg-[#075E61] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#087477] sm:w-auto"
            >
              Lihat rekomendasi →
            </button>
            <Link
              href={tautanJawabanContoh}
              className="flex min-h-13 w-full items-center justify-center rounded-full border border-[#C7A25A] bg-[#F6EACD] px-7 py-3 text-sm font-black text-[#6D5426] hover:bg-[#EED9A7] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#C7A25A] sm:w-auto"
            >
              Rekomendasi cepat
            </Link>
          </div>
        </div>
      </form>

      {hasilTerbuka ? (
        <section id="hasil-kuis" className="mt-12 scroll-mt-28 border-t border-[#DED3C2] pt-12">
          <p className="text-xs font-black tracking-[0.16em] text-[#087477] uppercase">
            Rekomendasi untukmu
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#102A43] sm:text-4xl">
            {labelJawaban.karakter} · {labelJawaban.waktu} · {labelJawaban.okasi}
          </h2>
          <p className="mt-4 max-w-3xl rounded-2xl bg-[#E5F2EF] p-5 text-sm leading-6 text-[#0D5554]">
            Produk diurutkan dari kecocokan data karakter aroma, waktu, dan kegiatan yang diisi pada Produk. Hasil ini adalah panduan selera, bukan klaim kecocokan mutlak.
          </p>

          {hasil.length ? (
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {hasil.map((item) => (
                <div key={item.produk.slug} className="flex flex-col gap-3">
                  <KartuProduk produk={item.produk} />
                  <p className="rounded-2xl bg-white px-4 py-3 text-xs leading-5 text-[#282B2F]">
                    <strong className="text-[#102A43]">Kenapa cocok:</strong>{" "}
                    {item.alasan.join(", ")}.
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-7 rounded-3xl border border-dashed border-[#CFC3B2] bg-white p-9 text-center">
              <h3 className="text-xl font-black text-[#102A43]">Belum ada Produk yang cocok</h3>
              <p className="mt-2 text-sm leading-6 text-[#282B2F]">
                Data Produk untuk kombinasi ini belum tersedia. Coba pilihan lain.
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={bagikanHasil}
              className="min-h-12 rounded-full bg-[#C7A25A] px-6 py-3 text-sm font-black text-white hover:bg-[#9C7B3C] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#C7A25A]"
            >
              Bagikan hasil
            </button>
            <Link
              href="/temukan"
              className="min-h-12 rounded-full border border-[#CFC3B2] bg-white px-6 py-3 text-sm font-black text-[#102A43] hover:border-[#087477] hover:text-[#087477] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#087477]"
            >
              Ulangi kuis
            </Link>
          </div>
          <p className="mt-3 min-h-5 text-sm text-[#4A4D52]" aria-live="polite">
            {pesan}
          </p>
        </section>
      ) : null}
    </div>
  );
}
