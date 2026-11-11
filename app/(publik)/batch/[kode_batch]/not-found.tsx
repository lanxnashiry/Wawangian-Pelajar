import Link from "next/link";
import { kanalResmi } from "@/data/kanal-resmi";
import { buatKontakBatch } from "@/lib/batch/validasi";

export default function TidakAda() {
  const kontak = buatKontakBatch(kanalResmi, "Halo Wawangian Pelajar, saya ingin meminta bantuan pengecekan kode batch yang belum ditemukan.");
  return <main className="mx-auto max-w-xl px-5 py-20 text-[#102A43]">
    <h1 className="text-3xl font-black">Kode batch belum ditemukan</h1>
    <p className="mt-3">Kami belum dapat mencocokkan kode ini dengan catatan produksi. Hubungi Wawangian Pelajar untuk pemeriksaan lebih lanjut.</p>
    <p className="mt-3">Jika kamu mengetik kode secara manual, periksa kembali penulisannya.</p>
    {kontak && <a href={kontak.url} rel="noreferrer" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#102A43] px-6 py-3 font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4">{kontak.label}</a>}
    <Link href="/cek-batch" className="mt-4 flex min-h-11 items-center font-bold underline focus-visible:outline-2 focus-visible:outline-offset-4">Cek kode lain</Link>
  </main>;
}
