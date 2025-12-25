import { Container } from 'theme-ui'
import Header from '../components/header'
import Content from '../components/content'
import React from 'react'

// Local Banner component to avoid package issues
// const Banner = ({ year = new Date().getFullYear(), style, ...props }) => (
//   <a href="https://happyhacking.space/" target="_blank"
//     rel="noopener noreferrer" {...props}>
//     <img
//       style={{
//         width: '230px',
//         position: 'absolute',
//         top: '10px',
//         left: 0,
//         border: 0,
//         zIndex: '999',
//         ...style
//       }}
//       src={`https://assets.happyhacking.space/flag-standalone.svg`}
//       alt="Happy Hacking Space"
//     />
//   </a>
// )
const Page = ({ html }) => (
  <>
    {/* <Banner /> */}
    <Header
      title="@happyhackingspace/banner"
      desc="React component for adding a Happy Hacking Space banner to your site"
      img={`https://workshop-cards.hackclub.com/${encodeURIComponent(
        'Happy Hacking Space Banner'
      )}.png&brand=Open%20Source`}
      includeMeta
      hideNav
      sx={{ bg: 'transparent', mt: [6, 5], mb: [-4, -5] }}
    />
    <Container variant="copy" sx={{ py: [3, 4] }}>
      <Content html={html} />
      <style>{`
        blockquote:first-child { display: none; }
        blockquote:first-child + p { text-align: center; }
      `}</style>
    </Container>
  </>
)

export const getStaticProps = async () => {
  const { getBannerHtml } = require('../lib/data')
  const html = await getBannerHtml()
  return { props: { html }, revalidate: 30 }
}

export default Page