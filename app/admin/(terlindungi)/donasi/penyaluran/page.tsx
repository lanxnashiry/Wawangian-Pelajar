import Link from "next/link";
import { FormulirPenyaluranDonasi } from "@/components/admin/formulir-penyaluran-donasi";
import { formatRupiah } from "@/data/produk";
import { formatTanggalDonasi } from "@/lib/data/donasi";
import { wajibAdmin } from "@/lib/admin/otorisasi";

type Properti = { searchParams: Promise<{ pesan?: string }> };

export default async function PenyaluranDonasiAdmin({ searchParams }: Properti) {
  const { pesan } = await searchParams;
  const { supabase } = await wajibAdmin();
  const [{ data: penyaluran, error }, { data: artikel }] = await Promise.all([
    supabase.from("penyaluran_donasi").select("id,tanggal,jumlah,penerima_nama,penerima_jenis,status,bukti").order("tanggal", { ascending: false }),
    supabase.from("artikel").select("id,judul").eq("kategori", "cerita_misi").eq("status", "terbit").order("judul"),
  ]);
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">BR-2 dan BR-3</p>
      <h1 className="mt-3 text-3xl font-black text-[#14223d]">Penyaluran berbukti</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Simpan sebagai draft bila bukti belum tersedia. Publikasi hanya berhasil saat bukti ada dan saldo amanah mencukupi.</p>
      <div className="mt-7"><FormulirPenyaluranDonasi artikel={artikel ?? []} pesan={pesan} /></div>
      <section className="mt-9">
        <h2 className="text-xl font-black text-[#14223d]">Riwayat penyaluran</h2>
        {error ? <p className="mt-4 rounded-xl bg-[#fff2f0] p-4 text-sm text-[#9e3024]">{error.message}</p> : penyaluran?.length ? <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e3e8ef] bg-white"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-[#eef1f5] text-xs uppercase text-slate-500"><tr><th className="p-4">Penerima</th><th className="p-4">Tanggal</th><th className="p-4">Jumlah</th><th className="p-4">Bukti</th><th className="p-4">Status</th><th className="p-4">Aksi</th></tr></thead><tbody>{penyaluran.map((item) => <tr key={item.id} className="border-t border-[#e3e8ef]"><td className="p-4 font-bold text-[#14223d]">{item.penerima_nama}</td><td className="p-4">{formatTanggalDonasi(item.tanggal)}</td><td className="p-4 font-black">{formatRupiah(Number(item.jumlah))}</td><td className="p-4">{item.bukti.length}</td><td className="p-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ${item.status === "terpublikasi" ? "bg-[#e7f4f1] text-[#0f6b62]" : "bg-slate-100 text-slate-500"}`}>{item.status === "terpublikasi" ? "Terpublikasi" : "Draft"}</span></td><td className="p-4"><Link href={`/admin/donasi/penyaluran/${item.id}`} className="font-black text-[#0f6b62] hover:underline">Edit →</Link></td></tr>)}</tbody></table></div> : <p className="mt-4 rounded-2xl border border-dashed border-[#cbd4e1] bg-white p-8 text-center text-sm text-slate-600">Belum ada penyaluran nyata.</p>}
      </section>
    </main>
  );
}
