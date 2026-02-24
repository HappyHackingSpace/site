import dynamic from 'next/dynamic'
import { Box, Text, Image, Card, Button } from 'theme-ui'

// Stable cache so dynamic() isn't called on every render
const dynamicCache = {}

function resolveCTA(componentPath) {
  if (!dynamicCache[componentPath]) {
    dynamicCache[componentPath] = dynamic(
      () => import(`./${componentPath}`),
      { ssr: false }
    )
  }
  return dynamicCache[componentPath]
}

export default function CTAS({ cards }) {
  return (
    <Box
      as="div"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: [3, 4, 4],
        justifyContent: ['center', 'center', 'flex-start'],
        mt: 1,
        py: [3, 3, 3]
      }}
    >
      {cards.map((card, idx) => {
        if (card.component) {
          const DynamicComponent = resolveCTA(card.component)
          return <DynamicComponent key={idx} />
        }

        const {
          background,
          backgroundImage,
          backgroundSize,
          gridBackground,
          stickerImage,
          stickerImageScale,
          description,
          descriptionColor,
          title,
          logo,
          buttonText,
          buttonColor,
          link
        } = card

        return (
          <Box
            key={idx}
            as="a"
            href={link}
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
              '&:hover': {
                transform: 'scale(1.0625)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
              }
            }}
          >
            {stickerImage && (
              <Image
                src={stickerImage}
                alt="Sticker"
                sx={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '-20px',
                  width:
                    stickerImageScale != null
                      ? [
                          `${120 * stickerImageScale}px`,
                          `${140 * stickerImageScale}px`,
                          `${160 * stickerImageScale}px`
                        ]
                      : ['120px', '140px', '160px'],
                  height: 'auto',
                  zIndex: 10,
                  transform: 'rotate(15deg)',
                  pointerEvents: 'none'
                }}
              />
            )}
            <Card
              sx={{
                background,
                backgroundImage: gridBackground
                  ? 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)'
                  : backgroundImage,
                backgroundSize: gridBackground
                  ? '50px 50px'
                  : backgroundSize,
                backgroundPosition: gridBackground
                  ? '0 0, 0 0'
                  : undefined,
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
              {logo && (
                <Image
                  src={logo}
                  alt={title}
                  sx={{
                    zIndex: 2,
                    height: ['48px', '56px', '64px']
                  }}
                />
              )}
              <Text
                as="p"
                sx={{
                  color: descriptionColor,
                  fontSize: ['15px', '17px', '20px'],
                  my: 2,
                  zIndex: 2
                }}
              >
                {description}
              </Text>
              <Button
                sx={{
                  backgroundColor: buttonColor,
                  color: 'white',
                  mt: 'auto',
                  zIndex: 2,
                  fontSize: ['14px', '15px', '16px'],
                  px: [3, 3, 4],
                  py: ['10px', '12px', '12px']
                }}
                as="a"
                href={link}
                target="_blank"
                rel="noreferrer"
              >
                {buttonText}
              </Button>
            </Card>
          </Box>
        )
      })}
    </Box>
  )
}
