import { wajibAfiliasiAktif } from "@/lib/afiliasi/otorisasi";

export default async function MateriAfiliasi() {
  const { supabase } = await wajibAfiliasiAktif();
  const { data } = await supabase.from("materi_promosi").select("id,tipe,judul,deskripsi,isi_teks,lokasi_berkas").eq("aktif", true).order("dibuat_pada", { ascending: false });
  const materi = await Promise.all((data ?? []).map(async (item) => {
    if (!item.lokasi_berkas) return { ...item, urlUnduh: null };
    const { data: tautan } = await supabase.storage.from("materi-afiliasi").createSignedUrl(item.lokasi_berkas, 600, { download: true });
    return { ...item, urlUnduh: tautan?.signedUrl ?? null };
  }));
  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
      <p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">Materi promosi</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-[#14223d] sm:text-4xl">Amunisi konten faceless</h1>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">Unduh berkas atau salin teks yang disiapkan Admin. Tautan unduh privat berlaku selama 10 menit.</p>
      {materi.length ? <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{materi.map((item) => <article key={item.id} className="flex flex-col rounded-3xl border border-[#e3e8ef] bg-white p-6"><span className="w-fit rounded-full bg-[#e7f4f1] px-3 py-1 text-xs font-black text-[#0f6b62] capitalize">{item.tipe}</span><h2 className="mt-4 text-xl font-black text-[#14223d]">{item.judul}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{item.deskripsi}</p>{item.isi_teks ? <textarea readOnly value={item.isi_teks} aria-label={`Teks ${item.judul}`} className="mt-4 min-h-32 w-full resize-y rounded-2xl border border-[#cbd4e1] bg-[#f8fafc] p-4 text-sm leading-6 text-slate-700" /> : null}<div className="mt-auto pt-5">{item.urlUnduh ? <a href={item.urlUnduh} className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#0f6b62] px-5 py-2 text-sm font-black text-white">Unduh materi</a> : item.isi_teks ? <p className="text-xs font-bold text-slate-400">Pilih teks di atas untuk menyalin.</p> : <p className="text-xs text-slate-400">Berkas belum tersedia.</p>}</div></article>)}</div> : <p className="mt-8 rounded-3xl border border-dashed border-[#cbd4e1] bg-white p-10 text-center text-sm leading-6 text-slate-600">Belum ada materi promosi aktif. Admin akan menambahkannya tanpa mengarang foto produk.</p>}
      <aside className="mt-8 rounded-3xl border border-[#e7b7af] bg-[#fff2f0] p-6 text-sm leading-6 text-[#7d2b22]"><strong>Wajib dipatuhi:</strong> jangan menyebut produk racikan sebagai tiruan merek asli, jangan mengaku didukung organisasi, jangan banting harga, jangan membuat klaim palsu, dan gunakan foto produk asli—bukan AI.</aside>
    </main>
  );
}
