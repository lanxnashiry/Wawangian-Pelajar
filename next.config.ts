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
};

export default nextConfig;
