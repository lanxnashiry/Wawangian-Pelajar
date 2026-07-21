import { FormulirArtikel } from "@/components/admin/formulir-artikel";

type Properti = { searchParams: Promise<{ pesan?: string }> };
export default async function ArtikelBaru({ searchParams }: Properti) {
  const { pesan } = await searchParams;
  return <main className="p-5 sm:p-8 lg:p-10"><p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">Konten</p><h1 className="mt-3 text-3xl font-black text-[#14223d]">Tulis artikel</h1><div className="mt-7"><FormulirArtikel pesan={pesan}/></div></main>;
}
