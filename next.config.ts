const nextConfig: import('next').NextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  allowedDevOrigins: ['100.64.24.75'],
};

export default nextConfig;
