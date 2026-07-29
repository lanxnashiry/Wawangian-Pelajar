import Link from "next/link";

export function HalamanSegeraHadir({
  label,
  judul,
  deskripsi,
  milestone,
}: {
  label: string;
  judul: string;
  deskripsi: string;
  milestone: string;
}) {
  return (
    <main className="px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
      <section className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-[#DED3C2] bg-white shadow-xl shadow-[#102A43]/8">
        <div className="bg-[radial-gradient(circle_at_top_right,_#D6ECE7,_transparent_24rem)] p-7 sm:p-12">
          <p className="text-xs font-black tracking-[0.16em] text-[#087477] uppercase">
            {label}
          </p>
          <h1 className="mt-4 text-4xl leading-tight font-black tracking-[-0.045em] text-[#102A43] sm:text-5xl">
            {judul}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#282B2F]">
            {deskripsi}
          </p>
          <div className="mt-7 rounded-2xl border border-[#E5D4B3] bg-[#FAF7F1] p-4 text-sm leading-6 text-[#6D5426]">
            Fitur lengkap dijadwalkan pada {milestone}. Halaman ini menjaga tautan
            navigasi tetap berfungsi tanpa mendahului milestone.
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#102A43] px-5 py-3 text-sm font-black text-white hover:bg-[#183D59]"
            >
              Kembali ke beranda
            </Link>
            <Link
              href="/katalog"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFC3B2] bg-white px-5 py-3 text-sm font-black text-[#102A43] hover:border-[#087477] hover:text-[#087477]"
            >
              Jelajahi katalog
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
