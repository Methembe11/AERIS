import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { PageHero } from '../components/PageHero'
import { usePageMeta } from '../hooks/usePageMeta'
import { careers } from '../data'
import './Careers.css'

export function CareersPage() {
  usePageMeta(
    'Careers — AERIS',
    "Careers in Zimbabwe's aviation industry.",
  )
  return (
    <>
      <PageHero
        label="Careers"
        title="Careers in Zimbabwe&rsquo;s aviation industry."
        image="/assets/journal/zimbabwe-landscape.jpg"
      />

      <section className="section section--paper">
        <div className="container">
          <Reveal>
            <p className="careers-intro">
              Aviation is one of the most connected industries in the world — and one of the most
              diverse. From the flight deck to the apron, every carrier and airport in Zimbabwe runs
              on a team. Explore the routes into the industry, from first qualification to command.
            </p>
          </Reveal>

          <Reveal>
            <span className="eyebrow careers-intro__label">Explore careers</span>
          </Reveal>

          <div className="careers-grid">
            {careers.map((c, i) => (
              <Reveal key={c.id} delay={(i % 3) * 60}>
                <Link to={`/careers/${c.id}`} className="career-card">
                  <span className="career-card__category eyebrow">{c.category}</span>
                  <h2 className="career-card__title">{c.title}</h2>
                  <p className="career-card__summary">{c.summary}</p>
                  <span className="link-arrow career-card__cta">The path</span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="careers-cta">
              <p className="careers-cta__text">
                AERIS records the carriers and airports where these careers begin.
                Explore the operators themselves to see who is hiring and flying where.
              </p>
              <Link to="/airlines" className="btn btn--dark">Explore airlines</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
