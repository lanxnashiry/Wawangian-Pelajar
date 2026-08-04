import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatRupiah } from "@/data/produk";
import { ambilMetodeDonasiPublik, ambilPenyaluranPublik, ambilRingkasanDonasiPublik, formatTanggalDonasi, labelPenerimaDonasi, labelSumberDonasi } from "@/lib/data/donasi";

export const metadata: Metadata = { title: "Dana Cahaya Pendidikan" };
export const revalidate = 300;

export default async function HalamanDonasi() {
  const [ringkasan, metode, penyaluran] = await Promise.all([
    ambilRingkasanDonasiPublik(),
    ambilMetodeDonasiPublik(),
    ambilPenyaluranPublik(),
  ]);
  const kartu = [
    { label: "Terkumpul", nilai: ringkasan.terkumpul, keterangan: "20% laba bersih setiap transaksi" },
    { label: "Tersalurkan", nilai: ringkasan.tersalurkan, keterangan: "Hanya penyaluran terpublikasi" },
    { label: "Saldo amanah", nilai: ringkasan.saldoAmanah, keterangan: "Terkumpul dikurangi tersalurkan" },
  ];
  return (
    <main>
      <section className="bg-[#102A43] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <p className="text-xs font-black tracking-[0.18em] text-[#D1B779] uppercase">Dana Cahaya Pendidikan</p>
          <h1 className="mt-4 max-w-4xl text-4xl leading-tight font-black tracking-[-0.04em] sm:text-6xl">Transparansi yang dimulai dari sumber dan berakhir pada bukti.</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#D9E1E8]">Angka terkumpul tidak diketik bebas. Sistem menghitung 20% dari laba bersih setiap transaksi—harga jual dikurangi harga beli dan biaya langsung transaksi, lalu mengurangi hanya penyaluran yang memiliki bukti.</p>
          {!ringkasan.tersedia ? <div role="status" className="mt-8 rounded-2xl border border-white/15 bg-white/8 p-5"><h2 className="text-xl font-black text-[#D1B779]">Data transparansi belum dapat dimuat.</h2><p className="mt-2 text-sm leading-6 text-[#D9E1E8]">Angka tidak diganti dengan nilai perkiraan. Silakan coba kembali setelah koneksi data pulih.</p></div> : ringkasan.jumlahRekap === 0 ? <div className="mt-8 rounded-2xl border border-white/15 bg-white/8 p-5"><h2 className="text-xl font-black text-[#D1B779]">Perjalanan baru dimulai.</h2><p className="mt-2 text-sm leading-6 text-[#D9E1E8]">Belum ada rekap penjualan nyata. Nilai nol dipertahankan apa adanya dan tidak diganti angka contoh.</p></div> : null}
        </div>
      </section>
      <section className="px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-3">
          {kartu.map((item) => <article key={item.label} className="rounded-3xl border border-[#DED3C2] bg-white p-6 shadow-sm"><p className="text-xs font-black tracking-[0.14em] text-[#087477] uppercase">{item.label}</p><p className="mt-3 text-3xl font-black text-[#102A43] sm:text-4xl">{ringkasan.tersedia ? formatRupiah(item.nilai) : "Belum tersedia"}</p><p className="mt-3 text-sm leading-6 text-[#282B2F]">{item.keterangan}</p></article>)}
        </div>
      </section>
      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <p className="text-xs font-black tracking-[0.16em] text-[#087477] uppercase">Bukti yang dapat diperiksa</p>
          <h2 className="mt-3 text-3xl font-black text-[#102A43]">Riwayat penyaluran</h2>
          {penyaluran.length ? <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{penyaluran.map((item) => <article key={item.id} className="overflow-hidden rounded-3xl border border-[#DED3C2] bg-[#FAF7F1]">{item.bukti[0] ? <div className="relative aspect-[4/3] bg-white"><Image src={item.bukti[0]} alt={`Bukti penyaluran kepada ${item.penerimaNama}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" unoptimized /></div> : null}<div className="p-5"><div className="flex flex-wrap gap-2 text-xs font-bold"><span className="rounded-full bg-[#E5F2EF] px-3 py-1 text-[#087477]">{labelPenerimaDonasi[item.penerimaJenis]}</span><span className="rounded-full bg-white px-3 py-1 text-[#4A4D52]">{formatTanggalDonasi(item.tanggal)}</span></div><h3 className="mt-4 text-xl font-black text-[#102A43]">{item.penerimaNama}</h3><p className="mt-2 text-2xl font-black text-[#C7A25A]">{formatRupiah(item.jumlah)}</p><p className="mt-3 line-clamp-3 text-sm leading-6 text-[#282B2F]">{item.tujuanDeskripsi}</p><Link href={`/donasi/${item.id}`} className="mt-5 inline-flex font-black text-[#087477] hover:underline">Periksa bukti →</Link></div></article>)}</div> : <div className="mt-7 rounded-3xl border border-dashed border-[#CFC3B2] bg-[#FAF7F1] p-9 text-center"><h3 className="text-xl font-black text-[#102A43]">Belum ada penyaluran terpublikasi</h3><p className="mt-2 text-sm leading-6 text-[#282B2F]">Entri tanpa bukti tetap menjadi draft dan tidak ditampilkan di sini.</p></div>}
        </div>
      </section>
      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-7xl rounded-[2rem] bg-[#FAF7F1] p-6 sm:p-9">
          <p className="text-xs font-black tracking-[0.16em] text-[#765B2B] uppercase">Bagaimana angka dihitung</p>
          <h2 className="mt-3 text-3xl font-black text-[#102A43]">Metode setiap periode</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#282B2F]">Untung bersih berasal dari rekap marketplace setelah biaya yang dicatat Admin. Database mengalikan nilai tersebut dengan 20%; publik tidak melihat rincian laba bisnis.</p>
          {metode.length ? <div className="mt-6 space-y-3">{metode.map((item) => <article key={item.id} className="rounded-2xl bg-white p-5"><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-black text-[#102A43]">{labelSumberDonasi[item.sumber]} · {formatTanggalDonasi(item.periodeMulai)} – {formatTanggalDonasi(item.periodeSelesai)}</h3><span className="rounded-full bg-[#F6EACD] px-3 py-1 text-xs font-black text-[#765B2B]">{item.persentase}% = {formatRupiah(item.jumlahDonasi)}</span></div><p className="mt-3 text-sm leading-6 text-[#282B2F]">{item.catatanMetode}</p></article>)}</div> : <p className="mt-6 text-sm text-[#282B2F]">Metode periode akan tampil setelah rekap pertama disimpan.</p>}
        </div>
      </section>
    </main>
  );
}
