import Link from "next/link";
import {
  formatRupiah,
  labelKategori,
  type Produk,
} from "@/data/produk";
import { VisualProduk } from "./visual-data";

export function KartuProduk({ produk }: { produk: Produk }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#DED3C2] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#102A43]/8">
      <Link
        href={`/produk/${produk.slug}`}
        className="block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#087477]"
        aria-label={`Lihat detail ${produk.nama}`}
      >
        <VisualProduk produk={produk} ringkas />
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-black tracking-wide uppercase">
          <span className="rounded-full bg-[#F4EBDD] px-2.5 py-1 text-[#282B2F]">
            {labelKategori[produk.kategori]} · {produk.ukuran}
          </span>
          {produk.kategori === "inspirasi" || produk.kategori === "signature" ? (
            <span className="rounded-full bg-[#F6EACD] px-2.5 py-1 text-[#6D5426]">
              Racikan Sendiri
            </span>
          ) : null}
        </div>
        <h2 className="mt-4 text-lg leading-snug font-black tracking-tight text-[#102A43]">
          <Link href={`/produk/${produk.slug}`} className="hover:text-[#087477]">
            {produk.nama}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#282B2F]">
          {produk.ringkasan}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p className="font-black text-[#102A43]">
            {produk.harga > 0 ? formatRupiah(produk.harga) : "Segera hadir"}
          </p>
          <Link
            href={`/produk/${produk.slug}`}
            className="rounded-full border border-[#087477] px-4 py-2 text-sm font-bold text-[#087477] transition hover:bg-[#087477] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087477]"
          >
            Lihat
          </Link>
        </div>
      </div>
    </article>
  );
}
