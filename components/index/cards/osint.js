import CardModel from './card-model'
import { Box, Flex, Image, Text } from 'theme-ui'
import Buttons from './button'
import { keyframes } from '@emotion/react'

/** @jsxImportSource theme-ui */

const scanline = keyframes`
  0% { top: -10%; }
  100% { top: 110%; }
`

const recBlink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

function PoiTargetingBox({ children }) {
  const cornerSize = 28
  const thickness = 3
  const color = '#d2b93c'
  const corner = {
    position: 'absolute',
    width: `${cornerSize}px`,
    height: `${cornerSize}px`,
    zIndex: 2
  }

  return (
    <Box
      sx={{
        position: 'relative',
        border: '1px dashed rgba(214,217,221,0.25)',
        p: '12px'
      }}
    >
      {/* Corner brackets */}
      <Box sx={{ ...corner, top: -1, left: -1, borderTop: `${thickness}px solid ${color}`, borderLeft: `${thickness}px solid ${color}` }} />
      <Box sx={{ ...corner, top: -1, right: -1, borderTop: `${thickness}px solid ${color}`, borderRight: `${thickness}px solid ${color}` }} />
      <Box sx={{ ...corner, bottom: -1, left: -1, borderBottom: `${thickness}px solid ${color}`, borderLeft: `${thickness}px solid ${color}` }} />
      <Box sx={{ ...corner, bottom: -1, right: -1, borderBottom: `${thickness}px solid ${color}`, borderRight: `${thickness}px solid ${color}` }} />

      {/* Inner dashed rectangle */}
      <Box
        sx={{
          position: 'absolute',
          inset: '12px',
          border: '1px dashed rgba(214,217,221,0.12)',
          pointerEvents: 'none'
        }}
      />

      {children}
    </Box>
  )
}

function RelevantTriangle() {
  return (
    <Box
      as="svg"
      viewBox="0 0 7 10"
      sx={{
        width: '7px',
        height: '10px',
        ml: '6px',
        display: 'inline-block',
        verticalAlign: 'middle'
      }}
    >
      <polygon points="0,0 7,5 0,10" fill="#d2b93c" />
    </Box>
  )
}

function SideHUD({ side }) {
  const leftLines = ['+0.0/VCM', '+0.1/VCM', 'INPUT_1', 'INPUT_2', 'ADMN_CONTROL']
  const rightLines = ['INPUT_FEEDS', 'TK_009.557_-1', 'CTL_CODE [423]', 'SYS.ONLINE +0092']
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
        zIndex: 3
      }}
    >
      {lines.map((line, i) => (
        <Text key={i} sx={{ display: 'block' }}>{line}</Text>
      ))}
    </Box>
  )
}

export default function Osint() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundColor: '#0e0f12',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '300px'
      }}
    >
      {/* Surveillance grid overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(42,46,53,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(42,46,53,0.5) 1px, transparent 1px)',
          backgroundSize: '54px 54px',
          zIndex: 0
        }}
      />

      {/* Scanline sweep */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(214,217,221,0.15), transparent)',
          animation: `${scanline} 4s linear infinite`,
          zIndex: 1
        }}
      />

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

      {/* Side HUD readouts */}
      <SideHUD side="left" />
      <SideHUD side="right" />

      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        {/* CCTV HUD header */}
        <Flex sx={{ alignItems: 'center', gap: '8px', mb: 3, fontFamily: 'monospace' }}>
          <Text sx={{ fontSize: '11px', color: '#969a9e' }}>CAM-0847</Text>
          <Box
            sx={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              bg: '#b43232',
              animation: `${recBlink} 2s ease-in-out infinite`
            }}
          />
          <Text sx={{ fontSize: '11px', color: '#8b2c2c' }}>REC</Text>
          <Text sx={{ fontSize: '9px', color: '#3c3f46', ml: 'auto', display: ['none', 'block'] }}>
            2026.02.13 14:37:22
          </Text>
        </Flex>

        {/* Two-column layout */}
        <Flex
          sx={{
            flexDirection: ['column', 'column', 'row'],
            alignItems: ['flex-start', 'flex-start', 'center'],
            gap: [3, 3, 4],
            justifyContent: 'space-between'
          }}
        >
          {/* Left column */}
          <Box sx={{ flex: 1 }}>
            {/* RELEVANT classification label with triangle */}
            <Flex
              sx={{
                alignItems: 'center',
                mb: 2
              }}
            >
              <Box
                sx={{
                  display: 'inline-block',
                  bg: '#d2b93c',
                  px: '8px',
                  py: '2px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  color: '#0e0f12'
                }}
              >
                RELEVANT
              </Box>
              <RelevantTriangle />
            </Flex>

            <Image
              src="/project-icon/osint-ctf-logo.svg"
              alt="OSINT CTF"
              sx={{ width: ['200px', '240px', '280px'], mb: 3, display: 'block' }}
            />

            <Text
              as="p"
              sx={{
                fontFamily: 'monospace',
                fontSize: ['14px', '16px', '18px'],
                lineHeight: 1.5,
                color: '#d6d9dd',
                mb: 3,
                maxWidth: '460px'
              }}
            >
              Test your open-source intelligence skills. Gather data, analyze
              digital footprints, and uncover hidden connections.
            </Text>

            <Buttons
              id="osint-card-cta"
              link="https://hhs.ninja"
              primary="#d2b93c"
              sx={{
                color: '#0e0f12',
                fontFamily: 'monospace',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              START HUNTING
            </Buttons>
          </Box>

          {/* Right column — owl with POI targeting box + crosshair */}
          <Box
            sx={{
              display: ['none', 'none', 'block'],
              position: 'relative',
              flexShrink: 0
            }}
          >
            <PoiTargetingBox>
              <Image
                src="/project-icon/osint-sticker.svg"
                alt="OSINT owl mascot"
                sx={{ width: '180px', display: 'block' }}
              />
            </PoiTargetingBox>

            {/* SSN + Subject of Interest */}
            <Box sx={{ mt: '8px', fontFamily: 'monospace', textAlign: 'center' }}>
              <Text sx={{ fontSize: '13px', fontWeight: 'bold', color: '#d6d9dd', display: 'block' }}>
                379-14-4023
              </Text>
              <Text sx={{ fontSize: '9px', color: '#969a9e', display: 'block' }}>
                SUBJECT OF INTEREST
              </Text>
            </Box>
          </Box>
        </Flex>

        {/* Bottom surveillance data fragments */}
        <Flex
          sx={{
            mt: 3,
            gap: [3, 4],
            fontFamily: 'monospace',
            fontSize: '9px',
            color: '#3c3f46',
            flexWrap: 'wrap'
          }}
        >
          <Text>PROBABILITY: 0.9847</Text>
          <Text sx={{ color: '#91802a' }}>FLAG{'{'+'??????'+'}'}</Text>
          <Text>NODES: 2,847 INDEXED</Text>
          <Text>IDENTIFIERS: MASKED</Text>
          <Text sx={{ color: '#8b2c2c' }}>THREAT LEVEL: ELEVATED</Text>
        </Flex>
      </Box>
    </CardModel>
  )
}
