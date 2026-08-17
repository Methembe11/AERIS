import './BrandLogo.css'

interface BrandLogoProps {
  className?: string
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <svg
      className={`brand-logo${className ? ` ${className}` : ''}`}
      viewBox="0 0 320 100"
      role="img"
      aria-label="AERIS"
    >
      <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="square">
        <path d="M52 20 28 80" />
        <path d="M52 20 76 80" />
        <path d="M44 20h16" />
        <path d="M38 52h28" />
      </g>
      <text
        x="100"
        y="74"
        fontFamily="'Cormorant Garamond', 'Times New Roman', Georgia, serif"
        fontSize="62"
        letterSpacing="0.05em"
        fill="currentColor"
      >
        ERIS
      </text>
    </svg>
  )
}
