import {
  Badge,
  BaseStyles,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Image
} from 'theme-ui'

export function PillHolder({ children }) {
  return (
    <Flex
      sx={{
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        div: {
          mt: 0,
          mb: 2,
          bg: 'white',
          color: 'muted',
          border: '1px solid',
          borderColor: 'border',
          bg: 'snow',
          fontSize: 2,
          fontWeight: 'body',
          lineHeight: '36px'
        }
      }}
    >
      {children}
    </Flex>
  )
}

export function AuthorPill({ tag, image, firstName }) {
  return (
    <Badge
      variant="pill"
      sx={{
        mr: [2, 3],
        pl: 2,
        pr: 3,
        display: 'inline-flex',
        alignItems: 'center'
      }}
    >
      <Image 
        src={image} 
        alt={firstName} 
        sx={{ 
          width: 36, 
          height: 36, 
          borderRadius: '50%',
          mr: 2 
        }} 
      />
      {tag}
    </Badge>
  )
}

export function DatePill({ tag }) {
  return (
    <Badge variant="pill" px={3}>
      {tag}
    </Badge>
  )
}
