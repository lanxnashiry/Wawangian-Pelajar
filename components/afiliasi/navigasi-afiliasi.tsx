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
    <header className="border-b border-[#e3e8ef] bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-4 px-5 py-4 sm:px-8 lg:px-10">
        <Link href="/afiliasi/dashboard" className="mr-auto inline-flex min-w-0 items-center gap-3 font-black text-[#14223d]">
          <Image src="/ikon-logo-sementara.svg" alt="" width={38} height={38} />
          <span className="truncate">Portal Afiliasi</span>
        </Link>
        <div className="text-right">
          <p className="max-w-40 truncate text-xs font-black text-[#14223d]">{nama}</p>
          <p className="text-[11px] font-bold text-[#0f6b62] capitalize">{status}</p>
        </div>
        <form action={keluarAfiliasi}><button className="rounded-full border border-[#cbd4e1] px-4 py-2 text-xs font-black text-slate-600 hover:bg-slate-50">Keluar</button></form>
      </div>
      <nav aria-label="Navigasi portal afiliasi" className="gulir-tanpa-bilah mx-auto flex w-full max-w-7xl gap-2 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-10">
        {menu.map((item) => <Link key={item.href} href={item.href} className="shrink-0 rounded-full bg-[#f4f6f9] px-4 py-2 text-sm font-black text-slate-600 hover:bg-[#e7f4f1] hover:text-[#0f6b62]">{item.label}</Link>)}
        <Link href="/" className="ml-auto shrink-0 px-3 py-2 text-sm font-bold text-slate-400 hover:text-[#14223d]">Lihat website →</Link>
      </nav>
    </header>
  );
}
