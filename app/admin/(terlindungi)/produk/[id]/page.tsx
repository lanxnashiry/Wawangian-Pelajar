import { notFound } from "next/navigation";
import { FormulirProduk } from "@/components/admin/formulir-produk";
import { nonaktifkanProduk } from "../tindakan";
import { wajibAdmin } from "@/lib/admin/otorisasi";
import { petakanProduk } from "@/lib/data/publik";

type Properti = { params: Promise<{ id: string }>; searchParams: Promise<{ pesan?: string }> };
export default async function EditProduk({ params, searchParams }: Properti) {
  const [{ id }, { pesan }] = await Promise.all([params, searchParams]);
  const { supabase } = await wajibAdmin();
  const { data } = await supabase.from("produk").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const produk = petakanProduk(data as Parameters<typeof petakanProduk>[0]);
  return <main className="p-5 sm:p-8 lg:p-10"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">Produk</p><h1 className="mt-3 text-3xl font-black text-[#14223d]">Edit {produk.nama}</h1></div>{produk.aktif ? <form action={nonaktifkanProduk}><input type="hidden" name="id" value={id}/><button className="rounded-full border border-[#c0392b] px-4 py-2 text-sm font-black text-[#c0392b]">Nonaktifkan</button></form> : null}</div><div className="mt-7"><FormulirProduk produk={produk} pesan={pesan} /></div></main>;
}
