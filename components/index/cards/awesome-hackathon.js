import { useEffect, useState } from 'react'
import { Box, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'
import CardModel from './card-model'
import Tilt from '../../tilt'

/** @jsxImportSource theme-ui */

export default function SprigConsole({ stars, consoleCount }) {
  const [repoStars, setRepoStars] = useState(stars || 0)

  useEffect(() => {
    fetch('https://api.github.com/repos/HappyHackingSpace/awesome-hackathon')
      .then(response => response.json())
      .then(data => setRepoStars(data.stargazers_count))
      .catch(error => console.error('Error fetching stars:', error))
  }, [])

  return (
    <Box sx={{ position: 'relative' }}>
      <CardModel
        github_link="https://github.com/HappyHackingSpace/awesome-hackathon"
        stars={repoStars}
        color="white"
        position={[null, 'top', 'top']}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#1A3C14',
          backgroundSize: 'cover',
          maxHeight: ['150px', '200px', '275px']
        }}
        highlight="#427A43"
      >
        {/* Desktop GIF - hidden on mobile */}
        <Image
          src="/home/awesome.gif"
          alt="Awesome Hackathon Demo"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
          // sx={{
          //   display: ['none', 'none', 'block', 'block']
          // }}
        />
        
        {/* Mobile video - visible only on mobile */}
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
          <source src="/home/awesomePhone.mp4" type="video/mp4" />
        </video>
        <Box sx={{ position: 'relative', zIndex: 1 , mt: [3, 4, 5] }}>
        {/* <Image
          src="https://sprig.hackclub.com/pcb.svg"
          sx={{
            objectFit: 'cover',
            position: 'absolute',
            width: '100%',
            height: '120%',
            ml: '-24px',
            opacity: '0.4',
            mt: '-24px',
            zIndex: 0
          }}
          alt="Printed circuit board"
        /> */}
        {/* <Image
          src="https://cloud-8u6hh0ho9-hack-club-bot.vercel.app/0sprig_console.svg"
          sx={{
            width: ['90%', '320px', '450px', '500px'],
            mt: ['42px', 0, 0],
            position: 'relative',
            zIndex: 2,
            fontSize: ['36px', 4, 5],
            color: 'white'
          }}
          alt="Sprig console"
        /> */}
        {/* <Text
          as="p"
          variant="subheadline"
          sx={{
            px: 2,
            py: 1,
            mt: 2,
            width: 'fit-content',
            borderRadius: 'extra',
            color: 'white',
            border: 'rgba(255,255,255,0.2) dashed 1px',
            zIndex: 2,
            top: ['24px', 0, '5px']
          }}
        >
          Join the other {consoleCount} teenagers with Sprigs!
        </Text> */}
        <Box sx={{ zIndex: 2, position: 'relative', mt: [4, 5, 6] }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px: [2,3,4], py: [3,4] }}>
            <Text as="h6" variant="subtitle" sx={{
              color: 'white',
              textAlign: 'center',
              maxWidth: '40rem',
              fontSize: [1, 2, 3],
              lineHeight: 1.4
            }}>
              Tools and resources to help you build, design, and win hackathons! 🏆
            </Text>
            <Box sx={{ mt: [3, 3, 4] }}>
              <Buttons
                id="6"
                link="/events"
                primary="#FFB900"
                sx={{}}
              >
                Discover events
              </Buttons>
            </Box>
          </Box>
        </Box>
        </Box>
      </CardModel>
      {/* <Tilt>
        <Image
          src="/home/sprig-console.webp"
          sx={{
            position: 'absolute',
            right: ['', '-50%', '-35%', '-25%'],
            top: ['', '15%', '15%', '10%'],
            width: ['', '100%', '85%', '70%'],
            display: ['none', 'none', 'block', 'block'],
            '&:hover': {
              cursor: 'pointer'
            },
            zIndex: 3
          }}
          alt="Sprig console"
        />
      </Tilt> */}
    </Box>
  )
}
