import Link from "next/link";
import { formatRupiah } from "@/data/produk";
import { ambilRingkasanDonasiPublik } from "@/lib/data/donasi";
import { wajibAdmin } from "@/lib/admin/otorisasi";

export default async function DasborDonasiAdmin() {
  const { supabase } = await wajibAdmin();
  const [ringkasan, draft] = await Promise.all([
    ambilRingkasanDonasiPublik(),
    supabase.from("penyaluran_donasi").select("*", { count: "exact", head: true }).eq("status", "draft"),
  ]);
  const kartu = [
    ["Terkumpul", ringkasan.terkumpul],
    ["Tersalurkan", ringkasan.tersalurkan],
    ["Saldo amanah", ringkasan.saldoAmanah],
  ];
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">M3 · Dana Cahaya Pendidikan</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-[#14223d] sm:text-4xl">Pengelolaan Donasi</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Angka terkumpul dihitung otomatis dari untung bersih × 20%. Hanya penyaluran berbukti dan bersaldo cukup yang dapat diterbitkan.</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {kartu.map(([label, nilai]) => <article key={String(label)} className="rounded-2xl bg-[#14223d] p-5 text-white"><p className="text-2xl font-black text-[#e8cb76]">{ringkasan.tersedia ? formatRupiah(Number(nilai)) : "Belum tersedia"}</p><p className="mt-2 text-xs text-slate-300">{label}</p></article>)}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Link href="/admin/donasi/rekap" className="rounded-2xl border border-[#e3e8ef] bg-white p-5 hover:border-[#0f6b62]"><h2 className="font-black text-[#14223d]">Rekap penjualan → donasi</h2><p className="mt-2 text-sm leading-6 text-slate-600">Catat laba bersih dan metode sumber. Sistem menetapkan bagian donasi 20%.</p></Link>
        <Link href="/admin/donasi/penyaluran" className="rounded-2xl border border-[#d5e8e4] bg-[#e7f4f1] p-5 hover:border-[#0f6b62]"><h2 className="font-black text-[#0f6b62]">Penyaluran berbukti</h2><p className="mt-2 text-sm leading-6 text-slate-600">{draft.count ?? 0} draft menunggu bukti atau publikasi.</p></Link>
        <Link href="/admin/log" className="rounded-2xl border border-[#ead18b] bg-[#fffaf0] p-5 hover:border-[#b8860b]"><h2 className="font-black text-[#8a6508]">Log Audit</h2><p className="mt-2 text-sm leading-6 text-slate-600">Periksa jejak perubahan angka dan aksi sensitif.</p></Link>
      </div>
    </main>
  );
}
