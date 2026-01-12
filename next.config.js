/** @type {import('next').NextConfig} */
const path = require('path');

const hasOptionalDependency = (dependency) => {
  try {
    require.resolve(dependency);
    return true;
  } catch {
    return false;
  }
};

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias.canvas = false;
    }

    if (!hasOptionalDependency('@react-three/fiber')) {
      config.resolve.alias['@react-three/fiber'] = path.resolve(
        __dirname,
        'components/visual/three/shims/react-three-fiber'
      );
    }

    if (!hasOptionalDependency('@react-three/drei')) {
      config.resolve.alias['@react-three/drei'] = path.resolve(
        __dirname,
        'components/visual/three/shims/react-three-drei'
      );
    }

    return config;
  },
  images: {
    formats: ['image/avif', 'image/webp']
  }
};

module.exports = nextConfig;
