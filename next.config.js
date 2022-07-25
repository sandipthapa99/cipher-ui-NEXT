/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  images: {
    domains: ['blog.api.cagtu.io', 'thispersondoesnotexist.com'],
  },
}
