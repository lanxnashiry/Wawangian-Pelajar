type KonfigurasiSupabasePublik = {
  url: string;
  kunciAnon: string;
};

export function ambilKonfigurasiSupabasePublik(): KonfigurasiSupabasePublik {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const kunciAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !kunciAnon) {
    throw new Error(
      "Konfigurasi Supabase belum lengkap. Isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di .env.local.",
    );
  }

  return { url, kunciAnon };
}
