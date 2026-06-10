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
        hostname: 'dl.airtable.com'
      },
      {
        protocol: 'https',
        hostname: 'emoji.slack-edge.com'
      },
      {
        protocol: 'https',
        hostname: 'cdn.glitch.com'
      },
      {
        protocol: 'https',
        hostname: 'scrapbook.happyhacking.space'
      },
      {
        protocol: 'https',
        hostname: 'assets.happyhacking.space'
      },
      {
        protocol: 'https',
        hostname: 'v5.airtableusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'hcb.happyhacking.space'
      },
      {
        protocol: 'https',
        hostname: 'hc-cdn.hel1.your-objectstorage.com'
      },
      {
        protocol: 'https',
        hostname: 'cloud-*-hack-club-bot.vercel.app'
      }
    ]
  },
  webpack: (config, { isServer }) => {
    return config
  },
  async redirects() {
    return [
      {
        source: '/bank/:path*',
        destination: '/hcb/:path*',
        permanent: true
      },
      {
        source: '/hcb/fiscal-sponsorship/',
        destination: '/fiscal-sponsorship/about/',
        permanent: false
      },
      {
        source: '/hcb/:path*',
        destination: '/fiscal-sponsorship/:path*',
        permanent: false
      },
      { source: '/grant/', destination: '/hackathons/grant', permanent: false },
      {
        source: '/sprig/',
        destination: 'https://sprig.happyhacking.space',
        permanent: true
      },
      { source: '/start/', destination: '/', permanent: false },
      { source: '/repl/', destination: '/', permanent: true },
      { source: '/c9/', destination: '/deprecated/cloud9/', permanent: true },
      {
        source: '/cloud9_setup/',
        destination: '/deprecated/cloud9/',
        permanent: true
      },
      {
        source: '/redeem_tech_domain/',
        destination: '/deprecated/tech_domains/',
        permanent: true
      },
      {
        source: '/challenge/',
        destination: '/deprecated/challenge/',
        permanent: true
      },
      { source: '/slack_invite/', destination: '/slack/', permanent: true },
      {
        source: '/slack/',
        destination: 'https://summer.happyhacking.space',
        permanent: false
      },
      {
        source: '/jobs/bank-tech-lead/',
        destination: '/jobs/lead-hacker/',
        permanent: true
      },
      {
        source: '/first/',
        destination: '/bank/first/',
        permanent: false
      },
      {
        source: '/bank/frc/',
        destination: '/bank/first/',
        permanent: false
      },
      {
        source: '/bank/ftc/',
        destination: '/bank/first/',
        permanent: false
      },
      {
        source: '/bank/fll/',
        destination: '/bank/first/',
        permanent: false
      },
      {
        source: '/wom/',
        destination: '/winter/',
        permanent: false
      },
      { source: '/workshops/slack/', destination: '/slack/', permanent: true },
      { source: '/community/', destination: '/slack/', permanent: true },
      { source: '/hack_camp/', destination: '/camp/', permanent: true },
      { source: '/branding/', destination: '/brand/', permanent: true },
      { source: '/ama/', destination: '/amas/', permanent: false },
      { source: '/geohot', destination: '/amas/geohot/', permanent: false },
      { source: '/sal', destination: '/amas/sal/', permanent: false },
      { source: '/vitalik', destination: '/amas/vitalik/', permanent: false },
      {
        source: '/open-source/',
        destination: '/opensource/',
        permanent: false
      },
      { source: '/coc/', destination: '/conduct/', permanent: true },
      {
        source: '/code_of_conduct/',
        destination: '/conduct/',
        permanent: true
      },
      {
        source: '/finder/',
        destination: 'https://finder.happyhacking.space',
        permanent: true
      },
      {
        source: '/camp/',
        destination: 'https://camp.happyhacking.space',
        permanent: true
      },
      {
        source: '/apply/',
        destination: 'https://apply.happyhacking.space',
        permanent: true
      },
      {
        source: '/icons/',
        destination: 'https://icons.hackclub.com',
        permanent: true
      },
      {
        source: '/updates/',
        destination:
          'https://www.youtube.com/playlist?list=PLbNbddgD-XxEC5-_KQTye6nFPBLtI_mds',
        permanent: false
      },
      {
        source: '/admin/',
        destination:
          'https://5c8804a629a378000833619c--happyhackingspace.netlify.com/admin/',
        permanent: false
      },
      {
        source: '/checkup/',
        destination:
          'https://5c8804a629a378000833619c--happyhackingspace.netlify.com/checkup/',
        permanent: false
      },
      {
        source: '/workshops/',
        destination: 'https://workshops.happyhacking.space/',
        permanent: false
      },
      {
        source: '/workshops/([a-z_]+)/',
        destination: 'https://workshops.happyhacking.space/$1/',
        permanent: true
      },
      {
        source: '/jobs/creative-director/',
        destination: '/jobs/brand-director/',
        permanent: false
      },
      {
        source: '/jobs/bank-ops-assistant/',
        destination: '/jobs/bank-ops-associate/',
        permanent: false
      },
      {
        source: '/jobs/vp-DonorEngagement/',
        destination: '/jobs/vp-donor-engagement/',
        permanent: false
      },
      {
        source: '/daysofservice/',
        destination: 'https://daysofservice.happyhacking.space',
        permanent: true
      },
      {
        source: '/blot/',
        destination: 'https://blot.happyhacking.space',
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

      },
      {
        source: '/nest',
        destination: 'https://happyhacking.space',
        permanent: true
      },
      {
        source: '/security',
        destination: 'https://security.happyhacking.space',
        permanent: true
      },
      // Disabled pages (not currently used)
      { source: '/acknowledged/', destination: '/404/', permanent: false },
      { source: '/amas/:path*', destination: '/404/', permanent: false },
      { source: '/arcade/:path*', destination: '/404/', permanent: false },
      { source: '/bin/:path*', destination: '/404/', permanent: false },
      { source: '/clubs/', destination: '/404/', permanent: false },
      { source: '/congressional-app-challenge/', destination: '/404/', permanent: false },
      { source: '/content/:path*', destination: '/404/', permanent: false },
      { source: '/deprecated/:path*', destination: '/404/', permanent: false },
      { source: '/elon/', destination: '/404/', permanent: false },
      { source: '/fiscal-sponsorship/:path*', destination: '/404/', permanent: false },
      { source: '/hackathons/:path*', destination: '/404/', permanent: false },
      { source: '/minecraft/', destination: '/404/', permanent: false },
      { source: '/night/', destination: '/404/', permanent: false },
      { source: '/onboard/:path*', destination: '/404/', permanent: false },
      { source: '/opensource/', destination: '/404/', permanent: false },
      { source: '/pizza/', destination: '/404/', permanent: false },
      { source: '/press/', destination: '/404/', permanent: false },
      { source: '/preston-werner/', destination: '/404/', permanent: false },
      { source: '/preston-werner-2022/', destination: '/404/', permanent: false },
      { source: '/relon/', destination: '/404/', permanent: false },
      { source: '/replit/', destination: '/404/', permanent: false },
      { source: '/santa/', destination: '/404/', permanent: false },
      { source: '/ship/', destination: '/404/', permanent: false },
      { source: '/steve/', destination: '/404/', permanent: false },
      { source: '/stickers/', destination: '/404/', permanent: false },
      { source: '/winter/', destination: '/404/', permanent: false }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/clubs/leaders-letters',
        destination: 'https://leaders-letters.vercel.app/'
      },
      {
        source: '/letters',
        destination: 'https://leaders-letters.vercel.app/'
      },
      {
        source: '/clubs/leaders-letters/:path*',
        destination: 'https://leaders-letters.vercel.app/:path*'
      },
      {
        source: '/letter/:path*',
        destination: 'https://leaders-letters.vercel.app/letter/:path*'
      },
      {
        source: '/clubs/leaders-letters/_next/:path*',
        destination: 'https://leaders-letters.vercel.app/_next/:path*'
      },
      {
        source: '/workshops/_next/:path*',
        destination: 'https://workshops.happyhacking.space/_next/:path*'
      },
      {
        source: '/summer/_next/:path*',
        destination: 'https://summer.happyhacking.space/_next/:path*'
      },
      {
        source: '/sponsorship/',
        destination: '/content/sponsorship/'
      },
      {
        source: '/bin/beta',
        destination: '/bin/landing-new/'
      },
      {
        source: '/covid19/',
        destination: '/content/covid19/'
      },
      {
        source: '/it-admins/',
        destination: '/content/it-admins/'
      },
      {
        source: '/sunsetting-som/',
        destination: '/content/sunsetting-som/'
      },
      {
        source: '/banner/',
        destination: 'https://workshops.happyhacking.space/banner/'
      },
      {
        source: '/conduct/',
        destination: 'https://workshops.happyhacking.space/conduct/'
      },
      {
        source: '/workshop-bounty/',
        destination: 'https://workshops.happyhacking.space/workshop-bounty/'
      },
      {
        source: '/vip-newsletters/',
        destination: 'https://workshops.happyhacking.space/vip-newsletters/'
      },
      {
        source: '/vip-newsletters/(.*)',
        destination: 'https://workshops.happyhacking.space/vip-newsletters/$1'
      },
      {
        source: '/newsletter/',
        destination: 'https://workshops.happyhacking.space/newsletter/'
      },
      {
        source: '/newsletter/(.*)',
        destination: 'https://workshops.happyhacking.space/newsletter/$1'
      },
      {
        source: '/transparency/may-2020/',
        destination: '/content/transparency/may-2020/'
      },
      {
        source: '/map/',
        destination: 'https://map.happyhacking.space/'
      },
      {
        source: '/map/(.*)',
        destination: 'https://map.happyhacking.space/$1'
      },
      {
        source: '/how-to-organize-a-hackathon',
        destination: 'https://expandables.happyhacking.space/organizing.html'
      },
      {
        source: '/how-to-organize-a-hackathon/style.css',
        destination: 'https://expandables.happyhacking.space/style.css'
      },
      {
        source: '/bin/',
        destination: '/bin/index.html'
      },
      {
        source: '/bin/:path*',
        destination: '/bin/:path*'
      },
      {
        source: '/bin/selector/',
        destination: '/bin/selector/index.html'
      },
      {
        source: '/arcade/power-hour',
        destination: '/arcade/power-hour/index.html'
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/banners/(.*)',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }]
      },
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
      },
      {
        source: '/api/bin/wokwi/(.+)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS'
          },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' }
        ]
      },
      {
        source: '/api/onboard/svg/(.+)',
        headers: [
          {
            key: 'content-type',
            value: 'image/svg+xml'
          }
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
