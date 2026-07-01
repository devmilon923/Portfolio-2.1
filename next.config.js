/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Generates the /out folder
  images: { unoptimized: true }, // GitHub Pages doesn't support the Next.js image optimization API
};

module.exports = nextConfig;
