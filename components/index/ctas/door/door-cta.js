import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Box, Text, Card, Button } from 'theme-ui'
import { keyframes } from '@emotion/react'
import usePrefersReducedMotion from '../../../../lib/use-prefers-reduced-motion'

const DoorScene = dynamic(() => import('./door-scene'), { ssr: false })

const DOOR_STATUS_URL =
  'https://raw.githubusercontent.com/HappyHackingSpace/.github/refs/heads/main/scripts/.door_status_cache/last_status.json'

const pulse = keyframes({
  '0%, 100%': { opacity: 1, transform: 'scale(1)' },
  '50%': { opacity: 0.6, transform: 'scale(1.3)' }
})

const blink = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0 }
})

function useTimeOfDay() {
  const [isNight, setIsNight] = useState(() => {
    const h = new Date().getHours()
    return h >= 20 || h < 6
  })

  useEffect(() => {
    const check = () => {
      const h = new Date().getHours()
      setIsNight(h >= 20 || h < 6)
    }
    const interval = setInterval(check, 60_000)
    return () => clearInterval(interval)
  }, [])

  return isNight
}

// million-ignore
export default function DoorCTA() {
  const [isOpen, setIsOpen] = useState(null)
  const isNight = useTimeOfDay()
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(DOOR_STATUS_URL)
        const data = await res.json()
        setIsOpen(data.locked === false)
      } catch {
        setIsOpen(false)
      }
    }
    fetchStatus()
    const interval = setInterval(fetchStatus, 30_000)
    return () => clearInterval(interval)
  }, [])

  const loading = isOpen === null
  const title = loading
    ? 'Scanning...'
    : isOpen
      ? 'Happy Hacking!'
      : 'Space is Closed'
  const description = loading
    ? 'Pinging the hacker space door...'
    : isOpen
      ? 'The door is open, come join us!'
      : 'No one is currently at the place.'
  const statusText = loading
    ? 'probing...'
    : isOpen
      ? 'OPEN'
      : 'CLOSED'

  const useDark = isNight || !isOpen
  const dayBg = 'linear-gradient(180deg, #87CEEB, #98D8C8)'
  const nightBg = 'linear-gradient(135deg, #141440, #1e2d50, #1a4070)'
  const bg = useDark ? nightBg : dayBg

  const dayOverlay =
    'linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.55) 100%)'
  const nightOverlay =
    'linear-gradient(180deg, transparent 30%, rgba(15,15,50,0.45) 100%)'
  const overlay = useDark ? nightOverlay : dayOverlay

  return (
    <Box
      as="a"
      href="/contact"
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
      {/* Layer 0: CSS background gradient */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: bg,
          transition: 'background 1s ease',
          zIndex: 0
        }}
      />

      {/* Sun/Moon celestial element */}
      {!loading && (
        <Box
          sx={{
            position: 'absolute',
            borderRadius: '50%',
            transition: 'all 1s ease',
            zIndex: 1,
            ...(useDark
              ? {
                  width: '60px',
                  height: '60px',
                  top: '-15px',
                  left: '-15px',
                  background:
                    'radial-gradient(circle at 35% 35%, #fffde8, #f5f5dc 50%, #e8e4c9)',
                  boxShadow:
                    '0 0 20px 8px rgba(245,245,220,0.3), 0 0 60px 20px rgba(200,200,180,0.15)'
                }
              : {
                  width: '70px',
                  height: '70px',
                  top: '-18px',
                  right: '-18px',
                  background:
                    'radial-gradient(circle at 40% 40%, #fff9e0, #ffdd44 40%, #ffaa00)',
                  boxShadow:
                    '0 0 30px 10px rgba(255,200,0,0.5), 0 0 80px 30px rgba(255,160,0,0.25), 0 0 120px 50px rgba(255,120,0,0.1)'
                })
          }}
        />
      )}

      {/* Layer 1: 3D scene */}
      {!prefersReducedMotion && (
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <DoorScene isOpen={isOpen} isNight={isNight} />
        </Box>
      )}

      {/* Layer 2: Gradient overlay — transparent top, opaque bottom */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: overlay,
          transition: 'background 1s ease',
          zIndex: 2
        }}
      />

      {/* Layer 3: UI content — pushed to bottom */}
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
        {/* Terminal-style header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            mb: 2,
            opacity: 0.5,
            fontSize: '11px',
            fontFamily: 'monospace'
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bg: '#ff5f57'
            }}
          />
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bg: '#febc2e'
            }}
          />
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bg: '#28c840'
            }}
          />
          <Text sx={{ ml: 1 }}>door@hhs:~$</Text>
        </Box>

        <Text
          sx={{
            fontSize: ['22px', '26px', '30px'],
            fontWeight: 'bold',
            fontFamily: 'heading'
          }}
        >
          {title}
        </Text>
        <Text
          as="p"
          sx={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: ['14px', '16px', '18px'],
            my: 2,
            fontFamily: 'monospace',
            lineHeight: 1.5
          }}
        >
          {loading && (
            <Text
              as="span"
              sx={{ color: '#33d6a6', fontFamily: 'monospace' }}
            >
              {'> '}
            </Text>
          )}
          {description}
          {loading && (
            <Text
              as="span"
              sx={{
                animation: `${blink} 1s step-end infinite`,
                ml: '2px'
              }}
            >
              ▊
            </Text>
          )}
        </Text>
        <Button
          sx={{
            backgroundColor: 'rgba(0,0,0,0.25)',
            color: 'white',
            mt: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            fontSize: ['13px', '14px', '15px'],
            fontFamily: 'monospace',
            px: [3, 3, 4],
            py: ['10px', '12px', '12px'],
            border: '1px solid rgba(255,255,255,0.1)'
          }}
          as="span"
        >
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bg: loading ? '#9ca3af' : isOpen ? '#34d399' : '#f87171',
              boxShadow: loading
                ? 'none'
                : isOpen
                  ? '0 0 8px #34d399, 0 0 16px #34d399'
                  : '0 0 8px #f87171',
              animation: loading
                ? 'none'
                : `${pulse} 2s ease-in-out infinite`,
              transition: 'all 0.5s ease'
            }}
          />
          status: {statusText}
        </Button>
      </Card>
    </Box>
  )
}
