import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { masukAfiliasi } from "./tindakan";

export const metadata: Metadata = { title: "Masuk Portal Afiliasi" };

export default async function HalamanMasukAfiliasi({ searchParams }: { searchParams: Promise<{ pesan?: string }> }) {
  const { pesan } = await searchParams;
  return (
    <main className="flex min-h-svh items-center justify-center bg-[#F4EBDD] px-5 py-12">
      <section className="w-full max-w-md rounded-[2rem] border border-[#DED3C2] bg-white p-6 shadow-xl shadow-[#102A43]/8 sm:p-8">
        <Link href="/" className="inline-flex items-center gap-3 font-black text-[#102A43]">
          <Image src="/logo-wawangian-pelajar-resmi.png" alt="Monogram WAWANGIAN PELAJAR" width={48} height={48} className="rounded-xl" /> Wawangian Pelajar
        </Link>
        <p className="mt-8 text-xs font-black tracking-[0.16em] text-[#087477] uppercase">Portal Afiliasi Pelajar</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-[#102A43]">Masuk dan lanjut berkarya</h1>
        <p className="mt-3 text-sm leading-6 text-[#282B2F]">Gunakan email akun afiliasi. Pembeli tidak memerlukan akun untuk menjelajah website.</p>
        {pesan ? <p role="status" className="mt-5 rounded-2xl border border-[#E5D4B3] bg-[#FAF7F1] px-4 py-3 text-sm leading-6 text-[#6D5426]">{pesan}</p> : null}
        <form action={masukAfiliasi} className="mt-6 space-y-5">
          <label className="block text-sm font-bold text-[#102A43]">Email
            <input name="email" type="email" required autoComplete="username" className="mt-2 h-12 w-full rounded-xl border border-[#CFC3B2] px-4 font-normal outline-none focus:border-[#087477] focus:ring-3 focus:ring-[#087477]/10" />
          </label>
          <label className="block text-sm font-bold text-[#102A43]">Kata sandi
            <input name="kata_sandi" type="password" required minLength={12} autoComplete="current-password" className="mt-2 h-12 w-full rounded-xl border border-[#CFC3B2] px-4 font-normal outline-none focus:border-[#087477] focus:ring-3 focus:ring-[#087477]/10" />
          </label>
          <button className="min-h-12 w-full rounded-full bg-[#087477] px-5 py-3 text-sm font-black text-white hover:bg-[#075E61]">Masuk ke portal</button>
        </form>
        <p className="mt-6 text-center text-sm text-[#282B2F]">Belum punya akun? <Link href="/afiliasi/daftar" className="font-black text-[#087477]">Daftar jadi afiliasi</Link></p>
        <Link href="/afiliasi" className="mt-4 block text-center text-xs font-bold text-[#687078] hover:text-[#102A43]">← Kembali ke program afiliasi</Link>
      </section>
    </main>
  );
}
