import type { Metadata } from "next";
import { AnalitikUmami } from "@/components/analitik-umami";
import "./globals.css";

const urlSitus =
  process.env.NEXT_PUBLIC_URL_SITUS ?? "https://www.wawangianpelajar.com";

export const metadata: Metadata = {
  metadataBase: new URL(urlSitus),
  title: {
    default: "Wawangian Pelajar — Decant Parfum Original untuk Mahasiswa",
    template: "%s · Wawangian Pelajar",
  },
  description:
    "Decant parfum original dan parfum inspirasi mulai 1 ml, buat mahasiswa yang mau coba banyak wangi tanpa beli botol penuh. 20% laba untuk pendidikan.",
  icons: {
    icon: "/ikon-wawangian-pelajar-2026.png",
    apple: "/ikon-wawangian-pelajar-2026.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Wawangian Pelajar",
    url: urlSitus,
    title: "Wawangian Pelajar — Decant Parfum Original untuk Mahasiswa",
    description:
      "Decant parfum original dan parfum inspirasi mulai 1 ml, buat mahasiswa yang mau coba banyak wangi tanpa beli botol penuh. 20% laba untuk pendidikan.",
    images: [
      {
        url: "/og-wawangian-pelajar.png",
        width: 1200,
        height: 630,
        alt: "WAWANGIAN PELAJAR — FRAGRANCE HOME",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wawangian Pelajar — Decant Parfum Original untuk Mahasiswa",
    description:
      "Decant parfum original dan parfum inspirasi mulai 1 ml, buat mahasiswa yang mau coba banyak wangi tanpa beli botol penuh. 20% laba untuk pendidikan.",
    images: ["/og-wawangian-pelajar.png"],
  },
};

export default function TataLetakUtama({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        {children}
        <AnalitikUmami />
      </body>
    </html>
  );
}
