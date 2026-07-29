import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Wawangian Pelajar",
    template: "%s · Wawangian Pelajar",
  },
  description:
    "Website resmi Wawangian Pelajar — wangi yang berpihak pada pendidikan.",
  icons: {
    icon: "/ikon-wawangian-pelajar.png",
    apple: "/ikon-wawangian-pelajar.png",
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
