import Document, { Html, Head, Main, NextScript } from 'next/document'
// import { InitializeColorMode } from 'theme-ui'

const org = {
  '@context': 'http://schema.org',
  '@type': 'Organization',
  name: 'Happy Hacking Space',
  url: 'https://happyhacking.space/',
  logo: 'https://hackclub.com/social.png',
  sameAs: [
    'https://twitter.com/hackclub',
    'https://github.com/hackclub',
    'https://www.instagram.com/starthackclub',
    'https://www.facebook.com/Hack-Club-741805665870458',
    'https://www.youtube.com/channel/UCQzO0jpcRkP-9eWKMpJyB0w'
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: 'team@hackclub.com',
      contactType: 'customer support',
      url: 'https://hackclub.com/'
    }
  ]
}

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="format-detection" content="telephone=no" />
          <link rel="icon" type="image/x-icon" href="/branding/hhs-white-wo-white.ico" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
          />
        </Head>
        <body>
          {/* <InitializeColorMode /> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
