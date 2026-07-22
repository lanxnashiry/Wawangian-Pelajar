import type { Metadata } from "next";
import Link from "next/link";
import { KatalogInteraktif } from "@/components/katalog-interaktif";
import { ambilDaftarProdukPublik } from "@/lib/data/publik";

export const metadata: Metadata = {
  title: "Katalog",
  description:
    "Jelajahi data contoh parfum ori, decant, dan racikan sendiri Wawangian Pelajar.",
};

export const dynamic = "force-dynamic";

export default async function HalamanKatalog() {
  const daftarProduk = await ambilDaftarProdukPublik();
  const contoh = daftarProduk.some((produk) => produk.sumberData === "contoh");
  return (
    <main className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">
            {contoh ? "Fallback data contoh" : "Data katalog Supabase"}
          </p>
          <h1 className="mt-4 text-4xl leading-tight font-black tracking-[-0.045em] text-[#14223d] sm:text-5xl">
            Temukan karakter wangi yang terasa seperti kamu.
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600">
            Cari berdasarkan nama atau karakter aroma, lalu gunakan filter untuk
            mempersempit pilihan. Hanya produk berstatus aktif yang ditampilkan.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-[#c8e2dd] bg-[#e7f4f1] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="font-black text-[#14223d]">Ingin rekomendasi yang lebih cepat?</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">Temukan Wangimu mencocokkan karakter, waktu, dan kegiatan dengan data Produk.</p>
          </div>
          <Link href="/temukan" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#0f6b62] px-5 py-3 text-sm font-black text-white hover:bg-[#0b554e]">
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
