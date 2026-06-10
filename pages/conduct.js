import { Container, Heading } from 'theme-ui'
import Meta from '@happyhackingspace/meta'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Content from '../components/content'

const Page = ({ html }) => (
  <>
    <Meta
      as={Head}
      title="Code of Conduct"
      description="Happy Hacking Space's community guidelines and code of conduct."
    />
    <Nav color="text" />
    <Container
      variant="copy"
      sx={{
        py: [4, 5],
        h1: { color: 'primary' },
        h2: { color: 'text', mt: 4, mb: 3 },
        h3: { color: 'text', mt: 3, mb: 2 },
        'p, li': { fontSize: [2, 3], lineHeight: 1.6 },
        ul: { pl: 4 },
        ol: { pl: 4 }
      }}
    >
      <Heading as="h1" variant="title" sx={{ mb: 4 }}>
        Code of Conduct
      </Heading>
      <Content html={html} />
    </Container>
    <Footer />
  </>
)

export const getStaticProps = async () => {
  const { default: markdownToHtml } = require('@happyhackingspace/markdown')

  // GitHub'dan Code of Conduct'ı çek
  const response = await fetch('https://raw.githubusercontent.com/HappyHackingSpace/vulnerable-target/main/CODE_OF_CONDUCT.md')
  const markdown = await response.text()

  // Markdown'ı HTML'e çevir
  const html = await markdownToHtml(markdown, 'conduct.md', '', true)

  return {
    props: {
      html
    },
    revalidate: 60 * 60 * 24 // 24 saat cache
  }
}

export default Page