import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KartuProduk } from "@/components/kartu-produk";
import { PlaceholderVisual } from "@/components/placeholder-visual";
import {
  ambilProduk,
  daftarProduk,
  formatRupiah,
  labelKategori,
} from "@/data/produk";

type ParameterHalaman = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return daftarProduk.map((produk) => ({ slug: produk.slug }));
}

export async function generateMetadata({
  params,
}: ParameterHalaman): Promise<Metadata> {
  const { slug } = await params;
  const produk = ambilProduk(slug);

  if (!produk) return { title: "Produk tidak ditemukan" };

  return {
    title: produk.nama,
    description: produk.ringkasan,
  };
}

export default async function HalamanDetailProduk({ params }: ParameterHalaman) {
  const { slug } = await params;
  const produk = ambilProduk(slug);

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
      <div className="mx-auto w-full max-w-7xl">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#0f6b62]">
                Beranda
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/katalog" className="hover:text-[#0f6b62]">
                Katalog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-bold text-[#14223d]">{produk.nama}</li>
          </ol>
        </nav>

        <div className="mt-7 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <section aria-label="Galeri produk" className="space-y-3">
            <div className="overflow-hidden rounded-[2rem] border border-[#e3e8ef] bg-white p-3 shadow-sm">
              <PlaceholderVisual warna={produk.warna} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["Tampak depan", "Detail botol", "Kemasan"].map((label) => (
                <div
                  key={label}
                  className="overflow-hidden rounded-2xl border border-[#e3e8ef] bg-white p-1.5"
                >
                  <PlaceholderVisual judul={label} warna={produk.warna} ringkas />
                </div>
              ))}
            </div>
            <p className="text-xs leading-5 text-slate-400">
              Seluruh galeri masih placeholder. Foto produk asli wajib menggantikannya
              sebelum data dipublikasikan sebagai produk nyata.
            </p>
          </section>

          <section>
            <div className="flex flex-wrap items-center gap-2 text-xs font-black tracking-wide uppercase">
              <span className="rounded-full bg-[#e7f4f1] px-3 py-1.5 text-[#0f6b62]">
                {labelKategori[produk.kategori]} · {produk.ukuran}
              </span>
              {produk.kategori === "inspirasi" || produk.kategori === "signature" ? (
                <span className="rounded-full bg-[#fff5d8] px-3 py-1.5 text-[#7a5908]">
                  Racikan Sendiri
                </span>
              ) : null}
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-500">
                Data contoh
              </span>
            </div>
            <h1 className="mt-5 text-4xl leading-tight font-black tracking-[-0.05em] text-[#14223d] sm:text-5xl">
              {produk.nama}
            </h1>
            <p className="mt-4 text-2xl font-black text-[#0f6b62]">
              {produk.harga ? formatRupiah(produk.harga) : "Segera hadir"}
            </p>
            <p className="mt-5 text-base leading-7 text-slate-600">{produk.deskripsi}</p>

            <div className="mt-8 rounded-3xl border border-[#e3e8ef] bg-white p-5 sm:p-6">
              <h2 className="text-xl font-black text-[#14223d]">Profil aroma</h2>
              <dl className="mt-5 grid gap-4 text-sm">
                {[
                  ["Atas", produk.profilAroma.atas],
                  ["Tengah", produk.profilAroma.tengah],
                  ["Dasar", produk.profilAroma.dasar],
                ].map(([label, nilai]) => (
                  <div
                    key={label as string}
                    className="grid grid-cols-[80px_1fr] gap-3 border-b border-[#edf0f4] pb-4 last:border-0 last:pb-0"
                  >
                    <dt className="font-black text-[#14223d]">{label as string}</dt>
                    <dd className="text-slate-600">{(nilai as string[]).join(" · ")}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 flex flex-wrap gap-2">
                {[...produk.profilAroma.karakter, ...produk.profilAroma.cocokUntuk].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[#f4f6f9] px-3 py-1.5 text-xs font-bold text-slate-600"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-[#ead9a6] bg-[#fffaf0] p-5">
              <p className="text-xs font-black tracking-wide text-[#b8860b] uppercase">
                Pesan misi
              </p>
              <p className="mt-2 text-sm leading-6 text-[#70510a]">
                Setiap pembelian nantinya menyisihkan 20% keuntungan bersih untuk
                Dana Cahaya Pendidikan. Angka baru ditampilkan setelah memiliki sumber nyata.
              </p>
              <Link
                href="/donasi"
                className="mt-3 inline-flex text-sm font-black text-[#70510a] hover:underline"
              >
                Kenali cara transparansinya →
              </Link>
            </div>

            <button
              type="button"
              disabled
              className="mt-6 min-h-13 w-full cursor-not-allowed rounded-full bg-slate-200 px-6 py-3 text-sm font-black text-slate-500"
            >
              {produk.tersedia
                ? "Tautan marketplace tersedia pada M4"
                : "Produk belum tersedia"}
            </button>
            <p className="mt-3 text-center text-xs leading-5 text-slate-400">
              Website tidak menyediakan checkout atau pembayaran sendiri.
            </p>
          </section>
        </div>

        <section className="mt-16 border-t border-[#dfe5ed] pt-12 sm:mt-20">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">
                Jelajahi lagi
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#14223d]">
                Produk terkait
              </h2>
            </div>
            <Link href="/katalog" className="text-sm font-black text-[#0f6b62] hover:underline">
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
