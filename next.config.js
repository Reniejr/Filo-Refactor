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
  },
  env: {
    WP_URL: "https://wp.wedevs.it",
    GA_ID: "EPDM266LWB",
    WOO_CK: "ck_881b7b3dd1e3747866c792c1670e42756b2e1c6a",
    WOO_CS: "cs_6706d25b83e0085d129bc011c8bb2c773567d21d"
  }
}

module.exports = nextConfig