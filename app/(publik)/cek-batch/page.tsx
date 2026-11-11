import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ambilBatchPublik } from "@/lib/batch/data";
import { buatKontakBatch, kodeBatchValid, normalisasiKodeBatch } from "@/lib/batch/validasi";
import { kanalResmi } from "@/data/kanal-resmi";

export const metadata: Metadata = { title: "Cek Batch", robots: { index: false, follow: true } };
export const dynamic = "force-dynamic";

async function periksa(form: FormData) {
  "use server";
  const masukan = String(form.get("kode") ?? "");
  const kode = normalisasiKodeBatch(masukan);
  const kembali = (galat: string) => `/cek-batch?${new URLSearchParams({ galat, kode: masukan.slice(0, 40) })}`;
  if (!kodeBatchValid(kode)) redirect(kembali("format"));
  const hasil = await ambilBatchPublik(kode);
  if (hasil.jenis === "galat") redirect(kembali("layanan"));
  if (hasil.jenis === "tidak-ada" || hasil.jenis === "tidak-valid") redirect(kembali("tidak-ada"));
  redirect(`/batch/${kode}`);
}

export default async function CekBatch({ searchParams }: { searchParams: Promise<{ galat?: string; kode?: string }> }) {
  const parameter = await searchParams;
  const galat = typeof parameter.galat === "string" ? parameter.galat : "";
  const kode = typeof parameter.kode === "string" ? parameter.kode.slice(0, 40) : "";
  const pesan = galat === "layanan"
    ? "Pemeriksaan sementara belum tersedia. Silakan coba lagi nanti atau hubungi Wawangian Pelajar."
    : galat === "format"
      ? "Format kode batch tidak valid. Periksa kembali penulisannya."
      : galat === "tidak-ada"
        ? "Kode batch belum ditemukan. Kami belum dapat mencocokkan kode ini dengan catatan produksi. Hubungi Wawangian Pelajar untuk pemeriksaan lebih lanjut."
        : null;
  const kontak = buatKontakBatch(kanalResmi, `Halo Wawangian Pelajar, saya ingin meminta bantuan pengecekan kode batch${kodeBatchValid(kode) ? ` ${normalisasiKodeBatch(kode)}` : ""}.`);
  return <main className="mx-auto max-w-xl px-5 py-20 text-[#102A43]">
    <h1 className="text-3xl font-black">Cek Batch Wawangian Pelajar</h1>
    <form action={periksa} className="mt-8 rounded-2xl bg-white p-6">
      <label htmlFor="kode-batch" className="font-bold">Kode batch</label>
      <input id="kode-batch" name="kode" required maxLength={40} defaultValue={kode} autoCapitalize="characters" autoComplete="off" spellCheck={false}
        className="mt-2 w-full rounded-xl border p-3 focus-visible:outline-2 focus-visible:outline-offset-2"
        aria-invalid={!!pesan} aria-describedby={pesan ? "bantuan galat" : "bantuan"} />
      <p id="bantuan" className="mt-2">Masukkan kode batch jika kamu memilikinya. Jika tidak, pindai QR pada box atau hubungi Wawangian Pelajar.</p>
      {pesan && <p id="galat" role="alert" className="mt-4 text-[#9e3024]">{pesan}</p>}
      <button className="mt-5 min-h-11 rounded-full bg-[#087477] px-6 py-3 font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4">Periksa</button>
    </form>
    {kontak && <a href={kontak.url} rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center font-bold underline focus-visible:outline-2 focus-visible:outline-offset-4">{kontak.label}</a>}
  </main>;
}
