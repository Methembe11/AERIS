import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import './NotFound.css'

export function NotFoundPage() {
  usePageMeta('Page not found — AERIS')
  return (
    <section className="not-found">
      <div className="container not-found__inner">
        <span className="eyebrow not-found__eyebrow">404 · Lost in flight</span>
        <h1 className="not-found__title">This airspace doesn't exist.</h1>
        <p className="not-found__text">
          The page you're looking for has been rerouted. It may have moved, or never taken off.
        </p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--solid">
            Return home
          </Link>
          <Link to="/routes" className="btn btn--outline">
            Explore the network
          </Link>
        </div>
      </div>
    </section>
  )
}
