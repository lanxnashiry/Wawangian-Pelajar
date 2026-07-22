import { formatRupiahAfiliasi, formatTanggal } from "@/lib/afiliasi/format";
import { wajibAdmin } from "@/lib/admin/otorisasi";
import { perbaruiHandleAfiliasi, simpanMateriPromosi, simpanTingkatBonus, tandaiBonusDibayar, ubahKeaktifanMateri, ubahKeaktifanTingkat, ubahStatusAfiliasi, unggahLaporanAfiliasi } from "./tindakan";

type Profil = { id: string; nama: string; alias_publik: string; handle_tiktok: string | null; handle_shopee: string | null; status: string; alasan_status: string | null; bergabung_pada: string };
type Tingkat = { id: string; nama: string; minimal_pcs: number; bonus_per_pcs: number; aktif: boolean };
type Laporan = { id: string; platform: string; periode_mulai: string; periode_selesai: string; nama_berkas: string; jumlah_baris: number; dibuat_pada: string };
type Bonus = { id: string; handle_laporan: string; jumlah_pcs: number; tingkat_nama: string | null; bonus_dihitung: number; status_cocok: string; status_payout: string; afiliasi: { nama: string; alias_publik: string } | null; laporan_afiliasi: { platform: string; periode_mulai: string; periode_selesai: string } | null };
type Materi = { id: string; tipe: string; judul: string; aktif: boolean; dibuat_pada: string };

const input = "mt-2 h-11 w-full rounded-xl border border-[#cbd4e1] bg-white px-3 font-normal outline-none focus:border-[#0f6b62]";

export default async function KelolaAfiliasiAdmin({ searchParams }: { searchParams: Promise<{ pesan?: string }> }) {
  const { pesan } = await searchParams;
  const { supabase } = await wajibAdmin();
  const [hasilProfil, hasilTingkat, hasilLaporan, hasilBonus, hasilMateri] = await Promise.all([
    supabase.from("afiliasi").select("id,nama,alias_publik,handle_tiktok,handle_shopee,status,alasan_status,bergabung_pada").order("bergabung_pada", { ascending: false }),
    supabase.from("tingkat_bonus_afiliasi").select("id,nama,minimal_pcs,bonus_per_pcs,aktif").order("minimal_pcs"),
    supabase.from("laporan_afiliasi").select("id,platform,periode_mulai,periode_selesai,nama_berkas,jumlah_baris,dibuat_pada").order("dibuat_pada", { ascending: false }).limit(20),
    supabase.from("bonus_afiliasi").select("id,handle_laporan,jumlah_pcs,tingkat_nama,bonus_dihitung,status_cocok,status_payout,afiliasi(nama,alias_publik),laporan_afiliasi(platform,periode_mulai,periode_selesai)").order("dibuat_pada", { ascending: false }).limit(100),
    supabase.from("materi_promosi").select("id,tipe,judul,aktif,dibuat_pada").order("dibuat_pada", { ascending: false }),
  ]);
  const galat = hasilProfil.error || hasilTingkat.error || hasilLaporan.error || hasilBonus.error || hasilMateri.error;
  const profil = (hasilProfil.data ?? []) as Profil[];
  const tingkat = (hasilTingkat.data ?? []) as Tingkat[];
  const laporan = (hasilLaporan.data ?? []) as Laporan[];
  const bonus = (hasilBonus.data ?? []).map((item) => ({
    ...item,
    afiliasi: Array.isArray(item.afiliasi) ? item.afiliasi[0] ?? null : item.afiliasi,
    laporan_afiliasi: Array.isArray(item.laporan_afiliasi) ? item.laporan_afiliasi[0] ?? null : item.laporan_afiliasi,
  })) as Bonus[];
  const materi = (hasilMateri.data ?? []) as Materi[];
  const menunggu = profil.filter((item) => item.status === "menunggu").length;
  const belumCocok = bonus.filter((item) => item.status_cocok === "belum_cocok").length;
  const menungguBayar = bonus.filter((item) => item.status_cocok === "cocok" && item.status_payout === "menunggu" && Number(item.bonus_dihitung) > 0);

  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">M5 · BR-6 dan BR-7</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-[#14223d] sm:text-4xl">Kelola Afiliasi</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Verifikasi handle, tetapkan tarif bonus nyata, unggah laporan platform, periksa pencocokan, dan simpan bukti pembayaran manual. Komisi dasar tidak dikelola di sini.</p>
      {pesan ? <p role="status" className="mt-5 rounded-2xl border border-[#ead9a6] bg-[#fffaf0] px-4 py-3 text-sm text-[#70510a]">{pesan}</p> : null}
      {galat ? <p className="mt-5 rounded-2xl bg-[#fff2f0] p-4 text-sm text-[#8c2f24]">Schema M5 belum tersedia atau data gagal dibaca: {galat.message}</p> : null}

      <section className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[["Total pendaftar", profil.length], ["Menunggu verifikasi", menunggu], ["Handle belum cocok", belumCocok], ["Bonus menunggu bayar", menungguBayar.length]].map(([label, nilai]) => <article key={String(label)} className="rounded-2xl bg-[#14223d] p-5 text-white"><p className="text-3xl font-black text-[#e8cb76]">{nilai}</p><p className="mt-2 text-xs text-slate-300">{label}</p></article>)}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-black text-[#14223d]">1. Verifikasi pendaftar</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Pastikan handle benar dan afiliasi memahami aturan individu sebelum mengaktifkan akun.</p>
        {profil.length ? <div className="mt-5 grid gap-4 xl:grid-cols-2">{profil.map((item) => <article key={item.id} className="rounded-2xl border border-[#e3e8ef] bg-white p-5"><div className="flex flex-wrap justify-between gap-3"><div><h3 className="font-black text-[#14223d]">{item.nama}</h3><p className="mt-1 text-xs text-slate-500">Alias: {item.alias_publik} · Bergabung {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(item.bergabung_pada))}</p></div><span className={`h-fit rounded-full px-3 py-1 text-xs font-black capitalize ${item.status === "aktif" ? "bg-[#e7f4f1] text-[#0f6b62]" : item.status === "nonaktif" ? "bg-[#fff2f0] text-[#8c2f24]" : "bg-[#fffaf0] text-[#8a6508]"}`}>{item.status}</span></div><form action={perbaruiHandleAfiliasi} className="mt-4 grid gap-3 sm:grid-cols-2"><input type="hidden" name="id" value={item.id} /><label className="text-xs font-bold text-slate-600">Handle TikTok<input name="handle_tiktok" defaultValue={item.handle_tiktok ?? ""} placeholder="tanpa @" className={input} /></label><label className="text-xs font-bold text-slate-600">Handle Shopee<input name="handle_shopee" defaultValue={item.handle_shopee ?? ""} placeholder="tanpa @" className={input} /></label><button className="h-10 rounded-full border border-[#0f6b62] px-4 text-xs font-black text-[#0f6b62] sm:col-span-2">Simpan koreksi handle</button></form>{item.alasan_status ? <p className="mt-3 text-xs leading-5 text-[#8c2f24]">Alasan: {item.alasan_status}</p> : null}<form action={ubahStatusAfiliasi} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]"><input type="hidden" name="id" value={item.id} /><label className="text-xs font-bold text-slate-600">Alasan bila nonaktif<input name="alasan_status" defaultValue={item.alasan_status ?? ""} className={input} /></label><div className="flex items-end gap-2"><button name="status" value="aktif" className="h-11 rounded-full bg-[#0f6b62] px-4 text-xs font-black text-white">Aktifkan</button><button name="status" value="nonaktif" className="h-11 rounded-full border border-[#c85b4f] px-4 text-xs font-black text-[#8c2f24]">Nonaktifkan</button></div></form></article>)}</div> : <p className="mt-5 rounded-2xl border border-dashed border-[#cbd4e1] bg-white p-8 text-center text-sm text-slate-600">Belum ada pendaftar.</p>}
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-[.8fr_1.2fr]">
        <div>
          <h2 className="text-2xl font-black text-[#14223d]">2. Tingkat bonus</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Isi nominal yang sudah diputuskan pemilik. Tidak ada tarif contoh bawaan.</p>
          <form action={simpanTingkatBonus} className="mt-5 rounded-2xl border border-[#e3e8ef] bg-white p-5 text-sm font-bold text-[#14223d]"><label>Nama tingkat<input name="nama" required minLength={3} maxLength={40} placeholder="Contoh: Pemula" className={input} /></label><div className="mt-4 grid grid-cols-2 gap-3"><label>Minimal pcs<input name="minimal_pcs" type="number" min={1} step={1} required className={input} /></label><label>Bonus per pcs<input name="bonus_per_pcs" type="number" min={0} step={1} required className={input} /></label></div><button className="mt-4 h-11 w-full rounded-full bg-[#0f6b62] px-4 text-xs font-black text-white">Simpan tingkat nyata</button></form>
        </div>
        <div className="self-end">
          {tingkat.length ? <div className="grid gap-3 sm:grid-cols-2">{tingkat.map((item) => <article key={item.id} className="rounded-2xl border border-[#e3e8ef] bg-white p-5"><div className="flex justify-between gap-3"><div><h3 className="font-black text-[#14223d]">{item.nama}</h3><p className="mt-2 text-sm text-slate-600">Mulai {item.minimal_pcs} pcs · {formatRupiahAfiliasi(Number(item.bonus_per_pcs))}/pcs</p></div><span className="text-xs font-black text-slate-400">{item.aktif ? "Aktif" : "Nonaktif"}</span></div><form action={ubahKeaktifanTingkat} className="mt-4"><input type="hidden" name="id" value={item.id} /><input type="hidden" name="aktif" value={String(!item.aktif)} /><button className="text-xs font-black text-[#0f6b62]">{item.aktif ? "Nonaktifkan" : "Aktifkan kembali"}</button></form></article>)}</div> : <p className="rounded-2xl border border-dashed border-[#cbd4e1] bg-white p-8 text-center text-sm text-slate-600">Belum ada tingkat bonus. Laporan tidak dapat diproses sampai tarif nyata ditetapkan.</p>}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-black text-[#14223d]">3. Unggah dan cocokkan laporan</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">CSV wajib memiliki kolom <code className="rounded bg-[#eef1f5] px-1">handle</code> dan <code className="rounded bg-[#eef1f5] px-1">jumlah_pcs</code>. Baris handle ganda digabung sebelum disimpan.</p>
        <form action={unggahLaporanAfiliasi} className="mt-5 grid gap-4 rounded-2xl border border-[#e3e8ef] bg-white p-5 text-sm font-bold text-[#14223d] md:grid-cols-4"><label>Platform<select name="platform" required className={input}><option value="">Pilih</option><option value="shopee">Shopee</option><option value="tiktok">TikTok Shop</option></select></label><label>Periode mulai<input name="periode_mulai" type="date" required className={input} /></label><label>Periode selesai<input name="periode_selesai" type="date" required className={input} /></label><label>Berkas CSV<input name="laporan" type="file" accept=".csv,text/csv" required className="mt-2 block w-full text-xs font-normal text-slate-600 file:mr-2 file:rounded-full file:border-0 file:bg-[#e7f4f1] file:px-3 file:py-2 file:font-black file:text-[#0f6b62]" /></label><button className="h-11 rounded-full bg-[#0f6b62] px-5 text-xs font-black text-white md:col-span-4">Unggah dan proses rekonsiliasi</button></form>
        {laporan.length ? <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e3e8ef] bg-white"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-[#eef1f5] text-xs uppercase text-slate-500"><tr><th className="p-4">Platform</th><th className="p-4">Periode</th><th className="p-4">Berkas</th><th className="p-4">Baris unik</th><th className="p-4">Diunggah</th></tr></thead><tbody>{laporan.map((item) => <tr key={item.id} className="border-t border-[#e3e8ef]"><td className="p-4 font-black capitalize">{item.platform}</td><td className="p-4">{formatTanggal(item.periode_mulai)}–{formatTanggal(item.periode_selesai)}</td><td className="p-4">{item.nama_berkas}</td><td className="p-4">{item.jumlah_baris}</td><td className="p-4">{new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(item.dibuat_pada))}</td></tr>)}</tbody></table></div> : null}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-black text-[#14223d]">4. Hasil rekonsiliasi dan payout</h2>
        {bonus.length ? <div className="mt-5 grid gap-4 xl:grid-cols-2">{bonus.map((item) => <article key={item.id} className={`rounded-2xl border bg-white p-5 ${item.status_cocok === "cocok" ? "border-[#b9ded7]" : "border-[#e7b7af]"}`}><div className="flex flex-wrap justify-between gap-2"><div><h3 className="font-black text-[#14223d]">@{item.handle_laporan}</h3><p className="mt-1 text-xs text-slate-500">{item.laporan_afiliasi ? `${item.laporan_afiliasi.platform} · ${formatTanggal(item.laporan_afiliasi.periode_mulai)}–${formatTanggal(item.laporan_afiliasi.periode_selesai)}` : "Laporan tidak tersedia"}</p></div><span className={`h-fit rounded-full px-3 py-1 text-xs font-black ${item.status_cocok === "cocok" ? "bg-[#e7f4f1] text-[#0f6b62]" : "bg-[#fff2f0] text-[#8c2f24]"}`}>{item.status_cocok === "cocok" ? "Cocok" : "Belum cocok"}</span></div><div className="mt-4 grid grid-cols-3 gap-2 text-sm"><div><p className="text-xs text-slate-400">Afiliasi</p><p className="mt-1 font-black text-[#14223d]">{item.afiliasi?.alias_publik ?? "—"}</p></div><div><p className="text-xs text-slate-400">Terjual</p><p className="mt-1 font-black text-[#14223d]">{item.jumlah_pcs} pcs</p></div><div><p className="text-xs text-slate-400">Bonus</p><p className="mt-1 font-black text-[#0f6b62]">{formatRupiahAfiliasi(Number(item.bonus_dihitung))}</p></div></div><p className="mt-3 text-xs text-slate-500">Tingkat: {item.tingkat_nama ?? "tidak ada tarif yang memenuhi"} · Payout: <span className="capitalize">{item.status_payout}</span></p>{item.status_cocok === "cocok" && item.status_payout === "menunggu" && Number(item.bonus_dihitung) > 0 ? <form action={tandaiBonusDibayar} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center"><input type="hidden" name="id" value={item.id} /><input name="bukti_transfer" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" required className="min-w-0 flex-1 text-xs text-slate-600 file:mr-2 file:rounded-full file:border-0 file:bg-[#fffaf0] file:px-3 file:py-2 file:font-black file:text-[#8a6508]" /><button className="h-10 shrink-0 rounded-full bg-[#b8860b] px-4 text-xs font-black text-white">Tandai dibayar</button></form> : null}</article>)}</div> : <p className="mt-5 rounded-2xl border border-dashed border-[#cbd4e1] bg-white p-8 text-center text-sm text-slate-600">Belum ada hasil rekonsiliasi.</p>}
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
        <div>
          <h2 className="text-2xl font-black text-[#14223d]">5. Materi promosi</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Tambahkan teks atau berkas asli. Jangan unggah foto produk AI.</p>
          <form action={simpanMateriPromosi} className="mt-5 rounded-2xl border border-[#e3e8ef] bg-white p-5 text-sm font-bold text-[#14223d]"><label>Tipe<select name="tipe" required className={input}><option value="story">Story</option><option value="caption">Caption</option><option value="skrip">Skrip</option></select></label><label className="mt-4 block">Judul<input name="judul" required minLength={3} maxLength={100} className={input} /></label><label className="mt-4 block">Deskripsi<textarea name="deskripsi" required minLength={10} maxLength={300} className="mt-2 min-h-24 w-full rounded-xl border border-[#cbd4e1] p-3 font-normal outline-none focus:border-[#0f6b62]" /></label><label className="mt-4 block">Isi teks opsional<textarea name="isi_teks" className="mt-2 min-h-28 w-full rounded-xl border border-[#cbd4e1] p-3 font-normal outline-none focus:border-[#0f6b62]" /></label><label className="mt-4 block">Berkas opsional<input name="berkas" type="file" accept="image/jpeg,image/png,image/webp,application/pdf,text/plain" className="mt-2 block w-full text-xs font-normal text-slate-600" /></label><button className="mt-4 h-11 w-full rounded-full bg-[#0f6b62] px-4 text-xs font-black text-white">Simpan materi</button></form>
        </div>
        <div className="self-end">{materi.length ? <div className="grid gap-3 sm:grid-cols-2">{materi.map((item) => <article key={item.id} className="rounded-2xl border border-[#e3e8ef] bg-white p-5"><span className="text-xs font-black text-[#0f6b62] capitalize">{item.tipe}</span><h3 className="mt-2 font-black text-[#14223d]">{item.judul}</h3><p className="mt-2 text-xs text-slate-500">{item.aktif ? "Aktif di portal" : "Disembunyikan"}</p><form action={ubahKeaktifanMateri} className="mt-4"><input type="hidden" name="id" value={item.id} /><input type="hidden" name="aktif" value={String(!item.aktif)} /><button className="text-xs font-black text-[#0f6b62]">{item.aktif ? "Sembunyikan" : "Aktifkan"}</button></form></article>)}</div> : <p className="rounded-2xl border border-dashed border-[#cbd4e1] bg-white p-8 text-center text-sm text-slate-600">Belum ada materi promosi.</p>}</div>
      </section>
    </main>
  );
}
