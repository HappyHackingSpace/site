import { Box, Container, Grid, Text } from 'theme-ui'
import Meta from '@happyhackingspace/meta'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Bio from '../components/bio'
import BoardBox from '../components/boardbio'
import ForceTheme from '../components/force-theme'
import { fetchTeam } from './api/team'
import Link from 'next/link'

const CommunityTeamBox = ({ title, children }) => {
  return (
    <Box
      bg="rgb(247 225 255)"
      sx={{
        borderRadius: 'default',
        boxShadow: 'default',
        overflow: 'hidden'
      }}
      mb={2}
    >
      <div style={{ fontWeight: 'bold' }}>
        <Text
          variant="headline"
          as="h4"
          sx={{ textAlign: 'center', fontSize: 3 }}
        >
          {title}
        </Text>
      </div>
      <div
        style={{
          overflow: 'hidden',
          margin: '0 1rem 1rem'
        }}
      >
        {children}
      </div>
    </Box>
  )
}

export default function Team({ team }) {
  // Spacing between major team section boxes
  const BOX_SPACING = 5

  return (
    <>
      <Box as="main" key="main">
        <ForceTheme theme="light" />
        <Nav />
        <Meta
          as={Head}
          title="Team"
          description="Meet the team that runs Happy Hacking Space, a nonprofit network of hackers in Mesopotamia."
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
        <Box bg="#f9f9fa" py={4}>
          <Container>
            <Box sx={{ mb: BOX_SPACING }}>
              <Text
                variant="headline"
                mt={2}
                mb={3}
                as="h3"
                sx={{ textAlign: 'center', fontSize: 4 }}
              >
                Board & Advisors
              </Text>
              <Grid columns={[1, null, 2]} gap={5} mb={4}>
                <BoardBox
                  img="/team/dogan.jpg"
                  name="Dogan Can Bakir"
                  teamRole="Founder & Chief Hacking Officer"
                  text=""
                  email="dogan"
                />
                <BoardBox
                  img="/team/omar.jpg"
                  name="Omar Kurt"
                  teamRole="Co-founder & Ninja"
                  text=""
                  email="omar"
                />
              </Grid>
              <Grid columns={[1, null, 3]} gap={4} mb={4}>
                <BoardBox
                  name="Your Name Here"
                  teamRole={<>Board Advisor</>}
                  subrole="Interested in advising? Reach out!"
                  href="mailto:team@happyhacking.space"
                />
                <BoardBox
                  name="Your Name Here"
                  teamRole={<>Board Advisor</>}
                  subrole="Interested in advising? Reach out!"
                  href="mailto:team@happyhacking.space"
                />
                <BoardBox
                  name="Your Name Here"
                  teamRole={<>Board Advisor</>}
                  subrole="Interested in advising? Reach out!"
                  href="mailto:team@happyhacking.space"
                />
              </Grid>
            </Box>
            <Box
              sx={{
                bg: '#afcfee',
                p: 3,
                borderRadius: '20px',
                mb: BOX_SPACING
              }}
            >
              <Text
                variant="headline"
                mt={2}
                mb={3}
                as="h3"
                sx={{ textAlign: 'center', fontSize: 4 }}
              >
                Hacker Resources Team
              </Text>
              <Grid columns={[1, null, 2, 3]} gap={3}>
                {(team.current || [])
                  .filter(member => member.department === 'HQ')
                  .sort((a: { name: string }, b: { name: string }) => (a.name || '').localeCompare(b.name || ''))
                  .map(member => (
                    <Bio
                      img={member.avatar}
                      name={member.name}
                      teamRole={member.role}
                      text={member.bio}
                      pronouns={member.pronouns}
                      email={member.email}
                      href={member.website}
                      key={member.name}
                    />
                  ))}
              </Grid>
            </Box>
            <Box
              sx={{
                bg: 'rgb(61 72 88 / 40%)',
                p: 3,
                borderRadius: '20px',
                mb: BOX_SPACING
              }}
            >
              <Text
                variant="headline"
                mt={2}
                mb={3}
                as="h3"
                sx={{ textAlign: 'center', fontSize: 4 }}
              >
                HHS Campus Division
              </Text>
              <Grid columns={[1, null, 2, 3]} gap={3}>
                {(team.current || [])
                  .filter(member => member.department === 'HHSCD')
                  .map(member => (
                    <Bio
                      img={member.avatar}
                      name={member.name}
                      teamRole={member.role}
                      text={member.bio}
                      pronouns={member.pronouns}
                      email={member.email}
                      href={member.website}
                      key={member.name}
                    />
                  ))}
              </Grid>
            </Box>
            <Box
              sx={{
                bg: 'rgb(51 142 218 / 40%)',
                p: 3,
                borderRadius: '20px',
                mb: BOX_SPACING
              }}
            >
              <Text
                variant="headline"
                mt={2}
                mb={3}
                as="h3"
                sx={{ textAlign: 'center', fontSize: 4 }}
              >
                HHS High School Division
              </Text>
              <Grid columns={[1, null, 2, 3]} gap={3}>
                {(team.current || [])
                  .filter(member => member.department === 'HHSHD')
                  .map(member => (
                    <Bio
                      img={member.avatar}
                      name={member.name}
                      teamRole={member.role}
                      text={member.bio}
                      pronouns={member.pronouns}
                      email={member.email}
                      href={member.website}
                      key={member.name}
                    />
                  ))}
              </Grid>
            </Box>
            <Box
              sx={{
                bg: 'rgb(166 51 214 / 40%)',
                p: 3,
                borderRadius: '20px'
              }}
            >
              <Text
                variant="headline"
                mt={2}
                mb={3}
                as="h3"
                sx={{ textAlign: 'center', fontSize: 4 }}
              >
                Community Team
              </Text>
              <Grid columns={[1, null, 2]} gap={3}>
                <CommunityTeamBox title="Moderation">
                  <Grid columns={[1, null, 2]} gap={3} m={10}>
                    {(team.current || [])
                      .filter(member => member.department === 'Moderation')
                      .map(member => (
                        <Bio
                          img={member.avatar}
                          name={member.name}
                          teamRole={member.role}
                          text={member.bio}
                          pronouns={member.pronouns}
                          email={member.email}
                          href={member.website}
                          key={member.name}
                        />
                      ))}
                  </Grid>
                </CommunityTeamBox>
                <CommunityTeamBox title="Virtual Events">
                  <Grid columns={[1, null, 2]} gap={3} m={10}>
                    {(team.current || [])
                      .filter(member => member.department === 'Events')
                      .map(member => (
                        <Bio
                          img={member.avatar}
                          name={member.name}
                          teamRole={member.role}
                          text={member.bio}
                          pronouns={member.pronouns}
                          email={member.email}
                          href={member.website}
                          key={member.name}
                        />
                      ))}
                  </Grid>
                </CommunityTeamBox>
                <CommunityTeamBox title="Newspaper">
                  <Grid columns={[1, null, 2]} gap={3} m={10}>
                    {(team.current || [])
                      .filter(member => member.department === 'Newspaper')
                      .map(member => (
                        <Bio
                          img={member.avatar}
                          name={member.name}
                          teamRole={member.role}
                          text={member.bio}
                          pronouns={member.pronouns}
                          email={member.email}
                          href={member.website}
                          key={member.name}
                        />
                      ))}
                  </Grid>
                </CommunityTeamBox>
                <CommunityTeamBox title="Welcomers">
                  <Grid columns={[1, null, 2]} gap={3} m={10}>
                    {(team.current || [])
                      .filter(member => member.department === 'Welcoming')
                      .map(member => (
                        <Bio
                          img={member.avatar}
                          name={member.name}
                          teamRole={member.role}
                          text={member.bio}
                          pronouns={member.pronouns}
                          email={member.email}
                          href={member.website}
                          key={member.name}
                        />
                      ))}
                  </Grid>
                </CommunityTeamBox>
              </Grid>
            </Box>
            <br />
            <Box sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              <Link href="/acknowledged/" style={{ textDecoration: 'none' }}>
                <Box sx={{ cursor: 'pointer' }}>
                  <Text
                    variant="title"
                    color="orange"
                    sx={{ lineHeight: '1em', fontSize: [4, 5, 6], textAlign: 'center', textDecoration: 'underline', textDecorationColor: 'orange', textUnderlineOffset: '6px' }}
                    as="h2"
                  >
                    Acknowledgements
                  </Text>
                  <Text sx={{ color: 'muted', fontSize: 2, mt: 2, textDecoration: 'none' }}>
                    Thank you to everyone who helped shape Happy Hacking Space into what it is today...
                  </Text>
                </Box>
              </Link>
            </Box>
          </Container>
        </Box>
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
    console.error("TEAM_PAGE_FETCH_ERROR:", e)
    return { props: { team: { current: [], acknowledged: [] } } }
  }
}
