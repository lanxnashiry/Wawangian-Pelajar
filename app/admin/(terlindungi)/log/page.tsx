import { wajibAdmin } from "@/lib/admin/otorisasi";

function formatWaktu(nilai: string) {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Jakarta" }).format(new Date(nilai));
}

export default async function LogAuditAdmin() {
  const { supabase } = await wajibAdmin();
  const { data: log, error } = await supabase.from("log_audit").select("id,aktor_id,aksi,entitas,entitas_id,waktu").order("waktu", { ascending: false }).limit(100);
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">BR-9 · jejak tidak dapat dihapus</p>
      <h1 className="mt-3 text-3xl font-black text-[#14223d]">Log Audit</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Mencatat perubahan angka donasi, penyaluran, harga Produk, penonaktifan Produk, dan penghapusan Artikel. Aplikasi tidak menyediakan aksi ubah atau hapus log.</p>
      {error ? <p className="mt-6 rounded-xl bg-[#fff2f0] p-4 text-sm text-[#9e3024]">{error.message}</p> : log?.length ? <div className="mt-6 overflow-x-auto rounded-2xl border border-[#e3e8ef] bg-white"><table className="w-full min-w-[820px] text-left text-sm"><thead className="bg-[#eef1f5] text-xs uppercase text-slate-500"><tr><th className="p-4">Waktu</th><th className="p-4">Aksi</th><th className="p-4">Entitas</th><th className="p-4">ID entitas</th><th className="p-4">Aktor</th></tr></thead><tbody>{log.map((item) => <tr key={item.id} className="border-t border-[#e3e8ef]"><td className="p-4">{formatWaktu(item.waktu)}</td><td className="p-4 font-black text-[#14223d]">{item.aksi.replaceAll("_", " ")}</td><td className="p-4">{item.entitas}</td><td className="p-4 font-mono text-xs text-slate-500">{item.entitas_id ?? "—"}</td><td className="p-4 font-mono text-xs text-slate-500">{item.aktor_id ?? "Sistem"}</td></tr>)}</tbody></table></div> : <p className="mt-6 rounded-2xl border border-dashed border-[#cbd4e1] bg-white p-8 text-center text-sm text-slate-600">Belum ada aksi sensitif yang tercatat.</p>}
    </main>
  );
}
