import { useState, useEffect } from 'react'
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
      { label: 'Graphic Design', path: '/services/graphic-design' },
      { label: 'Video Editing', path: '/services/video-editing' },
      { label: 'Web Development', path: '/services/web-development' },
      { label: 'App Development', path: '/services/app-development' },
      { label: 'Digital Marketing', path: '/services/digital-marketing' },
      { label: 'UI/UX Design', path: '/services/ui-ux-design' },
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
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [location.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-dark-900/90 backdrop-blur-xl border-b border-white/5 shadow-lg'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container-site flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group" style={{ textDecoration: 'none' }}>
          <img
            src="/hero/logo.png"
            alt="To Fly Media"
            style={{ height: '45px', width: 'auto', objectFit: 'contain' }}
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

              {/* Dropdown */}
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
                              ? 'text-white bg-brand-500/15 text-brand-300'
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

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/contact" className="btn-primary text-sm">
            Get Free Audit
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-dark-850/98 backdrop-blur-xl border-b border-white/5"
          >
            <nav className="container-site py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.path}>
                  {link.children ? (
                    <>
                      <div className="px-4 py-2 text-sm text-white/40 font-semibold uppercase tracking-wider mt-2">
                        {link.label}
                      </div>
                      {link.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) =>
                            `block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                              isActive ? 'text-white bg-brand-500/15' : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`
                          }
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                          isActive ? 'text-white bg-brand-500/15' : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  )}
                </div>
              ))}
              <div className="pt-3 pb-1">
                <Link to="/contact" className="btn-primary w-full justify-center text-sm">
                  Get Free Audit
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}