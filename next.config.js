const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  basePath: isProd ? '/yms_combined_calculator' : '',
  assetPrefix: isProd ? '/yms_combined_calculator/' : '',
  images: {
    unoptimized: true,
  },
};
