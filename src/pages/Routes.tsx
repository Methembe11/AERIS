import { Link, useSearchParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { usePageMeta } from '../hooks/usePageMeta'
import { routes, airlineById, airportById, airports, zimbabweAirports } from '../data'
import './Routes.css'

const STATUS: ('All' | 'Active' | 'Seasonal' | 'Suspended')[] = ['All', 'Active', 'Seasonal', 'Suspended']

const isStatus = (v: string | null): v is (typeof STATUS)[number] =>
  STATUS.some((s) => s === v)

export function RoutesPage() {
  usePageMeta(
    'Routes — AERIS',
    "Mapping Zimbabwe's connections.",
  )
  const [searchParams, setSearchParams] = useSearchParams()
  const origin = searchParams.get('from') ?? 'all'
  const destination = searchParams.get('to') ?? 'all'
  const statusParam = searchParams.get('status')
  const status: (typeof STATUS)[number] = isStatus(statusParam) ? statusParam : 'All'

  const update = (from: string | null, to: string | null, s: (typeof STATUS)[number]) => {
    const next = new URLSearchParams()
    if (from && from !== 'all') next.set('from', from)
    if (to && to !== 'all') next.set('to', to)
    if (s !== 'All') next.set('status', s)
    const qs = next.toString()
    setSearchParams(qs ? `?${qs}` : '')
  }

  const filtered = routes.filter((r) => {
    if (origin !== 'all' && r.originId !== origin) return false
    if (destination !== 'all' && r.destinationId !== destination) return false
    if (status !== 'All' && r.status !== status.toLowerCase()) return false
    return true
  })

  const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, r) => {
    const origin = airportById.get(r.originId)
    const key = origin?.country === 'Zimbabwe' ? origin.city : 'International'
    acc[key] = acc[key] ?? []
    acc[key].push(r)
    return acc
  }, {})

  return (
    <>
      <PageHero
        label="Routes"
        title="Mapping Zimbabwe's connections."
        image="/assets/journal/runway.jpg"
      />

      <section className="section section--paper">
        <div className="container">
          <div className="routes-filters">
            <label className="routes-filters__group">
              <span className="eyebrow">From</span>
                <select
                  className="routes-filters__select"
                  value={origin}
                  onChange={(e) => update(e.target.value, destination, status)}
                >
                <option value="all">All origins</option>
                {zimbabweAirports.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.city} ({a.iata})
                  </option>
                ))}
              </select>
            </label>

            <label className="routes-filters__group">
              <span className="eyebrow">To</span>
                <select
                  className="routes-filters__select"
                  value={destination}
                  onChange={(e) => update(origin, e.target.value, status)}
                >
                <option value="all">All destinations</option>
                {airports.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.city} ({a.iata})
                  </option>
                ))}
              </select>
            </label>

            <div className="routes-filters__status">
              {STATUS.map((s) => (
                <button
                  key={s}
                  className={`routes-filters__btn eyebrow${status === s ? ' routes-filters__btn--active' : ''}`}
                  onClick={() => update(origin, destination, s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {Object.entries(grouped).map(([city, cityRoutes]) => (
            <div className="routes-group" key={city}>
              <span className="eyebrow routes-group__label">{city}</span>
              <div className="routes-group__list">
                {cityRoutes.map((r, i) => {
                  const origin = airportById.get(r.originId)
                  const destination = airportById.get(r.destinationId)
                  return (
                    <Reveal key={r.id} delay={(i % 4) * 40}>
                      <Link to={`/routes/${r.id}`} className="route-row">
                        <span className="route-row__pair">
                          {origin?.iata} → {destination?.iata}
                        </span>
                        <span className="route-row__cities">
                          {origin?.city} → {destination?.city}
                        </span>
                        <span className="route-row__airline eyebrow">
                          {airlineById.get(r.airlineId)?.name}
                        </span>
                        <span className={`route-row__status eyebrow route-row__status--${r.status}`}>
                          {r.status}
                        </span>
                      </Link>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          ))}

          {filtered.length === 0 && <p className="routes-empty">No routes match these filters.</p>}
        </div>
      </section>
    </>
  )
}
