import { PemberitahuanDataContohAfiliasi } from "@/components/afiliasi/pemberitahuan-data-contoh";
import { wajibAfiliasiAktif } from "@/lib/afiliasi/otorisasi";
import { peringkatAfiliasiContoh, pratinjauAfiliasiAktif } from "@/lib/pratinjau/data-afiliasi-contoh";

type BarisPeringkat = { urutan: number; alias_publik: string; jumlah_pcs: number; milik_saya: boolean };

export default async function LeaderboardAfiliasi() {
  const { supabase, pengguna, afiliasi } = await wajibAfiliasiAktif();
  const memakaiDataContoh = pratinjauAfiliasiAktif(pengguna.email, afiliasi.alias_publik);
  const { data, error } = memakaiDataContoh
    ? { data: peringkatAfiliasiContoh, error: null }
    : await supabase.rpc("leaderboard_afiliasi_bulan_ini");
  const peringkat = (data ?? []) as BarisPeringkat[];
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
      <p className="text-xs font-black tracking-[0.16em] text-[#087477] uppercase">Leaderboard bulan ini</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-[#102A43] sm:text-4xl">Peringkat afiliasi beralias</h1>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-[#282B2F]">Peringkat memakai jumlah pcs yang cocok dari laporan platform. Identitas asli, email, WhatsApp, dan handle tetap tersembunyi.</p>
      {memakaiDataContoh ? <PemberitahuanDataContohAfiliasi /> : null}
      {error ? <p className="mt-8 rounded-2xl bg-[#fff2f0] p-4 text-sm text-[#8c2f24]">Leaderboard belum dapat dimuat.</p> : peringkat.length ? <div className="mt-8 overflow-hidden rounded-3xl border border-[#DED3C2] bg-white"><div className="grid grid-cols-[64px_1fr_90px] bg-[#102A43] px-5 py-4 text-xs font-black text-white uppercase sm:grid-cols-[90px_1fr_140px]"><span>#</span><span>Alias</span><span className="text-right">Terjual</span></div>{peringkat.map((item) => <div key={`${item.urutan}-${item.alias_publik}`} className={`grid grid-cols-[64px_1fr_90px] items-center border-t border-[#DED3C2] px-5 py-4 text-sm sm:grid-cols-[90px_1fr_140px] ${item.milik_saya ? "bg-[#FAF7F1]" : ""}`}><span className="font-black text-[#C7A25A]">{item.urutan <= 3 ? ["🥇", "🥈", "🥉"][item.urutan - 1] : `#${item.urutan}`}</span><span className="font-black text-[#102A43]">{item.alias_publik}{item.milik_saya ? " (kamu)" : ""}</span><span className="text-right font-black text-[#087477]">{item.jumlah_pcs} pcs</span></div>)}</div> : <p className="mt-8 rounded-3xl border border-dashed border-[#CFC3B2] bg-white p-10 text-center text-sm leading-6 text-[#282B2F]">Belum ada penjualan afiliasi yang tercocokkan pada bulan ini.</p>}
    </main>
  );
}
