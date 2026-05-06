/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel handles Next.js natively — no output: "export" needed
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
