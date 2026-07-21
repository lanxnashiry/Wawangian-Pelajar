import type { Metadata } from "next";
import { HalamanSegeraHadir } from "@/components/halaman-segera-hadir";

export const metadata: Metadata = { title: "Jadi Afiliasi" };

export default function HalamanAfiliasiSementara() {
  return (
    <HalamanSegeraHadir
      label="Program Afiliasi Pelajar"
      judul="Ruang bertumbuh bersama sedang disiapkan."
      deskripsi="Afiliasi nantinya menggunakan sistem resmi TikTok Shop dan Shopee. Website tidak membangun pelacakan komisi dasar sendiri."
      milestone="M5 — Portal Afiliasi"
    />
  );
}
