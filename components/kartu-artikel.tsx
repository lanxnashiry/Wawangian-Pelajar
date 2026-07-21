import Link from "next/link";
import {
  labelKategoriArtikel,
  type Artikel,
} from "@/data/artikel";
import { PlaceholderVisual } from "./placeholder-visual";

export function KartuArtikel({ artikel }: { artikel: Artikel }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-[#e3e8ef] bg-white shadow-sm">
      <Link
        href={`/cerita/${artikel.slug}`}
        className="block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#0f6b62]"
        aria-label={`Baca ${artikel.judul}`}
      >
        <PlaceholderVisual
          judul="Ilustrasi artikel sementara"
          warna={artikel.warna}
          ringkas
        />
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="font-black tracking-wide text-[#0f6b62] uppercase">
            {labelKategoriArtikel[artikel.kategori]}
          </span>
          <span className="text-slate-400">{artikel.menitBaca} menit</span>
        </div>
        <h2 className="mt-3 text-xl leading-snug font-black tracking-tight text-[#14223d]">
          <Link
            href={`/cerita/${artikel.slug}`}
            className="transition-colors hover:text-[#0f6b62]"
          >
            {artikel.judul}
          </Link>
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">{artikel.cuplikan}</p>
        <Link
          href={`/cerita/${artikel.slug}`}
          className="mt-5 inline-flex text-sm font-black text-[#0f6b62] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6b62]"
        >
          Baca artikel →
        </Link>
      </div>
    </article>
  );
}
