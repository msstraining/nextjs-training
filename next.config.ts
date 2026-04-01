import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["@mui/material", "@mui/icons-material"],
  },
  images: {
    remotePatterns: [],
    unoptimized: true, // Optional: if you don't want to configure full image optimization for local uploads
  },
};

export default nextConfig;
