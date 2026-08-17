import { Link, useParams } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { ArticleCard } from '../components/ArticleCard'
import { usePageMeta } from '../hooks/usePageMeta'
import {
  routeById,
  airportById,
  airlineById,
  aircraftById,
  articlesForRoute,
} from '../data'
import './RouteProfile.css'

export function RoutePage() {
  const { routeId } = useParams<{ routeId: string }>()
  const route = routeId ? routeById.get(routeId) : undefined
  usePageMeta(
    route
      ? `${airportById.get(route.originId)?.city ?? ''} → ${airportById.get(route.destinationId)?.city ?? ''} — AERIS`
      : 'Routes — AERIS',
    route ? `${airportById.get(route.originId)?.iata ?? ''} → ${airportById.get(route.destinationId)?.iata ?? ''} route operated by ${airlineById.get(route.airlineId)?.name ?? ''}.` : undefined,
  )

  if (!route) {
    return (
      <section className="section section--paper not-found">
        <div className="container">
          <span className="eyebrow">Routes</span>
          <h1>Route not found.</h1>
          <Link to="/routes" className="link-arrow">Back to routes</Link>
        </div>
      </section>
    )
  }

  const origin = airportById.get(route.originId)
  const destination = airportById.get(route.destinationId)
  const airline = airlineById.get(route.airlineId)
  const fleet = route.aircraftIds
    .map((id) => aircraftById.get(id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
  const latest = articlesForRoute(route.id)

  const facts = [
    { label: 'Distance', value: `${route.distanceKm.toLocaleString()} km` },
    { label: 'Operated by', value: airline?.name ?? '—' },
    { label: 'Aircraft', value: fleet.map((a) => a.model).join(', ') || '—' },
    { label: 'Frequency', value: route.frequency },
    { label: 'First recorded', value: route.firstRecorded },
    { label: 'Status', value: route.status[0].toUpperCase() + route.status.slice(1) },
  ]

  return (
    <>
      <section className="route-hero">
        <div className="route-hero__sky">
          <img src={origin?.image} alt={origin?.name} loading="eager" />
          <img src={destination?.image} alt={destination?.name} loading="eager" />
        </div>
        <div className="route-hero__overlay" />
        <div className="container-wide route-hero__content">
          <span className="eyebrow route-hero__eyebrow">Route profile</span>
          <h1 className="route-hero__title">
            {origin?.city ?? ''} → {destination?.city ?? ''}
          </h1>
          <span className="route-hero__meta eyebrow">
            {origin?.iata}–{destination?.iata} · {route.distanceKm.toLocaleString()} km
          </span>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <div className="route-facts">
            {facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 50}>
                <div className="route-fact">
                  <span className="eyebrow route-fact__label">{f.label}</span>
                  <span className="route-fact__value">{f.value}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="route-ends">
            {[origin, destination].map(
              (ap) =>
                ap && (
                  <Link to={`/airports/${ap.id}`} className="route-end" key={ap.id}>
                    <img src={ap.image} alt={ap.name} className="route-end__image" loading="lazy" />
                    <span className="route-end__code eyebrow">{ap.iata}</span>
                    <span className="route-end__city">{ap.city}</span>
                    <span className="route-end__name">{ap.name}</span>
                  </Link>
                ),
            )}
          </div>

          {route.history && route.history.length > 0 && (
            <div className="route-history">
              <span className="eyebrow route-history__label">Route history</span>
              <div className="route-history__timeline">
                {route.history.map((h) => (
                  <div key={`${h.year}-${h.event}`} className="route-history__item">
                    <span className="route-history__year">{h.year}</span>
                    <span className="route-history__event">{h.event}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {latest.length > 0 && (
            <div className="route-latest">
              <span className="eyebrow route-latest__label">Stories about this route</span>
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
