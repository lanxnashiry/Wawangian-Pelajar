import { notFound } from "next/navigation";
import { FormulirArtikel } from "@/components/admin/formulir-artikel";
import { hapusArtikel } from "../tindakan";
import { wajibAdmin } from "@/lib/admin/otorisasi";
import { petakanArtikel } from "@/lib/data/publik";

type Properti = { params: Promise<{ id: string }>; searchParams: Promise<{ pesan?: string }> };
export default async function EditArtikel({ params, searchParams }: Properti) {
  const [{ id }, { pesan }] = await Promise.all([params, searchParams]);
  const { supabase } = await wajibAdmin();
  const { data } = await supabase.from("artikel").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const artikel = petakanArtikel(data as Parameters<typeof petakanArtikel>[0]);
  return <main className="p-5 sm:p-8 lg:p-10"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">Konten</p><h1 className="mt-3 text-3xl font-black text-[#14223d]">Edit artikel</h1></div><form action={hapusArtikel}><input type="hidden" name="id" value={id}/><button className="rounded-full border border-[#c0392b] px-4 py-2 text-sm font-black text-[#c0392b]">Hapus artikel</button></form></div><div className="mt-7"><FormulirArtikel artikel={artikel} pesan={pesan}/></div></main>;
}
