import { useState } from 'react'
import { Flex, Text, Button } from 'theme-ui'

const PhysicalAddress = ({ lang = 'en', sx = {} }) => {
  const [copied, setCopied] = useState(false)
  const address =
    'Talaytepe Mah. 4009/1 Sk. Corner Ofis, A Blok Dis Kapi No: 4A, Ic Kapi No:4 Kayapinar/Diyarbakir'

  const labels = {
    en: {
      label: 'Physical Address:',
      copy: 'COPY',
      copied: 'COPIED!'
    },
    tr: {
      label: 'Physical Address:', // User requested English label here too
      copy: 'COPY',
      copied: 'COPIED!'
    }
  }

  const { label, copy, copied: copiedLabel } = labels[lang] || labels.en

  return (
    <Flex
      sx={{
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        py: 1,
        ...sx
      }}
    >
      <Text sx={{ fontSize: 1, color: 'slate' }}>
        <Text
          as="span"
          sx={{
            fontWeight: 'bold',
            color: 'black',
            textTransform: 'uppercase',
            fontSize: 0,
            letterSpacing: 'wider',
            mr: 2
          }}
        >
          {label}
        </Text>
        {address}
      </Text>
      <Button
        variant="outline"
        sx={{
          flexShrink: 0,
          py: 1,
          px: 2,
          fontSize: 0,
          fontWeight: 'bold',
          borderRadius: 'default',
          cursor: 'pointer',
          bg: 'red',
          color: 'white',
          border: 'none',
          ml: 3,
          '&:hover': { bg: 'dark' },
          '&:active': { transform: 'scale(0.95)' }
        }}
        onClick={() => {
          navigator.clipboard.writeText(address)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
      >
        {copied ? copiedLabel : copy}
      </Button>
    </Flex>
  )
}

export default PhysicalAddress
