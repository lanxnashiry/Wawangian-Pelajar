import Image from "next/image";

const fondasi = [
  {
    judul: "Next.js + TypeScript",
    keterangan: "Fondasi aplikasi yang cepat, terstruktur, dan siap dikembangkan.",
  },
  {
    judul: "Tailwind CSS",
    keterangan: "Sistem tampilan mobile-first untuk pengalaman yang ringan.",
  },
  {
    judul: "Supabase",
    keterangan: "Lapisan data, autentikasi, dan penyimpanan yang siap dihubungkan.",
  },
  {
    judul: "GitHub + Vercel",
    keterangan: "Alur perubahan yang tertinjau dan siap diterapkan otomatis.",
  },
];

export default function HalamanFondasi() {
  return (
    <main className="min-h-svh bg-[radial-gradient(circle_at_top_right,_#dceeea_0,_transparent_32rem)] px-5 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100svh-3rem)] w-full max-w-6xl flex-col rounded-3xl border border-[var(--warna-garis)] bg-white/95 shadow-[0_24px_80px_rgba(20,34,61,0.08)]">
        <header className="flex items-center gap-3 border-b border-[var(--warna-garis)] px-5 py-4 sm:px-8">
          <Image
            src="/ikon-logo-sementara.svg"
            alt="Ikon sementara Wawangian Pelajar"
            width={44}
            height={44}
            priority
          />
          <div>
            <p className="text-base font-bold tracking-tight sm:text-lg">
              Wawangian Pelajar
            </p>
            <p className="text-xs text-slate-500">Fondasi proyek</p>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-14 lg:py-16">
          <div>
            <span className="inline-flex rounded-full bg-[#e7f4f1] px-3 py-1 text-xs font-bold tracking-wide text-[var(--warna-tosca)] uppercase">
              Milestone M0
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl leading-tight font-black tracking-[-0.04em] text-balance sm:text-5xl lg:text-6xl">
              Fondasi digital untuk wangi yang berpihak pada pendidikan.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Infrastruktur awal Wawangian Pelajar telah disiapkan. Katalog,
              transparansi donasi, cerita, dan portal afiliasi akan dibangun
              bertahap sesuai peta jalan proyek.
            </p>
            <div className="mt-7 flex items-center gap-3 rounded-2xl border border-[#ead9a6] bg-[#fffaf0] p-4 text-sm leading-6 text-[#70510a]">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--warna-emas)]"
                aria-hidden="true"
              />
              Halaman ini adalah penanda fondasi, bukan halaman publik final.
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {fondasi.map((bagian, indeks) => (
              <article
                key={bagian.judul}
                className="flex gap-4 rounded-2xl border border-[var(--warna-garis)] bg-[var(--warna-latar)] p-4 sm:p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--warna-navy)] text-sm font-bold text-white">
                  {String(indeks + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-bold">{bagian.judul}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {bagian.keterangan}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="border-t border-[var(--warna-garis)] px-5 py-4 text-xs leading-5 text-slate-500 sm:px-8">
          Logo dan aset visual masih menggunakan ikon sementara sampai aset
          resmi tersedia.
        </footer>
      </div>
    </main>
  );
}
