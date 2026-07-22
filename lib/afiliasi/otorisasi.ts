import { redirect } from "next/navigation";
import { buatKlienSupabaseServer } from "@/lib/supabase/klien-server";

export async function wajibAfiliasi() {
  const supabase = await buatKlienSupabaseServer();
  const { data: dataPengguna } = await supabase.auth.getUser();
  const pengguna = dataPengguna.user;
  if (!pengguna) redirect("/afiliasi/masuk?pesan=Sesi+afiliasi+diperlukan");

  const { data: afiliasi, error } = await supabase
    .from("afiliasi")
    .select("id,pengguna_id,nama,alias_publik,handle_tiktok,handle_shopee,status,alasan_status,bergabung_pada")
    .eq("pengguna_id", pengguna.id)
    .maybeSingle();

  if (error || !afiliasi) {
    await supabase.auth.signOut();
    redirect("/afiliasi/masuk?pesan=Akun+tidak+terdaftar+sebagai+afiliasi");
  }

  return { supabase, pengguna, afiliasi };
}

export async function wajibAfiliasiAktif() {
  const hasil = await wajibAfiliasi();
  if (hasil.afiliasi.status !== "aktif") {
    redirect("/afiliasi/dashboard?pesan=Akses+tersedia+setelah+pendaftaran+diverifikasi+Admin");
  }
  return hasil;
}
