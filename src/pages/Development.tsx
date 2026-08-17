import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { PageHero } from '../components/PageHero'
import { SectionHeader } from '../components/SectionHeader'
import { usePageMeta } from '../hooks/usePageMeta'
import { developments } from '../data'
import './Development.css'

const ROADMAP = [
  {
    name: 'Careers',
    description: 'Recruitment pages for airlines, airports and ground handlers operating in Zimbabwe.',
    status: 'Live',
  },
  {
    name: 'Reports',
    description: 'CAAZ, ICAO and IATA publications, aviation statistics and financial statements.',
    status: 'Live',
  },
  {
    name: 'Intelligence',
    description: 'Member-gated analysis, forecasts and proprietary insights.',
    status: 'Next',
  },
  {
    name: 'Data',
    description: 'Programmatic access to routes, fleets and traffic through an open API.',
    status: 'Later',
  },
]

export function DevelopmentPage() {
  usePageMeta(
    'Development — AERIS',
    'What comes next for Zimbabwe\u2019s airports and airspace.',
  )
  return (
    <>
      <PageHero
        label="Development"
        title="What comes next."
        image="/assets/journal/zimbabwe-landscape.jpg"
      />

      <section className="section section--paper">
        <div className="container">
          <Reveal>
            <p className="development-intro">
              AERIS documents the programmes reshaping Zimbabwe&rsquo;s airports and airspace —
              each with its own dossier tracking the change, the investment and the evidence.
            </p>
          </Reveal>

          <Reveal>
            <SectionHeader label="Dossiers" title="Development projects" />
          </Reveal>

          <div className="development-modules">
            {developments.map((d, i) => (
              <Reveal key={d.id} delay={i * 60}>
                <Link to={`/development/${d.id}`} className="development-module development-module--link">
                  <span
                    className={`eyebrow development-module__status development-module__status--${d.status
                      .toLowerCase()
                      .replace(' ', '-')}`}
                  >
                    {d.status}
                  </span>
                  <h3 className="development-module__name">{d.title}</h3>
                  <p className="development-module__text">{d.summary}</p>
                  <span className="development-module__meta">
                    {d.location} · {d.start}
                    {d.end ? `–${d.end}` : ' · ongoing'}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="development-roadmap">
              <span className="eyebrow">Roadmap</span>
              <div className="development-modules">
                {ROADMAP.map((m) => (
                  <article key={m.name} className="development-module">
                    <span
                      className={`eyebrow development-module__status development-module__status--${m.status.toLowerCase()}`}
                    >
                      {m.status}
                    </span>
                    <h3 className="development-module__name">{m.name}</h3>
                    <p className="development-module__text">{m.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="development-cta">
              <p className="development-cta__text">
                Meanwhile, the core ledger is live — explore carriers, gateways, machines and the routes
                that link them.
              </p>
              <Link to="/routes" className="btn btn--dark">Explore the routes</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
