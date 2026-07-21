"use server";

import { redirect } from "next/navigation";
import { buatKlienSupabaseServer } from "@/lib/supabase/klien-server";

export async function simpanKataSandiAdmin(formulir: FormData) {
  const kataSandi = String(formulir.get("kata_sandi") ?? "");
  const konfirmasi = String(formulir.get("konfirmasi_kata_sandi") ?? "");

  if (kataSandi.length < 12) {
    redirect("/admin/undangan?pesan=Kata+sandi+minimal+12+karakter");
  }
  if (kataSandi !== konfirmasi) {
    redirect("/admin/undangan?pesan=Konfirmasi+kata+sandi+tidak+sama");
  }

  const supabase = await buatKlienSupabaseServer();
  const { data: identitas } = await supabase.auth.getUser();
  if (!identitas.user) {
    redirect("/admin/masuk?pesan=Sesi+undangan+tidak+tersedia+atau+sudah+kedaluwarsa");
  }

  const { data: admin } = await supabase
    .from("pengguna_admin")
    .select("pengguna_id")
    .eq("pengguna_id", identitas.user.id)
    .eq("aktif", true)
    .maybeSingle();
  if (!admin) {
    await supabase.auth.signOut();
    redirect("/admin/masuk?pesan=Akun+belum+memiliki+akses+Admin");
  }

  const { error } = await supabase.auth.updateUser({ password: kataSandi });
  if (error) {
    redirect("/admin/undangan?pesan=Kata+sandi+gagal+disimpan.+Silakan+coba+lagi");
  }

  redirect("/admin");
}
