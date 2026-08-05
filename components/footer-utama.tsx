import Image from "next/image";
import Link from "next/link";
import { kanalResmi } from "@/data/kanal-resmi";

const kelompokTautan = [
  {
    judul: "Jelajah",
    tautan: [
      { label: "Katalog", href: "/katalog" },
      { label: "Temukan Wangimu", href: "/temukan" },
      { label: "Transparansi Donasi", href: "/donasi" },
      { label: "Cerita & Edukasi", href: "/cerita" },
      { label: "Jadi Afiliasi", href: "/afiliasi" },
      { label: "Masuk Portal Afiliasi", href: "/afiliasi/masuk" },
    ],
  },
  {
    judul: "Belanja Resmi",
    tautan: [
      {
        label: "Toko Wawangian Pelajar di Shopee",
        href: kanalResmi.shopee,
        ariaLabel: "Buka toko resmi Wawangian Pelajar di Shopee",
      },
    ],
  },
  {
    judul: "Ikuti & Hubungi",
    tautan: [
      {
        label: "Facebook",
        href: kanalResmi.facebook,
        ariaLabel: "Buka Facebook Wawangian Pelajar",
      },
      {
        label: "Instagram @wawangianpelajar",
        href: kanalResmi.instagram,
        ariaLabel: "Buka Instagram Wawangian Pelajar",
      },
      {
        label: "admin@wawangianpelajar.com",
        href: kanalResmi.email,
        ariaLabel: "Kirim email ke Wawangian Pelajar",
        bukaTabBaru: false,
      },
      {
        label: "WhatsApp +62 851-7698-5756",
        href: kanalResmi.whatsapp,
        ariaLabel: "Hubungi Wawangian Pelajar melalui WhatsApp",
      },
    ],
  },
];

export function FooterUtama() {
  return (
    <footer className="border-t border-[#28455A] bg-[#102A43] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.25fr_0.9fr_1fr_1.2fr] lg:px-10">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-wawangian-pelajar-simbol.webp"
              alt="Logo Wawangian Pelajar"
              width={72}
              height={72}
              className="rounded-2xl"
            />
            <p className="text-lg font-black">Wawangian Pelajar</p>
          </div>
          <p className="mt-4 text-sm leading-6 text-[#D9E1E8]">
            Wangi yang berpihak pada pendidikan. Belanja dilakukan melalui
            marketplace resmi, bukan di website ini.
          </p>
          <p className="mt-4 text-xs leading-5 text-[#D1B779]">
            Identitas resmi Wawangian Pelajar · krem, navy, teal, dan aksen emas.
          </p>
        </div>

        {kelompokTautan.map((kelompok) => (
          <div key={kelompok.judul}>
            <h2 className="text-sm font-black tracking-wide text-white uppercase">
              {kelompok.judul}
            </h2>
            <ul className="mt-4 grid gap-3 text-sm text-[#D9E1E8]">
              {kelompok.tautan.map((tautan) => (
                <li key={tautan.label}>
                  {tautan.href.startsWith("/") ? (
                    <Link
                      href={tautan.href}
                      className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D1B779]"
                    >
                      {tautan.label}
                    </Link>
                  ) : (
                    <a
                      href={tautan.href}
                      aria-label={"ariaLabel" in tautan ? tautan.ariaLabel : tautan.label}
                      target={"bukaTabBaru" in tautan && tautan.bukaTabBaru === false ? undefined : "_blank"}
                      rel={"bukaTabBaru" in tautan && tautan.bukaTabBaru === false ? undefined : "noopener noreferrer"}
                      className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D1B779]"
                    >
                      {tautan.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-[#687078] sm:px-8">
        © 2026 Wawangian Pelajar · Website pusat brand, bukan tempat transaksi.
      </div>
    </footer>
  );
}
