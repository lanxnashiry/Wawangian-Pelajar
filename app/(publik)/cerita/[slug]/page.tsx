import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IsiMarkdown } from "@/components/isi-markdown";
import { KartuArtikel } from "@/components/kartu-artikel";
import { SkemaArtikel } from "@/components/skema-artikel";
import { VisualArtikel } from "@/components/visual-data";
import { TombolBagikan } from "@/components/tombol-bagikan";
import {
  labelKategoriArtikel,
} from "@/data/artikel";
import { ambilArtikelPublik, ambilDaftarArtikelPublik } from "@/lib/data/publik";

type ParameterHalaman = {
  params: Promise<{ slug: string }>;
};

const tujuanTindakan = {
  cerita_misi: {
    label: "Dana Cahaya Pendidikan",
    judul: "Kepercayaan tumbuh dari bukti yang dapat diperiksa.",
    tautan: "/donasi",
    teksTautan: "Kenali Dana Cahaya Pendidikan →",
  },
  edukasi: {
    label: "Pilihan aroma",
    judul: "Gunakan pengetahuan ini untuk mengenali pilihanmu.",
    tautan: "/katalog",
    teksTautan: "Jelajahi pilihan aroma →",
  },
  tips: {
    label: "Temukan wangimu",
    judul: "Kenali karakter aroma sebelum menentukan pilihan.",
    tautan: "/temukan",
    teksTautan: "Mulai Temukan Wangimu →",
  },
  komunitas: {
    label: "Program afiliasi",
    judul: "Bagikan aroma favoritmu dan bertumbuh bersama komunitas.",
    tautan: "/afiliasi",
    teksTautan: "Pelajari program afiliasi →",
  },
};

export const revalidate = 300;

export async function generateMetadata({
  params,
}: ParameterHalaman): Promise<Metadata> {
  const { slug } = await params;
  const artikel = await ambilArtikelPublik(slug);

  if (!artikel) return { title: "Artikel tidak ditemukan" };

  const judulMeta = artikel.metaJudul?.trim() || artikel.judul;
  const deskripsiMeta = artikel.metaDeskripsi?.trim() || artikel.cuplikan;
  const jalur = `/cerita/${artikel.slug}`;
  const gambar = artikel.fotoUtama ?? "/logo-wawangian-pelajar-resmi.png";

  return {
    title: judulMeta,
    description: deskripsiMeta,
    alternates: { canonical: jalur },
    openGraph: {
      type: "article",
      locale: "id_ID",
      siteName: "Wawangian Pelajar",
      url: jalur,
      title: judulMeta,
      description: deskripsiMeta,
      publishedTime: artikel.tanggalTerbitIso,
      authors: artikel.penulis ? [artikel.penulis] : undefined,
      images: [
        {
          url: gambar,
          alt: artikel.fotoAlt?.trim() || artikel.judul,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: judulMeta,
      description: deskripsiMeta,
      images: [gambar],
    },
  };
}

export default async function HalamanArtikel({ params }: ParameterHalaman) {
  const { slug } = await params;
  const [artikel, daftarArtikel] = await Promise.all([
    ambilArtikelPublik(slug), ambilDaftarArtikelPublik(),
  ]);

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
        <SkemaArtikel artikel={artikel} />
        <nav aria-label="Breadcrumb" className="text-sm text-[#4A4D52]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#087477]">
                Beranda
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/cerita" className="hover:text-[#087477]">
                Cerita
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-bold text-[#102A43]">{artikel.judul}</li>
          </ol>
        </nav>

        <header className="pt-9 text-center">
          <p className="text-xs font-black tracking-[0.16em] text-[#087477] uppercase">
            {labelKategoriArtikel[artikel.kategori]}
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl leading-tight font-black tracking-[-0.05em] text-[#102A43] sm:text-5xl lg:text-6xl">
            {artikel.judul}
          </h1>
          <p className="mt-5 text-sm text-[#4A4D52]">
            {artikel.tanggal} · {artikel.menitBaca} menit baca · {artikel.penulis?.trim() || "Wawangian Pelajar"}
          </p>
        </header>

        <div className="mt-9 overflow-hidden rounded-[2rem] border border-[#DED3C2] bg-white p-3 shadow-sm sm:p-4">
          <VisualArtikel artikel={artikel} />
        </div>

        <div className="mx-auto mt-10 max-w-3xl text-[17px] leading-8 text-[#282B2F]">
          {artikel.isiMarkdown ? (
            <IsiMarkdown markdown={artikel.isiMarkdown} />
          ) : (
            artikel.bagian.map((bagian, indeks) => (
              <section key={bagian.judul ?? indeks} className="mt-9 first:mt-0">
                {bagian.judul ? (
                  <h2 className="mb-4 text-2xl font-black tracking-tight text-[#102A43]">
                    {bagian.judul}
                  </h2>
                ) : null}
                {bagian.paragraf.map((paragraf) => (
                  <p key={paragraf} className="mt-5 first:mt-0">
                    {paragraf}
                  </p>
                ))}
              </section>
            ))
          )}

          {artikel.shareAktif !== false ? (
            <div className="mt-10 border-t border-[#DED3C2] pt-7">
              <p className="mb-4 text-sm font-black text-[#102A43]">Bagikan:</p>
              <TombolBagikan judul={artikel.judul} />
            </div>
          ) : null}

          <aside className="mt-10 rounded-3xl border border-[#E5D4B3] bg-[#FAF7F1] p-6">
            <p className="text-xs font-black tracking-[0.14em] text-[#C7A25A] uppercase">
              {tindakan.label}
            </p>
            <h2 className="mt-3 text-2xl leading-tight font-black text-[#102A43]">
              {tindakan.judul}
            </h2>
            <Link
              href={tindakan.tautan}
              className="mt-5 inline-flex text-sm font-black text-[#6D5426] hover:underline"
            >
              {tindakan.teksTautan}
            </Link>
          </aside>

          <nav aria-label="Lanjutkan dari artikel" className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href="/temukan"
              className="rounded-2xl border border-[#CFE5E0] bg-[#E5F2EF] p-5 text-sm font-black text-[#0D5554] hover:border-[#087477]"
            >
              Temukan aroma yang cocok →
            </Link>
            {artikel.kategori === "edukasi" ? (
              <Link
                href="/produk/decant-mykonos-original-5ml-pilih-varian"
                className="rounded-2xl border border-[#DED3C2] bg-white p-5 text-sm font-black text-[#102A43] hover:border-[#087477]"
              >
                Coba lewat Decant 5 ml →
              </Link>
            ) : (
              <Link
                href="/katalog"
                className="rounded-2xl border border-[#DED3C2] bg-white p-5 text-sm font-black text-[#102A43] hover:border-[#087477]"
              >
                Lihat seluruh katalog →
              </Link>
            )}
          </nav>
        </div>
      </article>

      <section className="mx-auto mt-16 max-w-6xl border-t border-[#DED3C2] pt-12 sm:mt-20">
        <div className="flex items-end justify-between gap-5">
          <h2 className="text-3xl font-black tracking-tight text-[#102A43]">
            Artikel terkait
          </h2>
          <Link href="/cerita" className="text-sm font-black text-[#087477] hover:underline">
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
