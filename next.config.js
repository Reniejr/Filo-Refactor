/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  async rewrites() {
    return [{
      source: "/",
      destination: "https://wedevs.it/"
    }]
  },
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
    locales: ['en', 'it', 'es'],
    defaultLocale: 'en',
  },
  // env: {
  //   WP_URL: "https://wp.wedevs.it",
  //   GA_ID: "G-P7JLYERS2H",
  //   WOO_CK: "ck_881b7b3dd1e3747866c792c1670e42756b2e1c6a",
  //   WOO_CS: "cs_6706d25b83e0085d129bc011c8bb2c773567d21d",
  //   STRIPE_SK: "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",
  //   STRIPE_PUBLIC_KEY: "pk_live_51LHmioH3DyNxzNjdFllh59ewGb0WlmDNJhVsgpsQDBI19SFF3v2GeGdSlD2n8CvhCGIgH7qLRmVVx9h8kz5Lcb76006HNJwIOV",
  //   PAYPAL_SB_ACCOUNT: "sb-jgg47f20851633@business.example.com",
  //   PAYPAL_CLIENT_ID: "Aa8hpbHy3WE377EjgVp48c0fdzc0C9wU2eLeaohDMOVMQJW965BNDHwdtgRgOXOQiUmgD7MWWm6V46YM",
  //   PAYPAL_CLIENT_SECRET: "EOU32TByP8GgceRrXfseJBUZrr5RpCGwGY8i7hkldsS-uTL_Wek4nLXqzGoB_FcSLaU-XebonWK7UjW-",
  // }
}

module.exports = nextConfig