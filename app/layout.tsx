import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wawangian Pelajar",
  description:
    "Website resmi Wawangian Pelajar — wangi yang berpihak pada pendidikan.",
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
