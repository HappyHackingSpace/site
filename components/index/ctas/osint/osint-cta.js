import dynamic from 'next/dynamic'
import { Box, Text, Card, Button, Image } from 'theme-ui'
import { keyframes } from '@emotion/react'
import usePrefersReducedMotion from '../../../../lib/use-prefers-reduced-motion'

const OsintScene = dynamic(() => import('./osint-scene'), { ssr: false })

const recBlink = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0 }
})

function CtaSideHUD({ side }) {
  const leftLines = ['+0.0/VCM', 'INPUT_1', 'ADMN_CONTROL']
  const rightLines = ['INPUT_FEEDS', 'TK_009.557_-1', 'CTL_CODE [423]']
  const lines = side === 'left' ? leftLines : rightLines

  return (
    <Box
      sx={{
        position: 'absolute',
        [side]: '8px',
        top: '80px',
        display: ['none', 'none', 'block'],
        fontFamily: 'monospace',
        fontSize: '7px',
        color: '#3c3f46',
        lineHeight: 1.8,
        pointerEvents: 'none',
        textAlign: side,
        zIndex: 4
      }}
    >
      {lines.map((line, i) => (
        <Text key={i} sx={{ display: 'block' }}>{line}</Text>
      ))}
    </Box>
  )
}

// million-ignore
export default function OsintCTA() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <Box
      as="a"
      href="https://hhs.ninja"
      target="_blank"
      rel="noreferrer"
      sx={{
        position: 'relative',
        display: 'inline-block',
        width: ['100%', '100%', 'auto'],
        borderRadius: 'extra',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        transition:
          'transform .125s ease-in-out, box-shadow .125s ease-in-out',
        textDecoration: 'none',
        overflow: 'hidden',
        '&:hover': {
          transform: 'scale(1.0625)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
        }
      }}
    >
      {/* Background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: '#0e0f12',
          zIndex: 0
        }}
      />

      {/* Three.js surveillance data scene */}
      {!prefersReducedMotion && (
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <OsintScene />
        </Box>
      )}

      {/* Vignette overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.4) 100%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* Gradient overlay for text readability */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, transparent 20%, rgba(14,15,18,0.75) 100%)',
          zIndex: 2
        }}
      />

      {/* Owl sticker */}
      <Image
        src="/project-icon/osint-sticker.svg"
        alt=""
        sx={{
          position: 'absolute',
          bottom: '-20px',
          right: '-20px',
          width: ['120px', '140px', '160px'],
          height: 'auto',
          zIndex: 10,
          transform: 'rotate(15deg)',
          pointerEvents: 'none',
          opacity: 0.6
        }}
      />

      {/* Side HUD readouts */}
      <CtaSideHUD side="left" />
      <CtaSideHUD side="right" />

      {/* UI content */}
      <Card
        sx={{
          background: 'transparent',
          position: 'relative',
          color: 'white',
          width: ['100%', '100%', '340px'],
          minWidth: ['100%', '100%', 'initial'],
          minHeight: ['220px', '260px', '300px'],
          padding: [
            '16px !important',
            '20px !important',
            '24px !important'
          ],
          paddingTop: [
            '18px !important',
            '24px !important',
            '28px !important'
          ],
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          zIndex: 3,
          '&:hover': { cursor: 'pointer' }
        }}
      >
        {/* CCTV header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            mb: 2,
            fontSize: '11px',
            fontFamily: 'monospace'
          }}
        >
          <Text sx={{ color: '#969a9e' }}>CAM-0847</Text>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bg: '#b43232',
              animation: `${recBlink} 2s ease-in-out infinite`
            }}
          />
          <Text sx={{ color: '#8b2c2c' }}>REC</Text>
        </Box>

        {/* RELEVANT classification */}
        <Box
          sx={{
            bg: '#d2b93c',
            px: '6px',
            py: '1px',
            mb: 2,
            fontSize: '10px',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            color: '#0e0f12'
          }}
        >
          RELEVANT
        </Box>

        <Image
          src="/project-icon/osint-ctf-logo.svg"
          alt="OSINT CTF"
          sx={{ zIndex: 2, height: ['48px', '56px', '64px'], mb: 2 }}
        />

        <Text
          as="p"
          sx={{
            color: '#d6d9dd',
            fontSize: ['15px', '17px', '20px'],
            my: 2,
            zIndex: 2,
            fontFamily: 'monospace'
          }}
        >
          Test your OSINT skills in our capture the flag challenge.
        </Text>

        <Button
          sx={{
            backgroundColor: '#d2b93c',
            color: '#0e0f12',
            mt: 'auto',
            zIndex: 2,
            fontSize: ['14px', '15px', '16px'],
            fontFamily: 'monospace',
            fontWeight: 'bold',
            px: [3, 3, 4],
            py: ['10px', '12px', '12px'],
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
          as="span"
        >
          START HUNTING
        </Button>
      </Card>
    </Box>
  )
}
