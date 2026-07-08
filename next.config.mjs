/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'autoplay=*, camera=(), microphone=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
