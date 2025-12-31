import { useEffect, useRef } from 'react'

const Snowfall = () => {
  const containerRef = useRef(null)
  const accumulationRef = useRef(null)
  const snowmanRef = useRef(null)
  const snowCountRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    const accumulation = accumulationRef.current
    const snowman = snowmanRef.current
    if (!container || !accumulation || !snowman) return

    const isMobile = window.innerWidth < 600
    const snowflakeInterval = isMobile ? 240 : 100
    const initialCount = isMobile ? 3 : 6

    const createSnowflake = () => {
      const snowflake = document.createElement('div')

      // Beyaz veya mavi kar seç
      const isBlue = Math.random() > 0.6
      snowflake.innerHTML = '❄️'
      snowflake.style.position = 'fixed'
      snowflake.style.fontSize = `${Math.random() * 16 + 8}px`

      // Renk ayarı
      if (isBlue) {
        snowflake.style.color = '#87CEEB'
        snowflake.style.textShadow = '0 0 3px rgba(135, 206, 235, 0.6)'
      } else {
        snowflake.style.color = '#FFFFFF'
      }

      const leftPos = Math.random() * 100
      snowflake.style.left = `${leftPos}vw`
      snowflake.style.top = '-20px'
      snowflake.style.opacity = Math.random() * 0.6 + 0.4
      snowflake.style.pointerEvents = 'none'
      snowflake.style.userSelect = 'none'
      snowflake.style.zIndex = 9999
      snowflake.dataset.isBlue = isBlue

      const duration = Math.random() * 2.5 + 4.5
      const drift = (Math.random() - 0.5) * 80

      // Birikintiye ulaşacak yükseklik (ekranın 120px üstü)
      const stopHeight = window.innerHeight - 120

      snowflake.style.animation = `snowfall-to-accumulation ${duration}s linear`
      snowflake.style.setProperty('--drift', `${drift}px`)
      snowflake.style.setProperty('--stop-height', `${stopHeight}px`)

      container.appendChild(snowflake)

      // Kar tanesi birikintiye ulaştığında
      setTimeout(() => {
        // Birikintiye taşı - sadece beyaz olanlar
        if (!isBlue) {
          snowflake.style.position = 'absolute'
          snowflake.style.bottom = '0'
          snowflake.style.left = `${Math.random() * 100}%`
          snowflake.style.top = 'auto'
          snowflake.style.animation = 'none'
          snowflake.style.zIndex = 9998
          snowflake.style.filter = 'brightness(2) drop-shadow(0 0 2px rgba(255,255,255,0.8))'
          snowflake.style.color = '#FFFFFF'
          snowflake.style.textShadow = 'none'

          accumulation.appendChild(snowflake)

          // Kardan adamı büyüt
          snowCountRef.current += 1
          const scale = Math.min(snowCountRef.current / 20, 1) // 20 kar tanesi ile tam boyuta ulaş
          snowman.style.transform = `scale(${scale})`
          snowman.style.opacity = scale
        } else {
          // Mavi karları sil
          snowflake.remove()
        }
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
      {/* Kar birikintisi */}
      <div
        ref={accumulationRef}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 9998
        }}
      >
        {/* Kardan Adam */}
        <div
          ref={snowmanRef}
          style={{
            position: 'absolute',
            right: '20px',
            bottom: '0',
            pointerEvents: 'none',
            transformOrigin: 'bottom right',
            transition: 'transform 0.8s ease, opacity 0.8s ease',
            fontSize: '48px',
            opacity: 0,
            transform: 'scale(0)'
          }}
        >
          ☃️
        </div>
      </div>
      <style jsx global>{`
        @keyframes snowfall-to-accumulation {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          100% {
            transform: translateY(var(--stop-height)) translateX(var(--drift)) rotate(360deg);
          }
        }
      `}</style>
    </>
  )
}

export default Snowfall
