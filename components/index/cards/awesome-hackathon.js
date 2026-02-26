import { useEffect, useState } from 'react'
import { Box, Flex, Grid, Image, Text } from 'theme-ui'
import { keyframes } from '@emotion/react'
import Buttons from './button'
import CardModel from './card-model'

/** @jsxImportSource theme-ui */

const REPO_URL = 'https://github.com/HappyHackingSpace/awesome-hackathon'
const BLUE = '#2563EB'
const BG = '#0d0d0d'

const CATEGORIES = [
  'AI/ML Hacks',
  'Ship Fast',
  'LLM Prompting',
  'Vibe Coding',
  'Demo Day',
  'Win Strats'
]

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
  100% { transform: translateY(0px); }
`

const floatAlt = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(3px); }
  100% { transform: translateY(0px); }
`

const pillPop = keyframes`
  0% { opacity: 0; transform: translateY(8px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`

const CORNER_BRACKETS = [
  { top: '10px', left: '10px', borderTop: `2.5px solid ${BLUE}`, borderLeft: `2.5px solid ${BLUE}` },
  { top: '10px', right: '10px', borderTop: `2.5px solid ${BLUE}`, borderRight: `2.5px solid ${BLUE}` },
  { bottom: '10px', left: '10px', borderBottom: `2.5px solid ${BLUE}`, borderLeft: `2.5px solid ${BLUE}` },
  { bottom: '10px', right: '10px', borderBottom: `2.5px solid ${BLUE}`, borderRight: `2.5px solid ${BLUE}` }
]

/* Hacker Emblem — Glider from Conway's Game of Life */
const GLIDER_CELLS = [
  [0, 1], [1, 2], [2, 0], [2, 1], [2, 2]
]

const HackerEmblem = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
    {[0, 1, 2].map(row =>
      [0, 1, 2].map(col => {
        const active = GLIDER_CELLS.some(([r, c]) => r === row && c === col)
        const cx = 8 + col * 14
        const cy = 8 + row * 14
        return active ? (
          <circle key={`${row}-${col}`} cx={cx} cy={cy} r="5" fill="white" />
        ) : (
          <circle key={`${row}-${col}`} cx={cx} cy={cy} r="5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
        )
      })
    )}
  </svg>
)

/* Reticle — blue plus inside corner bracket marks */
const Reticle = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M1 8 L1 1 L8 1" stroke={BLUE} strokeWidth="2" fill="none" />
    <path d="M20 1 L27 1 L27 8" stroke={BLUE} strokeWidth="2" fill="none" />
    <path d="M27 20 L27 27 L20 27" stroke={BLUE} strokeWidth="2" fill="none" />
    <path d="M8 27 L1 27 L1 20" stroke={BLUE} strokeWidth="2" fill="none" />
    <line x1="14" y1="7" x2="14" y2="21" stroke={BLUE} strokeWidth="3" strokeLinecap="round" />
    <line x1="7" y1="14" x2="21" y2="14" stroke={BLUE} strokeWidth="3" strokeLinecap="round" />
  </svg>
)

/* 8-ray starburst with line rays */
const StarburstRays = ({ color = 'white', size = 32 }) => {
  const c = size / 2
  const r = size / 2 - 2
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
        const rad = (angle * Math.PI) / 180
        return (
          <line
            key={angle}
            x1={c}
            y1={c}
            x2={c + r * Math.cos(rad)}
            y2={c - r * Math.sin(rad)}
            stroke={color}
            strokeWidth={angle % 90 === 0 ? 2 : 1.5}
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

/* Mixed starburst — mostly white rays with 2 blue accent rays + center circle */
const MixedStarburst = ({ size = 36 }) => {
  const c = size / 2
  const r = size / 2 - 2
  const blueAngles = [135, 180]
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
        const rad = (angle * Math.PI) / 180
        const isBlue = blueAngles.includes(angle)
        return (
          <line
            key={angle}
            x1={c}
            y1={c}
            x2={c + r * Math.cos(rad)}
            y2={c - r * Math.sin(rad)}
            stroke={isBlue ? BLUE : 'white'}
            strokeWidth={isBlue ? 2.5 : 1.8}
            strokeLinecap="round"
          />
        )
      })}
      <circle cx={c} cy={c} r="3.5" stroke="white" strokeWidth="1.5" fill={BG} />
    </svg>
  )
}

/* Loading bar — vertical bar with rotated text */
const LoadingBar = () => (
  <Flex
    aria-hidden="true"
    sx={{
      flexDirection: 'column',
      alignItems: 'center',
      gap: '6px',
      opacity: 0.5
    }}
  >
    <Text
      sx={{
        fontSize: '7px',
        color: 'white',
        letterSpacing: '1.5px',
        fontFamily: 'monospace',
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)'
      }}
    >
      75%
    </Text>
    <Box
      sx={{
        width: '6px',
        height: '48px',
        bg: 'rgba(255,255,255,0.15)',
        borderRadius: '3px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '75%',
          bg: 'white',
          borderRadius: '3px'
        }}
      />
    </Box>
    <Text
      sx={{
        fontSize: '6px',
        color: 'white',
        letterSpacing: '0.8px',
        fontFamily: 'monospace',
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
        opacity: 0.7
      }}
    >
      LOADING...
    </Text>
  </Flex>
)

const CategoryPill = ({ label, index }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      px: 3,
      py: '10px',
      background: 'transparent',
      borderRadius: '4px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: 'white',
      whiteSpace: 'nowrap',
      transition: 'all 0.2s ease',
      animation: `${pillPop} 0.4s ease-out both`,
      animationDelay: `${index * 0.08}s`,
      '&:hover': {
        background: BLUE,
        borderColor: BLUE,
        transform: 'translateY(-2px) scale(1.03)',
        boxShadow: `0 4px 16px ${BLUE}40`
      }
    }}
  >
    <Box
      sx={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        bg: index % 2 === 0 ? BLUE : 'white',
        flexShrink: 0
      }}
    />
    <Text
      as="span"
      sx={{ fontWeight: 'bold', fontSize: 1, fontFamily: 'Phantom Sans' }}
    >
      {label}
    </Text>
  </Box>
)

export default function AwesomeHackathon({ stars }) {
  const [repoStars, setRepoStars] = useState(stars || 0)

  useEffect(() => {
    fetch('https://api.github.com/repos/HappyHackingSpace/awesome-hackathon')
      .then(response => response.json())
      .then(data => {
        if (data.stargazers_count != null) setRepoStars(data.stargazers_count)
      })
      .catch(error => console.error('Error fetching stars:', error))
  }, [])

  return (
    <CardModel
      github_link={REPO_URL}
      stars={repoStars}
      color="white"
      position={[null, 'top', 'top']}
      sx={{
        position: 'relative',
        background: BG,
        overflow: 'hidden',
        height: 'fit-content'
      }}
      highlight={BLUE}
    >
      {/* Corner crop-mark brackets */}
      {CORNER_BRACKETS.map((style, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: '28px',
            height: '28px',
            zIndex: 1,
            pointerEvents: 'none',
            ...style
          }}
        />
      ))}

      {/* Reticle — top left */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: '8%',
          left: '4%',
          opacity: 0.6,
          zIndex: 1,
          pointerEvents: 'none',
          animation: `${float} 9s ease-in-out infinite`
        }}
      >
        <Reticle />
      </Box>

      {/* HHS Logo + Hacker Emblem (Glider) — top right */}
      <Flex
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: ['18%', '14%', '12%'],
          right: ['48px', '52px', '56px'],
          alignItems: 'center',
          gap: '12px',
          opacity: 0.6,
          zIndex: 1,
          pointerEvents: 'none',
          animation: `${float} 8s ease-in-out infinite`
        }}
      >
        <Image
          src="https://assets.happyhacking.space/flag-standalone-bw.svg"
          alt=""
          sx={{
            height: '44px',
            width: 'auto'
          }}
        />
        <HackerEmblem />
      </Flex>

      {/* Blue starburst rays — bottom left */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: '14%',
          left: '4%',
          opacity: 0.45,
          zIndex: 1,
          pointerEvents: 'none',
          animation: `${floatAlt} 7s ease-in-out infinite`,
          animationDelay: '1s'
        }}
      >
        <StarburstRays color={BLUE} size={30} />
      </Box>

      {/* White starburst rays — mid left */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: '52%',
          left: '6%',
          opacity: 0.3,
          zIndex: 1,
          pointerEvents: 'none',
          animation: `${float} 8s ease-in-out infinite`,
          animationDelay: '3s'
        }}
      >
        <StarburstRays color="white" size={26} />
      </Box>

      {/* Mixed starburst — bottom right area */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: ['20%', '24%', '28%'],
          right: ['14%', '16%', '18%'],
          opacity: 0.4,
          zIndex: 1,
          pointerEvents: 'none',
          animation: `${floatAlt} 9s ease-in-out infinite`,
          animationDelay: '2s',
          display: ['none', 'block', 'block']
        }}
      >
        <MixedStarburst size={34} />
      </Box>

      {/* Loading bar — right edge */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '3%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          pointerEvents: 'none',
          display: ['none', 'block', 'block']
        }}
      >
        <LoadingBar />
      </Box>

      {/* Blue dash — left edge */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: '38%',
          left: '3%',
          width: '14px',
          height: '2.5px',
          bg: BLUE,
          opacity: 0.6,
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* Title */}
      <Text
        as="h2"
        variant="title"
        sx={{
          fontSize: ['36px', 4, 5],
          lineHeight: 1.1,
          position: 'relative',
          zIndex: 2,
          fontWeight: 900,
          fontStyle: 'italic'
        }}
      >
        <Text as="span" sx={{ color: 'white' }}>
          Awesome{' '}
        </Text>
        <Text as="span" sx={{ color: BLUE }}>
          Hackathon
        </Text>
      </Text>

      <Grid columns={[1, 2, 2]} sx={{ gap: 4, height: 'fit-content' }}>
        <Flex sx={{ flexDirection: 'column', height: 'fit-content' }}>
          <Text
            as="p"
            variant="subtitle"
            sx={{
              zIndex: 2,
              position: 'relative',
              color: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            Your ultimate open-source toolkit for hackathons — curated
            resources, battle-tested tools & strategies to help you ideate,
            build, pitch & win.
          </Text>
          <Flex sx={{ flexDirection: 'column', mt: [3, 3, 4] }}>
            <Buttons
              id="awesome-explore"
              link={REPO_URL}
              primary={BLUE}
              icon="explore"
              sx={{ color: 'white' }}
            >
              Explore the List
            </Buttons>
          </Flex>
        </Flex>

        <Box sx={{ display: ['none', 'block', 'block'], mt: [0, -2, -2] }}>
          <Text
            sx={{
              fontStyle: 'italic',
              fontSize: [1, '14px', '16px'],
              position: 'relative',
              zIndex: 2,
              opacity: 0.5,
              color: 'white',
              mb: 3
            }}
          >
            What&apos;s inside...
          </Text>
          <Grid
            columns={[1, 2, 2]}
            sx={{ gap: '12px', position: 'relative', zIndex: 2 }}
          >
            {CATEGORIES.map((label, index) => (
              <CategoryPill
                key={label}
                label={label}
                index={index}
              />
            ))}
          </Grid>
        </Box>
      </Grid>
    </CardModel>
  )
}
