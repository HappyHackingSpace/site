import Icon from '@hackclub/icons'
import { useEffect, useRef, useState } from 'react'
import { Box, Button, Card, Flex, Grid, Input, Link, Text } from 'theme-ui'
import { format, parse } from 'date-fns'
import BGImg from '../../background-image'
import background from '../../../public/home/footer.png'
import MailCard from '../../mail-card'

const Loading = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '2px solid #f3f3f3',
      borderTop: '2px solid #ec3750',
      borderRadius: '50%',
      width: '16px',
      height: '16px',
      animation: 'spin 2s linear infinite',
      mr: '5px',
      '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
      }
    }}
  ></Box>
)

const MailingList = () => {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [data, setData] = useState({ finalHtml: [], names: [] })
  const formRef = useRef(null)
  const [formTs, setFormTs] = useState('')

  useEffect(() => {
    setFormTs(String(Date.now()))
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)

    let res = await fetch('/api/mailing-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        website: e.target.website.value,
        _ts: e.target._ts.value
      })
    })

    formRef.current.reset()
    setFormTs(String(Date.now()))

    if (res.ok) {
      setSubmitted(true)
    }
    setSubmitting(false)
  }

  // This lovely concoction of JavaScript basically fetches the last two newsletters from the GitHub repo,
  // converts them to HTML, gets rid of those HTML tags, the sets all of that as the state of the component.
  // Then, It makes a second fetch request to get the filename, so that can be used to determine the link.
  // After that, it removes the file extension, so we can use that as the date.
  // Finally, it sets the state of data to the final HTML and the names of the files, so we can map that later on!

  useEffect(() => {
    Promise.all([
      fetch(
        'https://api.github.com/repos/hackclub/leaders-newsletter/contents/updates'
      )
        .then(response => response.json())
        .then(data => {
          if (!Array.isArray(data)) return []; // Handle rate limiting gracefully
          return data.sort((a, b) => b.name.localeCompare(a.name));
        })
        .then(data => data.slice(0, 2))
        .then(data => Promise.all(data.map(item => fetch(item.download_url))))
        .then(responses =>
          Promise.all(responses.map(response => response.text()))
        )
        .then(markdownArray => {
          return markdownArray.map(markdown =>
            markdown.replace(/<[^>]*>/g, '').replace(/The Hackening/g, '')
          )
        }),

      fetch(
        'https://api.github.com/repos/hackclub/leaders-newsletter/contents/updates'
      )
        .then(response => response.json())
        .then(data => {
          if (!Array.isArray(data)) return []; // Handle rate limiting gracefully
          return data.sort((a, b) => b.name.localeCompare(a.name));
        })
        .then(data => data.map(item => item.name.split('.')[0]))
    ]).then(([finalHtml, names]) => setData({ finalHtml, names }))
      .catch(err => console.error("Error fetching mailing list data:", err))
  }, [])

  return (
    <Box sx={{ position: 'relative', py: 6, background: 'darker' }}>
      <Card
        sx={{
          maxWidth: '1050px',
          mx: 'auto',
          // mt: [3, 4],
          background: 'rgb(255,255,255, 0.45)',
          position: 'relative',
          zIndex: 2,
          backdropFilter: 'blur(8px)'
        }}
      >
        <Flex
          sx={{ flexDirection: ['column', 'column', 'row'], gridGap: [0, 5] }}
        >
          <Flex
            sx={{
              placeItems: 'center',
              justifyContent: 'center',
              alignItems: ['left', 'left', 'center'],
              flexDirection: 'column',
              gap: '10px',
              width: ['100%', '100%', '50%']
            }}
          >
            <Box>
              <Text
                variant="title"
                sx={{
                  fontSize: [4, '36px', '42px', 6],
                  zIndex: 2,
                  textAlign: 'left'
                }}
              >
                Join the newsletter
              </Text>
              <Text
                sx={{
                  color: 'darkless',
                  mt: 2,
                  fontSize: 3,
                  textAlign: 'left'
                }}
                as="p"
              >
                We&apos;ll send you an email no more than once a month, when we
                work on something cool for you.
                {/* Check out our{' '}
                <Link
                  href="https://happyhacking.space/newsletters"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  previous issues
                </Link>
                . */}
              </Text>
            </Box>
            <Grid
              as="form"
              ref={formRef}
              onSubmit={handleSubmit}
              gap={[2, 3]}
              sx={{
                textAlign: 'center',
                alignItems: 'end',
                input: { bg: 'sunken' },
                width: '100%'
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Input
                  autofillBackgroundColor="highlight"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  required
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 2
                  }}
                />
              </Box>
              <div>
                <Input
                  autofillBackgroundColor="highlight"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  required
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 2
                  }}
                />
              </div>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  opacity: 0,
                  height: 0,
                  width: 0
                }}
              />
              <input type="hidden" name="_ts" value={formTs} />
              <Button type="submit" sx={{ mt: [2, 0], fontSize: 2 }}>
                {submitting ? (
                  <>
                    <Loading /> Subscribe
                  </>
                ) : submitted ? (
                  <>
                    <Icon glyph="send" /> You're on the list!
                  </>
                ) : (
                  'Subscribe'
                )}
              </Button>
            </Grid>
          </Flex>
          {/* <Box
            sx={{
              display: 'grid',
              gridGap: 4,
              mt: [4, 0],
              width: '100%'
            }}
          >
            {data.finalHtml
              .map((html, index) => (
                <MailCard
                  issue={index + 1}
                  body={html}
                  date={format(
                    parse('', '', new Date(data.names[index])),
                    'MMMM d, yyyy'
                  )}
                  link={data.names[index]}
                  key={index}
                />
              ))
              .reverse()}
          </Box> */}
        </Flex>
      </Card>
      <BGImg
        gradient="linear-gradient(rgba(0,0,0,0.125), rgba(0,0,0,0.25))"
        src={background}
        placeholder="blur"
        alt="Globe with hundreds of Hack Clubs"
      />
    </Box>
  )
}

export default MailingList
