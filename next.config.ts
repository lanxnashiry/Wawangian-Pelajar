import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Form menerima foto maksimal 5 MB; sisakan ruang untuk field multipart.
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
