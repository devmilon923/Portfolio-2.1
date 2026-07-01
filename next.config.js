/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Generates the /out folder
  images: { unoptimized: true }, // GitHub Pages doesn't support the Next.js image optimization API
  basePath: "/Portfolio-2.1", // Replace with your exact GitHub repository name
};

module.exports = nextConfig;
