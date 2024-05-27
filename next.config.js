/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASEPATH
      : "",
  env: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_GOOGLE_ADSENSE_ID: process.env.NEXT_GOOGLE_ADSENSE_ID,
  },
  images: {
    domains: ["prodevperspectives-images.s3.us-east-2.amazonaws.com"],
  },
};

module.exports = nextConfig;
