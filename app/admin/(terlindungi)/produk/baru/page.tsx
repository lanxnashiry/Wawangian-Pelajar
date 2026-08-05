import { FormulirProduk } from "@/components/admin/formulir-produk";
import { wajibAdmin } from "@/lib/admin/otorisasi";

type Properti = { searchParams: Promise<{ pesan?: string }> };
export default async function ProdukBaru({ searchParams }: Properti) {
  const { pesan } = await searchParams;
  const { supabase } = await wajibAdmin();
  const { data: daftarProfil } = await supabase
    .from("profil_rekomendasi")
    .select("id,kode,nama")
    .eq("aktif", true)
    .order("nama");
  return <main className="p-5 sm:p-8 lg:p-10"><p className="text-xs font-black tracking-[0.16em] text-[#087477] uppercase">Produk</p><h1 className="mt-3 text-3xl font-black text-[#102A43]">Tambah produk</h1><div className="mt-7"><FormulirProduk pesan={pesan} daftarProfil={daftarProfil ?? []} /></div></main>;
}
