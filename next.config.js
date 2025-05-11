// next.config.js
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export', // 🔑 enables static HTML export to /out
  basePath: isProd ? '/yms_combined_calculator' : '',
  assetPrefix: isProd ? '/yms_combined_calculator/' : '',
  images: {
    unoptimized: true, // required for static export with next/image
  },
};
