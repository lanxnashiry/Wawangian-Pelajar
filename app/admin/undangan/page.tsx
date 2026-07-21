import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buatKlienSupabaseServer } from "@/lib/supabase/klien-server";
import { PemrosesUndangan } from "./pemroses-undangan";
import { simpanKataSandiAdmin } from "./tindakan";

export const metadata: Metadata = { title: "Aktifkan Akun Admin" };

type PropertiHalaman = { searchParams: Promise<{ pesan?: string }> };

export default async function HalamanUndanganAdmin({ searchParams }: PropertiHalaman) {
  const { pesan } = await searchParams;
  const supabase = await buatKlienSupabaseServer();
  const { data } = await supabase.auth.getUser();

  return (
    <main className="flex min-h-svh items-center justify-center bg-[#f4f6f9] px-5 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-[#e3e8ef] bg-white p-6 shadow-xl shadow-[#14223d]/8 sm:p-8">
        <Link href="/" className="inline-flex items-center gap-3 font-black text-[#14223d]">
          <Image src="/ikon-logo-sementara.svg" alt="" width={40} height={40} />
          Wawangian Pelajar
        </Link>
        <p className="mt-8 text-xs font-black tracking-[0.16em] text-[#0f6b62] uppercase">
          Aktivasi Admin
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-[#14223d]">
          Buat kata sandi Admin
        </h1>

        {data.user ? (
          <>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Undangan untuk <strong>{data.user.email}</strong> sudah terverifikasi. Buat kata sandi
              yang hanya kamu ketahui untuk masuk ke panel.
            </p>
            {pesan ? (
              <p
                role="status"
                className="mt-5 rounded-2xl border border-[#ead9a6] bg-[#fffaf0] px-4 py-3 text-sm text-[#70510a]"
              >
                {pesan}
              </p>
            ) : null}
            <form action={simpanKataSandiAdmin} className="mt-6 space-y-5">
              <label className="block text-sm font-bold text-[#14223d]">
                Kata sandi baru
                <input
                  name="kata_sandi"
                  type="password"
                  required
                  minLength={12}
                  autoComplete="new-password"
                  className="mt-2 h-12 w-full rounded-xl border border-[#cbd4e1] px-4 font-normal outline-none focus:border-[#0f6b62] focus:ring-3 focus:ring-[#0f6b62]/10"
                />
              </label>
              <label className="block text-sm font-bold text-[#14223d]">
                Ulangi kata sandi
                <input
                  name="konfirmasi_kata_sandi"
                  type="password"
                  required
                  minLength={12}
                  autoComplete="new-password"
                  className="mt-2 h-12 w-full rounded-xl border border-[#cbd4e1] px-4 font-normal outline-none focus:border-[#0f6b62] focus:ring-3 focus:ring-[#0f6b62]/10"
                />
              </label>
              <button className="min-h-12 w-full rounded-full bg-[#0f6b62] px-5 py-3 text-sm font-black text-white hover:bg-[#0b554e]">
                Simpan dan buka panel
              </button>
            </form>
          </>
        ) : (
          <PemrosesUndangan />
        )}

        <p className="mt-6 text-center text-xs leading-5 text-slate-400">
          Kata sandi dikirim langsung ke Supabase Auth dan tidak disimpan di repository.
        </p>
      </div>
    </main>
  );
}
