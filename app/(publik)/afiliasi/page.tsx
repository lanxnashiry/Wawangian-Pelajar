import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Jadi Afiliasi" };

const langkah = [
  ["01", "Daftar di sini", "Isi profil dan cantumkan minimal satu handle afiliasi TikTok Shop atau Shopee."],
  ["02", "Admin memverifikasi", "Handle diperiksa agar laporan platform dapat dicocokkan dengan tepat."],
  ["03", "Promosikan dan bertumbuh", "Ambil produk di pusat afiliasi platform, lalu gunakan materi promosi yang tersedia."],
];

const manfaat = [
  ["Dua sumber penghasilan", "Komisi dasar dibayar platform. Bonus per pcs dari Wawangian Pelajar dihitung terpisah."],
  ["Tanpa modal stok", "Kamu fokus membuat dan menyebarkan konten; transaksi tetap terjadi di marketplace."],
  ["Ikut berdampak", "Promosi produk ikut memperluas misi Dana Cahaya Pendidikan tanpa klaim dampak palsu."],
];

export default function HalamanAfiliasi() {
  return (
    <main>
      <section className="overflow-hidden bg-[#14223d] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div>
            <p className="text-xs font-black tracking-[0.18em] text-[#e8cb76] uppercase">Program Afiliasi Pelajar</p>
            <h1 className="mt-4 max-w-3xl text-4xl leading-tight font-black tracking-tight sm:text-5xl lg:text-6xl">Jual wangi dari HP-mu, bertumbuh sambil bantu pendidikan.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">Kamu berpromosi melalui program resmi TikTok Shop dan Shopee. Platform melacak serta membayar komisi dasar; kami menambahkan bonus per pcs setelah rekonsiliasi laporan.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/afiliasi/daftar" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0f6b62] px-6 py-3 text-sm font-black text-white hover:bg-[#0b554e]">Daftar jadi afiliasi →</Link>
              <Link href="/afiliasi/masuk" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-black text-white hover:bg-white/10">Sudah terdaftar? Masuk</Link>
            </div>
          </div>
          <aside className="rounded-[2rem] border border-white/15 bg-white/8 p-6 backdrop-blur-sm sm:p-8">
            <p className="text-sm font-black text-[#e8cb76]">Pemisahan yang jelas</p>
            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl bg-white p-5 text-[#14223d]"><p className="text-xs font-black text-slate-500 uppercase">Komisi dasar</p><p className="mt-2 text-lg font-black">Dikelola TikTok Shop / Shopee</p><p className="mt-2 text-sm leading-6 text-slate-600">Nominal resmi dan pencairan diperiksa di dompet marketplace masing-masing.</p></div>
              <div className="rounded-2xl border border-[#e8cb76]/50 bg-[#fffaf0] p-5 text-[#14223d]"><p className="text-xs font-black text-[#8a6508] uppercase">Bonus top-up</p><p className="mt-2 text-lg font-black">Dihitung Wawangian Pelajar per pcs</p><p className="mt-2 text-sm leading-6 text-slate-600">Berdasarkan handle dan laporan platform yang diunggah Admin.</p></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">Cara kerjanya</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#14223d] sm:text-4xl">Tiga langkah yang dapat diperiksa</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">{langkah.map(([nomor, judul, isi]) => <article key={nomor} className="rounded-3xl border border-[#e3e8ef] bg-white p-6"><p className="text-sm font-black text-[#b8860b]">{nomor}</p><h3 className="mt-4 text-xl font-black text-[#14223d]">{judul}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{isi}</p></article>)}</div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <p className="text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">Kenapa ikut?</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">{manfaat.map(([judul, isi]) => <article key={judul} className="rounded-3xl bg-[#f4f6f9] p-6"><h3 className="text-lg font-black text-[#14223d]">{judul}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{isi}</p></article>)}</div>
          <div className="mt-8 rounded-3xl border border-[#ead9a6] bg-[#fffaf0] p-6 text-sm leading-6 text-[#5f4708]"><strong>Aturan utama:</strong> afiliasi adalah individu. Dilarang mengaku didukung organisasi, banting harga, membuat klaim palsu, atau memakai foto produk AI. Pelanggaran dapat membuat akun dinonaktifkan.</div>
        </div>
      </section>
    </main>
  );
}
