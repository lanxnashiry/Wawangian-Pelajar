import { FormulirRekapDonasi } from "@/components/admin/formulir-rekap-donasi";
import { formatRupiah } from "@/data/produk";
import { formatTanggalDonasi, labelSumberDonasi } from "@/lib/data/donasi";
import { wajibAdmin } from "@/lib/admin/otorisasi";

type Properti = { searchParams: Promise<{ pesan?: string }> };

export default async function RekapDonasiAdmin({ searchParams }: Properti) {
  const { pesan } = await searchParams;
  const { supabase } = await wajibAdmin();
  const { data: rekap, error } = await supabase.from("rekap_donasi")
    .select("id,periode_mulai,periode_selesai,sumber,untung_bersih,persentase,jumlah_donasi,catatan_metode")
    .order("periode_selesai", { ascending: false });
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">BR-1 · anti-fabrikasi</p>
      <h1 className="mt-3 text-3xl font-black text-[#14223d]">Rekap penjualan menjadi donasi</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Masukkan untung bersih dari rekap marketplace. Jumlah donasi tidak memiliki input bebas dan selalu dihitung 20% oleh database.</p>
      <div className="mt-7"><FormulirRekapDonasi pesan={pesan} /></div>
      <section className="mt-9">
        <h2 className="text-xl font-black text-[#14223d]">Riwayat rekap</h2>
        {error ? <p className="mt-4 rounded-xl bg-[#fff2f0] p-4 text-sm text-[#9e3024]">{error.message}</p> : rekap?.length ? <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e3e8ef] bg-white"><table className="w-full min-w-[860px] text-left text-sm"><thead className="bg-[#eef1f5] text-xs uppercase text-slate-500"><tr><th className="p-4">Periode</th><th className="p-4">Sumber</th><th className="p-4">Untung bersih</th><th className="p-4">Donasi 20%</th><th className="p-4">Metode</th></tr></thead><tbody>{rekap.map((item) => <tr key={item.id} className="border-t border-[#e3e8ef]"><td className="p-4">{formatTanggalDonasi(item.periode_mulai)} – {formatTanggalDonasi(item.periode_selesai)}</td><td className="p-4">{labelSumberDonasi[item.sumber as keyof typeof labelSumberDonasi]}</td><td className="p-4 font-bold">{formatRupiah(Number(item.untung_bersih))}</td><td className="p-4 font-black text-[#0f6b62]">{formatRupiah(Number(item.jumlah_donasi))}</td><td className="max-w-sm p-4 text-slate-600">{item.catatan_metode}</td></tr>)}</tbody></table></div> : <p className="mt-4 rounded-2xl border border-dashed border-[#cbd4e1] bg-white p-8 text-center text-sm text-slate-600">Belum ada rekap penjualan nyata.</p>}
      </section>
    </main>
  );
}
