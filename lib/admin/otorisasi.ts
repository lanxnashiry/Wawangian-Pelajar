import { redirect } from "next/navigation";
import { buatKlienSupabaseServer } from "@/lib/supabase/klien-server";

export async function wajibAdmin() {
  const supabase = await buatKlienSupabaseServer();
  const { data: dataPengguna } = await supabase.auth.getUser();
  const pengguna = dataPengguna.user;
  if (!pengguna) redirect("/admin/masuk?pesan=Sesi+Admin+diperlukan");

  const { data: admin, error } = await supabase
    .from("pengguna_admin")
    .select("pengguna_id,nama,aktif")
    .eq("pengguna_id", pengguna.id)
    .eq("aktif", true)
    .maybeSingle();

  if (error || !admin) {
    await supabase.auth.signOut();
    redirect("/admin/masuk?pesan=Akun+belum+memiliki+akses+Admin");
  }

  return { supabase, pengguna, admin };
}
