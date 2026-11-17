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

const events = [
  {
    name: 'Hackathon: The Cultural Heritage and Digitalization ',
    description: `A hackathon focused on the cultural heritage and digitalization of the city of Diyarbakır and Mesopotamia.`,
    // logo: '',
    location: 'Diyarbakır, Turkey',
    season: 'December',
    year: '2024',
    // repo: 'culturehack',
    image: '/hackathons/culturehack.jpeg',
  },
  {
    name: 'Code Jam 181925',
    description: `An event dedicated to spreading the culture of competitive programming and the joy of hacking. Participants engaged in a series of challenges to test their coding skills and creativity.`,
    location: 'Diyarbakır, Turkey',
    season: 'January',
    year: '2025',
    image: '/codejams/firstcodejam.jpeg',
  },
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
  link
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
        {season}, {year} - {location}
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

const Page = ({ jobs }) => (
  <>
    <Meta
      as={Head}
      title="Events"
      description="Now and then, we gather, not just to build things, but to play, to wonder, to disrupt the ordinary. Let’s look back at how it all unfolded."
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
            alt="Happy Hackers at The Cultural Heritage and Digitalization Hackathon"
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
            Happy Hacking Space's Events
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
            Now and then, we gather, not just to build things, but to play, to wonder, to disrupt the ordinary.
            Let’s look back at how it all unfolded.
          </Heading>
          <Button
            as="a"
            variant="ctaLg"
            href="https://join.happyhacking.space"
            target="_blank"
            rel="noopener"
            sx={{ mt: 3, background: theme.util.gx('purple', 'blue') }}
          >
            Get ready for the next one!
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
            <Event key={`event-${i}`} {...event} />
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
            Looking for more? Happy Hackers often organise their own hackathons!
            Check them out at{' '}
            <Link
              href="https://hackathons.happyhacking.space"
              sx={{ color: 'white' }}
              target="_blank"
            >
              hackathons.happyhacking.space
            </Link>
            . Happy Hacking Space is also behind a series of{' '}
            <Link
              href="https://daysofservice.happyhacking.space/"
              sx={{ color: 'white' }}
              target="_blank"
            >
              Day of Service
            </Link>{' '}
            events and{' '}
            <Link
              href="https://events.happyhacking.space/"
              sx={{ color: 'white' }}
              target="_blank"
            >
              frequent virtual events
            </Link>
            .
          </Box>
        </Card>
      </Container>
    </Box>

    <Footer key="footer" />
  </>
)

export default Page
