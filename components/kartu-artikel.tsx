import Link from "next/link";
import {
  labelKategoriArtikel,
  type Artikel,
} from "@/data/artikel";
import { VisualArtikel } from "./visual-data";

export function KartuArtikel({ artikel }: { artikel: Artikel }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-[#DED3C2] bg-white shadow-sm">
      <Link
        href={`/cerita/${artikel.slug}`}
        className="block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#087477]"
        aria-label={`Baca ${artikel.judul}`}
      >
        <VisualArtikel artikel={artikel} ringkas />
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="font-black tracking-wide text-[#087477] uppercase">
            {labelKategoriArtikel[artikel.kategori]}
          </span>
          <span className="text-[#687078]">{artikel.menitBaca} menit</span>
        </div>
        <h2 className="mt-3 text-xl leading-snug font-black tracking-tight text-[#102A43]">
          <Link
            href={`/cerita/${artikel.slug}`}
            className="transition-colors hover:text-[#087477]"
          >
            {artikel.judul}
          </Link>
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#282B2F]">{artikel.cuplikan}</p>
        <Link
          href={`/cerita/${artikel.slug}`}
          className="mt-5 inline-flex text-sm font-black text-[#087477] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087477]"
        >
          Baca artikel →
        </Link>
      </div>
    </article>
  );
}
