import { FormulirProduk } from "@/components/admin/formulir-produk";

type Properti = { searchParams: Promise<{ pesan?: string }> };
export default async function ProdukBaru({ searchParams }: Properti) {
  const { pesan } = await searchParams;
  return <main className="p-5 sm:p-8 lg:p-10"><p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">Produk</p><h1 className="mt-3 text-3xl font-black text-[#14223d]">Tambah produk</h1><div className="mt-7"><FormulirProduk pesan={pesan} /></div></main>;
}
