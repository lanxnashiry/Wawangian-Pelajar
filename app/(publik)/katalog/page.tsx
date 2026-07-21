import type { Metadata } from "next";
import { KatalogInteraktif } from "@/components/katalog-interaktif";

export const metadata: Metadata = {
  title: "Katalog",
  description:
    "Jelajahi data contoh parfum ori, decant, dan racikan sendiri Wawangian Pelajar.",
};

export default function HalamanKatalog() {
  return (
    <main className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">
            Data contoh M1
          </p>
          <h1 className="mt-4 text-4xl leading-tight font-black tracking-[-0.045em] text-[#14223d] sm:text-5xl">
            Temukan karakter wangi yang terasa seperti kamu.
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600">
            Cari berdasarkan nama atau karakter aroma, lalu gunakan filter untuk
            mempersempit pilihan. Foto, stok, dan harga final akan dikelola melalui
            data nyata pada milestone admin.
          </p>
        </div>
        <div className="mt-10">
          <KatalogInteraktif />
        </div>
      </div>
    </main>
  );
}
