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
      <section className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-[#e3e8ef] bg-white shadow-xl shadow-[#14223d]/8">
        <div className="bg-[radial-gradient(circle_at_top_right,_#cfe9e4,_transparent_24rem)] p-7 sm:p-12">
          <p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">
            {label}
          </p>
          <h1 className="mt-4 text-4xl leading-tight font-black tracking-[-0.045em] text-[#14223d] sm:text-5xl">
            {judul}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            {deskripsi}
          </p>
          <div className="mt-7 rounded-2xl border border-[#ead9a6] bg-[#fffaf0] p-4 text-sm leading-6 text-[#70510a]">
            Fitur lengkap dijadwalkan pada {milestone}. Halaman ini menjaga tautan
            navigasi tetap berfungsi tanpa mendahului milestone.
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#14223d] px-5 py-3 text-sm font-black text-white hover:bg-[#263958]"
            >
              Kembali ke beranda
            </Link>
            <Link
              href="/katalog"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#cbd4e1] bg-white px-5 py-3 text-sm font-black text-[#14223d] hover:border-[#0f6b62] hover:text-[#0f6b62]"
            >
              Jelajahi katalog
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
