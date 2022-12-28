/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/ishop-5d8ad.appspot.com/o/images%2F**",
      },
    ],
  },
};

module.exports = nextConfig;
