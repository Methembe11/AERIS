import { Link, useParams } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { ArticleCard } from '../components/ArticleCard'
import { usePageMeta } from '../hooks/usePageMeta'
import {
  aircraftById,
  airportById,
  airlineById,
  routesForAircraft,
  airlinesForAircraft,
  airportsForAircraft,
  articlesForAircraft,
} from '../data'
import './Profile.css'
import './AircraftProfile.css'

export function AircraftProfilePage() {
  const { aircraftId } = useParams<{ aircraftId: string }>()
  const aircraft = aircraftId ? aircraftById.get(aircraftId) : undefined
  usePageMeta(
    aircraft ? `${aircraft.model} — AERIS` : 'Aircraft — AERIS',
    aircraft ? `${aircraft.manufacturer} ${aircraft.model}, a ${aircraft.category} type in Zimbabwe.` : undefined,
  )

  if (!aircraft) {
    return (
      <section className="section section--paper not-found">
        <div className="container">
          <span className="eyebrow">Aircraft</span>
          <h1>Aircraft not found.</h1>
          <Link to="/aircraft" className="link-arrow">Back to aircraft</Link>
        </div>
      </section>
    )
  }

  const routes = routesForAircraft(aircraft.id)
  const airlines = airlinesForAircraft(aircraft.id)
  const airports = airportsForAircraft(aircraft.id)
  const latest = articlesForAircraft(aircraft.id)

  const specs = [
    { label: 'First flight', value: aircraft.firstFlight },
    { label: 'Range', value: `${aircraft.rangeNmi} nmi` },
    { label: 'Capacity', value: aircraft.capacity },
    { label: 'Length', value: `${aircraft.lengthM} m` },
    { label: 'Wingspan', value: `${aircraft.wingspanM} m` },
  ]

  return (
    <>
      <section className="profile-hero aircraft-hero">
        <img src={aircraft.image} alt={aircraft.model} className="profile-hero__bg" />
        <div className="profile-hero__overlay" />
        <div className="container-wide profile-hero__content">
          <span className="eyebrow profile-hero__eyebrow">
            {aircraft.category} · {aircraft.manufacturer}
          </span>
          <h1 className="profile-hero__title">{aircraft.model}</h1>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <div className="aircraft-specs">
            {specs.map((s, i) => (
              <Reveal key={s.label} delay={i * 50}>
                <div className="aircraft-spec">
                  <span className="eyebrow aircraft-spec__label">{s.label}</span>
                  <span className="aircraft-spec__value">{s.value}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="aircraft-sections">
            <Reveal>
              <section className="aircraft-section">
                <span className="eyebrow aircraft-section__label">About</span>
                <p className="aircraft-section__text">{aircraft.description}</p>
              </section>
            </Reveal>

            <Reveal>
              <section className="aircraft-section">
                <span className="eyebrow aircraft-section__label">Operators serving Zimbabwe</span>
                <div className="aircraft-operator-list">
                  {airlines.map((a) => (
                    <Link to={`/airlines/${a.id}`} className="aircraft-operator" key={a.id}>
                      <span className="aircraft-operator__name">{a.name}</span>
                      <span className="aircraft-operator__meta eyebrow">{a.iata}</span>
                    </Link>
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section className="aircraft-section">
                <span className="eyebrow aircraft-section__label">Where this aircraft operates</span>
                <div className="aircraft-airport-list">
                  {airports.map((ap) => (
                    <Link to={`/airports/${ap.id}`} className="aircraft-airport" key={ap.id}>
                      <span className="aircraft-airport__code eyebrow">{ap.iata}</span>
                      <span className="aircraft-airport__city">{ap.city}</span>
                    </Link>
                  ))}
                </div>
              </section>
            </Reveal>

            {routes.length > 0 && (
              <section className="aircraft-section">
                <span className="eyebrow aircraft-section__label">Routes on this aircraft</span>
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
                          {airlineById.get(r.airlineId)?.name} · {r.frequency}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )}
          </div>

          {latest.length > 0 && (
            <div className="profile-latest aircraft-latest">
              <span className="eyebrow profile-network__count">Stories</span>
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
