import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { ArticleCard } from '../components/ArticleCard'
import { usePageMeta } from '../hooks/usePageMeta'
import {
  airlineById,
  airportById,
  aircraftById,
  routesForAirline,
  articlesForAirline,
  reportsForAirline,
  zimbabweAirports,
} from '../data'
import './Profile.css'

type Tab = 'Overview' | 'Network' | 'Fleet' | 'Zimbabwe' | 'Latest' | 'Reports'

const TABS: Tab[] = ['Overview', 'Network', 'Fleet', 'Zimbabwe', 'Latest', 'Reports']

export function AirlinePage() {
  const { airlineId } = useParams<{ airlineId: string }>()
  const airline = airlineId ? airlineById.get(airlineId) : undefined
  usePageMeta(
    airline ? `${airline.name} — AERIS` : 'Airlines — AERIS',
    airline ? `Profile of ${airline.name}, a ${airline.category} carrier in Zimbabwe's aviation network.` : undefined,
  )
  const [tab, setTab] = useState<Tab>('Overview')

  if (!airline) {
    return (
      <section className="section section--paper not-found">
        <div className="container">
          <span className="eyebrow">Airlines</span>
          <h1>Airline not found.</h1>
          <Link to="/airlines" className="link-arrow">Back to airlines</Link>
        </div>
      </section>
    )
  }

  const routes = routesForAirline(airline.id)
  const aircraftIds = new Set(routes.flatMap((r) => r.aircraftIds))
  const fleet = [...aircraftIds]
    .map((id) => aircraftById.get(id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
  const latest = articlesForAirline(airline.id)
  const reports = reportsForAirline(airline.id)
  const zwRoutes = routes.filter((r) => {
    const o = airportById.get(r.originId)
    const d = airportById.get(r.destinationId)
    return o?.country === 'Zimbabwe' || d?.country === 'Zimbabwe'
  })

  const switchTab = (t: Tab) => {
    setTab(t)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <section className="profile-hero">
        <img src={airline.image} alt={airline.name} className="profile-hero__bg" />
        <div className="profile-hero__overlay" />
        <div className="container-wide profile-hero__content">
          <span className="eyebrow profile-hero__eyebrow">{airline.category.toUpperCase()}</span>
          <h1 className="profile-hero__title">{airline.name}</h1>
          <span className="profile-hero__meta eyebrow">
            {airline.hq} · IATA {airline.iata} · ICAO {airline.icao}
          </span>
        </div>
      </section>

      <nav className="profile-tabs" aria-label="Airline sections">
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
                  <span className="eyebrow profile-fact__label">Headquarters</span>
                  <span className="profile-fact__value">{airline.hq}</span>
                </div>
                <div className="profile-fact">
                  <span className="eyebrow profile-fact__label">Hub</span>
                  <span className="profile-fact__value">{airline.hub}</span>
                </div>
                <div className="profile-fact">
                  <span className="eyebrow profile-fact__label">Founded</span>
                  <span className="profile-fact__value">{airline.founded}</span>
                </div>
                <div className="profile-fact">
                  <span className="eyebrow profile-fact__label">Fleet</span>
                  <span className="profile-fact__value">{airline.fleetSize}</span>
                </div>
                <div className="profile-fact">
                  <span className="eyebrow profile-fact__label">Destinations</span>
                  <span className="profile-fact__value">{airline.destinations}</span>
                </div>
                <div className="profile-fact">
                  <span className="eyebrow profile-fact__label">Zimbabwe network</span>
                  <span className="profile-fact__value">{zwRoutes.length} routes</span>
                </div>
              </div>

              <Reveal>
                <div className="profile-narrative">
                  <p>{airline.description}</p>
                  <p className="profile-narrative__zw">{airline.zimbabweConnection}</p>
                </div>
              </Reveal>
            </div>
          )}

          {tab === 'Network' && (
            <div className="profile-network">
              <span className="eyebrow profile-network__count">{routes.length} recorded routes</span>
              <div className="profile-route-list">
                {routes.map((r) => {
                  const origin = airportById.get(r.originId)
                  const destination = airportById.get(r.destinationId)
                  return (
                    <Link to={`/routes/${r.id}`} className="profile-route" key={r.id}>
                      <span className="profile-route__pair">
                        {origin?.city} → {destination?.city}
                      </span>
                      <span className="profile-route__meta eyebrow">
                        {r.frequency} · {r.distanceKm.toLocaleString()} km · {origin?.iata}–{destination?.iata}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {tab === 'Fleet' && (
            <div className="profile-fleet">
              {fleet.map((a, i) => (
                <Reveal key={a.id} delay={i * 60}>
                  <Link to={`/aircraft/${a.id}`} className="profile-fleet__card">
                    <div className="profile-fleet__media">
                      <img src={a.image} alt={a.model} loading="lazy" />
                    </div>
                    <div className="profile-fleet__info">
                      <span className="profile-fleet__name">{a.model}</span>
                      <span className="profile-fleet__meta eyebrow">
                        {a.category} · {a.manufacturer}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          {tab === 'Zimbabwe' && (
            <div className="profile-zimbabwe">
              <Reveal>
                <p className="profile-zimbabwe__narrative">{airline.zimbabweConnection}</p>
              </Reveal>
              <span className="eyebrow profile-network__count">Zimbabwe routes</span>
              <div className="profile-route-list">
                {zwRoutes.map((r) => {
                  const origin = airportById.get(r.originId)
                  const destination = airportById.get(r.destinationId)
                  return (
                    <Link to={`/routes/${r.id}`} className="profile-route" key={r.id}>
                      <span className="profile-route__pair">
                        {origin?.city} → {destination?.city}
                      </span>
                      <span className="profile-route__meta eyebrow">
                        {r.frequency} · {r.status}
                      </span>
                    </Link>
                  )
                })}
              </div>
              <div className="profile-zimbabwe__airports">
                {zimbabweAirports.filter((ap) =>
                  zwRoutes.some((r) => r.originId === ap.id || r.destinationId === ap.id),
                ).map((ap) => (
                  <Link to={`/airports/${ap.id}`} className="profile-chip" key={ap.id}>
                    {ap.city}
                    <span className="eyebrow">{ap.iata}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {tab === 'Reports' && (
            <div className="profile-reports">
              {reports.length === 0 && (
                <p className="profile-empty">No research published on this carrier yet.</p>
              )}
              <div className="profile-report-list">
                {reports.map((r) => (
                  <Link to={`/reports/${r.id}`} className="profile-report" key={r.id}>
                    <div className="profile-report__body">
                      <span className="eyebrow profile-report__kicker">
                        {r.type === 'premium' ? `Premium · ${r.price}` : 'Free brief'}
                      </span>
                      <span className="profile-report__title">{r.title}</span>
                      <span className="profile-report__meta">{r.tagline}</span>
                    </div>
                    <span className="profile-report__date eyebrow">{r.date}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {tab === 'Latest' && (
            <div className="profile-latest">
              {latest.length === 0 && (
                <p className="profile-empty">No stories recorded for this carrier yet.</p>
              )}
              <div className="journal-grid">
                {latest.map((article, i) => (
                  <Reveal key={article.id} delay={i * 60}>
                    <ArticleCard article={article} />
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
