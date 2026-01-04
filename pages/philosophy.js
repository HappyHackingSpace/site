import Meta from '@happyhackingspace/meta'
import Head from 'next/head'
import { Box, Heading, Container, Text, Button, Link, Flex } from 'theme-ui'
import Nav from '../components/nav'
import styled from '@emotion/styled'
import Footer from '../components/footer'
import { useEffect, useMemo, useState } from 'react'

const Header = styled(Box)`
  color: white;
  height: 18rem; 
  background-image: linear-gradient(
    32deg,
    rgb(207, 45, 228) 0%,
    rgb(228, 45, 66) 64%,
    rgb(206, 41, 60) 100%
  );
  clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0% 90%);
  > div {
    position: relative;
  }
  @media screen and (min-width: 48em) {
    height: 36rem;  /* Desktop için büyük */
  }
`

const Seal = styled(Box)`
  border-radius: 9999px;
  background-color: white;
  color: black;
  mix-blend-mode: screen;
  text-align: center;
  width: 17rem;
  height: 16rem;
  position: absolute;
  margin-top: -1rem;
  left: 0;  
  transform: rotate(4deg);
  @media screen and (min-width: 32em) {
    transform: rotate(3deg);
    margin-top: -3rem;
  }
`

const Ultraline = styled(Heading)`
  line-height: 1.125 !important;
  text-transform: uppercase;
  color: 'white';
  caps: true;
  &:nth-of-type(2) {
    padding-left: 1.5rem;
    @media screen and (min-width: 48em) {
      padding-left: 6rem;
    }
  }
  &:nth-of-type(3) {
    text-align: center;
  }
  &:nth-of-type(4) {
    text-align: right;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      clip-path: polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%);
      background-color: rgba(252, 252, 252, 0.625);
      mix-blend-mode: overlay;
      right: -0.5rem;
      width: 9.5rem;
      height: 2.5rem;
      @media screen and (min-width: 32em) {
        width: 20rem;
        height: 5.5rem;
      }
    }
  }
`

const Row = styled(Container)`
  px: 3;
  py: [3, 4];
  color: 'black';
  display: grid;
  text-align: left;
  h2 {
    line-height: 1;
    margin-bottom: 18px;
  }
  @media screen and (min-width: 48em) {
    grid-gap: 24px;
    grid-template-columns: 2fr 3fr;
  }
`

Row.defaultProps = { sx: { px: 3, py: [3, 4], color: 'black' } }

const Super = styled(Text)`
  background-color: rgb(228, 115, 45);
  clip-path: polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%);
  color: rgb(255, 255, 255);
  display: inline-block;
  padding-bottom: 12px;
  padding-left: 18px;
  padding-right: 18px;
`

export default function Philosophy() {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('hhs_lang')
      if (saved === 'tr' || saved === 'en') setLang(saved)
    } catch (e) {}
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem('hhs_lang', lang)
    } catch (e) {}
  }, [lang])

  const copy = useMemo(
    () => ({
      en: {
        metaTitle: 'Philosophy',
        metaDescription:
          'Read about Happy Hacking Space, a network of hackers. We want to make building apps and websites accessible to everyone.',
        hero: ["We're", 'at our best', "when we're", 'hacking.'],
        sealTop: 'Happy Hacking Space',
        sealBottom: 'Philosophy',
        section1TitlePrefix: 'Coding is a ',
        section1Super: 'superpower.',
        section1Body:
          'Learning to code is uniquely like gaining a superpower: it converts you from a consumer to a creator. Suddenly, computers become a tool for creating.',
        section2Title: 'Make, from anywhere.',
        section2Body:
          'There’s never been a better time for making: anywhere in the world, anyone with a laptop and an internet connection can learn to make an app. Building things has never been so globally democratized.',
        section3Title: 'Hack, hack, hack.',
        section3BodyStrong:
          'The goal of Happy Hacking Space is to help you become a hacker.',
        section3BodyRest:
          ' We want a space at every place where people are making interesting things with code, every week. Schools or institutions don’t provide that, so we’re creating it in every place to make building things accessible to everyone.',
        section4Title: 'Start building.',
        section4Body:
          'Most coding classes teach you programming concepts instead of how to write real code—it’s like trying to learn carpentry without any wood. So at Happy Hacking Space, you learn to code entirely through building things. You start with no experience and build and ship a project every meeting.',
        section5Title: 'Learn as you build.',
        section5BodyBeforeLink:
          'Just as the best carpenters didn’t learn in the classroom, neither did the best programmers. Through our ',
        section5LinkText: 'workshops',
        section5BodyAfterLink:
          ', you’ll be walked through building projects. Starting out, you won’t understand how the code works, but you’ll build understanding as you go. You’ll get stuck along the way, but we’re here to help.',
        section6Title: 'Be part of a community.',
        section6Body:
          'Happy Hacking Space gives you a community of thousands of other makers to talk to. We’re artists, writers, engineers, tinkerers, campers, filmmakers, volunteers. We make things. We help one another. We have fun. Join us.',
        ctaTitle: 'Join the movement!',
        ctaButton: 'Join our community',
        langLabel: 'Language',
        tr: 'TR',
        en: 'EN'
      },
      tr: {
        metaTitle: 'Felsefe',
        metaDescription:
          'Happy Hacking Space’in ne olduğunu ve neyi amaçladığını oku. Uygulama ve web sitesi üretmeyi herkes için erişilebilir kılmak istiyoruz.',
        hero: ['Biz', 'en iyi halimizde', 'biz olduğumuzda', 'hack’leriz.'],
        sealTop: 'Happy Hacking Space',
        sealBottom: 'Felsefe',
        section1TitlePrefix: 'Kodlama bir ',
        section1Super: 'süper güç.',
        section1Body:
          'Kod yazmayı öğrenmek, adeta bir süper güç kazanmak gibidir: seni tüketiciden yaratıcıya dönüştürür. Birdenbire bilgisayarlar, üretmek için bir araca dönüşür.',
        section2Title: 'Her yerden üret.',
        section2Body:
          'Üretmek için hiç bu kadar iyi bir zaman olmamıştı: dünyanın neresinde olursan ol, bir dizüstü bilgisayar ve internet bağlantısı olan herkes bir uygulama yapmayı öğrenebilir. Bir şey inşa etmek artık küresel ölçekte daha erişilebilir.',
        section3Title: 'Hack, hack, hack.',
        section3BodyStrong:
          'Happy Hacking Space’in hedefi, senin bir hacker olmanı sağlamak.',
        section3BodyRest:
          ' Her hafta, kodla ilginç şeyler üreten insanların buluştuğu bir alan istiyoruz. Okullar ya da kurumlar bunu çoğu zaman sağlamıyor; biz de her yerde bunu kurmaya çalışıyoruz—üretmeyi herkes için erişilebilir kılmak için.',
        section4Title: 'Üretmeye başla.',
        section4Body:
          'Çoğu kodlama dersi gerçek kod yazmaktan çok kavram öğretir—tahta olmadan marangozluk öğrenmeye benzer. Happy Hacking Space’te ise kod yazmayı tamamen bir şeyler inşa ederek öğrenirsin. Hiç deneyimin olmadan başlarsın ve her buluşmada bir proje yapıp yayınlarsın.',
        section5Title: 'Yaparken öğren.',
        section5BodyBeforeLink:
          'En iyi marangozlar sınıfta öğrenmediği gibi, en iyi programcılar da öyle. ',
        section5LinkText: 'atölyelerimiz',
        section5BodyAfterLink:
          ' ile projeler yaparken adım adım yönlendirilirsin. Başta kodun nasıl çalıştığını tam anlamayabilirsin ama ilerledikçe oturur. Takıldığın yerde de biz buradayız.',
        section6Title: 'Bir topluluğun parçası ol.',
        section6Body:
          'Happy Hacking Space, konuşabileceğin binlerce üreticiden oluşan bir topluluk sunar. Sanatçılar, yazarlar, mühendisler, tamirciler, kampçılar, filmciler, gönüllüler… Üretiriz. Birbirimize yardım ederiz. Eğleniriz. Katıl.',
        ctaTitle: 'Harekete katıl!',
        ctaButton: 'Topluluğa katıl',
        langLabel: 'Dil',
        tr: 'TR',
        en: 'EN'
      }
    }),
    []
  )

  const t = (key) => copy[lang]?.[key] ?? copy.en[key] ?? key

  return (
    <Box sx={{ bg: 'white', color: 'black', minHeight: '100vh' }}>
      <Nav />
      <Meta
        as={Head}
        title={t('metaTitle')}
        description={t('metaDescription')}
        image="https://cloud-cz9a6kt0a-hack-club-bot.vercel.app/0social-photo_2.jpg"
      />

      <Box>
        <Header>
          <Container
            width={1}
            sx={{ maxWidth: '56rem!important', py: '72px', px: 3 }}
            px={3}
            align="left"
          >
            {/* Language Toggle */}
            <Flex sx={{ justifyContent: 'flex-end', mb: 3 }}>
              <Flex
                sx={{
                  alignItems: 'center',
                  gap: 2,
                  bg: 'rgba(255,255,255,0.12)',
                  borderRadius: 9999,
                  px: 2,
                  py: 1
                }}
              >
                <Text sx={{ color: 'white', fontSize: 1, opacity: 0.9 }}>
                  {t('langLabel')}:
                </Text>
                <Button
                  onClick={() => setLang('tr')}
                  sx={{
                    bg: lang === 'tr' ? 'white' : 'transparent',
                    color: lang === 'tr' ? 'black' : 'white',
                    borderRadius: 9999,
                    px: 2,
                    py: 1,
                    fontSize: 1,
                    cursor: 'pointer'
                  }}
                >
                  {t('tr')}
                </Button>
                <Button
                  onClick={() => setLang('en')}
                  sx={{
                    bg: lang === 'en' ? 'white' : 'transparent',
                    color: lang === 'en' ? 'black' : 'white',
                    borderRadius: 9999,
                    px: 2,
                    py: 1,
                    fontSize: 1,
                    cursor: 'pointer'
                  }}
                >
                  {t('en')}
                </Button>
              </Flex>
            </Flex>

            <Ultraline sx={{ fontSize: [44, 54, 72, 96] }}>{t('hero')[0]}</Ultraline>
            <Ultraline sx={{ fontSize: [44, 54, 72, 96] }}>{t('hero')[1]}</Ultraline>
            <Ultraline sx={{ fontSize: [44, 54, 72, 96] }}>{t('hero')[2]}</Ultraline>
            <Ultraline sx={{ fontSize: [44, 54, 72, 96] }}>{t('hero')[3]}</Ultraline>

            <Seal pt={[3, 4]} sx={{ display: ['none', 'none', 'none', 'block'] }}>
              <Heading
                fontSize={[1, 2]}
                sx={{
                  fontWeight: '400',
                  marginBlockStart: '0em',
                  fontSize: ['16px', '18px'],
                  textTransform: 'uppercase'
                }}
                caps
              >
                {t('sealTop')}
              </Heading>
              <Heading
                fontSize={[3, 4]}
                sx={{
                  fontWeight: '800',
                  marginBlockStart: '0em',
                  textTransform: 'uppercase'
                }}
              >
                {t('sealBottom')}
              </Heading>
            </Seal>
          </Container>
        </Header>

        <Row py={4} mt={[0, 4]}>
          <Heading as="h2" sx={{ fontSize: [36, 48] }} color="rgb(228, 45, 66);">
            {t('section1TitlePrefix')}
            <Super>{t('section1Super')}</Super>
          </Heading>
          <Box sx={{ fontSize: [3, 3] }}>{t('section1Body')}</Box>
        </Row>

        <Row>
          <Heading as="h2" sx={{ fontSize: [36, 48], py: 4 }} color="rgb(207, 45, 228);">
            {t('section2Title')}
          </Heading>
          <Box sx={{ fontSize: [3, 3], py: 4 }}>{t('section2Body')}</Box>
        </Row>

        <Row>
          <Heading as="h2" sx={{ fontSize: [36, 48], py: 4 }} color="rgb(115, 45, 228);">
            {t('section3Title')}
          </Heading>
          <Box sx={{ fontSize: [3, 3], py: 4 }}>
            <strong>{t('section3BodyStrong')}</strong>
            {t('section3BodyRest')}
          </Box>
        </Row>

        <Row>
          <Heading as="h2" sx={{ fontSize: [36, 48], py: 4 }} color="rgb(45, 66, 228)">
            {t('section4Title')}
          </Heading>
          <Box sx={{ fontSize: [3, 3], py: 4 }}>{t('section4Body')}</Box>
        </Row>

        <Row>
          <Heading as="h2" sx={{ fontSize: [36, 48], py: 4 }} color="rgb(41, 143, 206)">
            {t('section5Title')}
          </Heading>
          <Box sx={{ fontSize: [3, 3], py: 4 }}>
            {t('section5BodyBeforeLink')}
            <Link href="/workshops">{t('section5LinkText')}</Link>
            {t('section5BodyAfterLink')}
          </Box>
        </Row>

        <Row>
          <Heading as="h2" sx={{ fontSize: [36, 48], py: 4 }} color="rgb(36, 181, 165)">
            {t('section6Title')}
          </Heading>
          <Box sx={{ fontSize: [3, 3], py: 4 }}>{t('section6Body')}</Box>
        </Row>

        <Box
          sx={{
            backgroundImage: (t) => t.util.gx('orange', 'red'),
            margin: 'auto',
            width: '600px',
            maxWidth: '90%',
            mb: 4,
            borderRadius: 8,
            color: 'white',
            textAlign: 'center',
            p: 4,
            pt: 3
          }}
        >
          <Heading as="h1" sx={{ fontSize: 5, mb: 2 }}>
            {t('ctaTitle')}
          </Heading>

          <Button
            sx={{ bg: 'white', color: 'red' }}
            as="a"
            href="https://join.happyhacking.space"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('ctaButton')}
          </Button>
        </Box>
      </Box>

      <Footer light />
    </Box>
  )
}
