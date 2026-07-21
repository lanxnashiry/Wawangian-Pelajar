import type { Metadata } from "next";
import Link from "next/link";
import { DaftarArtikelInteraktif } from "@/components/daftar-artikel-interaktif";
import { ambilDaftarArtikelPublik } from "@/lib/data/publik";

export const metadata: Metadata = {
  title: "Cerita & Edukasi",
  description:
    "Cerita misi, edukasi aroma, dan tips parfum dari Wawangian Pelajar.",
};

export const dynamic = "force-dynamic";

export default async function HalamanDaftarCerita() {
  const daftarArtikel = await ambilDaftarArtikelPublik();
  return (
    <main>
      <section className="bg-[#14223d] px-5 py-14 text-white sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <p className="text-xs font-black tracking-[0.16em] text-[#e8cb76] uppercase">
            Cerita & Edukasi
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl leading-tight font-black tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Kisah misi dan ilmu seputar wangi.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
            Artikel awal berisi edukasi dan prinsip perjalanan brand. Cerita dampak
            baru diterbitkan setelah memiliki bukti yang dapat diperiksa.
          </p>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <DaftarArtikelInteraktif daftarArtikel={daftarArtikel} />
          <div className="mt-12 flex flex-col gap-5 rounded-3xl border border-[#ead9a6] bg-[#fffaf0] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-[#14223d]">
                Ingin memahami misi kami lebih dulu?
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#70510a]">
                Halaman transparansi lengkap dibangun pada M3 tanpa mengarang angka awal.
              </p>
            </div>
            <Link
              href="/donasi"
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[#14223d] px-5 py-3 text-sm font-black text-white"
            >
              Kenali Dana Cahaya
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
