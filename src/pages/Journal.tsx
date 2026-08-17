import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { PageHero } from '../components/PageHero'
import { ArticleCard } from '../components/ArticleCard'
import { Reveal } from '../components/Reveal'
import { usePageMeta } from '../hooks/usePageMeta'
import type { ArticleCategory } from '../types'
import { articles } from '../data'
import './Journal.css'

const CATEGORIES = ['All', 'News', 'Analysis', 'Interviews', 'Features', 'Opinion', 'Photo Essays'] as const

export function JournalPage() {
  usePageMeta(
    'Journal — AERIS',
    "Stories and analysis from Zimbabwe's aviation industry.",
  )
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const index = CATEGORIES.indexOf(category)
    let next = -1
    if (e.key === 'ArrowRight') next = (index + 1) % CATEGORIES.length
    else if (e.key === 'ArrowLeft') next = (index - 1 + CATEGORIES.length) % CATEGORIES.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = CATEGORIES.length - 1
    if (next < 0) return
    e.preventDefault()
    const target = CATEGORIES[next]
    setCategory(target)
    tabRefs.current[next]?.focus()
  }

  const filtered =
    category === 'All'
      ? articles
      : articles.filter((a) => a.category === (category === 'Interviews' ? 'Interview' : category === 'Features' ? 'Feature' : category === 'Photo Essays' ? 'Photo Essay' : (category as ArticleCategory)))

  const [lead, ...rest] = filtered

  return (
    <>
      <PageHero
        label="Journal"
        title="Stories from Zimbabwe's aviation industry."
        image="/assets/journal/zimbabwe-landscape.jpg"
      />

      <section className="section section--paper">
        <div className="container">
          <div className="journal-filters" role="tablist" aria-label="Story categories" onKeyDown={onKeyDown}>
            {CATEGORIES.map((c, i) => (
              <button
                key={c}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                role="tab"
                aria-selected={category === c}
                tabIndex={category === c ? 0 : -1}
                className={`journal-filters__btn eyebrow${category === c ? ' journal-filters__btn--active' : ''}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {lead && (
            <Reveal>
              <div className="journal-lead">
                <ArticleCard article={lead} size="lead" />
              </div>
            </Reveal>
          )}

          {rest.length > 0 && (
            <div className="journal-secondary">
              {rest.slice(0, 2).map((article, i) => (
                <Reveal key={article.id} delay={i * 80}>
                  <ArticleCard article={article} size="medium" />
                </Reveal>
              ))}
            </div>
          )}

          {rest.length > 2 && (
            <div className="journal-grid journal-grid--small">
              {rest.slice(2).map((article, i) => (
                <Reveal key={article.id} delay={(i % 3) * 80}>
                  <ArticleCard article={article} size="small" />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
