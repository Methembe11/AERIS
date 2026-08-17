import { useState } from 'react'
import { PageHero } from '../components/PageHero'
import { EntityCard } from '../components/EntityCard'
import { Reveal } from '../components/Reveal'
import { usePageMeta } from '../hooks/usePageMeta'
import { aircraft } from '../data'
import './Directory.css'

const CATEGORIES = ['All', 'Narrowbody', 'Widebody', 'Regional', 'Business'] as const

export function AircraftPage() {
  usePageMeta(
    'Aircraft — AERIS',
    'The machines connecting Zimbabwe.',
  )
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('All')

  const filtered = aircraft.filter((a) => filter === 'All' || a.category === filter.toLowerCase())

  return (
    <>
      <PageHero
        label="Aircraft"
        title="The machines connecting Zimbabwe."
        image="/assets/aircraft/a350-900.jpg"
      />

      <section className="section section--paper">
        <div className="container">
          <div className="directory-filters">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`directory-filters__btn eyebrow${filter === c ? ' directory-filters__btn--active' : ''}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="directory-grid">
            {filtered.map((a, i) => (
              <Reveal key={a.id} delay={(i % 3) * 60}>
                <EntityCard
                  title={a.model}
                  to={`/aircraft/${a.id}`}
                  image={a.image}
                  meta={[a.category.toUpperCase(), a.manufacturer]}
                  description={`${a.capacity} seats · ${a.rangeNmi} nmi range`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
