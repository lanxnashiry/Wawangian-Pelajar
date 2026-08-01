import type { MetadataRoute } from "next";
import {
  ambilDaftarArtikelPublik,
  ambilDaftarProdukPublik,
} from "@/lib/data/publik";

const urlSitus =
  process.env.NEXT_PUBLIC_URL_SITUS ?? "https://www.wawangianpelajar.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [daftarArtikel, daftarProduk] = await Promise.all([
    ambilDaftarArtikelPublik(),
    ambilDaftarProdukPublik(),
  ]);

  const halamanUtama: MetadataRoute.Sitemap = [
    { url: urlSitus, changeFrequency: "weekly", priority: 1 },
    { url: `${urlSitus}/katalog`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${urlSitus}/cerita`, changeFrequency: "daily", priority: 0.9 },
    { url: `${urlSitus}/donasi`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${urlSitus}/temukan`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${urlSitus}/afiliasi`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const halamanArtikel: MetadataRoute.Sitemap = daftarArtikel.map((artikel) => ({
    url: `${urlSitus}/cerita/${artikel.slug}`,
    lastModified: artikel.tanggalTerbitIso
      ? new Date(artikel.tanggalTerbitIso)
      : undefined,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const halamanProduk: MetadataRoute.Sitemap = daftarProduk.map((produk) => ({
    url: `${urlSitus}/produk/${produk.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...halamanUtama, ...halamanArtikel, ...halamanProduk];
}
