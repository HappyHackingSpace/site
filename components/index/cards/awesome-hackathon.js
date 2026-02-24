import { useEffect, useState } from 'react'
import { Box, Flex, Grid, Text } from 'theme-ui'
import Buttons from './button'
import CardModel from './card-model'

/** @jsxImportSource theme-ui */

const REPO_URL = 'https://github.com/HappyHackingSpace/awesome-hackathon'
const ACCENT = '#FFB900'

export default function SprigConsole({ stars }) {
  const [repoStars, setRepoStars] = useState(stars || 0)

  useEffect(() => {
    fetch('https://api.github.com/repos/HappyHackingSpace/awesome-hackathon')
      .then(response => response.json())
      .then(data => setRepoStars(data.stargazers_count))
      .catch(error => console.error('Error fetching stars:', error))
  }, [])

  return (
    <CardModel
      github_link={REPO_URL}
      stars={repoStars}
      color="white"
      position={[null, 'top', 'top']}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#1a1a2e',
        backgroundImage: `url('/home/awesome.gif')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: ['auto', '400px', '400px']
      }}
      highlight={ACCENT}
    >
      {/* Left-heavy gradient so text stays readable while GIF peeks through on the right */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: [
            'linear-gradient(to bottom, rgba(26,26,46,0.93) 0%, rgba(26,26,46,0.8) 100%)',
            'linear-gradient(to bottom, rgba(26,26,46,0.93) 0%, rgba(26,26,46,0.8) 100%)',
            'linear-gradient(to right, rgba(26,26,46,0.92) 0%, rgba(26,26,46,0.7) 45%, rgba(26,26,46,0.3) 100%)'
          ],
          zIndex: 0
        }}
      />

      <Grid
        columns={[1, 1, '1.2fr 1fr']}
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: ['auto', '350px', '350px'],
          alignItems: 'center'
        }}
      >
        <Flex sx={{ flexDirection: 'column', gap: 3, py: [3, 4, 4] }}>
          <Text
            as="h2"
            variant="title"
            sx={{
              fontSize: ['36px', 4, 5],
              color: ACCENT,
              textShadow: '0 0 30px rgba(255, 185, 0, 0.4)',
              lineHeight: 1.1
            }}
          >
            Awesome Hackathon
          </Text>

          <Text
            as="p"
            variant="subtitle"
            sx={{
              color: 'white',
              fontSize: ['18px', '20px', '22px'],
              lineHeight: 1.5,
              maxWidth: '500px',
              opacity: 0.9
            }}
          >
            Your ultimate toolkit to build, ship & win hackathons — curated
            resources, tools, and battle-tested strategies from the community.
          </Text>

          {repoStars > 0 && (
            <Text
              as="span"
              sx={{
                px: 3,
                py: 1,
                width: 'fit-content',
                borderRadius: 'extra',
                color: ACCENT,
                border: `${ACCENT} dashed 1px`,
                fontSize: 1,
                fontWeight: 'bold'
              }}
            >
              {repoStars.toLocaleString()} stars on GitHub
            </Text>
          )}

          <Flex sx={{ flexDirection: 'column', mt: 2 }}>
            <Buttons
              id="awesome-hackathon-explore"
              link={REPO_URL}
              primary={ACCENT}
              icon="explore"
              sx={{ color: '#1a1a2e' }}
            >
              Explore Resources
            </Buttons>
            <Buttons
              id="awesome-hackathon-star"
              link={REPO_URL}
              icon="view"
            >
              Star on GitHub
            </Buttons>
          </Flex>
        </Flex>

        {/* Right column intentionally empty — GIF shows through the lighter gradient */}
        <Box sx={{ display: ['none', 'none', 'block'] }} />
      </Grid>
    </CardModel>
  )
}
