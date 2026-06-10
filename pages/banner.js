import { Container } from 'theme-ui'
import Header from '../components/header'
import Content from '../components/content'
import React from 'react'
import { useTranslation } from '../lib/i18n'

const Page = ({ html }) => {
  const { t } = useTranslation()
  return (
    <>
      <Header
        title={t('banner.title')}
        desc={t('banner.description')}
        img={`https://workshop-cards.hackclub.com/${encodeURIComponent(
          t('banner.ogImageTitle')
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
}

export const getStaticProps = async () => {
  const { getBannerHtml } = require('../lib/data')
  const html = await getBannerHtml()
  return { props: { html }, revalidate: 30 }
}

export default Page
