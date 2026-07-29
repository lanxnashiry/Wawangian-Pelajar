import { FooterUtama } from "@/components/footer-utama";
import { NavigasiUtama } from "@/components/navigasi-utama";
import { modePratinjauDataContohAktif } from "@/lib/pratinjau/data-contoh";

export default function TataLetakPublik({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const memakaiDataContoh = modePratinjauDataContohAktif();

  return (
    <div className="min-h-svh bg-[#F4EBDD]">
      <NavigasiUtama />
      {memakaiDataContoh ? (
        <aside
          aria-label="Pemberitahuan mode pratinjau"
          className="border-y border-[#D1B779] bg-[#F6EACD] px-5 py-3 text-[#6D5426] sm:px-8 lg:px-10"
        >
          <p className="mx-auto w-full max-w-7xl text-center text-xs font-bold leading-5 sm:text-sm">
            Mode peninjauan MVP · Produk, artikel, harga, dan angka donasi yang tampil adalah <strong>Data Contoh</strong>, bukan data bisnis atau bukti penyaluran nyata.
          </p>
        </aside>
      ) : null}
      {children}
      <FooterUtama />
    </div>
  );
}
