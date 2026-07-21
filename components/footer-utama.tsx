import Image from "next/image";
import Link from "next/link";

const kelompokTautan = [
  {
    judul: "Jelajah",
    tautan: [
      { label: "Katalog", href: "/katalog" },
      { label: "Transparansi Donasi", href: "/donasi" },
      { label: "Cerita & Edukasi", href: "/cerita" },
      { label: "Jadi Afiliasi", href: "/afiliasi" },
    ],
  },
  {
    judul: "Belanja Resmi",
    tautan: [
      { label: "Shopee — segera ditautkan", href: "/katalog" },
      { label: "TikTok Shop — segera ditautkan", href: "/katalog" },
    ],
  },
];

export function FooterUtama() {
  return (
    <footer className="border-t border-[#273750] bg-[#14223d] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <Image
              src="/ikon-logo-sementara.svg"
              alt="Ikon sementara Wawangian Pelajar"
              width={42}
              height={42}
            />
            <p className="text-lg font-black">Wawangian Pelajar</p>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Wangi yang berpihak pada pendidikan. Belanja dilakukan melalui
            marketplace resmi, bukan di website ini.
          </p>
          <p className="mt-4 text-xs leading-5 text-[#e8cb76]">
            Logo dan foto produk resmi masih menunggu aset asli.
          </p>
        </div>

        {kelompokTautan.map((kelompok) => (
          <div key={kelompok.judul}>
            <h2 className="text-sm font-black tracking-wide text-white uppercase">
              {kelompok.judul}
            </h2>
            <ul className="mt-4 grid gap-3 text-sm text-slate-300">
              {kelompok.tautan.map((tautan) => (
                <li key={tautan.label}>
                  <Link
                    href={tautan.href}
                    className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8cb76]"
                  >
                    {tautan.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-slate-400 sm:px-8">
        © 2026 Wawangian Pelajar · Website pusat brand, bukan tempat transaksi.
      </div>
    </footer>
  );
}
