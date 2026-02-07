/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ar',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
