import { useState, useEffect, useRef, useCallback } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { Box } from 'theme-ui'
import { useTranslation } from '../lib/i18n'
import FireflySVG from '../public/firefly.js'

const dialItemIn = keyframes`
  from { opacity: 0; transform: translate(0, 0) scale(0.4); }
  to { opacity: 1; transform: translate(var(--x), var(--y)) scale(1); }
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
  position: relative;
  z-index: 2;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: ${props =>
      props.minimized
        ? props.minimizedSide === 'right'
          ? 'translateX(-8px) scale(1.05)'
          : 'translateX(8px) scale(1.05)'
        : 'scale(1.1)'};
  }

  &:active {
    cursor: grabbing;
    transform: scale(0.95);
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

const SpeedDialItem = styled('a', {
  shouldForwardProp: prop =>
    !['isOpen', 'itemX', 'itemY', 'delayIndex'].includes(prop)
})`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  z-index: 1;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  transform: ${props =>
    props.isOpen
      ? `translate(calc(-50% + ${props.itemX}px), calc(-50% + ${props.itemY}px)) scale(1)`
      : 'translate(-50%, -50%) scale(0.4)'};
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => (props.isOpen ? props.delayIndex * 0.06 : 0)}s;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);

  &:hover {
    z-index: 25;
    transform: ${props =>
      `translate(calc(-50% + ${props.itemX}px), calc(-50% + ${props.itemY}px)) scale(1.15)`};
  }

  &:hover .dial-tooltip {
    opacity: 1;
  }
`

const SpeedDialTooltip = styled(Box)`
  position: absolute;
  white-space: nowrap;
  background: rgba(23, 28, 43, 0.92);
  color: #fff;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.06);
  z-index: 30;

  &.dial-tooltip {
    opacity: 0;
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
  z-index: 3;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
    background: rgba(0, 0, 0, 0.7);
  }
`

// 3 speed-dial items radiating upward
const DIAL_RADIUS = 100
const DIAL_ANGLES = [60, 90, 120] // degrees, upward arc
const getDialPos = angleDeg => {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: Math.round(DIAL_RADIUS * Math.cos(rad)),
    y: -Math.round(DIAL_RADIUS * Math.sin(rad))
  }
}

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
    const handleClickOutside = e => {
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

  // Auto-fly
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
    }, 14000)

    return () => clearInterval(interval)
  }, [isMinimized, isDragging, isCardOpen])

  const handlePointerDown = useCallback(
    e => {
      e.preventDefault()
      const clientX = e.clientX ?? e.touches?.[0]?.clientX
      const clientY = e.clientY ?? e.touches?.[0]?.clientY
      if (clientX == null || clientY == null) return

      if (isMinimized && rootRef.current) {
        const rect = rootRef.current.getBoundingClientRect()
        setIsMinimized(false)
        setPos({ x: rect.left, y: rect.top })
        if (typeof window !== 'undefined') {
          localStorage.removeItem('hhs-cta-hidden')
        }
      }

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

    const handleMove = e => {
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
      setIsCardOpen(prev => !prev)
    }
  }, [isMinimized])

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

  const speedDialItems = [
    {
      id: 'coffee',
      href: coffeeLink,
      target: '_blank',
      icon: '☕',
      label: 'Bir kahve 50₺',
      bg: '#F4B942',
      shadow: 'rgba(244, 185, 66, 0.35)',
      tooltipSide: 'left'
    },
    {
      id: 'list',
      href: '/bagis',
      icon: '📋',
      label: 'Bağış listesi',
      bg: '#E5A823',
      shadow: 'rgba(229, 168, 35, 0.35)',
      tooltipSide: 'bottom'
    },
    {
      id: 'custom',
      href: customAmountLink,
      target: '_blank',
      icon: '💛',
      label: 'Özel miktar',
      bg: '#D4941E',
      shadow: 'rgba(212, 148, 30, 0.35)',
      tooltipSide: 'right'
    }
  ]

  const fabStyle =
    pos.x !== null
      ? { left: pos.x, top: pos.y, right: 'auto', bottom: 'auto' }
      : { right: 20, bottom: 20 }

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

      {speedDialItems.map((item, index) => {
        const { x, y } = getDialPos(DIAL_ANGLES[index])
        return (
          <SpeedDialItem
            key={item.id}
            href={item.href}
            target={item.target}
            rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
            onClick={() => setIsCardOpen(false)}
            isOpen={isCardOpen && !isMinimized}
            itemX={x}
            itemY={y}
            delayIndex={index}
            style={{
              background: item.bg,
              boxShadow: `0 4px 16px ${item.shadow}`
            }}
          >
            {item.icon}
            <SpeedDialTooltip
              className="dial-tooltip"
              style={{
                ...(item.tooltipSide === 'left' && {
                  right: 'calc(100% + 8px)',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }),
                ...(item.tooltipSide === 'right' && {
                  left: 'calc(100% + 8px)',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }),
                ...(item.tooltipSide === 'bottom' && {
                  top: 'calc(100% + 8px)',
                  left: '50%',
                  transform: 'translateX(-50%)'
                })
              }}
            >
              {item.label}
            </SpeedDialTooltip>
          </SpeedDialItem>
        )
      })}

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
