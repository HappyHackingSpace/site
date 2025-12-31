import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'
import { Box, Container, Flex, Link } from 'theme-ui'
import theme from '../lib/theme'
import Icon from './icon'
import Flag from './flag'
import ScrollLock from 'react-scrolllock'
import NextLink from 'next/link'
import DoorStatus from './door-status'

// Styled component for navigation links (preserves existing styles)
const NavLinkText = styled.span`
  display: block;
  color: ${props => props.isMobile ? theme.colors['slate'] : (props.scrolled ? '#374151' : props.color || 'white')};
  margin-right: ${theme.space[3]}px;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.isMobile ? theme.colors['black'] : (props.scrolled ? '#6b7280' : '#d1d5db')};
  }
`

const rgbaBgColor = (props, opacity) =>
  `rgba(
    ${props.bgColor[0]},
    ${props.bgColor[1]},
    ${props.bgColor[2]},
    ${opacity}
  )`

// const bg = (props) =>
//   props.dark
//     ? css`
//         -webkit-backdrop-filter: saturate(90%) blur(20px);
//         backdrop-filter: saturate(90%) blur(20px);
//       `
//     : css`
//         -webkit-backdrop-filter: saturate(180%) blur(20px);
//         backdrop-filter: saturate(180%) blur(20px);
//       `
const fixed = props =>
  (props.scrolled || props.toggled || props.fixed) &&
  css`
    background-color: ${rgbaBgColor(props, 0.96875)};
    border-bottom: 1px solid rgba(48, 48, 48, 0.125);
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
      background-color: ${props.transparent
        ? 'transparent'
        : rgbaBgColor(props, 0.75)};
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      backdrop-filter: saturate(180%) blur(20px);
      /* {bg}; to support dark mode later */
    }
  `

const Root = styled(Box, {
  shouldForwardProp: prop => !['bgColor', 'scrolled', 'toggled'].includes(prop)
})`
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1000;
  ${fixed};
  @media print {
    display: none;
  }
`

export const Content = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
`

const hoverColor = name =>
  ({
    white: 'smoke',
    smoke: 'muted',
    muted: 'slate',
    slate: 'black',
    black: 'slate',
    primary: 'error'
  })[name] || 'black'

const slide = keyframes({
  from: { transform: 'translateY(-25%)', opacity: 0 },
  to: { transform: 'translateY(0)', opacity: 1 }
})

const layout = props =>
  props.isMobile
    ? css`
        display: ${props.toggled ? 'flex' : 'none'};
        flex-direction: column;
        overflow-y: auto;
        text-align: left;
        height: 100vh;
        @media (prefers-reduced-motion: no-preference) {
          animation: ${slide} 0.25s ease-in;
        }
        a {
          color: ${theme.colors['slate']} !important;
          margin: 0 auto 0 1.5rem;
          height: 64px;
          font-weight: bold;
          font-size: ${theme.fontSizes[2]}px;
          width: calc(100vw - 1.5rem);
          &:not(:last-child) {
            border-bottom: 1px solid rgba(48, 48, 48, 0.125);
          }
          @media screen and (max-width: 22em) {
            max-width: 16rem;
          }
        }
      `
    : css`
        @media (min-width: 56em) {
          display: flex;
          justify-content: flex-end;
        }
        a {
          font-size: 18px;
          &:hover {
            color: ${theme.colors[hoverColor(props.color)]};
          }
        }
      `
const NavBar = styled(Box, {
  shouldForwardProp: prop => !['isMobile', 'toggled'].includes(prop)
})`
  display: none;
  ${layout};
  a {
    text-decoration: none;
    @media (min-width: 56em) {
      color: ${props => theme.colors[props.color] || props.color};
    }
  }
`

const doorShake = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
`

const DoorIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: 36px;
  margin-right: ${theme.space[3]}px;
  cursor: pointer;
  animation: ${doorShake} 2s ease-in-out infinite;
  align-self: center;
  /* Remove height/line-height for better vertical alignment */
  &:hover {
    animation: ${doorShake} 0.5s ease-in-out infinite;
  }
`

const ToggleContainer = styled(Flex)`
  align-items: center;
  justify-content: center;
  min-width: 64px;
  min-height: 44px;
  cursor: pointer;
  user-select: none;
  margin-left: auto;
  @media (min-width: 56em) {
    display: none;
  }
`

function Header({ unfixed, color, bgColor, dark, fixed, ...props }) {
  const [scrolled, setScrolled] = useState(false)
  const [toggled, setToggled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [showDoorStatus, setShowDoorStatus] = useState(false)

  const onScroll = () => {
    const newState = window.scrollY >= 16

    setScrolled(newState)
  }

  const handleToggleMenu = () => {
    setToggled(t => !t)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!unfixed) {
        window.addEventListener('scroll', onScroll)
      }
      const checkMobile = () => setMobile(window.innerWidth < 900)
      checkMobile()
      window.addEventListener('resize', checkMobile)
      const mobileQuery = window.matchMedia('(max-width: 48em)')
      mobileQuery.addEventListener('change', () => {
        setMobile(true)
        setToggled(false)
      })
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', () => {})
    }
  }, [unfixed])

  const baseColor = dark
    ? color || 'white'
    : color === 'white' && scrolled
      ? 'black'
      : color
  const toggleColor = dark
    ? color || 'snow'
    : toggled || (color === 'white' && scrolled)
      ? 'slate'
      : color;
  const burgerIconColor = mobile
    ? (props.forceBurgerWhite ? 'white' : (dark || (bgColor && bgColor[0] < 100) ? 'white' : 'slate'))
    : toggleColor;

  return (
    <Root
      {...props}
      fixed={fixed}
      scrolled={scrolled}
      toggled={toggled}
      dark={dark}
      bgColor={bgColor || (dark ? [32, 34, 36] : [255, 255, 255])}
      as="header"
    >
      <Content>
        <Flag />
        {/* Only show door icon in header if mobile */}
        {mobile && (
          <Box onClick={() => setShowDoorStatus(true)} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', ml: 2, mr: 2 }}>
            <DoorIcon>🚪</DoorIcon>
          </Box>
        )}
        <Navigation
          as="nav"
          aria-hidden={!!mobile}
          color={baseColor}
          dark={dark}
          scrolled={scrolled}
          showDoor={!mobile}
        />
        <ToggleContainer color={toggleColor} onClick={handleToggleMenu}>
          <Icon glyph={toggled ? 'view-close' : 'menu'} color={burgerIconColor} />
        </ToggleContainer>
      </Content>
      <Navigation
        as="nav"
        aria-hidden={!mobile}
        isMobile
        toggled={toggled}
        color={baseColor}
        dark={dark}
        scrolled={scrolled}
        showDoor={!mobile}
      />
      {toggled && <ScrollLock />}
      {showDoorStatus && <DoorStatus onClose={() => setShowDoorStatus(false)} />}
    </Root>
  )
}

Header.defaultProps = {
  color: 'white'
}

// Update Navigation to use showDoor prop
const Navigation = props => {
  const [showDoorStatus, setShowDoorStatus] = useState(false)
  return (
    <NavBar role="navigation" {...props}>
      {props.showDoor && (
        <Box onClick={() => setShowDoorStatus(true)} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', mr: 2 }}>
          <DoorIcon>🚪</DoorIcon>
        </Box>
      )}
      {showDoorStatus && <DoorStatus onClose={() => setShowDoorStatus(false)} />}
      <NextLink href="/philosophy">
        <NavLinkText color={props.color} scrolled={props.scrolled} isMobile={props.isMobile}>Philosophy</NavLinkText>
      </NextLink>
      <NextLink href="https://join.happyhacking.space" passHref legacyBehavior>
        <a target="_blank" rel="noopener noreferrer">
          <NavLinkText color={props.color} scrolled={props.scrolled} isMobile={props.isMobile}>Community</NavLinkText>
        </a>
      </NextLink>
      <NextLink href="/events">
        <NavLinkText color={props.color} scrolled={props.scrolled} isMobile={props.isMobile}>Events</NavLinkText>
      </NextLink>
      <NextLink href="/philanthropy">
        <NavLinkText color={props.color} scrolled={props.scrolled} isMobile={props.isMobile}>Donors</NavLinkText>
      </NextLink>
      {/* <NextLink href="/slack">
      <NavLinkText isMobile={props.isMobile}>Community</NavLinkText>
    </NextLink>
    <NextLink href="https://scrapbook.hackclub.com/">
      <NavLinkText isMobile={props.isMobile}>Scrapbook</NavLinkText>
    </NextLink>
    <NextLink href="https://toolbox.hackclub.com/">
      <NavLinkText isMobile={props.isMobile}>Toolbox</NavLinkText>
    </NextLink> */}
    </NavBar>
  )
}

export default Header
