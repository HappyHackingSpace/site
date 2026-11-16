import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})


/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  compiler: {
    // Enable the new JSX transform to fix warnings
    reactRemoveProperties: process.env.NODE_ENV === 'production'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'happyhacking.space'
      },
      {
        protocol: 'https',
        hostname: 'assets.happyhacking.space'
      }
    ]
  },
  webpack: (config, { isServer }) => {
    return config
  },
  async redirects() {
    return [
      { source: '/branding/', destination: '/brand/', permanent: true },
      { source: '/ama/', destination: '/amas/', permanent: false },
      { source: '/coc/', destination: '/conduct/', permanent: true },
      {
        source: '/code_of_conduct/',
        destination: '/conduct/',
        permanent: true
      },
      { source: '/hackathons/', destination: '/events/', permanent: true },
      {
        source: '/community/',
        destination: 'https://discord.happyhacking.space',
        permanent: false
      },
      {
        source: '/donate',
        destination: '/philanthropy',
        permanent: false
      },
      {
        source: '/github',
        destination: 'https://github.com/happyhackingspace',
        permanent: true
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/fonts/(.*)',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }]
      },
      {
        source: '/api/(.+)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS'
          },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' }
        ]
      }
    ]
  }
})

import million from 'million/compiler'
import withMDX from '@next/mdx'
import withTM from 'next-transpile-modules'

const withMDXConfig = withMDX({ extension: /\.mdx?$/ })
const withAnimeJS = withTM(['animejs', '@happyhackingspace/markdown'])

export default million.next(withAnimeJS(withMDXConfig(nextConfig)), {
  auto: true,
  experimental: {
    instrumentationHook: false,
  },

})
