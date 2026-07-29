import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KartuArtikel } from "@/components/kartu-artikel";
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

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ParameterHalaman): Promise<Metadata> {
  const { slug } = await params;
  const artikel = await ambilArtikelPublik(slug);

  if (!artikel) return { title: "Artikel tidak ditemukan" };

  return {
    title: artikel.judul,
    description: artikel.cuplikan,
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
            {artikel.tanggal} · {artikel.menitBaca} menit baca · {artikel.sumberData === "supabase" ? artikel.penulis : "Konten contoh M1"}
          </p>
        </header>

        <div className="mt-9 overflow-hidden rounded-[2rem] border border-[#DED3C2] bg-white p-3 shadow-sm sm:p-4">
          <VisualArtikel artikel={artikel} />
        </div>
        <p className="mt-3 text-center text-xs leading-5 text-[#687078]">
          {artikel.fotoUtama ? "Gambar dibaca dari penyimpanan resmi." : "Visual sementara; foto asli wajib digunakan untuk cerita dampak nyata."}
        </p>

        <div className="mx-auto mt-10 max-w-3xl text-[17px] leading-8 text-[#282B2F]">
          {artikel.bagian.map((bagian, indeks) => (
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
          ))}

          <div className="mt-10 border-t border-[#DED3C2] pt-7">
            <p className="mb-4 text-sm font-black text-[#102A43]">Bagikan:</p>
            {artikel.shareAktif !== false ? <TombolBagikan judul={artikel.judul} /> : <p className="text-sm text-[#4A4D52]">Tombol berbagi dinonaktifkan oleh Admin.</p>}
          </div>

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
