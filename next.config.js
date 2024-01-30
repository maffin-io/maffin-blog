/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/*',
      },
    ],
    unoptimized: true,
  },
  output: 'export',
}

module.exports = nextConfig
