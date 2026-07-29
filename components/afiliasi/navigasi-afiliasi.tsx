import Image from "next/image";
import Link from "next/link";
import { keluarAfiliasi } from "@/app/afiliasi/masuk/tindakan";

const menu = [
  { href: "/afiliasi/dashboard", label: "Dasbor" },
  { href: "/afiliasi/panduan", label: "Panduan" },
  { href: "/afiliasi/materi", label: "Materi" },
  { href: "/afiliasi/leaderboard", label: "Leaderboard" },
];

export function NavigasiAfiliasi({ nama, status }: { nama: string; status: string }) {
  return (
    <header className="border-b border-[#DED3C2] bg-[#FAF7F1]">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-4 px-5 py-4 sm:px-8 lg:px-10">
        <Link href="/afiliasi/dashboard" className="mr-auto inline-flex min-w-0 items-center gap-3 font-black text-[#102A43]">
          <Image src="/logo-wawangian-pelajar-simbol.webp" alt="Logo Wawangian Pelajar" width={42} height={42} className="rounded-xl" />
          <span className="truncate">Portal Afiliasi</span>
        </Link>
        <div className="text-right">
          <p className="max-w-40 truncate text-xs font-black text-[#102A43]">{nama}</p>
          <p className="text-[11px] font-bold text-[#087477] capitalize">{status}</p>
        </div>
        <form action={keluarAfiliasi}><button className="rounded-full border border-[#CFC3B2] px-4 py-2 text-xs font-black text-[#282B2F] hover:bg-[#FAF7F1]">Keluar</button></form>
      </div>
      <nav aria-label="Navigasi portal afiliasi" className="gulir-tanpa-bilah mx-auto flex w-full max-w-7xl gap-2 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-10">
        {menu.map((item) => <Link key={item.href} href={item.href} className="shrink-0 rounded-full bg-[#F4EBDD] px-4 py-2 text-sm font-black text-[#282B2F] hover:bg-[#E5F2EF] hover:text-[#087477]">{item.label}</Link>)}
        <Link href="/" className="ml-auto shrink-0 px-3 py-2 text-sm font-bold text-[#687078] hover:text-[#102A43]">Lihat website →</Link>
      </nav>
    </header>
  );
}
