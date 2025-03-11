/** @type {import('next').NextConfig} */
const nextConfig = {
  //distDir: 'build',
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  //swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"
          }
        ]
      }
    ]
  },
  // Custom domain configuration
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
    ]
  },
  // async redirects() {
  //   return [
  //     process.env.MAINTENANCE_MODE === "1"
  //       ? { source: "/((?!maintenance).*)", destination: "/maintenance.html", permanent: false }
  //       : null,
  //   ].filter(Boolean);
  // }
}

module.exports = nextConfig 