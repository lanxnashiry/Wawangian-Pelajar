import { wajibAfiliasiAktif } from "@/lib/afiliasi/otorisasi";

type BarisPeringkat = { urutan: number; alias_publik: string; jumlah_pcs: number; milik_saya: boolean };

export default async function LeaderboardAfiliasi() {
  const { supabase } = await wajibAfiliasiAktif();
  const { data, error } = await supabase.rpc("leaderboard_afiliasi_bulan_ini");
  const peringkat = (data ?? []) as BarisPeringkat[];
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
      <p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">Leaderboard bulan ini</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-[#14223d] sm:text-4xl">Peringkat afiliasi beralias</h1>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">Peringkat memakai jumlah pcs yang cocok dari laporan platform. Identitas asli, email, WhatsApp, dan handle tetap tersembunyi.</p>
      {error ? <p className="mt-8 rounded-2xl bg-[#fff2f0] p-4 text-sm text-[#8c2f24]">Leaderboard belum dapat dimuat.</p> : peringkat.length ? <div className="mt-8 overflow-hidden rounded-3xl border border-[#e3e8ef] bg-white"><div className="grid grid-cols-[64px_1fr_90px] bg-[#14223d] px-5 py-4 text-xs font-black text-white uppercase sm:grid-cols-[90px_1fr_140px]"><span>#</span><span>Alias</span><span className="text-right">Terjual</span></div>{peringkat.map((item) => <div key={`${item.urutan}-${item.alias_publik}`} className={`grid grid-cols-[64px_1fr_90px] items-center border-t border-[#e3e8ef] px-5 py-4 text-sm sm:grid-cols-[90px_1fr_140px] ${item.milik_saya ? "bg-[#fffaf0]" : ""}`}><span className="font-black text-[#b8860b]">{item.urutan <= 3 ? ["🥇", "🥈", "🥉"][item.urutan - 1] : `#${item.urutan}`}</span><span className="font-black text-[#14223d]">{item.alias_publik}{item.milik_saya ? " (kamu)" : ""}</span><span className="text-right font-black text-[#0f6b62]">{item.jumlah_pcs} pcs</span></div>)}</div> : <p className="mt-8 rounded-3xl border border-dashed border-[#cbd4e1] bg-white p-10 text-center text-sm leading-6 text-slate-600">Belum ada penjualan afiliasi yang tercocokkan pada bulan ini.</p>}
    </main>
  );
}
