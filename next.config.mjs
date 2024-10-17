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
        hostname: 'wmkyemblcmxydwufvgay.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
