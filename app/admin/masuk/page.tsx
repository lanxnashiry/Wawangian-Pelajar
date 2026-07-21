import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { masukAdmin } from "./tindakan";

export const metadata: Metadata = { title: "Masuk Admin" };

type PropertiHalaman = { searchParams: Promise<{ pesan?: string }> };

export default async function HalamanMasukAdmin({ searchParams }: PropertiHalaman) {
  const { pesan } = await searchParams;
  return (
    <main className="flex min-h-svh items-center justify-center bg-[#f4f6f9] px-5 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-[#e3e8ef] bg-white p-6 shadow-xl shadow-[#14223d]/8 sm:p-8">
        <Link href="/" className="inline-flex items-center gap-3 font-black text-[#14223d]">
          <Image src="/ikon-logo-sementara.svg" alt="" width={40} height={40} />
          Wawangian Pelajar
        </Link>
        <p className="mt-8 text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">Panel pengelola</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-[#14223d]">Masuk sebagai Admin</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">Akses ini hanya untuk satu Admin resmi. Pembeli tidak memerlukan akun.</p>

        {pesan ? (
          <p role="status" className="mt-5 rounded-2xl border border-[#ead9a6] bg-[#fffaf0] px-4 py-3 text-sm text-[#70510a]">{pesan}</p>
        ) : null}

        <form action={masukAdmin} className="mt-6 space-y-5">
          <label className="block text-sm font-bold text-[#14223d]">
            Email Admin
            <input name="email" type="email" required autoComplete="username" className="mt-2 h-12 w-full rounded-xl border border-[#cbd4e1] px-4 font-normal outline-none focus:border-[#0f6b62] focus:ring-3 focus:ring-[#0f6b62]/10" />
          </label>
          <label className="block text-sm font-bold text-[#14223d]">
            Kata sandi
            <input name="kata_sandi" type="password" required minLength={12} autoComplete="current-password" className="mt-2 h-12 w-full rounded-xl border border-[#cbd4e1] px-4 font-normal outline-none focus:border-[#0f6b62] focus:ring-3 focus:ring-[#0f6b62]/10" />
          </label>
          <button className="min-h-12 w-full rounded-full bg-[#0f6b62] px-5 py-3 text-sm font-black text-white hover:bg-[#0b554e]">Masuk ke panel</button>
        </form>
        <p className="mt-6 text-center text-xs leading-5 text-slate-400">Kredensial Admin tidak disimpan di repository atau README.</p>
      </div>
    </main>
  );
}
