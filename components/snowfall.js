import { useEffect, useRef } from 'react'

const Snowfall = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createSnowflake = () => {
      const snowflake = document.createElement('div')
      snowflake.innerHTML = '❄️'
      snowflake.style.position = 'fixed'
      snowflake.style.fontSize = `${Math.random() * 20 + 10}px`
      snowflake.style.left = `${Math.random() * 100}vw`
      snowflake.style.top = '-20px'
      snowflake.style.opacity = Math.random() * 0.6 + 0.4
      snowflake.style.pointerEvents = 'none'
      snowflake.style.userSelect = 'none'
      snowflake.style.zIndex = 9999
      
      const duration = Math.random() * 3 + 5
      const drift = (Math.random() - 0.5) * 100
      
      snowflake.style.animation = `snowfall ${duration}s linear`
      snowflake.style.setProperty('--drift', `${drift}px`)
      
      container.appendChild(snowflake)
      
      setTimeout(() => {
        snowflake.remove()
      }, duration * 1000)
    }

    const interval = setInterval(createSnowflake, 50)
    
    // Create initial snowflakes
    for (let i = 0; i < 50; i++) {
      setTimeout(createSnowflake, i * 20)
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
