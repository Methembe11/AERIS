import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { PageHero } from '../components/PageHero'
import { SectionHeader } from '../components/SectionHeader'
import { usePageMeta } from '../hooks/usePageMeta'
import { freeReports, premiumReports } from '../data'
import './Reports.css'

export function ReportsPage() {
  usePageMeta(
    'Reports — AERIS',
    'Research for the people shaping aviation.',
  )
  const featured = freeReports[0]

  return (
    <>
      <PageHero
        label="Reports"
        title="Research for the people shaping aviation."
        image="/assets/journal/geography.jpg"
      />

      <section className="section section--paper">
        <div className="container">
          <Reveal>
            <p className="reports-intro">
              AERIS publishes the reference material behind its journalism — from free public
              briefs to in-depth market research. Every report cites its sources so you can judge
              the evidence yourself.
            </p>
          </Reveal>

          {featured && (
            <Reveal>
              <Link to={`/reports/${featured.id}`} className="report-feature">
                <div className="report-feature__media">
                  <img src={featured.image} alt="" loading="lazy" />
                </div>
                <div className="report-feature__body">
                  <span className="eyebrow report-feature__kicker">Featured · Free</span>
                  <h2 className="report-feature__title">{featured.title}</h2>
                  <p className="report-feature__tagline">{featured.tagline}</p>
                  <p className="report-feature__description">{featured.description}</p>
                  <span className="report-feature__meta">{featured.date} · {featured.chapters.length} chapters</span>
                </div>
              </Link>
            </Reveal>
          )}

          <Reveal>
            <SectionHeader label="Library" title="Free briefs" />
          </Reveal>

          <div className="reports-grid">
            {freeReports.map((r, i) => (
              <Reveal key={r.id} delay={(i % 3) * 60}>
                <Link to={`/reports/${r.id}`} className="report-card">
                  <div className="report-card__media">
                    <img src={r.image} alt="" loading="lazy" />
                  </div>
                  <div className="report-card__body">
                    <span className="eyebrow report-card__kicker">Free</span>
                    <h3 className="report-card__title">{r.title}</h3>
                    <p className="report-card__description">{r.description}</p>
                    <span className="report-card__meta">{r.date}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <SectionHeader label="In-depth" title="Premium research" />
          </Reveal>

          <div className="reports-grid">
            {premiumReports.map((r, i) => (
              <Reveal key={r.id} delay={(i % 3) * 60}>
                <Link to={`/reports/${r.id}`} className="report-card report-card--premium">
                  <div className="report-card__media">
                    <img src={r.image} alt="" loading="lazy" />
                  </div>
                  <div className="report-card__body">
                    <span className="eyebrow report-card__kicker">Premium · {r.price}</span>
                    <h3 className="report-card__title">{r.title}</h3>
                    <p className="report-card__description">{r.description}</p>
                    <span className="report-card__meta">{r.date}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="reports-cta">
              <p className="reports-cta__text">
                The library grows each quarter. Free briefs are published openly; premium research
                is available on request.
              </p>
              <Link to="/journal" className="btn btn--dark">Read the journal</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
