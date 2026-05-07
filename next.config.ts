import type {NextConfig} from 'next';

const isGithubPages = !!process.env.NEXT_PUBLIC_BASE_PATH;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  ...(isGithubPages
    ? {
        output: 'export',
        basePath: process.env.NEXT_PUBLIC_BASE_PATH,
        trailingSlash: true,
      }
    : {}),
  transpilePackages: ['motion'],
};

export default nextConfig;
