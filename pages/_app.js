import React from 'react'
import Head from 'next/head'

import Analytics from '../components/analytics.js'

import Meta from '@happyhackingspace/meta'
import '@happyhackingspace/theme/fonts/reg-bold.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-horizontal-scrolling-menu/dist/styles.css'
import '@fillout/react/style.css'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import theme from '../lib/theme'
import { ThemeProvider } from 'theme-ui'
import { Provider as BalancerProvider } from 'react-wrap-balancer'
import { I18nProvider } from '../lib/i18n'

const App = ({ Component, pageProps }) => (
  <I18nProvider>
    <ThemeProvider theme={theme}>
      <Head>
        <link rel="icon" href="/branding/hhs-black-wo-black.ico" type="image/x-icon" />
        <link rel="icon" href="/branding/hhs-black-wo-black.avif" type="image/avif" />
      </Head>
      <BalancerProvider>
        <Component {...pageProps} />
      </BalancerProvider>
      <Analytics />
    </ThemeProvider>
  </I18nProvider>
)

export default App
