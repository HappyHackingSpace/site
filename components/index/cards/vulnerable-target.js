import { useEffect, useState } from 'react'
import CardModel from './card-model'
import { Box, Flex, Grid, Image, Link, Text } from 'theme-ui'
import Buttons from './button'
import styled from '@emotion/styled'
import RelativeTime from 'react-relative-time'

/** @jsxImportSource theme-ui */

// function Game({ game, gameImage, gameImage1, ...props }) {
//   return (
//     <Box
//       as="div"
//       sx={{
//         position: 'relative',
//         display: 'flex',
//         flexDirection: 'column',
//         width: '14rem',
//         background: 'rgba(54, 66, 85, 0.75)',
//         borderStyle: 'solid',
//         borderWidth: '4px',
//         boxSizing: 'border-box',
//         borderImageRepeat: 'stretch',
//         borderImageSlice: '3',
//         borderImageWidth: '3',
//         borderImageSource: `url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="rgb(118, 118, 143)" /></svg>')`,
//         borderImageOutset: '2',
//         boxShadow: '0 8px 8px rgba(0, 0, 0, 0.2)',
//         '&:hover': {
//           transform: 'scale(1.05)',
//           background: 'rgba(77, 90, 114, 0.8)'
//         }
//       }}
//       {...props}
//     >
//       <Box
//         as="a"
//         href={`https://editor.sprig.hackclub.com/?file=https://raw.githubusercontent.com/hackclub/sprig/main/games/${game?.filename}.js`}
//         target="_blank"
//         rel="noopener noreferrer"
//         sx={{
//           borderStyle: 'solid',
//           borderWidth: '4px',
//           padding: '0.6rem 0.6rem 0 0.6rem',
//           borderImageRepeat: 'stretch',
//           borderImageSlice: '3',
//           borderImageWidth: '3',
//           borderImageSource: `url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="rgb(167, 171, 185)" /></svg>')`,
//           borderImageOutset: '2',
//           height: '100%',
//           textDecoration: 'none'
//         }}
//       >
//         {/* <Box
//           sx={{
//             width: '100%',
//             height: '65%',
//             paddingBottom: 'calc(100%-8px)',
//             border: '4px solid rgb(118, 118, 143)',
//             margin: 0,
//             position: 'relative',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             background: 'white',
//             boxShadow: '0 4px 0px rgba(0, 0, 0, 0.1)',
//             '&:after': {
//               content: '""',
//               position: 'absolute',
//               top: 0,
//               height: '100%',
//               width: '8px',
//               backgroundImage:
//                 'linear-gradient(rgb(167, 171, 185) 5px, rgb(167, 171, 185) 5px)',
//               backgroundSize: '8px 8px',
//               backgroundPosition: 'top center',
//               backgroundRepeat: 'no-repeat',
//               zIndex: 2,
//               left: 0
//             },
//             '&:before': {
//               content: '""',
//               position: 'absolute',
//               top: 0,
//               height: '100%',
//               width: '8px',
//               backgroundImage:
//                 'linear-gradient(rgb(167, 171, 185) 5px, rgb(167, 171, 185) 5px)',
//               backgroundSize: '8px 8px',
//               backgroundPosition: 'bottom center',
//               backgroundRepeat: 'no-repeat',
//               zIndex: 2,
//               right: 0
//             }
//           }}
//         >
//           <img
//             src={gameImage || gameImage1}
//             alt="game preview"
//             sx={{
//               position: 'absolute',
//               top: 0,
//               bottom: 0,
//               left: 0,
//               objectFit: 'contain',
//               objectPosition: 'center',
//               imageRendering: 'pixelated',
//               width: '100%',
//               height: '100%',
//               margin: 0,
//               padding: 0,
//               background: 'white'
//             }}
//           />
//         </Box> */}
//         <Box sx={{ display: 'flex', flex: '60% 40%', flexWrap: 'wrap' }}>
//           <Text
//             as="h3"
//             sx={{
//               textTransform: 'lowercase',
//               textOverflow: 'ellipsis',
//               width: '100%',
//               overflow: 'hidden',
//               color: 'white',
//               whiteSpace: 'nowrap',
//               margin: '0.8rem 0 0.8rem 0',
//               fontSize: '1.4rem',
//               fontWeight: '400',
//               my: 0,
//               lineHeight: '1.4rem'
//             }}
//           >
//             {game?.title}
//           </Text>
//           <Text
//             as="h4"
//             sx={{
//               fontWeight: '300',
//               fontSize: '1.1rem',
//               color: 'rgb(151, 166, 187)',
//               padding: 0,
//               textOverflow: 'ellipsis',
//               width: '100%',
//               overflow: 'hidden',
//               whiteSpace: 'nowrap',
//               mt: 0,
//               lineHeight: '1rem'
//             }}
//           >
//             by {game?.author}
//           </Text>
//           <Text
//             as="span"
//             sx={{
//               fontWeight: '300',
//               fontSize: '0.8rem',
//               color: 'snow',
//               padding: 0,
//               opacity: 0.3,
//               mb: 1
//             }}
//           >
//             <RelativeTime value={game['addedOn']} titleFormat="YYYY-MM-DD" />
//           </Text>
//         </Box>
//       </Box>
//     </Box>
//   )
// }

export default function Sprig({ stars }) {
  const [repoStars, setRepoStars] = useState(stars || 0)

  useEffect(() => {
    fetch('https://api.github.com/repos/HappyHackingSpace/vulnerable-target')
      .then(response => response.json())
      .then(data => setRepoStars(data.stargazers_count))
      .catch(error => console.error('Error fetching stars:', error))
  }, [])

  return (
    <CardModel
      github_link="https://github.com/HappyHackingSpace/vulnerable-target"
      color="white"
      stars={repoStars}
      highlight="#DC2626"
      position={[null, 'top', 'top']}
      sx={{ 
        backgroundColor: '#0C0C16',
        position: 'relative',
        overflow: 'hidden',
        minHeight: ['300px', '400px', '450px']
      }}
    >
      {/* Desktop video - hidden on mobile */}
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
          display: ['none', 'none', 'block', 'block']
        }}
      >
        <source src="/home/vulnerable-target.mp4" type="video/mp4" />
      </video>
      
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
        <source src="/home/vulnerabletargetPhone.mp4" type="video/mp4" />
      </video>
      <Box sx={{ position: 'relative', zIndex: 1 }}>

<Grid columns={[1, 1]} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>        
  <Box sx={{ mt: [3, 4, 5], textAlign: 'center', maxWidth: '500px' }}>
          <Text
            as="p"
            variant="subtitle"
            sx={{ 
              zIndex: 2, 
              position: 'relative',
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              padding: '12px',
              borderRadius: '8px',
              mt: [4, 5, 6]
            }}
          >
            A comprehensive collection of intentionally vulnerable applications and systems 
            for security testing, penetration testing practice, and cybersecurity education.
          </Text>
          
          <Flex sx={{ flexDirection: 'column', mt: [3, 4, 5], alignItems: 'center', justifyContent: 'center' }}>
            <Buttons
              id="6"
              icon="external-link"
              link="https://vulnerabletarget.com/"
              primary="#DC2626"
              sx={{ color: 'white' }}
            >
              Discover vulnerable targets
            </Buttons>
          </Flex>
        </Box>
      </Grid>
      </Box>
    </CardModel>
  )
}

