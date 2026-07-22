import { FooterUtama } from "@/components/footer-utama";
import { NavigasiUtama } from "@/components/navigasi-utama";
import { modePratinjauDataContohAktif } from "@/lib/pratinjau/data-contoh";

export default function TataLetakPublik({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const memakaiDataContoh = modePratinjauDataContohAktif();

  return (
    <div className="min-h-svh bg-[#f4f6f9]">
      <NavigasiUtama />
      {memakaiDataContoh ? (
        <aside
          aria-label="Pemberitahuan mode pratinjau"
          className="border-y border-[#e7c75d] bg-[#fff5c9] px-5 py-3 text-[#5f4708] sm:px-8 lg:px-10"
        >
          <p className="mx-auto w-full max-w-7xl text-center text-xs font-bold leading-5 sm:text-sm">
            Mode pratinjau lokal · Produk, artikel, harga, dan angka donasi yang tampil adalah <strong>Data Contoh</strong>, bukan data bisnis atau bukti penyaluran nyata.
          </p>
        </aside>
      ) : null}
      {children}
      <FooterUtama />
    </div>
  );
}
