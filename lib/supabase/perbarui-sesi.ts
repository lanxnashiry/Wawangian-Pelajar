import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { ambilKonfigurasiSupabasePublik, konfigurasiSupabasePublikTersedia } from "./konfigurasi";

export async function perbaruiSesi(permintaan: NextRequest) {
  if (!konfigurasiSupabasePublikTersedia()) return NextResponse.next({ request: permintaan });

  let respons = NextResponse.next({ request: permintaan });
  const { url, kunciAnon } = ambilKonfigurasiSupabasePublik();
  const supabase = createServerClient(url, kunciAnon, {
    cookies: {
      getAll: () => permintaan.cookies.getAll(),
      setAll(kukiYangDiubah) {
        kukiYangDiubah.forEach(({ name, value }) => permintaan.cookies.set(name, value));
        respons = NextResponse.next({ request: permintaan });
        kukiYangDiubah.forEach(({ name, value, options }) =>
          respons.cookies.set(name, value, options),
        );
      },
    },
  });

  await supabase.auth.getUser();
  return respons;
}
