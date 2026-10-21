import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ambilBatchPublik } from "@/lib/batch/data";
import { kodeBatchValid, normalisasiKodeBatch } from "@/lib/batch/validasi";

export const metadata: Metadata = {
  title: "Cek Batch",
  robots: { index: false, follow: true },
};
export const dynamic = "force-dynamic";

async function periksa(form: FormData) {
  "use server";
  const kode = normalisasiKodeBatch(String(form.get("kode") ?? ""));
  if (!kodeBatchValid(kode)) redirect("/cek-batch?galat=format");
  const hasil = await ambilBatchPublik(kode);
  if (hasil.jenis === "galat") redirect("/cek-batch?galat=layanan");
  if (hasil.jenis === "tidak-ada" || hasil.jenis === "tidak-valid") {
    redirect("/cek-batch?galat=tidak-ada");
  }
  redirect(`/batch/${kode}`);
}

export default async function CekBatch({
  searchParams,
}: {
  searchParams: Promise<{ galat?: string }>;
}) {
  const { galat } = await searchParams;
  const pesan = galat === "layanan"
    ? "Pengecekan sementara tidak tersedia. Silakan coba lagi."
    : galat === "format"
      ? "Format kode batch tidak valid."
      : galat
        ? "Kode batch belum ditemukan. Periksa penulisan atau hubungi WP."
        : null;

  return <main className="mx-auto max-w-xl px-5 py-20">
    <h1 className="text-3xl font-black text-[#102A43]">Cek Batch Wawangian Pelajar</h1>
    <form action={periksa} className="mt-8 rounded-2xl bg-white p-6">
      <label className="font-bold">Kode Batch
        <input
          name="kode"
          required
          minLength={3}
          maxLength={40}
          pattern="[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*"
          className="mt-2 w-full rounded-xl border p-3 uppercase"
          aria-describedby="bantuan"
        />
      </label>
      <p id="bantuan" className="mt-2 text-sm">Kode tercetak pada botol atau kemasan.</p>
      {pesan && <p role="alert" className="mt-4 text-[#9e3024]">{pesan}</p>}
      <button className="mt-5 rounded-full bg-[#087477] px-6 py-3 font-bold text-white">Periksa</button>
    </form>
  </main>;
}
