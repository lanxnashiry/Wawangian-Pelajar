import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ambilBatchPublik } from "@/lib/batch/data";
import { buatKontakBatch, formatTanggalBatch, kodeBatchValid, normalisasiKodeBatch, presentasiStatusBatch } from "@/lib/batch/validasi";
import { kanalResmi } from "@/data/kanal-resmi";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata: Metadata = { title: "Informasi Batch", robots: { index: false, follow: true } };

export default async function Page({ params }: { params: Promise<{ kode_batch: string }> }) {
  const { kode_batch: mentah } = await params;
  let decoded: string;
  try { decoded = decodeURIComponent(mentah); } catch { notFound(); }
  const kode = normalisasiKodeBatch(decoded);
  if (!kodeBatchValid(kode)) notFound();
  if (kode !== mentah) redirect(`/batch/${kode}`);
  const hasil = await ambilBatchPublik(kode);
  if (hasil.jenis === "tidak-valid" || hasil.jenis === "tidak-ada") notFound();
  if (hasil.jenis === "galat") throw new Error("Layanan batch sementara tidak tersedia.");
  const batch = hasil.data;
  const status = presentasiStatusBatch(batch.status);
  const tanggal = formatTanggalBatch(batch.tanggal_produksi);
  if (!status || !tanggal) throw new Error("Data publik batch tidak valid.");
  const kontak = buatKontakBatch(kanalResmi, `Halo Wawangian Pelajar, saya ingin menanyakan ${batch.nama_varian}, batch ${batch.kode_batch}. Status di halaman: ${status.label}.`);
  const warna = status.tingkat === "sukses" ? "border-[#087477] bg-[#edf8f4] text-[#07595b]" : status.tingkat === "bahaya" ? "border-[#9e3024] bg-[#fff0ed] text-[#9e3024]" : "border-[#785215] bg-[#fff6e5] text-[#6a4811]";
  return <main className="mx-auto max-w-2xl px-5 py-16 text-[#102A43]">
    <p className="font-bold text-[#087477]">Wawangian Pelajar</p>
    <h1 className="mt-3 break-words text-3xl font-black">{batch.nama_varian}</h1>
    <section aria-label="Hasil pemeriksaan batch" className={`mt-5 rounded-2xl border-l-4 p-5 ${warna}`}>
      <h2 className="text-xl font-black"><span aria-hidden="true">{status.tingkat === "sukses" ? "✓ " : "! "}</span>{status.heading}</h2>
      <p className="mt-2">{status.instruksi}</p>
      {status.tingkat !== "sukses" && kontak && <a href={kontak.url} rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center font-bold underline focus-visible:outline-2 focus-visible:outline-offset-4">{kontak.label}</a>}
    </section>
    <dl className="mt-8 space-y-5 rounded-2xl bg-white p-6">
      <div><dt>Nomor batch</dt><dd className="mt-1 select-text break-all font-bold">{batch.kode_batch}</dd></div>
      <div><dt>Tanggal produksi</dt><dd className="mt-1"><time dateTime={batch.tanggal_produksi}>{tanggal}</time></dd></div>
      <div><dt>Status batch</dt><dd className="mt-1 font-bold">{status.label}</dd></div>
      {batch.keterangan_publik && <div><dt className="font-bold">{batch.status === "ditarik" ? "Petunjuk penanganan" : "Keterangan"}</dt><dd className="mt-1 whitespace-pre-wrap break-words">{batch.keterangan_publik}</dd></div>}
    </dl>
    <section className="mt-8"><h2 className="text-xl font-bold">Cocokkan nama parfum</h2><p className="mt-2 break-words">Pastikan nama {batch.nama_varian} di halaman ini sesuai dengan nama pada box dan label botol kamu.</p></section>
    <section className="mt-8"><h2 className="text-xl font-bold">Ada perbedaan atau kendala?</h2><p className="mt-2">Hubungi kami dengan menyertakan foto box, label botol, dan nomor batch.</p>
      {kontak ? <a href={kontak.url} rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center rounded-full bg-[#102A43] px-6 py-3 font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4">{kontak.label}</a> : <p role="alert" className="mt-4">Kanal bantuan resmi belum tersedia.</p>}
    </section>
    <p className="mt-8 rounded-2xl border border-[#102A43]/20 p-5">QR ini menunjukkan catatan satu batch produksi dan digunakan pada beberapa kemasan. Pemeriksaan ini tidak memverifikasi setiap botol secara individual.</p>
  </main>;
}
