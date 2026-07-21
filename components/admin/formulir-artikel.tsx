import type { Artikel } from "@/data/artikel";
import { simpanArtikel } from "@/app/admin/(terlindungi)/konten/tindakan";

type Properti = { artikel?: Artikel; pesan?: string };
const kelasInput = "mt-2 min-h-11 w-full rounded-xl border border-[#cbd4e1] bg-white px-3 py-2 text-sm outline-none focus:border-[#0f6b62] focus:ring-3 focus:ring-[#0f6b62]/10";

function bagianKeTeks(artikel?: Artikel) {
  return artikel?.bagian.map((bagian) => [bagian.judul ? `## ${bagian.judul}` : "", ...bagian.paragraf].filter(Boolean).join("\n\n")).join("\n\n") ?? "";
}

export function FormulirArtikel({ artikel, pesan }: Properti) {
  return (
    <form action={simpanArtikel} className="space-y-6" encType="multipart/form-data">
      <input type="hidden" name="id" value={artikel?.id ?? ""}/>
      <input type="hidden" name="foto_tersimpan" value={artikel?.fotoUtama ?? ""}/>
      <input type="hidden" name="tujuan_kembali" value={artikel?.id ? `/admin/konten/${artikel.id}` : "/admin/konten/baru"}/>
      {pesan ? <p role="alert" className="rounded-2xl border border-[#efc9c3] bg-[#fff2f0] px-4 py-3 text-sm text-[#9e3024]">{pesan}</p> : null}
      <div className="grid gap-5 rounded-2xl border border-[#e3e8ef] bg-white p-5 lg:grid-cols-[1fr_280px]">
        <div className="space-y-5">
          <label className="block text-sm font-bold text-[#14223d]">Judul
            <input className={kelasInput} name="judul" required minLength={5} defaultValue={artikel?.judul}/>
          </label>
          <label className="block text-sm font-bold text-[#14223d]">Slug
            <input className={kelasInput} name="slug" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="Dibuat otomatis bila kosong" defaultValue={artikel?.slug}/>
          </label>
          <label className="block text-sm font-bold text-[#14223d]">Cuplikan
            <textarea className={kelasInput} name="cuplikan" required rows={3} defaultValue={artikel?.cuplikan}/>
          </label>
          <label className="block text-sm font-bold text-[#14223d]">Isi artikel
            <textarea className={`${kelasInput} font-mono leading-6`} name="isi" required rows={16} defaultValue={bagianKeTeks(artikel)} placeholder={"Paragraf pembuka.\n\n## Subjudul\n\nParagraf berikutnya."}/>
            <span className="mt-2 block text-xs font-normal text-slate-500">Pisahkan paragraf dengan baris kosong. Awali subjudul dengan ##.</span>
          </label>
        </div>
        <aside className="space-y-5">
          <label className="block text-sm font-bold text-[#14223d]">Kategori
            <select className={kelasInput} name="kategori" defaultValue={artikel?.kategori ?? "edukasi"}><option value="cerita_misi">Cerita Misi</option><option value="edukasi">Edukasi</option><option value="tips">Tips</option><option value="komunitas">Komunitas</option></select>
          </label>
          <div className="rounded-xl bg-[#e7f4f1] p-4 text-xs leading-5 text-[#0f6b62]">CTA ditentukan otomatis: Edukasi/Tips → Produk, Cerita Misi → Donasi, Komunitas → Afiliasi.</div>
          <label className="block text-sm font-bold text-[#14223d]">Penulis
            <input className={kelasInput} name="penulis" required defaultValue={artikel?.penulis ?? "Wawangian Pelajar"}/>
          </label>
          <label className="block text-sm font-bold text-[#14223d]">Perkiraan menit baca
            <input className={kelasInput} name="menit_baca" type="number" min="1" required defaultValue={artikel?.menitBaca ?? 3}/>
          </label>
          <label className="block text-sm font-bold text-[#14223d]">Warna placeholder
            <select className={kelasInput} name="warna" defaultValue={artikel?.warna ?? "tosca"}><option value="tosca">Tosca</option><option value="emas">Emas</option><option value="navy">Navy</option><option value="merahMuda">Merah muda</option></select>
          </label>
          <label className="block text-sm font-bold text-[#14223d]">Gambar utama asli
            <input className={kelasInput} name="foto" type="file" accept="image/jpeg,image/png,image/webp"/>
          </label>
          <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" name="share_aktif" defaultChecked={artikel?.shareAktif ?? true}/> Aktifkan tombol share</label>
          <label className="block text-sm font-bold text-[#14223d]">Status
            <select className={kelasInput} name="status" defaultValue={artikel?.status ?? "draft"}><option value="draft">Draft</option><option value="terbit">Terbit</option></select>
          </label>
          <p className="text-xs leading-5 text-slate-500">Tidak ada kolom komentar sesuai KEP-012.</p>
        </aside>
      </div>
      <button className="min-h-12 rounded-full bg-[#0f6b62] px-6 py-3 text-sm font-black text-white">Simpan artikel</button>
    </form>
  );
}
