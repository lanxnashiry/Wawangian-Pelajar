import Link from "next/link";
import { formatRupiahAfiliasi, formatTanggal } from "@/lib/afiliasi/format";
import { wajibAfiliasi } from "@/lib/afiliasi/otorisasi";

type Bonus = {
  id: string;
  jumlah_pcs: number;
  tingkat_nama: string | null;
  bonus_dihitung: number;
  status_payout: string;
  laporan_afiliasi: { platform: string; periode_mulai: string; periode_selesai: string } | null;
};

export default async function DasborAfiliasi({ searchParams }: { searchParams: Promise<{ pesan?: string }> }) {
  const { pesan } = await searchParams;
  const { supabase, afiliasi } = await wajibAfiliasi();
  const awalBulan = new Date();
  awalBulan.setDate(1);
  awalBulan.setHours(0, 0, 0, 0);
  const akhirBulan = new Date(awalBulan);
  akhirBulan.setMonth(akhirBulan.getMonth() + 1);

  const [{ data: dataBonus }, { data: tingkat }] = await Promise.all([
    supabase.from("bonus_afiliasi").select("id,jumlah_pcs,tingkat_nama,bonus_dihitung,status_payout,laporan_afiliasi(platform,periode_mulai,periode_selesai)").eq("afiliasi_id", afiliasi.id).order("dibuat_pada", { ascending: false }),
    supabase.from("tingkat_bonus_afiliasi").select("nama,minimal_pcs,bonus_per_pcs").eq("aktif", true).order("minimal_pcs"),
  ]);
  const bonus = (dataBonus ?? []).map((item) => ({
    ...item,
    laporan_afiliasi: Array.isArray(item.laporan_afiliasi) ? item.laporan_afiliasi[0] ?? null : item.laporan_afiliasi,
  })) as Bonus[];
  const bonusBulanIni = bonus.filter((item) => {
    if (!item.laporan_afiliasi) return false;
    return new Date(`${item.laporan_afiliasi.periode_selesai}T23:59:59`) >= awalBulan
      && new Date(`${item.laporan_afiliasi.periode_mulai}T00:00:00`) < akhirBulan;
  });
  const jumlahPcs = bonusBulanIni.reduce((total, item) => total + item.jumlah_pcs, 0);
  const jumlahBonus = bonusBulanIni.reduce((total, item) => total + Number(item.bonus_dihitung), 0);
  const bonusDibayar = bonusBulanIni.filter((item) => item.status_payout === "dibayar").reduce((total, item) => total + Number(item.bonus_dihitung), 0);
  const tingkatSaatIni = [...(tingkat ?? [])].reverse().find((item) => item.minimal_pcs <= jumlahPcs);
  const tingkatBerikutnya = (tingkat ?? []).find((item) => item.minimal_pcs > jumlahPcs);
  const progres = tingkatBerikutnya ? Math.min(100, Math.round((jumlahPcs / tingkatBerikutnya.minimal_pcs) * 100)) : jumlahPcs > 0 ? 100 : 0;

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
      <p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">Dashboard Afiliasi</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-[#14223d] sm:text-4xl">Halo, {afiliasi.nama}</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">Alias publik: <strong>{afiliasi.alias_publik}</strong> · Status: <strong className="capitalize">{afiliasi.status}</strong></p>
      {pesan ? <p role="status" className="mt-5 rounded-2xl border border-[#ead9a6] bg-[#fffaf0] px-4 py-3 text-sm text-[#70510a]">{pesan}</p> : null}

      {afiliasi.status !== "aktif" ? (
        <section className="mt-8 rounded-3xl border border-[#ead9a6] bg-white p-6 sm:p-8">
          <h2 className="text-xl font-black text-[#14223d]">{afiliasi.status === "menunggu" ? "Pendaftaran sedang diverifikasi" : "Akun sedang nonaktif"}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{afiliasi.status === "menunggu" ? "Admin akan mencocokkan handle marketplace sebelum membuka panduan, materi, dan leaderboard." : afiliasi.alasan_status || "Hubungi Admin untuk memperoleh penjelasan status akun."}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-500">{afiliasi.handle_tiktok ? <span className="rounded-full bg-[#f4f6f9] px-3 py-2">TikTok @{afiliasi.handle_tiktok}</span> : null}{afiliasi.handle_shopee ? <span className="rounded-full bg-[#f4f6f9] px-3 py-2">Shopee @{afiliasi.handle_shopee}</span> : null}</div>
        </section>
      ) : (
        <>
          <section className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="rounded-3xl border-2 border-[#cbd4e1] bg-white p-6">
              <p className="text-xs font-black tracking-wide text-slate-500 uppercase">Komisi dasar · dari platform</p>
              <p className="mt-4 text-2xl font-black text-[#14223d]">Periksa dompet marketplace</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">Nominal, validasi pesanan, dan pencairan resmi sepenuhnya dikelola TikTok Shop atau Shopee. Website ini tidak menghitung maupun membayarnya.</p>
            </article>
            <article className="rounded-3xl border-2 border-[#0f6b62] bg-white p-6">
              <p className="text-xs font-black tracking-wide text-[#0f6b62] uppercase">Bonus top-up · dari kami</p>
              <p className="mt-4 text-3xl font-black text-[#0f6b62]">{formatRupiahAfiliasi(jumlahBonus)}</p>
              <p className="mt-2 text-sm text-slate-500">{jumlahPcs} pcs tercocokkan bulan ini · {formatRupiahAfiliasi(bonusDibayar)} sudah dibayar</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">Dihitung dari jumlah pcs pada laporan platform yang cocok dengan handle terverifikasi.</p>
            </article>
          </section>

          <section className="mt-5 rounded-3xl bg-[#14223d] p-6 text-white">
            <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-black tracking-wide text-[#e8cb76] uppercase">Progres tingkat</p><h2 className="mt-2 text-xl font-black">{tingkatSaatIni?.nama ?? (tingkat?.length ? "Menuju tingkat pertama" : "Tingkat belum ditetapkan Admin")}</h2></div><p className="text-sm font-bold text-slate-300">{tingkatBerikutnya ? `${jumlahPcs}/${tingkatBerikutnya.minimal_pcs} pcs menuju ${tingkatBerikutnya.nama}` : tingkatSaatIni ? "Tingkat tertinggi tercapai" : "Belum ada target"}</p></div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-[#e8cb76]" style={{ width: `${progres}%` }} /></div>
          </section>

          <section className="mt-8">
            <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-black tracking-wide text-[#0f6b62] uppercase">Riwayat</p><h2 className="mt-2 text-2xl font-black text-[#14223d]">Rekonsiliasi bonus</h2></div><Link href="/afiliasi/leaderboard" className="text-sm font-black text-[#0f6b62]">Lihat leaderboard →</Link></div>
            {bonus.length ? <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e3e8ef] bg-white"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-[#eef1f5] text-xs uppercase text-slate-500"><tr><th className="p-4">Periode</th><th className="p-4">Platform</th><th className="p-4">Pcs</th><th className="p-4">Tingkat</th><th className="p-4">Bonus</th><th className="p-4">Status</th></tr></thead><tbody>{bonus.map((item) => <tr key={item.id} className="border-t border-[#e3e8ef]"><td className="p-4">{item.laporan_afiliasi ? `${formatTanggal(item.laporan_afiliasi.periode_mulai)}–${formatTanggal(item.laporan_afiliasi.periode_selesai)}` : "—"}</td><td className="p-4 capitalize">{item.laporan_afiliasi?.platform ?? "—"}</td><td className="p-4 font-black">{item.jumlah_pcs}</td><td className="p-4">{item.tingkat_nama ?? "Belum ada tarif"}</td><td className="p-4 font-black text-[#0f6b62]">{formatRupiahAfiliasi(Number(item.bonus_dihitung))}</td><td className="p-4 capitalize">{item.status_payout}</td></tr>)}</tbody></table></div> : <p className="mt-5 rounded-2xl border border-dashed border-[#cbd4e1] bg-white p-8 text-center text-sm leading-6 text-slate-600">Belum ada laporan platform yang cocok dengan handle kamu.</p>}
          </section>
        </>
      )}
    </main>
  );
}
