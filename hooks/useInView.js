import { useState, useEffect, useRef } from 'react'

/**
 * Hook for viewport-based lazy loading
 * Only loads content when it comes into view
 */
export function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false)
  const [hasBeenInView, setHasBeenInView] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        setIsInView(inView)

        if (inView && !hasBeenInView) {
          setHasBeenInView(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [hasBeenInView, options])

  return { ref, isInView, hasBeenInView }
}

/**
 * Component wrapper for lazy loading
 */
export function LazySection({ children, fallback = null, ...props }) {
  const { ref, hasBeenInView } = useInView()

  return (
    <div ref={ref} {...props}>
      {hasBeenInView ? children : fallback}
    </div>
  )
}