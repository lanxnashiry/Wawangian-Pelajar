import type { Artikel } from "@/data/artikel";
import { simpanArtikel } from "@/app/admin/(terlindungi)/konten/tindakan";

type Properti = { artikel?: Artikel; pesan?: string };
const kelasInput = "mt-2 min-h-11 w-full rounded-xl border border-[#CFC3B2] bg-white px-3 py-2 text-sm outline-none focus:border-[#087477] focus:ring-3 focus:ring-[#087477]/10";

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
      <div className="grid gap-5 rounded-2xl border border-[#DED3C2] bg-white p-5 lg:grid-cols-[1fr_280px]">
        <div className="space-y-5">
          <label className="block text-sm font-bold text-[#102A43]">Judul
            <input className={kelasInput} name="judul" required minLength={5} defaultValue={artikel?.judul}/>
          </label>
          <label className="block text-sm font-bold text-[#102A43]">Slug
            <input className={kelasInput} name="slug" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="Dibuat otomatis bila kosong" defaultValue={artikel?.slug}/>
          </label>
          <label className="block text-sm font-bold text-[#102A43]">Cuplikan
            <textarea className={kelasInput} name="cuplikan" required rows={3} defaultValue={artikel?.cuplikan}/>
          </label>
          <label className="block text-sm font-bold text-[#102A43]">Isi artikel
            <textarea className={`${kelasInput} font-mono leading-6`} name="isi" required rows={16} defaultValue={bagianKeTeks(artikel)} placeholder={"Paragraf pembuka.\n\n## Subjudul\n\nParagraf berikutnya."}/>
            <span className="mt-2 block text-xs font-normal text-[#4A4D52]">Pisahkan paragraf dengan baris kosong. Awali subjudul dengan ##.</span>
          </label>
        </div>
        <aside className="space-y-5">
          <label className="block text-sm font-bold text-[#102A43]">Kategori
            <select className={kelasInput} name="kategori" defaultValue={artikel?.kategori ?? "edukasi"}><option value="cerita_misi">Cerita Misi</option><option value="edukasi">Edukasi</option><option value="tips">Tips</option><option value="komunitas">Komunitas</option></select>
          </label>
          <div className="rounded-xl bg-[#E5F2EF] p-4 text-xs leading-5 text-[#087477]">CTA ditentukan otomatis: Edukasi/Tips → Produk, Cerita Misi → Donasi, Komunitas → Afiliasi.</div>
          <label className="block text-sm font-bold text-[#102A43]">Penulis
            <input className={kelasInput} name="penulis" required defaultValue={artikel?.penulis ?? "Wawangian Pelajar"}/>
          </label>
          <label className="block text-sm font-bold text-[#102A43]">Perkiraan menit baca
            <input className={kelasInput} name="menit_baca" type="number" min="1" required defaultValue={artikel?.menitBaca ?? 3}/>
          </label>
          <label className="block text-sm font-bold text-[#102A43]">Warna placeholder
            <select className={kelasInput} name="warna" defaultValue={artikel?.warna ?? "tosca"}><option value="tosca">Tosca</option><option value="emas">Emas</option><option value="navy">Navy</option><option value="merahMuda">Merah muda</option></select>
          </label>
          <label className="block text-sm font-bold text-[#102A43]">Gambar utama asli
            <input className={kelasInput} name="foto" type="file" accept="image/jpeg,image/png,image/webp"/>
          </label>
          <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" name="share_aktif" defaultChecked={artikel?.shareAktif ?? true}/> Aktifkan tombol share</label>
          <label className="block text-sm font-bold text-[#102A43]">Status
            <select className={kelasInput} name="status" defaultValue={artikel?.status ?? "draft"}><option value="draft">Draft</option><option value="terbit">Terbit</option></select>
          </label>
          <p className="text-xs leading-5 text-[#4A4D52]">Tidak ada kolom komentar sesuai KEP-012.</p>
        </aside>
      </div>
      <button className="min-h-12 rounded-full bg-[#087477] px-6 py-3 text-sm font-black text-white">Simpan artikel</button>
    </form>
  );
}
