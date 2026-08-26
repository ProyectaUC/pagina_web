import { useEffect, useRef, useState } from 'react'

// Hook para detectar cuando un elemento entra al viewport
export function useInView(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Una vez visible, dejamos de observar (animación solo una vez)
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
        ...options,
      }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return [ref, isVisible]
}

// Hook para el tema dark/light
export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return (
      localStorage.getItem('proyecta-theme') === 'dark' ||
      (!localStorage.getItem('proyecta-theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('proyecta-theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('proyecta-theme', 'light')
    }
  }, [isDark])

  return [isDark, setIsDark]
}

// Hook para counter animado
export function useCountUp(end, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart) return

    let startTime = null
    const startValue = 0

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      // Easing: ease-out
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * (end - startValue) + startValue))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, shouldStart])

  return count
}
