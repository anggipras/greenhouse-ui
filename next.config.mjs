/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // This matches any route under /api/
        destination: "https://harvest.greenhouse.io/:path*", // Proxy to the external API
      },
    ];
  },
};

export default nextConfig;
