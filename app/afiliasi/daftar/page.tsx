import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { daftarAfiliasi } from "./tindakan";

export const metadata: Metadata = { title: "Daftar Afiliasi" };

const kelasInput = "mt-2 h-12 w-full rounded-xl border border-[#CFC3B2] px-4 font-normal outline-none focus:border-[#087477] focus:ring-3 focus:ring-[#087477]/10";

export default async function HalamanDaftarAfiliasi({ searchParams }: { searchParams: Promise<{ pesan?: string }> }) {
  const { pesan } = await searchParams;
  return (
    <main className="bg-[#F4EBDD] px-5 py-10 sm:px-8 sm:py-14">
      <section className="mx-auto w-full max-w-2xl rounded-[2rem] border border-[#DED3C2] bg-white p-6 shadow-xl shadow-[#102A43]/8 sm:p-8">
        <Link href="/" className="inline-flex items-center gap-3 font-black text-[#102A43]"><Image src="/logo-wawangian-pelajar.webp" alt="Logo Wawangian Pelajar" width={48} height={48} className="rounded-xl" /> Wawangian Pelajar</Link>
        <p className="mt-8 text-xs font-black tracking-[0.16em] text-[#087477] uppercase">Pendaftaran individu</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-[#102A43] sm:text-4xl">Daftar Afiliasi Pelajar</h1>
        <p className="mt-3 text-sm leading-6 text-[#282B2F]">Handle marketplace adalah kunci pencocokan laporan penjualan untuk bonus. Minimal satu handle wajib diisi.</p>
        {pesan ? <p role="alert" className="mt-5 rounded-2xl border border-[#e7b7af] bg-[#fff2f0] px-4 py-3 text-sm leading-6 text-[#8c2f24]">{pesan}</p> : null}
        <form action={daftarAfiliasi} className="mt-7 grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-bold text-[#102A43] sm:col-span-2">Nama lengkap<input name="nama" required minLength={3} maxLength={100} autoComplete="name" className={kelasInput} /></label>
          <label className="block text-sm font-bold text-[#102A43]">Email<input name="email" type="email" required autoComplete="email" className={kelasInput} /></label>
          <label className="block text-sm font-bold text-[#102A43]">No. WhatsApp<input name="no_whatsapp" type="tel" required inputMode="tel" placeholder="081234567890" className={kelasInput} /></label>
          <label className="block text-sm font-bold text-[#102A43] sm:col-span-2">Alias untuk leaderboard<input name="alias_publik" required minLength={3} maxLength={30} placeholder="AromaKampus" className={kelasInput} /><span className="mt-2 block text-xs font-normal text-[#4A4D52]">Nama asli, email, WhatsApp, dan handle tidak tampil di leaderboard.</span></label>
          <fieldset className="rounded-2xl border border-[#B6DAD4] bg-[#E5F2EF] p-5 sm:col-span-2">
            <legend className="px-2 text-sm font-black text-[#087477]">Handle afiliasi marketplace · minimal satu</legend>
            <div className="mt-2 grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-bold text-[#102A43]">Username TikTok Shop<input name="handle_tiktok" placeholder="@namakamu" className={kelasInput} /></label>
              <label className="block text-sm font-bold text-[#102A43]">Username Shopee<input name="handle_shopee" placeholder="namakamu" className={kelasInput} /></label>
            </div>
          </fieldset>
          <label className="block text-sm font-bold text-[#102A43] sm:col-span-2">Kata sandi<input name="kata_sandi" type="password" required minLength={12} autoComplete="new-password" className={kelasInput} /><span className="mt-2 block text-xs font-normal text-[#4A4D52]">Minimal 12 karakter. Jangan gunakan kata sandi akun marketplace.</span></label>
          <label className="flex gap-3 rounded-2xl border border-[#E5D4B3] bg-[#FAF7F1] p-4 text-sm leading-6 text-[#6D5426] sm:col-span-2">
            <input name="setuju_aturan" value="ya" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-[#087477]" />
            <span>Saya bergabung sebagai individu, akan berpromosi jujur, tidak banting harga, tidak membuat klaim palsu, dan tidak mengaku didukung IPNU atau organisasi lain.</span>
          </label>
          <button className="min-h-12 rounded-full bg-[#087477] px-6 py-3 text-sm font-black text-white hover:bg-[#075E61] sm:col-span-2">Kirim pendaftaran</button>
        </form>
        <p className="mt-6 text-center text-sm text-[#282B2F]">Sudah terdaftar? <Link href="/afiliasi/masuk" className="font-black text-[#087477]">Masuk ke portal</Link></p>
      </section>
    </main>
  );
}
