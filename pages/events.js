import {
  Box,
  Button,
  Container,
  Heading,
  Card,
  Text,
  Grid,
  Flex,
  Image as Img,
  Link,
  Divider
} from 'theme-ui'
import Head from 'next/head'
import Meta from '@happyhackingspace/meta'
import ForceTheme from '../components/force-theme'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Icon from '../components/icon'
import Image from 'next/image'
import CultureHackPic from '../public/hackathons/culturedigitalizationhackathon.jpg'
import { compact } from 'lodash'
import theme from '@happyhackingspace/theme'
import { useTranslation } from '../lib/i18n'

const eventsData = [
  {
    key: 'cultureHack',
    year: '2024',
    image: '/hackathons/culturehack.jpeg'
  },
  {
    key: 'codeJam',
    year: '2025',
    image: '/codejams/firstcodejam.jpeg'
  }
]

const Event = ({
  name,
  logo,
  location,
  season,
  description,
  year,
  video,
  repo,
  ghTag,
  image,
  link,
  t
}) => (
  <Card variant="sunken">
    <Flex sx={{ alignItems: 'center', mb: 2 }}>
      <Img src={logo} sx={{ height: '24px', mr: 2 }} />
      <Heading as="h2">{name}</Heading>
    </Flex>
    <Box>{description}</Box>
    {video ? (
      <Box
        as="iframe"
        src={video}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        width="100%"
        height="250px"
        border="none"
        sx={{ borderRadius: '8px', mt: 2 }}
      />
    ) : (
      <a href={link}>
        <Img
          src={image}
          sx={{
            borderRadius: '8px',
            mt: 2,
            height: '250px',
            objectFit: 'cover',
            width: '100%',
            objectPosition: 'top'
          }}
        />
      </a>
    )}
    <Box sx={{ color: 'darkless' }}>
      <b>
        {t('events.dateTemplate', { season, year, location })}
      </b>{' '}
    </Box>
    <Box>
      {' '}
      {repo && (
        <Link href={`https://github.com/happyhackingspace/${repo}`}>
          <>github.com/happyhackingspace/{repo}</>
        </Link>
      )}
      {ghTag && (
        <Link href={`https://github.com/topics/${ghTag}`}>
          <>github.com/topics/{ghTag}</>
        </Link>
      )}
      {link && !repo && !ghTag && (
        <Link href={link}>
          <>{link.replace('https://', '')}</>
        </Link>
      )}
    </Box>
  </Card>
)

const Page = () => {
  const { t } = useTranslation()

  const events = eventsData.map(e => ({
    ...e,
    name: t(`events.items.${e.key}.name`),
    description: t(`events.items.${e.key}.description`),
    location: t(`events.items.${e.key}.location`),
    season: t(`events.items.${e.key}.season`)
  }))

  return (
    <>
      <Meta
        as={Head}
        title={t('events.meta.title')}
        description={t('events.meta.description')}
        image="/hackathons/culturedigitalizationhackathon.jpg"
      />
      <ForceTheme theme="light" />
      <Nav />
      <Box
        as="main"
        key="main"
        sx={{
          color: 'black'
        }}
      >
        <Box
          sx={{
            py: [5, 6],
            background:
              'linear-gradient(90deg, rgba(2,0,36,0.63) 0%, rgba(2,0,36,0.56) 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              zIndex: -1
            }}
          >
            <Image
              src={CultureHackPic}
              alt={t('events.imageAlt')}
              layout="fill"
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <Container>
            <Heading
              as="h1"
              sx={{
                fontSize: ['48px', '48px', '72px'],
                color: 'white',
                textShadow: 'elevated'
              }}
            >
              {t('events.hero.title')}
            </Heading>
            <Heading
              sx={{
                color: 'smoke',
                mt: 3,
                fontSize: ['18px', '24px'],
                lineHeight: ['1.5', '1.325'],
                maxWidth: '900px',
                margin: 'auto',
                fontWeight: 400,
                textShadow: 'small'
              }}
            >
              {t('events.hero.subtitle')}
            </Heading>
            <Button
              as="a"
              variant="ctaLg"
              href="https://discord.happyhacking.space"
              target="_blank"
              rel="noopener"
              sx={{ mt: 3, background: theme.util.gx('purple', 'blue') }}
            >
              {t('events.hero.button')}
            </Button>
          </Container>
        </Box>
        <Container sx={{ py: [3, 4], px: [2, 2, 0] }}>
          <Grid
            sx={{
              maxWidth: '64rem',
              mx: 'auto'
            }}
            align="left"
            columns={['1fr', '1fr 1fr']}
          >
            {events.map((event, i) => (
              <Event key={`event-${i}`} {...event} t={t} />
            ))}
          </Grid>
          <Card
            variant="sunken"
            sx={{
              textAlign: 'center',
              background: theme.util.gx('cyan', 'blue'),
              color: 'white',
              width: '100%',
              maxWidth: '64rem',
              mx: 'auto',
              mt: 3,
              fontSize: 2
            }}
          >
            <Box sx={{ maxWidth: '600px', mx: 'auto' }}>
              {t('events.moreCard.text1')}
              <Link
                href="https://hackathons.happyhacking.space"
                sx={{ color: 'white' }}
                target="_blank"
              >
                {t('events.moreCard.link1')}
              </Link>
              {t('events.moreCard.text2')}
              <Link
                href="https://daysofservice.happyhacking.space/"
                sx={{ color: 'white' }}
                target="_blank"
              >
                {t('events.moreCard.link2')}
              </Link>
              {t('events.moreCard.text3')}
              <Link
                href="https://events.happyhacking.space/"
                sx={{ color: 'white' }}
                target="_blank"
              >
                {t('events.moreCard.link3')}
              </Link>
              {t('events.moreCard.text4')}
            </Box>
          </Card>
        </Container>
      </Box>

      <Footer key="footer" />
    </>
  )
}

export default Page
