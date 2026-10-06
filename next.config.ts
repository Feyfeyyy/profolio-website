import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.denofgeek.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
