import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { airports, zimbabweAirports } from '../data'
import './ExploreBar.css'

export function ExploreBar() {
  const navigate = useNavigate()
  const [from, setFrom] = useState(zimbabweAirports[0]?.id ?? '')
  const [to, setTo] = useState(airports.find((a) => a.country !== 'Zimbabwe')?.id ?? '')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    navigate(`/routes?from=${from}&to=${to}`)
  }

  return (
    <form className="explore-bar" onSubmit={submit}>
      <div className="explore-bar__fields">
        <div className="explore-bar__field">
          <label className="explore-bar__label" htmlFor="explore-from">
            From
          </label>
          <select
            id="explore-from"
            className="explore-bar__select"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {zimbabweAirports.map((a) => (
              <option key={a.id} value={a.id}>
                {a.city} ({a.iata})
              </option>
            ))}
          </select>
        </div>

        <div className="explore-bar__field">
          <label className="explore-bar__label" htmlFor="explore-to">
            To
          </label>
          <select
            id="explore-to"
            className="explore-bar__select"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            {airports.map((a) => (
              <option key={a.id} value={a.id}>
                {a.country === 'Zimbabwe' ? a.city : `${a.city} · ${a.country}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="explore-bar__btn">
        Explore route
      </button>
    </form>
  )
}
