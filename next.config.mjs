/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/**/**"
      }
    ],
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
