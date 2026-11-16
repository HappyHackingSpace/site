import Document, { Html, Head, Main, NextScript } from 'next/document'
import { org } from '../lib/organization'
// import { InitializeColorMode } from 'theme-ui'

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: org.publicName,
  legalName: org.legalName,
  alternateName: [org.publicName, org.shortName],
  url: org.url,
  email: org.email,
  identifier: {
    '@type': 'PropertyValue',
    propertyID: org.registryLabel,
    value: org.registryNumber
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: org.address.street,
    addressLocality: org.address.locality,
    postalCode: org.address.postalCode,
    addressCountry: org.address.countryCode
  },
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
      email: org.email,
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
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
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
