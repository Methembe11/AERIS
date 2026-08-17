import type { Report } from '../types'

export const reports: Report[] = [
  {
    id: 'zimbabwe-aviation-outlook-2026',
    title: 'Zimbabwe Aviation Outlook 2026',
    tagline: 'The annual free brief on where Zimbabwe\'s aviation industry stands.',
    type: 'free',
    date: 'January 2026',
    description:
      'A free, public summary of the state of Zimbabwean aviation — traffic, routes, carriers and infrastructure — drawn from public sources.',
    image: '/assets/journal/runway.jpg',
    downloadUrl: '#',
    airlineIds: ['air-zimbabwe', 'fastjet', 'ethiopian', 'qatar'],
    airportIds: ['harare', 'victoria-falls', 'bulawayo'],
    chapters: [
      {
        title: 'Executive summary',
        content: [
          'Zimbabwe\'s aviation network is being redrawn around two poles — Harare and Victoria Falls. International capacity continues to grow through Gulf and African carriers, while the domestic market has stabilised around a lean, low-cost structure.',
        ],
      },
      {
        title: 'The network',
        content: [
          'Harare remains the principal gateway for diplomacy, trade and regional traffic. Victoria Falls has established itself as a wide-body destination, with direct services to Doha and Addis Ababa.',
          'The domestic market is served by a small number of carriers operating jets and turboprops on the trunk routes between Harare, Bulawayo and Victoria Falls.',
        ],
      },
      {
        title: 'Traffic',
        content: [
          'Passenger numbers have grown steadily from a low base. The largest single airport recorded an estimated 467,000 passengers in 2025, up from roughly 342,000 in 2022.',
          'Headroom remains substantial: terminal and runway capacity at the main gateways exceeds current demand.',
        ],
      },
      {
        title: 'Infrastructure',
        content: [
          'The Victoria Falls expansion is complete and operating. Harare\'s international terminal redevelopment is underway, and further projects are planned across the airport network.',
        ],
      },
    ],
  },
  {
    id: 'zimbabwe-aviation-market-outlook-2026',
    title: 'Zimbabwe Aviation Market Outlook 2026',
    tagline: 'Premium research for the people shaping aviation.',
    type: 'premium',
    date: 'March 2026',
    price: 'US$490',
    description:
      'In-depth market research covering airline economics, connectivity, infrastructure investment and a five-year outlook for Zimbabwean aviation.',
    image: '/assets/journal/geography.jpg',
    airlineIds: ['air-zimbabwe', 'fastjet', 'ethiopian', 'qatar'],
    chapters: [
      {
        title: 'Executive summary',
        content: [
          'Zimbabwean aviation is entering a growth phase defined by two-hub connectivity, rising Gulf and African capacity, and a domestic market that has consolidated around efficiency.',
        ],
      },
      {
        title: 'Airline market',
        content: [
          'Analysis of the competitive position of the national carrier, low-cost operations and the international carriers that provide the bulk of long-haul capacity.',
          'Market share estimates, frequency data and route-level analysis for the major carriers serving Zimbabwe.',
        ],
      },
      {
        title: 'Airports',
        content: [
          'Performance, capacity and development plans at Harare, Victoria Falls, Bulawayo and the regional network.',
          'Traffic trends and headroom analysis across the airport system.',
        ],
      },
      {
        title: 'Connectivity',
        content: [
          'How well Zimbabwe is connected to Africa, the Gulf, Europe and Asia — and where the gaps are.',
          'The emergence of Victoria Falls as a long-haul gateway and its implications for the network.',
        ],
      },
      {
        title: 'Infrastructure',
        content: [
          'A review of committed and planned investment across terminals, runways and navigation infrastructure.',
        ],
      },
      {
        title: 'Outlook',
        content: [
          'A five-year scenario for traffic, capacity and connectivity, with the risks and opportunities facing the industry.',
        ],
      },
    ],
  },
  {
    id: 'harare-airport-profile-2026',
    title: 'Harare International Airport Profile',
    tagline: 'Facilities, infrastructure and operations at the principal gateway.',
    type: 'free',
    date: 'February 2026',
    description:
      'A public reference profile of Robert Gabriel Mugabe International Airport — runway, terminal, capacity and the carriers that serve it.',
    image: '/assets/airports/harare.jpg',
    airportIds: ['harare'],
    chapters: [
      {
        title: 'Overview',
        content: [
          'Harare International Airport is Zimbabwe\'s principal gateway, carrying the majority of the country\'s international traffic and serving as the hub of the domestic network.',
        ],
      },
      {
        title: 'Infrastructure',
        content: [
          'A single 4,725-metre runway supports operations from regional turboprops to long-haul wide-bodies. Terminal capacity stands at approximately 2.5 million passengers per annum.',
        ],
      },
      {
        title: 'Carriers',
        content: [
          'The airport is served by the national carrier, regional low-cost and regional carriers, and international airlines linking Harare to Addis Ababa, Doha, Dubai, Nairobi and Johannesburg.',
        ],
      },
    ],
  },
  {
    id: 'zimbabwe-regional-connectivity-report',
    title: 'Zimbabwe Regional Connectivity Report',
    tagline: 'How Zimbabwe connects to Southern Africa and beyond.',
    type: 'premium',
    date: 'April 2026',
    price: 'US$360',
    description:
      'A detailed analysis of regional connectivity — frequencies, capacity and the role of Johannesburg, Addis Ababa and Doha as the region\'s great hubs.',
    image: '/assets/journal/landscape.jpg',
    airlineIds: ['ethiopian', 'kenya-airways', 'south-african', 'qatar', 'airlink'],
    chapters: [
      {
        title: 'The regional picture',
        content: [
          'Southern African connectivity is dominated by the Johannesburg hub, with Addis Ababa emerging as the primary gateway to Africa, Asia and Europe.',
        ],
      },
      {
        title: 'Gateway analysis',
        content: [
          'Frequency and capacity data for each gateway serving Zimbabwe, and how travellers actually route through the region.',
        ],
      },
      {
        title: 'Implications',
        content: [
          'What the regional structure means for fares, competition and the development of Zimbabwe\'s own hubs.',
        ],
      },
    ],
  },
]
