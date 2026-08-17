import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { SearchResult } from '../data'
import { searchLedger } from '../data'
import { useFocusTrap } from '../hooks/useFocusTrap'
import './SearchOverlay.css'

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useFocusTrap(panelRef, open)

  useEffect(() => {
    if (open) {
      setQuery('')
      setResults([])
      setActiveIndex(-1)
      setTimeout(() => inputRef.current?.focus(), 320)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        const delta = e.key === 'ArrowDown' ? 1 : -1
        setActiveIndex((i) => {
          if (results.length === 0) return -1
          const next = i + delta
          if (next < 0) return results.length - 1
          if (next >= results.length) return 0
          return next
        })
      }
      if (e.key === 'Enter' && activeIndex >= 0 && activeIndex < results.length) {
        const active = results[activeIndex]
        onClose()
        navigate(active.to)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, results, activeIndex, onClose, navigate])

  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return
    const el = listRef.current.querySelectorAll<HTMLAnchorElement>('[data-search-index]')[activeIndex]
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const handleChange = (value: string) => {
    setQuery(value)
    setResults(searchLedger(value))
    setActiveIndex(-1)
  }

  const grouped = useMemo(() => {
    const acc = results.reduce<Record<string, SearchResult[]>>((m, r) => {
      m[r.type] = m[r.type] ?? []
      m[r.type].push(r)
      return m
    }, {})
    return Object.entries(acc)
  }, [results])

  const total = results.length

  return (
    <div
      className={`search${open ? ' search--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Search the Ledger"
    >
      <div className="search__backdrop" onClick={onClose} />
      <div className="search__panel" ref={panelRef}>
        <div className="search__head">
          <button className="search__close" onClick={onClose} aria-label="Close search">
            <svg enableBackground="new 0 0 24 24" viewBox="0 0 24 24">
              <title>Close</title>
              <path d="m3.3 21.7 9-9.1 9.1 9.1.4-.4-9-9.1 9-9.1-.4-.4-9.1 9.1-9-9.1-.5.4 9.1 9.1-9.1 9.1z" />
            </svg>
          </button>
        </div>

        <input
          ref={inputRef}
          id="ledger-search"
          className="search__input"
          type="text"
          placeholder="Enter search term"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          autoComplete="off"
          aria-controls="ledger-search-results"
          aria-label="Search the Ledger"
        />

        <div className="search__meta" aria-live="polite">
          {query.trim().length >= 2 && (
            <span className="search__meta-count">
              {total === 0 ? 'No matches' : `${total} result${total === 1 ? '' : 's'}`}
            </span>
          )}
          {total > 0 && <span className="search__meta-hint">↑↓ to navigate · Enter to open</span>}
        </div>

        <div id="ledger-search-results" className="search__results" ref={listRef}>
          {query.trim().length > 0 && query.trim().length < 2 && (
            <p className="search__empty">Keep typing to search the entire Ledger.</p>
          )}

          {query.trim().length >= 2 && total === 0 && (
            <p className="search__empty">No matches in the Ledger. Try another term.</p>
          )}

          {grouped.map(([type, items]) => (
            <div className="search__group" key={type}>
              <span className="search__group-label">
                {type} · {items.length}
              </span>
              {items.map((r) => {
                const flatIndex = results.indexOf(r)
                return (
                  <Link
                    key={`${type}-${r.id}`}
                    to={r.to}
                    className={`search__result${flatIndex === activeIndex ? ' search__result--active' : ''}`}
                    data-search-index={flatIndex}
                    onMouseEnter={() => setActiveIndex(flatIndex)}
                    onClick={onClose}
                  >
                    <span className="search__result-title">{r.title}</span>
                    <span className="search__result-sub">{r.subtitle}</span>
                  </Link>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
