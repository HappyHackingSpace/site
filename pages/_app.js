import React from 'react'
import Head from 'next/head'

import Analytics from '../components/analytics.js'

import Meta from '@happyhackingspace/meta'
import '@happyhackingspace/theme/fonts/reg-bold.css'
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
      <link rel="icon" href="/branding/hhs-black-wo-black.ico" type="image/x-icon" />
      <link rel="icon" href="/branding/hhs-black-wo-black.avif" type="image/avif" />
    </Head>
    <BalancerProvider>
      <Component {...pageProps} />
    </BalancerProvider>
    <Analytics />
  </ThemeProvider>
)

export default App
