import { PageHero } from '../components/PageHero'
import { EntityCard } from '../components/EntityCard'
import { Reveal } from '../components/Reveal'
import { usePageMeta } from '../hooks/usePageMeta'
import { zimbabweAirports } from '../data'
import './Directory.css'

export function AirportsPage() {
  usePageMeta(
    'Airports — AERIS',
    'The gateways to Zimbabwe.',
  )
  return (
    <>
      <PageHero
        label="Airports"
        title="The gateways to Zimbabwe."
        image="/assets/airports/victoria-falls.jpg"
      />

      <section className="section section--paper">
        <div className="container">
          <div className="directory-grid">
            {zimbabweAirports.map((airport, i) => (
              <Reveal key={airport.id} delay={(i % 3) * 60}>
                <EntityCard
                  title={airport.city}
                  to={`/airports/${airport.id}`}
                  image={airport.image}
                  code={airport.iata}
                  meta={[airport.category.toUpperCase(), airport.icao]}
                  description={airport.description}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
