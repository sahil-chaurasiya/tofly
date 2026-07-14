import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import EventBanner from '../common/EventBanner'

export default function Layout() {
  const { pathname } = useLocation()

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Noise overlay for texture */}
      <div className="noise-overlay" aria-hidden="true" />

      <Navbar />
      <main className="flex-1">
        {/* Bharat Tex 2026 event banner — sits below the fixed navbar,
            above every page's own hero. Renders nothing once the event has ended. */}
        <EventBanner />
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}