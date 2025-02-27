import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["image.tmdb.org"], // Add image.tmdb.org to the allowed domains
  },
};

export default nextConfig;
