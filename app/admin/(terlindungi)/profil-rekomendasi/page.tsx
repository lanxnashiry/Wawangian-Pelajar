import { FormulirProfilRekomendasi } from "@/components/admin/formulir-profil-rekomendasi";
import type { ProfilRekomendasi } from "@/data/profil-rekomendasi";
import { wajibAdmin } from "@/lib/admin/otorisasi";
import { ubahStatusProfilRekomendasi } from "./tindakan";

type BarisProfil = {
  id: string;
  kode: string;
  nama: string;
  tag_aroma: ProfilRekomendasi["tagAroma"];
  tag_kesan: ProfilRekomendasi["tagKesan"];
  tag_intensitas: ProfilRekomendasi["tagIntensitas"];
  tag_waktu: ProfilRekomendasi["tagWaktu"];
  tag_kegiatan: ProfilRekomendasi["tagKegiatan"];
  aktif: boolean;
};

function petakan(baris: BarisProfil): ProfilRekomendasi {
  return {
    id: baris.id,
    kode: baris.kode,
    nama: baris.nama,
    tagAroma: baris.tag_aroma,
    tagKesan: baris.tag_kesan,
    tagIntensitas: baris.tag_intensitas,
    tagWaktu: baris.tag_waktu,
    tagKegiatan: baris.tag_kegiatan,
    aktif: baris.aktif,
  };
}

export default async function HalamanProfilRekomendasi({
  searchParams,
}: {
  searchParams: Promise<{ pesan?: string }>;
}) {
  const [{ pesan }, { supabase }] = await Promise.all([
    searchParams,
    wajibAdmin(),
  ]);
  const { data, error } = await supabase
    .from("profil_rekomendasi")
    .select("*")
    .order("nama");
  const daftar = ((data ?? []) as BarisProfil[]).map(petakan);

  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <p className="text-xs font-black tracking-[0.16em] text-[#087477] uppercase">Temukan Wangimu</p>
      <h1 className="mt-3 text-3xl font-black text-[#102A43] sm:text-4xl">Profil rekomendasi</h1>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-[#282B2F]">Satu profil mewakili satu keluarga aroma. Hubungkan seluruh ukuran aroma yang sama ke profil ini dari formulir Produk.</p>
      {pesan ? <p role="status" className="mt-5 rounded-2xl bg-[#E5F2EF] px-4 py-3 text-sm text-[#087477]">{pesan}</p> : null}
      {error ? <p className="mt-6 rounded-2xl bg-[#fff2f0] p-5 text-sm text-[#9e3024]">Skema profil rekomendasi belum siap: {error.message}</p> : null}

      <section className="mt-8 rounded-3xl border border-[#DED3C2] bg-white p-5 sm:p-7">
        <h2 className="text-xl font-black text-[#102A43]">Tambah keluarga aroma</h2>
        <div className="mt-5"><FormulirProfilRekomendasi /></div>
      </section>

      <section className="mt-8 space-y-5">
        {daftar.map((profil) => (
          <article key={profil.id} className="rounded-3xl border border-[#DED3C2] bg-white p-5 sm:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-[#102A43]">{profil.nama}</h2>
                <p className="mt-1 text-xs text-[#687078]">Kode: {profil.kode}</p>
              </div>
              <form action={ubahStatusProfilRekomendasi}>
                <input type="hidden" name="id" value={profil.id} />
                <button name="aktif" value={String(!profil.aktif)} className={`rounded-full px-4 py-2 text-xs font-black ${profil.aktif ? "border border-[#c85b4f] text-[#8c2f24]" : "bg-[#087477] text-white"}`}>
                  {profil.aktif ? "Nonaktifkan" : "Aktifkan"}
                </button>
              </form>
            </div>
            <FormulirProfilRekomendasi profil={profil} />
          </article>
        ))}
      </section>
    </main>
  );
}
