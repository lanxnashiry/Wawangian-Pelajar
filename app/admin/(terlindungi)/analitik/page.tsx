import { wajibAdmin } from "@/lib/admin/otorisasi";

type BarisKlik = { marketplace_tujuan: "shopee" | "tiktok"; produk: { nama: string } | { nama: string }[] | null };

export default async function AnalitikKlikAdmin() {
  const { supabase } = await wajibAdmin();
  const { data, error } = await supabase.from("klik_keluar").select("marketplace_tujuan,produk:produk_id(nama)");
  const baris = (data ?? []) as BarisKlik[];
  const shopee = baris.filter((item) => item.marketplace_tujuan === "shopee").length;
  const tiktok = baris.length - shopee;
  const perProduk = new Map<string, { total: number; shopee: number; tiktok: number }>();
  for (const item of baris) {
    const relasi = Array.isArray(item.produk) ? item.produk[0] : item.produk;
    const nama = relasi?.nama ?? "Produk tidak dikenal";
    const nilai = perProduk.get(nama) ?? { total: 0, shopee: 0, tiktok: 0 };
    nilai.total += 1; nilai[item.marketplace_tujuan] += 1; perProduk.set(nama, nilai);
  }
  return <main className="p-5 sm:p-8 lg:p-10"><p className="text-xs font-black tracking-[0.16em] text-[#087477] uppercase">Minat beli, bukan komisi</p><h1 className="mt-3 text-3xl font-black text-[#102A43]">Analitik Klik-Keluar</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[#282B2F]">Tombol marketplace M4 mengirim satu klik saat pengunjung membuka toko resmi. Data ini hanya mengukur minat produk dan tidak digunakan untuk komisi afiliasi.</p>
    {error ? <p className="mt-6 rounded-2xl bg-[#fff2f0] p-5 text-sm text-[#9e3024]">Analitik belum siap: {error.message}</p> : <><div className="mt-8 grid grid-cols-3 gap-3">{[["Total klik", baris.length], ["Shopee", shopee], ["TikTok", tiktok]].map(([label, nilai]) => <article key={String(label)} className="rounded-2xl bg-[#102A43] p-5 text-white"><p className="text-3xl font-black text-[#D1B779]">{nilai}</p><p className="mt-2 text-xs text-[#D9E1E8]">{label}</p></article>)}</div>{perProduk.size ? <div className="mt-6 overflow-x-auto rounded-2xl border border-[#DED3C2] bg-white"><table className="w-full min-w-[560px] text-left text-sm"><thead className="bg-[#F4EBDD]"><tr><th className="p-4">Produk</th><th className="p-4">Total</th><th className="p-4">Shopee</th><th className="p-4">TikTok</th></tr></thead><tbody>{[...perProduk.entries()].sort((a,b) => b[1].total-a[1].total).map(([nama,nilai]) => <tr key={nama} className="border-t border-[#DED3C2]"><td className="p-4 font-bold">{nama}</td><td className="p-4">{nilai.total}</td><td className="p-4">{nilai.shopee}</td><td className="p-4">{nilai.tiktok}</td></tr>)}</tbody></table></div> : <div className="mt-6 rounded-2xl border border-dashed border-[#CFC3B2] bg-white p-10 text-center"><h2 className="text-xl font-black text-[#102A43]">Belum ada klik nyata</h2><p className="mt-2 text-sm text-[#282B2F]">Belum ada pengunjung yang membuka tautan Produk.</p></div>}</>}
  </main>;
}
