/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/yms_combined_calculator',
  assetPrefix: '/yms_combined_calculator/',
  trailingSlash: true,
  eslint: {
    dirs: ['src', 'pages', 'components', 'utils'],
    ignoreDuringBuilds: true, // ✅ Add this line
  },
};

export default nextConfig;
