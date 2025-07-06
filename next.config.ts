import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'noidkeccbtthxvpeukxn.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Add any other existing configuration here
};


export default nextConfig;
