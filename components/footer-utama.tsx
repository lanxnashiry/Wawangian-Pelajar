import Image from "next/image";
import Link from "next/link";
import { kanalResmi } from "@/data/kanal-resmi";

type NamaIkonKanal =
  | "shopee"
  | "tiktok"
  | "instagram"
  | "facebook"
  | "email"
  | "whatsapp";

type TautanKanal = {
  label: string;
  href: string | null;
  ariaLabel: string;
  ikon: NamaIkonKanal;
  bukaTabBaru?: boolean;
};

const tautanJelajah = [
  { label: "Katalog", href: "/katalog" },
  { label: "Temukan Wangimu", href: "/temukan" },
  { label: "Transparansi Donasi", href: "/donasi" },
  { label: "Cerita & Edukasi", href: "/cerita" },
  { label: "Jadi Afiliasi", href: "/afiliasi" },
  { label: "Masuk Portal Afiliasi", href: "/afiliasi/masuk" },
];

const kanalBelanja: TautanKanal[] = [
  {
    label: "Shopee",
    href: kanalResmi.shopee,
    ariaLabel: "Buka toko resmi Wawangian Pelajar di Shopee",
    ikon: "shopee",
  },
  {
    label: "TikTok Shop",
    href: kanalResmi.tiktokShop,
    ariaLabel: "TikTok Shop sedang disiapkan",
    ikon: "tiktok",
  },
];

const kanalHubungi: TautanKanal[] = [
  {
    label: "Instagram",
    href: kanalResmi.instagram,
    ariaLabel: "Buka Instagram Wawangian Pelajar",
    ikon: "instagram",
  },
  {
    label: "Facebook",
    href: kanalResmi.facebook,
    ariaLabel: "Buka Facebook Wawangian Pelajar",
    ikon: "facebook",
  },
  {
    label: "Email",
    href: kanalResmi.email,
    ariaLabel: "Kirim email ke Wawangian Pelajar",
    ikon: "email",
    bukaTabBaru: false,
  },
  {
    label: "WhatsApp",
    href: kanalResmi.whatsapp,
    ariaLabel: "Hubungi Wawangian Pelajar melalui WhatsApp",
    ikon: "whatsapp",
  },
];

function IkonKanal({ nama }: { nama: NamaIkonKanal }) {
  const propertiUmum = {
    "aria-hidden": true,
    className: "h-[18px] w-[18px] shrink-0",
    fill: "none",
    focusable: false,
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };

  if (nama === "shopee") {
    return (
      <svg {...propertiUmum}>
        <path d="M5 8h14l-1 12H6L5 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3M14.6 12.1c-.7-.5-1.5-.7-2.3-.7-1.2 0-2 .5-2 1.3 0 2 4.3.8 4.3 3.3 0 1-.9 1.7-2.3 1.7-1 0-1.9-.3-2.7-1" />
      </svg>
    );
  }

  if (nama === "tiktok") {
    return (
      <svg {...propertiUmum}>
        <path d="M14 4v10.2a4 4 0 1 1-3-3.9" />
        <path d="M14 4c.8 2.4 2.4 3.8 5 4" />
      </svg>
    );
  }

  if (nama === "instagram") {
    return (
      <svg {...propertiUmum}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </svg>
    );
  }

  if (nama === "facebook") {
    return (
      <svg {...propertiUmum}>
        <path d="M14 21v-8h3l.5-3H14V8.5c0-1.2.6-2 2.2-2H18V3.8c-.7-.1-1.5-.2-2.5-.2-3 0-5 1.8-5 5.1V10H8v3h2.5v8" />
      </svg>
    );
  }

  if (nama === "email") {
    return (
      <svg {...propertiUmum}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  return (
    <svg {...propertiUmum}>
      <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />
      <path d="M9 8.5c.6 2.9 2.3 4.6 5.2 5.3l1.2-1.2c.2-.2.5-.3.8-.2l2 .7" />
    </svg>
  );
}

function DaftarKanal({ daftar }: { daftar: TautanKanal[] }) {
  return (
    <ul className="mt-4 grid gap-3 text-sm text-[#D9E1E8]">
      {daftar.map((tautan) => (
        <li key={tautan.label}>
          {tautan.href ? (
            <a
              href={tautan.href}
              aria-label={tautan.ariaLabel}
              target={tautan.bukaTabBaru === false ? undefined : "_blank"}
              rel={tautan.bukaTabBaru === false ? undefined : "noopener noreferrer"}
              className="inline-flex items-center gap-2 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D1B779]"
            >
              <IkonKanal nama={tautan.ikon} />
              {tautan.label}
            </a>
          ) : (
            <span
              aria-disabled="true"
              aria-label={tautan.ariaLabel}
              className="inline-flex cursor-not-allowed items-center gap-2 text-[#8799A8]"
            >
              <IkonKanal nama={tautan.ikon} />
              {tautan.label}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function FooterUtama() {
  return (
    <footer className="border-t border-[#28455A] bg-[#102A43] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.75fr_1fr] lg:px-10">
        <div className="max-w-sm">
          <Image
            src="/logo-wawangian-pelajar-resmi.png"
            alt="WAWANGIAN PELAJAR — FRAGRANCE HOME"
            width={320}
            height={213}
            className="h-auto w-full max-w-[320px] object-contain"
          />
          <p className="mt-4 text-sm leading-6 text-[#D9E1E8]">
            Wangi yang berpihak pada pendidikan. Belanja dilakukan melalui
            marketplace resmi, bukan di website ini.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-black tracking-wide text-white uppercase">
            Jelajah
          </h2>
          <ul className="mt-4 grid gap-3 text-sm text-[#D9E1E8]">
            {tautanJelajah.map((tautan) => (
              <li key={tautan.label}>
                <Link
                  href={tautan.href}
                  className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D1B779]"
                >
                  {tautan.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-black tracking-wide text-white uppercase">
            Belanja
          </h2>
          <DaftarKanal daftar={kanalBelanja} />
        </div>

        <div>
          <h2 className="text-sm font-black tracking-wide text-white uppercase">
            Ikuti & Hubungi
          </h2>
          <DaftarKanal daftar={kanalHubungi} />
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-[#8799A8] sm:px-8">
        © 2026 Wawangian Pelajar · Website pusat brand, bukan tempat transaksi.
      </div>
    </footer>
  );
}
