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
      <p className="text-xs font-black tracking-[0.16em] text-[#087477] uppercase">BR-2 dan BR-3</p>
      <h1 className="mt-3 text-3xl font-black text-[#102A43]">Penyaluran berbukti</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-[#282B2F]">Simpan sebagai draft bila bukti belum tersedia. Publikasi hanya berhasil saat bukti ada dan saldo amanah mencukupi.</p>
      <div className="mt-7"><FormulirPenyaluranDonasi artikel={artikel ?? []} pesan={pesan} /></div>
      <section className="mt-9">
        <h2 className="text-xl font-black text-[#102A43]">Riwayat penyaluran</h2>
        {error ? <p className="mt-4 rounded-xl bg-[#fff2f0] p-4 text-sm text-[#9e3024]">{error.message}</p> : penyaluran?.length ? <div className="mt-4 overflow-x-auto rounded-2xl border border-[#DED3C2] bg-white"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-[#F4EBDD] text-xs uppercase text-[#4A4D52]"><tr><th className="p-4">Penerima</th><th className="p-4">Tanggal</th><th className="p-4">Jumlah</th><th className="p-4">Bukti</th><th className="p-4">Status</th><th className="p-4">Aksi</th></tr></thead><tbody>{penyaluran.map((item) => <tr key={item.id} className="border-t border-[#DED3C2]"><td className="p-4 font-bold text-[#102A43]">{item.penerima_nama}</td><td className="p-4">{formatTanggalDonasi(item.tanggal)}</td><td className="p-4 font-black">{formatRupiah(Number(item.jumlah))}</td><td className="p-4">{item.bukti.length}</td><td className="p-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ${item.status === "terpublikasi" ? "bg-[#E5F2EF] text-[#087477]" : "bg-[#F4EBDD] text-[#4A4D52]"}`}>{item.status === "terpublikasi" ? "Terpublikasi" : "Draft"}</span></td><td className="p-4"><Link href={`/admin/donasi/penyaluran/${item.id}`} className="font-black text-[#087477] hover:underline">Edit →</Link></td></tr>)}</tbody></table></div> : <p className="mt-4 rounded-2xl border border-dashed border-[#CFC3B2] bg-white p-8 text-center text-sm text-[#282B2F]">Belum ada penyaluran nyata.</p>}
      </section>
    </main>
  );
}
