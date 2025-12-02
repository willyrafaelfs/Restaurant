import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 1. WAJIB: Agar menghasilkan folder "out" berisi HTML statis untuk Netlify
  output: 'export',

  // 2. WAJIB: Matikan optimasi gambar server karena kita pakai Static Export
  images: {
    unoptimized: true, // <--- Baris ini solusinya!
    
    // Pola remote yang kamu miliki sebelumnya tetap kita simpan
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Pengaturan TypeScript dan ESLint kamu
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;