import { useState, useEffect } from 'react'
import Meta from '@happyhackingspace/meta'
import Head from 'next/head'
import { Box, Heading, Container, Text, Link, Grid, Card } from 'theme-ui'
import Nav from '../components/nav'
import styled from '@emotion/styled'
import Footer from '../components/footer'
import Icon from '../components/icon'

// Obfuscate email to prevent bot scraping
const useObfuscatedEmail = () => {
  const [email, setEmail] = useState('')
  const [mailto, setMailto] = useState('#')

  useEffect(() => {
    // Only reveal email on client-side after hydration
    const parts = ['team', 'happyhacking', 'space']
    const assembled = `${parts[0]}@${parts[1]}.${parts[2]}`
    setEmail(assembled)
    setMailto(`mailto:${assembled}`)
  }, [])

  return { email, mailto }
}

const Header = styled(Box)`
  color: white;
  height: 14rem;
  background-image: linear-gradient(
    32deg,
    rgb(45, 66, 228) 0%,
    rgb(41, 143, 206) 64%,
    rgb(36, 181, 165) 100%
  );
  clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0% 90%);
  > div {
    position: relative;
  }
  @media screen and (min-width: 48em) {
    height: 20rem;
  }
`

const ContactCard = styled(Card)`
  padding: 24px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`

const SocialLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  background: #f5f5f5;
  text-decoration: none;
  color: inherit;
  transition: background 0.2s ease;
  &:hover {
    background: #e8e8e8;
    text-decoration: none;
  }
`

const SocialLinkContent = styled(Box)`
  display: flex;
  flex-direction: column;
  min-width: 0;
`

const SocialTitle = styled(Text)`
  font-weight: bold;
  font-size: 16px;
  line-height: 1.3;
`

const SocialSubtitle = styled(Text)`
  font-size: 14px;
  color: #64748b;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export default function Contact() {
  const { email, mailto } = useObfuscatedEmail()

  return (
    <Box sx={{ bg: 'white', color: 'black', minHeight: '100vh' }}>
      <Nav />
      <Meta
        as={Head}
        title="Contact"
        description="Get in touch with Happy Hacking Space. Visit us, send an email, or connect on social media."
        image="https://cloud-cz9a6kt0a-hack-club-bot.vercel.app/0social-photo_2.jpg"
      />
      <Box>
        <Header>
          <Container
            width={1}
            sx={{ maxWidth: '56rem!important', py: '72px', px: 3 }}
            align="left"
          >
            <Heading
              sx={{
                fontSize: [44, 54, 72],
                textTransform: 'uppercase',
                lineHeight: 1.125
              }}
            >
              Contact Us
            </Heading>
            <Text sx={{ fontSize: [2, 3], mt: 2, opacity: 0.9 }}>
              We'd love to hear from you
            </Text>
          </Container>
        </Header>

        <Container sx={{ maxWidth: '56rem!important', px: 3, py: [4, 5] }}>
          <Grid columns={[1, 1, 2]} gap={4}>
            {/* Address Card */}
            <ContactCard>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Icon glyph="pin" size={28} color="rgb(45, 66, 228)" />
                <Heading as="h2" sx={{ fontSize: 3, m: 0 }}>
                  Visit Us
                </Heading>
              </Box>
              <Text sx={{ fontSize: 2, lineHeight: 1.6, color: 'slate' }}>
                Talaytepe Mah. 4009/1 Sokak
                <br />
                Ay Yapi Corner Ofis A Blok
                <br />
                Dis Kapi No: 4A Ic Kapi No: 4
                <br />
                Diyarbakir, Turkey 21070
              </Text>
              <Link
                href="https://maps.app.goo.gl/fx44ZMf3NFSA46Qn9"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  mt: 3,
                  color: 'rgb(45, 66, 228)',
                  fontSize: 2
                }}
              >
                View on Google Maps
                <Icon glyph="external" size={16} />
              </Link>
            </ContactCard>

            {/* Email Card */}
            <ContactCard>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Icon glyph="email-fill" size={28} color="rgb(41, 143, 206)" />
                <Heading as="h2" sx={{ fontSize: 3, m: 0 }}>
                  Email Us
                </Heading>
              </Box>
              <Text sx={{ fontSize: 2, lineHeight: 1.6, color: 'slate', mb: 3 }}>
                Have a question or want to collaborate? Send us an email and we'll get back to you as soon as possible.
              </Text>
              <Link
                href={mailto}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 2,
                  px: 3,
                  py: 2,
                  bg: 'rgb(41, 143, 206)',
                  color: 'white',
                  borderRadius: 6,
                  fontSize: 2,
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease',
                  ':hover': {
                    bg: 'rgb(36, 130, 190)',
                    textDecoration: 'none'
                  }
                }}
              >
                <Icon glyph="send" size={18} />
                {email || 'Loading...'}
              </Link>
            </ContactCard>
          </Grid>

          {/* Social Links Section */}
          <Box sx={{ mt: 5 }}>
            <Heading as="h2" sx={{ fontSize: [3, 4], mb: 4, textAlign: 'center' }}>
              Connect With Us
            </Heading>

            {/* Main Social */}
            <Text sx={{ fontSize: 1, fontWeight: 'bold', color: 'slate', mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
              Social Media
            </Text>
            <Grid columns={[1, 2, 3]} gap={3} sx={{ mb: 4 }}>
              <SocialLink
                href="https://discord.happyhacking.space"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon glyph="discord" size={24} color="#5865F2" />
                <SocialLinkContent>
                  <SocialTitle>Discord</SocialTitle>
                  <SocialSubtitle>Join our server</SocialSubtitle>
                </SocialLinkContent>
              </SocialLink>

              <SocialLink
                href="https://join.happyhacking.space"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon glyph="message-fill" size={24} color="#25D366" />
                <SocialLinkContent>
                  <SocialTitle>WhatsApp</SocialTitle>
                  <SocialSubtitle>Join our group</SocialSubtitle>
                </SocialLinkContent>
              </SocialLink>

              <SocialLink
                href="https://x.com/happyhackings"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon glyph="twitter" size={24} color="#000" />
                <SocialLinkContent>
                  <SocialTitle>X (Twitter)</SocialTitle>
                  <SocialSubtitle>@happyhackings</SocialSubtitle>
                </SocialLinkContent>
              </SocialLink>

              <SocialLink
                href="https://www.instagram.com/happyhackingspace"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon glyph="instagram" size={24} color="#E4405F" />
                <SocialLinkContent>
                  <SocialTitle>Instagram</SocialTitle>
                  <SocialSubtitle>@happyhackingspace</SocialSubtitle>
                </SocialLinkContent>
              </SocialLink>

              <SocialLink
                href="https://www.linkedin.com/company/happyhackingspace"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon glyph="link" size={24} color="#0A66C2" />
                <SocialLinkContent>
                  <SocialTitle>LinkedIn</SocialTitle>
                  <SocialSubtitle>happyhackingspace</SocialSubtitle>
                </SocialLinkContent>
              </SocialLink>

              <SocialLink
                href="https://bsky.app/profile/happyhackingspace.bsky.social"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon glyph="share" size={24} color="#0085FF" />
                <SocialLinkContent>
                  <SocialTitle>Bluesky</SocialTitle>
                  <SocialSubtitle>@happyhackingspace</SocialSubtitle>
                </SocialLinkContent>
              </SocialLink>

              <SocialLink
                href="https://mastodon.social/@happyhackingspace"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon glyph="mastodon" size={24} color="#6364FF" />
                <SocialLinkContent>
                  <SocialTitle>Mastodon</SocialTitle>
                  <SocialSubtitle>@happyhackingspace</SocialSubtitle>
                </SocialLinkContent>
              </SocialLink>

              <SocialLink
                href="https://www.reddit.com/r/HappyHackingSpace/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon glyph="community" size={24} color="#FF4500" />
                <SocialLinkContent>
                  <SocialTitle>Reddit</SocialTitle>
                  <SocialSubtitle>r/HappyHackingSpace</SocialSubtitle>
                </SocialLinkContent>
              </SocialLink>
            </Grid>

            {/* Video & Streaming */}
            <Text sx={{ fontSize: 1, fontWeight: 'bold', color: 'slate', mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
              Video & Streaming
            </Text>
            <Grid columns={[1, 2, 4]} gap={3} sx={{ mb: 4 }}>
              <SocialLink
                href="https://www.youtube.com/@HappyHackingSpace"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon glyph="youtube" size={24} color="#FF0000" />
                <SocialLinkContent>
                  <SocialTitle>YouTube</SocialTitle>
                  <SocialSubtitle>@HappyHackingSpace</SocialSubtitle>
                </SocialLinkContent>
              </SocialLink>

              <SocialLink
                href="https://www.tiktok.com/@happyhackingspace"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon glyph="photo" size={24} color="#000" />
                <SocialLinkContent>
                  <SocialTitle>TikTok</SocialTitle>
                  <SocialSubtitle>@happyhackingspace</SocialSubtitle>
                </SocialLinkContent>
              </SocialLink>

              <SocialLink
                href="https://www.twitch.tv/happyhackingspace"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon glyph="twitch" size={24} color="#9146FF" />
                <SocialLinkContent>
                  <SocialTitle>Twitch</SocialTitle>
                  <SocialSubtitle>happyhackingspace</SocialSubtitle>
                </SocialLinkContent>
              </SocialLink>

              <SocialLink
                href="https://kick.com/happyhackingspace"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon glyph="view" size={24} color="#53FC18" />
                <SocialLinkContent>
                  <SocialTitle>Kick</SocialTitle>
                  <SocialSubtitle>happyhackingspace</SocialSubtitle>
                </SocialLinkContent>
              </SocialLink>

              <SocialLink
                href="https://open.spotify.com/show/1E5mumdvCogGGVoibPkytq"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon glyph="controls" size={24} color="#1DB954" />
                <SocialLinkContent>
                  <SocialTitle>Spotify</SocialTitle>
                  <SocialSubtitle>Podcast</SocialSubtitle>
                </SocialLinkContent>
              </SocialLink>
            </Grid>

            {/* Developer & Resources */}
            <Text sx={{ fontSize: 1, fontWeight: 'bold', color: 'slate', mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
              Developer & Resources
            </Text>
            <Grid columns={[1, 2, 3]} gap={3}>
              <SocialLink
                href="https://github.com/happyhackingspace"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon glyph="github" size={24} color="#333" />
                <SocialLinkContent>
                  <SocialTitle>GitHub</SocialTitle>
                  <SocialSubtitle>happyhackingspace</SocialSubtitle>
                </SocialLinkContent>
              </SocialLink>

              <SocialLink
                href="https://huggingface.co/happyhackingspace"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon glyph="sam" size={24} color="#FFD21E" />
                <SocialLinkContent>
                  <SocialTitle>Hugging Face</SocialTitle>
                  <SocialSubtitle>happyhackingspace</SocialSubtitle>
                </SocialLinkContent>
              </SocialLink>

              <SocialLink
                href="https://happyhackingspace.blog"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon glyph="post" size={24} color="rgb(207, 45, 228)" />
                <SocialLinkContent>
                  <SocialTitle>Blog</SocialTitle>
                  <SocialSubtitle>happyhackingspace.blog</SocialSubtitle>
                </SocialLinkContent>
              </SocialLink>

              <SocialLink
                href="https://events.happyhacking.space"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon glyph="event-code" size={24} color="rgb(41, 143, 206)" />
                <SocialLinkContent>
                  <SocialTitle>Events</SocialTitle>
                  <SocialSubtitle>Community events</SocialSubtitle>
                </SocialLinkContent>
              </SocialLink>

              <SocialLink
                href="https://giphy.com/channel/happyhackingspace"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon glyph="emoji" size={24} color="#00FF99" />
                <SocialLinkContent>
                  <SocialTitle>Giphy</SocialTitle>
                  <SocialSubtitle>happyhackingspace</SocialSubtitle>
                </SocialLinkContent>
              </SocialLink>
            </Grid>
          </Box>

          {/* CTA Section */}
          <Box
            sx={{
              backgroundImage: t => t.util.gx('cyan', 'blue'),
              mt: 5,
              borderRadius: 12,
              color: 'white',
              textAlign: 'center',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Heading as="h2" sx={{ fontSize: [3, 4], mb: 2 }}>
              Ready to start hacking?
            </Heading>
            <Text as="p" sx={{ fontSize: 2, mb: 3, opacity: 0.9 }}>
              Join our community of hackers
            </Text>
            <Link
              href="https://discord.happyhacking.space"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'inline-block',
                px: 4,
                py: 2,
                bg: 'white',
                color: 'blue',
                borderRadius: 6,
                fontSize: 2,
                fontWeight: 'bold',
                textDecoration: 'none',
                ':hover': {
                  textDecoration: 'none',
                  transform: 'scale(1.05)'
                }
              }}
            >
              Join the Community
            </Link>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}
