/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_BASEPATH
      : '',
  env: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_GOOGLE_ADSENSE_ID: process.env.NEXT_GOOGLE_ADSENSE_ID,
  },
  // images: {
  //   loader: 'akamai',
  //   path: process.env.NEXT_PUBLIC_URL,
  // },
};

module.exports = nextConfig;
