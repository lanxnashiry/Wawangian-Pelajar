import Link from "next/link";
import {
  formatRupiah,
  labelKategori,
  type Produk,
} from "@/data/produk";
import { PlaceholderVisual } from "./placeholder-visual";

export function KartuProduk({ produk }: { produk: Produk }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#e3e8ef] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#14223d]/8">
      <Link
        href={`/produk/${produk.slug}`}
        className="block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#0f6b62]"
        aria-label={`Lihat detail ${produk.nama}`}
      >
        <PlaceholderVisual warna={produk.warna} ringkas />
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-black tracking-wide uppercase">
          <span className="rounded-full bg-[#f4f6f9] px-2.5 py-1 text-slate-600">
            {labelKategori[produk.kategori]} · {produk.ukuran}
          </span>
          {produk.kategori === "inspirasi" || produk.kategori === "signature" ? (
            <span className="rounded-full bg-[#fff5d8] px-2.5 py-1 text-[#7a5908]">
              Racikan Sendiri
            </span>
          ) : null}
        </div>
        <h2 className="mt-4 text-lg leading-snug font-black tracking-tight text-[#14223d]">
          <Link href={`/produk/${produk.slug}`} className="hover:text-[#0f6b62]">
            {produk.nama}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
          {produk.ringkasan}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-[10px] font-bold tracking-wide text-slate-400 uppercase">
              Data contoh
            </p>
            <p className="mt-1 font-black text-[#14223d]">
              {produk.harga > 0 ? formatRupiah(produk.harga) : "Segera hadir"}
            </p>
          </div>
          <Link
            href={`/produk/${produk.slug}`}
            className="rounded-full border border-[#0f6b62] px-4 py-2 text-sm font-bold text-[#0f6b62] transition hover:bg-[#0f6b62] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6b62]"
          >
            Lihat
          </Link>
        </div>
      </div>
    </article>
  );
}
