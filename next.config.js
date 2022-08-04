/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    concurrentFeatures: true,
    serverComponents: true,
    images: {
      allowFutureImage: true,
    }
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['wp.wedevs.it'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  i18n: {
    locales: ['en', 'it'],
    defaultLocale: 'en',
  }
}

module.exports = nextConfig