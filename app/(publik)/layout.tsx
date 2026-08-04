import { FooterUtama } from "@/components/footer-utama";
import { NavigasiUtama } from "@/components/navigasi-utama";

export default function TataLetakPublik({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-svh bg-[#F4EBDD]">
      <NavigasiUtama />
      {children}
      <FooterUtama />
    </div>
  );
}
