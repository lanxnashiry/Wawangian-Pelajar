"use server";

import { redirect } from "next/navigation";
import { buatKlienSupabaseServer } from "@/lib/supabase/klien-server";

export async function masukAdmin(formulir: FormData) {
  const email = String(formulir.get("email") ?? "").trim();
  const kataSandi = String(formulir.get("kata_sandi") ?? "");
  if (!email || !kataSandi) redirect("/admin/masuk?pesan=Email+dan+kata+sandi+wajib+diisi");

  const supabase = await buatKlienSupabaseServer();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: kataSandi,
  });
  if (error || !data.user) redirect("/admin/masuk?pesan=Email+atau+kata+sandi+tidak+sesuai");

  const { data: admin } = await supabase
    .from("pengguna_admin")
    .select("pengguna_id")
    .eq("pengguna_id", data.user.id)
    .eq("aktif", true)
    .maybeSingle();
  if (!admin) {
    await supabase.auth.signOut();
    redirect("/admin/masuk?pesan=Akun+belum+memiliki+akses+Admin");
  }

  redirect("/admin");
}

export async function keluarAdmin() {
  const supabase = await buatKlienSupabaseServer();
  await supabase.auth.signOut();
  redirect("/admin/masuk?pesan=Kamu+berhasil+keluar");
}
