import { useEffect, useState } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export function useCountUp(target: number, duration = 1400, start = false) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return

    const reduceMotion =
      typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches
    if (reduceMotion) {
      setValue(target)
      return
    }

    let frame: number
    const startTime = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, start])

  return value
}
