import Document, { Html, Head, Main, NextScript } from 'next/document'
// import { InitializeColorMode } from 'theme-ui'

const org = {
  '@context': 'http://schema.org',
  '@type': 'Organization',
  name: 'Happy Hacking Space',
  url: 'https://happyhacking.space/',
  logo: 'https://assets.happyhacking.space/flag-standalone.svg',
  sameAs: [
    'https://x.com/happyhackings',
    'https://github.com/happyhackingspace',
    'https://www.instagram.com/happyhackingspace',
    'https://www.youtube.com/@HappyHackingSpace'
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: 'team@happyhacking.space',
      contactType: 'customer support',
      url: 'https://happyhacking.space/'
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
          <link rel="icon" type="image/png" href="https://assets.happyhacking.space/favicons/favicon-32x32.png" />
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
