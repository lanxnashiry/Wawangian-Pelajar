import type { MetadataRoute } from "next";

const urlSitus =
  process.env.NEXT_PUBLIC_URL_SITUS ?? "https://www.wawangianpelajar.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/afiliasi/masuk", "/afiliasi/daftar", "/api/"],
      },
    ],
    sitemap: `${urlSitus}/sitemap.xml`,
  };
}
