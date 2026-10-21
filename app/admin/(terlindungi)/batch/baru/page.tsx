import { FormulirBatch } from "@/components/admin/formulir-batch";
import { wajibAdmin } from "@/lib/admin/otorisasi";

export default async function BatchBaru({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const masukan = await searchParams;
  const { supabase } = await wajibAdmin();
  const { data: produk = [] } = await supabase
    .from("produk")
    .select("id,nama")
    .eq("aktif", true)
    .eq("kategori", "ori")
    .order("nama");

  return <main className="p-5 sm:p-8">
    <h1 className="mb-6 text-3xl font-black">Batch Produksi Baru</h1>
    <FormulirBatch produk={produk ?? []} pesan={masukan.pesan} masukan={masukan}/>
  </main>;
}
