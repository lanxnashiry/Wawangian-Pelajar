import Link from "next/link";
import { KartuArtikel } from "@/components/kartu-artikel";
import { KartuProduk } from "@/components/kartu-produk";
import { PlaceholderVisual } from "@/components/placeholder-visual";
import { TajukBagian } from "@/components/tajuk-bagian";
import { daftarArtikel } from "@/data/artikel";
import { daftarProduk } from "@/data/produk";

type Ulasan = {
  nama: string;
  isi: string;
  nilai: number;
};

const ulasan: Ulasan[] = [];
const jumlahDonasiTerkumpul = 0;

const alasanBerbeda = [
  {
    simbol: "✓",
    judul: "Sumber tepercaya",
    deskripsi: "Produk ori dan decant akan dilengkapi informasi sumber yang jelas.",
  },
  {
    simbol: "20%",
    judul: "Untuk pendidikan",
    deskripsi: "Komitmen donasi dihitung dari keuntungan bersih, bukan angka bebas.",
  },
  {
    simbol: "Rp",
    judul: "Pilihan terjangkau",
    deskripsi: "Pilihan decant membantu pelajar mengenal aroma dengan lebih ringan.",
  },
];

export default function Beranda() {
  const produkUnggulan = daftarProduk.filter((produk) => produk.unggulan);
  const artikelTerbaru = daftarArtikel.slice(0, 3);

  return (
    <main>
      <section className="overflow-hidden bg-white">
        <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] w-full max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-20">
          <div>
            <p className="text-xs font-black tracking-[0.18em] text-[#0f6b62] uppercase">
              Selamat datang
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl leading-[1.02] font-black tracking-[-0.055em] text-[#14223d] text-balance sm:text-6xl lg:text-7xl">
              Wangi yang berpihak pada pendidikan.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Parfum ori, decant, dan racikan sendiri yang terjangkau. Setiap
              pembelian nantinya ikut menyalakan Dana Cahaya Pendidikan.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/katalog"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0f6b62] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#0f6b62]/20 transition hover:bg-[#0b554e] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0f6b62]"
              >
                Lihat katalog
              </Link>
              <Link
                href="/donasi"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#cbd4e1] bg-white px-6 py-3 text-sm font-black text-[#14223d] transition hover:border-[#0f6b62] hover:text-[#0f6b62] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0f6b62]"
              >
                Kenali Dana Cahaya
              </Link>
            </div>
            <p className="mt-5 text-xs leading-5 text-slate-400">
              Produk dan harga pada M1 masih berupa data contoh. Transaksi belum aktif.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -top-10 -right-12 h-36 w-36 rounded-full bg-[#e8cb76]/25 blur-2xl" />
            <div className="absolute -bottom-8 -left-10 h-40 w-40 rounded-full bg-[#0f6b62]/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[#e3e8ef] bg-[#f4f6f9] p-3 shadow-2xl shadow-[#14223d]/12 sm:p-5">
              <PlaceholderVisual
                judul="Foto produk asli akan ditempatkan di sini"
                warna="tosca"
              />
              <div className="absolute right-7 bottom-7 left-7 rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur sm:right-10 sm:bottom-10 sm:left-10">
                <p className="text-xs font-black tracking-wide text-[#b8860b] uppercase">
                  Dana Cahaya Pendidikan
                </p>
                <p className="mt-1 text-sm font-bold text-[#14223d]">
                  Cerita dulu, jualan kemudian.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#14223d] text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-9 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="text-xs font-black tracking-[0.16em] text-[#e8cb76] uppercase">
              Dana Cahaya Pendidikan — transparan
            </p>
            {jumlahDonasiTerkumpul === 0 ? (
              <>
                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  Perjalanan baru dimulai.
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                  Belum ada angka yang dapat dilaporkan. Ketika data nyata tersedia,
                  setiap rupiah akan dihitung dari sumber yang jelas dan dapat diperiksa.
                </p>
              </>
            ) : null}
          </div>
          <Link
            href="/donasi"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-black text-[#14223d] hover:bg-[#fff5d8] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
          >
            Lihat transparansi →
          </Link>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <TajukBagian
              label="Katalog contoh"
              judul="Produk unggulan"
              deskripsi="Kenali karakter aromanya dulu. Foto dan data nyata akan menggantikan placeholder pada milestone data nyata."
            />
            <Link
              href="/katalog"
              className="shrink-0 text-sm font-black text-[#0f6b62] hover:underline"
            >
              Lihat semua produk →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {produkUnggulan.map((produk) => (
              <KartuProduk key={produk.slug} produk={produk} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
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
                className="rounded-3xl border border-[#e3e8ef] bg-[#f9fafc] p-6 text-center"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e7f4f1] text-sm font-black text-[#0f6b62]">
                  {alasan.simbol}
                </span>
                <h3 className="mt-5 text-xl font-black text-[#14223d]">
                  {alasan.judul}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {alasan.deskripsi}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 rounded-[2rem] bg-[#fffaf0] p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-14">
          <PlaceholderVisual
            judul="Visual cerita brand sementara"
            warna="emas"
            ringkas
          />
          <div>
            <p className="text-xs font-black tracking-[0.16em] text-[#b8860b] uppercase">
              Cerita misi
            </p>
            <h2 className="mt-4 text-3xl leading-tight font-black tracking-[-0.04em] text-[#14223d] sm:text-4xl">
              Berawal dari pelajar, bertumbuh untuk pendidikan.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              Nama kami lahir dari semangat pelajar. Dampaknya belum kami besar-besarkan:
              perjalanan ini baru dimulai, dan setiap cerita akan disertai sumber yang jelas.
            </p>
            <Link
              href="/cerita/berawal-dari-pelajar"
              className="mt-6 inline-flex rounded-full bg-[#14223d] px-5 py-3 text-sm font-black text-white hover:bg-[#263958] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#14223d]"
            >
              Baca cerita kami →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <TajukBagian
              label="Baca dan bagikan"
              judul="Cerita & edukasi terbaru"
              deskripsi="Konten awal untuk membantu memilih aroma dan memahami misi kami."
            />
            <Link
              href="/cerita"
              className="shrink-0 text-sm font-black text-[#0f6b62] hover:underline"
            >
              Lihat semua cerita →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {artikelTerbaru.map((artikel) => (
              <KartuArtikel key={artikel.slug} artikel={artikel} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-8 overflow-hidden rounded-[2rem] bg-[#0f6b62] p-7 text-white sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-14">
          <div>
            <p className="text-xs font-black tracking-[0.16em] text-[#bfe3dc] uppercase">
              Program afiliasi
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl leading-tight font-black tracking-[-0.04em] sm:text-4xl">
              Pelajar bisa belajar menjual, mendapat komisi, dan ikut membantu pendidikan.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#d7efea]">
              Komisi dasar akan ditangani langsung oleh TikTok Shop atau Shopee.
              Portal afiliasi website dibangun pada M5.
            </p>
          </div>
          <Link
            href="/afiliasi"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#0f6b62] hover:bg-[#eef8f6] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
          >
            Pelajari program →
          </Link>
        </div>
      </section>

      {ulasan.length > 0 ? (
        <section className="bg-white px-5 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <TajukBagian judul="Kata pembeli" rataTengah />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {ulasan.map((item) => (
                <blockquote key={item.nama} className="rounded-3xl bg-[#f4f6f9] p-6">
                  <p className="text-base leading-7 text-slate-700">“{item.isi}”</p>
                  <footer className="mt-4 text-sm font-bold text-[#14223d]">
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
