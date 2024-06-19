/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "coffee.alexflipnote.dev",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "random-d.uk",
        pathname: "/*/**",
      },
    ],
  },
};

export default nextConfig;
