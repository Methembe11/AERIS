import type { Development } from '../types'

export const developments: Development[] = [
  {
    id: 'victoria-falls-airport-expansion',
    title: 'Victoria Falls Airport Expansion',
    category: 'Airport Infrastructure',
    status: 'Completed',
    location: 'Victoria Falls',
    start: 2018,
    end: 2020,
    investment: 'US$150 million',
    capacity: '1.5 million passengers per annum',
    summary:
      'A new international terminal and a 4,000-metre runway capable of accepting the largest wide-body aircraft, completed ahead of the peak tourism season.',
    whatChanged: [
      'A new international terminal with capacity for 1.5 million passengers a year, up from roughly 500,000.',
      'A 4,000-metre runway, extended and resurfaced to accept any wide-body aircraft in service today.',
      'A new control tower and upgraded apron, airfield lighting and navigational aids.',
      'Boeing 787 Dreamliner and Airbus A350 services began almost immediately after completion.',
    ],
    whyItMatters: [
      'Victoria Falls sits at the centre of Southern Africa\'s tourism belt, within two hours of eight regional capitals.',
      'The runway gave the destination direct long-haul access to the Gulf, Europe and Asia for the first time.',
      'The expansion turned a regional airfield into a wide-body gateway, reshaping Zimbabwe\'s two-hub system.',
    ],
    sources: [
      { title: 'Victoria Falls Airport master plan and expansion records', publisher: 'Airports Company of Zimbabwe (ACZ)', confidence: 'high' },
      { title: 'Runway and terminal construction programme', publisher: 'Civil Aviation Authority of Zimbabwe (CAAZ)', confidence: 'high' },
    ],
    airportIds: ['victoria-falls'],
    routeIds: ['vfa-add-ethiopian', 'vfa-doh-qatar', 'vfa-jnb-airlink'],
    articleIds: ['victoria-falls-emerges-as-most-important-gateway', 'new-geography-of-zimbabwean-aviation'],
    milestones: [
      { year: 2016, label: 'Funding secured', note: 'Government-backed financing agreed' },
      { year: 2018, label: 'Construction begins', note: 'Runway extension and terminal works start' },
      { year: 2020, label: 'Completed', note: 'Wide-body operations commence' },
      { year: 2022, label: 'Dreamliner services arrive' },
    ],
    image: '/assets/airports/victoria-falls.jpg',
  },
  {
    id: 'harare-terminal-redevelopment',
    title: 'Robert Gabriel Mugabe International Terminal Redevelopment',
    category: 'Terminal',
    status: 'In progress',
    location: 'Harare',
    start: 2021,
    investment: 'US$153 million',
    capacity: '2.5 million passengers per annum',
    summary:
      'A phased redevelopment of the international terminal at Zimbabwe\'s principal gateway, modernising arrivals, departures and aerobridges.',
    whatChanged: [
      'Expanded international departures hall with additional check-in capacity.',
      'New arrivals and immigration processing areas.',
      'Additional aerobridges and airside equipment.',
      'Modernised baggage handling and public facilities.',
    ],
    whyItMatters: [
      'Harare carries the majority of the country\'s international traffic and diplomacy.',
      'Terminal capacity has been a binding constraint on airline growth and tourism targets.',
      'Completion positions Harare to absorb long-haul wide-body traffic alongside Victoria Falls.',
    ],
    sources: [
      { title: 'International terminal upgrade programme', publisher: 'Airports Company of Zimbabwe (ACZ)', confidence: 'high' },
      { title: 'Project status briefings', publisher: 'Ministry of Transport and Infrastructural Development', confidence: 'medium' },
    ],
    airportIds: ['harare'],
    routeIds: ['hre-doh-qatar', 'hre-dxb-emirates', 'hre-add-ethiopian'],
    articleIds: ['new-geography-of-zimbabwean-aviation'],
    milestones: [
      { year: 2021, label: 'Works commence', note: 'Phased construction begins' },
      { year: 2023, label: 'Phase one complete', note: 'Departures capacity expanded' },
      { year: 2026, label: 'Current', note: 'Phased completion ongoing' },
    ],
    image: '/assets/airports/harare.jpg',
  },
  {
    id: 'joshua-nkomo-terminal-expansion',
    title: 'Joshua Mqabuko Nkomo International Terminal Expansion',
    category: 'Terminal',
    status: 'Planned',
    location: 'Bulawayo',
    start: 2026,
    investment: 'US$110 million',
    capacity: '1.5 million passengers per annum',
    summary:
      'A planned expansion of Bulawayo\'s international terminal and apron to restore the city\'s place as a second domestic and regional hub.',
    whatChanged: [
      'New international terminal facilities for the regional network.',
      'Reconfigured apron and taxiway works to support larger regional jets.',
      'Upgraded passenger processing and commercial space.',
    ],
    whyItMatters: [
      'Bulawayo is Zimbabwe\'s second city and a manufacturing hub with strong regional trade links.',
      'Restoring direct regional connectivity would relieve pressure on the Harare gateway.',
      'The expansion underpins plans to grow domestic frequencies to the city.',
    ],
    sources: [
      { title: 'Airport development programme', publisher: 'Airports Company of Zimbabwe (ACZ)', confidence: 'medium' },
    ],
    airportIds: ['bulawayo'],
    routeIds: ['buq-jnb-airlink', 'hre-buq-fastjet'],
    articleIds: [],
    milestones: [
      { year: 2026, label: 'Planned start' },
    ],
    image: '/assets/airports/bulawayo.jpg',
  },
  {
    id: 'navaids-modernisation-programme',
    title: 'Zimbabwe Navigation Aids Modernisation',
    category: 'Navigation',
    status: 'In progress',
    location: 'National',
    start: 2023,
    investment: 'US$40 million',
    summary:
      'A national programme to replace legacy navigation aids with modern satellite-era infrastructure across the main airports.',
    whatChanged: [
      'Replacement of legacy non-directional beacons and VOR/DME equipment.',
      'Introduction of modern approach and landing systems.',
      'Renewed air traffic surveillance and communications equipment.',
    ],
    whyItMatters: [
      'Older navigational infrastructure limits approach capability in poor weather.',
      'Modernised airspace equipment is a prerequisite for growing frequency and capacity.',
      'Regulatory compliance with ICAO standards depends on the renewal programme.',
    ],
    sources: [
      { title: 'Air navigation services programme', publisher: 'Civil Aviation Authority of Zimbabwe (CAAZ)', confidence: 'high' },
    ],
    airportIds: ['harare', 'victoria-falls', 'bulawayo'],
    routeIds: [],
    articleIds: [],
    image: '/assets/journal/runway.jpg',
  },
]
