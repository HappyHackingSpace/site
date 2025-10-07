import React from 'react'
import Head from 'next/head'

import Analytics from '../components/analytics.js'

import Meta from '@hackclub/meta'
import '@hackclub/theme/fonts/reg-bold.css'
import theme from '../lib/theme'
import { ThemeProvider } from 'theme-ui'
import { Provider as BalancerProvider } from 'react-wrap-balancer'

const App = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    {/* <Meta as={Head}>
      <meta
        name="google-site-verification"
        content="7zE7h5foPaxIcnv5Frq6BkcUb9-3UzVc8q3P_cexf9I"
      />
    </Meta> */}
    <Head>
      {/* Favicons live in the public/ folder and are served from the web root. Use /branding/... not /public/branding/... */}
      <link rel="icon" href="/branding/hhs-black-wo-black.ico" type="image/x-icon" />
      {/* Optional modern favicon format (AVIF). Browsers that support it will use this. */}
      <link rel="icon" href="/branding/hhs-black-wo-black.avif" type="image/avif" />
    </Head>
    <BalancerProvider>
      <Component {...pageProps} />
    </BalancerProvider>
    <Analytics />
  </ThemeProvider>
)

export default App
