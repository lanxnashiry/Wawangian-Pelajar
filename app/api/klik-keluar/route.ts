import { NextResponse } from "next/server";
import { buatKlienSupabaseServer } from "@/lib/supabase/klien-server";

type MuatanKlik = { produkId?: string; marketplace?: "shopee" | "tiktok" };

export async function POST(permintaan: Request) {
  let muatan: MuatanKlik;
  try { muatan = await permintaan.json(); }
  catch { return NextResponse.json({ pesan: "Muatan klik tidak valid." }, { status: 400 }); }

  if (!muatan.produkId || !["shopee", "tiktok"].includes(muatan.marketplace ?? "")) {
    return NextResponse.json({ pesan: "Produk dan marketplace wajib diisi." }, { status: 400 });
  }

  const supabase = await buatKlienSupabaseServer();
  const { error } = await supabase.rpc("catat_klik_keluar", {
    id_produk: muatan.produkId,
    tujuan: muatan.marketplace,
  });
  if (error) return NextResponse.json({ pesan: "Klik belum dapat dicatat." }, { status: 422 });
  return NextResponse.json({ berhasil: true }, { status: 201 });
}
