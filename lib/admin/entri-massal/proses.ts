import type { BarisWorkbook } from "./workbook.ts";
import {
  validasiBarisArtikel,
  validasiBarisProduk,
  validasiDuplikatSlug,
  type ArtikelImpor,
  type HasilValidasi,
  type ProdukImpor,
} from "./validasi.ts";

export type MasukanProsesEntriMassal = {
  produk: BarisWorkbook[];
  artikel: BarisWorkbook[];
};

function tambahkanGalat<T>(hasil: HasilValidasi<T>, pesan: string) {
  if (!hasil.galat.includes(pesan)) hasil.galat.push(pesan);
  hasil.data = undefined;
}

export function prosesBarisEntriMassal(
  masukan: MasukanProsesEntriMassal,
  slugProdukAda: Set<string>,
  slugArtikelAda: Set<string>,
  kodeProfilAda?: Set<string>,
) {
  if (masukan.produk.length > 500 || masukan.artikel.length > 500) {
    throw new Error("Maksimal 500 baris per sheet.");
  }
  const produk = masukan.produk.map((item) => validasiBarisProduk(item.nilai, item.baris));
  const artikel = masukan.artikel.map((item) => validasiBarisArtikel(item.nilai, item.baris));

  const duplikatProduk = validasiDuplikatSlug(produk.filter((item) => item.data).map((item) => ({ baris: item.baris, slug: item.data!.slug })));
  const duplikatArtikel = validasiDuplikatSlug(artikel.filter((item) => item.data).map((item) => ({ baris: item.baris, slug: item.data!.slug })));

  for (const item of produk) {
    for (const pesan of duplikatProduk.get(item.baris) ?? []) tambahkanGalat(item, pesan);
    if (item.data && slugProdukAda.has(item.data.slug)) tambahkanGalat(item, "Slug produk sudah ada di database; impor tidak menimpa data.");
    if (
      kodeProfilAda &&
      item.data?.kode_profil_rekomendasi &&
      !kodeProfilAda.has(item.data.kode_profil_rekomendasi)
    ) {
      tambahkanGalat(
        item,
        "Kode profil rekomendasi tidak tersedia atau sedang nonaktif.",
      );
    }
  }
  for (const item of artikel) {
    for (const pesan of duplikatArtikel.get(item.baris) ?? []) tambahkanGalat(item, pesan);
    if (item.data && slugArtikelAda.has(item.data.slug)) tambahkanGalat(item, "Slug artikel sudah ada di database; impor tidak menimpa data.");
  }

  const semua = [...produk, ...artikel];
  return {
    produk,
    artikel,
    ringkasan: {
      total: semua.length,
      valid: semua.filter((item) => item.galat.length === 0).length,
      galat: semua.filter((item) => item.galat.length > 0).length,
      peringatan: semua.filter((item) => item.peringatan.length > 0).length,
    },
  };
}

export function ambilDataValid(hasil: ReturnType<typeof prosesBarisEntriMassal>) {
  return {
    produk: hasil.produk.flatMap((item) => item.data ? [item.data] : []) as ProdukImpor[],
    artikel: hasil.artikel.flatMap((item) => item.data ? [item.data] : []) as ArtikelImpor[],
  };
}
