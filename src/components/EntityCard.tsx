import { Link } from 'react-router-dom'
import './EntityCard.css'

interface EntityCardProps {
  title: string
  to: string
  image: string
  code?: string
  meta?: string[]
  description?: string
}

export function EntityCard({ title, to, image, code, meta, description }: EntityCardProps) {
  return (
    <article className="entity-card">
      <Link to={to} className="entity-card__link">
        <div className="entity-card__media">
          <img src={image} alt={title} loading="lazy" />
          {code && <span className="entity-card__code eyebrow">{code}</span>}
        </div>
        <div className="entity-card__body">
          <h3 className="entity-card__title">{title}</h3>
          {meta && meta.length > 0 && (
            <p className="entity-card__meta eyebrow">{meta.join(' · ')}</p>
          )}
          {description && <p className="entity-card__description">{description}</p>}
        </div>
      </Link>
    </article>
  )
}
