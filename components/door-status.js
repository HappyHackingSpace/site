import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { Box, Text } from 'theme-ui'

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`

const knockAnimation = keyframes`
  0%, 100% { transform: translate(-50%, -50%) translateX(0); }
  25% { transform: translate(-50%, -50%) translateX(-5px); }
  50% { transform: translate(-50%, -50%) translateX(5px); }
  75% { transform: translate(-50%, -50%) translateX(-5px); }
`

const openDoor = keyframes`
  from {
    transform: perspective(1000px) rotateY(0deg);
    transform-origin: right center;
  }
  to {
    transform: perspective(1000px) rotateY(90deg);
    transform-origin: right center;
  }
`

// Styled components
const Overlay = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${props => props.closing ? slideOut : slideIn} 0.3s ease;
`

const DoorContainer = styled(Box)`
  position: relative;
  width: 300px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 480px) {
    width: 90vw;
    max-width: 320px;
    aspect-ratio: 3/4;
    height: auto;
    min-height: 220px;
  }
`

const Door = styled(Box)`
  width: 100%;
  height: 100%;
  background: #8B4513;
  border: 8px solid #654321;
  border-radius: 8px;
  position: relative;
  transform-origin: right center;
  animation: ${props => props.isOpen ? openDoor : 'none'} 0.8s ease forwards;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 20px;
    width: 12px;
    height: 12px;
    background: #FFD700;
    border-radius: 50%;
    transform: translateY(-50%);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    border: 2px solid #654321;
    border-radius: 4px;
  }
`

const Hand = styled(Box)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 60px;
  animation: ${props => props.knocking ? knockAnimation : 'none'} 0.6s ease;
  z-index: 5;
  opacity: ${props => props.knocking ? 1 : 0};
  transition: opacity 0.3s ease;
`

const StatusText = styled(Text)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  font-weight: bold;
  color: ${props => props.isOpen ? '#10B981' : '#EF4444'};
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 10;
  animation: ${slideIn} 0.3s ease both;
  text-align: center;
  white-space: nowrap;
  pointer-events: none;

  @media (max-width: 480px) {
    position: fixed;
    z-index: 10001;
    font-size: 32px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    inset: auto;
  }
`

const DoorStatus = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isKnocking, setIsKnocking] = useState(false)
  const [statusText, setStatusText] = useState('')
  const [closing, setClosing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [doorIsActuallyOpen, setDoorIsActuallyOpen] = useState(false)

  useEffect(() => {
    const fetchDoorStatus = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/HappyHackingSpace/.github/refs/heads/main/scripts/.door_status_cache/last_status.json'
        )
        const data = await response.json()
       
        const doorIsOpen = data.locked === false
        setDoorIsActuallyOpen(doorIsOpen)
        setIsKnocking(true)
        setTimeout(() => {
          setIsKnocking(false)
          if (!doorIsOpen) {
            setStatusText('CLOSED')
            setLoading(false)
          } else {
            setIsOpen(true)
            setTimeout(() => {
              setStatusText('OPEN')
              setLoading(false)
            }, 500)
          }
        }, 800)
      }  catch (error) {
  console.error('Failed to fetch door status:', error)
  setIsKnocking(true)
  setTimeout(() => {
    setIsKnocking(false)
    setStatusText('İSTEK BAŞARISIZ')
    setLoading(false)
  }, 800)
      }
    }

    fetchDoorStatus()

    const autoCloseTimer = setTimeout(() => {
      handleClose()
    }, 4000)

    return () => clearTimeout(autoCloseTimer)
  }, [])

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => {
      if (onClose) onClose()
    }, 300)
  }

  return (
    <Overlay closing={closing} onClick={handleClose}>
      <DoorContainer onClick={e => e.stopPropagation()}>
        <Door isOpen={isOpen && !loading} />
        <Hand knocking={isKnocking}>👆</Hand>
        {statusText && <StatusText isOpen={isOpen}>{statusText}</StatusText>}
      </DoorContainer>
    </Overlay>
  )
}

export default DoorStatus
