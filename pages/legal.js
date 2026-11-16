import Meta from '@happyhackingspace/meta'
import Head from 'next/head'
import { Box, Container, Grid, Heading, Link, Text } from 'theme-ui'
import Nav from '../components/nav'
import Footer from '../components/footer'
import ForceTheme from '../components/force-theme'
import {
  org,
  status,
  identityStatement,
  fullAddress
} from '../lib/organization'

const sections = [
  {
    lang: 'en',
    heading: 'Legal Information',
    labels: {
      legalName: 'Legal name',
      publicName: 'Public name',
      status: 'Status',
      registry: 'Registry number',
      address: 'Registered address',
      email: 'Email'
    }
  },
  {
    lang: 'tr',
    heading: 'Künye',
    labels: {
      legalName: 'Resmi adı',
      publicName: 'Kamuya açık adı',
      status: 'Hukuki durumu',
      registry: 'Dernek kütük numarası',
      address: 'Kayıtlı adresi',
      email: 'E-posta'
    }
  }
]

const Details = ({ lang, labels }) => {
  const rows = [
    [labels.legalName, org.legalName],
    [labels.publicName, `${org.publicName} (${org.shortName})`],
    [labels.status, status[lang]],
    [labels.registry, `${org.registryLabel}: ${org.registryNumber}`],
    [labels.address, fullAddress],
    [
      labels.email,
      <Link key="email" href={`mailto:${org.email}`}>
        {org.email}
      </Link>
    ]
  ]

  return (
    <Grid
      as="dl"
      columns={[1, '12rem 1fr']}
      gap={[1, 3]}
      sx={{ m: 0, dd: { m: 0, mb: [3, 0] } }}
    >
      {rows.map(([label, value]) => (
        <Box key={label} sx={{ display: 'contents' }}>
          <Text as="dt" sx={{ fontWeight: 'bold', color: 'slate' }}>
            {label}
          </Text>
          <Text as="dd">{value}</Text>
        </Box>
      ))}
    </Grid>
  )
}

const LegalPage = () => (
  <>
    <Meta
      as={Head}
      title="Legal / Künye"
      description={identityStatement.en}
    />
    <ForceTheme theme="light" />
    <Nav color="text" />
    <Box as="main" sx={{ bg: 'white', color: 'text', pt: [6, 7], pb: [4, 5] }}>
      <Container variant="copy">
        {sections.map(({ lang, heading, labels }, i) => (
          <Box
            as="section"
            lang={lang}
            key={lang}
            sx={{
              mt: i === 0 ? 0 : 5,
              pt: i === 0 ? 0 : 5,
              borderTop: i === 0 ? 'none' : '1px solid',
              borderColor: 'border'
            }}
          >
            <Heading as={i === 0 ? 'h1' : 'h2'} variant="title" sx={{ mb: 3 }}>
              {heading}
            </Heading>
            <Text as="p" variant="lead" sx={{ mb: 4 }}>
              {identityStatement[lang]}
            </Text>
            <Details lang={lang} labels={labels} />
          </Box>
        ))}
      </Container>
    </Box>
    <Footer />
  </>
)

export default LegalPage
