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
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 45,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F5F3EE',
          }}
        >
          {/* Scrollable links — top padding clears the header bar */}
          <nav
            className="flex-1 overflow-y-auto px-6 pb-6 flex flex-col"
            style={{ paddingTop: '96px' }}
          >
            {navLinks.map((link, i) => (
              <div key={link.path} className="border-b border-line">
                {link.children ? (
                  <>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="w-full flex items-center justify-between py-5 text-left font-display text-3xl text-ink-900"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="eyebrow text-stone-400">{String(i + 1).padStart(2, '0')}</span>
                        {link.label}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`transition-transform duration-200 text-stone-500 ${servicesOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {servicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 border-l-2 border-brand-500 my-1 mb-5 flex flex-col gap-0.5">
                            {link.children.map((child) => (
                              <NavLink
                                key={child.path}
                                to={child.path}
                                className={({ isActive }) =>
                                  `block py-2.5 text-sm font-body transition-colors ${
                                    isActive
                                      ? 'text-brand-500 font-semibold'
                                      : 'text-stone-500 hover:text-ink-900'
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
                      `flex items-baseline gap-3 py-5 font-display text-3xl transition-colors ${
                        isActive ? 'text-brand-500' : 'text-ink-900'
                      }`
                    }
                  >
                    <span className="eyebrow text-stone-400">{String(i + 1).padStart(2, '0')}</span>
                    {link.label}
                    {link.badge && (
                      <span className="eyebrow px-2 py-0.5 border border-brand-500 text-brand-500 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          {/* CTA pinned to bottom */}
          <div className="px-6 py-6 border-t border-line bg-paper-200">
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
            ? 'py-3 bg-paper/95 backdrop-blur-sm border-b border-line'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container-site flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" style={{ textDecoration: 'none' }}>
            <img
              src="/hero/logo.png"
              alt="To Fly Media"
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
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
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `relative flex items-center gap-1 px-4 py-2 text-[13px] font-medium tracking-wide transition-colors ${
                        isActive ? 'text-brand-500' : 'text-ink-900/80 hover:text-ink-900'
                      }`
                    }
                  >
                    {link.label}
                    <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                  </NavLink>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `relative flex items-center px-4 py-2 text-[13px] font-medium tracking-wide transition-colors ${
                        isActive ? 'text-brand-500' : 'text-ink-900/80 hover:text-ink-900'
                      }`
                    }
                  >
                    {link.label}
                    {link.badge && (
                      <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide border border-brand-500 text-brand-500 leading-none">
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                )}

                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-72 border border-line p-2"
                      style={{
                        zIndex: 60,
                        backgroundColor: '#FBFAF7',
                        boxShadow: '0 12px 32px rgba(17,17,17,0.12)',
                      }}
                    >
                      {link.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) =>
                            `block px-3 py-2.5 text-sm transition-colors duration-150 ${
                              isActive
                                ? 'text-brand-500 font-semibold'
                                : 'text-stone-500 hover:text-ink-900'
                            }`
                          }
                          style={{ backgroundColor: 'transparent' }}
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
            <Link to="/contact" className="btn-primary text-[13px] py-2.5 px-5">
              Get Free Audit
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-50 p-2 text-ink-900"
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

      {/* Portal renders the overlay directly into document.body */}
      {createPortal(mobileMenu, document.body)}
    </>
  )
}