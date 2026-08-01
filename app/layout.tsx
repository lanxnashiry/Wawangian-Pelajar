import type { Metadata } from "next";
import "./globals.css";

const urlSitus =
  process.env.NEXT_PUBLIC_URL_SITUS ?? "https://www.wawangianpelajar.com";

export const metadata: Metadata = {
  metadataBase: new URL(urlSitus),
  title: {
    default: "Wawangian Pelajar",
    template: "%s · Wawangian Pelajar",
  },
  description:
    "Website resmi Wawangian Pelajar — wangi yang berpihak pada pendidikan.",
  icons: {
    icon: "/ikon-wawangian-pelajar-2026.png",
    apple: "/ikon-wawangian-pelajar-2026.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Wawangian Pelajar",
    url: urlSitus,
    title: "Wawangian Pelajar",
    description:
      "Website resmi Wawangian Pelajar — wangi yang berpihak pada pendidikan.",
    images: [
      {
        url: "/og-wawangian-pelajar.png",
        width: 1200,
        height: 630,
        alt: "Wawangian Pelajar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wawangian Pelajar",
    description:
      "Website resmi Wawangian Pelajar — wangi yang berpihak pada pendidikan.",
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
      <body>{children}</body>
    </html>
  );
}
