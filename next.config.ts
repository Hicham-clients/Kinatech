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
  //  images: {
  //    remotePatterns: [
  //     {
  //       protocol: "http",
  //       hostname:"localhost",
  //       pathname: "/**",
  //     },
  //   ]
  // },
 
};

export default nextConfig;
