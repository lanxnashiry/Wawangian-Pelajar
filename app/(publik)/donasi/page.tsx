import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatRupiah } from "@/data/produk";
import { ambilMetodeDonasiPublik, ambilPenyaluranPublik, ambilRingkasanDonasiPublik, formatTanggalDonasi, labelPenerimaDonasi, labelSumberDonasi } from "@/lib/data/donasi";

export const metadata: Metadata = { title: "Dana Cahaya Pendidikan" };
export const dynamic = "force-dynamic";

export default async function HalamanDonasi() {
  const [ringkasan, metode, penyaluran] = await Promise.all([
    ambilRingkasanDonasiPublik(),
    ambilMetodeDonasiPublik(),
    ambilPenyaluranPublik(),
  ]);
  const kartu = [
    { label: "Terkumpul", nilai: ringkasan.terkumpul, keterangan: "Hasil hitung 20% untung bersih" },
    { label: "Tersalurkan", nilai: ringkasan.tersalurkan, keterangan: "Hanya penyaluran terpublikasi" },
    { label: "Saldo amanah", nilai: ringkasan.saldoAmanah, keterangan: "Terkumpul dikurangi tersalurkan" },
  ];
  return (
    <main>
      <section className="bg-[#14223d] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <p className="text-xs font-black tracking-[0.18em] text-[#e8cb76] uppercase">Dana Cahaya Pendidikan</p>
          <h1 className="mt-4 max-w-4xl text-4xl leading-tight font-black tracking-[-0.04em] sm:text-6xl">Transparansi yang dimulai dari sumber dan berakhir pada bukti.</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">Angka terkumpul tidak diketik bebas. Sistem menghitung 20% dari untung bersih rekap marketplace, lalu mengurangi hanya penyaluran yang memiliki bukti.</p>
          {ringkasan.sumberData === "contoh" ? <div role="status" className="mt-8 rounded-2xl border border-[#e8cb76]/50 bg-[#e8cb76]/10 p-5"><h2 className="text-xl font-black text-[#e8cb76]">Simulasi transparansi · Data Contoh</h2><p className="mt-2 text-sm leading-6 text-slate-200">Seluruh nama, periode, jumlah, tujuan, dan visual bukti pada halaman ini hanya mengisi peninjauan MVP. Tidak ada klaim donasi atau penyaluran nyata.</p></div> : null}
          {!ringkasan.tersedia ? <div role="status" className="mt-8 rounded-2xl border border-white/15 bg-white/8 p-5"><h2 className="text-xl font-black text-[#e8cb76]">Data transparansi belum dapat dimuat.</h2><p className="mt-2 text-sm leading-6 text-slate-300">Angka tidak diganti dengan nilai perkiraan. Silakan coba kembali setelah koneksi data pulih.</p></div> : ringkasan.jumlahRekap === 0 ? <div className="mt-8 rounded-2xl border border-white/15 bg-white/8 p-5"><h2 className="text-xl font-black text-[#e8cb76]">Perjalanan baru dimulai.</h2><p className="mt-2 text-sm leading-6 text-slate-300">Belum ada rekap penjualan nyata. Nilai nol dipertahankan apa adanya dan tidak diganti angka contoh.</p></div> : null}
        </div>
      </section>
      <section className="px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-3">
          {kartu.map((item) => <article key={item.label} className="rounded-3xl border border-[#e3e8ef] bg-white p-6 shadow-sm"><p className="text-xs font-black tracking-[0.14em] text-[#0f6b62] uppercase">{item.label}</p><p className="mt-3 text-3xl font-black text-[#14223d] sm:text-4xl">{ringkasan.tersedia ? formatRupiah(item.nilai) : "Belum tersedia"}</p><p className="mt-3 text-sm leading-6 text-slate-600">{item.keterangan}</p></article>)}
        </div>
      </section>
      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">Bukti yang dapat diperiksa</p>
          <h2 className="mt-3 text-3xl font-black text-[#14223d]">Riwayat penyaluran</h2>
          {penyaluran.length ? <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{penyaluran.map((item) => <article key={item.id} className="overflow-hidden rounded-3xl border border-[#e3e8ef] bg-[#f9fafc]">{item.bukti[0] ? <div className="relative aspect-[4/3] bg-white"><Image src={item.bukti[0]} alt={item.sumberData === "contoh" ? "Placeholder bukti penyaluran contoh" : `Bukti penyaluran kepada ${item.penerimaNama}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" unoptimized /></div> : null}<div className="p-5"><div className="flex flex-wrap gap-2 text-xs font-bold"><span className="rounded-full bg-[#e7f4f1] px-3 py-1 text-[#0f6b62]">{labelPenerimaDonasi[item.penerimaJenis]}</span><span className="rounded-full bg-white px-3 py-1 text-slate-500">{formatTanggalDonasi(item.tanggal)}</span>{item.sumberData === "contoh" ? <span className="rounded-full bg-[#fff5d8] px-3 py-1 text-[#8a6508]">Data Contoh</span> : null}</div><h3 className="mt-4 text-xl font-black text-[#14223d]">{item.penerimaNama}</h3><p className="mt-2 text-2xl font-black text-[#b8860b]">{formatRupiah(item.jumlah)}</p><p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{item.tujuanDeskripsi}</p><Link href={`/donasi/${item.id}`} className="mt-5 inline-flex font-black text-[#0f6b62] hover:underline">Periksa bukti →</Link></div></article>)}</div> : <div className="mt-7 rounded-3xl border border-dashed border-[#cbd4e1] bg-[#f9fafc] p-9 text-center"><h3 className="text-xl font-black text-[#14223d]">Belum ada penyaluran terpublikasi</h3><p className="mt-2 text-sm leading-6 text-slate-600">Entri tanpa bukti tetap menjadi draft dan tidak ditampilkan di sini.</p></div>}
        </div>
      </section>
      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-7xl rounded-[2rem] bg-[#fffaf0] p-6 sm:p-9">
          <p className="text-xs font-black tracking-[0.16em] text-[#8a6508] uppercase">Bagaimana angka dihitung</p>
          <h2 className="mt-3 text-3xl font-black text-[#14223d]">Metode setiap periode</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Untung bersih berasal dari rekap marketplace setelah biaya yang dicatat Admin. Database mengalikan nilai tersebut dengan 20%; publik tidak melihat rincian laba bisnis.</p>
          {metode.length ? <div className="mt-6 space-y-3">{metode.map((item) => <article key={item.id} className="rounded-2xl bg-white p-5"><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-black text-[#14223d]">{labelSumberDonasi[item.sumber]} · {formatTanggalDonasi(item.periodeMulai)} – {formatTanggalDonasi(item.periodeSelesai)}</h3><span className="rounded-full bg-[#fff5d8] px-3 py-1 text-xs font-black text-[#8a6508]">{item.persentase}% = {formatRupiah(item.jumlahDonasi)}</span></div><p className="mt-3 text-sm leading-6 text-slate-600">{item.catatanMetode}</p></article>)}</div> : <p className="mt-6 text-sm text-slate-600">Metode periode akan tampil setelah rekap pertama disimpan.</p>}
        </div>
      </section>
    </main>
  );
}
