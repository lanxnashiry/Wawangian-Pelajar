import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ambilBatchPublik } from "@/lib/batch/data";
import { kodeBatchValid, normalisasiKodeBatch, statusBatchPublik } from "@/lib/batch/validasi";
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
  const status = statusBatchPublik(batch.status);
  return <main className="mx-auto max-w-2xl px-5 py-16"><p className="font-black tracking-widest text-[#087477]">INFORMASI BATCH</p><h1 className="mt-3 text-3xl font-black">Batch terdaftar di Wawangian Pelajar</h1><dl className="mt-8 grid grid-cols-[auto_1fr] gap-4 rounded-2xl bg-white p-6"><dt>Varian</dt><dd className="font-bold">{batch.nama_varian}</dd><dt>Kode Batch</dt><dd className="font-bold">{batch.kode_batch}</dd><dt>Tanggal Produksi</dt><dd>{batch.tanggal_produksi}</dd><dt>Status</dt><dd className={status.bahaya ? "font-black text-[#9e3024]" : "font-black text-[#087477]"}>{status.label}</dd>{batch.keterangan_publik && <><dt>Keterangan</dt><dd>{batch.keterangan_publik}</dd></>}</dl><p className="mt-6">Cocokkan nama varian dan kode batch dengan botol/kemasan. QR ini memverifikasi catatan batch, bukan menjamin keaslian isi setiap botol. Kode dapat disalin.</p><a href={`${kanalResmi.whatsapp}?text=${encodeURIComponent(`Halo WP, saya ingin menanyakan batch ${kode}.`)}`} className="mt-6 inline-block rounded-full bg-[#102A43] px-6 py-3 font-bold text-white">Hubungi WP</a></main>;
}
