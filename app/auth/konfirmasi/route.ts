import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { buatKlienSupabaseServer } from "@/lib/supabase/klien-server";

function tujuanAman(nilai: string | null) {
  if (!nilai || !nilai.startsWith("/") || nilai.startsWith("//")) {
    return "/admin/undangan";
  }

  return nilai;
}

const tipeYangDidukung: EmailOtpType[] = ["invite", "signup"];

export async function GET(permintaan: NextRequest) {
  const tokenHash = permintaan.nextUrl.searchParams.get("token_hash");
  const tipe = permintaan.nextUrl.searchParams.get("type") as EmailOtpType | null;
  const tujuan = tujuanAman(permintaan.nextUrl.searchParams.get("next"));

  if (tokenHash && tipe && tipeYangDidukung.includes(tipe)) {
    const supabase = await buatKlienSupabaseServer();
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: tipe,
    });

    if (!error) {
      return NextResponse.redirect(new URL(tujuan, permintaan.url));
    }
  }

  const tujuanAfiliasi = tujuan.startsWith("/afiliasi");
  const galat = new URL(tujuanAfiliasi ? "/afiliasi/masuk" : "/admin/masuk", permintaan.url);
  galat.searchParams.set(
    "pesan",
    tujuanAfiliasi
      ? "Tautan konfirmasi tidak valid atau sudah kedaluwarsa. Coba daftar kembali."
      : "Tautan undangan tidak valid atau sudah kedaluwarsa. Minta undangan Admin baru.",
  );
  return NextResponse.redirect(galat);
}
