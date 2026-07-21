import { notFound } from "next/navigation";
import { FormulirPenyaluranDonasi, type PenyaluranAdmin } from "@/components/admin/formulir-penyaluran-donasi";
import { wajibAdmin } from "@/lib/admin/otorisasi";

type Properti = { params: Promise<{ id: string }>; searchParams: Promise<{ pesan?: string }> };

export default async function EditPenyaluranDonasi({ params, searchParams }: Properti) {
  const [{ id }, { pesan }] = await Promise.all([params, searchParams]);
  const { supabase } = await wajibAdmin();
  const [{ data: penyaluran }, { data: artikel }] = await Promise.all([
    supabase.from("penyaluran_donasi").select("id,tanggal,jumlah,penerima_nama,penerima_jenis,tujuan_deskripsi,bukti,artikel_id,status").eq("id", id).maybeSingle(),
    supabase.from("artikel").select("id,judul").eq("kategori", "cerita_misi").eq("status", "terbit").order("judul"),
  ]);
  if (!penyaluran) notFound();
  return <main className="p-5 sm:p-8 lg:p-10"><p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">Dana Cahaya Pendidikan</p><h1 className="mt-3 text-3xl font-black text-[#14223d]">Edit penyaluran</h1><div className="mt-7"><FormulirPenyaluranDonasi penyaluran={penyaluran as PenyaluranAdmin} artikel={artikel ?? []} pesan={pesan} /></div></main>;
}
