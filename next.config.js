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
};

module.exports = nextConfig;
