import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "glossary-eu-static.gcdn.co",
      },
      {
        protocol: "https",
        hostname: "api.worldoftanks.eu",
      },
      {
        protocol: "http",
        hostname: "api.worldoftanks.eu",
      },
      {
        protocol: "https",
        hostname: "eu-wotp.gcdn.co",
      },
    ],
  },
};

export default nextConfig;
