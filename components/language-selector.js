import React, { useState, useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Box, Flex } from 'theme-ui'
import theme from '../lib/theme'
import { useTranslation, supportedLocales } from '../lib/i18n'
import Icon from './icon'

const SelectorContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-right: ${theme.space[3]}px;
  
  @media (max-width: 48em) {
    display: flex;
    width: 100%;
    height: 64px;
    margin: 0;
    padding: 0 1.5rem;
    border-bottom: 1px solid rgba(48, 48, 48, 0.125);
    align-items: center;
  }
`

const ButtonBase = css`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`

const SelectButton = styled.button`
  ${ButtonBase}
  color: ${props => {
    if (props.isMobile) return theme.colors['slate']
    if (props.scrolled) return '#374151'
    return props.color || 'white'
  }};
  
  @media (max-width: 48em) {
    color: ${theme.colors['slate']} !important;
    padding: 0;
    margin: 0 auto 0 0;
  }

  &:hover {
    color: ${props => {
      if (props.isMobile) return theme.colors['black']
      if (props.scrolled) return '#6b7280'
      return '#d1d5db'
    }};
  }

  &::after {
    content: '▼';
    font-size: 10px;
    margin-left: 4px;
  }
`

const DropdownMenu = styled(Box)`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  min-width: 140px;
  overflow: hidden;
  margin-top: 8px;

  @media (max-width: 48em) {
    position: static;
    background: #f9fafb;
    border: none;
    box-shadow: none;
    border-radius: 0;
    margin-top: 0;
    width: 100%;
  }
`

const LanguageOption = styled.button`
  ${ButtonBase}
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  color: ${theme.colors['slate']};
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  font-weight: 400;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f3f4f6;
    color: ${theme.colors['black']};
  }

  ${props =>
    props.active &&
    css`
      background-color: #eff6ff;
      color: ${theme.colors['black']};
      font-weight: 600;
    `}

  @media (max-width: 48em) {
    padding: 16px;
    border: none;
    border-bottom: 1px solid rgba(48, 48, 48, 0.125);
    background: white;

    &:hover {
      background-color: #f3f4f6;
    }

    &:last-child {
      border-bottom: none;
    }

    ${props =>
      props.active &&
      css`
        background-color: white;
        color: ${theme.colors['black']};
        font-weight: 600;
      `}
  }
`

const getLanguageName = lang => {
  const names = {
    en: 'English',
    tr: 'Türkçe',
    krd: 'Kurmanci'
  }
  return names[lang] || lang
}

export default function LanguageSelector({ color, scrolled, isMobile }) {
  const { locale, setLocale } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLanguageChange = lang => {
    setLocale(lang)
    setIsOpen(false)
  }

  return (
    <SelectorContainer ref={containerRef}>
      <SelectButton
        onClick={() => setIsOpen(!isOpen)}
        color={color}
        scrolled={scrolled}
        isMobile={isMobile}
      >
        <Icon glyph="globe" size={16} />
        {getLanguageName(locale)}
      </SelectButton>
      {isOpen && (
        <DropdownMenu>
          {supportedLocales.map(lang => (
            <LanguageOption
              key={lang}
              active={locale === lang}
              onClick={() => handleLanguageChange(lang)}
            >
              {getLanguageName(lang)}
            </LanguageOption>
          ))}
        </DropdownMenu>
      )}
    </SelectorContainer>
  )
}
