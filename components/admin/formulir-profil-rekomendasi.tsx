import {
  labelTagAroma,
  labelTagIntensitas,
  labelTagKegiatan,
  labelTagKesan,
  labelTagWaktu,
  nilaiTagAroma,
  nilaiTagIntensitas,
  nilaiTagKegiatan,
  nilaiTagKesan,
  nilaiTagWaktu,
  type ProfilRekomendasi,
} from "@/data/profil-rekomendasi";
import { simpanProfilRekomendasi } from "@/app/admin/(terlindungi)/profil-rekomendasi/tindakan";

const kelasInput = "mt-2 min-h-11 w-full rounded-xl border border-[#CFC3B2] bg-white px-3 py-2 text-sm outline-none focus:border-[#087477] focus:ring-3 focus:ring-[#087477]/10";

type Kelompok = {
  nama: string;
  judul: string;
  nilai: readonly string[];
  label: Record<string, string>;
  terpilih: string[];
};

export function FormulirProfilRekomendasi({
  profil,
}: {
  profil?: ProfilRekomendasi;
}) {
  const kelompok: Kelompok[] = [
    { nama: "tag_aroma", judul: "Keluarga aroma", nilai: nilaiTagAroma, label: labelTagAroma, terpilih: profil?.tagAroma ?? [] },
    { nama: "tag_kesan", judul: "Kesan", nilai: nilaiTagKesan, label: labelTagKesan, terpilih: profil?.tagKesan ?? [] },
    { nama: "tag_intensitas", judul: "Intensitas", nilai: nilaiTagIntensitas, label: labelTagIntensitas, terpilih: profil?.tagIntensitas ?? [] },
    { nama: "tag_waktu", judul: "Waktu dan cuaca", nilai: nilaiTagWaktu, label: labelTagWaktu, terpilih: profil?.tagWaktu ?? [] },
    { nama: "tag_kegiatan", judul: "Kegiatan", nilai: nilaiTagKegiatan, label: labelTagKegiatan, terpilih: profil?.tagKegiatan ?? [] },
  ];

  return (
    <form action={simpanProfilRekomendasi} className="space-y-5">
      <input type="hidden" name="id" value={profil?.id ?? ""} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-bold text-[#102A43]">Nama keluarga aroma
          <input name="nama" required minLength={3} defaultValue={profil?.nama} className={kelasInput} placeholder="Mykonos California Blue" />
        </label>
        <label className="text-sm font-bold text-[#102A43]">Kode stabil
          <input name="kode" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" defaultValue={profil?.kode} className={kelasInput} placeholder="california-blue" />
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {kelompok.map((item) => (
          <fieldset key={item.nama} className="rounded-2xl border border-[#DED3C2] bg-[#FAF7F1] p-4">
            <legend className="px-2 text-sm font-black text-[#102A43]">{item.judul}</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {item.nilai.map((nilai) => (
                <label key={nilai} className="flex items-start gap-2 rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#282B2F]">
                  <input type="checkbox" name={item.nama} value={nilai} defaultChecked={item.terpilih.includes(nilai)} className="mt-0.5" />
                  {item.label[nilai]}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <button className="min-h-11 rounded-full bg-[#087477] px-5 py-3 text-sm font-black text-white hover:bg-[#075E61]">
        {profil ? "Simpan perubahan profil" : "Tambah profil rekomendasi"}
      </button>
    </form>
  );
}
