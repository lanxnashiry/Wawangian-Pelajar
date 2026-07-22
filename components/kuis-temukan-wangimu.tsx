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
  memakaiDataContoh,
}: {
  daftarProduk: Produk[];
  jawabanAwal: JawabanKuis;
  memakaiDataContoh: boolean;
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
              className="rounded-3xl border border-[#e3e8ef] bg-white p-5 shadow-sm sm:p-6"
            >
              <legend className="px-2 text-sm font-black text-[#14223d]">
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
                    <span className="block rounded-full border border-[#d8dee8] bg-[#f9fafc] px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-[#0f6b62] hover:text-[#0f6b62] peer-checked:border-[#0f6b62] peer-checked:bg-[#0f6b62] peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#0f6b62]">
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
              className="min-h-13 w-full rounded-full bg-[#0f6b62] px-7 py-3 text-sm font-black text-white shadow-lg shadow-[#0f6b62]/20 hover:bg-[#0b554e] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0f6b62] sm:w-auto"
            >
              Lihat rekomendasi →
            </button>
            {memakaiDataContoh ? (
              <Link
                href={tautanJawabanContoh}
                className="flex min-h-13 w-full items-center justify-center rounded-full border border-[#b8860b] bg-[#fff8df] px-7 py-3 text-sm font-black text-[#765808] hover:bg-[#ffefb8] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#b8860b] sm:w-auto"
              >
                Coba contoh
              </Link>
            ) : null}
          </div>
        </div>
      </form>

      {hasilTerbuka ? (
        <section id="hasil-kuis" className="mt-12 scroll-mt-28 border-t border-[#dfe5ed] pt-12">
          <p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">
            Rekomendasi untukmu
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#14223d] sm:text-4xl">
            {labelJawaban.karakter} · {labelJawaban.waktu} · {labelJawaban.okasi}
          </h2>
          <p className="mt-4 max-w-3xl rounded-2xl bg-[#e7f4f1] p-5 text-sm leading-6 text-[#174f49]">
            Produk diurutkan dari kecocokan data karakter aroma, waktu, dan kegiatan yang diisi pada Produk. Hasil ini adalah panduan selera, bukan klaim kecocokan mutlak.
          </p>

          {hasil.length ? (
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {hasil.map((item) => (
                <div key={item.produk.slug} className="flex flex-col gap-3">
                  <KartuProduk produk={item.produk} />
                  <p className="rounded-2xl bg-white px-4 py-3 text-xs leading-5 text-slate-600">
                    <strong className="text-[#14223d]">Kenapa cocok:</strong>{" "}
                    {item.alasan.join(", ")}.
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-7 rounded-3xl border border-dashed border-[#cbd4e1] bg-white p-9 text-center">
              <h3 className="text-xl font-black text-[#14223d]">Belum ada Produk yang cocok</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Data Produk untuk kombinasi ini belum tersedia. Coba pilihan lain.
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={bagikanHasil}
              className="min-h-12 rounded-full bg-[#b8860b] px-6 py-3 text-sm font-black text-white hover:bg-[#906a08] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#b8860b]"
            >
              Bagikan hasil
            </button>
            <Link
              href="/temukan"
              className="min-h-12 rounded-full border border-[#cbd4e1] bg-white px-6 py-3 text-sm font-black text-[#14223d] hover:border-[#0f6b62] hover:text-[#0f6b62] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0f6b62]"
            >
              Ulangi kuis
            </Link>
          </div>
          <p className="mt-3 min-h-5 text-sm text-slate-500" aria-live="polite">
            {pesan}
          </p>
        </section>
      ) : null}
    </div>
  );
}
