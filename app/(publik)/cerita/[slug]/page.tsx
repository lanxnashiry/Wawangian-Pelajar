import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KartuArtikel } from "@/components/kartu-artikel";
import { PlaceholderVisual } from "@/components/placeholder-visual";
import { TombolBagikan } from "@/components/tombol-bagikan";
import {
  ambilArtikel,
  daftarArtikel,
  labelKategoriArtikel,
} from "@/data/artikel";

type ParameterHalaman = {
  params: Promise<{ slug: string }>;
};

const tujuanTindakan = {
  cerita_misi: {
    label: "Cerita misi → transparansi",
    judul: "Kepercayaan tumbuh dari bukti yang dapat diperiksa.",
    tautan: "/donasi",
    teksTautan: "Kenali Dana Cahaya Pendidikan →",
  },
  edukasi: {
    label: "Edukasi → katalog",
    judul: "Gunakan pengetahuan ini untuk mengenali pilihanmu.",
    tautan: "/katalog",
    teksTautan: "Jelajahi katalog contoh →",
  },
  tips: {
    label: "Tips → katalog",
    judul: "Kenali karakter aroma sebelum menentukan pilihan.",
    tautan: "/katalog",
    teksTautan: "Lihat profil aroma →",
  },
  komunitas: {
    label: "Komunitas → afiliasi",
    judul: "Ruang afiliasi pelajar sedang kami siapkan.",
    tautan: "/afiliasi",
    teksTautan: "Pelajari program afiliasi →",
  },
};

export function generateStaticParams() {
  return daftarArtikel.map((artikel) => ({ slug: artikel.slug }));
}

export async function generateMetadata({
  params,
}: ParameterHalaman): Promise<Metadata> {
  const { slug } = await params;
  const artikel = ambilArtikel(slug);

  if (!artikel) return { title: "Artikel tidak ditemukan" };

  return {
    title: artikel.judul,
    description: artikel.cuplikan,
  };
}

export default async function HalamanArtikel({ params }: ParameterHalaman) {
  const { slug } = await params;
  const artikel = ambilArtikel(slug);

  if (!artikel) notFound();

  const tindakan = tujuanTindakan[artikel.kategori];
  const artikelTerkait = daftarArtikel
    .filter((item) => item.slug !== artikel.slug)
    .sort((itemA, itemB) =>
      itemA.kategori === artikel.kategori && itemB.kategori !== artikel.kategori
        ? -1
        : 0,
    )
    .slice(0, 2);

  return (
    <main className="px-5 py-8 sm:px-8 sm:py-12 lg:px-10">
      <article className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#0f6b62]">
                Beranda
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/cerita" className="hover:text-[#0f6b62]">
                Cerita
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-bold text-[#14223d]">{artikel.judul}</li>
          </ol>
        </nav>

        <header className="pt-9 text-center">
          <p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">
            {labelKategoriArtikel[artikel.kategori]}
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl leading-tight font-black tracking-[-0.05em] text-[#14223d] sm:text-5xl lg:text-6xl">
            {artikel.judul}
          </h1>
          <p className="mt-5 text-sm text-slate-500">
            {artikel.tanggal} · {artikel.menitBaca} menit baca · Konten contoh M1
          </p>
        </header>

        <div className="mt-9 overflow-hidden rounded-[2rem] border border-[#e3e8ef] bg-white p-3 shadow-sm sm:p-4">
          <PlaceholderVisual
            judul="Visual editorial sementara"
            warna={artikel.warna}
            ringkas
          />
        </div>
        <p className="mt-3 text-center text-xs leading-5 text-slate-400">
          Visual sementara; foto asli wajib digunakan untuk cerita dampak nyata.
        </p>

        <div className="mx-auto mt-10 max-w-3xl text-[17px] leading-8 text-slate-700">
          {artikel.bagian.map((bagian, indeks) => (
            <section key={bagian.judul ?? indeks} className="mt-9 first:mt-0">
              {bagian.judul ? (
                <h2 className="mb-4 text-2xl font-black tracking-tight text-[#14223d]">
                  {bagian.judul}
                </h2>
              ) : null}
              {bagian.paragraf.map((paragraf) => (
                <p key={paragraf} className="mt-5 first:mt-0">
                  {paragraf}
                </p>
              ))}
            </section>
          ))}

          <div className="mt-10 border-t border-[#dfe5ed] pt-7">
            <p className="mb-4 text-sm font-black text-[#14223d]">Bagikan:</p>
            <TombolBagikan judul={artikel.judul} />
          </div>

          <aside className="mt-10 rounded-3xl border border-[#ead9a6] bg-[#fffaf0] p-6">
            <p className="text-xs font-black tracking-[0.14em] text-[#b8860b] uppercase">
              {tindakan.label}
            </p>
            <h2 className="mt-3 text-2xl leading-tight font-black text-[#14223d]">
              {tindakan.judul}
            </h2>
            <Link
              href={tindakan.tautan}
              className="mt-5 inline-flex text-sm font-black text-[#70510a] hover:underline"
            >
              {tindakan.teksTautan}
            </Link>
          </aside>
        </div>
      </article>

      <section className="mx-auto mt-16 max-w-6xl border-t border-[#dfe5ed] pt-12 sm:mt-20">
        <div className="flex items-end justify-between gap-5">
          <h2 className="text-3xl font-black tracking-tight text-[#14223d]">
            Artikel terkait
          </h2>
          <Link href="/cerita" className="text-sm font-black text-[#0f6b62] hover:underline">
            Semua artikel →
          </Link>
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {artikelTerkait.map((item) => (
            <KartuArtikel key={item.slug} artikel={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
