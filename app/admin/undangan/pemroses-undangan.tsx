"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { buatKlienSupabaseBrowser } from "@/lib/supabase/klien-browser";

export function PemrosesUndangan() {
  const router = useRouter();
  const [pesan, setPesan] = useState("Memverifikasi tautan undangan…");

  useEffect(() => {
    async function verifikasi() {
      const parameterHash = new URLSearchParams(window.location.hash.slice(1));
      const parameterKueri = new URLSearchParams(window.location.search);
      const galat = parameterHash.get("error_description");

      if (galat) {
        setPesan(`Undangan gagal diverifikasi: ${galat}`);
        return;
      }

      const supabase = buatKlienSupabaseBrowser();
      const tokenAkses = parameterHash.get("access_token");
      const tokenPenyegaran = parameterHash.get("refresh_token");
      const kode = parameterKueri.get("code");

      const hasil = tokenAkses && tokenPenyegaran
        ? await supabase.auth.setSession({
            access_token: tokenAkses,
            refresh_token: tokenPenyegaran,
          })
        : kode
          ? await supabase.auth.exchangeCodeForSession(kode)
          : null;

      if (!hasil) {
        setPesan("Sesi undangan tidak ditemukan. Minta tautan Admin baru.");
        return;
      }
      if (hasil.error) {
        setPesan("Tautan undangan tidak valid atau sudah kedaluwarsa.");
        return;
      }

      window.history.replaceState(null, "", "/admin/undangan");
      router.refresh();
    }

    void verifikasi();
  }, [router]);

  return (
    <p
      role="status"
      className="mt-5 rounded-2xl border border-[#ead9a6] bg-[#fffaf0] p-5 text-sm leading-6 text-[#70510a]"
    >
      {pesan}
    </p>
  );
}
