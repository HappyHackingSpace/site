import { useEffect, useState } from 'react'
import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Haxidraw({ stars }) {
  const [repoStars, setRepoStars] = useState(stars || 0)

  useEffect(() => {
    fetch('https://api.github.com/repos/HappyHackingSpace/githubmon')
      .then(response => response.json())
      .then(data => setRepoStars(data.stargazers_count))
      .catch(error => console.error('Error fetching stars:', error))
  }, [])

  return (
    <CardModel
      github_link="https://github.com/HappyHackingSpace/githubmon"
      color="#54738d"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#95C9E5',
        maxHeight: ['300px', '200px', '5000px']
      }}
      position={[null, 'top', 'top']}
      highlight="dark"
      filter="brightness(0.8)"
      stars={repoStars}
    >
      {/* Desktop Image - hidden on mobile */}
      <Image
        src="/home/gitmon.png"
        alt="GitMon Demo"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
        sx={{
          display: ['none', 'none', 'block', 'block']
        }}
      />

      {/* Mobile Image - visible only on mobile */}
      <Image
        src="/home/gitmonPhone.png"
        alt="GitMon Demo Mobile"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
        sx={{
          display: ['block', 'block', 'none', 'none']
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* <Text variant="title" as="h3" sx={{ fontSize: ['36px', 4, 5] }}>
          Blot
        </Text> */}
        <Flex sx={{
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        mt: [3, 4, 5],
      
      }}>
        <Box sx={{ mt: [2, 3, 4], maxWidth: '40rem', width: '100%' }}>
          <Text
            as="p"
            variant="subtitle"
            sx={{
              zIndex: 2,
              position: 'relative',
              color: '#54738d',
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              padding: '8px',
              borderRadius: '5px',
              textAlign: 'center'
            }}
          >
            GitMon is an open source GitHub analytics and monitoring platform, designed
            to be a fun and developer-friendly introduction to repository insights
            and performance tracking.
          </Text>
        </Box>
        <Box sx={{ mt: [1, 2, 3] }}>
          <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
            <Buttons
              id="51"
              icon="align-left"
              link="https://github.com/HappyHackingSpace/githubmon"
              primary="rgba(255, 255, 255, 0.9)"
              sx={{ color: 'black' }}
            >
             Dress warmly!
            </Buttons>
            {/* Additional buttons removed for clarity */}
          </Flex>
        </Box>
      </Flex>
      </Box>
    </CardModel>
  )
}
