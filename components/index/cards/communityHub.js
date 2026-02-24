import { useEffect, useState } from 'react'
import { Box, Flex, Image, Text } from 'theme-ui'
import CardModel from './card-model'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function CommunityHub({ stars }) {
  const [projects, setProjects] = useState(0)
  const [repoStars, setRepoStars] = useState(stars || 0)

  useEffect(() => {
    fetch('https://api.github.com/repos/HappyHackingSpace/CommunityHub')
      .then(response => response.json())
      .then(data => {
        if (data.stargazers_count != null) setRepoStars(data.stargazers_count)
      })
      .catch(error => console.error('Error fetching stars:', error))
  }, [])

  // useEffect(() => {
  //   fetch(
  //     'https://api.github.com/search/issues?q=repo:hackclub/onboard+is:pr+is:merged+label:Submission'
  //   )
  //     .then(response => response.json())
  //     .then(data => setProjects(data.total_count))
  // }, [])

  return (
    <CardModel
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0)',
        height: ['235px', '330px', '360px']
      }}
      github_link="https://github.com/HappyHackingSpace/CommunityHub"
      color="white"
      highlight="#FEF1DC"
      stars={repoStars}
      position={[null, 'top', 'top']}
    >
      {/* Desktop GIF - hidden on mobile */}
      <Image
        src="/home/Communityhub1.gif"
        alt="Community Hub Demo"
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
      
      /* Mobile video - visible only on mobile */
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'fill',
            zIndex: 0
          }}
          sx={{
            display: ['block', 'block', 'none', 'none']
          }}
        >
          <source src="/home/CommunityhubPhone.mp4" type="video/mp4" />
        </video>
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Flex sx={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            textAlign: 'center'
          }}>
            <Box sx={{ maxWidth: '500px', px: [3, 3, 4] }}>
              <Text as="p" variant="subtitle" sx={{
                color: 'white',
                padding: '12px',
                borderRadius: '8px',
                mt: [1, 3, 5],
                zIndex: 2,
                position: 'relative',
                display: ['none', 'none', 'block']
              }}>
                Join our development processes! Contribute to our open source projects, learn new technologies and work together with experienced developers.
              </Text>

              <Text as="p" variant="subtitle" sx={{
                color: 'white',
                padding: '12px',
                borderRadius: '8px',
                mt: [1, 3, 5],
                zIndex: 2,
                position: 'relative',
                display: ['block', 'block', 'none']
              }}>
                Contribute to open source projects and learn with experienced developers.
              </Text>

              
            </Box>
          </Flex>
        </Box>
          </CardModel>
        )
}
