import type { Metadata } from "next";
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
        <div className="mt-10">
          <KatalogInteraktif daftarProduk={daftarProduk} />
        </div>
      </div>
    </main>
  );
}
