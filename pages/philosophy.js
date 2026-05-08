import Meta from '@happyhackingspace/meta'
import Head from 'next/head'
import { Box, Heading, Container, Text, Button, Link } from 'theme-ui'
import Nav from '../components/nav'
import styled from '@emotion/styled'
import Footer from '../components/footer'
import { useTranslation } from '../lib/i18n'

const Header = styled(Box)`
  color: white;
  height: 18rem; 
  background-image: linear-gradient(
    32deg,
    rgb(207, 45, 228) 0%,
    rgb(228, 45, 66) 64%,
    rgb(206, 41, 60) 100%
  );
  clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0% 90%);
  > div {
    position: relative;
  }
  @media screen and (min-width: 48em) {
    height: 36rem;  /* Desktop için büyük */
  }
`

const Seal = styled(Box)`
  border-radius: 9999px;
  background-color: white;
  color: black;
  mix-blend-mode: screen;
  text-align: center;
  width: 17rem;
  height: 16rem;
  position: absolute;
  margin-top: -1rem;
  left: 0;  
  transform: rotate(4deg);
  @media screen and (min-width: 32em) {
    transform: rotate(3deg);
    margin-top: -3rem;
  }
`

const Ultraline = styled(Heading)`
  line-height: 1.125 !important;
  text-transform: uppercase;
  color: 'white';
  caps: true;
  &:nth-of-type(2) {
    padding-left: 1.5rem;
    @media screen and (min-width: 48em) {
      padding-left: 6rem;
    }
  }
  &:nth-of-type(3) {
    text-align: center;
  }
  &:nth-of-type(4) {
    text-align: right;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      clip-path: polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%);
      background-color: rgba(252, 252, 252, 0.625);
      mix-blend-mode: overlay;
      right: -0.5rem;
      width: 9.5rem;
      height: 2.5rem;
      @media screen and (min-width: 32em) {
        width: 20rem;
        height: 5.5rem;
      }
    }
  }
`



const Row = styled(Container)`
  px: 3;
  py: [3, 4];
  color: 'black';
  display: grid;
  text-align: left;
  h2 {
    line-height: 1;
    margin-bottom: 18px;
  }
  @media screen and (min-width: 48em) {
    grid-gap: 24px;
    grid-template-columns: 2fr 3fr;
  }
`

Row.defaultProps = { sx: { px: 3, py: [3, 4], color: 'black' } }

const Super = styled(Text)`
  background-color: rgb(228, 115, 45);
  clip-path: polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%);
  color: rgb(255, 255, 255);
  display: inline-block;
  padding-bottom: 12px;
  padding-left: 18px;
  padding-right: 18px;
`

export default function Philosophy() {
  const { t } = useTranslation()

  return (
    <Box sx={{ bg: 'white', color: 'black', minHeight: '100vh' }}>
      <Nav />
      {/* TODO: Update description and iamge */}
      <Meta
        as={Head}
        title={t('philosophy.meta.title')}
        description={t('philosophy.meta.description')}
        image="https://cloud-cz9a6kt0a-hack-club-bot.vercel.app/0social-photo_2.jpg"
      />
      <Box>
        <Header>
          <Container
            width={1}
            sx={{ maxWidth: '56rem!important', py: '72px', px: 3 }}
            px={3}
            align="left"
          >
            <Ultraline sx={{ fontSize: [44, 54, 72, 96] }}>{t('philosophy.hero.line1')}</Ultraline>
            <Ultraline sx={{ fontSize: [44, 54, 72, 96] }}>{t('philosophy.hero.line2')}</Ultraline>
            <Ultraline sx={{ fontSize: [44, 54, 72, 96] }}>{t('philosophy.hero.line3')}</Ultraline>
            <Ultraline sx={{ fontSize: [44, 54, 72, 96] }}>{t('philosophy.hero.line4')}</Ultraline>
            <Seal pt={[3, 4]} sx={{ display: ['none', 'none', 'none', 'block']}}>
              <Heading
                fontSize={[1, 2]}
                sx={{
                  fontWeight: '400',
                  marginBlockStart: '0em',
                  fontSize: ['16px', '18px'],
                  textTransform: 'uppercase'
                  
                }}
                caps
              >
                {t('philosophy.hero.sealTitle')}
              </Heading>
              <Heading
                fontSize={[3, 4]}
                sx={{
                  fontWeight: '800',
                  marginBlockStart: '0em',
                  textTransform: 'uppercase'
                }}
              >
                {t('philosophy.hero.sealSubtitle')}
              </Heading>
            </Seal>
          </Container>
        </Header>
        <Row py={4} mt={[0, 4]}>
          <Heading
            as="h2"
            sx={{ fontSize: [36, 48] }}
            color="rgb(228, 45, 66);"
          >
            {t('philosophy.sections.superpower.title')}<Super>{t('philosophy.sections.superpower.highlight')}</Super>
          </Heading>
          <Box sx={{ fontSize: [3, 3] }}>
            {t('philosophy.sections.superpower.description')}
          </Box>
        </Row>
        <Row>
          <Heading
            as="h2"
            sx={{ fontSize: [36, 48] , py: 4}}
            color="rgb(207, 45, 228);"
          >
            {t('philosophy.sections.makeFromAnywhere.title')}
          </Heading>
          <Box sx={{ fontSize: [3, 3] , py: 4}}>
            {t('philosophy.sections.makeFromAnywhere.description')}
          </Box>
        </Row>
        <Row>
          <Heading
            as="h2"
            sx={{ fontSize: [36, 48], py: 4 }}
            color="rgb(115, 45, 228);"
          >
            {t('philosophy.sections.hackHackHack.title')}
          </Heading>
          <Box sx={{ fontSize: [3, 3] , py: 4}}>
            <strong>
              {t('philosophy.sections.hackHackHack.description')}
            </strong>
          </Box>
        </Row>
        <Row>
          <Heading as="h2" sx={{ fontSize: [36, 48], py: 4 }} color="rgb(45, 66, 228)">
            {t('philosophy.sections.startBuilding.title')}
          </Heading>
          <Box sx={{ fontSize: [3, 3] , py: 4}}>
            {t('philosophy.sections.startBuilding.description')}
          </Box>
        </Row>
        <Row>
          <Heading
            as="h2"
            sx={{ fontSize: [36, 48] , py: 4}}
            color="rgb(41, 143, 206)"
          >
            {t('philosophy.sections.learnAsYouBuild.title')}
          </Heading>
          <Box sx={{ fontSize: [3, 3] , py: 4}}>
            {t('philosophy.sections.learnAsYouBuild.description1')}
            <Link href="/workshops">{t('philosophy.sections.learnAsYouBuild.workshopsLink')}</Link>
            {t('philosophy.sections.learnAsYouBuild.description2')}
          </Box>
        </Row>
        <Row>
          <Heading
            as="h2"
            sx={{ fontSize: [36, 48], py: 4 }}
            color="rgb(36, 181, 165)"
          >
            {t('philosophy.sections.community.title')}
          </Heading>
          <Box sx={{ fontSize: [3, 3], py: 4 }}>
            {t('philosophy.sections.community.description')}
          </Box>
        </Row>
        <Box
          sx={{
            backgroundImage: t => t.util.gx('orange', 'red'),
            margin: 'auto',
            width: '600px',
            maxWidth: '90%',
            mb: 4,
            borderRadius: 8,
            color: 'white',
            textAlign: 'center',
            p: 4,
            pt: 3
          }}
        >
          <Heading as="h1" sx={{ fontSize: 5, mb: 2 }}>
            {t('philosophy.cta.title')}
          </Heading>
          {/* <Button
            mr={[0, 3]}
            mb={[3, 0]}
            sx={{
              bg: 'white',
              color: 'red',
              display: ['block', 'inline-block'],
              mx: 'auto'
            }}
            as="a"
            href="https://apply.hackclub.com"
          >
            Start a club
          </Button> */}
            <Button
              sx={{ bg: 'white', color: 'red' }}
              as="a"
              href="https://discord.happyhacking.space"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('philosophy.cta.button')}
            </Button>
        </Box>
      </Box>
      <Footer light />
    </Box>
  )
}
