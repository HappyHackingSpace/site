import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Link,
  Text
} from 'theme-ui'
import styled from '@emotion/styled'
import Image from 'next/image'
import Meta from '@happyhackingspace/meta'
import Head from 'next/head'
import Nav from '../../components/nav'
import ForceTheme from '../../components/force-theme'
import Footer from '../../components/footer'
import { useState, useEffect } from 'react'
import PhysicalAddress from '../../components/physical-address'
// import Fade from 'react-reveal/Fade'
// import Slide from 'react-reveal/Slide'




// Import HHS images
import HHS from '../../public/philanthropy/hhs.jpeg'
import HHS1 from '../../public/philanthropy/hhs1.jpeg'
import HHS2 from '../../public/philanthropy/hhs2.JPG'
import HHS4 from '../../public/philanthropy/hhs4.jpeg'
import HHS5 from '../../public/philanthropy/hhs5.jpeg'
import HHS6 from '../../public/philanthropy/hhs6.jpeg'
import HHS7 from '../../public/philanthropy/hhs7.jpg'
import HHS8 from '../../public/philanthropy/hhs8.jpg'
import HHS9 from '../../public/philanthropy/hhs9.jpg'
import HHS10 from '../../public/philanthropy/hhs10.jpg'
import HHS11 from '../../public/philanthropy/hhs11.jpg'
import HHS12 from '../../public/philanthropy/hhs12.jpeg'
import HHS13 from '../../public/philanthropy/hhs13.jpeg'
import HHS14 from '../../public/philanthropy/hhs14.jpeg'
import HHS15 from '../../public/philanthropy/hhs15.jpeg'
import HHS16 from '../../public/philanthropy/hhs16.jpeg'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

// Custom Marquee component to replace react-marquee-slider
const Marquee = ({ velocity = 100, children }) => {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          animation: `marquee ${180 - velocity}s linear infinite`,
          '@keyframes marquee': {
            '0%': {
              transform: 'translateX(0%)'
            },
            '100%': {
              transform: 'translateX(-100%)'
            }
          }
        }}
      >
        {children}
        {children}
      </Box>
    </Box>
  )
}

// Simple replacement components for react-reveal
const Fade = ({ children, delay, ...props }) => <div {...props}>{children}</div>
const Slide = ({ children, ...props }) => <div {...props}>{children}</div>


const Header = styled(Box)`
  background: url('/pattern.svg');
`

const PhotoRow = ({ photos }) => (
  <Box sx={{ height: '160px', overflow: 'hidden' }}>
    {/* Mobil ve tablet görünüm */}
    <Box sx={{ display: ['block', 'block', 'block', 'block', 'none'] }}>
      <Marquee velocity={15}>
        {photos.map((photo, index) => (
          <Box
            key={`mobile-${index}`}
            sx={{
              display: 'inline-block',
              flexShrink: 0
            }}
          >
            <Image
              src={photo}
              className="next-image"
              height={200}
              width={300}
              alt="Happy Hacking Space students"
              style={{
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </Box>
        ))}
      </Marquee>
    </Box>

    {/* Desktop görünüm */}
    <Box sx={{ display: ['none', 'none', 'none', 'none', 'block'] }}>
      <Marquee velocity={20}>
        {photos.map((photo, index) => (
          <Box
            key={`desktop-${index}`}
            sx={{
              display: 'inline-block',
              flexShrink: 0
            }}
          >
            <Image
              src={photo}
              className="next-image"
              height={200}
              width={600}
              alt="Happy Hacking Space students"
              style={{
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </Box>
        ))}
      </Marquee>
    </Box>
  </Box>
)

const data = [
  { name: '3452 Teenagers', Teenagers: 3452, year: '2018' },
  { name: '6932 Teenagers', Teenagers: 6932, year: '2019' },
  { name: '13530 Teenagers', Teenagers: 13530, year: '2020' },
  { name: '18347 Teenagers', Teenagers: 18347, year: '2021' },
  { name: '21790 Teenagers', Teenagers: 21790, year: '2022' },
  { name: '28720 Teenagers', Teenagers: 28720, year: '2023' }
]

const Sheet = styled(Card)`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  width: 100%;
  color: white;
  height: 100%;
`

const Q = styled(Sheet)`
  position: relative;
  &:after {
    content: '';
    background-color: #ec3750;
    height: 100%;
    width: 10px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  color: #3c4858;
`

const Stat = ({ num, words, background }) => {
  return (
    <Card
      sx={{
        padding: '20px !important',
        my: 2,
        textAlign: 'center',
        backgroundColor: 'elevated',
        backgroundImage: `url('${background}')`,
        backgroundSize: '25px 25px',
        backgroundRepeat: 'repeat',
        backgroundPosition: '10% -20%',
        display: 'flex',
        gap: 2,
        textAlign: 'left',
        fontSize: ['14px', '16px', '18px']
      }}
    >
      <Text as="h2" sx={{ color: '#ec3750' }}>
        {num}
      </Text>
      <Text as="h2">{words}</Text>
    </Card>
  )
}

const Graph = () => {
  return (
    <>
      <Box sx={{ my: 'auto' }}>
        <Heading as="h2" sx={{ textAlign: 'center' }}>
          Teenagers in Slack per year
        </Heading>
        <ResponsiveContainer
          width="90%"
          height="100%"
          minHeight="350px"
          sx={{ mx: 'auto', my: '5%', overflow: 'visible' }}
        >
          <BarChart
            data={data}
            animationBegin={1000}
            sx={{
              svg: {
                overflow: 'visible'
              }
            }}
          >
            {/* <Tooltip
              cursor={false}
              contentStyle={{ border: 'none', borderRadius: 5, opacity: 0.9 }}
            /> */}
            <Bar type="monotone" dataKey="Teenagers" fill="#1f2d3d" />
            <YAxis />
            <XAxis dataKey="year"></XAxis>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  )
}

const Highlight = ({ children }) => {
  return <Text sx={{ fontWeight: 'bold' }}>{children}</Text>
}
const Line = () => {
  return (
    <Fade>
      <Box
        sx={{
          borderBottom: '1px solid #e0e6ed',
          width: '100%',
          mb: [4, 5]
        }}
      ></Box>
    </Fade>
  )
}
const Quote = ({ children }) => {
  return (
    <Text
      sx={{
        fontSize: '1.5em',
        color: '#ec3750',
        lineHeight: '1em'
      }}
    >
      {children}
    </Text>
  )
}
const Pill = ({ logo, name }) => {
  return (
    <Slide>
      <Box
        sx={{
          backgroundColor: 'snow',
          padding: '5px 10px',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {logo ? (
          <Box
            sx={{
              borderRadius: '100%',
              width: '20px',
              height: '20px',
              backgroundImage: `url(${logo})`,
              backgroundSize: 'cover',
              marginRight: 1
            }}
          ></Box>
        ) : (
          <></>
        )}
        <Text>{name}</Text>
      </Box>
    </Slide>
  )
}

const HappyHacker = ({ photo, quote, info }) => {
  return (
    <Box
      sx={{
        borderRadius: '10px',
        width: '100%',
        height: '300px',
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url(/philanthropy/${photo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          width: 'calc(100% - 40px)',
          color: 'white'
        }}
      >
        <Text as="h3">"{quote}"</Text>
        <Text>{info}</Text>
      </Box>
    </Box>
  )
}

const FIRST_IMAGE = {
  imageUrl: '/philanthropy/after1.png'
}
const SECOND_IMAGE = {
  imageUrl: '/philanthropy/before.png'
}

const Map = () => {
  const [sliderPosition, setSliderPosition] = useState(30)
  const [isDragging, setIsDragging] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleMouseDown = (e) => {
    try {
      setIsDragging(true)
    } catch (error) {
      console.warn('Mouse down error:', error)
      setHasError(true)
    }
  }

  const handleMouseUp = (e) => {
    try {
      setIsDragging(false)
    } catch (error) {
      console.warn('Mouse up error:', error)
      setHasError(true)
    }
  }

  const handleMouseMove = (e) => {
    try {
      if (!isDragging) return
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = (x / rect.width) * 100
      setSliderPosition(Math.max(0, Math.min(100, percentage)))
    } catch (error) {
      console.warn('Mouse move error:', error)
      setHasError(true)
    }
  }

  const handleTouchStart = (e) => {
    try {
      setIsDragging(true)
    } catch (error) {
      console.warn('Touch start error:', error)
      setHasError(true)
    }
  }

  const handleTouchEnd = (e) => {
    try {
      setIsDragging(false)
    } catch (error) {
      console.warn('Touch end error:', error)
      setHasError(true)
    }
  }

  const handleTouchMove = (e) => {
    try {
      if (!isDragging) return
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.touches[0].clientX - rect.left
      const percentage = (x / rect.width) * 100
      setSliderPosition(Math.max(0, Math.min(100, percentage)))
    } catch (error) {
      console.warn('Touch move error:', error)
      setHasError(true)
    }
  }

  // Add error boundary for debugging
  useEffect(() => {
    if (hasError) {
      console.log('Slider component encountered an error but is still functional')
    }
  }, [hasError])

  return (
    <Fade>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          mx: 'auto',
          height: 'auto'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '400px',
            overflow: 'hidden',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none'
          }}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          {/* Before Image */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${SECOND_IMAGE.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />

          {/* After Image */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${sliderPosition}%`,
              height: '100%',
              backgroundImage: `url(${FIRST_IMAGE.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              overflow: 'hidden'
            }}
          />

          {/* Slider Handle */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: `${sliderPosition}%`,
              width: '4px',
              height: '100%',
              bg: 'white',
              transform: 'translateX(-50%)',
              cursor: 'ew-resize',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '50px',
                height: '50px',
                backgroundImage: 'url(/philanthropy/slider-handle.svg)',
                backgroundSize: '100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }
            }}
          />
        </Box>
        <Text variant="caption">
          What Happy Hacking Space could look like with your support
        </Text>
      </Box>
    </Fade>
  )
}

const Philanthropy = ({ posts = [] }) => {
  return (
    <>
      <Meta
        as={Head}
        title="Philanthropy"
        description="Support Happy Hacking Space"
      />
      <ForceTheme theme="light" />
      <Nav color="white" />
      <Box sx={{ overflowX: 'hidden' }}>
        <Header sx={{ position: 'relative' }}>
          <Box
            sx={{
              background: 'rgba(0,0,0, 0.7)',
              zIndex: 1,
              position: 'relative',
              color: 'white!important',
              height: '480px'
            }}
            pt={[5, 5, '110px']}
          >
            <Box
              sx={{
                maxWidth: '64rem',
                mx: 'auto',
                zIndex: 1,
                position: 'relative'
              }}
              align="center"
              py={2}
              px={[1, 3]}
            >
              <Container sx={{ maxWidth: '48rem' }}>
                <Heading
                  sx={{
                    fontSize: ['42px', '54px', '72px'],
                    my: 2,
                    color: 'white'
                  }}
                >
                  Invest in the future of Mesopotamia.
                </Heading>
                <Box
                  sx={{
                    fontSize: ['22px', '23px', '28px'],
                    maxWidth: '40rem',
                    color: 'white'
                  }}
                >
                  Contribute today to empower the next generation of Mesopotamians.
                </Box>
                <Button
                  variant="ctaLg"
                  my={3}
                  sx={{ width: ['100%', 'auto'] }}
                  as="a"
                  href="https://airtable.com/appKfmTrC8b23hJNQ/shrUCpuTfSraCfmvu"
                >
                  Donate
                  <Text sx={{ display: ['none', 'inline-block'], ml: 2 }}>
                    to Happy Hacking Space
                  </Text>
                </Button>

              </Container>
            </Box>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              zIndex: 0,
              width: '100%',
              display: 'block'
            }}
          >
            <PhotoRow
              photos={[
                HHS,
                HHS1,
                HHS2,
                HHS4,
                HHS5,
                HHS6
              ]}
            />
            <PhotoRow
              photos={[HHS7, HHS8, HHS9, HHS10, HHS11]}
            />
            <PhotoRow
              photos={[
                HHS12,
                HHS13,
                HHS14,
                HHS15,
                HHS16
              ]}
            />
          </Box>
        </Header>
        <Container
          sx={{
            width: 'container',
            margin: 'auto',
            'p, li, a': {
              fontSize: '1.3em'
            }
          }}
        >
          <Fade>
            <Text as="h1" mb={2} mt={4}>
              In the next ten years, Happy Hacking Space will discover, foster and inspire
              thousands more to use technical skills to solve
              problems.
            </Text>
          </Fade>
          <br />
          <Fade>
            <Text as="p">
              Led by hackers, crafters, explorers, Happy Hacking Space already reaches thousands,
              and represents the largest technical network in the Mesopotamia. Each day, new projects are shipped, new lines
              of code are written, and new friendships are forged through
              collaborative, problem-solving technical projects happening at
              Happy Hacking Space.
            </Text>
          </Fade>
          <br />
          <Fade>
            <Text as="p">
              Happy Hacking Space is always free for hackers and with your support, Happy Hacking Space
              can grow to hundreds of thousands of hackers, bringing
              free computer science education, a hacker mindset, and an equal
              shot at success to every hacker, regardless of where they’re
              from, how they identify, or what their parents do.
            </Text>
          </Fade>
          <Fade>
            <br />
            <Text as="p">
              Over time, Happy Hackers will reshape societies as entrepreneurs,
              environmentalists, political leaders, activists and policy makers.
              We help shape the values of these future leaders, modeling and
              incentivizing them to be curious, humble, kind, optimistic problem
              solvers.{' '}
              <Highlight>
                We need your support to make this vision a reality.
              </Highlight>
            </Text>
          </Fade>
          <Grid gap={2} columns={[1, 2, 3, 5]} mt={4}>
            <Fade delay={30}>
              <HappyHacker
                photo="../../team/ahsen.jpg"
                quote="Pushing me to push the boundaries."
                info="Ahsen, Diyarbakir"
              />
            </Fade>
            <Fade delay={60}>
              <HappyHacker
                photo="../../team/muslime.jpeg"
                quote="I've met some of the best minds here!"
                info="Muslime, Diyarbakir"
              />
            </Fade>
            <Fade delay={90}>
              <HappyHacker
                photo="../../team/kerem.jpeg"
                quote="Perfect space for building the next thing."
                info="Kerem, Diyarbakir"

              />
            </Fade>
            <Fade delay={120}>
              <HappyHacker
                photo="../../team/arjin.jpg"
                quote="A great beacon for the lost."
                info="Arjin, Diyarbakir"
              />
            </Fade>
            <Fade delay={150}>
              <HappyHacker
                photo="../../team/miwa.jpg"
                quote="Helped me build my a strong foundation in coding."
                info="Miwa, Diyarbakir"
              />
            </Fade>
          </Grid>
          <Fade>
            <Text as="h2" mt={5}>
              To discuss a gift:
            </Text>
          </Fade>
          <Fade>
            <Grid gap={[4, 2, 2]} columns={[1, '1r 1fr', '1fr 1fr']} mt={2}>
              <Box>
                <Text as="h3">Reach out to</Text>
                <Text as="p">Team Happy Hacking Space</Text>
                <Text
                  as="a"
                  href="mailto:team@happyhacking.space"
                  sx={{
                    ':link': {
                      color: 'inherit',
                      textDecoration: 'none'
                    }
                  }}
                >
                  team@happyhacking.space
                </Text>
              </Box>
              <Box>
                <Text as="h3">Send physical gifts</Text>
                <Text as="p">Happy Hacking Space</Text>
                <Text as="p">
                  Talaytepe Mah. 4009/1 Sk. Corner Ofis, A Blok Dis Kapi No: 4A, Ic Kapi No:4 Kayapinar/Diyarbakir
                </Text>
                <Box mt={[2, 3]}>
                  <Text
                    as="a"
                    href="https://airtable.com/appKfmTrC8b23hJNQ/shrUCpuTfSraCfmvu"
                    target="_blank"
                    sx={{
                      color: '#ec3750',
                      textDecoration: 'none',
                      fontWeight: '700',
                      fontSize: '1.2em'
                    }}
                  >
                    Donate online to Happy Hacking Space &#9654;
                  </Text>
                </Box>
                <Text>
                  We don't accept monetary donations right now.
                </Text>
              </Box>
            </Grid>
          </Fade>
        </Container>
        <Container
          sx={{
            width: 'container',
            margin: 'auto',
            px: [2, 3, 4],
            'p, li, a': {
              fontSize: '1.3em'
            },
            h1: {
              fontSize: ['28px', '28px', '36px']
            }
          }}
        >
          {/* <Fade>
            <Text as="h1" my={4}>
              As the largest network of technical teenagers, we are featured in
              the news:
            </Text>

            <Flex
              sx={{
                gap: [2, 3, 4],
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: ['wrap', 'nowrap', 'nowrap'], // mobile: wrap (2x2), larger: single row
                overflowX: ['auto', 'hidden', 'hidden']
              }}
            >
              <Link
                href="https://www.businessinsider.com/..."
                target="_blank"
                sx={{
                  flex: '0 0 auto',

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Image
                  src="/philanthropy/insider-logo.svg"
                  alt="insider logo"
                  width={140}
                  height={40}
                  style={{ width: '100%', height: 'auto' }}
                />
              </Link>

              <Link
                href="https://www.wsj.com/..."
                target="_blank"
                sx={{
                  flex: '0 0 auto',
                  width: ['70px', '100px', '120px'],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Image
                  src="/philanthropy/wsj-logo.svg"
                  alt="wsj logo"
                  width={120}
                  height={40}
                  style={{ width: '100%', height: 'auto' }}
                />
              </Link>

              <Link
                href="https://www.forbes.com/..."
                target="_blank"
                sx={{
                  flex: '0 0 auto',
                  width: ['80px', '130px', '160px'],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Image
                  src="/philanthropy/forbes-logo.svg"
                  alt="forbes logo"
                  width={160}
                  height={40}
                  style={{ width: '100%', height: 'auto' }}
                />
              </Link>

              <Link
                href="https://www.philanthropy.com/..."
                target="_blank"
                sx={{
                  flex: '0 0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Image
                  src="/philanthropy/cop.png"
                  alt="cop logo"
                  width={350}
                  height={150}
                />
              </Link>
            </Flex>
          </Fade> */}
          <Line />
          <Box>
            <Fade>
              <Text as="h1" sx={{ marginBottom: 1 }}>
                Join our community of generous donors
              </Text>
            </Fade>
            <Fade delay={100}>
              <PhysicalAddress sx={{ mb: 1 }} />
            </Fade>
            <Box
              sx={{
                width: '100%',
                height: ['400px', '600px', '800px'],
                border: '1px solid #ccc',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}
            >
              <iframe
                src="https://airtable.com/embed/appKfmTrC8b23hJNQ/shrUCpuTfSraCfmvu?viewControls=on"
                frameBorder="0"
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'transparent'
                }}
                allowFullScreen
                title="Financial Dashboard"
              />
            </Box>
            {/* <Grid gap={2} columns={[2, 4, 4]} mt={2}>
              <Box>
                <Fade delay={50}>
                  <Text as="h3" sx={{ marginBottom: '8px' }}>
                    $5M - $10M{' '}
                  </Text>
                </Fade>
                <Fade delay={70}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Tom Preston-Werner (8x)
                  </Text>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Musk Foundation (5x)
                  </Text>
                </Fade>
                <br></br>
                <Fade delay={90}>
                  <Text as="h3" sx={{ marginBottom: '8px' }}>
                    {' '}
                    $1M - $5M{' '}
                  </Text>
                </Fade>
                <Fade delay={120}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Tobi Lutke
                  </Text>
                </Fade>
                <Fade delay={145}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Michael Dell
                  </Text>
                </Fade>
                <Fade delay={150}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    The Libermans
                  </Text>
                </Fade>
              </Box>
              <Box>
                <Fade delay={170}>
                  <Text as="h3" sx={{ marginBottom: '8px' }}>
                    $500k - $1M
                  </Text>
                </Fade>
                <Fade delay={190}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Lizzy Danhakl/Andrew Reed (5x)
                  </Text>
                </Fade>
                <Fade delay={210}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Craig Newmark (5x)
                  </Text>
                </Fade>
                <Fade delay={230}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Endless Network (3x)
                  </Text>
                </Fade>
                <Fade delay={250}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Joe Liemandt
                  </Text>
                </Fade>

                <Fade delay={260}>
                  <Fade delay={410}>
                    <Text as="p" sx={{ lineHeight: '1.8em' }}>
                      Argosy Foundation (4x)
                    </Text>
                  </Fade>
                </Fade>
              </Box>
              <Box>
                <Fade>
                  <Text as="h3" sx={{ lineHeight: '1.8em' }}>
                    $200k - $500k
                  </Text>
                </Fade>
                <Fade delay={290}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Gwynne Shotwell
                  </Text>
                </Fade>
                <Fade delay={300}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Jack Dorsey
                  </Text>
                </Fade>
                <Fade delay={330}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Vitalik Buterin
                  </Text>
                </Fade>
                <Fade delay={345}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Ron Baron
                  </Text>
                </Fade>
                <Fade delay={530}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Adam Ross (4x)
                  </Text>
                </Fade>
                <Fade delay={360}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Ron Conway (5x)
                  </Text>
                </Fade>

                <Fade delay={470}>
                  <Fade delay={360}>
                    <Text as="p" sx={{ lineHeight: '1.8em' }}>
                      GitHub Education (5x)
                    </Text>
                  </Fade>
                </Fade>
              </Box>
              <Box>
                <Fade delay={470}>
                  <Text as="h3" sx={{ marginBottom: '8px' }}>
                    $100k- $200k
                  </Text>
                </Fade>
                <Fade delay={500}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Quinn Slack (3x)
                  </Text>
                </Fade>
                <Fade delay={560}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Peter Levine
                  </Text>
                </Fade>
                <Fade delay={590}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    FUTO (3x)
                  </Text>
                </Fade>
              </Box>
            </Grid> */}
            {/* <Fade delay={800}>
              <br />
              <Text sx={{ color: 'muted', fontSize: '90%' }}>
                * The numbers in bracket indicates # of gifts since 2018
              </Text>
            </Fade> */}
          </Box>
          {/* <Fade>
            <Text as="h2" my={3}>
              Only through their support are we able to empower students like
              Obrey and Maggie
            </Text>
          </Fade> */}


        </Container>
        <Footer />
      </Box>
    </>
  )
}

export default Philanthropy
