import type { Metadata } from "next";
import Link from "next/link";
import { KatalogInteraktif } from "@/components/katalog-interaktif";
import { ambilDaftarProdukPublik } from "@/lib/data/publik";

export const metadata: Metadata = {
  title: "Katalog",
  description:
    "Jelajahi parfum ori dan decant Wawangian Pelajar dalam pilihan mulai 1 ml.",
};

export const revalidate = 300;

export default async function HalamanKatalog() {
  const daftarProduk = await ambilDaftarProdukPublik();
  return (
    <main className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-black tracking-[0.16em] text-[#087477] uppercase">
            Katalog Wawangian Pelajar
          </p>
          <h1 className="mt-4 text-4xl leading-tight font-black tracking-[-0.045em] text-[#102A43] sm:text-5xl">
            Temukan karakter wangi yang terasa seperti kamu.
          </h1>
          <p className="mt-5 text-base leading-7 text-[#282B2F]">
            Cari berdasarkan nama atau karakter aroma, lalu gunakan filter untuk
            mempersempit pilihanmu.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-[#B6DAD4] bg-[#E5F2EF] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="font-black text-[#102A43]">Ingin rekomendasi yang lebih cepat?</p>
            <p className="mt-1 text-sm leading-6 text-[#282B2F]">Temukan Wangimu mencocokkan karakter, waktu, dan kegiatan dengan pilihan aroma kami.</p>
          </div>
          <Link href="/temukan" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#087477] px-5 py-3 text-sm font-black text-white hover:bg-[#075E61]">
            Coba kuis →
          </Link>
        </div>
        <div className="mt-10">
          <KatalogInteraktif daftarProduk={daftarProduk} />
        </div>
      </div>
    </main>
  );
}
