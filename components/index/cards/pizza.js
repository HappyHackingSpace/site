import CardModel from './card-model'
import { Box, Button, Flex, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'
import { useTranslation } from '../../../lib/i18n'

/** @jsxImportSource theme-ui */

export default function Pizza() {
  const { t } = useTranslation()
  return (
    <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#95C9E5',
        border: '1px solid #EC3750' // Corrected the color value here
      }}
      position={[null, 'bottom', 'bottom']}
      highlight="#271932"
      image="https://cloud-4f5ohtb3u-hack-club-bot.vercel.app/0subtlegrain.png"
    >
      <Grid
        columns={[1, 2]}
        sx={{ position: 'relative', alignItems: 'center', zIndex: 2 }}
      >
        <Box>
          <Text
            as="h3"
            variant="title"
            sx={{
              fontSize: ['36px', 4, 5],
              zIndex: 2,
              color: '#000',
              mb: '8px'
            }}
          >
            {t('cards.pizza.title')}
          </Text>

          <Text as="p" variant="subtitle" sx={{ color: '#000', mb: 3 }}>
            {t('cards.pizza.desc')}
          </Text>

          <Buttons id="14" link="/pizza" icon="welcome" primary="primary">
            {t('cards.pizza.grant')}
          </Buttons>
        </Box>
        <Box>
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'end',
              justifyContent: 'flex-end',
              position: 'relative'
            }}
          >
            <Image
              alt={t('cards.pizza.alt')}
              sx={{
                borderRadius: '16px',
                border: '1px solid #EC3750',
                aspectRatio: '16/9',
                objectFit: 'fit',
              }}
              src="/home/hacker-team.png"
            />
            <Text
              sx={{
                color: '#000',
                backgroundColor: '#fff',
                left: '16px',
                bottom: '16px',
                padding: '6px 8px',
                borderRadius: '16px',
                position: 'absolute'
              }}
            >
             {t('cards.pizza.from')}
            </Text>
          </Flex>
        </Box>
      </Grid>
    </CardModel>
  )
}