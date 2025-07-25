import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Link as A,
  Text
} from 'theme-ui'
import theme from '@hackclub/theme'
import Meta from '@hackclub/meta'
import Icon from '@hackclub/icons'
import Head from 'next/head'
import ForceTheme from '../components/force-theme'
import Nav from '../components/nav'
import Footer from '../components/footer'
import { startCase } from 'lodash'


export const Logo = ({ name }) => {
 const isWhiteLogo = name.includes('white') || name.includes('wo')
 
 return (
   <Card variant="sunken" sx={{ 
     p: [2, 2], 
   bg: '#E0E6ED'
   }}>
     <Image
       src={`/branding/${name}.avif`}
       sx={{ width: '100%', height: 80, mb: 1, objectFit: 'contain' }}
       alt={startCase(name)}
     />
     <Text
       as="div"
       variant="subheadline"
       sx={{ fontSize: [1, 2], mt: 1, mb: 2 }}
     >
       {startCase(name)
         .replace('Hhs', 'HHS')
         .replace('Wo', 'W/O')
         .replace('Logo', '')}
     </Text>
     <Grid
       columns="repeat(3, 1fr)"
       gap={2}
       sx={{
         alignItems: 'center',
         a: {
           bg: 'elevated',
           color: 'cyan',
           boxShadow: 'none',
           py: 1,
           fontSize: 1,
           ':hover,:focus': { bg: 'cyan', color: 'white' }
         }
       }}
     >
       <Button as="a" href={`/branding/${name}.avif`}>
         AVIF
       </Button>
       <Button as="a" href={`/branding/${name}.png`}>
         PNG
       </Button>
       <Button as="a" href={`/branding/${name}.pdf`}>
         PDF
       </Button>
     </Grid>
     <Input
       as="textarea"
       rows={2}
       value={`/branding/${name}.avif`}
       sx={{ mt: 2, py: 1, fontSize: 1 }}
       disabled
     />
   </Card>
 )
}

const HTML = ({ file, html }) => {
  
  return (
    <tr>
      <td style={{ backgroundColor: '#E0E6ED', padding: '8px' }}>
        <img
          src={`/branding/${file}.avif`}
          alt={startCase(file)}
        />
      </td>
      <td>
        <Text as="pre" variant="styles.pre">
          {html}
        </Text>
      </td>
    </tr>
  )
}


const ColorSwatch = ({ bg }) => (
  <Card
    sx={{
      bg,
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Text variant="subheadline" sx={{ my: 0 }}>
      {bg}
    </Text>
    <Text>{theme.colors[bg]}</Text>
  </Card>
)

const Page = ({ css, logoNames, bannerFiles }) => (
  <>
    <Meta
      as={Head}
      title="Branding"
      description="Download Hack Club HQ’s logos and preview our brand fonts & colors."
      image="https://workshop-cards.hackclub.com/Branding.png?theme=dark&fontSize=350px&brand=HQ"
    />
    <ForceTheme theme="light" />
    <Nav color="text" />
    <Box
      as="header"
      sx={{
        bg: 'sheet',
        color: 'text',
        pt: [5, null, null, null, 6],
        pb: [3, 4, 5, null, 6],
        textAlign: 'center'
      }}
    >
      <Container variant="copy">
        <Heading as="h1" variant="title" sx={{ color: 'primary', mt: [2, 4] }}>
          Happy Hacking Space Brand
        </Heading>
        <Heading as="h2" variant="subtitle" sx={{ mt: 3, color: 'text' }}>
          Download HQ’s logos and preview our brand colors & font.
        </Heading>
      </Container>
    </Box>
    <Container
      sx={{
        py: [3, 4],
        maxWidth: [null, 'copyUltra'],
        h2: { variant: 'text.headline' }
      }}
    >
      <Heading variant="headline">Logos</Heading>
      <Grid columns={[2, 3, 4]} gap={3}>
  {logoNames.map(key => (
    <Logo name={key} key={key} />
  ))}
</Grid>
      <Button
        as="a"
        href="https://assets.hackclub.com/2020_branding.zip"
        variant="outline"
        mt={3}
        mb={[4, 5]}
      >
        Download all →
      </Button>

    

      <Heading id="banners" variant="headline">
        HTML banners
      </Heading>
      <Box
        as="table"
        sx={{
          display: 'block',
          mb: [4, 5],
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          maxWidth: '100%',
          'td:first-of-type': { pr: 3 },
          img: { maxWidth: 128 * 1.5 },
          pre: { whiteSpace: 'initial' }
        }}
      >
        <Box as="thead" sx={{ display: 'none' }}>
          <tr>
            <th>Preview</th>
            <th>HTML code</th>
          </tr>
        </Box>
       <tbody>
    {bannerFiles.map(file => (
      <HTML
        key={file}
        file={file}
        html={`<a href="https://hackclub.com/"><img style="position: absolute; top: 0; left: 10px; border: 0; width: 256px; z-index: 999;" src="/branding/${file}.avif" alt="Hack Club"/></a>`}
      />
    ))}
  </tbody>
      </Box>
      {/* <Button
        as="a"
        href="https://hackclub.com/banner"
        variant="outline"
        mt={3}
        mb={[4, 5]}
      >
        React component →
      </Button> */}
      <Heading variant="headline">Colors</Heading>
      <Grid columns={[2, 4]} gap={3} mb={[4, 5]}>
        {[
          'red',
          'orange',
          'yellow',
          'green',
          'cyan',
          'blue',
          'purple',
          'muted'
        ].map(key => (
          <ColorSwatch key={key} bg={key} />
        ))}
      </Grid>
      {/* <Heading variant="headline">Fonts</Heading>
      <Text variant="title">Phantom Sans</Text>
      <Text variant="subtitle" sx={{ mb: 3, ml: 2 }}>
        is our brand font.
      </Text>
      <Box as="details" mb={[4, 5]}>
        <Text as="summary" sx={{ fontSize: 2, cursor: 'default' }}>
          Webfont CSS (for HQ sites only)
        </Text>
        <Text as="pre" variant="styles.pre">
          {css}
        </Text>
      </Box> */}
      {/* <Heading variant="headline">Icons</Heading>
      <Text as="p" variant="subtitle" sx={{ mb: 3 }}>
        We have a custom iconset, published as{' '}
        <A href="https://github.com/hackclub/icons">@hackclub/icons</A>.
      </Text>
      <Flex sx={{ flexWrap: 'wrap', svg: { fill: 'muted', mr: 3, mb: 3 } }}>
        {[
          'clubs',
          'bank-circle',
          'event-code',
          'home',
          'transactions',
          'bolt',
          'photo',
          'emoji'
        ].map(k => (
          <Icon glyph={k} key={k} size={64} />
        ))}
      </Flex>
      <Button
        as="a"
        href="https://icons.hackclub.com"
        sx={{ mt: 3, mb: [4, 5] }}
        variant="outline"
      >
        Explore Hack Club Icons →
      </Button>
      <Heading variant="headline">UI components</Heading>
      <Text as="p" variant="subtitle" sx={{ mb: 3 }}>
        Want to make a Hack Club themed site? Use our pre-made CSS and UI
        components to hackify your site.
      </Text>
      <Button
        as="a"
        href="https://theme.hackclub.com/"
        sx={{ mr: 3, mb: 3 }}
        variant="outline"
      >
        Explore Hack Club Theme →
      </Button>
      <Button
        as="a"
        href="https://github.com/hackclub/theme-starter"
        mb={3}
        mr={3}
        variant="outline"
      >
        Theme Starter on GitHub →
      </Button>
      <Button
        as="a"
        href="https://github.com/hackclub/css"
        sx={{ mb: 3 }}
        variant="outline"
      >
        CSS Theme on GitHub →
      </Button> */}
    </Container>
    <Footer />
  </>
)

export default Page

export const getStaticProps = () => {
  const fs = require('fs')
  const path = require('path')
  const css = fs.readFileSync(
    './node_modules/@hackclub/theme/fonts/reg-ital-bold.css',
    'utf8'
  )

  const brandingPath = path.join(process.cwd(), 'public', 'branding')
  const files = fs.readdirSync(brandingPath)
  
  const logoNames = files
    .filter(file => file.endsWith('.avif'))
    .map(file => file.replace('.avif', ''))
    
  const bannerFiles = files
    .filter(file => file.endsWith('.avif'))
    .map(file => file.replace('.avif', ''))
    .slice(0, 4)

  return { 
    props: { 
      css,
      logoNames,
      bannerFiles
    } 
  }
}
