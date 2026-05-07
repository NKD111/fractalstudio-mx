/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel handles Next.js natively — no output: "export" needed
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Long-lived cache headers for static portfolio assets & SVGs
  async headers() {
    return [
      {
        source: "/portfolio/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.svg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
