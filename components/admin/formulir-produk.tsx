import type { Produk } from "@/data/produk";
import { simpanProduk } from "@/app/admin/(terlindungi)/produk/tindakan";
import { TombolSimpanProduk } from "./tombol-simpan-produk";

type Properti = { produk?: Produk; pesan?: string };
const kelasInput = "mt-2 min-h-11 w-full rounded-xl border border-[#CFC3B2] bg-white px-3 py-2 text-sm outline-none focus:border-[#087477] focus:ring-3 focus:ring-[#087477]/10";

function gabung(nilai?: string[]) { return nilai?.join(", ") ?? ""; }

export function FormulirProduk({ produk, pesan }: Properti) {
  return (
    <form action={simpanProduk} className="space-y-6" encType="multipart/form-data">
      <input type="hidden" name="id" value={produk?.id ?? ""} />
      <input type="hidden" name="foto_tersimpan" value={JSON.stringify(produk?.foto?.slice(0, 1) ?? [])} />
      <input type="hidden" name="tujuan_kembali" value={produk?.id ? `/admin/produk/${produk.id}` : "/admin/produk/baru"} />
      {pesan ? <p role="alert" className="rounded-2xl border border-[#efc9c3] bg-[#fff2f0] px-4 py-3 text-sm text-[#9e3024]">{pesan}</p> : null}

      <div className="grid gap-5 rounded-2xl border border-[#DED3C2] bg-white p-5 lg:grid-cols-2">
        <label className="text-sm font-bold text-[#102A43]">Nama produk
          <input className={kelasInput} name="nama" required minLength={3} defaultValue={produk?.nama} />
        </label>
        <label className="text-sm font-bold text-[#102A43]">Slug
          <input className={kelasInput} name="slug" placeholder="Dibuat otomatis bila kosong" defaultValue={produk?.slug} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" />
        </label>
        <label className="text-sm font-bold text-[#102A43]">Kategori
          <select className={kelasInput} name="kategori" defaultValue={produk?.kategori ?? "decant"}>
            <option value="ori">Ori</option><option value="decant">Decant</option>
            <option value="inspirasi">Inspirasi</option><option value="signature">Signature</option>
          </select>
        </label>
        <label className="text-sm font-bold text-[#102A43]">Ukuran
          <input className={kelasInput} name="ukuran" required defaultValue={produk?.ukuran} placeholder="5 ml" />
        </label>
        <label className="text-sm font-bold text-[#102A43]">Harga
          <input className={kelasInput} name="harga" type="number" min="0" step="1" required defaultValue={produk?.harga ?? 0} />
        </label>
        <label className="text-sm font-bold text-[#102A43]">Warna placeholder
          <select className={kelasInput} name="warna" defaultValue={produk?.warna ?? "tosca"}>
            <option value="krem">Krem</option><option value="tosca">Tosca</option><option value="emas">Emas</option>
            <option value="navy">Navy</option><option value="merahMuda">Merah muda</option>
          </select>
        </label>
        <label className="text-sm font-bold text-[#102A43] lg:col-span-2">Ringkasan
          <textarea className={kelasInput} name="ringkasan" required rows={2} defaultValue={produk?.ringkasan} />
        </label>
        <label className="text-sm font-bold text-[#102A43] lg:col-span-2">Deskripsi
          <textarea className={kelasInput} name="deskripsi" required rows={4} defaultValue={produk?.deskripsi} />
        </label>
      </div>

      <fieldset className="grid gap-5 rounded-2xl border border-[#CFE5E0] bg-[#E5F2EF] p-5 lg:grid-cols-2">
        <legend className="px-2 font-black text-[#087477]">Profil aroma dan data kuis M4</legend>
        {[
          ["aroma_atas", "Aroma atas", produk?.profilAroma.atas],
          ["aroma_tengah", "Aroma tengah", produk?.profilAroma.tengah],
          ["aroma_dasar", "Aroma dasar", produk?.profilAroma.dasar],
          ["karakter", "Karakter", produk?.profilAroma.karakter],
          ["cocok_untuk", "Cocok untuk", produk?.profilAroma.cocokUntuk],
        ].map(([nama, label, nilai]) => (
          <label key={nama as string} className="text-sm font-bold text-[#102A43]">{label as string}
            <input className={kelasInput} name={nama as string} required defaultValue={gabung(nilai as string[] | undefined)} placeholder="Pisahkan dengan koma" />
          </label>
        ))}
        <p className="text-xs leading-5 text-[#087477] lg:col-span-2">Untuk kategori Inspirasi/Signature, nama merek terkenal ditolak di klien dan database sesuai BR-4.</p>
      </fieldset>

      <div className="grid gap-5 rounded-2xl border border-[#DED3C2] bg-white p-5 lg:grid-cols-2">
        <label className="text-sm font-bold text-[#102A43]">Foto utama produk
          <input className={kelasInput} name="foto" type="file" accept="image/jpeg,image/png,image/webp" />
          <span className="mt-2 block text-xs font-normal text-[#4A4D52]">JPEG/PNG/WebP, maksimal 5 MB. Unggahan baru menggantikan foto utama lama. Visual ilustrasi wajib mengikuti KEP-036.</span>
        </label>
        <div className="space-y-4">
          <label className="block text-sm font-bold text-[#102A43]">Link Shopee
            <input className={kelasInput} name="link_shopee" type="url" defaultValue={produk?.linkMarketplace?.shopee} placeholder="https://shopee.co.id/..." />
          </label>
          <label className="block text-sm font-bold text-[#102A43]">Link TikTok Shop
            <input className={kelasInput} name="link_tiktok" type="url" defaultValue={produk?.linkMarketplace?.tiktok} placeholder="https://www.tiktok.com/..." />
          </label>
        </div>
        <div className="flex flex-wrap gap-5 lg:col-span-2">
          <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" name="unggulan" defaultChecked={produk?.unggulan} /> Produk unggulan</label>
          <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" name="tersedia" defaultChecked={produk?.tersedia ?? true} /> Tersedia</label>
          <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" name="aktif" defaultChecked={produk?.aktif ?? true} /> Tampil aktif</label>
        </div>
      </div>
      <TombolSimpanProduk />
    </form>
  );
}
