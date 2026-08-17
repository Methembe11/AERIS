export interface Airport {
  id: string
  name: string
  iata: string
  icao: string
  city: string
  region: string
  country: string
  lat: number
  lng: number
  elevationFt: number
  category: 'international' | 'domestic' | 'training'
  established: number
  description: string
  image: string
  facilities: string[]
  runway?: { lengthM: number; widthM: number }
  capacityPerAnnum?: number
  traffic?: { year: number; passengers: number }[]
  infrastructure?: { label: string; value: string }[]
  history?: { year: string; event: string }[]
}

export interface Airline {
  id: string
  name: string
  shortName: string
  iata: string
  icao: string
  country: string
  hq: string
  hub: string
  category: 'international' | 'regional' | 'domestic' | 'low-cost'
  founded: number
  fleetSize: string
  destinations: number
  description: string
  zimbabweConnection: string
  image: string
  logo: string
  routeIds: string[]
}

export interface Aircraft {
  id: string
  model: string
  manufacturer: string
  category: 'narrowbody' | 'widebody' | 'regional' | 'cargo' | 'business'
  firstFlight: number
  rangeNmi: string
  capacity: string
  lengthM: string
  wingspanM: string
  description: string
  image: string
  operatorIds: string[]
}

export type RouteStatus = 'active' | 'seasonal' | 'suspended'

export interface Route {
  id: string
  originId: string
  destinationId: string
  airlineId: string
  aircraftIds: string[]
  frequency: string
  firstRecorded: string
  distanceKm: number
  status: RouteStatus
  history?: { year: string; event: string }[]
}

export type ArticleCategory =
  | 'News'
  | 'Analysis'
  | 'Interview'
  | 'Feature'
  | 'Opinion'
  | 'Photo Essay'

export interface ArticleOutlineItem {
  label: string
  start: number
}

export interface Article {
  id: string
  title: string
  category: ArticleCategory
  date: string
  author: string
  excerpt: string
  heroImage: string
  content: string[]
  airportIds: string[]
  airlineIds: string[]
  aircraftIds: string[]
  routeIds: string[]
  featured?: boolean
  outline?: ArticleOutlineItem[]
}

export interface Source {
  title: string
  publisher: string
  url?: string
  published?: string
  accessed?: string
  confidence?: 'high' | 'medium' | 'low'
}

export interface DevelopmentMilestone {
  year: number
  label: string
  note?: string
}

export interface Development {
  id: string
  title: string
  category: 'Airport Infrastructure' | 'Runway' | 'Terminal' | 'Navigation' | 'Investment' | 'Policy'
  status: 'Planned' | 'In progress' | 'Completed'
  location: string
  start: number
  end?: number
  investment?: string
  capacity?: string
  summary: string
  whatChanged: string[]
  whyItMatters: string[]
  sources: Source[]
  airportIds: string[]
  routeIds: string[]
  articleIds: string[]
  milestones?: DevelopmentMilestone[]
  image: string
}

export interface Career {
  id: string
  title: string
  category: string
  summary: string
  whatTheyDo: string[]
  qualifications: string[]
  trainingPath: string[]
  progression: { level: string; description: string }[]
  institutions: { name: string; note: string }[]
  relatedAirlineIds: string[]
}

export interface ReportChapter {
  title: string
  content: string[]
}

export interface Report {
  id: string
  title: string
  tagline: string
  type: 'free' | 'premium'
  date: string
  description: string
  image: string
  chapters: ReportChapter[]
  downloadUrl?: string
  price?: string
  airlineIds?: string[]
  airportIds?: string[]
}
