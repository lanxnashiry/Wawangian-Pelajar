import { wajibAfiliasiAktif } from "@/lib/afiliasi/otorisasi";

const langkah = [
  { judul: "Daftar program afiliasi TikTok Shop", isi: "Ikuti program kreator/afiliasi di aplikasi dan pahami kebijakan komisi platform.", href: "https://shop.tiktok.com/business/id/affiliate?lang=id-ID", label: "Buka panduan resmi TikTok Shop" },
  { judul: "Daftar Shopee Affiliate Program", isi: "Lengkapi pendaftaran memakai akun pribadi dan ikuti ketentuan konten Shopee.", href: "https://shopee.co.id/m/daftar-affiliate", label: "Buka panduan resmi Shopee" },
  { judul: "Ambil produk Wawangian Pelajar", isi: "Cari toko resmi kami pada pusat afiliasi platform, pilih produk yang tersedia, lalu bagikan tautan atau keranjang afiliasi dari platform." },
];

export default async function PanduanAfiliasi() {
  await wajibAfiliasiAktif();
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
      <p className="text-xs font-black tracking-[0.16em] text-[#087477] uppercase">Panduan onboarding</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-[#102A43] sm:text-4xl">Tiga langkah agar penjualanmu terlacak</h1>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-[#282B2F]">Komisi dasar dibayar platform, jadi kamu harus terdaftar pada program afiliasi resmi mereka dan mengambil produk melalui alat yang mereka sediakan.</p>
      <div className="mt-8 grid gap-4">{langkah.map((item, indeks) => <article key={item.judul} className="rounded-3xl border border-[#DED3C2] bg-white p-6 sm:flex sm:gap-6"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E5F2EF] text-sm font-black text-[#087477]">{indeks + 1}</span><div className="mt-4 sm:mt-0"><h2 className="text-lg font-black text-[#102A43]">{item.judul}</h2><p className="mt-2 text-sm leading-6 text-[#282B2F]">{item.isi}</p>{item.href ? <a href={item.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center rounded-full border border-[#087477] px-5 py-2 text-sm font-black text-[#087477] hover:bg-[#E5F2EF]">{item.label} ↗</a> : null}</div></article>)}</div>
      <aside className="mt-6 rounded-3xl border border-[#E5D4B3] bg-[#FAF7F1] p-6 text-sm leading-6 text-[#6D5426]"><strong>Mengapa panduannya ringkas?</strong> Menu dan ketentuan marketplace dapat berubah. Tautan resmi menjadi sumber utama; halaman ini hanya menjaga urutan kerja Wawangian Pelajar.</aside>
    </main>
  );
}
