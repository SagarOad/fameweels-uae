/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "45.159.223.232",
      "famewheels.s3.eu-north-1.amazonaws.com",
      "gallery.famewheels.com",
      "bacend.famewheels.com",
    ],
  },
  experimental: {
    appDir: true,  // Enables the new app directory system in Next.js
  },
  reactStrictMode: true, // For improved debugging
};

export default nextConfig;
