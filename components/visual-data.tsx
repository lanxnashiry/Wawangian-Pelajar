import Image from "next/image";
import { PlaceholderVisual } from "./placeholder-visual";
import type { Produk } from "@/data/produk";
import type { Artikel } from "@/data/artikel";

export function VisualProduk({ produk, ringkas = false }: { produk: Produk; ringkas?: boolean }) {
  const sumber = produk.foto?.[0];
  if (!sumber) return <PlaceholderVisual warna={produk.warna} ringkas={ringkas}/>;
  const memakaiFotoReferensi50Ml =
    produk.ukuran.replace(/\s+/g, "").toLowerCase() === "15ml" &&
    sumber.toLowerCase().endsWith("-50ml.webp");
  const keterangan = memakaiFotoReferensi50Ml
    ? `Foto referensi kemasan 50 ml untuk ${produk.nama}`
    : `Foto utama ${produk.nama}`;

  return <div className={`relative overflow-hidden bg-white ${ringkas ? "aspect-[4/3]" : "aspect-square"}`}><Image src={sumber} alt={keterangan} fill sizes={ringkas ? "(max-width: 768px) 50vw, 25vw" : "(max-width: 1024px) 100vw, 50vw"} loading={ringkas ? "lazy" : "eager"} className="object-cover"/></div>;
}

export function VisualArtikel({ artikel, ringkas = false }: { artikel: Artikel; ringkas?: boolean }) {
  if (!artikel.fotoUtama) return <PlaceholderVisual judul="Ilustrasi artikel sementara" warna={artikel.warna} ringkas={ringkas}/>;
  return <div className={`relative overflow-hidden bg-white ${ringkas ? "aspect-[4/3]" : "aspect-[16/9]"}`}><Image src={artikel.fotoUtama} alt={artikel.fotoAlt?.trim() || `Gambar utama ${artikel.judul}`} fill sizes={ringkas ? "(max-width: 768px) 100vw, 33vw" : "100vw"} className="object-cover"/></div>;
}
