export type TujuanMarketplace = "shopee" | "tiktok";

const domainMarketplace: Record<TujuanMarketplace, string[]> = {
  shopee: ["shopee.co.id", "shope.ee"],
  tiktok: ["tiktok.com"],
};

export const labelMarketplace: Record<TujuanMarketplace, string> = {
  shopee: "Shopee",
  tiktok: "TikTok Shop",
};

export function tautanMarketplaceValid(
  tujuan: TujuanMarketplace,
  nilai?: string,
) {
  if (!nilai) return false;

  try {
    const alamat = new URL(nilai);
    if (alamat.protocol !== "https:") return false;

    const namaHost = alamat.hostname.toLocaleLowerCase("id-ID");
    return domainMarketplace[tujuan].some(
      (domain) => namaHost === domain || namaHost.endsWith(`.${domain}`),
    );
  } catch {
    return false;
  }
}

export function pesanGalatTautanMarketplace(
  tujuan: TujuanMarketplace,
  nilai?: string,
) {
  if (!nilai || tautanMarketplaceValid(tujuan, nilai)) return undefined;
  return `Tautan ${labelMarketplace[tujuan]} harus memakai HTTPS dan domain resmi.`;
}
