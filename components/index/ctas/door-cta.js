import { useState, useEffect } from 'react'
import { Box, Text, Card, Button } from 'theme-ui'
import { keyframes } from '@emotion/react'

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

const openMessages = [
  "Hackers detected inside. Come join the fun.",
  "The space is alive! Pull up a chair and hack away.",
  "Door's open, Wi-Fi's hot, coffee's brewing.",
  "We're in! Come break things (responsibly)."
]

const closedMessages = [
  "Gone hacking. BRB.",
  "The space is recharging. Even hackers sleep.",
  "Door locked. Probably out capturing flags.",
  "Offline mode. Check back soon."
]

function pickMessage(messages) {
  const hour = new Date().getHours()
  return messages[hour % messages.length]
}

export default function DoorCTA() {
  const [isOpen, setIsOpen] = useState(null)

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
  const bg = loading
    ? 'linear-gradient(135deg, #374151 0%, #4b5563 100%)'
    : isOpen
      ? 'linear-gradient(135deg, #047857 0%, #059669 50%, #10b981 100%)'
      : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'

  const emoji = loading ? '🔍' : isOpen ? '🔓' : '🔒'
  const title = loading
    ? 'Scanning...'
    : isOpen
      ? 'We\'re Open!'
      : 'Space Locked'
  const description = loading
    ? 'Pinging the hacker space door...'
    : isOpen
      ? pickMessage(openMessages)
      : pickMessage(closedMessages)
  const statusText = loading
    ? 'probing...'
    : isOpen
      ? 'OPEN'
      : 'CLOSED'

  return (
    <Box
      as="a"
      href="https://door.happyhacking.space"
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
      <Card
        sx={{
          background: bg,
          transition: 'background 0.5s ease',
          position: 'relative',
          color: 'white',
          width: ['100%', '100%', '340px'],
          minWidth: ['100%', '100%', 'initial'],
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
          alignItems: 'flex-start',
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

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Text
            sx={{
              fontSize: ['28px', '36px', '42px'],
              lineHeight: 1,
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'rotate(-10deg)' }
            }}
          >
            {emoji}
          </Text>
          <Text
            sx={{
              fontSize: ['22px', '26px', '30px'],
              fontWeight: 'bold',
              fontFamily: 'heading'
            }}
          >
            {title}
          </Text>
        </Box>
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
