import { Link } from 'react-router-dom'
import type { Article } from '../types'
import { airportById } from '../data'
import './ArticleCard.css'

interface ArticleCardProps {
  article: Article
  size?: 'lead' | 'medium' | 'small'
}

export function ArticleCard({ article, size = 'medium' }: ArticleCardProps) {
  const city = article.airportIds.map((id) => airportById.get(id)?.city).filter(Boolean).slice(0, 3).join(' · ')

  return (
    <article className={`article-card article-card--${size}`}>
      <Link to={`/journal/${article.id}`} className="article-card__link">
        <div className="article-card__media">
          <img src={article.heroImage} alt="" loading="lazy" />
        </div>
        <div className="article-card__body">
          <span className="article-card__meta eyebrow">
            {article.category} · {article.date}
          </span>
          <h3 className="article-card__title">{article.title}</h3>
          <p className="article-card__excerpt">{article.excerpt}</p>
          {city && <span className="article-card__city">{city}</span>}
        </div>
      </Link>
    </article>
  )
}
