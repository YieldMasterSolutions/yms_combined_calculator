import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/yms_combined_calculator",
  assetPrefix: "/yms_combined_calculator/",
  trailingSlash: true,
};

export default nextConfig;
