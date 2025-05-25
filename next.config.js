// next.config.js

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/yms_combined_calculator' : '',
  assetPrefix: isProd ? '/yms_combined_calculator/' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    // ✅ Prevents Next.js from auto-editing tsconfig.json
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
