import type { Artikel } from "@/data/artikel";

const urlSitus =
  process.env.NEXT_PUBLIC_URL_SITUS ?? "https://www.wawangianpelajar.com";

function amankan(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function SkemaArtikel({ artikel }: { artikel: Artikel }) {
  const alamatArtikel = `${urlSitus}/cerita/${artikel.slug}`;

  const skemaArtikel = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artikel.metaJudul?.trim() || artikel.judul,
    description: artikel.metaDeskripsi?.trim() || artikel.cuplikan,
    image: artikel.fotoUtama ? [artikel.fotoUtama] : undefined,
    datePublished: artikel.tanggalTerbitIso,
    dateModified: artikel.tanggalTerbitIso,
    author: {
      "@type": "Organization",
      name: artikel.penulis || "Wawangian Pelajar",
      url: urlSitus,
    },
    publisher: {
      "@type": "Organization",
      name: "Wawangian Pelajar",
      logo: {
        "@type": "ImageObject",
        url: `${urlSitus}/logo-wawangian-pelajar-resmi.png`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": alamatArtikel },
    inLanguage: "id-ID",
  };

  const skemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: urlSitus },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cerita",
        item: `${urlSitus}/cerita`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: artikel.judul,
        item: alamatArtikel,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: amankan(skemaArtikel) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: amankan(skemaBreadcrumb) }}
      />
    </>
  );
}
