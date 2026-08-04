import Script from "next/script";

/**
 * Tracker Umami (analitik pengunjung, self-host).
 *
 * Aman secara bawaan: kalau `NEXT_PUBLIC_UMAMI_ID_SITUS` belum diisi, komponen
 * ini tidak merender apa pun. Jadi build dan deploy tetap jalan meskipun
 * instance Umami belum berdiri.
 *
 * `data-domains` membatasi pencatatan hanya pada domain produksi, sehingga
 * kunjungan dari localhost dan Vercel Preview tidak mengotori data nyata.
 */
export function AnalitikUmami() {
  const idSitus = process.env.NEXT_PUBLIC_UMAMI_ID_SITUS;

  if (!idSitus) {
    return null;
  }

  const urlSkrip =
    process.env.NEXT_PUBLIC_UMAMI_URL_SKRIP ?? "/stats/script.js";

  return (
    <Script
      defer
      src={urlSkrip}
      data-website-id={idSitus}
      data-domains="wawangianpelajar.com,www.wawangianpelajar.com"
      data-do-not-track="true"
      strategy="afterInteractive"
    />
  );
}
