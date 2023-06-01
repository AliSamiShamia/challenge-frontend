
/** @type {import('next').NextConfig} */
const nextConfig = {

  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false
  },
  images: {
    minimumCacheTTL: 60,
    // unoptimized: true,
    domains: ['http://localhost/', 'https://www.nytimes.com/'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'www.nytimes.com',
      },
    ],
  },

  env: {
    baseURL: "http://localhost/api/"
  }
}

module.exports = (nextConfig)
