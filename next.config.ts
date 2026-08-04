import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Form menerima foto maksimal 5 MB; sisakan ruang untuk field multipart.
      bodySizeLimit: "6mb",
    },
  },
  async rewrites() {
    // Proxy tracker Umami lewat domain sendiri (/stats/*) supaya tidak
    // diblokir ad-blocker. Kalau URL instance belum diisi, tidak ada rewrite
    // yang dibuat sehingga build tetap aman.
    const urlUmami = process.env.UMAMI_URL_INSTANCE;

    if (!urlUmami) {
      return [];
    }

    const asal = urlUmami.replace(/\/$/, "");

    return [
      { source: "/stats/script.js", destination: `${asal}/script.js` },
      { source: "/stats/api/send", destination: `${asal}/api/send` },
    ];
  },
};

export default nextConfig;
