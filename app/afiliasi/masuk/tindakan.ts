"use server";

import { redirect } from "next/navigation";
import { buatKlienSupabaseServer } from "@/lib/supabase/klien-server";

export async function masukAfiliasi(formulir: FormData) {
  const email = String(formulir.get("email") ?? "").trim().toLowerCase();
  const kataSandi = String(formulir.get("kata_sandi") ?? "");
  if (!email || !kataSandi) redirect("/afiliasi/masuk?pesan=Email+dan+kata+sandi+wajib+diisi");

  const supabase = await buatKlienSupabaseServer();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: kataSandi });
  if (error || !data.user) redirect("/afiliasi/masuk?pesan=Email+atau+kata+sandi+tidak+sesuai");

  const { data: profil } = await supabase
    .from("afiliasi")
    .select("id")
    .eq("pengguna_id", data.user.id)
    .maybeSingle();
  if (!profil) {
    await supabase.auth.signOut();
    redirect("/afiliasi/masuk?pesan=Akun+ini+bukan+akun+afiliasi");
  }

  redirect("/afiliasi/dashboard");
}

export async function keluarAfiliasi() {
  const supabase = await buatKlienSupabaseServer();
  await supabase.auth.signOut();
  redirect("/afiliasi/masuk?pesan=Kamu+berhasil+keluar");
}
