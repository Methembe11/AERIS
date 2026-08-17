import type { Aircraft, Airline, Airport, Article, Development, Report, Route } from '../types'
import { airports } from './airports'
import { airlines } from './airlines'
import { aircraft } from './aircraft'
import { routes } from './routes'
import { articles } from './articles'
import { developments } from './developments'
import { careers } from './careers'
import { reports } from './reports'

export { airports, airlines, aircraft, routes, articles, developments, careers, reports }

export const airportById = new Map(airports.map((a) => [a.id, a]))
export const airlineById = new Map(airlines.map((a) => [a.id, a]))
export const aircraftById = new Map(aircraft.map((a) => [a.id, a]))
export const routeById = new Map(routes.map((r) => [r.id, r]))
export const articleById = new Map(articles.map((a) => [a.id, a]))
export const developmentById = new Map(developments.map((d) => [d.id, d]))
export const careerById = new Map(careers.map((c) => [c.id, c]))
export const reportById = new Map(reports.map((r) => [r.id, r]))

export const zimbabweAirports = airports.filter((a) => a.country === 'Zimbabwe')

export const activeRoutes = routes.filter((r) => r.status === 'active')

export const developmentsForAirport = (airportId: string): Development[] =>
  developments.filter((d) => d.airportIds.includes(airportId))

export const reportsForAirline = (airlineId: string): Report[] =>
  reports.filter((r) => r.airlineIds?.includes(airlineId))

export const reportsForAirport = (airportId: string): Report[] =>
  reports.filter((r) => r.airportIds?.includes(airportId))

export const freeReports = reports.filter((r) => r.type === 'free')
export const premiumReports = reports.filter((r) => r.type === 'premium')

export const routesForAirport = (airportId: string): Route[] =>
  routes.filter((r) => r.originId === airportId || r.destinationId === airportId)

export const airlinesForAirport = (airportId: string): Airline[] => {
  const ids = new Set(routesForAirport(airportId).map((r) => r.airlineId))
  return airlines.filter((a) => ids.has(a.id))
}

export const aircraftForAirport = (airportId: string): Aircraft[] => {
  const ids = new Set(
    routesForAirport(airportId).flatMap((r) => r.aircraftIds),
  )
  return aircraft.filter((a) => ids.has(a.id))
}

export const routesForAirline = (airlineId: string): Route[] =>
  routes.filter((r) => r.airlineId === airlineId)

export const routesForAircraft = (aircraftId: string): Route[] =>
  routes.filter((r) => r.aircraftIds.includes(aircraftId))

export const airlinesForAircraft = (aircraftId: string): Airline[] => {
  const ids = new Set(routesForAircraft(aircraftId).map((r) => r.airlineId))
  return airlines.filter((a) => ids.has(a.id))
}

export const airportsForAircraft = (aircraftId: string): Airport[] => {
  const ids = new Set(
    routesForAircraft(aircraftId).flatMap((r) => [r.originId, r.destinationId]),
  )
  return airports.filter((a) => ids.has(a.id))
}

export const articlesForAirport = (airportId: string): Article[] =>
  articles.filter((a) => a.airportIds.includes(airportId))

export const articlesForAirline = (airlineId: string): Article[] =>
  articles.filter((a) => a.airlineIds.includes(airlineId))

export const articlesForAircraft = (aircraftId: string): Article[] =>
  articles.filter((a) => a.aircraftIds.includes(aircraftId))

export const articlesForRoute = (routeId: string): Article[] =>
  articles.filter((a) => a.routeIds.includes(routeId))

export const featuredArticle = articles.find((a) => a.featured) ?? articles[0]

export const ledgerStats = {
  airports: zimbabweAirports.length,
  airlines: airlines.length,
  routes: routes.filter((r) => r.status === 'active').length,
  aircraft: aircraft.length,
}

export interface SearchResult {
  type: 'AIRLINE' | 'AIRPORT' | 'AIRCRAFT' | 'ROUTE' | 'STORY' | 'CAREER' | 'REPORT' | 'DEVELOPMENT'
  id: string
  title: string
  subtitle: string
  to: string
}

export function searchLedger(query: string): SearchResult[] {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []

  const matches = (s: string) => s.toLowerCase().includes(q)

  const results: SearchResult[] = []

  for (const a of airlines) {
    if (matches(a.name) || matches(a.iata)) {
      results.push({
        type: 'AIRLINE',
        id: a.id,
        title: a.name,
        subtitle: a.category.toUpperCase(),
        to: `/airlines/${a.id}`,
      })
    }
  }

  for (const a of airports) {
    if (matches(a.name) || matches(a.iata) || matches(a.city) || matches(a.icao)) {
      results.push({
        type: 'AIRPORT',
        id: a.id,
        title: a.name,
        subtitle: `${a.iata} · ${a.city}, ${a.country}`,
        to: `/airports/${a.id}`,
      })
    }
  }

  for (const a of aircraft) {
    if (matches(a.model) || matches(a.manufacturer)) {
      results.push({
        type: 'AIRCRAFT',
        id: a.id,
        title: a.model,
        subtitle: a.category.toUpperCase(),
        to: `/aircraft/${a.id}`,
      })
    }
  }

  for (const r of routes) {
    const origin = airportById.get(r.originId)
    const destination = airportById.get(r.destinationId)
    if (!origin || !destination) continue
    const label = `${origin.city} → ${destination.city}`
    if (matches(label) || matches(destination.city) || matches(origin.city)) {
      results.push({
        type: 'ROUTE',
        id: r.id,
        title: label,
        subtitle: airlineById.get(r.airlineId)?.name ?? '',
        to: `/routes/${r.id}`,
      })
    }
  }

  for (const a of articles) {
    if (matches(a.title) || matches(a.excerpt)) {
      results.push({
        type: 'STORY',
        id: a.id,
        title: a.title,
        subtitle: `${a.category} · ${a.date}`,
        to: `/journal/${a.id}`,
      })
    }
  }

  for (const c of careers) {
    if (matches(c.title) || matches(c.category) || matches(c.summary)) {
      results.push({
        type: 'CAREER',
        id: c.id,
        title: c.title,
        subtitle: c.category.toUpperCase(),
        to: `/careers/${c.id}`,
      })
    }
  }

  for (const r of reports) {
    if (matches(r.title) || matches(r.tagline)) {
      results.push({
        type: 'REPORT',
        id: r.id,
        title: r.title,
        subtitle: `${r.type === 'premium' ? 'Premium' : 'Free'} · ${r.date}`,
        to: `/reports/${r.id}`,
      })
    }
  }

  for (const d of developments) {
    if (matches(d.title) || matches(d.category) || matches(d.location)) {
      results.push({
        type: 'DEVELOPMENT',
        id: d.id,
        title: d.title,
        subtitle: `${d.category.toUpperCase()} · ${d.location}`,
        to: `/development/${d.id}`,
      })
    }
  }

  return results
}
