import { NavigasiAdmin } from "@/components/admin/navigasi-admin";
import { wajibAdmin } from "@/lib/admin/otorisasi";

export default async function TataLetakAdminTerlindungi({ children }: Readonly<{ children: React.ReactNode }>) {
  const { admin } = await wajibAdmin();
  return (
    <div className="min-h-svh bg-[#f4f6f9] lg:flex">
      <NavigasiAdmin nama={admin.nama} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
