import { Box, Text, Card, Button } from 'theme-ui'
import { keyframes } from '@emotion/react'
import { useTranslation } from '../../lib/i18n'

const pulse = keyframes({
  '0%, 100%': { opacity: 1, transform: 'scale(1)' },
  '50%': { opacity: 0.6, transform: 'scale(1.3)' }
})

export default function VolunteerCTA() {
  const { t } = useTranslation()

  const whatsappLink = `https://wa.me/905347001757?text=${encodeURIComponent(
    t('cta.volunteerWhatsAppMessage')
  )}`

  const cardBg = 'linear-gradient(135deg, rgb(45, 66, 228), rgb(207, 45, 228))'
  const cardOverlay = 'linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.55) 100%)'

  return (
    <Box
      as="a"
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        position: 'relative',
        display: 'inline-block',
        width: ['100%', '100%', '340px'],
        borderRadius: 'extra',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        transition: 'transform .125s ease-in-out, box-shadow .125s ease-in-out',
        textDecoration: 'none',
        overflow: 'hidden',
        '&:hover': {
          transform: 'scale(1.0625)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: cardBg,
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: cardOverlay,
          zIndex: 2
        }}
      />
      <Card
        sx={{
          background: 'transparent',
          position: 'relative',
          color: 'white',
          width: '100%',
          minHeight: ['220px', '260px', '300px'],
          padding: ['16px !important', '20px !important', '24px !important'],
          paddingTop: ['18px !important', '24px !important', '28px !important'],
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          zIndex: 3,
          '&:hover': { cursor: 'pointer' }
        }}
      >
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
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bg: '#ff5f57' }} />
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bg: '#febc2e' }} />
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bg: '#28c840' }} />
          <Text sx={{ ml: 1 }}>{t('cta.volunteerPrompt')}</Text>
        </Box>

        <Text
          sx={{
            fontSize: ['22px', '26px', '30px'],
            fontWeight: 'bold',
            fontFamily: 'heading'
          }}
        >
          {t('cta.volunteerTitle')}
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
          {t('cta.volunteerDesc')}
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
              bg: '#34d399',
              boxShadow: '0 0 8px #34d399, 0 0 16px #34d399',
              animation: `${pulse} 2s ease-in-out infinite`,
              transition: 'all 0.5s ease'
            }}
          />
          {t('cta.volunteerStatus')}
        </Button>
      </Card>
    </Box>
  )
}
