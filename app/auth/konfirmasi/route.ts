import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { buatKlienSupabaseServer } from "@/lib/supabase/klien-server";

function tujuanAman(nilai: string | null) {
  if (!nilai || !nilai.startsWith("/") || nilai.startsWith("//")) {
    return "/admin/undangan";
  }

  return nilai;
}

export async function GET(permintaan: NextRequest) {
  const tokenHash = permintaan.nextUrl.searchParams.get("token_hash");
  const tipe = permintaan.nextUrl.searchParams.get("type");
  const tujuan = tujuanAman(permintaan.nextUrl.searchParams.get("next"));

  if (tokenHash && tipe === "invite") {
    const supabase = await buatKlienSupabaseServer();
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: "invite",
    });

    if (!error) {
      return NextResponse.redirect(new URL(tujuan, permintaan.url));
    }
  }

  const galat = new URL("/admin/masuk", permintaan.url);
  galat.searchParams.set(
    "pesan",
    "Tautan undangan tidak valid atau sudah kedaluwarsa. Minta undangan Admin baru.",
  );
  return NextResponse.redirect(galat);
}
