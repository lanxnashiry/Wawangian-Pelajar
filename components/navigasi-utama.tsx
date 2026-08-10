"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const tautanNavigasi = [
  { href: "/katalog", label: "Katalog" },
  { href: "/temukan", label: "Temukan Wangimu" },
  { href: "/donasi", label: "Dana Cahaya" },
  { href: "/cerita", label: "Cerita" },
  { href: "/afiliasi", label: "Jadi Afiliasi" },
];

function TautanNavigasi({
  href,
  label,
  aktif,
  saatKlik,
}: {
  href: string;
  label: string;
  aktif: boolean;
  saatKlik?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={saatKlik}
      className={`rounded-full px-3 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087477] ${
        aktif
          ? "bg-[#E5F2EF] text-[#087477]"
          : "text-[#282B2F] hover:bg-[#F4EBDD] hover:text-[#102A43]"
      }`}
    >
      {label}
    </Link>
  );
}

export function NavigasiUtama() {
  const pathname = usePathname();
  const [menuTerbuka, setMenuTerbuka] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#DED3C2] bg-[#FAF7F1]/95 backdrop-blur">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087477]"
          onClick={() => setMenuTerbuka(false)}
        >
          <Image
            src="/logo-wawangian-pelajar-simbol.webp"
            alt="Monogram WAWANGIAN PELAJAR"
            width={79}
            height={48}
            priority
            className="h-12 w-auto"
          />
          <span className="truncate text-base font-black tracking-tight text-[#102A43] sm:text-lg">
            Wawangian Pelajar
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
          {tautanNavigasi.map((tautan) => (
            <TautanNavigasi
              key={tautan.href}
              {...tautan}
              aktif={
                pathname === tautan.href || pathname.startsWith(`${tautan.href}/`)
              }
            />
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#DED3C2] text-[#102A43] hover:bg-[#FAF7F1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087477] lg:hidden"
          aria-label={menuTerbuka ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuTerbuka}
          aria-controls="menu-mobile"
          onClick={() => setMenuTerbuka((nilai) => !nilai)}
        >
          <span className="text-xl" aria-hidden="true">
            {menuTerbuka ? "×" : "☰"}
          </span>
        </button>
      </div>

      {menuTerbuka ? (
        <div
          id="menu-mobile"
          className="border-t border-[#DED3C2] bg-[#FAF7F1] px-5 py-4 shadow-xl lg:hidden"
        >
          <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Navigasi mobile">
            <TautanNavigasi
              href="/"
              label="Beranda"
              aktif={pathname === "/"}
              saatKlik={() => setMenuTerbuka(false)}
            />
            {tautanNavigasi.map((tautan) => (
              <TautanNavigasi
                key={tautan.href}
                {...tautan}
                aktif={
                  pathname === tautan.href || pathname.startsWith(`${tautan.href}/`)
                }
                saatKlik={() => setMenuTerbuka(false)}
              />
            ))}
          </nav>
          <div className="mx-auto mt-4 grid max-w-7xl grid-cols-2 gap-2">
            <Link href="/afiliasi/masuk" onClick={() => setMenuTerbuka(false)} className="rounded-full border border-[#087477] px-4 py-2 text-center text-xs font-black text-[#087477]">Masuk Afiliasi</Link>
            <Link href="/afiliasi/daftar" onClick={() => setMenuTerbuka(false)} className="rounded-full bg-[#087477] px-4 py-2 text-center text-xs font-black text-white">Daftar Afiliasi</Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
