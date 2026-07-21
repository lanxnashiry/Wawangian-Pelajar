import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { ambilKonfigurasiSupabasePublik } from "./konfigurasi";

export async function buatKlienSupabaseServer() {
  const penyimpananKuki = await cookies();
  const { url, kunciAnon } = ambilKonfigurasiSupabasePublik();

  return createServerClient(url, kunciAnon, {
    cookies: {
      getAll() {
        return penyimpananKuki.getAll();
      },
      setAll(kukiYangDiubah) {
        try {
          kukiYangDiubah.forEach(({ name, value, options }) =>
            penyimpananKuki.set(name, value, options),
          );
        } catch {
          // Komponen Server tidak selalu diizinkan menulis kuki.
        }
      },
    },
  });
}
