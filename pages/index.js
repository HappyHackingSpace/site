import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
  Container
} from 'theme-ui'
import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { LazySection } from '../hooks/useInView'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Meta from '@happyhackingspace/meta'
import Nav from '../components/nav'
import BGImg from '../components/background-image'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
import Stage from '../components/stage'
// import Snowfall from '../components/snowfall'
import CardRenderer from '../components/index/cards/card-renderer'
import Slack from '../components/index/cards/slack'
import MailingList from '../components/index/cards/mailing-list'
// Lazy load heavy components with skeletons for better perceived performance
const Carousel = dynamic(() => import('../components/index/carousel'), {
  loading: () => {
    const { CarouselSkeleton } = require('../components/loading-skeletons')
    return <CarouselSkeleton />
  },
  ssr: true // Carousel is above fold
})

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <Box
      sx={{
        borderBottom: '1px solid',
        borderColor: 'sunken',
        py: 3,
        '&:last-child': { borderBottom: 'none' }
      }}
    >
      <Flex
        onClick={onToggle}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          '&:hover h3': { color: 'red' }
        }}
      >
        <Heading
          as="h3"
          variant="subheadline"
          sx={{
            fontSize: [2, 3],
            m: 0,
            transition: 'color 0.2s ease',
            color: isOpen ? 'red' : 'inherit'
          }}
        >
          {question}
        </Heading>
        <Icon
          glyph={isOpen ? 'view-close' : 'plus'}
          sx={{
            flexShrink: 0,
            ml: 3,
            color: isOpen ? 'red' : 'muted',
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(90deg)' : 'none'
          }}
        />
      </Flex>
      <Box
        ref={contentRef}
        sx={{
          height: `${height}px`,
          overflow: 'hidden',
          transition: 'height 0.3s ease-in-out'
        }}
      >
        <Text
          as="p"
          variant="subtitle"
          sx={{
            mt: 3,
            mb: 0,
            fontSize: [1, 2],
            color: 'slate',
            lineHeight: 'tall'
          }}
        >
          {answer}
        </Text>
      </Box>
    </Box>
  )
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'What is HHS?',
      answer: 'Happy Hacking Space is a non-profit community of hackers, crafters, and explorers in Mesopotamia who build together.'
    },
    {
      question: 'How can I join?',
      answer: 'You can become a part of our community by joining our Discord channel or attending our physical events.'
    },
    {
      question: 'Is it free?',
      answer: 'Yes, joining our community and most of our events is completely free. Some special workshops may require covering material costs.'
    }
  ]

  return (
    <Box
      id="faq"
      as="section"
      sx={{
        py: [5, 6],
        bg: 'snow'
      }}
    >
      <Container sx={{ maxWidth: 'layout' }}>
        <Text
          variant="eyebrow"
          as="h4"
          sx={{ color: 'red', textAlign: 'center', mb: 2 }}
        >
          FAQ
        </Text>
        <Heading
          as="h2"
          variant="title"
          sx={{ textAlign: 'center', mb: [4, 5], fontSize: [4, 5, 6] }}
        >
          Frequently Asked Questions
        </Heading>
        <Box
          sx={{
            maxWidth: '800px',
            mx: 'auto',
            bg: 'white',
            p: [3, 4],
            borderRadius: 'extra',
            boxShadow: 'card'
          }}
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </Box>
      </Container>
    </Box>
  )
}

const Sinerider = dynamic(() => import('../components/index/cards/sinerider'), {
  loading: () => {
    const { SprigSkeleton } = require('../components/loading-skeletons')
    return <SprigSkeleton />
  },
  ssr: false
})
import OuternetImgFile from '../public/home/outernet-110.jpg'
import Announcement from '../components/announcement'
import dynamic from 'next/dynamic'

// Lazy load heavy easter egg components
const Konami = dynamic(() => import('react-konami-code'), { ssr: false })
// Critical above-the-fold components (keep synchronous)
import Secret from '../components/secret'
import Icon from '../components/icon'
import Photo from '../components/photo'
import Comma from '../components/comma'

// Lazy load below-the-fold components
const GitHub = dynamic(() => import('../components/index/github'), {
  loading: () => {
    const { GitHubSkeleton } = require('../components/loading-skeletons')
    return <GitHubSkeleton />
  },
  ssr: false
})

const CTAS = dynamic(() => import('../components/index/ctas'), { ssr: false })

// Unused components removed to reduce bundle size
// Available for dynamic import when needed:
// - MailingList, Slack, Som, Athena, Highway, Shipwrecked

import ANNOUNCEMENTS_DATA from '../lib/announcements.json'

function getActiveAnnouncements() {
  const now = new Date()
  return ANNOUNCEMENTS_DATA.filter(a => !a.disabled && new Date(a.expiresAt) > now)
}

function Page({
  carouselCards,
  ctaCards,
  cardsList,
  events: initialEvents
}) {
  // Client-side API data states for async loading
  const [apiData, setApiData] = useState({
    slackData: { total_members_count: 500 }, // fallback
    gitHubData: [],
    consoleCount: 500,
    stars: {
      sprig: { stargazerCount: 1000 },
      sinerider: { stargazerCount: 500 },
      blot: { stargazerCount: 300 },
      onboard: { stargazerCount: 200 }
    },
    game: [],
    events: initialEvents || [],
    hackathonsData: []
  })

  const [loadingStates, setLoadingStates] = useState({
    slack: true,
    github: true,
    stars: true,
    games: true,
    console: true,
    hackathons: true
  })

  // Pick a random active announcement on client to avoid hydration mismatches
  const [announcement, setAnnouncement] = useState(null)

  // Optimize UI state management for better performance
  const [uiState, setUiState] = useState({
    gameImage: '',
    gameImage1: '',
    reveal: false,
    hover: true,
    github: 0,
    slackKey: 0,
    key: 0
  })

  // Memoized setters to prevent unnecessary re-renders
  const setReveal = useCallback((value) => {
    setUiState(prev => ({ ...prev, reveal: value }))
  }, [])

  const setHover = useCallback((value) => {
    setUiState(prev => ({ ...prev, hover: value }))
  }, [])

  const { asPath } = useRouter()

  let jsConfetti = useRef()

  useEffect(() => {
    // Dynamically load JSConfetti only when needed
    const loadJSConfetti = async () => {
      const JSConfettiModule = await import('js-confetti')
      jsConfetti.current = new JSConfettiModule.default()
    }

    loadJSConfetti()

    window.kc = `In the days of old, when gaming was young \nA mysterious code was found among \nA sequence of buttons, pressed in a row \nIt unlocked something special, we all know \n\nUp, up, down, down, left, right, left, right \nB, A, Start, we all have heard it's plight \nIn the 8-bit days, it was all the rage \nAnd it still lives on, with time, it will never age \n\nKonami Code, it's a legend of days gone by \nIt's a reminder of the classics we still try \nNo matter the game, no matter the system \nThe code will live on, and still be with them \n\nSo the next time you play, take a moment to pause \nAnd remember the code, and the Konami cause \nIt's a part of gaming's history, and a part of our lives \nLet's keep it alive, and let the Konami Code thrive!\n`
    window.paper = `Welcome, intrepid hacker! We'd love to have you in our community. Get your invite at hack.af/slack. Under "Why do you want to join the Hack Club Slack?" add a 🦄 and we'll ship you some exclusive stickers! `
  }, [])

  // Async API loading - GitHub data (loads after initial page render)
  useEffect(() => {
    const loadGitHubData = async () => {
      try {
        const response = await fetch('/api/github')
        if (response.ok) {
          const data = await response.json()
          setApiData(prev => ({ ...prev, gitHubData: data }))
        }
      } catch (error) {
        console.warn('GitHub API failed, using fallback:', error)
      } finally {
        setLoadingStates(prev => ({ ...prev, github: false }))
      }
    }

    // Delay GitHub API call to prioritize critical content
    const timer = setTimeout(loadGitHubData, 500)
    return () => clearTimeout(timer)
  }, [])

  // Async API loading - Slack data (DISABLED - using fallback data)
  useEffect(() => {
    // const loadSlackData = async () => {
    //   try {
    //     const response = await fetch('/api/slack')
    //     if (response.ok) {
    //       const data = await response.json()
    //       setApiData(prev => ({ ...prev, slackData: data }))
    //     }
    //   } catch (error) {
    //     console.warn('Slack API failed, using fallback:', error)
    //   } finally {
    //     setLoadingStates(prev => ({ ...prev, slack: false }))
    //   }
    // }
    // const timer = setTimeout(loadSlackData, 300)

    // Just use fallback data and mark as loaded
    setLoadingStates(prev => ({ ...prev, slack: false }))

    // return () => clearTimeout(timer)
  }, [])

  // Async API loading - GitHub Stars (ACTIVE - fetching real star counts)
  useEffect(() => {
    const loadStars = async () => {
      try {
        const response = await fetch('/api/stars')
        if (response.ok) {
          const data = await response.json()
          setApiData(prev => ({ ...prev, stars: data }))
        }
      } catch (error) {
        console.warn('Stars API failed, using fallback:', error)
      } finally {
        setLoadingStates(prev => ({ ...prev, stars: false }))
      }
    }

    const timer = setTimeout(loadStars, 800)
    return () => clearTimeout(timer)
  }, [])

  // Async API loading - Sprig Games (DISABLED - using fallback data)
  useEffect(() => {
    // const loadGames = async () => {
    //   try {
    //     const response = await fetch('/api/games')
    //     if (response.ok) {
    //       const data = await response.json()
    //       setApiData(prev => ({ ...prev, game: data }))
    //     }
    //   } catch (error) {
    //     console.warn('Games API failed, using fallback:', error)
    //   } finally {
    //     setLoadingStates(prev => ({ ...prev, games: false }))
    //   }
    // }
    // const timer = setTimeout(loadGames, 1000)

    // Just use fallback data and mark as loaded
    setLoadingStates(prev => ({ ...prev, games: false }))

    // return () => clearTimeout(timer)
  }, [])

  // Async API loading - Console Count (DISABLED - using fallback data)
  useEffect(() => {
    // const loadConsoleCount = async () => {
    //   try {
    //     const response = await fetch('/api/sprig-console')
    //     if (response.ok) {
    //       const data = await response.json()
    //       setApiData(prev => ({ ...prev, consoleCount: data }))
    //     }
    //   } catch (error) {
    //     console.warn('Console API failed, using fallback:', error)
    //   } finally {
    //     setLoadingStates(prev => ({ ...prev, console: false }))
    //   }
    // }
    // const timer = setTimeout(loadConsoleCount, 1200)

    // Just use fallback data and mark as loaded
    setLoadingStates(prev => ({ ...prev, console: false }))

    // return () => clearTimeout(timer)
  }, [])

  const easterEgg = () => {
    alert('Hey, you typed the Konami Code!')

    jsConfetti.current.addConfetti({
      confettiColors: [
        // Happy Hacking Space colours!
        '#ec3750',
        '#ff8c37',
        '#f1c40f',
        '#33d6a6',
        '#5bc0de',
        '#338eda',
        '#a633d6'
      ]
    })
  }

  useEffect(() => {
    if (uiState.reveal && !uiState.hover) {
      setTimeout(() => {
        setReveal(false)
      }, 2000)
    }
  }, [uiState.reveal, uiState.hover, setReveal])

  const [count, setCount] = useState(0)

  // Memoize images array to prevent unnecessary re-renders
  const images = useMemo(() => [
    { alt: 'Map of Happy Hacking Spaces in and around the Mesopotamia', src: '/diyarmap.png' },
    { alt: 'Happy Hackers organized code jam', src: '/codejams/firstcodejam.jpeg' },
    { alt: 'Happy Hackers at Language Club', src: '/home/langclub.jpeg' },
    { alt: 'Happy Hackers organized hackathon', src: '/hackathons/culturehack.jpeg' },
  ], [])

  // janky right now and does not show last image

  useEffect(() => {
    console.log(
      `White sheets of paper\nWaiting to be printed on\nA blank console waits`
    )
    if (count === images.length - 1) {
      setCount(0)
    }
  }, [count, images.length])

  // Pick a random active announcement on mount
  useEffect(() => {
    const active = getActiveAnnouncements()
    if (active.length > 0) {
      const randomIndex = Math.floor(Math.random() * active.length)
      setAnnouncement(active[randomIndex])
    }
  }, [])

  // Spotlight effect with throttling for performance
  const spotlightRef = useRef()
  const spotlightContainerRef = useRef()
  const throttleRef = useRef(null)

  useEffect(() => {
    const handler = event => {
      // Throttle mousemove to 60fps for better performance
      if (throttleRef.current) return

      throttleRef.current = requestAnimationFrame(() => {
        const spotlightElement = spotlightContainerRef.current
        if (!spotlightElement) {
          throttleRef.current = null
          return
        }

        const rect = spotlightElement.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        if (spotlightRef.current) {
          spotlightRef.current.style.background = `radial-gradient(
            circle at ${x}px ${y}px,
            rgba(132, 146, 166, 0) 10px,
            rgba(249, 250, 252, 0.9) 80px
          )`
        }
        throttleRef.current = null
      })
    }

    window.addEventListener('mousemove', handler)
    return () => {
      window.removeEventListener('mousemove', handler)
      if (throttleRef.current) {
        cancelAnimationFrame(throttleRef.current)
      }
    }
  }, [])

  return (
    <>
      {/* <Meta
        as={Head}
        title="A Home for Hackers"
        description="Happy Hacking Space is a nonprofit network of hackers in Mesopotamia where people build the agency, the network, & the technical talent to think big & do big things in the world."
      /> */}
      <Meta
        as={Head}
        title="A Home for Hackers"
        description="Happy Hacking Space is a nonprofit network of hackers, crafters, explorers where people build the agency, the network, & the technical talent to think big & do big things in the world."
      />
      <Head>
        <meta
          property="og:logo"
          content="https://assets.happyhacking.space/flag-standalone.svg"
          size="512x512"
        />
      </Head>
      {/* <Snowfall /> */}
      <ForceTheme theme="light" />
      <Nav forceBurgerWhite />
      <Box
        as="main"
        sx={{
          overflowX: 'hidden',
          position: 'relative'
        }}
      >
        <Secret
          reveal={uiState.reveal}
          onMouseEnter={() => {
            setHover(true)
            console.log(uiState.hover)
          }}
          onMouseOut={() => {
            setReveal(false)
          }}
        />
        <Konami action={easterEgg}>
          {"Hey, I'm an Easter Egg! Look at me!"}
        </Konami>
        <Box
          as="header"
          sx={{
            bg: 'dark',
            minHeight: '85vh',
            pt: [5, 6],
            pb: [2, 3],
            textAlign: 'left',
            position: 'relative',
            overflowX: 'hidden'
          }}
        >
          <BGImg
            src={OuternetImgFile}
            alt="Happy Hackers at Diyarbakir Outdoor Meeting"
            priority
            gradient="linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.45))"
          />
          {announcement && (
            <Announcement
              width="90vw"
              copy={announcement.copy}
              caption={announcement.caption}
              href={announcement.href}
              imgSrc={announcement.imgSrc}
              imgAlt={announcement.imgAlt}
              sx={{ mt: [0, -1, -3] }}
            />
          )}
          <Box
            sx={{
              width: '90vw',
              maxWidth: [null, 'layout'],
              position: 'relative',
              mx: 'auto',
              py: [4, 4, 4],
              textShadow: 'text'
            }}
          >
            <Text
              variant="eyebrow"
              sx={{
                color: 'sunken',
                pb: 2,
                pt: 0,
                position: 'relative',
                display: 'block'
              }}
              as="h4"
            >
              Welcome to Happy Hacking Space
            </Text>
            <Heading>
              <Text
                as="p"
                variant="title"
                sx={{
                  color: 'white',
                  mb: [3, 4],
                  zIndex: 1,
                  textAlign: 'left',
                  fontSize: ['42px', '52px', '64px'],
                  lineHeight: 1.2,
                  width: '100%'
                }}
              >
                We are
                {/* <Comma>{apiData.slackData.total_members_count}</Comma>{' '} */}
                <Text
                  sx={{
                    color: 'transparent',
                    ml: 2,
                    mr: 3,
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Text
                    onClick={() => {
                      !uiState.reveal ? setReveal(true) : setReveal(false)
                    }}
                    sx={{
                      // lineHeight: 0.875,
                      px: 2,
                      backgroundColor: 'red',
                      position: 'absolute',
                      borderRadius: 10,
                      transform: 'rotate(-3deg) translateY(-5px)',
                      color: 'white',
                      whiteSpace: 'nowrap',
                      textDecoration: 'none',
                      '&:hover': {
                        cursor: 'pointer'
                      }
                    }}
                    aria-hidden="true"
                  >
                    hackers
                  </Text>
                  hackers
                </Text>
                <br sx={{ display: ['inline', 'none', 'none'] }} /> from in and around
                the Mesopotamia who hack together
              </Text>
            </Heading>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button
                variant="ctaLg"
                as="a"
                href="https://discord.happyhacking.space"
                mt={[3, 0, 0]}
                mr={3}
                sx={{ transformOrigin: 'center left' }}
              >
                Join us
              </Button>
              {ctaCards && ctaCards.length > 0 && (
                <Text
                  variant="eyebrow"
                  as="h4"
                  sx={{
                    fontSize: ['16px', 2, 3],
                    maxWidth: 'layout',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    alignSelf: 'center',
                    color: 'white',
                    textShadow:
                      'rgba(0, 0, 0, 1) 0 0 10px, rgba(0, 0, 0, 1) 0 0 10px, rgba(0, 0, 0, 0.5) 0 0 10px'
                  }}
                >
                  Or, See what we're hacking on:
                </Text>
              )}
            </Box>
            <CTAS cards={ctaCards || []} />
            <Button
              sx={{
                background: 'rgba(255, 255, 255, 0.3)',
                color: 'white',
                borderRadius: '100px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                px: 3,
                py: 2,
                width: 'fit-content',
                textTransform: 'none',
                fontWeight: 'normal',
                fontSize: [1, '16px', '18px'],
                backdropFilter: 'blur(2px)',
                zIndex: 999
              }}
              as="a"
              href="#spotlight"
            >
              <Icon glyph="rep" sx={{ color: 'inherit', mr: 2 }} size={24} />
              View more programs
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: ['flex-start', 'flex-start', 'flex-end'],
              marginRight: 2,
              mt: [3, 3, 4]
            }}
          >
            <Badge
              as="a"
              href="https://discord.happyhacking.space"
              target="_blank"
              rel="noopener"
              variant="pill"
              sx={{
                zIndex: '1',
                bg: 'black',
                color: 'white',
                opacity: 1,
                textDecoration: 'none',
                fontWeight: 'normal',
                ':hover': { opacity: 1 },
                transition: '0.3s ease'
                // mixBlendMode: 'multiply'
              }}
              title="📸 Photo by Seyma Alpay Bakir, Diyarbakir"
            >
              Hackers at AMA with HHS
            </Badge>
          </Box>
        </Box>
        <Box as="section" sx={{ py: [4, 5, '82px'], color: 'black' }}>
          <Box
            sx={{
              position: 'relative',
              width: '90vw',
              maxWidth: 'layout',
              margin: 'auto'
            }}
          >
            <Text
              variant="title"
              as="h1"
              sx={{ fontSize: ['36px', '48px', '56px'] }}
            >
              Discover the{' '}
              <Text
                as="span"
                sx={{
                  borderRadius: 'default',
                  px: 1,
                  mx: 0,
                  whiteSpace: ['wrap', 'nowrap', 'nowrap'],
                  color: 'white',
                  background: theme => theme.util.gx('red', 'orange'),
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                joy of hacking
              </Text>
              , together.
            </Text>
            <Text
              variant="subtitle"
              as="p"
              sx={{
                fontSize: ['18px', '20px', '22px'],
                pb: [3, 3, 4],
                maxWidth: '62ch'
              }}
            >
              Every day, hackers of Happy Hacking Space gather online and
              in-person to hack, craft,and explore, together. Whether you're a beginner
              programmer or have years of experience, there's a place for you at
              Happy Hacking Space. Read about our{' '}
              <Link href="/philosophy" target="_blank" rel="noopener">
                hacker ethic
              </Link>
              .
            </Text>
            <Grid columns={[1, 1, 1, '2.5fr 3fr']} gap={[0, 3, 4]} pt={[3, 4]}>
              <Box
                sx={{
                  position: 'relative',
                  height: ['300px', '300px', '300px', '100%'],
                  py: [3, 3, 3, 0]
                }}
                onClick={() => {
                  setCount(count + 1)
                }}
              >
                <Box
                  sx={{ position: 'absolute', width: '100%', height: '100%' }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: ['300px', '300px', '100%'],
                      figure: {
                        position: 'absolute',
                        transform:
                          count % 2 === 0 ? 'rotate(3deg)' : 'rotate(-3deg)',
                        height: '85%',
                        width: ['80%', '80%', '70%', '100%'],
                        marginLeft: ['10%', '10%', '15%', '0']
                      },
                      zIndex: 3,
                      '&:hover': {
                        cursor: 'pointer'
                      }
                    }}
                  >
                    <Photo
                      src={
                        count === images.length - 2
                          ? images[0].src
                          : images.length - 1
                            ? images[1].src
                            : images[count + 2].src
                      }
                      alt={
                        count === images.length - 2
                          ? images[0].alt
                          : images.length - 1
                            ? images[1].alt
                            : images[count + 2].alt
                      }
                      width={800}
                      height={680}
                      showAlt
                    />
                  </Box>
                </Box>
                <Box
                  sx={{ position: 'absolute', width: '100%', height: '100%' }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: ['300px', '300px', '100%'],
                      figure: {
                        position: 'absolute',
                        transform:
                          count % 2 === 0 ? 'rotate(-3deg)' : 'rotate(3deg)',
                        height: '85%',
                        width: ['80%', '80%', '70%', '100%'],
                        marginLeft: ['10%', '10%', '15%', '0']
                      },
                      zIndex: 3,
                      '&:hover': {
                        cursor: 'pointer'
                      }
                    }}
                  >
                    <Photo
                      src={
                        count === images.length - 1
                          ? images[0].src
                          : images[count + 1].src
                      }
                      alt={
                        count === images.length - 1
                          ? images[0].alt
                          : images[count + 1].alt
                      }
                      width={800}
                      height={680}
                      showAlt
                    />
                  </Box>
                </Box>
                <Box
                  sx={{ position: 'absolute', width: '100%', height: '100%' }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: ['300px', '300px', '100%'],
                      figure: {
                        position: 'absolute',
                        transform:
                          count % 2 === 0 ? 'rotate(3deg)' : 'rotate(-3deg)',
                        height: '85%',
                        width: ['80%', '80%', '70%', '100%'],
                        marginLeft: ['10%', '10%', '15%', '0']
                      },
                      zIndex: 3,
                      '&:hover': {
                        cursor: 'pointer'
                      }
                    }}
                  >
                    <Photo
                      src={images[count].src}
                      alt={images[count].alt}
                      width={800}
                      height={680}
                      showAlt
                    />
                  </Box>
                </Box>
              </Box>
              <Grid
                columns="1fr"
                sx={{
                  gridColumnGap: 3,
                  span: {
                    width: 36,
                    height: 36,
                    borderRadius: 24,
                    display: 'inline-block',
                    fontSize: 2,
                    lineHeight: '30px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    border: '3px solid currentColor'
                  },
                  p: { my: 0, fontSize: ['18px', '20px', '22px'] },
                  strong: { display: 'block', fontSize: ['22px', 2, 3] }
                }}
                as="ul"
              >
                <Grid
                  columns="auto 1fr"
                  sx={{
                    transitionDuration: '0.52s',
                    py: 2,
                    px: 2,
                    color: 'inherit',
                    position: 'relative',
                    textDecoration: 'none',
                    borderRadius: 'extra'
                  }}
                  as="li"
                >
                  <Text as="span" color="red" aria-hidden="true">
                    1
                  </Text>
                  <Text as="p" variant="subtitle">
                    <strong sx={{ mb: 1 }}>
                      Connect with other coders
                    </strong>
                    Have a coding question? Looking for project feedback? You'll
                    find hundreds of fabulous people to talk to in our {' '}
                    <Link href="https://discord.happyhacking.space" target="_blank" rel="noopener">
                      Community{' '}
                    </Link>
                    , active at all hours.
                  </Text>
                </Grid>
                <Grid
                  columns="auto 1fr"
                  sx={{
                    transitionDuration: '0.52s',
                    py: 2,
                    px: 2,
                    color: 'inherit',
                    position: 'relative',
                    textDecoration: 'none',
                    borderRadius: 'extra'
                  }}
                  as="li"
                >
                  <Text as="span" color="orange" aria-hidden="true">
                    2
                  </Text>
                  <Text
                    as="p"
                    variant="subtitle"
                    sx={{
                      mt: 0
                    }}
                  >
                    <strong sx={{ mb: 1 }}>
                      Build open source learning tools
                    </strong>
                    We build open source projects together
                    {/* (
                    <Link href="https://github.com/happyhackingspace" target="_blank">
                      3k+&nbsp;PRs a year
                    </Link>
                    ) */}
                    like this website, game, AI tools, security tools, and
                    more!
                  </Text>
                </Grid>
                <Grid
                  columns="auto 1fr"
                  sx={{
                    transitionDuration: '0.52s',
                    py: 2,
                    px: 2,
                    color: 'inherit',
                    position: 'relative',
                    textDecoration: 'none',
                    borderRadius: 'extra'
                  }}
                  as="li"
                >
                  <Text as="span" color="yellow" aria-hidden="true">
                    3
                  </Text>
                  <Text as="p" variant="subtitle">
                    <strong sx={{ mb: 1 }}>Gather IRL with other hackers</strong>
                    Meet other Happy Hackers in the community to build
                    together at one of the community events{' '}
                    <Link href="/events" target="_blank" rel="noopener">
                      Events
                    </Link>{' '}
                    and{' '}
                    <Link href="/hackathons" target="_blank" rel="noopener">
                      Hackathons
                    </Link>
                    .
                  </Text>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <LazySection
          fallback={
            <Box sx={{ py: 4 }}>
              {(() => {
                const { CarouselSkeleton } = require('../components/loading-skeletons')
                return <CarouselSkeleton />
              })()}
            </Box>
          }
        >
          <Carousel cards={carouselCards} />
        </LazySection>
        <Box
          id="spotlight"
          ref={spotlightContainerRef}
          as="section"
          sx={{
            backgroundImage: `
              linear-gradient(rgba(249, 250, 252, 0.7), rgba(249, 250, 252, 0.7)),
              url('https://icons.hackclub.com/api/icons/0x8492a6/glyph:rep.svg')
            `,
            backgroundSize: '40px 40px',
            backgroundRepeat: 'repeat',
            position: 'relative'
          }}
        >
          <Box
            ref={spotlightRef}
            sx={{
              position: 'absolute',
              zIndex: 2,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(249, 250, 252, 1)',
              pointerEvents: 'none'
            }}
          />
          <Box
            sx={{
              position: 'relative',
              width: '90vw',
              maxWidth: 'layout',
              margin: 'auto',
              zIndex: 5
            }}
            py={[4, 4, 5]}
          >
            <Box>
              <Text variant="title" sx={{ fontSize: ['36px', 4, 5] }}>
                Connect with{' '}
                <Text
                  as="span"
                  sx={{
                    borderRadius: 'default',
                    px: 2,
                    mx: 0,
                    whiteSpace: 'nowrap',
                    color: 'white',
                    bg: 'red'
                  }}
                >
                  builders
                </Text>{' '}
                from the community
              </Text>
              <Text
                variant="subtitle"
                as="p"
                sx={{ fontSize: ['18px', '20px', '22px'], pb: [3, 0, 0] }}
              >
                We gather both online and in-person to share our love of code
                and make things together!
              </Text>
            </Box>
            <CardRenderer cards={cardsList.filter(c => c.section === 'community')} />
            <Slack
              slackKey={uiState.slackKey}
              data={apiData.slackData}
              events={apiData.events}
              loading={loadingStates.slack}
            />
          </Box>
        </Box>
        <Box>
          <Box py={[4, 5, '82px']}>
            <Box
              sx={{
                width: '90vw',
                maxWidth: 'layout',
                margin: 'auto',
                position: 'relative'
              }}
            >
              <Flex
                sx={{
                  flexDirection: ['column', 'column', 'column', 'row'],
                  justifyContent: apiData.gitHubData.length > 0 ? 'center' : 'flex-start',
                  alignItems: [
                    'flex-start',
                    'flex-start',
                    'flex-start',
                    'center'
                  ],
                  gap: '10px'
                }}
              >
                <Box sx={{ mb: [3, 0, 0] }}>
                  <Text
                    variant="title"
                    as="h2"
                    sx={{
                      fontSize: ['36px', '48px', '56px'],
                      maxWidth: '20ch'
                    }}
                  >
                    We build{' '}
                    <Text
                      as="span"
                      sx={{
                        borderRadius: 'default',
                        mx: 0,
                        whiteSpace: 'nowrap',
                        color: 'orange'
                      }}
                    >
                      open source
                    </Text>{' '}
                    games and tools together
                  </Text>
                  <Text
                    variant="subtitle"
                    as="p"
                    sx={{
                      fontSize: ['18px', '20px', '22px'],
                      pb: [3, 0, 0],
                      maxWidth: '60ch'
                    }}
                  >
                    In collaboration with engineers on the Happy Hacking Space team,
                    Happy Hackers build learning tools for each other. Get
                    involved with these projects by building something with our
                    tools or contribute to the tools themselves.
                  </Text>
                </Box>
                {apiData.gitHubData.length > 0 && (
                  <Flex
                    sx={{
                      flexDirection: ['row', null, null, 'column'],
                      gap: [1, 2, 2],
                      alignItems: ['center', 'center', 'center', 'flex-start'],
                      flexWrap: 'wrap',
                      width: ['100%', null, null, 'fit-content'],

                      '& > a:nth-child(n+4)': {
                        display: ['none', null, null, 'flex']
                      }
                    }}
                  >
                    <Text
                      sx={{
                        fontSize: ['11px', '11px', '14px'],
                        textAlign: 'left',
                        lineHeight: '90%',
                        fontStyle: 'italic',
                        width: 'fit-content'
                      }}
                    >
                      Live from GitHub
                    </Text>
                    {apiData.gitHubData
                      .filter(data => !data.user.endsWith('[bot]'))
                      .slice(0, 4)
                      .map((data, key) => {
                        return (
                          <GitHub
                            type={data.type}
                            img={data.userImage}
                            user={data.user}
                            time={data.time}
                            url={data.url}
                            message={data.message}
                            key={key}
                            opacity={1 / (key / 2 + 1)}
                          />
                        )
                      })}
                  </Flex>
                )}
              </Flex>
              <CardRenderer cards={cardsList.filter(c => c.section === 'opensource')} />
              {/* <Workshops delay={400} stars={stars.happyhackingspace.stargazerCount} /> */}
            </Box>
          </Box>
          <Box
            sx={{
              position: 'relative',
              background: 'snow',
              backgroundImage: `url('https://icons.hackclub.com/api/icons/0xF4F7FB/glyph:rep.svg')`,
              backgroundSize: '40px 40px',
              backgroundRepeat: 'repeat',
              backgroundPosition: '10% 10%'
              // '&:hover': {
              //   backgroundImage: `url('https://icons.hackclub.com/api/icons/0x000000/glyph:rep.svg')`
              // }
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0
              }}
            >
              { }
            </Box>
            {/* <Box
              py={[4, 5, '82px']}
              sx={{
                width: '90vw',
                maxWidth: 'layout',
                margin: 'auto',
                position: 'relative'
              }}
            > */}
            {/* <Box>
                <Text
                  variant="title"
                  as="h2"
                  sx={{
                    fontSize: ['36px', '48px', '72px'],
                    width: '18ch',
                    textAlign: 'center',
                    margin: 'auto'
                  }}
                >
                  Find your{' '}
                  <Text
                    as="span"
                    sx={{
                      borderRadius: 'default',
                      mx: 0,
                      whiteSpace: 'nowrap',
                      color: 'orange'
                    }}
                  >
                    IRL community.
                  </Text>
                </Text>
                <Text
                  variant="subtitle"
                  as="p"
                  sx={{
                    fontSize: ['18px', '24px', '32px'],
                    margin: 'auto',
                    pt: 2,
                    textAlign: 'center'
                  }}
                >
                  Thousands of Happy Hackers organize and participate in
                  hackathons and after school coding clubs.
                </Text>
              </Box> */}
            {/* <Clubs /> */}
            {/* <Hackathons
                delay={400}
                data={hackathonsData}
                stars={stars.hackathons.stargazerCount}
              /> */}

            {/* <Events events={events} /> */}
            {/* <HCB data={bankData} /> */}
            {/* </Box> */}
          </Box>
        </Box>
        <Box py={[4, 5, '82px']}>
          <Box
            sx={{
              width: '90vw',
              maxWidth: 'layout',
              margin: 'auto'
            }}
          >
            <Box>
              <Text
                as="p"
                variant="eyebrow"
                sx={{ fontSize: ['22px', 2, 3], textAlign: 'center' }}
              >
                We've got a lot going on - Let's recap
              </Text>
              <Text
                variant="title"
                as="h2"
                sx={{
                  fontSize: ['36px', '48px', '72px'],
                  width: '16ch',
                  textAlign: 'center',
                  margin: 'auto'
                }}
              >
                Find your second home at{' '}
                <Text
                  as="span"
                  sx={{
                    borderRadius: 'default',
                    ml: 0,
                    whiteSpace: ['wrap', 'nowrap'],
                    background: theme => theme.util.gx('red', 'orange'),
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  HHS
                </Text>
              </Text>
            </Box>
            <Grid
              pt={[3, 4]}
              pb={[4, 5]}
              gap={3}
              columns={[1, 2]}
              sx={{
                textAlign: 'left',
                '> a, > div': {
                  borderRadius: 'extra',
                  boxShadow: 'elevated',
                  p: [3, null, 4]
                },
                span: {
                  boxShadow:
                    '-2px -2px 6px rgba(255,255,255,0.125), inset 2px 2px 6px rgba(0,0,0,0.1), 2px 2px 8px rgba(0,0,0,0.0625)'
                },
                svg: { fill: 'currentColor' }
              }}
            >
              <Card
                as="a"
                href="https://discord.happyhacking.space"
                target="_blank"
                rel="noopener"
                variant="interactive"
                sx={{
                  background:
                    'linear-gradient(32deg, rgba(51, 142, 218, 0.9) 0%, rgba(51, 214, 166, 0.9) 100%)',
                  color: 'white',
                  svg: { color: 'rgb(51, 142, 218)' },
                  position: 'relative',
                  '.icon': {
                    transition:
                      'transform 0.25s ease-in-out, opacity 0.25s ease-in-out'
                  },
                  ':hover,:focus': {
                    '.icon': {
                      transform: 'translateX(28px) translateY(-28px)',
                      opacity: 0
                    }
                  }
                }}
              >
                <Icon
                  glyph="external"
                  size={32}
                  className="icon"
                  sx={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    opacity: 0.3,
                    fontSize: ['18px', '20px', '22px'],
                    zIndex: 3,
                    color: 'white !important'
                  }}
                />
                <Stage
                  icon="discord"
                  color="white"
                  name="Join Our Community"
                  desc="Connect with other technical people and hack on things together."
                  sx={{
                    p: {
                      fontSize: ['18px', '20px', '22px']
                    },
                    h3: {
                      fontSize: ['22px', 2, 3]
                    }
                  }}
                />
              </Card>
              <Card
                sx={{
                  background:
                    'linear-gradient(-32deg, #6f31b7 14%, #fb558e 82%)',
                  color: 'white',
                  svg: { color: '#fb558e' },
                  textDecoration: 'none',
                  position: 'relative',
                  '.icon': {
                    transition:
                      'transform 0.25s ease-in-out, opacity 0.25s ease-in-out'
                  },
                  ':hover,:focus': {
                    '.icon': {
                      transform: 'translateX(28px) translateY(-28px)',
                      opacity: 0
                    }
                  }
                }}
                as="a"
                href="https://github.com/happyhackingspace"
                variant="interactive"
                target="_blank"
                rel="noopener"
              >
                <Icon
                  glyph="external"
                  size={32}
                  className="icon"
                  sx={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    opacity: 0.3,
                    fontSize: [1, '16px', '20px'],
                    zIndex: 3,
                    color: 'white !important'
                  }}
                />
                <Stage
                  icon="github"
                  color="white"
                  name="Explore Our Open Source Tools"
                  desc="We're currently building tools for security, ai, games, and more!"
                  sx={{
                    p: {
                      fontSize: [1, '16px', '20px']
                    },
                    h3: {
                      fontSize: ['22px', 2, 3]
                    }
                  }}
                />
              </Card>
              {/* <Card
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(255, 140, 55, 0.9) 0%, rgba(236, 55, 80, 0.9) 100%)',
                  color: 'white',
                  svg: { color: 'rgb(236, 55, 80)' },
                  textDecoration: 'none',
                  position: 'relative',
                  '.icon': {
                    transition:
                      'transform 0.25s ease-in-out, opacity 0.43s ease-in-out'
                  },
                  ':hover,:focus': {
                    '.icon': {
                      transform: 'translateX(28px) translateY(-28px)',
                      opacity: 0
                    }
                  }
                }}
                as="a"
                href="/clubs"
                variant="interactive"
                target="_blank"
                rel="noopener"
              >
                <Icon
                  glyph="external"
                  size={32}
                  className="icon"
                  sx={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    opacity: 0.3,
                    fontSize: ['18px', '20px', '22px'],
                    zIndex: 3,
                    color: 'white !important'
                  }}
                />
                <Stage
                  icon="clubs"
                  color="white"
                  name="Represent HHS"
                  desc="Build an in-person community of hackers around you, and we're here to help."
                  sx={{
                    p: {
                      fontSize: ['18px', '20px', '22px']
                    },
                    h3: {
                      fontSize: ['22px', 2, 3]
                    }
                  }}
                />
              </Card> */}
            </Grid>
          </Box>
        </Box>
        <FAQ />

        {new URL(asPath, 'http://example.com').searchParams.get('gen') ===
          'z' && (
            <>
              <Box
                sx={{
                  position: 'fixed',
                  top: 0,
                  width: '100%',
                  zIndex: 1000
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    margin: 'auto',
                    width: 'fit-content',
                    lineHeight: 0
                  }}
                >
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube-nocookie.com/embed/sJNK4VKeoBM?si=zvhDKhb9C5G2b4TJ&controls=1&autoplay=1&mute=1"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </Box>
              </Box>
              <Box
                sx={{
                  position: 'fixed',
                  bottom: 0,
                  right: 0,
                  zIndex: 1000,
                  lineHeight: 0
                }}
              >
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/ChBg4aowzX8?si=X2J_T95yiaKXB2q4&controls=1&autoplay=1&mute=1"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </Box>
              <Box
                sx={{
                  position: 'fixed',
                  bottom: 0,
                  left: 0,
                  zIndex: 1000,
                  lineHeight: 0
                }}
              >
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/JDQr1vICu54?si=U6-9AFtk7EdTabfp&autoplay=1&mute=1"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </Box>
            </>
          )}
        <MailingList />
      </Box>
      <Footer
        dark
        sx={{
          backgroundColor: 'dark',
          position: 'relative',
          overflow: 'hidden',
          textShadow: '0 1px 2px rgba(0,0,0,0.375)',
          'h2,span,p,a': { color: 'white !important' },
          '> div img': { objectPosition: ['left', 'center'] },
          svg: {
            fill: 'white',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))'
          }
        }}
      >
        <style>
          {`a{
          color: #338eda
        }`}
        </style>
      </Footer>
    </>
  )
}

export async function getStaticProps() {
  // Only load critical static data at build time
  const carouselCards = require('../lib/carousel.json')
  const now = new Date()
  const isActive = c => !c.disabled && (!c.expiresAt || new Date(c.expiresAt) > now)
  const ctaCards = require('../lib/cta.json').filter(isActive)
  const cardsList = require('../lib/cards.json').filter(isActive)

  // Load basic events data for initial page render (optional)
  let events = []
  try {
    const response = await fetch('https://events.happyhacking.space/api/events/upcoming/', {
      timeout: 3000 // Fast timeout
    })
    if (response.ok) {
      events = await response.json()
    }
  } catch (error) {
    console.log('Events API timeout/failed during build, using empty fallback')
  }

  return {
    props: {
      carouselCards,
      ctaCards,
      cardsList,
      events // Optional events data for initial render
    },
    revalidate: 60 // Revalidate every minute for fresh static content
  }
}

export default Page
