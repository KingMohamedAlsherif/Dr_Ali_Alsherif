/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias.canvas = false;
    }
    return config;
  },
  images: {
    formats: ['image/avif', 'image/webp']
  }
};

module.exports = nextConfig;
