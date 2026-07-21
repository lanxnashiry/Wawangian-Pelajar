"use client";

import { createBrowserClient } from "@supabase/ssr";
import { ambilKonfigurasiSupabasePublik } from "./konfigurasi";

export function buatKlienSupabaseBrowser() {
  const { url, kunciAnon } = ambilKonfigurasiSupabasePublik();

  return createBrowserClient(url, kunciAnon);
}
