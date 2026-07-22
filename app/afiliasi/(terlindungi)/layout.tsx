import { NavigasiAfiliasi } from "@/components/afiliasi/navigasi-afiliasi";
import { wajibAfiliasi } from "@/lib/afiliasi/otorisasi";

export default async function TataLetakPortalAfiliasi({ children }: Readonly<{ children: React.ReactNode }>) {
  const { afiliasi } = await wajibAfiliasi();
  return (
    <div className="min-h-svh bg-[#f4f6f9]">
      <NavigasiAfiliasi nama={afiliasi.nama} status={afiliasi.status} />
      {children}
    </div>
  );
}
