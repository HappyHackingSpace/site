import { Box, Container, Heading, Card, Text, Grid } from 'theme-ui'
import Head from 'next/head'
import Meta from '@happyhackingspace/meta'
import ForceTheme from '/components/force-theme'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import Link from 'next/link'
import Icon from '../../components/icon'
import Image from 'next/image'
import volleyballPic from '../../public/jobs/volleyball-group-pic.jpg'
import { compact } from 'lodash'
import { decodeHtmlEntities } from '../../lib/helpers'
import { useTranslation } from '../../lib/i18n'

const JobListing = ({
  positionName,
  positionDesc,
  positionLink,
  positionLocation,
  positionType
}) => (
  <Link href={positionLink}>
    <Card
      variant="sunken"
      as="a"
      target="_blank"
      sx={{
        width: '100%',
        textDecoration: 'none',
        'span > svg': {
          opacity: '0',
          transition: '0.3s ease-in-out'
        },
        '&:hover span > svg': {
          opacity: '1'
        }
      }}
    >
      <Box
        as="span"
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        <Heading
          variant="headline"
          sx={{
            color: 'black',
            m: 0
          }}
        >
          {positionName}
        </Heading>
        <Icon glyph="external" size={24} color="black" />
      </Box>

      <Text
        variant="caption"
        sx={{
          mt: 1,
          display: 'block',
          textAlign: 'left'
        }}
      >
        {compact([positionDesc, positionLocation, positionType]).join(' • ')}
      </Text>
    </Card>
  </Link>
)

const Page = ({ jobs }) => {
  const { t } = useTranslation()
  return (
  <>
    <Meta
      as={Head}
      title="Jobs"
      description="Happy Hacking Space is hiring! Check out the open positions."
    />
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="main"
      key="main"
      sx={{
        color: 'black'
      }}
    >
      <Box
        sx={{
          py: [5, 6],
          background:
            'linear-gradient(90deg, rgba(2,0,36,0.53) 0%, rgba(2,0,36,0.46) 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: -1
          }}
        >
          <Image
            src={volleyballPic}
            alt={t('jobs.imageAlt')}
            layout="fill"
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <Container>
          <Heading
            as="h1"
            sx={{
              fontSize: ['48px', '48px', '72px'],
              color: 'white'
            }}
          >
            {t('jobs.hero.title')}
          </Heading>
        </Container>
      </Box>
      <Container sx={{ py: [3, 4], px: [2, 2, 0] }}>
        <Grid
          columns={[1, 2]}
          gap={[3, 4]}
          sx={{ maxWidth: '64rem', mx: 'auto', mb: [4, 5] }}
        >
          <Card
            variant="sunken"
            sx={{
              p: [3, 4],
              background:
                'linear-gradient(135deg, rgba(45,66,228,0.08) 0%, rgba(207,45,228,0.08) 100%)',
              border: '1px solid rgba(45,66,228,0.2)'
            }}
          >
            <Text
              sx={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'primary',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                mb: 2
              }}
            >
              {t('jobs.rules.label', { number: 1 })}
            </Text>
            <Heading
              as="h3"
              sx={{ fontSize: ['20px', '24px'], mb: 2, color: 'black' }}
            >
              {t('jobs.rules.excellent.title')}
            </Heading>
            <Text sx={{ color: 'muted', lineHeight: 1.6 }}>
              {t('jobs.rules.excellent.description')}
            </Text>
          </Card>
          <Card
            variant="sunken"
            sx={{
              p: [3, 4],
              background:
                'linear-gradient(135deg, rgba(45,66,228,0.08) 0%, rgba(207,45,228,0.08) 100%)',
              border: '1px solid rgba(45,66,228,0.2)'
            }}
          >
            <Text
              sx={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'primary',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                mb: 2
              }}
            >
              {t('jobs.rules.label', { number: 2 })}
            </Text>
            <Heading
              as="h3"
              sx={{ fontSize: ['20px', '24px'], mb: 2, color: 'black' }}
            >
              {t('jobs.rules.docracy.title')}
            </Heading>
            <Text sx={{ color: 'muted', lineHeight: 1.6 }}>
              {t('jobs.rules.docracy.description')}
            </Text>
            <Text
              sx={{
                color: 'primary',
                fontSize: ['14px', '15px'],
                fontStyle: 'italic',
                mt: 3,
                pt: 3,
                borderTop: '1px dashed rgba(45,66,228,0.2)',
                lineHeight: 1.6
              }}
            >
              {t('jobs.rules.closing')}
            </Text>
          </Card>
        </Grid>
        <Grid
          sx={{
            maxWidth: '64rem',
            mx: 'auto'
          }}
          align="left"
          columns={['1fr', '1fr 1fr']}
        >
          {/* {jobs.items?.length > 0 ? (
            jobs.items.map(job => (
              <JobListing
                key={job.id}
                positionName={job.title}
                positionDesc={job.job_category_name}
                positionLink={job.job_post_url}
                positionLocation={job.display_location}
                positionType={job.kind_pretty}
              />
            ))
          ) : (
            <Text
              variant="headline"
              sx={{
                color: 'muted',
                textAlign: 'center',
                mx: 'auto',
                gridColumn: '1 / -1'
              }}
            >
              No open roles at this time. Check back later!
            </Text>
          )} */}
          <Text
              variant="headline"
              sx={{
                color: 'muted',
                textAlign: 'center',
                mx: 'auto',
                gridColumn: '1 / -1'
              }}
            >
              {t('jobs.volunteerNotice')}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://airtable.com/app5eKIfSXPFULKX8/pag0z4PqwOVHdr0ak/form"
                style={{ color: 'inherit', textDecoration: 'underline' }}
              >
                {t('jobs.applyHere')}
              </a>. 
            </Text>
        </Grid>
      </Container>
    </Box>

    <Footer key="footer" />
  </>
)
}

export default Page

export async function getStaticProps() {
  const data = await fetch(
    'https://api.polymer.co/v1/hire/organizations/happyhackingspace/jobs'
  )
  const jobs = await data.json()
  return {
    props: {
      jobs
    },
    revalidate: 60
  }
}
