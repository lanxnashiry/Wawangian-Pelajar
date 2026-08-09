import Image from "next/image";
import Link from "next/link";
import { KartuArtikel } from "@/components/kartu-artikel";
import { KartuProduk } from "@/components/kartu-produk";
import { PlaceholderVisual } from "@/components/placeholder-visual";
import { VisualArtikel } from "@/components/visual-data";
import { TajukBagian } from "@/components/tajuk-bagian";
import { ambilDaftarArtikelPublik, ambilDaftarProdukPublik } from "@/lib/data/publik";
import { ambilRingkasanDonasiPublik } from "@/lib/data/donasi";
import { formatRupiah } from "@/data/produk";

type Ulasan = {
  nama: string;
  isi: string;
  nilai: number;
};

const ulasan: Ulasan[] = [];
const alasanBerbeda = [
  {
    gambar: "/prinsip-sumber-tepercaya.webp",
    alt: "Dokumen terverifikasi dengan perisai dan tanda centang",
    judul: "Sumber tepercaya",
    deskripsi: "Produk ori dan decant dilengkapi informasi yang jelas untuk membantu memilih.",
  },
  {
    gambar: "/prinsip-untuk-pendidikan.webp",
    alt: "Buku, hati, dan toga sebagai simbol kepedulian pada pendidikan",
    judul: "Untuk pendidikan",
    deskripsi: "Komitmen donasi dihitung dari laba bersih setiap transaksi, bukan angka bebas.",
  },
  {
    gambar: "/prinsip-pilihan-terjangkau.webp",
    alt: "Label harga terverifikasi dengan koin",
    judul: "Pilihan terjangkau",
    deskripsi: "Pilihan decant membantu pelajar mengenal aroma dengan lebih ringan.",
  },
];

export const revalidate = 300;

export default async function Beranda() {
  const [daftarProduk, daftarArtikel, ringkasanDonasi] = await Promise.all([
    ambilDaftarProdukPublik(), ambilDaftarArtikelPublik(), ambilRingkasanDonasiPublik(),
  ]);
  const produkUnggulan = daftarProduk.filter((produk) => produk.unggulan);
  const artikelTerbaru = daftarArtikel.slice(0, 3);
  const artikelCerita = daftarArtikel.find((artikel) => artikel.kategori === "cerita_misi") ?? artikelTerbaru[0];
  const tautanCeritaMisi = daftarArtikel.some((artikel) => artikel.slug === "berawal-dari-pelajar") ? "/cerita/berawal-dari-pelajar" : "/cerita";

  return (
    <main>
      <section className="overflow-hidden bg-[#FAF7F1]">
        <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] w-full max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-20">
          <div>
            <p className="text-xs font-black tracking-[0.18em] text-[#087477] uppercase">
              Selamat datang
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl leading-[1.02] font-black tracking-[-0.055em] text-[#102A43] text-balance sm:text-6xl lg:text-7xl">
              Wangi yang berpihak pada pendidikan.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#282B2F]">
              Parfum ori, decant, dan racikan sendiri yang terjangkau. Setiap
              transaksi yang menghasilkan laba ikut menyalakan Dana Cahaya Pendidikan.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/katalog"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#087477] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#087477]/20 transition hover:bg-[#075E61] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#087477]"
              >
                Lihat katalog
              </Link>
              <Link
                href="/temukan"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#087477] bg-[#E5F2EF] px-6 py-3 text-sm font-black text-[#087477] transition hover:bg-[#D6ECE7] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#087477]"
              >
                Temukan wangimu
              </Link>
              <Link
                href="/donasi"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFC3B2] bg-white px-6 py-3 text-sm font-black text-[#102A43] transition hover:border-[#087477] hover:text-[#087477] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#087477]"
              >
                Kenali Dana Cahaya
              </Link>
            </div>
            <p className="mt-5 text-xs leading-5 text-[#687078]">
              Produk dan harga berasal dari katalog resmi Wawangian Pelajar; pembelian dilanjutkan melalui marketplace.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -top-10 -right-12 h-36 w-36 rounded-full bg-[#D1B779]/25 blur-2xl" />
            <div className="absolute -bottom-8 -left-10 h-40 w-40 rounded-full bg-[#087477]/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[#DED3C2] bg-[#F4EBDD] p-3 shadow-2xl shadow-[#102A43]/12 sm:p-5">
              <div className="relative aspect-square overflow-hidden rounded-[1.4rem] bg-[#102A43]">
                <Image
                  src="/beranda-koleksi-wawangian.webp"
                  alt="Koleksi parfum Wawangian Pelajar"
                  fill
                  priority
                  sizes="(min-width: 1024px) 560px, 90vw"
                  className="object-contain"
                />
              </div>
              <div className="absolute right-7 bottom-7 left-7 rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur sm:right-10 sm:bottom-10 sm:left-10">
                <p className="text-xs font-black tracking-wide text-[#C7A25A] uppercase">
                  Dana Cahaya Pendidikan
                </p>
                <p className="mt-1 text-sm font-bold text-[#102A43]">
                  Cerita dulu, jualan kemudian.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#102A43] text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-9 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="text-xs font-black tracking-[0.16em] text-[#D1B779] uppercase">
              Dana Cahaya Pendidikan — transparan
            </p>
            {!ringkasanDonasi.tersedia ? (
              <>
                <h2 className="mt-2 text-2xl font-black sm:text-3xl">Ringkasan transparansi belum dapat dimuat.</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#D9E1E8]">Nilai tidak ditaksir. Silakan coba kembali setelah layanan tersedia.</p>
              </>
            ) : ringkasanDonasi.terkumpul === 0 ? (
              <>
                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  Perjalanan baru dimulai.
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#D9E1E8]">
                  Belum ada nilai yang dapat dilaporkan. Setiap rupiah akan dicatat
                  secara terbuka dan disertai bukti yang dapat diperiksa.
                </p>
              </>
            ) : <><h2 className="mt-2 text-2xl font-black sm:text-3xl">{formatRupiah(ringkasanDonasi.terkumpul)} terkumpul.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#D9E1E8]">{formatRupiah(ringkasanDonasi.tersalurkan)} telah disalurkan dan {formatRupiah(ringkasanDonasi.saldoAmanah)} tetap tercatat sebagai saldo amanah.</p></>}
          </div>
          <Link
            href="/donasi"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-black text-[#102A43] hover:bg-[#F6EACD] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
          >
            Lihat transparansi →
          </Link>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <TajukBagian
              label="Katalog produk"
              judul="Produk unggulan"
              deskripsi="Kenali karakter aromanya dan temukan pilihan yang paling sesuai untukmu."
            />
            <Link
              href="/katalog"
              className="shrink-0 text-sm font-black text-[#087477] hover:underline"
            >
              Lihat semua produk →
            </Link>
          </div>
          <div className="mt-7 flex flex-col gap-4 rounded-3xl bg-[#E5F2EF] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-black text-[#102A43]">Belum yakin memilih aroma?</p>
              <p className="mt-1 text-sm leading-6 text-[#282B2F]">Jawab lima pertanyaan ringan tanpa login dan lihat keluarga aroma yang paling mendekati seleramu.</p>
            </div>
            <Link href="/temukan" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#087477] px-5 py-3 text-sm font-black text-white hover:bg-[#075E61]">
              Mulai kuis →
            </Link>
          </div>
          {produkUnggulan.length ? <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {produkUnggulan.map((produk) => (
              <KartuProduk key={produk.slug} produk={produk} />
            ))}
          </div> : <p className="mt-8 rounded-3xl border border-dashed border-[#CFC3B2] bg-white p-8 text-center text-sm text-[#282B2F]">Produk unggulan akan segera hadir.</p>}
        </div>
      </section>

      <section className="bg-[#FAF7F1] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <TajukBagian
            label="Prinsip kami"
            judul="Kenapa Wawangian Pelajar berbeda"
            deskripsi="Kepercayaan dibangun dari keterbukaan, bukan klaim yang tidak dapat dibuktikan."
            rataTengah
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {alasanBerbeda.map((alasan) => (
              <article
                key={alasan.judul}
                className="rounded-3xl border border-[#DED3C2] bg-[#FAF7F1] p-6 text-center"
              >
                <div className="relative mx-auto aspect-[3/2] w-full overflow-hidden rounded-2xl bg-[#05070A]">
                  <Image
                    src={alasan.gambar}
                    alt={alasan.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 90vw"
                    className="object-contain"
                  />
                </div>
                <h3 className="mt-5 text-xl font-black text-[#102A43]">
                  {alasan.judul}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#282B2F]">
                  {alasan.deskripsi}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 rounded-[2rem] bg-[#FAF7F1] p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-14">
          {artikelCerita ? <VisualArtikel artikel={artikelCerita} ringkas /> : <PlaceholderVisual judul="Cerita Wawangian Pelajar" warna="emas" ringkas />}
          <div>
            <p className="text-xs font-black tracking-[0.16em] text-[#C7A25A] uppercase">
              Cerita misi
            </p>
            <h2 className="mt-4 text-3xl leading-tight font-black tracking-[-0.04em] text-[#102A43] sm:text-4xl">
              Berawal dari pelajar, bertumbuh untuk pendidikan.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#282B2F]">
              Nama kami lahir dari semangat pelajar. Dampaknya belum kami besar-besarkan:
              perjalanan ini baru dimulai, dan setiap cerita akan disertai bukti yang dapat diperiksa.
            </p>
            <Link
              href={tautanCeritaMisi}
              className="mt-6 inline-flex rounded-full bg-[#102A43] px-5 py-3 text-sm font-black text-white hover:bg-[#183D59] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#102A43]"
            >
              Baca cerita kami →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF7F1] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <TajukBagian
              label="Baca dan bagikan"
              judul="Cerita & edukasi terbaru"
              deskripsi="Pilihan bacaan untuk membantu mengenali aroma dan memahami misi kami."
            />
            <Link
              href="/cerita"
              className="shrink-0 text-sm font-black text-[#087477] hover:underline"
            >
              Lihat semua cerita →
            </Link>
          </div>
          {artikelTerbaru.length ? <div className="mt-8 grid gap-5 md:grid-cols-3">
            {artikelTerbaru.map((artikel) => (
              <KartuArtikel key={artikel.slug} artikel={artikel} />
            ))}
          </div> : <p className="mt-8 rounded-3xl border border-dashed border-[#CFC3B2] bg-[#FAF7F1] p-8 text-center text-sm text-[#282B2F]">Cerita dan edukasi akan segera hadir.</p>}
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-8 overflow-hidden rounded-[2rem] bg-[#087477] p-7 text-white sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-14">
          <div>
            <p className="text-xs font-black tracking-[0.16em] text-[#bfe3dc] uppercase">
              Program afiliasi
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl leading-tight font-black tracking-[-0.04em] sm:text-4xl">
              Pelajar bisa belajar menjual, mendapat komisi, dan ikut membantu pendidikan.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#d7efea]">
              Komisi dasar dibayar langsung oleh marketplace. Wawangian Pelajar
              menyediakan panduan, materi promosi, komunitas, dan bonus tambahan.
            </p>
          </div>
          <Link
            href="/afiliasi"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#087477] hover:bg-[#F0F7F4] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
          >
            Pelajari program →
          </Link>
        </div>
      </section>

      {ulasan.length > 0 ? (
        <section className="bg-[#FAF7F1] px-5 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <TajukBagian judul="Kata pembeli" rataTengah />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {ulasan.map((item) => (
                <blockquote key={item.nama} className="rounded-3xl bg-[#F4EBDD] p-6">
                  <p className="text-base leading-7 text-[#282B2F]">“{item.isi}”</p>
                  <footer className="mt-4 text-sm font-bold text-[#102A43]">
                    {item.nama} · {"★".repeat(item.nilai)}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
