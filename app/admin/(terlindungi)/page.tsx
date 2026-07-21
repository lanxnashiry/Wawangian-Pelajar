import Link from "next/link";
import { wajibAdmin } from "@/lib/admin/otorisasi";

async function hitung(supabase: Awaited<ReturnType<typeof wajibAdmin>>["supabase"], tabel: string, penyaring?: [string, string | boolean]) {
  let kueri = supabase.from(tabel).select("*", { count: "exact", head: true });
  if (penyaring) kueri = kueri.eq(penyaring[0], penyaring[1]);
  const { count } = await kueri;
  return count ?? 0;
}

export default async function DasborAdmin() {
  const { supabase } = await wajibAdmin();
  const [produk, artikelDraft, artikelTerbit, klik] = await Promise.all([
    hitung(supabase, "produk", ["aktif", true]),
    hitung(supabase, "artikel", ["status", "draft"]),
    hitung(supabase, "artikel", ["status", "terbit"]),
    hitung(supabase, "klik_keluar"),
  ]);
  const kartu = [
    ["Produk aktif", produk], ["Artikel draft", artikelDraft],
    ["Artikel terbit", artikelTerbit], ["Klik keluar", klik],
  ];
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">M2 · Data nyata</p>
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
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[#e3e8ef] bg-white p-5">
          <h2 className="font-black text-[#14223d]">Tugas M2</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Isi produk dan artikel setelah data bisnis final tersedia. Donasi, afiliasi, dan log audit belum diaktifkan.</p>
        </div>
        <div className="rounded-2xl border border-[#d5e8e4] bg-[#e7f4f1] p-5">
          <h2 className="font-black text-[#0f6b62]">Akses cepat</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/admin/produk/baru" className="rounded-full bg-[#0f6b62] px-4 py-2 text-sm font-black text-white">Tambah produk</Link>
            <Link href="/admin/konten/baru" className="rounded-full border border-[#0f6b62] px-4 py-2 text-sm font-black text-[#0f6b62]">Tulis artikel</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
