import { Box, Heading, Container, Text, Button, Badge } from 'theme-ui'

import Meta from '@hackclub/meta'
import Head from 'next/head'
import ForceTheme from '../../components/force-theme'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import Icon from '../../components/icon'
import Features from '../../components/fiscal-sponsorship/first/features'

import Testimonials from '../../components/fiscal-sponsorship/first/testimonials'
import Start from '../../components/fiscal-sponsorship/first/start'
import theme from '@hackclub/theme'
import { Balancer } from 'react-wrap-balancer'
import { setCookie } from 'cookies-next'
import { useEffect } from 'react'
import Announcement from '../../components/announcement'

export default function First({ stats }) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const tubProgram = params.get('tub_program')
    const referral = params.get('referral')

    if (referral) {
      setCookie('referral', referral)
      setCookie('tub_program', 'GFGS')
    } else if (tubProgram) {
      setCookie('tub_program', tubProgram)
      setCookie('referral', '')
    }
  }, [])

  return (
    <>
      <style>
        {`*{
          scroll-behavior: smooth;
        }`}
      </style>
      <Meta
        as={Head}
        title="Financial Toolkit for FIRST Teams"
        description="HCB is the ultimate financial tool for FRC, FTC, and FLL teams to receive grants, fundraise, make purchases, and so much more."
        image="/fiscal-sponsorship/first/og-image.png"
      >
        <title>Financial Toolkit for FIRST Teams | HCB</title>
      </Meta>

      <Box as="main" key="main" sx={{ mb: 6 }}>
        <Nav dark />
        <ForceTheme theme="dark" />
        <Box
          sx={{
            pt: [5, null, null, null, 6],
            pb: [3, 4, 5, null, 6],
            minHeight: ['70vh', 'none'],
            textAlign: 'center',
            backgroundImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url('https://cloud-7chjcfuyw-hack-club-bot.vercel.app/0image.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Container
            sx={{
              width: '100%',
              mx: 'auto',
              px: 3,
              backdropFilter: 'blur(1.5px)'
            }}
          >
            <a
              href="https://hcb.hackclub.com/from/hack-club-site-first-page/J87HyN"
              style={{ textDecoration: 'none' }}
              target="_blank"
            >
              <Announcement
                copy="Win a Flipper Zero!"
                caption="We’re giving away a Flipper Zero to a lucky teenager! Join the Raffle by July 31st, 2025."
                imgSrc="/fiscal-sponsorship/first/flipper-zero.png"
                imgAlt="Flipper Zero"
                color="primary"
                textColor="slate"
                sx={{ mt: [3, 4, 4] }}
              />
            </a>

            <Heading
              as="h1"
              variant="ultratitle"
              sx={{
                textAlign: 'center',
                mt: [5, null, 6],
                textShadow: '0 0 16px rgba(0, 0, 0, 1)',
                maxWidth: 'container'
              }}
            >
              <Balancer>
                The ultimate financial tool for{' '}
                <Text
                  as="span"
                  sx={{
                    WebkitTextStroke: theme => theme.colors.blue,
                    WebkitTextStrokeWidth: '1px',
                    WebkitTextFillColor: theme => theme.colors.white,
                    textShadow: theme => `0 0 12px ${theme.colors.blue}`
                  }}
                >
                  FRC, FTC, and FLL teams
                </Text>
                .
              </Balancer>
            </Heading>
            <Badge
              variant="pill"
              sx={{
                bg: 'rgba(132,146,166, 0.5)',
                color: 'white',
                fontWeight: 'normal',
                fontSize: 2,
                mt: 3,
                mx: 'auto',
                borderRadius: ['default', null, 'extra']
              }}
            >
              <Box
                as="div"
                sx={{
                  display: ['grid', 'grid', 'flex'],
                  flexDirection: [null, 'row', 'row'],
                  gridTemplateColumns: ['1fr', '1fr 1fr']
                }}
              >
                <Box
                  as="span"
                  sx={{ display: 'flex', flexDirection: 'row', mr: 4 }}
                >
                  <Icon glyph="checkmark" size={28} color="#33d6A6" />
                  <Text sx={{ ml: 1 }}>Nonprofit status</Text>
                </Box>
                <Box
                  as="span"
                  sx={{ display: 'flex', flexDirection: 'row', mr: 4 }}
                >
                  <Icon glyph="checkmark" size={28} color="#33d6A6" />
                  <Text sx={{ ml: 1 }}>Receive grants</Text>
                </Box>
                <Box as="span" sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Icon glyph="checkmark" size={28} color="#33d6A6" />
                  <Text sx={{ ml: 1 }}>Debit cards</Text>
                </Box>
              </Box>
            </Badge>
            <Container
              as="p"
              sx={{
                fontSize: [2, 3, 3],
                textAlign: 'center',
                my: 4
              }}
              variant="copy"
            >
              Built by <i>FIRST</i> alumni for <i>FIRST</i> teams, HCB is a
              comprehensive financial platform used by hundreds of clubs, teams
              and hackathons.
            </Container>

            <Box
              sx={{
                display: 'flex',
                flexDirection: ['column', null, 'row'],
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Button variant="ctaLg" as="a" href="#demo">
                Open an account
              </Button>

              <Button
                sx={{
                  backgroundImage: theme.util.gx('cyan', 'blue'),
                  ml: 2,
                  display: ['none', null, 'inline-block'] // hide on mobile because viewing pdfs on mobile is a pain anyways
                }}
                variant="ctaLg"
                as="a"
                href="/fiscal-sponsorship/first/Hack_Club_Bank_for_FIRST_Teams.pdf"
                // @exu3: to edit this PDF, use this Figma file https://www.figma.com/file/LgadOH1lHUBOejA3vaNGgm/Hack-Club-Bank-for-FIRST-Teams-One-Pager?node-id=0%3A1&t=ZtkN2a3aw2IojFvi-1
                // message me on Slack if you need edit access
                target="_blank"
              >
                Download this page
              </Button>
            </Box>
          </Container>
        </Box>

        <Features />

        <Box id="testimonials">
          <Testimonials />
        </Box>

        <Box id="demo">
          <Start stats={stats} />
        </Box>
      </Box>
      <Footer dark />
    </>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`https://hcb.hackclub.com/stats`)
  try {
    const stats = await res.json()
    return {
      props: {
        stats
      },
      revalidate: 60 * 60 // once an hour
    }
  } catch (e) {
    return {
      props: {
        stats: {}
      },
      revalidate: 60 * 60 // once an hour
    }
  }
}
