import { Link, Navigate, useParams } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { usePageMeta } from '../hooks/usePageMeta'
import {
  developmentById,
  airportById,
  routeById,
  airlineById,
  articleById,
} from '../data'
import './DevelopmentDossier.css'

export function DevelopmentDossierPage() {
  const { projectId } = useParams()
  const d = projectId ? developmentById.get(projectId) : undefined
  usePageMeta(
    d ? `${d.title} — AERIS` : 'Development — AERIS',
    d ? `Development dossier for ${d.title}.` : undefined,
  )

  if (!d) return <Navigate to="/development" replace />

  const airports = d.airportIds.map((id) => airportById.get(id)).filter((a) => a !== undefined)
  const routes = d.routeIds.map((id) => routeById.get(id)).filter((r) => r !== undefined)
  const articles = d.articleIds.map((id) => articleById.get(id)).filter((a) => a !== undefined)

  const statusClass =
    d.status === 'Completed' ? 'is-done' : d.status === 'In progress' ? 'is-active' : 'is-planned'

  return (
    <>
      <section className="dossier-hero">
        <img src={d.image} alt="" className="dossier-hero__bg" />
        <div className="dossier-hero__overlay" />
        <div className="container-wide dossier-hero__content">
          <span className="eyebrow dossier-hero__eyebrow">
            Development · {d.category}
          </span>
          <h1 className="dossier-hero__title">{d.title}</h1>
          <span className="dossier-hero__meta">{d.location}</span>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="dossier-facts">
            <div className="dossier-fact">
              <span className="dossier-fact__label">Status</span>
              <span className={`dossier-fact__value dossier-fact__value--${statusClass}`}>{d.status}</span>
            </div>
            <div className="dossier-fact">
              <span className="dossier-fact__label">Investment</span>
              <span className="dossier-fact__value">{d.investment ?? 'Not disclosed'}</span>
            </div>
            <div className="dossier-fact">
              <span className="dossier-fact__label">Capacity</span>
              <span className="dossier-fact__value">{d.capacity ?? '—'}</span>
            </div>
            <div className="dossier-fact">
              <span className="dossier-fact__label">Timeline</span>
              <span className="dossier-fact__value">
                {d.start}
                {d.end ? `–${d.end}` : ' · ongoing'}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <Reveal>
            <p className="dossier-lead">{d.summary}</p>
          </Reveal>

          <div className="dossier-columns">
            <Reveal>
              <div className="dossier-block">
                <h2 className="dossier-block__title">What changed</h2>
                <ul className="dossier-list">
                  {d.whatChanged.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="dossier-block">
                <h2 className="dossier-block__title">Why it matters</h2>
                <ul className="dossier-list">
                  {d.whyItMatters.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {d.milestones && d.milestones.length > 0 && (
        <section className="section">
          <div className="container">
            <Reveal>
              <SectionHeader label="Programme" title="Timeline" />
            </Reveal>
            <div className="dossier-timeline">
              {d.milestones.map((m, i) => (
                <Reveal key={m.label} delay={i * 70}>
                  <div className="dossier-timeline__item">
                    <span className="dossier-timeline__year">{m.year}</span>
                    <div className="dossier-timeline__body">
                      <h3 className="dossier-timeline__label">{m.label}</h3>
                      {m.note && <p className="dossier-timeline__note">{m.note}</p>}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {(airports.length > 0 || routes.length > 0 || articles.length > 0) && (
        <section className="section section--paper">
          <div className="container">
            <Reveal>
              <SectionHeader label="Related" title="In this story" />
            </Reveal>

            {airports.length > 0 && (
              <div className="dossier-related">
                {airports.map((a) => (
                  <Link key={a.id} to={`/airports/${a.id}`} className="dossier-related__item">
                    <span className="eyebrow dossier-related__kicker">{a.iata} · Airport</span>
                    <span className="dossier-related__name">{a.city}</span>
                    <span className="dossier-related__note">{a.name}</span>
                  </Link>
                ))}
              </div>
            )}

            {routes.length > 0 && (
              <div className="dossier-related">
                {routes.map((r) => {
                  const origin = airportById.get(r.originId)
                  const destination = airportById.get(r.destinationId)
                  const airline = airlineById.get(r.airlineId)
                  if (!origin || !destination || !airline) return null
                  return (
                    <Link key={r.id} to={`/routes/${r.id}`} className="dossier-related__item">
                      <span className="eyebrow dossier-related__kicker">{airline.iata} · Route</span>
                      <span className="dossier-related__name">{origin.city} → {destination.city}</span>
                      <span className="dossier-related__note">{r.frequency}</span>
                    </Link>
                  )
                })}
              </div>
            )}

            {articles.length > 0 && (
              <div className="dossier-related">
                {articles.map((a) => (
                  <Link key={a.id} to={`/journal/${a.id}`} className="dossier-related__item">
                    <span className="eyebrow dossier-related__kicker">{a.category}</span>
                    <span className="dossier-related__name">{a.title}</span>
                    <span className="dossier-related__note">{a.date}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="dossier-sources">
              <span className="eyebrow">Sources</span>
              <ul className="dossier-sources__list">
                {d.sources.map((s) => (
                  <li key={`${s.title}-${s.publisher}`} className="dossier-sources__item">
                    <span className="dossier-sources__title">{s.title}</span>
                    <span className="dossier-sources__publisher">{s.publisher}</span>
                    {s.confidence && (
                      <span className="dossier-sources__confidence">{s.confidence} confidence</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div className="dossier-back">
              <Link to="/development" className="link-arrow">All developments</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
