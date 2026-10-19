import QRCode from "qrcode";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import { wajibAdmin } from "@/lib/admin/otorisasi";
import { buatUrlBatch } from "@/lib/batch/validasi";
import { TombolCetak } from "@/components/admin/tombol-cetak";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  noStore();
  const { id } = await params;
  const { supabase } = await wajibAdmin();
  const { data: batch } = await supabase.from("batch_produksi").select("kode_batch,nama_varian,status").eq("id", id).single();
  if (!batch || batch.status === "draft") notFound();
  const url = buatUrlBatch(process.env.NEXT_PUBLIC_URL_SITUS ?? "https://www.wawangianpelajar.com", batch.kode_batch);
  const opsi = { margin: 4, errorCorrectionLevel: "M" as const };
  const svg = await QRCode.toString(url, { ...opsi, type: "svg" });
  const svgData = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  const pngData = await QRCode.toDataURL(url, { ...opsi, width: 1024 });
  return <main className="p-8 text-center">
    <div className="mx-auto max-w-sm bg-white p-8 print:shadow-none">
      <Image unoptimized src={svgData} width={320} height={320} alt={`QR batch ${batch.kode_batch}`} className="h-auto w-full"/>
      <h1 className="mt-4 text-2xl font-black uppercase">{batch.nama_varian}</h1>
      <p className="font-bold">Batch: {batch.kode_batch}</p>
    </div>
    <div className="mt-6 flex justify-center gap-3 print:hidden">
      <a download={`QR-${batch.kode_batch}.svg`} href={svgData} className="rounded-full border px-5 py-3">Unduh SVG</a>
      <a download={`QR-${batch.kode_batch}.png`} href={pngData} className="rounded-full border px-5 py-3">Unduh PNG</a>
      <TombolCetak/>
    </div>
  </main>;
}
