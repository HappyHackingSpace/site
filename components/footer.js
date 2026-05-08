import React from 'react'
import styled from '@emotion/styled'
import { Box, Container, Image, Grid, Heading, Link, Text } from 'theme-ui'
import NextLink from 'next/link'
import theme from '@happyhackingspace/theme'
import Icon from './icon'
import { useTranslation } from '../lib/i18n'


const FooterLinkText = styled.span`
  display: block;
  color: inherit;
  cursor: pointer;
  text-decoration: none;
  margin-bottom: ${theme.space[2]}px;
  
  &:hover {
    text-decoration: underline;
  }
`

const Base = styled(Box, { shouldForwardProp: prop => prop !== 'dark' })`
  background: ${props =>
    props.dark
      ? `${theme.colors.darker} radial-gradient(${theme.colors.black} 1px, transparent 1px)`
      : `${theme.colors.snow} url('/pattern.svg') repeat`};
  ${props =>
    props.dark &&
    `
      background-size: ${theme.space[4]}px ${theme.space[4]}px;
    `} @media print {
    display: none;
  }
`

const Logo = ({ dark, t, ...props }) => (
  <Image
    src="https://assets.happyhacking.space/flag-standalone.svg"
    alt={t('footer.title') + ' logo'}
    {...props}
  />
)

const Service = ({ href, icon, name = '', ...props }) => (
  <Link
    target="_blank"
    rel="noopener me"
    href={href}
    title={`Happy Hacking Space on ${name ? name : icon}`}
    {...props}
  >
    <Icon glyph={icon} />
  </Link>
)

const Footer = ({
  dark = false,
  email = 'team@happyhacking.space',
  children = undefined,
  ...props
}) => {
  const { t } = useTranslation()
  return (
    <Base
      color={dark ? 'muted' : 'slate'}
      py={[4, 5]}
      dark={dark}
      sx={{ textAlign: 'left' }}
      as="footer"
      {...props}
    >
      <Container px={[3, null, 4]}>
        {children}
        <Grid
          as="article"
          gap={[2, 4]}
          columns={[2, 3, 4]}
          sx={{
            px: 0,
            a: {
              textDecoration: 'none',
              color: 'muted',
              transition: '0.125s color ease-in-out',
              ':hover,:focus': { color: 'slate', textDecoration: 'underline' }
            },
            '> div > a': {
              display: 'block',
              mb: 2
            },
            'h2,p': { color: 'muted' },
            h2: { fontSize: 3 },
            'a,p': { fontSize: 2 }
          }}
        >
          <Box>
            <Heading as="h2" variant="subheadline" mb={3}>
              {t('footer.title')}
            </Heading>
            <NextLink href="/philosophy">
              <FooterLinkText>{t('footer.philosophy')}</FooterLinkText>
            </NextLink>
            <NextLink href="/team">
              <FooterLinkText>{t('footer.team')}</FooterLinkText>
            </NextLink>
            <NextLink href="/jobs">
              <FooterLinkText>{t('footer.jobs')}</FooterLinkText>
            </NextLink>
            <NextLink href="/brand">
              <FooterLinkText>{t('footer.branding')}</FooterLinkText>
            </NextLink>
            <NextLink href="/philanthropy">
              <FooterLinkText>{t('footer.donate')}</FooterLinkText>
            </NextLink>
            <NextLink href="/contact">
              <FooterLinkText>{t('footer.contact')}</FooterLinkText>
            </NextLink>
          </Box>
          <Box>
            <Heading as="h2" variant="subheadline" mb={3}>
              {t('footer.resources')}
            </Heading>
            <Link href="https://events.happyhacking.space/">{t('footer.communityEvents')}</Link>
            <NextLink href="/conduct">
              <FooterLinkText>{t('footer.codeOfConduct')}</FooterLinkText>
            </NextLink>
          </Box>
          <Box sx={{ gridColumn: ['span 2', 'span 1'] }}>
            <NextLink href="/" style={{ display: 'inline-block' }} aria-label="Go to homepage">
              <Logo t={t} aria-label={t('footer.title') + ' logo'} width={128} height={45} dark={dark} />
            </NextLink>
            <Grid
              columns={[8, 4]}
              gap={2}
              sx={{
                alignItems: 'center',
                ml: -1,
                my: 3,
                maxWidth: [null, 192],
                svg: { fill: 'currentColor', width: 32, height: 32 },
                a: {
                  lineHeight: 0,
                  mb: 0,
                  transition:
                    'transform .125s ease-in-out, color .125s ease-in-out',
                  ':hover,:focus': { transform: 'scale(1.125)' }
                },
                placeItems: 'center'
              }}
            >
              <Service
                href="https://discord.happyhacking.space"
                icon="discord"
                name={t('nav.community')}
                target="_blank"
              />
              <Service
                href="https://twitter.com/happyhackings"
                icon="twitter"
                name="Twitter"
              />
              <Service
                href="https://github.com/happyhackingspace"
                icon="github"
                name="GitHub"
              />
              <Service
                href="https://www.youtube.com/@HappyHackingSpace"
                icon="youtube"
                name="YouTube"
              />
              <Service
                href="https://www.instagram.com/happyhackingspace"
                icon="instagram"
                name="Instagram"
              />
              <Service href={`mailto:${email}`} icon="email-fill" name="Email" />
            </Grid>
          </Box>
        </Grid>
        <Text as="p" variant="caption" sx={{ mt: 3 }}>
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </Text>
      </Container>
    </Base>
  )
}

export default Footer
