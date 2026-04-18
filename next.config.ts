import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "backend.local"
      }
    ]
  },

  // 👇 dev host 허용
  allowedDevOrigins: ["http://frontend.local:3000"]
};

export default nextConfig;