import { Link } from 'react-router-dom'
import { ArticleCard } from '../components/ArticleCard'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { EntityCard } from '../components/EntityCard'
import { useCountUp } from '../hooks/useCountUp'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { usePageMeta } from '../hooks/usePageMeta'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useReveal } from '../hooks/useReveal'
import { articles, airlines, aircraft, zimbabweAirports, featuredArticle, ledgerStats } from '../data'
import './Home.css'

function StatCounter({ value, label, to }: { value: number; label: string; to: string }) {
  const { ref, visible } = useReveal<HTMLAnchorElement>()
  const count = useCountUp(value, 1400, visible)

  return (
    <Link to={to} className="stat" ref={ref}>
      <span className="stat__number">{count.toString().padStart(2, '0')}</span>
      <span className="stat__label eyebrow">{label}</span>
    </Link>
  )
}

export function HomePage() {
  usePageMeta(
    "AERIS — Zimbabwe's Aviation Intelligence Platform",
    "AERIS — Zimbabwe's aviation intelligence platform. The people, routes, aircraft and infrastructure shaping the country's connection to the world.",
  )
  const recent = articles.slice(0, 3)
  const featured = featuredArticle
  const heroAirports = zimbabweAirports.filter((a) =>
    ['harare', 'victoria-falls', 'bulawayo', 'kariba'].includes(a.id),
  )
  const reduceMotion = usePrefersReducedMotion()
  const isNarrow = useMediaQuery('(max-width: 760px)')
  const useVideo = !reduceMotion && !isNarrow

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="home-hero">
        <div className="home-hero__videos">
          <figure className="home-hero__frame home-hero__frame--landscape">
            {useVideo ? (
              <video
                className="home-hero__video"
                src="/assets/video/qatar-runway.mp4"
                poster="/assets/video/qatar-runway-poster.jpg"
                preload="metadata"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                className="home-hero__media"
                src="/assets/video/qatar-runway-poster.jpg"
                alt="Qatar Airways aircraft on the runway"
                fetchPriority="high"
              />
            )}
            <div className="home-hero__scrim" />
            <div className="home-hero__content">
              <span className="home-hero__eyebrow eyebrow">AERIS · Zimbabwe</span>
              <h1 className="home-hero__title">
                Zimbabwe's
                <br />
                Aviation Landscape
              </h1>
              <p className="home-hero__sub">
                The people, routes, aircraft and infrastructure shaping the country's connection to the world.
              </p>
            </div>
          </figure>
          <figure className="home-hero__frame home-hero__frame--media">
            <img
              className="home-hero__media"
              src="/assets/journal/harare-rgm.jpg"
              alt="Robert Gabriel Mugabe International Airport"
            />
          </figure>
          <figure className="home-hero__frame home-hero__frame--media">
            <img
              className="home-hero__media"
              src="/assets/journal/bulawayo-jmn.jpg"
              alt="Joshua Mqabuko Nkomo International Airport"
            />
          </figure>
        </div>
      </section>

      {/* ── THE LEDGER AT A GLANCE ───────────────────── */}
      <section className="section section--paper" id="journal">
        <div className="container">
          <div className="section-label">
            <span className="eyebrow">The Ledger</span>
          </div>
          <Reveal>
            <p className="glance__intro">
              A snapshot of Zimbabwe's aviation network.
              <br />
              <span className="glance__hint">Not static numbers — live intelligence counters.</span>
            </p>
          </Reveal>
          <div className="glance__stats">
            <StatCounter value={ledgerStats.airports} label="Airports" to="/airports" />
            <StatCounter value={ledgerStats.airlines} label="Airlines" to="/airlines" />
            <StatCounter value={ledgerStats.routes} label="Routes" to="/routes" />
            <StatCounter value={ledgerStats.aircraft} label="Aircraft" to="/aircraft" />
          </div>
        </div>
      </section>

      {/* ── FEATURED STORY ───────────────────────────── */}
      <section className="home-featured">
        <Reveal>
          <Link to={`/journal/${featured.id}`} className="home-featured__link">
            <div className="home-featured__media">
              <img src={featured.heroImage} alt="" />
            </div>
            <div className="home-featured__body">
              <div className="container">
                <span className="eyebrow home-featured__eyebrow">
                  Featured · {featured.category}
                </span>
                <h2 className="home-featured__title">{featured.title}</h2>
                <p className="home-featured__excerpt">{featured.excerpt}</p>
                <span className="link-arrow">Read story</span>
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ── JOURNAL PREVIEW ──────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHeader label="Journal" title="Stories from Zimbabwe's aviation industry." to="/journal" />
          <div className="journal-grid">
            {recent.map((article, i) => (
              <Reveal key={article.id} delay={i * 80}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── AIRPORTS PREVIEW ─────────────────────────── */}
      <section className="section section--ink home-airports">
        <div className="container-wide">
          <SectionHeader label="Airports" title="The gateways to Zimbabwe." to="/airports" />
          <div className="home-airports__grid">
            {heroAirports.map((airport, i) => (
              <Reveal key={airport.id} delay={i * 60}>
                <EntityCard
                  title={airport.city}
                  to={`/airports/${airport.id}`}
                  image={airport.image}
                  code={airport.iata}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── AIRLINES PREVIEW ─────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHeader label="Airlines" title="The carriers connecting Zimbabwe to the world." to="/airlines" />
          <div className="home-airlines">
            {airlines.slice(0, 4).map((airline, i) => (
              <Reveal key={airline.id} delay={i * 60}>
                <Link to={`/airlines/${airline.id}`} className="home-airline">
                  <span className="home-airline__index eyebrow">0{i + 1}</span>
                  <span className="home-airline__name">{airline.name}</span>
                  <span className="home-airline__code eyebrow">{airline.iata}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── AIRCRAFT PREVIEW ─────────────────────────── */}
      <section className="section section--terracotta">
        <div className="container-wide">
          <SectionHeader label="Aircraft" title="The machines connecting Zimbabwe." to="/aircraft" />
          <div className="home-aircraft">
            {aircraft.slice(0, 3).map((a, i) => (
              <Reveal key={a.id} delay={i * 80}>
                <Link to={`/aircraft/${a.id}`} className="home-aircraft__card">
                  <div className="home-aircraft__media">
                    <img src={a.image} alt={a.model} loading="lazy" />
                  </div>
                  <span className="home-aircraft__name">{a.model}</span>
                  <span className="home-aircraft__meta eyebrow">
                    {a.category} · {a.manufacturer}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROUTES CTA ───────────────────────────────── */}
      <section className="section">
        <div className="container routes-cta">
          <Reveal>
            <div className="routes-cta__inner">
              <span className="eyebrow">Routes</span>
              <h2 className="routes-cta__title">Mapping Zimbabwe's connections.</h2>
              <p className="routes-cta__text">
                From the daily Dreamliner to Addis Ababa to the seasonal turboprop over Kariba — every
                route, every aircraft, every carrier in one interconnected network.
              </p>
              <Link to="/routes" className="btn btn--solid">
                Explore the network
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
