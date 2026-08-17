import { Link, Navigate, useParams } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { usePageMeta } from '../hooks/usePageMeta'
import { careerById, airlineById } from '../data'
import './Careers.css'

export function CareerDetailPage() {
  const { careerId } = useParams()
  const career = careerId ? careerById.get(careerId) : undefined
  usePageMeta(
    career ? `${career.title} — AERIS Careers` : 'Careers — AERIS',
    career ? `The path to becoming ${career.title} in Zimbabwe's aviation industry.` : undefined,
  )

  if (!career) return <Navigate to="/careers" replace />

  const airlines = career.relatedAirlineIds
    .map((id) => airlineById.get(id))
    .filter((a) => a !== undefined)

  return (
    <>
      <section className="career-hero">
        <div className="container-wide career-hero__content">
          <span className="eyebrow career-hero__eyebrow">{career.category}</span>
          <h1 className="career-hero__title">{career.title}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <p className="career-lead">{career.summary}</p>
          </Reveal>

          <div className="career-columns">
            <Reveal>
              <div className="career-block">
                <h2 className="career-block__title">What they do</h2>
                <ul className="career-list">
                  {career.whatTheyDo.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="career-block">
                <h2 className="career-block__title">Qualifications</h2>
                <ul className="career-list">
                  {career.qualifications.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <Reveal>
            <div className="career-block">
              <h2 className="career-block__title">The training path</h2>
              <ol className="career-steps">
                {career.trainingPath.map((step) => (
                  <li key={step}>
                    <span className="career-steps__text">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal>
            <div className="career-block career-progression">
              <h2 className="career-block__title">Career progression</h2>
              <div className="career-progression__grid">
                {career.progression.map((level) => (
                  <div key={level.level} className="career-progression__item">
                    <h3 className="career-progression__level">{level.level}</h3>
                    <p className="career-progression__text">{level.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="career-block">
              <h2 className="career-block__title">Where to train</h2>
              <div className="career-institutions">
                {career.institutions.map((inst) => (
                  <div key={inst.name} className="career-institution">
                    <h3 className="career-institution__name">{inst.name}</h3>
                    <p className="career-institution__note">{inst.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {airlines.length > 0 && (
            <Reveal>
              <div className="career-block career-employers">
                <span className="eyebrow">Who employs this role</span>
                <div className="career-employers__list">
                  {airlines.map((a) => (
                    <Link key={a.id} to={`/airlines/${a.id}`} className="profile-chip">
                      <span className="eyebrow">{a.iata}</span>
                      {a.name}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          <Reveal>
            <div className="career-back">
              <Link to="/careers" className="link-arrow">All careers</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
