import Meta from '@happyhackingspace/meta'
import Head from 'next/head'
import { Box, Heading, Container, Text, Badge } from 'theme-ui'
import Nav from '../components/nav'
import styled from '@emotion/styled'
import Footer from '../components/footer'
import { useTranslation } from '../lib/i18n'

const Header = styled(Box)`
  color: white;
  min-height: 20rem;
  background-image: linear-gradient(
    32deg,
    rgb(207, 45, 228) 0%,
    rgb(115, 45, 228) 64%,
    rgb(45, 66, 228) 100%
  );
  clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0% 90%);
  > div {
    position: relative;
  }
  @media screen and (min-width: 48em) {
    min-height: 26rem;
  }
`

const Section = styled(Box)`
  margin-bottom: 48px;
`

const ChatContainer = styled(Box)`
  display: grid;
  gap: 24px;
  margin: 24px 0;
  @media screen and (min-width: 48em) {
    grid-template-columns: 1fr 1fr;
  }
`

const ChatBox = styled(Box)`
  border-radius: 12px;
  padding: 16px;
  font-size: 13px;
  line-height: 1.6;
  @media screen and (min-width: 48em) {
    padding: 20px;
    font-size: 14px;
  }
`

const BadChat = styled(ChatBox)`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #7f1d1d;
`

const GoodChat = styled(ChatBox)`
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #14532d;
`

const ChatLine = styled(Text)`
  display: block;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
`

const ChatLabel = styled(Text)`
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const NumberedHeading = styled(Heading)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`

const NumberBadge = styled(Box)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgb(207, 45, 228), rgb(45, 66, 228));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  flex-shrink: 0;
`

const TipList = styled(Box)`
  list-style: none;
  padding: 0;
  margin: 16px 0;
`

const TipItem = styled(Box)`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
`

const TipBullet = styled(Box)`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgb(45, 66, 228);
  margin-top: 8px;
  flex-shrink: 0;
`

const SummaryBox = styled(Box)`
  background: linear-gradient(135deg, rgb(45, 66, 228), rgb(41, 143, 206));
  color: white;
  border-radius: 12px;
  padding: 24px 20px;
  text-align: center;
  margin-top: 48px;
  @media screen and (min-width: 48em) {
    padding: 32px;
  }
`

export default function DontAskToAsk() {
  const { t } = useTranslation()

  return (
    <Box sx={{ bg: 'white', color: 'black', minHeight: '100vh' }}>
      <Nav />
      <Meta
        as={Head}
        title={t('dontasktoask.meta.title')}
        description={t('dontasktoask.meta.description')}
        image="https://cloud-cz9a6kt0a-hack-club-bot.vercel.app/0social-photo_2.jpg"
      />
      <Box>
        <Header>
          <Container
            width={1}
            sx={{ maxWidth: '56rem!important', pt: ['96px', '120px'], pb: ['32px', '48px'], px: 3 }}
            align="left"
          >
            <Heading
              sx={{
                fontSize: [32, 44, 56],
                lineHeight: 1.1,
                fontWeight: 800,
                wordBreak: 'keep-all',
                overflowWrap: 'break-word'
              }}
            >
              {t('dontasktoask.hero.title')}
            </Heading>
            <Text sx={{ fontSize: [2, 3], mt: 2, opacity: 0.9, lineHeight: 1.4 }}>
              {t('dontasktoask.hero.subtitle')}
            </Text>
          </Container>
        </Header>

        <Container sx={{ maxWidth: '56rem!important', px: 3, py: [4, 5] }}>
          <Text sx={{ fontSize: [2, 3], lineHeight: 1.6, mb: 4, color: 'slate' }}>
            {t('dontasktoask.intro')}
          </Text>

          {/* Section 1 */}
          <Section>
            <NumberedHeading as="h2" sx={{ fontSize: [3, 4] }}>
              <NumberBadge>1</NumberBadge>
              {t('dontasktoask.section1.title')}
            </NumberedHeading>
            <Text sx={{ fontSize: [2, 3], lineHeight: 1.6, color: 'slate' }}>
              {t('dontasktoask.section1.description')}
            </Text>
          </Section>

          {/* Section 2 - Examples */}
          <Section>
            <NumberedHeading as="h2" sx={{ fontSize: [3, 4] }}>
              <NumberBadge>2</NumberBadge>
              {t('dontasktoask.section2.title')}
            </NumberedHeading>

            <ChatContainer>
              <BadChat>
                <ChatLabel>
                  <span>❌</span>
                  {t('dontasktoask.section2.badLabel')}
                </ChatLabel>
                <ChatLine>14:00 {t('dontasktoask.section2.bad.name1')}: {t('dontasktoask.section2.bad.line1')}</ChatLine>
                <ChatLine>14:20 {t('dontasktoask.section2.bad.name2')}: {t('dontasktoask.section2.bad.line2')}</ChatLine>
                <ChatLine>14:25 {t('dontasktoask.section2.bad.name1')}: {t('dontasktoask.section2.bad.line3')}</ChatLine>
                <ChatLine>14:40 {t('dontasktoask.section2.bad.name2')}: {t('dontasktoask.section2.bad.line4')}</ChatLine>
                <ChatLine>14:45 {t('dontasktoask.section2.bad.name1')}: {t('dontasktoask.section2.bad.line5')}</ChatLine>
                <ChatLine>14:50 {t('dontasktoask.section2.bad.name2')}: {t('dontasktoask.section2.bad.line6')}</ChatLine>
                <Box
                  sx={{
                    mt: 2,
                    pt: 2,
                    borderTop: '1px dashed #fecaca',
                    fontStyle: 'italic',
                    fontSize: 13
                  }}
                >
                  {t('dontasktoask.section2.bad.result')}
                </Box>
              </BadChat>

              <GoodChat>
                <ChatLabel>
                  <span>✅</span>
                  {t('dontasktoask.section2.goodLabel')}
                </ChatLabel>
                <ChatLine>14:00 {t('dontasktoask.section2.good.name1')}: {t('dontasktoask.section2.good.line1')}</ChatLine>
                <ChatLine>14:02 {t('dontasktoask.section2.good.name2')}: {t('dontasktoask.section2.good.line2')}</ChatLine>
                <Box
                  sx={{
                    mt: 2,
                    pt: 2,
                    borderTop: '1px dashed #bbf7d0',
                    fontStyle: 'italic',
                    fontSize: 13
                  }}
                >
                  {t('dontasktoask.section2.good.result')}
                </Box>
              </GoodChat>
            </ChatContainer>
          </Section>

          {/* Section 3 */}
          <Section>
            <NumberedHeading as="h2" sx={{ fontSize: [3, 4] }}>
              <NumberBadge>3</NumberBadge>
              {t('dontasktoask.section3.title')}
            </NumberedHeading>
            <Text sx={{ fontSize: [2, 3], lineHeight: 1.6, mb: 3, color: 'slate' }}>
              {t('dontasktoask.section3.description')}
            </Text>
            <TipList as="ul">
              <TipItem as="li">
                <TipBullet />
                <Box>
                  <Text sx={{ fontWeight: 'bold', fontSize: 2 }}>{t('dontasktoask.section3.goal.title')}</Text>
                  <Text sx={{ fontSize: 2, color: 'slate' }}>{t('dontasktoask.section3.goal.desc')}</Text>
                </Box>
              </TipItem>
              <TipItem as="li">
                <TipBullet />
                <Box>
                  <Text sx={{ fontWeight: 'bold', fontSize: 2 }}>{t('dontasktoask.section3.attempt.title')}</Text>
                  <Text sx={{ fontSize: 2, color: 'slate' }}>{t('dontasktoask.section3.attempt.desc')}</Text>
                </Box>
              </TipItem>
              <TipItem as="li">
                <TipBullet />
                <Box>
                  <Text sx={{ fontWeight: 'bold', fontSize: 2 }}>{t('dontasktoask.section3.error.title')}</Text>
                  <Text sx={{ fontSize: 2, color: 'slate' }}>{t('dontasktoask.section3.error.desc')}</Text>
                </Box>
              </TipItem>
            </TipList>
          </Section>

          {/* Section 4 */}
          <Section>
            <NumberedHeading as="h2" sx={{ fontSize: [3, 4] }}>
              <NumberBadge>4</NumberBadge>
              {t('dontasktoask.section4.title')}
            </NumberedHeading>
            <Text sx={{ fontSize: [2, 3], lineHeight: 1.6, color: 'slate' }}>
              {t('dontasktoask.section4.description')}
            </Text>
          </Section>

          <SummaryBox>
            <Heading as="h3" sx={{ fontSize: [3, 4], mb: 2, color: 'white' }}>
              {t('dontasktoask.summary.title')}
            </Heading>
            <Text sx={{ fontSize: [2, 3], opacity: 0.95 }}>
              {t('dontasktoask.summary.text')}
            </Text>
            <Text
              sx={{
                fontSize: [3, 4],
                fontWeight: 'bold',
                mt: 3,
                fontFamily: 'heading'
              }}
            >
              {t('dontasktoask.summary.closing')}
            </Text>
          </SummaryBox>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}
