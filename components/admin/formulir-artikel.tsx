import type { Artikel } from "@/data/artikel";
import { simpanArtikel } from "@/app/admin/(terlindungi)/konten/tindakan";

type Properti = { artikel?: Artikel; pesan?: string };
const kelasInput = "mt-2 min-h-11 w-full rounded-xl border border-[#CFC3B2] bg-white px-3 py-2 text-sm outline-none focus:border-[#087477] focus:ring-3 focus:ring-[#087477]/10";

function bagianKeTeks(artikel?: Artikel) {
  return artikel?.bagian.map((bagian) => [bagian.judul ? `## ${bagian.judul}` : "", ...bagian.paragraf].filter(Boolean).join("\n\n")).join("\n\n") ?? "";
}

function isiUntukEditor(artikel?: Artikel) {
  return artikel?.isiMarkdown ?? bagianKeTeks(artikel);
}

export function FormulirArtikel({ artikel, pesan }: Properti) {
  return (
    <form action={simpanArtikel} className="space-y-6" encType="multipart/form-data">
      <input type="hidden" name="id" value={artikel?.id ?? ""}/>
      <input type="hidden" name="foto_tersimpan" value={artikel?.fotoUtama ?? ""}/>
      <input type="hidden" name="tanggal_terbit_lama" value={artikel?.tanggalTerbitIso ?? ""}/>
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
            <textarea className={`${kelasInput} font-mono leading-6`} name="isi" required rows={16} defaultValue={isiUntukEditor(artikel)} placeholder={"Paragraf pembuka.\n\n## Subjudul\n\nParagraf berikutnya."}/>
            <span className="mt-2 block text-xs leading-5 font-normal text-[#4A4D52]">
              Mendukung Markdown. Pisahkan paragraf dengan baris kosong.
              <br />
              <code>## Subjudul</code> · <code>### Sub-subjudul</code> ·{" "}
              <code>**tebal**</code> · <code>- daftar</code> ·{" "}
              <code>1. bernomor</code> · <code>[teks](/katalog)</code> ·{" "}
              <code>&gt; kutipan</code> · tabel gaya GFM.
              <br />
              <strong>Jangan pakai </strong>
              <code># Judul</code>
              <strong>
                {" "}
                — judul utama sudah diambil dari kolom Judul di atas.
              </strong>
            </span>
          </label>
          <fieldset className="space-y-5 rounded-2xl border border-[#DED3C2] bg-[#FBF8F3] p-5">
            <legend className="px-2 text-sm font-black text-[#102A43]">
              Optimasi mesin pencari
            </legend>
            <p className="text-xs leading-5 text-[#4A4D52]">
              Semua kolom di bagian ini opsional. Bila dikosongkan, sistem
              memakai Judul dan Cuplikan di atas.
            </p>

            <label className="block text-sm font-bold text-[#102A43]">
              Judul untuk hasil pencarian
              <input
                className={kelasInput}
                name="meta_judul"
                maxLength={70}
                defaultValue={artikel?.metaJudul ?? ""}
                placeholder="Maksimal 60 karakter agar tidak terpotong Google"
              />
              <span className="mt-2 block text-xs leading-5 font-normal text-[#4A4D52]">
                Judul di atas boleh panjang dan naratif untuk pembaca. Kolom ini
                yang tampil di Google, jadi buat ringkas dan taruh kata kunci di
                depan. Ingat, sistem menambahkan{" "}
                <code>· Wawangian Pelajar</code> (21 karakter) di belakangnya.
              </span>
            </label>

            <label className="block text-sm font-bold text-[#102A43]">
              Deskripsi untuk hasil pencarian
              <textarea
                className={kelasInput}
                name="meta_deskripsi"
                rows={3}
                maxLength={200}
                defaultValue={artikel?.metaDeskripsi ?? ""}
                placeholder="150-160 karakter. Sertakan kata kunci dan ajakan bertindak."
              />
              <span className="mt-2 block text-xs leading-5 font-normal text-[#4A4D52]">
                Ini kalimat yang dibaca orang di halaman hasil Google sebelum
                memutuskan mengeklik. Cuplikan di atas dipakai untuk kartu di
                halaman daftar artikel; keduanya boleh berbeda.
              </span>
            </label>

            <label className="block text-sm font-bold text-[#102A43]">
              Fokus kata kunci
              <input
                className={kelasInput}
                name="fokus_kata_kunci"
                defaultValue={artikel?.fokusKataKunci ?? ""}
                placeholder="contoh: parfum decant murah"
              />
              <span className="mt-2 block text-xs leading-5 font-normal text-[#4A4D52]">
                Tidak dikirim ke Google. Ini catatan internal agar penulis ingat
                kata kunci apa yang sedang dibidik artikel ini.
              </span>
            </label>
          </fieldset>
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
          <label className="block text-sm font-bold text-[#102A43]">
            Keterangan gambar (alt text)
            <input
              className={kelasInput}
              name="foto_alt"
              defaultValue={artikel?.fotoAlt ?? ""}
              placeholder="contoh: Botol decant parfum 5 ml di atas meja belajar"
            />
            <span className="mt-2 block text-xs leading-5 font-normal text-[#4A4D52]">
              Deskripsikan isi gambar. Dibaca oleh pembaca layar dan dipakai
              Google Images.
            </span>
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
