import { Link } from 'react-router-dom'
import './SectionHeader.css'

interface SectionHeaderProps {
  label: string
  title: string
  to?: string
  cta?: string
}

export function SectionHeader({ label, title, to, cta = 'View all' }: SectionHeaderProps) {
  return (
    <div className="section-label section-header">
      <span className="eyebrow">{label}</span>
      <h2 className="section-header__title">{title}</h2>
      {to && (
        <Link to={to} className="link-arrow section-header__cta">
          {cta}
        </Link>
      )}
    </div>
  )
}
