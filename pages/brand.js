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
  Text,
} from "theme-ui";
import theme from "@happyhackingspace/theme";
import Meta from "@happyhackingspace/meta";
import Head from "next/head";
import ForceTheme from "../components/force-theme";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { startCase } from "lodash";

export const Logo = ({ name }) => (
  <Card variant="sunken" sx={{ p: [3, 3] }}>
    <Image
      src={`https://assets.happyhacking.space/${name}.svg`}
      sx={{ width: "100%", height: 96, mb: 1 }}
      alt={startCase(name)}
    />
    <Text
      as="div"
      variant="subheadline"
      sx={{ fontSize: [2, 3], mt: 2, mb: 2 }}
    >
      {startCase(name).replace("Bw", " (B/W)")}
    </Text>
    <Grid
      columns="repeat(3, 1fr)"
      gap={3}
      sx={{
        alignItems: "center",
        a: {
          bg: "elevated",
          color: "cyan",
          boxShadow: "none",
          py: 1,
          ":hover,:focus": { bg: "cyan", color: "white" },
        },
      }}
    >
      <Button as="a" href={`https://assets.happyhacking.space/${name}.svg`}>
        SVG
      </Button>
      <Button as="a" href={`https://assets.happyhacking.space/${name}.png`}>
        PNG
      </Button>
      <Button as="a" href={`https://assets.happyhacking.space/${name}.pdf`}>
        PDF
      </Button>
    </Grid>
    <Input
      as="textarea"
      rows={2}
      value={`https://assets.happyhacking.space/${name}.svg`}
      sx={{ mt: 2, py: 1 }}
      disabled
    />
  </Card>
);

const HTML = ({ file, html }) => (
  <tr>
    <td style={{ width: "30%" }}>
      <img
        src={`https://assets.happyhacking.space/${file}.svg`}
        alt={startCase(file)}
        style={{ 
          maxWidth: "256px", 
          width: "100%", 
          height: "auto",
          display: "block"
        }}
      />
    </td>
    <td style={{ width: "70%" }}>
      <Text as="pre" variant="styles.pre">
        {html}
      </Text>
    </td>
  </tr>
);

const ColorSwatch = ({ bg }) => (
  <Card
    sx={{
      bg,
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text variant="subheadline" sx={{ my: 0 }}>
      {bg}
    </Text>
    <Text>{theme.colors[bg]}</Text>
  </Card>
);

const Page = () => (
  <>
    <Meta
      as={Head}
      title="Branding"
      description="Download Happy Hacking Space logos and preview our brand colors."
    />
    <Head>
      <style>{`
        header nav a span {
          color: black !important;
        }
        header nav a:hover span {
          color: ${theme.colors.secondary} !important;
        }
      `}</style>
    </Head>
    <ForceTheme theme="light" />
    <Nav color="text" />
    <Box
      as="header"
      sx={{
        bg: "sheet",
        color: "text",
        pt: [5, null, null, null, 6],
        pb: [3, 4, 5, null, 6],
        textAlign: "center",
      }}
    >
      <Container variant="copy">
        <Heading as="h1" variant="title" sx={{ color: "primary", mt: [2, 4] }}>
        Happy Hacking Space Brand
        </Heading>
        <Heading as="h2" variant="subtitle" sx={{ mt: 3, color: "text" }}>
          Download our logos and preview our brand colors.
        </Heading>
      </Container>
    </Box>
    <Container
      sx={{
        py: [3, 4],
        maxWidth: [null, "copyUltra"],
        h2: { variant: "text.headline" },
      }}
    >
      <Heading variant="headline">Logos</Heading>
      <Grid columns={[null, 2, 3]} gap={3}>
        {[
          "flag-standalone",
          "flag-standalone-bw",
        
        ].map((key) => (
          <Logo name={key} key={key} />
        ))}
      </Grid>
      <Button
        as="a"
        href="/downloads/hhs-branding.zip"
        variant="outline"
        mt={3}
        mb={[4, 5]}
        download
      >
        Download all →
      </Button>

      <Heading id="banners" variant="headline">
        HTML banners
      </Heading>
      <Box
        as="table"
        sx={{
          width: "100%",
          overflowX: "auto",

          "td:first-of-type": { pr: 3},
          "td:first-of-type img": { maxWidth: "256px !important" },
          img: { maxWidth: 128 * 1.5 },
          pre: { whiteSpace: "initial" },
        }}
      >
        <Box as="thead">
          <tr>
            <th>Preview</th>
            <th>HTML code</th>
          </tr>
        </Box>
        <tbody>
          <HTML
            file="flag-standalone-bw"
            html={`<a href="https://happyhacking.space/"><img style="position: absolute; top: 0; left: 10px; border: 0; width: 256px; z-index: 999;" src="https://assets.happyhacking.space/flag-standalone-bw.svg" alt="Happy Hacking Space"/></a>`}
          />
          <HTML
            file={"flag-standalone"}
            html={`<a href="https://happyhacking.space/"><img style="position: absolute; top: 0; left: 10px; border: 0; width: 256px; z-index: 999;" src="https://assets.happyhacking.space/flag-standalone.svg" alt="Happy Hacking Space"/></a>`}
          />
        </tbody>
      </Box>
      <Button
        as="a"
        href="/banner"
        variant="outline"
        mt={3}
        mb={[4, 5]}
      >
        React component →
      </Button>
      <Heading variant="headline">Colors</Heading>
      <Grid columns={[2, 4]} gap={3} mb={[4, 5]}>
        {[
          "red",
          "orange",
          "yellow",
          "green",
          "cyan",
          "blue",
          "purple",
          "muted",
        ].map((key) => (
          <ColorSwatch key={key} bg={key} />
        ))}
      </Grid>
      <Heading variant="headline">UI components</Heading>
      <Text as="p" variant="subtitle" sx={{ mb: 3 }}>
        Want to make a Happy Hacking Space themed site? Use our pre-made CSS and UI
        components to hackify your site.
      </Text>
      <Button
        as="a"
        target="_blank"
        rel="noopener noreferrer"
        href="https://theme.happyhacking.space/"
        sx={{ mr: 3, mb: 3 }}
        variant="outline"
      >
        Explore Happy Hacking Space Theme →
      </Button>
    </Container>
    <Footer />
  </>
);

export default Page;
