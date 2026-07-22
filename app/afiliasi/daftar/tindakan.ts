"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { normalisasiHandle } from "@/lib/afiliasi/csv";
import { buatKlienSupabaseServer } from "@/lib/supabase/klien-server";

function kembali(pesan: string): never {
  redirect(`/afiliasi/daftar?pesan=${encodeURIComponent(pesan)}`);
}

export async function daftarAfiliasi(formulir: FormData) {
  const nama = String(formulir.get("nama") ?? "").trim();
  const email = String(formulir.get("email") ?? "").trim().toLowerCase();
  const noWhatsapp = String(formulir.get("no_whatsapp") ?? "").replace(/[\s()-]/g, "");
  const aliasPublik = String(formulir.get("alias_publik") ?? "").trim();
  const handleTiktok = normalisasiHandle(String(formulir.get("handle_tiktok") ?? ""));
  const handleShopee = normalisasiHandle(String(formulir.get("handle_shopee") ?? ""));
  const kataSandi = String(formulir.get("kata_sandi") ?? "");
  const setujuAturan = formulir.get("setuju_aturan") === "ya";

  if (nama.length < 3 || nama.length > 100) kembali("Nama lengkap harus terdiri dari 3–100 karakter.");
  if (!/^\+?[0-9]{9,15}$/.test(noWhatsapp)) kembali("Nomor WhatsApp tidak valid.");
  if (!/^[A-Za-z0-9._-]{3,30}$/.test(aliasPublik)) kembali("Alias hanya boleh berisi huruf, angka, titik, garis bawah, atau tanda hubung.");
  if (!handleTiktok && !handleShopee) kembali("Minimal satu handle TikTok Shop atau Shopee wajib diisi.");
  if ((handleTiktok && !/^[a-z0-9._-]{2,60}$/.test(handleTiktok)) || (handleShopee && !/^[a-z0-9._-]{2,60}$/.test(handleShopee))) {
    kembali("Format handle marketplace tidak valid.");
  }
  if (kataSandi.length < 12) kembali("Kata sandi minimal 12 karakter.");
  if (!setujuAturan) kembali("Kamu wajib menyetujui Aturan Main afiliasi.");

  const kepala = await headers();
  const asal = kepala.get("origin") ?? `${kepala.get("x-forwarded-proto") ?? "http"}://${kepala.get("host") ?? "localhost:3000"}`;
  const supabase = await buatKlienSupabaseServer();
  const { data, error } = await supabase.auth.signUp({
    email,
    password: kataSandi,
    options: {
      emailRedirectTo: `${asal}/auth/konfirmasi?next=/afiliasi/dashboard`,
      data: {
        jenis_akun: "afiliasi",
        nama,
        no_whatsapp: noWhatsapp,
        alias_publik: aliasPublik,
        handle_tiktok: handleTiktok || null,
        handle_shopee: handleShopee || null,
      },
    },
  });

  if (error) kembali(error.message.includes("duplicate") ? "Email, alias, atau handle sudah digunakan." : error.message);
  if (data.session) redirect("/afiliasi/dashboard?pesan=Pendaftaran+terkirim+dan+menunggu+verifikasi+Admin");
  redirect("/afiliasi/masuk?pesan=Periksa+email+untuk+mengonfirmasi+akun,+lalu+masuk.+Pendaftaran+tetap+menunggu+verifikasi+Admin");
}
