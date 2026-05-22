import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.100.73",
    "192.168.100.37"
  ]
};

export default nextConfig;