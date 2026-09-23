import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.39.130"],
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 300,
    },
  },

  /* config options here */
};

export default nextConfig;
