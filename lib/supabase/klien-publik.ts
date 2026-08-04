import { createClient } from "@supabase/supabase-js";
import { ambilKonfigurasiSupabasePublik } from "./konfigurasi";

export function buatKlienSupabasePublik() {
  const { url, kunciAnon } = ambilKonfigurasiSupabasePublik();
  return createClient(url, kunciAnon, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
