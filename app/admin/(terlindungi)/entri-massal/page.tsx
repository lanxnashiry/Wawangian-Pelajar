import Link from "next/link";
import { FormulirEntriMassal } from "@/components/admin/formulir-entri-massal";
import { wajibAdmin } from "@/lib/admin/otorisasi";

export default async function HalamanEntriMassal() {
  await wajibAdmin();
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <p className="text-xs font-black tracking-[0.16em] text-[#087477] uppercase">Operasional Admin</p>
      <h1 className="mt-3 text-3xl font-black text-[#102A43] sm:text-4xl">Entri massal Produk & Artikel</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-[#4A4D52]">
        Isi satu workbook Excel, periksa setiap baris, lalu impor dalam satu transaksi. Sistem tidak pernah menimpa slug yang sudah ada dan seluruh Artikel disimpan sebagai draft.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <section className="rounded-2xl border border-[#CFE5E0] bg-[#E5F2EF] p-5 lg:col-span-2">
          <h2 className="font-black text-[#087477]">Alur aman 3 langkah</h2>
          <ol className="mt-3 grid gap-3 text-sm leading-6 text-[#102A43] sm:grid-cols-3">
            <li><strong>1.</strong> Unduh template dan isi sheet Produk/Artikel.</li>
            <li><strong>2.</strong> Unggah untuk pratinjau—belum ada data disimpan.</li>
            <li><strong>3.</strong> Perbaiki semua galat, lalu impor atomik.</li>
          </ol>
        </section>
        <aside className="rounded-2xl border border-[#DED3C2] bg-white p-5">
          <Link href="/admin/entri-massal/template" className="inline-flex min-h-11 items-center rounded-full bg-[#102A43] px-5 py-2 text-sm font-black text-white">Unduh template .xlsx</Link>
          <p className="mt-3 text-xs leading-5 text-[#4A4D52]">Template memuat dropdown, petunjuk, dan header yang tidak boleh diubah.</p>
        </aside>
      </div>

      <div className="mt-6 rounded-2xl border border-[#F0D9A7] bg-[#FFF8E8] p-5 text-sm leading-6 text-[#6D5426]">
        <strong>Batas versi pertama:</strong> hanya membuat data baru. Foto berupa URL HTTPS opsional; unggah kumpulan gambar dan mode menimpa data lama tidak didukung. Ini sengaja untuk mencegah kerusakan massal.
      </div>
      <FormulirEntriMassal />
    </main>
  );
}
