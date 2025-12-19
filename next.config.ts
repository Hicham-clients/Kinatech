import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ 
  // output:'export'
    images: {
     remotePatterns: [
      {
        protocol: "https",
        hostname:"kinatech.ma",
        pathname: "/**",
      },
    ]
  },
 
};

export default nextConfig;
