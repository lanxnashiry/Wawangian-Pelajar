import { simpanPenyaluranDonasi } from "@/app/admin/(terlindungi)/donasi/tindakan";
import { formatRupiah } from "@/data/produk";

export type PenyaluranAdmin = { id: string; tanggal: string; jumlah: number; penerima_nama: string; penerima_jenis: "pelajar" | "mahasiswa" | "guru" | "lembaga"; tujuan_deskripsi: string; bukti: string[]; artikel_id: string | null; status: "draft" | "terpublikasi" };
type ArtikelPilihan = { id: string; judul: string };
type Properti = { penyaluran?: PenyaluranAdmin; artikel: ArtikelPilihan[]; pesan?: string };
const kelasInput = "mt-2 min-h-11 w-full rounded-xl border border-[#CFC3B2] bg-white px-3 py-2 text-sm outline-none focus:border-[#087477] focus:ring-3 focus:ring-[#087477]/10";

export function FormulirPenyaluranDonasi({ penyaluran, artikel, pesan }: Properti) {
  return (
    <form action={simpanPenyaluranDonasi} className="space-y-6" encType="multipart/form-data">
      <input type="hidden" name="id" value={penyaluran?.id ?? ""} />
      <input type="hidden" name="bukti_tersimpan" value={JSON.stringify(penyaluran?.bukti ?? [])} />
      {pesan ? <p role="status" className="rounded-xl bg-[#E5F2EF] px-4 py-3 text-sm font-bold text-[#087477]">{pesan}</p> : null}
      <div className="grid gap-5 rounded-2xl border border-[#DED3C2] bg-white p-5 sm:grid-cols-2">
        <label className="text-sm font-bold text-[#102A43]">Tanggal penyaluran<input className={kelasInput} name="tanggal" type="date" required defaultValue={penyaluran?.tanggal} /></label>
        <label className="text-sm font-bold text-[#102A43]">Jumlah penyaluran<input className={kelasInput} name="jumlah" type="number" min="1" step="1" required defaultValue={penyaluran?.jumlah} />{penyaluran ? <span className="mt-2 block text-xs font-normal text-[#4A4D52]">Saat ini {formatRupiah(penyaluran.jumlah)}</span> : null}</label>
        <label className="text-sm font-bold text-[#102A43]">Nama penerima<input className={kelasInput} name="penerima_nama" required minLength={3} defaultValue={penyaluran?.penerima_nama} /></label>
        <label className="text-sm font-bold text-[#102A43]">Jenis penerima<select className={kelasInput} name="penerima_jenis" defaultValue={penyaluran?.penerima_jenis ?? "pelajar"}><option value="pelajar">Pelajar</option><option value="mahasiswa">Mahasiswa</option><option value="guru">Guru</option><option value="lembaga">Lembaga pendidikan</option></select></label>
        <label className="text-sm font-bold text-[#102A43] sm:col-span-2">Tujuan penyaluran<textarea className={kelasInput} name="tujuan_deskripsi" rows={4} required minLength={10} defaultValue={penyaluran?.tujuan_deskripsi} /></label>
      </div>
      <div className="grid gap-5 rounded-2xl border border-[#CFE5E0] bg-[#E5F2EF] p-5 sm:grid-cols-2">
        <label className="text-sm font-bold text-[#102A43]">Bukti transfer atau kuitansi<input className={kelasInput} name="bukti" type="file" accept="image/jpeg,image/png,image/webp" /><span className="mt-2 block text-xs font-normal leading-5 text-[#087477]">JPEG/PNG/WebP maksimal 5 MB. Bukti wajib sebelum publikasi.</span></label>
        <label className="text-sm font-bold text-[#102A43]">Cerita Misi terkait<select className={kelasInput} name="artikel_id" defaultValue={penyaluran?.artikel_id ?? ""}><option value="">Belum ada cerita terkait</option>{artikel.map((item) => <option key={item.id} value={item.id}>{item.judul}</option>)}</select></label>
        <label className="text-sm font-bold text-[#102A43]">Status<select className={kelasInput} name="status" defaultValue={penyaluran?.status ?? "draft"}><option value="draft">Draft — tidak tampil publik</option><option value="terpublikasi">Terpublikasi — wajib bukti dan saldo cukup</option></select></label>
        <div className="rounded-xl bg-white/70 p-4 text-xs leading-5 text-[#087477]">Sistem menolak publikasi tanpa bukti atau bila jumlah melebihi saldo amanah.</div>
      </div>
      {penyaluran?.bukti.length ? <div className="rounded-2xl border border-[#DED3C2] bg-white p-5"><h2 className="font-black text-[#102A43]">Bukti tersimpan</h2><ul className="mt-3 space-y-2 text-sm">{penyaluran.bukti.map((url, indeks) => <li key={url}><a className="font-bold text-[#087477] hover:underline" href={url} target="_blank" rel="noreferrer">Buka bukti {indeks + 1}</a></li>)}</ul></div> : null}
      <button className="min-h-12 rounded-full bg-[#087477] px-6 py-3 text-sm font-black text-white hover:bg-[#075E61]">Simpan penyaluran</button>
    </form>
  );
}
