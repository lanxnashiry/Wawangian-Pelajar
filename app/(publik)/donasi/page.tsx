import type { Metadata } from "next";
import { HalamanSegeraHadir } from "@/components/halaman-segera-hadir";

export const metadata: Metadata = { title: "Dana Cahaya Pendidikan" };

export default function HalamanDonasiSementara() {
  return (
    <HalamanSegeraHadir
      label="Dana Cahaya Pendidikan"
      judul="Perjalanan transparansi baru dimulai."
      deskripsi="Belum ada angka donasi atau penyaluran yang dapat dilaporkan. Kami tidak akan menampilkan angka tanpa sumber maupun bukti."
      milestone="M3 — Donasi"
    />
  );
}
