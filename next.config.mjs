/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/**/**"
      },      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8),
        port: '',
        pathname: '/**',
      },
    ],
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
