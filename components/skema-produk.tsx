import type { Produk } from "@/data/produk";

const urlSitus = process.env.NEXT_PUBLIC_URL_SITUS ?? "https://www.wawangianpelajar.com";

function amankan(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function SkemaProduk({ produk }: { produk: Produk }) {
  const alamatProduk = `${urlSitus}/produk/${produk.slug}`;
  const skemaProduk = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: produk.nama,
    description: produk.ringkasan,
    sku: produk.slug,
    category: produk.kategori,
    image: produk.foto?.length ? produk.foto : undefined,
    url: alamatProduk,
    offers: {
      "@type": "Offer",
      url: alamatProduk,
      priceCurrency: "IDR",
      price: produk.harga,
      availability: produk.tersedia
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Wawangian Pelajar",
        url: urlSitus,
      },
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: amankan(skemaProduk) }}
    />
  );
}
