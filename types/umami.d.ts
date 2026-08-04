/**
 * Deklarasi tipe untuk tracker Umami (analitik pengunjung, self-host).
 *
 * Skrip Umami menyuntikkan objek global `window.umami` saat berhasil dimuat.
 * Objek ini bersifat opsional karena tracker tidak ada di localhost, tidak ada
 * ketika `NEXT_PUBLIC_UMAMI_ID_SITUS` belum diisi, dan bisa juga diblokir
 * pengguna. Karena itu setiap pemakaian wajib dicek dulu keberadaannya.
 */
type DataEventUmami = Record<string, string | number | boolean>;

interface PelacakUmami {
  /** Catat event kustom, mis. umami.track("klik-beli", { marketplace: "shopee" }). */
  track: (namaEvent: string, dataEvent?: DataEventUmami) => void;
  /** Kaitkan sesi dengan identitas tertentu (tidak dipakai di situs ini). */
  identify?: (dataSesi: DataEventUmami) => void;
}

interface Window {
  umami?: PelacakUmami;
}
