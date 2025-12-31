import { useEffect, useRef } from 'react'

const Snowfall = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile = window.innerWidth < 600
    const snowflakeInterval = isMobile ? 240 : 100 
    const initialCount = isMobile ? 3 : 6 

    const createSnowflake = () => {
      const snowflake = document.createElement('div')
      snowflake.innerHTML = '❄️'
      snowflake.style.position = 'fixed'
      snowflake.style.fontSize = `${Math.random() * 16 + 8}px`
      snowflake.style.left = `${Math.random() * 100}vw`
      snowflake.style.top = '-20px'
      snowflake.style.opacity = Math.random() * 0.6 + 0.4
      snowflake.style.pointerEvents = 'none'
      snowflake.style.userSelect = 'none'
      snowflake.style.zIndex = 9999

      const duration = Math.random() * 2.5 + 4.5
      const drift = (Math.random() - 0.5) * 80

      snowflake.style.animation = `snowfall ${duration}s linear`
      snowflake.style.setProperty('--drift', `${drift}px`)

      container.appendChild(snowflake)

      setTimeout(() => {
        snowflake.remove()
      }, duration * 1000)
    }

    const interval = setInterval(createSnowflake, snowflakeInterval)

    // Create initial snowflakes
    for (let i = 0; i < initialCount; i++) {
      setTimeout(createSnowflake, i * snowflakeInterval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <div ref={containerRef} />
      <style jsx global>{`
        @keyframes snowfall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) translateX(var(--drift)) rotate(360deg);
          }
        }
      `}</style>
    </>
  )
}

export default Snowfall
