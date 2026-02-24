import { useEffect, useState } from 'react'
import { Box, Flex, Grid, Text } from 'theme-ui'
import { keyframes } from '@emotion/react'
import Buttons from './button'
import CardModel from './card-model'

/** @jsxImportSource theme-ui */

const REPO_URL = 'https://github.com/HappyHackingSpace/awesome-hackathon'
const ACCENT = '#FFB900'

const CATEGORIES = [
  { emoji: '\u{1F916}', label: 'AI/ML Hacks' },
  { emoji: '\u{1F680}', label: 'Ship Fast' },
  { emoji: '\u{1F9E0}', label: 'LLM Prompting' },
  { emoji: '\u{26A1}', label: 'Vibe Coding' },
  { emoji: '\u{1F525}', label: 'Demo Day' },
  { emoji: '\u{1F3C6}', label: 'Win Strats' }
]

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-8px) rotate(3deg); }
  66% { transform: translateY(4px) rotate(-2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`

const floatAlt = keyframes`
  0% { transform: translateY(0px) scale(1) rotate(0deg); }
  25% { transform: translateY(6px) scale(1.05) rotate(-3deg); }
  50% { transform: translateY(-6px) scale(0.97) rotate(2deg); }
  75% { transform: translateY(3px) scale(1.02) rotate(-1deg); }
  100% { transform: translateY(0px) scale(1) rotate(0deg); }
`

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

const titleGlow = keyframes`
  0%, 100% { text-shadow: 0 0 30px rgba(255, 185, 0, 0.2), 0 0 60px rgba(255, 185, 0, 0.1); }
  50% { text-shadow: 0 0 40px rgba(255, 185, 0, 0.5), 0 0 80px rgba(255, 185, 0, 0.25); }
`

const pillPop = keyframes`
  0% { opacity: 0; transform: translateY(8px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`

const orbPulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.15); opacity: 0.7; }
`

const FLOATING_EMOJIS = [
  { emoji: '\u{1F680}', top: '8%', left: '5%', size: 22, anim: float, dur: '6s', delay: '0s' },
  { emoji: '\u{2B50}', top: '15%', left: '82%', size: 18, anim: floatAlt, dur: '5.5s', delay: '0.8s' },
  { emoji: '\u{1F4BB}', top: '70%', left: '90%', size: 24, anim: float, dur: '7s', delay: '1.2s' },
  { emoji: '\u{26A1}', top: '45%', left: '3%', size: 20, anim: floatAlt, dur: '4.5s', delay: '0.3s' },
  { emoji: '\u{1F527}', top: '85%', left: '15%', size: 16, anim: float, dur: '6.5s', delay: '2s' },
  { emoji: '\u{2699}\u{FE0F}', top: '25%', left: '45%', size: 14, anim: floatAlt, dur: '8s', delay: '1.5s' },
  { emoji: '\u{1F3C6}', top: '5%', left: '60%', size: 20, anim: float, dur: '5s', delay: '0.5s' },
  { emoji: '\u{1F525}', top: '60%', left: '50%', size: 26, anim: floatAlt, dur: '7.5s', delay: '3s' },
  { emoji: '\u{1F4A1}', top: '35%', left: '92%', size: 18, anim: float, dur: '6s', delay: '1s' },
  { emoji: '\u{1F389}', top: '90%', left: '70%', size: 22, anim: floatAlt, dur: '5s', delay: '2.5s' },
  { emoji: '\u{1F308}', top: '50%', left: '20%', size: 16, anim: float, dur: '9s', delay: '4s' },
  { emoji: '\u{1F4A5}', top: '75%', left: '40%', size: 28, anim: floatAlt, dur: '6s', delay: '0.7s' },
  { emoji: '\u{1F50B}', top: '20%', left: '30%', size: 14, anim: float, dur: '7s', delay: '3.5s' },
  { emoji: '\u{1F3AF}', top: '40%', left: '72%', size: 20, anim: floatAlt, dur: '5.5s', delay: '1.8s' }
]

const CategoryPill = ({ emoji, label, index }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      px: 3,
      py: '10px',
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(4px)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 185, 0, 0.15)',
      color: 'white',
      whiteSpace: 'nowrap',
      transition: 'all 0.2s ease',
      animation: `${pillPop} 0.4s ease-out both`,
      animationDelay: `${index * 0.08}s`,
      '&:hover': {
        background: 'rgba(255, 185, 0, 0.12)',
        border: '1px solid rgba(255, 185, 0, 0.35)',
        transform: 'translateY(-2px) scale(1.03)',
        boxShadow: '0 4px 16px rgba(255, 185, 0, 0.2)'
      }
    }}
  >
    <Text as="span" sx={{ fontSize: '18px', lineHeight: 1 }}>{emoji}</Text>
    <Text as="span" sx={{ fontWeight: 'bold', fontSize: 1, fontFamily: 'Phantom Sans' }}>
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
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)',
        backgroundSize: '200% 200%',
        animation: `${gradientShift} 12s ease infinite`,
        overflow: 'hidden',
        height: 'fit-content'
      }}
      highlight={ACCENT}
    >
      {/* Glow orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,185,0,0.18) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0,
          pointerEvents: 'none',
          animation: `${orbPulse} 8s ease-in-out infinite`
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-15%',
          left: '-5%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(131,58,180,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0,
          pointerEvents: 'none',
          animation: `${orbPulse} 10s ease-in-out infinite`,
          animationDelay: '3s'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          left: '15%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255,100,50,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0,
          pointerEvents: 'none',
          animation: `${orbPulse} 12s ease-in-out infinite`,
          animationDelay: '5s'
        }}
      />

      {/* Floating emojis */}
      {FLOATING_EMOJIS.map(({ emoji, top, left, size, anim, dur, delay }, i) => (
        <Box
          key={i}
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top,
            left,
            fontSize: `${size}px`,
            opacity: 0.18,
            zIndex: 1,
            pointerEvents: 'none',
            willChange: 'transform',
            animation: `${anim} ${dur} ease-in-out infinite`,
            animationDelay: delay
          }}
        >
          {emoji}
        </Box>
      ))}

      <Text
        as="h2"
        variant="title"
        sx={{
          fontSize: ['36px', 4, 5],
          color: ACCENT,
          animation: `${titleGlow} 3s ease-in-out infinite`,
          lineHeight: 1.1,
          position: 'relative',
          zIndex: 2
        }}
      >
        Awesome Hackathon
      </Text>

      <Grid columns={[1, 2, 2]} sx={{ gap: 4, height: 'fit-content' }}>
        <Flex sx={{ flexDirection: 'column', height: 'fit-content' }}>
          <Text
            as="p"
            variant="subtitle"
            sx={{ zIndex: 2, position: 'relative' }}
          >
            Your ultimate open-source toolkit for hackathons - curated
            resources, battle-tested tools & strategies to help you ideate,
            build, pitch & win.
          </Text>
          <Flex sx={{ flexDirection: 'column', mt: [3, 3, 4] }}>
            <Buttons
              id="awesome-explore"
              link={REPO_URL}
              primary={ACCENT}
              icon="explore"
              sx={{ color: '#1a1a2e' }}
            >
              Explore the List
            </Buttons>
            <Buttons
              id="awesome-star"
              link={REPO_URL}
              icon="view"
            >
              Star on GitHub
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
              opacity: 0.7,
              mb: 3
            }}
          >
            What&apos;s inside...
          </Text>
          <Grid
            columns={[1, 2, 2]}
            sx={{ gap: '12px', position: 'relative', zIndex: 2 }}
          >
            {CATEGORIES.map(({ emoji, label }, index) => (
              <CategoryPill key={label} emoji={emoji} label={label} index={index} />
            ))}
          </Grid>
        </Box>
      </Grid>
    </CardModel>
  )
}
