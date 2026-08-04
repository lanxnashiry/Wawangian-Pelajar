import Link from "next/link";
import { formatRupiah } from "@/data/produk";
import { wajibAdmin } from "@/lib/admin/otorisasi";

type Properti = { searchParams: Promise<{ pesan?: string }> };

export default async function DaftarProdukAdmin({ searchParams }: Properti) {
  const { pesan } = await searchParams;
  const { supabase } = await wajibAdmin();
  const { data: produk, error } = await supabase.from("produk")
    .select("id,nama,slug,kategori,ukuran,harga,aktif,tersedia,unggulan,diperbarui_pada")
    .order("diperbarui_pada", { ascending: false });
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-xs font-black tracking-[0.16em] text-[#087477] uppercase">Kelola data</p><h1 className="mt-3 text-3xl font-black text-[#102A43]">Produk</h1></div>
        <div className="flex flex-wrap gap-3"><Link href="/admin/entri-massal" className="rounded-full border border-[#087477] px-5 py-3 text-sm font-black text-[#087477]">Entri massal</Link><Link href="/admin/produk/baru" className="rounded-full bg-[#087477] px-5 py-3 text-sm font-black text-white">+ Produk baru</Link></div>
      </div>
      {pesan ? <p role="status" className="mt-5 rounded-2xl bg-[#E5F2EF] px-4 py-3 text-sm text-[#087477]">{pesan}</p> : null}
      {error ? <p className="mt-6 rounded-2xl bg-[#fff2f0] p-5 text-sm text-[#9e3024]">Schema produk belum siap: {error.message}</p> : produk?.length ? (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-[#DED3C2] bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-[#F4EBDD] text-xs uppercase text-[#4A4D52]"><tr><th className="p-4">Produk</th><th className="p-4">Kategori</th><th className="p-4">Harga</th><th className="p-4">Status</th><th className="p-4">Aksi</th></tr></thead>
            <tbody>{produk.map((item) => <tr key={item.id} className="border-t border-[#DED3C2]"><td className="p-4"><strong className="text-[#102A43]">{item.nama}</strong><br/><span className="text-xs text-[#687078]">{item.ukuran} · /{item.slug}</span></td><td className="p-4 capitalize">{item.kategori}</td><td className="p-4 font-bold">{formatRupiah(Number(item.harga))}</td><td className="p-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ${item.aktif ? "bg-[#E5F2EF] text-[#087477]" : "bg-[#F4EBDD] text-[#4A4D52]"}`}>{item.aktif ? "Aktif" : "Nonaktif"}</span></td><td className="p-4"><Link href={`/admin/produk/${item.id}`} className="font-black text-[#087477] hover:underline">Edit →</Link></td></tr>)}</tbody>
          </table>
        </div>
      ) : <div className="mt-6 rounded-2xl border border-dashed border-[#CFC3B2] bg-white p-10 text-center"><h2 className="text-xl font-black text-[#102A43]">Belum ada produk nyata</h2><p className="mt-2 text-sm text-[#282B2F]">Tambahkan produk setelah data dan foto asli tersedia.</p></div>}
    </main>
  );
}
