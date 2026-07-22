import Link from "next/link";
import { keluarAdmin } from "@/app/admin/masuk/tindakan";

const menu = [
  { href: "/admin", label: "Dasbor" },
  { href: "/admin/produk", label: "Produk" },
  { href: "/admin/donasi", label: "Donasi" },
  { href: "/admin/konten", label: "Konten" },
  { href: "/admin/analitik", label: "Analitik Klik" },
  { href: "/admin/log", label: "Log Audit" },
];

export function NavigasiAdmin({ nama }: { nama: string }) {
  return (
    <aside className="border-b border-white/10 bg-[#14223d] text-white lg:min-h-svh lg:w-64 lg:border-r lg:border-b-0">
      <div className="px-5 py-5">
        <Link href="/admin" className="text-lg font-black">Admin WP</Link>
        <p className="mt-1 truncate text-xs text-slate-400">{nama}</p>
      </div>
      <nav aria-label="Navigasi Admin" className="gulir-tanpa-bilah flex gap-2 overflow-x-auto px-4 pb-4 lg:flex-col lg:overflow-visible">
        {menu.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0 rounded-xl px-4 py-3 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white">{item.label}</Link>
        ))}
      </nav>
      <div className="px-4 pb-5 lg:mt-8">
        <form action={keluarAdmin}>
          <button className="w-full rounded-xl border border-white/20 px-4 py-3 text-left text-sm font-bold text-slate-300 hover:bg-white/10 hover:text-white">Keluar</button>
        </form>
        <Link href="/" className="mt-2 block px-4 py-2 text-xs text-slate-400 hover:text-white">← Lihat website</Link>
      </div>
    </aside>
  );
}
