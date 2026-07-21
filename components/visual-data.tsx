import Image from "next/image";
import { PlaceholderVisual } from "./placeholder-visual";
import type { Produk } from "@/data/produk";
import type { Artikel } from "@/data/artikel";

export function VisualProduk({ produk, ringkas = false }: { produk: Produk; ringkas?: boolean }) {
  const sumber = produk.foto?.[0];
  if (!sumber) return <PlaceholderVisual warna={produk.warna} ringkas={ringkas}/>;
  return <div className={`relative overflow-hidden bg-white ${ringkas ? "aspect-[4/3]" : "aspect-square"}`}><Image src={sumber} alt={`Foto asli ${produk.nama}`} fill sizes={ringkas ? "(max-width: 768px) 50vw, 25vw" : "(max-width: 1024px) 100vw, 50vw"} className="object-cover" unoptimized/></div>;
}

export function VisualArtikel({ artikel, ringkas = false }: { artikel: Artikel; ringkas?: boolean }) {
  if (!artikel.fotoUtama) return <PlaceholderVisual judul="Ilustrasi artikel sementara" warna={artikel.warna} ringkas={ringkas}/>;
  return <div className={`relative overflow-hidden bg-white ${ringkas ? "aspect-[4/3]" : "aspect-[16/9]"}`}><Image src={artikel.fotoUtama} alt={`Gambar utama ${artikel.judul}`} fill sizes={ringkas ? "(max-width: 768px) 100vw, 33vw" : "100vw"} className="object-cover" unoptimized/></div>;
}
