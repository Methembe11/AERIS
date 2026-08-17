import { useState } from 'react'
import { PageHero } from '../components/PageHero'
import { EntityCard } from '../components/EntityCard'
import { Reveal } from '../components/Reveal'
import { usePageMeta } from '../hooks/usePageMeta'
import { airlines } from '../data'
import './Directory.css'

const FILTERS = ['All', 'International', 'Regional', 'Domestic'] as const

export function AirlinesPage() {
  usePageMeta(
    'Airlines — AERIS',
    'The carriers connecting Zimbabwe to the world.',
  )
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')

  const filtered = airlines.filter((a) => {
    if (filter === 'All') return true
    if (filter === 'Domestic') return a.category === 'domestic' || a.category === 'low-cost'
    return a.category === filter.toLowerCase()
  })

  return (
    <>
      <PageHero
        label="Airlines"
        title="The carriers connecting Zimbabwe to the world."
        image="/assets/airlines/ethiopian.jpg"
      />

      <section className="section section--paper">
        <div className="container">
          <div className="directory-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`directory-filters__btn eyebrow${filter === f ? ' directory-filters__btn--active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="directory-grid">
            {filtered.map((airline, i) => (
              <Reveal key={airline.id} delay={(i % 3) * 60}>
                <EntityCard
                  title={airline.name}
                  to={`/airlines/${airline.id}`}
                  image={airline.image}
                  code={airline.iata}
                  meta={[airline.category.toUpperCase(), airline.hq]}
                  description={airline.zimbabweConnection}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
