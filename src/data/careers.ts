import type { Career } from '../types'

export const careers: Career[] = [
  {
    id: 'pilot',
    title: 'Pilot',
    category: 'Flight Deck',
    summary:
      'Fly the aircraft that connect Zimbabwe to the region and the world — from regional turboprops on the domestic trunk routes to wide-body long-haul operations.',
    whatTheyDo: [
      'Command and operate aircraft on scheduled, charter and cargo services.',
      'Manage flight planning, weather and fuel for each sector.',
      'Work with air traffic control and ground operations on every turn.',
      'Oversee safety, crew and passenger wellbeing on the ground and in the air.',
    ],
    qualifications: [
      'Valid Zimbabwean CAAZ Commercial Pilot Licence (CPL) with Instrument Rating.',
      'Airline Transport Pilot Licence (ATPL) required for command roles.',
      'Class 1 aviation medical certificate.',
      'English proficiency to ICAO Level 4 or higher.',
      'Typically 1,500+ flying hours for first officer positions with regional carriers.',
    ],
    trainingPath: [
      'Private Pilot Licence (PPL) — the foundation of flight training.',
      'Commercial Pilot Licence (CPL) with multi-engine and instrument ratings.',
      'Airline Transport Pilot Licence (ATPL) and type rating on the aircraft you will fly.',
      'Type ratings in Zimbabwe cover the Embraer E-Jet family, A320 and ATR families in service regionally.',
    ],
    progression: [
      { level: 'First Officer', description: 'Initial airline flying on regional or domestic routes.' },
      { level: 'Senior First Officer', description: 'Increased responsibility and wider route coverage.' },
      { level: 'Captain', description: 'Command responsibility, training and standards duties.' },
      { level: 'Check Captain / Training Captain', description: 'Crew training, examinations and standards oversight.' },
    ],
    institutions: [
      { name: 'Civil Aviation Authority of Zimbabwe (CAAZ)', note: 'Licensing and examinations' },
      { name: 'Charles Prince Airport (Harare)', note: 'Flight training hub with resident training organisations' },
    ],
    relatedAirlineIds: ['air-zimbabwe', 'fastjet', 'ethiopian', 'qatar'],
  },
  {
    id: 'cabin-crew',
    title: 'Cabin Crew',
    category: 'Cabin Services',
    summary:
      'Look after the safety and experience of passengers on domestic, regional and international services.',
    whatTheyDo: [
      'Deliver in-flight safety procedures and emergency response.',
      'Provide customer service across the cabin, from boarding to arrival.',
      'Coordinate with flight deck and ground teams on every turn.',
      'Handle in-flight medical and security incidents according to carrier procedures.',
    ],
    qualifications: [
      'Completion of an approved cabin crew training programme.',
      'Cabin Crew Attestation issued by CAAZ or an EASA-recognised authority.',
      'First aid and safety training certification.',
      'Aged 18 or over with the physical capability for the role.',
    ],
    trainingPath: [
      'Approved cabin crew initial training (safety, first aid, service).',
      'Carrier-specific conversion and aircraft type training.',
      'Recurrent safety and emergency training every 12 months.',
      'Language and service skills development for international routes.',
    ],
    progression: [
      { level: 'Cabin Crew', description: 'Line operations on domestic and regional routes.' },
      { level: 'Senior Cabin Crew', description: 'Cabin leadership and mentoring duties.' },
      { level: 'Purser / Cabin Supervisor', description: 'Cabin management and standards on international services.' },
      { level: 'Inflight Trainer', description: 'Cabin crew training and development.' },
    ],
    institutions: [
      { name: 'Regional carriers in Zimbabwe', note: 'Fastjet Zimbabwe and Air Zimbabwe recruit and train locally' },
      { name: 'Approved training organisations', note: 'CAAZ-approved cabin crew schools' },
    ],
    relatedAirlineIds: ['fastjet', 'air-zimbabwe', 'ethiopian'],
  },
  {
    id: 'engineer',
    title: 'Aircraft Maintenance Engineer',
    category: 'Engineering',
    summary:
      'Keep Zimbabwe\'s aircraft airworthy — performing line, base and workshop maintenance across the regional fleet.',
    whatTheyDo: [
      'Certify and perform scheduled and unscheduled maintenance.',
      'Troubleshoot avionics, engines, airframes and systems.',
      'Release aircraft to service under CAAZ Part 66 standards.',
      'Maintain technical records and component tracking.',
    ],
    qualifications: [
      'Aircraft Maintenance Engineer licence (AME) under CAAZ regulations.',
      'Category A (avionics) or Category B (mechanical) licensing.',
      'Type training on aircraft in service, including ATR and Embraer families.',
      'Approved apprenticeship or recognised engineering qualification.',
    ],
    trainingPath: [
      'Approved maintenance training organisation (MTO) programme.',
      'On-the-job apprenticeship with a licensed organisation.',
      'Part 66 licence examinations and type training.',
      'Continuous type renewals as fleets evolve.',
    ],
    progression: [
      { level: 'Maintenance Trainee', description: 'Supervised work under a licensed engineer.' },
      { level: 'Certifying Engineer', description: 'Authorised to certify maintenance and release aircraft.' },
      { level: 'Shift / Base Lead', description: 'Leadership of maintenance teams and hangars.' },
      { level: 'Maintenance Manager / CAMO', description: 'Airworthiness management and regulatory compliance.' },
    ],
    institutions: [
      { name: 'Charles Prince Airport (Harare)', note: 'Maintenance operators and training organisations' },
      { name: 'CAAZ', note: 'Licensing and examinations' },
    ],
    relatedAirlineIds: ['air-zimbabwe', 'fastjet'],
  },
  {
    id: 'air-traffic-control',
    title: 'Air Traffic Control',
    category: 'Operations',
    summary:
      'Manage the safe and efficient flow of aircraft through Zimbabwean airspace and airports.',
    whatTheyDo: [
      'Provide aerodrome and approach control at international airports.',
      'Manage en-route traffic in Zimbabwean airspace.',
      'Co-ordinate flight plans, separations and emergency response.',
      'Operate modern surveillance and communications systems.',
    ],
    qualifications: [
      'CAAZ air traffic control licensing (aerodrome, approach or area).',
      'ICAO-recognised ATC training programme.',
      'English proficiency to ICAO Level 4 or higher.',
      'Medical fitness for the role.',
    ],
    trainingPath: [
      'Approved air traffic services training (often abroad or via CAAZ programmes).',
      'Unit-specific on-the-job training and validation.',
      'Rating endorsements for aerodrome, approach and area control.',
      'Recurrent simulator and refresher training.',
    ],
    progression: [
      { level: 'Trainee Controller', description: 'Supervised operational training.' },
      { level: 'Licensed Controller', description: 'Independent control of assigned sectors.' },
      { level: 'Watch Supervisor', description: 'Supervision of operational teams.' },
      { level: 'Air Traffic Services Manager', description: 'Operational and regulatory management.' },
    ],
    institutions: [
      { name: 'CAAZ Air Traffic Services', note: 'Licensing and unit training' },
      { name: 'Regional ATC academies', note: 'Initial and advanced ATC training' },
    ],
    relatedAirlineIds: [],
  },
  {
    id: 'airport-operations',
    title: 'Airport Operations',
    category: 'Airports',
    summary:
      'Run the day-to-day operations that keep Zimbabwe\'s airports safe, compliant and efficient.',
    whatTheyDo: [
      'Manage airside operations, aprons and runway inspections.',
      'Coordinate airport safety, security and emergency procedures.',
      'Oversee passenger flow through terminals.',
      'Work with airlines, ground handlers and regulators on every movement.',
    ],
    qualifications: [
      'Degree or diploma in airport management, aviation or a related field.',
      'ICAO safety management systems (SMS) awareness training.',
      'Airport security training to national requirements.',
      'Strong operational and coordination skills.',
    ],
    trainingPath: [
      'Entry roles in airline and airport ground operations.',
      'Airport safety, security and operations certification.',
      'Progressive exposure to airside, terminal and emergency disciplines.',
      'Management development for senior operational roles.',
    ],
    progression: [
      { level: 'Operations Officer', description: 'Shift operations across airside and terminal.' },
      { level: 'Operations Supervisor', description: 'Team leadership and incident response.' },
      { level: 'Operations Manager', description: 'Airport-wide operational responsibility.' },
      { level: 'General Manager', description: 'Overall airport leadership.' },
    ],
    institutions: [
      { name: 'Airports Company of Zimbabwe (ACZ)', note: 'Airport management and operations' },
      { name: 'Local universities', note: 'Aviation and transport management degrees' },
    ],
    relatedAirlineIds: [],
  },
  {
    id: 'ground-handling',
    title: 'Ground Handling',
    category: 'Airports',
    summary:
      'Turn aircraft around safely and on time — from baggage and cargo to ramp services and passenger assistance.',
    whatTheyDo: [
      'Load and unload baggage, cargo and mail.',
      'Operate ramp vehicles, airbridges and ground equipment.',
      'Coordinate turnarounds and on-time performance.',
      'Provide passenger assistance from check-in to boarding.',
    ],
    qualifications: [
      'Ramp and safety training to airline and airport standards.',
      'Equipment-specific certification (tugs, loaders, transporters).',
      'Customer service and safety awareness training.',
    ],
    trainingPath: [
      'Ground handling induction and safety training.',
      'Equipment type training and certification.',
      'Airline-specific service standards training.',
      'Supervisory and quality roles with experience.',
    ],
    progression: [
      { level: 'Ramp Agent', description: 'Aircraft turnaround operations.' },
      { level: 'Team Leader', description: 'Shift coordination and quality.' },
      { level: 'Supervisor', description: 'Handling operations oversight.' },
      { level: 'Station Manager', description: 'Airport station responsibility.' },
    ],
    institutions: [
      { name: 'Ground handling providers at Harare and Victoria Falls', note: 'Ramp and passenger services' },
      { name: 'Airport training departments', note: 'Safety and equipment certification' },
    ],
    relatedAirlineIds: [],
  },
  {
    id: 'aviation-management',
    title: 'Aviation Management',
    category: 'Management',
    summary:
      'Lead airlines, airports and the institutions shaping Zimbabwe\'s aviation sector — from strategy to operations.',
    whatTheyDo: [
      'Set commercial, operational and regulatory strategy.',
      'Manage revenue, cost and performance across operations.',
      'Build relationships with airlines, government and regulators.',
      'Shape policy, investment and network development.',
    ],
    qualifications: [
      'Degree in aviation management, business or economics.',
      'Relevant experience in airline, airport or transport management.',
      'Understanding of aviation regulation and safety management.',
      'Strong commercial and leadership capability.',
    ],
    trainingPath: [
      'Analyst and coordinator roles in airlines, airports or regulators.',
      'Management experience across commercial and operational functions.',
      'Graduate and executive aviation management programmes.',
      'Industry and regulatory exposure to senior leadership.',
    ],
    progression: [
      { level: 'Analyst / Coordinator', description: 'Commercial and operational support.' },
      { level: 'Manager', description: 'Functional management responsibility.' },
      { level: 'Director', description: 'Strategic leadership of a function.' },
      { level: 'CEO / Executive', description: 'Organisation-wide leadership.' },
    ],
    institutions: [
      { name: 'Air Zimbabwe', note: 'National carrier management and careers' },
      { name: 'Airports Company of Zimbabwe (ACZ)', note: 'Airport leadership roles' },
      { name: 'CAAZ', note: 'Regulatory and policy careers' },
    ],
    relatedAirlineIds: ['air-zimbabwe'],
  },
]
