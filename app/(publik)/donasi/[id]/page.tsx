import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatRupiah } from "@/data/produk";
import { ambilPenyaluranPublikBerdasarkanId, formatTanggalDonasi, labelPenerimaDonasi } from "@/lib/data/donasi";

type Properti = { params: Promise<{ id: string }> };
export const revalidate = 300;

export default async function DetailPenyaluran({ params }: Properti) {
  const { id } = await params;
  const penyaluran = await ambilPenyaluranPublikBerdasarkanId(id);
  if (!penyaluran) notFound();
  return (
    <main className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
      <article className="mx-auto w-full max-w-5xl">
        <Link href="/donasi" className="text-sm font-black text-[#087477] hover:underline">← Kembali ke transparansi</Link>
        <div className="mt-6 rounded-[2rem] bg-[#102A43] p-6 text-white sm:p-10">
          <p className="text-xs font-black tracking-[0.16em] text-[#D1B779] uppercase">Bukti penyaluran</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">{penyaluran.penerimaNama}</h1>
          <div className="mt-5 flex flex-wrap gap-2 text-sm"><span className="rounded-full bg-white/10 px-4 py-2">{labelPenerimaDonasi[penyaluran.penerimaJenis]}</span><span className="rounded-full bg-white/10 px-4 py-2">{formatTanggalDonasi(penyaluran.tanggal)}</span></div>
          <p className="mt-7 text-3xl font-black text-[#D1B779]">{formatRupiah(penyaluran.jumlah)}</p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[#D9E1E8]">{penyaluran.tujuanDeskripsi}</p>
        </div>
        <section className="mt-8"><h2 className="text-2xl font-black text-[#102A43]">Bukti yang disertakan</h2><div className="mt-5 grid gap-5 sm:grid-cols-2">{penyaluran.bukti.map((url, indeks) => <a key={url} href={url} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-3xl border border-[#DED3C2] bg-white"><div className="relative aspect-[4/3]"><Image src={url} alt={`Bukti penyaluran ${indeks + 1}`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-contain" unoptimized /></div><p className="border-t border-[#DED3C2] p-4 text-sm font-black text-[#087477] group-hover:underline">Buka bukti ukuran penuh →</p></a>)}</div></section>
        {penyaluran.artikel ? <section className="mt-8 rounded-3xl bg-[#E5F2EF] p-6"><p className="text-xs font-black tracking-[0.14em] text-[#087477] uppercase">Cerita Misi terkait</p><h2 className="mt-2 text-xl font-black text-[#102A43]">{penyaluran.artikel.judul}</h2><Link href={`/cerita/${penyaluran.artikel.slug}`} className="mt-4 inline-flex font-black text-[#087477] hover:underline">Baca cerita lengkap →</Link></section> : <p className="mt-8 rounded-2xl border border-dashed border-[#CFC3B2] p-5 text-sm text-[#282B2F]">Cerita lengkap belum diterbitkan. Bukti penyaluran tetap dapat diperiksa di halaman ini.</p>}
      </article>
    </main>
  );
}
