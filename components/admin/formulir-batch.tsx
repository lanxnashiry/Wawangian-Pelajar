import { simpanBatch } from "@/app/admin/(terlindungi)/batch/tindakan";

type BatchForm = {
  id: string; versi: number; status: "draft" | "diedarkan" | "ditarik" | "nonaktif";
  kode_batch: string; produk_id: string; nama_varian: string; tanggal_produksi: string;
  kode_formula?: string; catatan_internal?: string; keterangan_publik?: string;
};
type Params = Record<string, string | undefined>;
const kelas = "mt-2 w-full rounded-xl border border-[#CFC3B2] bg-white p-3";

export function FormulirBatch({ batch, produk, pesan, masukan = {} }: {
  batch?: BatchForm; produk: { id: string; nama: string }[]; pesan?: string; masukan?: Params;
}) {
  const nilai = (nama: string, bawaan = "") => masukan[nama] ?? bawaan;
  const produkTerpilih = nilai("produk_id", batch?.produk_id);
  const nama = produk.find((item) => item.id === produkTerpilih)?.nama ?? batch?.nama_varian ?? "Pilih varian untuk mengisi nama otomatis";
  return <form action={simpanBatch} className="space-y-5">
    <input type="hidden" name="id" value={batch?.id ?? ""}/>
    <input type="hidden" name="versi" value={batch?.versi ?? 1}/>
    {pesan && <p role="alert" className="rounded-xl bg-[#fff2f0] p-4 text-[#9e3024]">{pesan}</p>}
    <div className="grid gap-5 rounded-2xl bg-white p-6 lg:grid-cols-2">
      <label className="font-bold">Kode Batch *<input className={kelas} name="kode_batch" required pattern="[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*" minLength={3} maxLength={40} defaultValue={nilai("kode_batch", batch?.kode_batch)}/></label>
      <label className="font-bold">Varian *<select className={kelas} name="produk_id" required defaultValue={produkTerpilih}><option value="">Pilih produk</option>{produk.map((item) => <option key={item.id} value={item.id}>{item.nama}</option>)}</select></label>
      <div><p className="font-bold">Nama publik</p><p className={`${kelas} min-h-12 bg-[#F4EBDD]`} aria-live="polite">{nama}</p><p className="mt-1 text-sm">Disalin otomatis oleh server dari Produk, bukan dari isian formulir.</p></div>
      <label className="font-bold">Tanggal produksi *<input className={kelas} type="date" name="tanggal_produksi" required defaultValue={nilai("tanggal_produksi", batch?.tanggal_produksi)}/></label>
      <label className="font-bold">Kode formula<input className={kelas} name="kode_formula" maxLength={100} defaultValue={nilai("kode_formula", batch?.kode_formula)}/></label>
      <label className="font-bold">Status tujuan<select className={kelas} name="status_tujuan" defaultValue={nilai("status_tujuan", batch?.status ?? "diedarkan")}>
        {!batch && <><option value="draft">Draft</option><option value="diedarkan">Diedarkan</option></>}
        {batch?.status === "draft" && <><option value="draft">Draft</option><option value="diedarkan">Diedarkan</option></>}
        {batch?.status === "diedarkan" && <><option value="diedarkan">Diedarkan</option><option value="ditarik">Ditarik</option><option value="nonaktif">Nonaktif</option></>}
        {(batch?.status === "ditarik" || batch?.status === "nonaktif") && <><option value={batch.status}>{batch.status}</option><option value="diedarkan">Diedarkan</option></>}
      </select></label>
      <label className="font-bold lg:col-span-2">Catatan internal<textarea className={kelas} name="catatan_internal" maxLength={2000} defaultValue={nilai("catatan_internal", batch?.catatan_internal)}/></label>
      <label className="font-bold lg:col-span-2">Keterangan publik<textarea className={kelas} name="keterangan_publik" maxLength={500} defaultValue={nilai("keterangan_publik", batch?.keterangan_publik)}/></label>
      <label className="font-bold lg:col-span-2">Alasan perubahan status<textarea className={kelas} name="alasan_status" maxLength={2000} defaultValue={nilai("alasan_status")}/></label>
      {(!batch || batch.status === "draft") && <label className="flex items-start gap-3 lg:col-span-2"><input className="mt-1 h-5 w-5" type="checkbox" name="konfirmasi_terbit" value="ya"/><span>Saya sudah mencocokkan varian, kode batch, dan tanggal dengan catatan produksi sebelum menerbitkan.</span></label>}
    </div>
    <div className="flex gap-3">{(!batch || batch.status === "draft") && <button name="aksi" value="draft" className="rounded-full border px-6 py-3 font-bold">Simpan Draft</button>}<button name="aksi" value="status" className="rounded-full bg-[#087477] px-6 py-3 font-bold text-white">Simpan Status</button></div>
  </form>;
}
