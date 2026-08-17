import { Link, Navigate, useParams } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { usePageMeta } from '../hooks/usePageMeta'
import { reportById } from '../data'
import './Reports.css'

export function ReportReaderPage() {
  const { reportId } = useParams()
  const report = reportId ? reportById.get(reportId) : undefined
  usePageMeta(
    report ? `${report.title} — AERIS` : 'Reports — AERIS',
    report?.tagline,
  )

  if (!report) return <Navigate to="/reports" replace />

  const premium = report.type === 'premium'

  return (
    <>
      <section className="report-reader-hero">
        <div className="container-wide report-reader-hero__content">
          <span className="eyebrow report-reader-hero__kicker">
            {premium ? `Premium research · ${report.price}` : 'Free brief'}
          </span>
          <h1 className="report-reader-hero__title">{report.title}</h1>
          <p className="report-reader-hero__tagline">{report.tagline}</p>
          <span className="report-reader-hero__meta">{report.date}</span>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="report-reader__intro">
              <p>{report.description}</p>
              <div className="report-reader__actions">
                {premium ? (
                  <a href="mailto:hello@aeris.zw?subject=Research request" className="btn btn--dark">
                    Request a copy
                  </a>
                ) : (
                  <a href={report.downloadUrl} className="btn btn--dark">Download PDF</a>
                )}
                <Link to="/reports" className="link-arrow">All reports</Link>
              </div>
            </div>
          </Reveal>

          <div className="report-reader__chapters">
            {report.chapters.map((chapter, i) => (
              <Reveal key={chapter.title} delay={Math.min(i, 4) * 40}>
                <article className="report-chapter">
                  <span className="report-chapter__number">{String(i + 1).padStart(2, '0')}</span>
                  <div className="report-chapter__body">
                    <h2 className="report-chapter__title">{chapter.title}</h2>
                    {chapter.content.map((para) => (
                      <p key={para} className="report-chapter__para">{para}</p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="report-reader__footer">
              <p className="report-reader__footer-text">
                AERIS publications are research aids, not advice. Sources are documented
                in each report.
              </p>
              <Link to="/reports" className="link-arrow">Back to reports</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
