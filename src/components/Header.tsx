import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { airlines, airports, aircraft, activeRoutes, featuredArticle } from '../data'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { BrandLogo } from './BrandLogo'
import { ExploreBar } from './ExploreBar'
import './Header.css'

interface HeaderProps {
  onOpenSearch: () => void
}

const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

function toWords(n: number): string {
  if (n < 20) return ONES[n]
  const t = Math.floor(n / 10)
  const o = n % 10
  return o === 0 ? TENS[t] : `${TENS[t]} ${ONES[o].toLowerCase()}`
}

function navSub(count: number, noun: string): string {
  return `${toWords(count)} ${noun}`
}

const NAV = [
  { to: '/', label: 'Home', sub: 'The vantage point' },
  { to: '/journal', label: 'Journal', sub: 'Stories & analysis' },
  { to: '/airlines', label: 'Airlines', sub: navSub(airlines.length, 'carriers') },
  { to: '/airports', label: 'Airports', sub: navSub(airports.length, 'gateways') },
  { to: '/aircraft', label: 'Aircraft', sub: navSub(aircraft.length, 'types in service') },
  { to: '/routes', label: 'Routes', sub: navSub(activeRoutes.length, 'connections') },
  { to: '/development', label: 'Development', sub: 'What comes next' },
]

const QUICK = [
  { to: '/airlines', label: 'Airlines' },
  { to: '/airports', label: 'Airports' },
  { to: '/aircraft', label: 'Aircraft' },
  { to: '/routes', label: 'Routes' },
  { to: '/careers', label: 'Careers' },
  { to: '/reports', label: 'Reports' },
]

export function Header({ onOpenSearch }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const navPanelRef = useRef<HTMLDivElement>(null)

  useFocusTrap(navPanelRef, menuOpen)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      <header className="main-header">
        <div className="header__top container-wide">
        <div className="header__left">
          <button
            className="header__hamburger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg className="icon--burger" viewBox="0 0 28 24">
              <title>Menu</title>
              <path d="M4 4h20v1H4zM4 11h20v1H4zM4 18h20v1H4z" />
            </svg>
            <svg className="icon--burger-thick" viewBox="0 0 28 24">
              <title>Menu</title>
              <path d="M4 16.8h20V19H4Zm0-6.5h20v2.4H4ZM4 4h20v2.4H4Z" />
            </svg>
            <span className="header__hamburger-label">Menu</span>
          </button>

          <button className="header__search" aria-label="Search the Ledger" onClick={onOpenSearch}>
            <svg viewBox="0 0 24 24" className="icon--search">
              <circle cx="10.6" cy="10.6" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
              <path fill="none" stroke="currentColor" d="m16.3 16.3 5.8 5.8" />
            </svg>
          </button>
        </div>

        <ExploreBar />
      </div>

      <div
        className={`global-nav${menuOpen ? ' global-nav--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <div className="global-nav__backdrop" onClick={() => setMenuOpen(false)} />

        <div className="global-nav__panel" ref={navPanelRef}>
          <div className="global-nav__head">
            <button className="global-nav__close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <svg enableBackground="new 0 0 24 24" viewBox="0 0 24 24">
                <title>Close</title>
                <path d="m3.3 21.7 9-9.1 9.1 9.1.4-.4-9-9.1 9-9.1-.4-.4-9.1 9.1-9-9.1-.5.4 9.1 9.1-9.1 9.1z" />
              </svg>
            </button>
            <div className="global-nav__logo">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                <BrandLogo className="brand-logo--header" />
              </Link>
            </div>
          </div>

          <div className="global-nav__body">
            <nav className="global-nav__nav" aria-label="Primary">
              <ul className="global-nav__list">
                {NAV.map((item) => (
                  <li key={item.to} className="global-nav__item">
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `global-nav__link${isActive ? ' global-nav__link--active' : ''}`
                      }
                    >
                      <span className="global-nav__link-label">{item.label}</span>
                      <span className="global-nav__link-sub">{item.sub}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <aside className="global-nav__featured">
              <p className="global-nav__featured-label eyebrow">Featured</p>
              <Link to={`/journal/${featuredArticle.id}`} className="global-nav__featured-card">
                <span className="global-nav__featured-media">
                  <img src={featuredArticle.heroImage} alt="" />
                </span>
                <span className="global-nav__featured-title">{featuredArticle.title}</span>
                <span className="link-arrow">Read story</span>
              </Link>
              <div className="global-nav__quick">
                {QUICK.map((q) => (
                  <Link key={q.to} to={q.to} className="global-nav__quick-btn">
                    {q.label}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </header>

    <div className="header__brand-row">
      <Link to="/" className="header__brand">
        <BrandLogo className="brand-logo--header" />
      </Link>
    </div>
  </>
  )
}
