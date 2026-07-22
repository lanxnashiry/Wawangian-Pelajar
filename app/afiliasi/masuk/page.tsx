import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { masukAfiliasi } from "./tindakan";

export const metadata: Metadata = { title: "Masuk Portal Afiliasi" };

export default async function HalamanMasukAfiliasi({ searchParams }: { searchParams: Promise<{ pesan?: string }> }) {
  const { pesan } = await searchParams;
  return (
    <main className="flex min-h-svh items-center justify-center bg-[#f4f6f9] px-5 py-12">
      <section className="w-full max-w-md rounded-[2rem] border border-[#e3e8ef] bg-white p-6 shadow-xl shadow-[#14223d]/8 sm:p-8">
        <Link href="/" className="inline-flex items-center gap-3 font-black text-[#14223d]">
          <Image src="/ikon-logo-sementara.svg" alt="" width={40} height={40} /> Wawangian Pelajar
        </Link>
        <p className="mt-8 text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">Portal Afiliasi Pelajar</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-[#14223d]">Masuk dan lanjut berkarya</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">Gunakan email akun afiliasi. Pembeli tidak memerlukan akun untuk menjelajah website.</p>
        {pesan ? <p role="status" className="mt-5 rounded-2xl border border-[#ead9a6] bg-[#fffaf0] px-4 py-3 text-sm leading-6 text-[#70510a]">{pesan}</p> : null}
        <form action={masukAfiliasi} className="mt-6 space-y-5">
          <label className="block text-sm font-bold text-[#14223d]">Email
            <input name="email" type="email" required autoComplete="username" className="mt-2 h-12 w-full rounded-xl border border-[#cbd4e1] px-4 font-normal outline-none focus:border-[#0f6b62] focus:ring-3 focus:ring-[#0f6b62]/10" />
          </label>
          <label className="block text-sm font-bold text-[#14223d]">Kata sandi
            <input name="kata_sandi" type="password" required minLength={12} autoComplete="current-password" className="mt-2 h-12 w-full rounded-xl border border-[#cbd4e1] px-4 font-normal outline-none focus:border-[#0f6b62] focus:ring-3 focus:ring-[#0f6b62]/10" />
          </label>
          <button className="min-h-12 w-full rounded-full bg-[#0f6b62] px-5 py-3 text-sm font-black text-white hover:bg-[#0b554e]">Masuk ke portal</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">Belum punya akun? <Link href="/afiliasi/daftar" className="font-black text-[#0f6b62]">Daftar jadi afiliasi</Link></p>
        <Link href="/afiliasi" className="mt-4 block text-center text-xs font-bold text-slate-400 hover:text-[#14223d]">← Kembali ke program afiliasi</Link>
      </section>
    </main>
  );
}
