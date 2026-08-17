import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import './BackToTop.css'

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const reduceMotion = usePrefersReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' })
  }

  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' back-to-top--visible' : ''}`}
      onClick={scrollToTop}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      aria-label="Back to top"
    >
      <svg viewBox="0 0 24 24" className="back-to-top__icon">
        <path fill="none" stroke="currentColor" strokeWidth="1.2" d="m7 14 5-5 5 5" />
      </svg>
    </button>
  )
}
