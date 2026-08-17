import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { usePageMeta } from '../hooks/usePageMeta'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import {
  articleById,
  airportById,
  airlineById,
  aircraftById,
  routeById,
} from '../data'
import './Article.css'

export function ArticlePage() {
  const { articleId } = useParams<{ articleId: string }>()
  const article = articleId ? articleById.get(articleId) : undefined
  const reduceMotion = usePrefersReducedMotion()
  usePageMeta(
    article ? `${article.title} — AERIS` : 'Journal — AERIS',
    article?.excerpt,
  )
  const [activeSection, setActiveSection] = useState(-1)

  const outline = article?.outline

  useEffect(() => {
    if (!article || !outline || outline.length === 0) return
    let lastRun = 0
    let timer: number | undefined

    const update = () => {
      const anchor = window.innerHeight * 0.4
      let active = -1
      for (let i = 0; i < outline.length; i++) {
        const el = document.getElementById(`article-section-${outline[i].start}`)
        if (el && el.getBoundingClientRect().top <= anchor) active = i
      }
      setActiveSection(active)
    }

    const onScroll = () => {
      const now = performance.now()
      if (now - lastRun >= 50) {
        lastRun = now
        update()
      } else if (timer === undefined) {
        timer = window.setTimeout(() => {
          timer = undefined
          lastRun = performance.now()
          update()
        }, 50)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (timer !== undefined) window.clearTimeout(timer)
    }
  }, [article, outline])

  if (!article) {
    return (
      <section className="section section--paper not-found">
        <div className="container">
          <span className="eyebrow">Journal</span>
          <h1>Story not found.</h1>
          <Link to="/journal" className="link-arrow">
            Back to the journal
          </Link>
        </div>
      </section>
    )
  }

  const scrollToSection = (start: number) => {
    document
      .getElementById(`article-section-${start}`)
      ?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' })
  }

  const airports = article.airportIds
    .map((id) => airportById.get(id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
  const airlines = article.airlineIds
    .map((id) => airlineById.get(id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
  const aircraft = article.aircraftIds
    .map((id) => aircraftById.get(id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
  const routes = article.routeIds
    .map((id) => routeById.get(id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))

  const mentioned = [
    { label: 'Airlines', items: airlines.map((a) => ({ title: a.name, to: `/airlines/${a.id}`, sub: a.category.toUpperCase() })) },
    { label: 'Airports', items: airports.map((a) => ({ title: a.name, to: `/airports/${a.id}`, sub: `${a.iata} · ${a.city}` })) },
    { label: 'Routes', items: routes.map((r) => {
      const o = airportById.get(r.originId)
      const d = airportById.get(r.destinationId)
      return { title: `${o?.city ?? ''} → ${d?.city ?? ''}`, to: `/routes/${r.id}`, sub: airlineById.get(r.airlineId)?.name ?? '' }
    }) },
    { label: 'Aircraft', items: aircraft.map((a) => ({ title: a.model, to: `/aircraft/${a.id}`, sub: a.category.toUpperCase() })) },
  ].filter((g) => g.items.length > 0)

  return (
    <>
      <article className="article">
        <header className="article__header">
          <div className="container">
            <span className="article__category eyebrow">{article.category} · {article.date}</span>
            <h1 className="article__title">{article.title}</h1>
            <span className="article__byline">
              By {article.author}
            </span>
            {airports.length > 0 && (
              <span className="article__places eyebrow">
                {airports.map((a) => a.city).join(' · ')}
              </span>
            )}
          </div>
        </header>

        <div className="article__hero">
          <img src={article.heroImage} alt="" fetchPriority="high" />
        </div>

        <div className="container article__layout">
          <div className="article__body">
            {article.content.map((paragraph, i) => (
              <Reveal key={i}>
                <p id={`article-section-${i}`}>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <aside className="article__sidebar">
            {outline && outline.length > 0 && (
              <div className="article__outline">
                <span className="article__outline-label eyebrow">In this story</span>
                <ol className="article__outline-list">
                  {outline.map((item, i) => (
                    <li key={item.label}>
                      <button
                        className={`article__outline-item${activeSection === i ? ' is-active' : ''}`}
                        onClick={() => scrollToSection(item.start)}
                      >
                        <span className="article__outline-num">{String(i + 1).padStart(2, '0')}</span>
                        <span className="article__outline-text">{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {mentioned.length > 0 && (
              <>
                <span className="article__sidebar-label eyebrow">Mentioned in this story</span>
                {mentioned.map((group) => (
                  <div className="article__mentioned" key={group.label}>
                    <span className="article__mentioned-label eyebrow">{group.label}</span>
                    {group.items.map((item) => (
                      <Link key={item.to} to={item.to} className="article__mentioned-item">
                        <span>{item.title}</span>
                        <span className="article__mentioned-sub">{item.sub}</span>
                      </Link>
                    ))}
                  </div>
                ))}
              </>
            )}
          </aside>
        </div>
      </article>

      <section className="section section--ink article__more">
        <div className="container">
          <span className="eyebrow">Continue exploring</span>
          <div className="article__more-links">
            {airlines[0] && (
              <Link to={`/airlines/${airlines[0].id}`} className="article__more-link">
                <span className="eyebrow">Airline</span>
                <span>{airlines[0].name}</span>
              </Link>
            )}
            {airports[0] && (
              <Link to={`/airports/${airports[0].id}`} className="article__more-link">
                <span className="eyebrow">Airport</span>
                <span>{airports[0].name}</span>
              </Link>
            )}
            {routes[0] && (
              <Link to={`/routes/${routes[0].id}`} className="article__more-link">
                <span className="eyebrow">Route</span>
                <span>{airportById.get(routes[0].originId)?.city} → {airportById.get(routes[0].destinationId)?.city}</span>
              </Link>
            )}
            {aircraft[0] && (
              <Link to={`/aircraft/${aircraft[0].id}`} className="article__more-link">
                <span className="eyebrow">Aircraft</span>
                <span>{aircraft[0].model}</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
