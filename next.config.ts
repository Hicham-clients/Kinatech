import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ 
  // output:'export'
    images: {
      
     remotePatterns: [
      {
        protocol: "https",
        hostname:"admin.kinatech.ma",
        pathname: "/**",
      },
      
    ]
  },
  // //  images: {
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
