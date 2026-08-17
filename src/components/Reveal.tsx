import type { PropsWithChildren } from 'react'
import { useReveal } from '../hooks/useReveal'

interface RevealProps {
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className }: PropsWithChildren<RevealProps>) {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
