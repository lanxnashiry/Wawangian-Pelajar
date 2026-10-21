import Link from "next/link";
import { notFound } from "next/navigation";
import { FormulirBatch } from "@/components/admin/formulir-batch";
import { wajibAdmin } from "@/lib/admin/otorisasi";

export default async function DetailBatch({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ pesan?: string }>;
}) {
  const [{ id }, { pesan }] = await Promise.all([params, searchParams]);
  const { supabase } = await wajibAdmin();
  const [{ data: batch }, { data: produk = [] }] = await Promise.all([
    supabase.from("batch_produksi").select("*").eq("id", id).single(),
    supabase.from("produk").select("id,nama").eq("aktif", true).eq("kategori", "ori").order("nama"),
  ]);
  if (!batch) notFound();

  const pilihan = produk?.some((item) => item.id === batch.produk_id)
    ? produk
    : [...(produk ?? []), { id: batch.produk_id, nama: `${batch.nama_varian} (snapshot Batch)` }];

  return <main className="p-5 sm:p-8">
    <h1 className="text-3xl font-black">{batch.kode_batch}</h1>
    {batch.status !== "draft" && <Link className="my-4 inline-block font-bold text-[#087477]" href={`/admin/batch/${id}/qr`}>QR dan cetak →</Link>}
    <FormulirBatch batch={batch} produk={pilihan} pesan={pesan}/>
  </main>;
}
