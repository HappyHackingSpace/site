import { Box, Card, Flex } from 'theme-ui'

// Shimmer animation for loading states
const shimmerAnimation = {
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    transform: 'translateX(-100%)',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    animation: 'shimmer 2s infinite',
    content: '""'
  },
  '@keyframes shimmer': {
    '100%': {
      transform: 'translateX(100%)'
    }
  }
}

export const ComponentSkeleton = ({ height = 200, ...props }) => (
  <Card
    sx={{
      height,
      bg: 'sunken',
      borderRadius: 'extra',
      ...shimmerAnimation,
      ...props.sx
    }}
    {...props}
  />
)

export const CarouselSkeleton = () => (
  <Box sx={{ py: 4 }}>
    <ComponentSkeleton height={80} sx={{ mb: 3, width: '60%' }} />
    <Flex sx={{ gap: 3, overflowX: 'hidden' }}>
      {[...Array(4)].map((_, i) => (
        <ComponentSkeleton
          key={i}
          height={300}
          sx={{ minWidth: 280, flex: '0 0 auto' }}
        />
      ))}
    </Flex>
  </Box>
)

export const GitHubSkeleton = () => (
  <Flex sx={{ gap: 2, alignItems: 'center' }}>
    <ComponentSkeleton height={32} sx={{ width: 32, borderRadius: '50%' }} />
    <Box sx={{ flex: 1 }}>
      <ComponentSkeleton height={16} sx={{ mb: 1, width: '70%' }} />
      <ComponentSkeleton height={12} sx={{ width: '50%' }} />
    </Box>
  </Flex>
)

export const SprigSkeleton = () => (
  <Card sx={{ p: 4, borderRadius: 'extra' }}>
    <ComponentSkeleton height={24} sx={{ mb: 3, width: '60%' }} />
    <ComponentSkeleton height={150} sx={{ mb: 3 }} />
    <ComponentSkeleton height={16} sx={{ width: '40%' }} />
  </Card>
)