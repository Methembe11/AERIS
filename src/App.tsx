import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { SearchOverlay } from './components/SearchOverlay'
import { BackToTop } from './components/BackToTop'
import { HomePage } from './pages/Home'

const JournalPage = lazy(() => import('./pages/Journal').then((m) => ({ default: m.JournalPage })))
const ArticlePage = lazy(() => import('./pages/Article').then((m) => ({ default: m.ArticlePage })))
const AirlinesPage = lazy(() => import('./pages/Airlines').then((m) => ({ default: m.AirlinesPage })))
const AirlinePage = lazy(() => import('./pages/Airline').then((m) => ({ default: m.AirlinePage })))
const AirportsPage = lazy(() => import('./pages/Airports').then((m) => ({ default: m.AirportsPage })))
const AirportPage = lazy(() => import('./pages/Airport').then((m) => ({ default: m.AirportPage })))
const AircraftPage = lazy(() => import('./pages/Aircraft').then((m) => ({ default: m.AircraftPage })))
const AircraftProfilePage = lazy(() =>
  import('./pages/AircraftProfile').then((m) => ({ default: m.AircraftProfilePage })),
)
const RoutesPage = lazy(() => import('./pages/Routes').then((m) => ({ default: m.RoutesPage })))
const RoutePage = lazy(() => import('./pages/RouteProfile').then((m) => ({ default: m.RoutePage })))
const DevelopmentPage = lazy(() => import('./pages/Development').then((m) => ({ default: m.DevelopmentPage })))
const DevelopmentDossierPage = lazy(() =>
  import('./pages/DevelopmentDossier').then((m) => ({ default: m.DevelopmentDossierPage })),
)
const CareersPage = lazy(() => import('./pages/Careers').then((m) => ({ default: m.CareersPage })))
const CareerDetailPage = lazy(() =>
  import('./pages/CareerDetail').then((m) => ({ default: m.CareerDetailPage })),
)
const ReportsPage = lazy(() => import('./pages/Reports').then((m) => ({ default: m.ReportsPage })))
const ReportReaderPage = lazy(() =>
  import('./pages/ReportReader').then((m) => ({ default: m.ReportReaderPage })),
)
const NotFoundPage = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFoundPage })))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function PageFallback() {
  return (
    <div className="page-fallback" aria-label="Loading">
      <span className="page-fallback__bar" />
    </div>
  )
}

function Layout() {
  const [searchOpen, setSearchOpen] = useState(false)
  return (
    <>
      <ScrollToTop />
      <Header onOpenSearch={() => setSearchOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <main>
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <BackToTop />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/journal/:articleId" element={<ArticlePage />} />
          <Route path="/airlines" element={<AirlinesPage />} />
          <Route path="/airlines/:airlineId" element={<AirlinePage />} />
          <Route path="/airports" element={<AirportsPage />} />
          <Route path="/airports/:airportId" element={<AirportPage />} />
          <Route path="/aircraft" element={<AircraftPage />} />
          <Route path="/aircraft/:aircraftId" element={<AircraftProfilePage />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/routes/:routeId" element={<RoutePage />} />
          <Route path="/development" element={<DevelopmentPage />} />
          <Route path="/development/:projectId" element={<DevelopmentDossierPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:careerId" element={<CareerDetailPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/reports/:reportId" element={<ReportReaderPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
