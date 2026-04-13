import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Services',
    path: '/services',
    children: [
      { label: 'Brand Strategy & Consulting', path: '/services/brand-strategy-consulting' },
      { label: 'Website Development & E-Commerce', path: '/services/website-development-ecommerce' },
      { label: 'Social Media Marketing', path: '/services/social-media-marketing' },
      { label: 'Google & Meta Ads', path: '/services/google-meta-ads' },
      { label: 'Influencer & Awareness Marketing', path: '/services/influencer-awareness-marketing' },
      { label: 'Branding Solutions', path: '/services/branding-solutions' },
      { label: 'SEO & Local Marketing', path: '/services/seo-local-marketing' },
      { label: 'Bulk WhatsApp & SMS Marketing', path: '/services/bulk-whatsapp-sms-marketing' },
      { label: 'Bulk Voice Call & IVR Services', path: '/services/bulk-voice-call-ivr' },
    ]
  },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [servicesOpen, setServicesOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
    setServicesOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const mobileMenu = (
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 45,
            display: 'flex',
            flexDirection: 'column',
          }}
          className="bg-dark-900/98 backdrop-blur-xl"
        >
          {/* Scrollable links — top padding clears the header bar */}
          <nav
            className="flex-1 overflow-y-auto px-5 pb-6 flex flex-col gap-1"
            style={{ paddingTop: '80px' }}
          >
            {navLinks.map((link) => (
              <div key={link.path}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 text-white/40 ${servicesOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {servicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 pl-4 border-l border-white/8 my-1 flex flex-col gap-0.5">
                            {link.children.map((child) => (
                              <NavLink
                                key={child.path}
                                to={child.path}
                                className={({ isActive }) =>
                                  `block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                                    isActive
                                      ? 'text-brand-300 bg-brand-500/10'
                                      : 'text-white/50 hover:text-white hover:bg-white/5'
                                  }`
                                }
                              >
                                {child.label}
                              </NavLink>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block px-4 py-3.5 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? 'text-white bg-brand-500/15'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          {/* CTA pinned to bottom */}
          <div className="px-5 py-6 border-t border-white/5 bg-dark-900/50">
            <Link to="/contact" className="btn-primary w-full justify-center text-base py-4">
              Get Free Audit
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-dark-900/90 backdrop-blur-xl border-b border-white/5 shadow-lg'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="container-site flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" style={{ textDecoration: 'none' }}>
            <img
              src="/hero/logo.png"
              alt="To Fly Media"
              style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.children ? (
                  <button className="btn-ghost flex items-center gap-1 text-sm">
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `btn-ghost text-sm ${isActive ? '!text-white !bg-white/8' : ''}`
                    }
                  >
                    {link.label}
                  </NavLink>
                )}

                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-56 glass-card p-2 shadow-card"
                    >
                      {link.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) =>
                            `block px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 ${
                              isActive
                                ? 'text-brand-300 bg-brand-500/15'
                                : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`
                          }
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/contact" className="btn-primary text-sm">
              Get Free Audit
            </Link>
          </div>

          {/* Hamburger — z-50 so it sits above the overlay */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-50 p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex' }}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Portal renders the overlay directly into document.body — escapes header's stacking context */}
      {createPortal(mobileMenu, document.body)}
    </>
  )
}