import { Link } from 'react-router-dom'
import { BrandLogo } from './BrandLogo'
import './Footer.css'

const JOURNAL_LINKS = [
  { to: '/journal', label: 'Journal' },
  { to: '/airlines', label: 'Airlines' },
  { to: '/airports', label: 'Airports' },
  { to: '/aircraft', label: 'Aircraft' },
  { to: '/routes', label: 'Routes' },
  { to: '/development', label: 'Development' },
  { to: '/careers', label: 'Careers' },
  { to: '/reports', label: 'Reports' },
]

const COLUMNS: { title: string; items: { to?: string; label: string }[] }[] = [
  { title: 'Explore', items: [{ to: '/journal', label: 'Journal' }, { to: '/routes', label: 'Route network' }, { to: '/airports', label: 'Airports' }, { to: '/aircraft', label: 'Aircraft' }] },
  { title: 'Intelligence', items: [{ to: '/reports', label: 'Reports' }, { to: '/development', label: 'Development' }, { to: '/airlines', label: 'Airlines' }, { to: '/careers', label: 'Careers' }] },
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <BrandLogo className="brand-logo--footer" />
            </Link>
            <p className="footer__tagline">Zimbabwe's aviation intelligence platform.</p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            <div className="footer__col">
              <span className="footer__heading">Journal</span>
              {JOURNAL_LINKS.map((item) => (
                <Link key={item.label} to={item.to} className="footer__link">
                  {item.label}
                </Link>
              ))}
            </div>

            {COLUMNS.map((col) => (
              <div className="footer__col" key={col.title}>
                <span className="footer__heading">{col.title}</span>
                {col.items.map((item) =>
                  item.to ? (
                    <Link key={item.label} to={item.to} className="footer__link">
                      {item.label}
                    </Link>
                  ) : (
                    <span key={item.label} className="footer__link footer__link--muted">
                      {item.label}
                    </span>
                  ),
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <span className="footer__copyright">© 2026 AERIS</span>
          <span className="footer__built">Built in Zimbabwe</span>
        </div>
      </div>
    </footer>
  )
}
