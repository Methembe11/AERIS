import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { ArticleCard } from '../components/ArticleCard'
import { usePageMeta } from '../hooks/usePageMeta'
import {
  airportById,
  airlineById,
  routesForAirport,
  airlinesForAirport,
  articlesForAirport,
  developmentsForAirport,
} from '../data'
import './Profile.css'
import './Airport.css'

type Tab =
  | 'Overview'
  | 'Airlines'
  | 'Routes'
  | 'Facilities'
  | 'Infrastructure'
  | 'Traffic'
  | 'Development'
  | 'History'
  | 'Latest'

const TABS: Tab[] = [
  'Overview',
  'Airlines',
  'Routes',
  'Facilities',
  'Infrastructure',
  'Traffic',
  'Development',
  'History',
  'Latest',
]

export function AirportPage() {
  const { airportId } = useParams<{ airportId: string }>()
  const airport = airportId ? airportById.get(airportId) : undefined
  usePageMeta(
    airport ? `${airport.city} (${airport.iata}) — AERIS` : 'Airports — AERIS',
    airport ? `${airport.name} in ${airport.city}, ${airport.country}.` : undefined,
  )
  const [tab, setTab] = useState<Tab>('Overview')

  if (!airport) {
    return (
      <section className="section section--paper not-found">
        <div className="container">
          <span className="eyebrow">Airports</span>
          <h1>Airport not found.</h1>
          <Link to="/airports" className="link-arrow">Back to airports</Link>
        </div>
      </section>
    )
  }

  const routes = routesForAirport(airport.id)
  const airlines = airlinesForAirport(airport.id)
  const latest = articlesForAirport(airport.id)
  const developments = developmentsForAirport(airport.id)
  const traffic = airport.traffic ?? []
  const infrastructure = airport.infrastructure ?? []
  const history = airport.history ?? []

  const switchTab = (t: Tab) => {
    setTab(t)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const maxTraffic = traffic.length > 0 ? Math.max(...traffic.map((t) => t.passengers)) : 0

  return (
    <>
      <section className="profile-hero">
        <img src={airport.image} alt={airport.name} className="profile-hero__bg" />
        <div className="profile-hero__overlay" />
        <div className="container-wide profile-hero__content">
          <span className="eyebrow profile-hero__eyebrow">
            {airport.iata} · {airport.icao}
          </span>
          <h1 className="profile-hero__title">{airport.name}</h1>
          <span className="profile-hero__meta eyebrow">
            {airport.city}, {airport.country} · {airport.category}
          </span>
        </div>
      </section>

      <nav className="profile-tabs" aria-label="Airport sections">
        <div className="container profile-tabs__inner">
          {TABS.map((t) => (
            <button
              key={t}
              className={`profile-tabs__btn eyebrow${tab === t ? ' profile-tabs__btn--active' : ''}`}
              onClick={() => switchTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </nav>

      <section className="section section--paper">
        <div className="container">
          {tab === 'Overview' && (
            <div className="profile-overview">
              <div className="profile-facts">
                <div className="profile-fact">
                  <span className="eyebrow profile-fact__label">Established</span>
                  <span className="profile-fact__value">{airport.established}</span>
                </div>
                <div className="profile-fact">
                  <span className="eyebrow profile-fact__label">Elevation</span>
                  <span className="profile-fact__value">{airport.elevationFt.toLocaleString()} ft</span>
                </div>
                {airport.runway && (
                  <div className="profile-fact">
                    <span className="eyebrow profile-fact__label">Runway</span>
                    <span className="profile-fact__value">
                      {airport.runway.lengthM.toLocaleString()} × {airport.runway.widthM} m
                    </span>
                  </div>
                )}
                {airport.capacityPerAnnum && (
                  <div className="profile-fact">
                    <span className="eyebrow profile-fact__label">Capacity</span>
                    <span className="profile-fact__value">
                      {airport.capacityPerAnnum.toLocaleString()} pax / year
                    </span>
                  </div>
                )}
                <div className="profile-fact">
                  <span className="eyebrow profile-fact__label">Airlines</span>
                  <span className="profile-fact__value">{airlines.length}</span>
                </div>
                <div className="profile-fact">
                  <span className="eyebrow profile-fact__label">Routes</span>
                  <span className="profile-fact__value">{routes.length}</span>
                </div>
              </div>

              <Reveal>
                <div className="profile-narrative">
                  <p>{airport.description}</p>
                </div>
              </Reveal>
            </div>
          )}

          {tab === 'Airlines' && (
            <div className="profile-airline-list">
              {airlines.length === 0 && <p className="profile-empty">No airlines recorded here yet.</p>}
              {airlines.map((a, i) => (
                <Reveal key={a.id} delay={i * 40}>
                  <Link to={`/airlines/${a.id}`} className="profile-airline">
                    <span className="profile-airline__name">{a.name}</span>
                    <span className="profile-airline__meta eyebrow">
                      {a.category} · {a.hq}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          {tab === 'Routes' && (
            <div className="profile-network">
              <span className="eyebrow profile-network__count">{routes.length} connections</span>
              <div className="profile-route-list">
                {routes.map((r) => {
                  const origin = airportById.get(r.originId)
                  const destination = airportById.get(r.destinationId)
                  const other = origin?.id === airport.id ? destination : origin
                  return (
                    <Link to={`/routes/${r.id}`} className="profile-route" key={r.id}>
                      <span className="profile-route__pair">
                        {airport.city} → {other?.city ?? ''}
                      </span>
                      <span className="profile-route__meta eyebrow">
                        {airlineById.get(r.airlineId)?.name} · {r.frequency} · {r.status}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {tab === 'Facilities' && (
            <div className="profile-facilities">
              <span className="eyebrow profile-facilities__label">On-site facilities</span>
              <ul className="profile-facilities__list">
                {airport.facilities.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {tab === 'Infrastructure' && (
            <div className="profile-infra">
              {infrastructure.length === 0 && (
                <p className="profile-empty">No infrastructure detail recorded for this airport yet.</p>
              )}
              <div className="profile-infra__grid">
                {infrastructure.map((item) => (
                  <div key={item.label} className="profile-infra__item">
                    <span className="eyebrow profile-infra__label">{item.label}</span>
                    <span className="profile-infra__value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'Traffic' && (
            <div className="profile-traffic">
              {traffic.length === 0 && <p className="profile-empty">No traffic data recorded.</p>}
              {traffic.length > 0 && (
                <>
                  <span className="eyebrow profile-network__count">Annual traffic</span>
                  <div className="traffic-chart" role="img" aria-label="Annual passenger traffic">
                    {traffic.map((t, i) => {
                      const prev = traffic[i - 1]
                      const pct = prev ? ((t.passengers - prev.passengers) / prev.passengers) * 100 : null
                      const height = (t.passengers / maxTraffic) * 100
                      return (
                        <div className="traffic-bar-wrap" key={t.year}>
                          <span className="traffic-bar__tooltip eyebrow">
                            {t.year} · {t.passengers.toLocaleString()} passengers
                            {pct !== null && <> · {pct >= 0 ? '+' : ''}{pct.toFixed(1)}%</>}
                          </span>
                          <div
                            className="traffic-bar"
                            style={{ height: `${height}%` }}
                          />
                          <span className="traffic-bar__year eyebrow">{t.year}</span>
                        </div>
                      )
                    })}
                  </div>
                  <p className="traffic-note">
                    Passenger figures are approximate and drawn from public reporting; source data to be
                    verified against CAAZ and ACZ records.
                  </p>
                </>
              )}
            </div>
          )}

          {tab === 'Development' && (
            <div className="profile-development">
              {developments.length === 0 && (
                <p className="profile-empty">No development projects recorded for this airport yet.</p>
              )}
              <div className="profile-report-list">
                {developments.map((d) => (
                  <Link to={`/development/${d.id}`} className="profile-report" key={d.id}>
                    <div className="profile-report__body">
                      <span className="eyebrow profile-report__kicker">{d.category}</span>
                      <span className="profile-report__title">{d.title}</span>
                      <span className="profile-report__meta">{d.summary}</span>
                    </div>
                    <span className="profile-report__date eyebrow">{d.status}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {tab === 'History' && (
            <div className="profile-history">
              {history.length === 0 && (
                <p className="profile-empty">No history timeline recorded for this airport yet.</p>
              )}
              {history.length > 0 && (
                <>
                  <span className="eyebrow profile-network__count">Key dates</span>
                  <div className="profile-history__timeline">
                    {history.map((h) => (
                      <div key={`${h.year}-${h.event}`} className="profile-history__item">
                        <span className="profile-history__year">{h.year}</span>
                        <span className="profile-history__event">{h.event}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {tab === 'Latest' && (
            <div className="profile-latest">
              {latest.length === 0 && (
                <p className="profile-empty">No stories recorded for this airport yet.</p>
              )}
              <div className="journal-grid">
                {latest.map((article, i) => (
                  <Reveal key={article.id} delay={i * 60}>
                    <ArticleCard article={article} size="small" />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
