import Link from "next/link";
import { wajibAdmin } from "@/lib/admin/otorisasi";
import { ambilRingkasanDonasiPublik } from "@/lib/data/donasi";
import { formatRupiah } from "@/data/produk";

async function hitung(supabase: Awaited<ReturnType<typeof wajibAdmin>>["supabase"], tabel: string, penyaring?: [string, string | boolean]) {
  let kueri = supabase.from(tabel).select("*", { count: "exact", head: true });
  if (penyaring) kueri = kueri.eq(penyaring[0], penyaring[1]);
  const { count } = await kueri;
  return count ?? 0;
}

export default async function DasborAdmin() {
  const { supabase } = await wajibAdmin();
  const [produk, artikelDraft, artikelTerbit, klik, ringkasanDonasi] = await Promise.all([
    hitung(supabase, "produk", ["aktif", true]),
    hitung(supabase, "artikel", ["status", "draft"]),
    hitung(supabase, "artikel", ["status", "terbit"]),
    hitung(supabase, "klik_keluar"),
    ambilRingkasanDonasiPublik(),
  ]);
  const kartu = [
    ["Produk aktif", produk], ["Artikel draft", artikelDraft],
    ["Artikel terbit", artikelTerbit], ["Klik keluar", klik],
  ];
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">M3 · Donasi transparan</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-[#14223d] sm:text-4xl">Dasbor Admin</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Ringkasan ini hanya memakai data Supabase. Nilai kosong tetap ditampilkan sebagai nol.</p>
      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kartu.map(([label, nilai]) => (
          <article key={String(label)} className="rounded-2xl bg-[#14223d] p-5 text-white">
            <p className="text-3xl font-black text-[#e8cb76]">{nilai}</p>
            <p className="mt-2 text-xs text-slate-300">{label}</p>
          </article>
        ))}
      </div>
      <section className="mt-5 grid gap-3 sm:grid-cols-3"><article className="rounded-2xl bg-[#fffaf0] p-5"><p className="text-xs font-black text-[#8a6508] uppercase">Donasi terkumpul</p><p className="mt-2 text-xl font-black text-[#14223d]">{ringkasanDonasi.tersedia ? formatRupiah(ringkasanDonasi.terkumpul) : "Belum tersedia"}</p></article><article className="rounded-2xl bg-[#e7f4f1] p-5"><p className="text-xs font-black text-[#0f6b62] uppercase">Tersalurkan</p><p className="mt-2 text-xl font-black text-[#14223d]">{ringkasanDonasi.tersedia ? formatRupiah(ringkasanDonasi.tersalurkan) : "Belum tersedia"}</p></article><article className="rounded-2xl bg-white p-5"><p className="text-xs font-black text-slate-500 uppercase">Saldo amanah</p><p className="mt-2 text-xl font-black text-[#14223d]">{ringkasanDonasi.tersedia ? formatRupiah(ringkasanDonasi.saldoAmanah) : "Belum tersedia"}</p></article></section>
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[#e3e8ef] bg-white p-5">
          <h2 className="font-black text-[#14223d]">Tugas M3</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Catat rekap penjualan nyata, simpan penyaluran berbukti, dan periksa Log Audit sebelum menerbitkan transparansi.</p>
        </div>
        <div className="rounded-2xl border border-[#d5e8e4] bg-[#e7f4f1] p-5">
          <h2 className="font-black text-[#0f6b62]">Akses cepat</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/admin/produk/baru" className="rounded-full bg-[#0f6b62] px-4 py-2 text-sm font-black text-white">Tambah produk</Link>
            <Link href="/admin/konten/baru" className="rounded-full border border-[#0f6b62] px-4 py-2 text-sm font-black text-[#0f6b62]">Tulis artikel</Link>
            <Link href="/admin/donasi" className="rounded-full border border-[#b8860b] px-4 py-2 text-sm font-black text-[#8a6508]">Kelola donasi</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
