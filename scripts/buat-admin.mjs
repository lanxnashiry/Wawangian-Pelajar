import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const kunciLayanan = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.ADMIN_EMAIL;
const kataSandi = process.env.ADMIN_PASSWORD;

if (!url || !kunciLayanan || !email || !kataSandi) {
  throw new Error(
    "Isi NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAIL, dan ADMIN_PASSWORD di .env.local sebelum membuat Admin.",
  );
}
if (kataSandi.length < 12) throw new Error("Kata sandi Admin minimal 12 karakter.");

const supabase = createClient(url, kunciLayanan, {
  auth: { autoRefreshToken: false, persistSession: false },
});
const { data: pengguna, error: galatPengguna } = await supabase.auth.admin.createUser({
  email,
  password: kataSandi,
  email_confirm: true,
  user_metadata: { nama: "Pemilik Wawangian Pelajar" },
});
if (galatPengguna || !pengguna.user) {
  throw new Error(`Akun Auth gagal dibuat: ${galatPengguna?.message ?? "pengguna tidak tersedia"}`);
}
const { error: galatAdmin } = await supabase.from("pengguna_admin").upsert({
  pengguna_id: pengguna.user.id,
  nama: "Pemilik Wawangian Pelajar",
  aktif: true,
});
if (galatAdmin) {
  await supabase.auth.admin.deleteUser(pengguna.user.id);
  throw new Error(`Peran Admin gagal dibuat: ${galatAdmin.message}`);
}
console.log(`Admin berhasil dibuat untuk ${email}.`);
