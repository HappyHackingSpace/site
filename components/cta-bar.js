import { useState, useEffect, useRef, useCallback } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { Box } from 'theme-ui'
import { useTranslation } from '../lib/i18n'
import FireflySVG from '../public/firefly.js'

const cardFadeIn = keyframes`
  from { opacity: 0; transform: scale(0.92) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`

const Root = styled(Box, {
  shouldForwardProp: prop => !['isAutoFlying'].includes(prop)
})`
  position: fixed;
  z-index: 999;
  user-select: none;
  touch-action: none;
  transition: ${props =>
    props.isAutoFlying ? 'left 2.4s ease-in-out, top 2.4s ease-in-out' : 'none'};
`

const FabButton = styled('button', {
  shouldForwardProp: prop => !['minimized', 'minimizedSide'].includes(prop)
})`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  cursor: grab;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: ${props =>
      props.minimized
        ? props.minimizedSide === 'right'
          ? 'translateX(-8px) scale(1.05)'
          : 'translateX(8px) scale(1.05)'
        : 'scale(1.08)'};
  }

  &:active {
    cursor: grabbing;
    transform: scale(0.96);
  }

  svg {
    width: 52px;
    height: 52px;
    pointer-events: none;
    transition: transform 0.25s ease;
    transform: ${props =>
      props.minimized
        ? props.minimizedSide === 'right'
          ? 'translateX(-20px)'
          : 'translateX(20px)'
        : 'none'};
  }
`

const CloseButton = styled('button', {
  shouldForwardProp: prop => prop !== 'visible'
})`
  position: absolute;
  top: -10px;
  left: -10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.visible ? 0.8 : 0)};
  transition: opacity 0.2s, transform 0.2s;
  z-index: 2;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
    background: rgba(0, 0, 0, 0.7);
  }
`

const Card = styled(Box)`
  position: absolute;
  width: 280px;
  background: #171c2b;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  color: #d0d6e4;
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.02);
  animation: ${cardFadeIn} 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  pointer-events: auto;
`

const CardHeader = styled(Box)`
  padding: 22px 22px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
`

const CardTitle = styled('h3')`
  margin: 0 0 4px 0;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.2px;
`

const CardSubtitle = styled('p')`
  margin: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.4;
`

const OptionList = styled(Box)`
  padding: 6px 0;
`

const Option = styled('a')`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 22px;
  border: none;
  background: transparent;
  color: #d0d6e4;
  cursor: pointer;
  text-align: left;
  text-decoration: none;
  transition: background 0.15s ease;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background: rgba(255, 255, 255, 0.035);
  }

  .icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    flex-shrink: 0;
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .title {
    font-size: 14px;
    font-weight: 600;
    color: #eceff5;
  }

  .desc {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.35);
  }
`

const Divider = styled(Box)`
  height: 1px;
  background: rgba(255, 255, 255, 0.04);
  margin: 0 22px;
`

const WhatsAppButton = styled('a')`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 14px 22px 20px;
  padding: 11px;
  border-radius: 12px;
  background: rgba(37, 211, 102, 0.08);
  border: 1px solid rgba(37, 211, 102, 0.12);
  color: #3ddc7a;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: rgba(37, 211, 102, 0.15);
    border-color: rgba(37, 211, 102, 0.2);
    transform: translateY(-1px);
  }
`

const CardArrow = styled(Box)`
  position: absolute;
  width: 12px;
  height: 12px;
  background: #171c2b;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transform: rotate(45deg);
  z-index: -1;
`

export default function CtaBar() {
  const { t } = useTranslation()
  const [isCardOpen, setIsCardOpen] = useState(false)
  const [isRootHovered, setIsRootHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isFlapping, setIsFlapping] = useState(false)
  const [isAutoFlying, setIsAutoFlying] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [minimizedSide, setMinimizedSide] = useState('right')
  const [pos, setPos] = useState({ x: null, y: null })
  const [cardDir, setCardDir] = useState('top')
  const rootRef = useRef(null)
  const dragState = useRef({
    startX: 0,
    startY: 0,
    startPosX: 0,
    startPosY: 0,
    hasMoved: false
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hidden = localStorage.getItem('hhs-cta-hidden')
      if (hidden === '1') {
        setIsMinimized(true)
        setMinimizedSide('right')
        setPos({ x: window.innerWidth - 20, y: window.innerHeight - 84 })
      }
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setIsCardOpen(false)
      }
    }
    if (isCardOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('touchstart', handleClickOutside)
      }
    }
  }, [isCardOpen])

  // Auto-fly: ara sıra kendi kendine kanat çırparak yer değiştir
  useEffect(() => {
    if (isMinimized || isDragging || isCardOpen) return

    const fly = () => {
      if (isDragging || isCardOpen || isMinimized || !rootRef.current) return

      const margin = 80
      const maxX = window.innerWidth - 64 - margin
      const maxY = window.innerHeight - 64 - margin
      const newX = margin + Math.random() * (maxX - margin)
      const newY = margin + Math.random() * (maxY - margin)

      setIsFlapping(true)
      setIsAutoFlying(true)
      setPos({ x: newX, y: newY })

      setTimeout(() => {
        setIsFlapping(false)
        setIsAutoFlying(false)
      }, 2600)
    }

    const interval = setInterval(() => {
      fly()
    }, 48000)

    return () => clearInterval(interval)
  }, [isMinimized, isDragging, isCardOpen])

  const updateCardDirection = useCallback(() => {
    if (rootRef.current) {
      const rect = rootRef.current.getBoundingClientRect()
      const spaceAbove = rect.top
      const spaceBelow = window.innerHeight - rect.bottom
      if (spaceAbove < 340 && spaceBelow > spaceAbove) {
        setCardDir('bottom')
      } else {
        setCardDir('top')
      }
    }
  }, [])

  const handlePointerDown = useCallback(
    (e) => {
      e.preventDefault()
      const clientX = e.clientX ?? e.touches?.[0]?.clientX
      const clientY = e.clientY ?? e.touches?.[0]?.clientY
      if (clientX == null || clientY == null) return

      // Minimize durumundan çık
      if (isMinimized && rootRef.current) {
        const rect = rootRef.current.getBoundingClientRect()
        setIsMinimized(false)
        setPos({ x: rect.left, y: rect.top })
        // localStorage'daki minimize tercihini temizle
        if (typeof window !== 'undefined') {
          localStorage.removeItem('hhs-cta-hidden')
        }
      }

      // İlk sürüklemede fixed pozisyonu left/top'a çevir
      if (pos.x === null && rootRef.current) {
        const rect = rootRef.current.getBoundingClientRect()
        setPos({ x: rect.left, y: rect.top })
        dragState.current.startPosX = rect.left
        dragState.current.startPosY = rect.top
      } else {
        dragState.current.startPosX = pos.x
        dragState.current.startPosY = pos.y
      }

      dragState.current.startX = clientX
      dragState.current.startY = clientY
      dragState.current.hasMoved = false
      setIsDragging(true)
      setIsFlapping(true)
      setIsAutoFlying(false)
      setIsCardOpen(false)
    },
    [pos, isMinimized]
  )

  useEffect(() => {
    if (!isDragging) return

    const handleMove = (e) => {
      const clientX = e.clientX ?? e.touches?.[0]?.clientX
      const clientY = e.clientY ?? e.touches?.[0]?.clientY
      if (clientX == null || clientY == null) return

      const dx = clientX - dragState.current.startX
      const dy = clientY - dragState.current.startY

      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        dragState.current.hasMoved = true
      }

      let newX = dragState.current.startPosX + dx
      let newY = dragState.current.startPosY + dy

      newX = Math.max(8, Math.min(window.innerWidth - 72, newX))
      newY = Math.max(8, Math.min(window.innerHeight - 72, newY))

      setPos({ x: newX, y: newY })
    }

    const handleUp = () => {
      setIsDragging(false)
      setIsFlapping(false)
    }

    window.addEventListener('mousemove', handleMove, { passive: false })
    window.addEventListener('mouseup', handleUp)
    window.addEventListener('touchmove', handleMove, { passive: false })
    window.addEventListener('touchend', handleUp)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchend', handleUp)
    }
  }, [isDragging])

  const handleFabClick = useCallback(() => {
    if (isMinimized) {
      setIsMinimized(false)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('hhs-cta-hidden')
      }
      return
    }
    if (!dragState.current.hasMoved) {
      updateCardDirection()
      setIsCardOpen(prev => !prev)
    }
  }, [isMinimized, updateCardDirection])

  const handleClose = () => {
    setIsCardOpen(false)
    if (!rootRef.current) return

    const rect = rootRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2

    setIsMinimized(true)

    if (centerX > window.innerWidth / 2) {
      setMinimizedSide('right')
      setPos({ x: window.innerWidth - 20, y: rect.top })
    } else {
      setMinimizedSide('left')
      setPos({ x: -44, y: rect.top })
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('hhs-cta-hidden', '1')
    }
  }

  const whatsappLink = `https://wa.me/905347001757?text=${encodeURIComponent(
    t('cta.whatsappMessage')
  )}`

  const coffeeLink = `https://wa.me/905347001757?text=${encodeURIComponent(
    t('cta.coffeeMessage')
  )}`

  const customAmountLink = `https://wa.me/905347001757?text=${encodeURIComponent(
    t('cta.customAmountMessage')
  )}`

  const fabStyle =
    pos.x !== null
      ? { left: pos.x, top: pos.y, right: 'auto', bottom: 'auto' }
      : { right: 20, bottom: 20 }

  const cardStyle =
    cardDir === 'top'
      ? { bottom: 'calc(100% + 14px)', right: 0 }
      : { top: 'calc(100% + 14px)', right: 0 }

  const arrowStyle =
    cardDir === 'top'
      ? { bottom: -6, right: 26 }
      : { top: -6, right: 26 }

  return (
    <Root
      ref={rootRef}
      style={fabStyle}
      isAutoFlying={isAutoFlying}
      onMouseEnter={() => setIsRootHovered(true)}
      onMouseLeave={() => setIsRootHovered(false)}
    >
      <CloseButton
        onClick={handleClose}
        aria-label="Minimize"
        visible={isRootHovered || isCardOpen}
      >
        ×
      </CloseButton>

      {isCardOpen && !isMinimized && (
        <Card style={cardStyle}>
          <CardArrow style={arrowStyle} />
          <CardHeader>
            <CardTitle>Happy Hacking Space</CardTitle>
            <CardSubtitle>Nasıl destek olmak istersin?</CardSubtitle>
          </CardHeader>

          <OptionList>
            <Option
              href={coffeeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsCardOpen(false)}
            >
              <span
                className="icon"
                style={{ background: 'rgba(180, 130, 70, 0.12)' }}
              >
                ☕
              </span>
              <span className="text">
                <span className="title">Bir kahve 50₺</span>
                <span className="desc">Küçük destek</span>
              </span>
            </Option>

            <Option href="/bagis" onClick={() => setIsCardOpen(false)}>
              <span
                className="icon"
                style={{ background: 'rgba(100, 120, 200, 0.12)' }}
              >
                📋
              </span>
              <span className="text">
                <span className="title">Tüm bağış listesini gör</span>
                <span className="desc">İhtiyaçları incele</span>
              </span>
            </Option>

            <Option
              href={customAmountLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsCardOpen(false)}
            >
              <span
                className="icon"
                style={{ background: 'rgba(180, 100, 180, 0.12)' }}
              >
                💜
              </span>
              <span className="text">
                <span className="title">Özel miktar</span>
                <span className="desc">İstediğin kadar</span>
              </span>
            </Option>
          </OptionList>

          <Divider />

          <WhatsAppButton
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp'tan ulaşın
          </WhatsAppButton>
        </Card>
      )}

      <FabButton
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        onClick={handleFabClick}
        title={t('cta.donate')}
        aria-label={t('cta.donate')}
        minimized={isMinimized}
        minimizedSide={minimizedSide}
      >
        <FireflySVG isFlapping={isFlapping} />
      </FabButton>
    </Root>
  )
}
