import { useEffect, useState } from 'react'
import { Box, Flex, Grid, Image, Text } from 'theme-ui'
import CardModel from './card-model'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Onboard({ stars }) {
  const [projects, setProjects] = useState(0)
  const [repoStars, setRepoStars] = useState(stars || 0)

  useEffect(() => {
    fetch('https://api.github.com/repos/HappyHackingSpace/CommunityHub')
      .then(response => response.json())
      .then(data => setRepoStars(data.stargazers_count))
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
        maxHeight: ['225px', '300px', '340px']
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
            objectFit: 'cover',
            zIndex: 0
          }}
          sx={{
            display: ['block', 'block', 'none', 'none']
          }}
        >
          <source src="/home/CommunityhubPhone.mp4" type="video/mp4" />
        </video>
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Grid columns={[1, 2]} sx={{ display: 'flex', flexDirection: ['column', 'row'], alignItems: 'center', justifyContent: 'center', gap: [3, 7] }}>
            {/* Sol Kolon - Community */}
            <Box sx={{ textAlign: 'center', maxWidth: '400px' }}>
              <Text as="p" variant="subtitle" sx={{ 
                color: 'white',
                // backgroundColor: 'rgba(0, 0, 0)',
                padding: '12px',
                borderRadius: '8px',
                mt: [4, 5, 6],
                zIndex: 2, 
                position: 'relative'
              }}>
                A vibrant community hub where developers, designers, and tech enthusiasts come together 
                to collaborate, share knowledge, and build amazing projects together.
              </Text>
              
              <Flex sx={{ flexDirection: 'column', mt: [3, 4, 5], alignItems: 'center', justifyContent: 'center' }}>
                <Buttons
                  id="59"
                  icon="users"
                  link="https://github.com/HappyHackingSpace/CommunityHub"
                  primary="#FEF1DC"
                  color="black"
                >
                  Join community
                </Buttons>
              </Flex>
            </Box>
       
            <Box sx={{ 
              textAlign: 'center',
              maxWidth: '400px',
              display: ['none', 'block']  
            }}>
              <Text as="p" variant="subtitle" sx={{ 
                color: 'white',
                // backgroundColor: 'rgba(0, 0, 0, 0.6)',
                padding: '12px',
                borderRadius: '8px',
                mt: [4, 5, 6],
                zIndex: 2, 
                position: 'relative'
              }}>
                Join our development processes! Contribute to our open source projects, 
                learn new technologies and work together with experienced developers.
              </Text>
              
              <Flex sx={{ flexDirection: 'column', mt: [3, 4, 5], alignItems: 'center', justifyContent: 'center' }}>
                <Buttons
                  id="60"
                  icon="github"
                  link="https://github.com/HappyHackingSpace"
                  primary="#333333"
                  color="white"
                >
                  Go to GitHub
                </Buttons>
              </Flex>
            </Box>
          </Grid>
        </Box>
          </CardModel>
        )
}
