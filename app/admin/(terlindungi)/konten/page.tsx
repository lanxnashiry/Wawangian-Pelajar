import Link from "next/link";
import { labelKategoriArtikel } from "@/data/artikel";
import { wajibAdmin } from "@/lib/admin/otorisasi";

type Properti = { searchParams: Promise<{ pesan?: string }> };
export default async function DaftarKontenAdmin({ searchParams }: Properti) {
  const { pesan } = await searchParams;
  const { supabase } = await wajibAdmin();
  const { data: artikel, error } = await supabase.from("artikel").select("id,judul,slug,kategori,status,penulis,diperbarui_pada").order("diperbarui_pada", { ascending: false });
  return <main className="p-5 sm:p-8 lg:p-10">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black tracking-[0.16em] text-[#087477] uppercase">Mesin konten</p><h1 className="mt-3 text-3xl font-black text-[#102A43]">Artikel</h1></div><Link href="/admin/konten/baru" className="rounded-full bg-[#087477] px-5 py-3 text-sm font-black text-white">+ Artikel baru</Link></div>
    {pesan ? <p role="status" className="mt-5 rounded-2xl bg-[#E5F2EF] px-4 py-3 text-sm text-[#087477]">{pesan}</p> : null}
    {error ? <p className="mt-6 rounded-2xl bg-[#fff2f0] p-5 text-sm text-[#9e3024]">Schema artikel belum siap: {error.message}</p> : artikel?.length ? <div className="mt-6 grid gap-3">{artikel.map((item) => <article key={item.id} className="flex flex-col gap-4 rounded-2xl border border-[#DED3C2] bg-white p-5 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex flex-wrap gap-2"><span className="rounded-full bg-[#E5F2EF] px-3 py-1 text-xs font-bold text-[#087477]">{labelKategoriArtikel[item.kategori as keyof typeof labelKategoriArtikel]}</span><span className={`rounded-full px-3 py-1 text-xs font-bold ${item.status === "terbit" ? "bg-[#F6EACD] text-[#6D5426]" : "bg-[#F4EBDD] text-[#4A4D52]"}`}>{item.status === "terbit" ? "Terbit" : "Draft"}</span></div><h2 className="mt-3 text-lg font-black text-[#102A43]">{item.judul}</h2><p className="mt-1 text-xs text-[#687078]">/{item.slug} · {item.penulis}</p></div><Link href={`/admin/konten/${item.id}`} className="shrink-0 font-black text-[#087477] hover:underline">Edit →</Link></article>)}</div> : <div className="mt-6 rounded-2xl border border-dashed border-[#CFC3B2] bg-white p-10 text-center"><h2 className="text-xl font-black text-[#102A43]">Belum ada artikel nyata</h2><p className="mt-2 text-sm text-[#282B2F]">Artikel contoh M1 tetap menjadi fallback sampai konten Supabase diterbitkan.</p></div>}
  </main>;
}
