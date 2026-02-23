import { Box, Container, Grid, Text } from 'theme-ui'
import Meta from '@happyhackingspace/meta'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Bio from '../components/bio'
import ForceTheme from '../components/force-theme'
import { fetchTeam } from './api/team'

export default function Acknowledged({ team }) {
  return (
    <>
      <Box as="main" key="main" pb={5}>
        <ForceTheme theme="light" />
        <Nav />
        <Meta
          as={Head}
          title="Acknowledgements"
          description="Thank you to everyone who helped shape Happy Hacking Space into what it is today."
        />
        <Box
          pt={6}
          pb={5}
          px={[2, 4]}
          sx={{
            backgroundImage:
              'radial-gradient(ellipse farthest-corner at top left,rgb(36 181 165 / 70%),rgb(30 151 137 / 70%)), url(/team/hhsteam.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: '25% 65%'
          }}
        >
          <Container>
            <Text variant="ultratitle" color="snow">
              By the hackers,
              <br /> for the hackers.
            </Text>

            <Text
              as="div"
              variant="lead"
              color="smoke"
              sx={{ maxWidth: '650px' }}
            >
              We believe in a world where every person is empowered to be
              the change they want to see around them. At Happy Hacking Space, we're
              working hard to make it reality.
            </Text>
          </Container>
        </Box>
        <Container>
          <Box sx={{ textAlign: 'center', mt: 100, mb: [3, 4] }}>
            <Text
              variant="title"
              color="orange"
              sx={{ lineHeight: '1em', fontSize: [4, 5, 6] }}
              as="h2"
            >
              Acknowledgements
            </Text>
            <Text
              variant="title"
              color="text"
              sx={{
                lineHeight: '1.2',
                fontSize: [1, 3, 4],
                my: [3, 0, 0],
                fontWeight: 400,
                maxWidth: '600px',
                width: '100%',
                margin: 'auto'
              }}
              as="h2"
            >
              Thank you to everyone who helped shape Happy Hacking Space into what it is
              today...
            </Text>
          </Box>
          <Grid columns={[1, null, 2, 3]} gap={3}>
            {(team.acknowledged || []).map(member => (
              <Bio
                name={member.name}
                teamRole={member.role}
                text={member.bio}
                pronouns={member.pronouns}
                key={member.name}
                href={member.website}
              />
            ))}
          </Grid>
        </Container>
      </Box>
      <Footer light="true" key="footer" />
    </>
  )
}

export const getServerSideProps = async () => {
  try {
    const team = await fetchTeam()
    return { props: { team } }
  } catch (e) {
    return { props: { team: { acknowledged: [] } } }
  }
}
