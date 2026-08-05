import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KartuProduk } from "@/components/kartu-produk";
import { JembatanMarketplace } from "@/components/jembatan-marketplace";
import { VisualProduk } from "@/components/visual-data";
import { SkemaProduk } from "@/components/skema-produk";
import {
  formatRupiah,
  labelKategori,
} from "@/data/produk";
import { ambilDaftarProdukPublik, ambilProdukPublik } from "@/lib/data/publik";

type ParameterHalaman = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;

export async function generateMetadata({
  params,
}: ParameterHalaman): Promise<Metadata> {
  const { slug } = await params;
  const produk = await ambilProdukPublik(slug);

  if (!produk) return { title: "Produk tidak ditemukan" };

  return {
    title: produk.nama,
    description: produk.ringkasan,
  };
}

export default async function HalamanDetailProduk({ params }: ParameterHalaman) {
  const { slug } = await params;
  const [produk, daftarProduk] = await Promise.all([
    ambilProdukPublik(slug), ambilDaftarProdukPublik(),
  ]);

  if (!produk) notFound();

  const produkTerkait = daftarProduk
    .filter((item) => item.slug !== produk.slug)
    .sort((itemA, itemB) =>
      itemA.kategori === produk.kategori && itemB.kategori !== produk.kategori
        ? -1
        : 0,
    )
    .slice(0, 3);

  return (
    <main className="px-5 py-8 sm:px-8 sm:py-12 lg:px-10">
      <SkemaProduk produk={produk} />
      <div className="mx-auto w-full max-w-7xl">
        <nav aria-label="Breadcrumb" className="text-sm text-[#4A4D52]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#087477]">
                Beranda
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/katalog" className="hover:text-[#087477]">
                Katalog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-bold text-[#102A43]">{produk.nama}</li>
          </ol>
        </nav>

        <div className="mt-7 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <section aria-label="Foto utama produk">
            <div className="overflow-hidden rounded-[2rem] border border-[#DED3C2] bg-white p-3 shadow-sm">
              <VisualProduk produk={produk} />
            </div>
          </section>

          <section>
            <div className="flex flex-wrap items-center gap-2 text-xs font-black tracking-wide uppercase">
              <span className="rounded-full bg-[#E5F2EF] px-3 py-1.5 text-[#087477]">
                {labelKategori[produk.kategori]} · {produk.ukuran}
              </span>
              {produk.kategori === "inspirasi" || produk.kategori === "signature" ? (
                <span className="rounded-full bg-[#F6EACD] px-3 py-1.5 text-[#6D5426]">
                  Racikan Sendiri
                </span>
              ) : null}
            </div>
            <h1 className="mt-5 text-4xl leading-tight font-black tracking-[-0.05em] text-[#102A43] sm:text-5xl">
              {produk.nama}
            </h1>
            <p className="mt-4 text-2xl font-black text-[#087477]">
              {produk.harga ? formatRupiah(produk.harga) : "Segera hadir"}
            </p>
            <p className="mt-5 whitespace-pre-line text-base leading-7 text-[#282B2F]">
              {produk.deskripsi}
            </p>

            <div className="mt-8 rounded-3xl border border-[#DED3C2] bg-white p-5 sm:p-6">
              <h2 className="text-xl font-black text-[#102A43]">Profil aroma</h2>
              <dl className="mt-5 grid gap-4 text-sm">
                {[
                  ["Atas", produk.profilAroma.atas],
                  ["Tengah", produk.profilAroma.tengah],
                  ["Dasar", produk.profilAroma.dasar],
                ].map(([label, nilai]) => (
                  <div
                    key={label as string}
                    className="grid grid-cols-[80px_1fr] gap-3 border-b border-[#EDE3D4] pb-4 last:border-0 last:pb-0"
                  >
                    <dt className="font-black text-[#102A43]">{label as string}</dt>
                    <dd className="text-[#282B2F]">{(nilai as string[]).join(" · ")}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-5 rounded-3xl border border-[#E5D4B3] bg-[#FAF7F1] p-5">
              <p className="text-xs font-black tracking-wide text-[#C7A25A] uppercase">
                Pesan misi
              </p>
              <p className="mt-2 text-sm leading-6 text-[#6D5426]">
                Setiap pembelian melalui marketplace menyisihkan 20% laba bersih setiap transaksi untuk
                Dana Cahaya Pendidikan. Pelaporannya disajikan secara terbuka dan dapat diperiksa.
              </p>
              <Link
                href="/donasi"
                className="mt-3 inline-flex text-sm font-black text-[#6D5426] hover:underline"
              >
                Kenali cara transparansinya →
              </Link>
            </div>

            <JembatanMarketplace
              produkId={produk.id}
              namaProduk={produk.nama}
              tersedia={produk.tersedia}
              linkMarketplace={produk.linkMarketplace}
            />
            <p className="mt-3 text-center text-xs leading-5 text-[#687078]">
              Website tidak menyediakan checkout atau pembayaran sendiri.
            </p>
          </section>
        </div>

        <section className="mt-16 border-t border-[#DED3C2] pt-12 sm:mt-20">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-xs font-black tracking-[0.16em] text-[#087477] uppercase">
                Jelajahi lagi
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102A43]">
                Produk terkait
              </h2>
            </div>
            <Link href="/katalog" className="text-sm font-black text-[#087477] hover:underline">
              Semua produk →
            </Link>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {produkTerkait.map((item) => (
              <KartuProduk key={item.slug} produk={item} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
