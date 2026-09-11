import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Instagram, Linkedin, Facebook, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  Solutions: [
    { label: 'Brand Strategy & Consulting', href: '/services/brand-strategy-consulting' },
    { label: 'Website Development & E-Commerce', href: '/services/website-development-ecommerce' },
    { label: 'Social Media Marketing', href: '/services/social-media-marketing' },
    { label: 'Google & Meta Ads', href: '/services/google-meta-ads' },
    { label: 'Influencer & Awareness Marketing', href: '/services/influencer-awareness-marketing' },
    { label: 'Branding Solutions', href: '/services/branding-solutions' },
    { label: 'SEO & Local Marketing', href: '/services/seo-local-marketing' },
    { label: 'Bulk WhatsApp & SMS Marketing', href: '/services/bulk-whatsapp-sms-marketing' },
    { label: 'Bulk Voice Call & IVR Services', href: '/services/bulk-voice-call-ivr' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Admin', href: '/admin/login' },
  ],
}

// Light editorial footer — a shade darker than the page's paper bg so it
// still reads as a distinct closing block, without going to black.
const FOOTER_BG = '#EFEBE1'
const INK = '#111111'
const MUTED = '#6B6A65'
const BORDER = '#D8D5CE'

export default function Footer() {
  return (
    <footer className="relative" style={{ background: FOOTER_BG, color: INK }}>
      <div className="container-site" style={{ paddingTop: 64, paddingBottom: 40 }}>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" style={{ marginBottom: 48 }}>
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center w-fit" style={{ marginBottom: 20 }}>
              <img
                src="/hero/logo.png"
                alt="To Fly Media"
                style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
              />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: MUTED, marginBottom: 24 }}>
              Performance marketing agency serving Bhopal, Mumbai, Delhi & Ahmedabad. We help brands grow faster with data-driven digital marketing.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: 'https://www.instagram.com/toflymedia/', label: 'Instagram' },
                { icon: Linkedin, href: 'https://www.linkedin.com/company/tofly-media/', label: 'LinkedIn' },
                { icon: Facebook, href: 'https://www.facebook.com/p/ToFly-Media-61572539060505/', label: 'Facebook' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                  style={{ color: MUTED, border: `1px solid ${BORDER}`, borderRadius: '50%' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#F5F3EE'; e.currentTarget.style.background = INK; e.currentTarget.style.borderColor = INK }}
                  onMouseLeave={e => { e.currentTarget.style.color = MUTED; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = BORDER }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="eyebrow" style={{ color: MUTED, marginBottom: 20 }}>{title}</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm flex items-center gap-1 group transition-colors duration-200"
                      style={{ color: '#3a3a38', textDecoration: 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.color = INK }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#3a3a38' }}
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h4 className="eyebrow" style={{ color: MUTED, marginBottom: 20 }}>Contact</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <li className="flex items-start gap-3">
                <MapPin size={16} style={{ color: '#3157FF', marginTop: 2, flexShrink: 0 }} />
                <div>
                  <p className="text-sm" style={{ color: '#3a3a38' }}>Bhopal (HQ), Mumbai,</p>
                  <p className="text-sm" style={{ color: '#3a3a38' }}>Delhi & Ahmedabad</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} style={{ color: '#3157FF', flexShrink: 0 }} />
                <a href="tel:+919752523894" className="text-sm transition-colors" style={{ color: '#3a3a38', textDecoration: 'none' }}>
                  +91 9752523894
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} style={{ color: '#3157FF', flexShrink: 0 }} />
                <a href="mailto:toflymedia@gmail.com" className="text-sm transition-colors" style={{ color: '#3a3a38', textDecoration: 'none' }}>
                  toflymedia@gmail.com
                </a>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919752523894?text=Hi%2C%20I'd%20like%20to%20know%20more%20about%20your%20digital%20marketing%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium transition-all duration-200 w-fit"
              style={{
                marginTop: 24,
                padding: '10px 16px',
                background: 'rgba(37, 211, 102, 0.1)',
                border: '1px solid rgba(37, 211, 102, 0.35)',
                color: '#1a9c50',
                borderRadius: 999,
                textDecoration: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Big brand mark */}
        <div className="w-full flex items-center justify-center overflow-hidden" style={{ paddingBottom: 28 }}>
          <h2
            className="text-center font-serif select-none"
            style={{
              fontSize: 'clamp(40px, 10.5vw, 140px)',
              lineHeight: 1,
              letterSpacing: '-0.01em',
              margin: 0,
              whiteSpace: 'nowrap',
              fontWeight: 600,
              fontStyle: 'italic',
              color: INK,
              opacity: 0.07,
            }}
          >
            To Fly Media
          </h2>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4" style={{ paddingTop: 32, borderTop: `1px solid ${BORDER}` }}>
          <p className="text-xs" style={{ color: MUTED }}>
            © {new Date().getFullYear()} To Fly Media. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs transition-colors" style={{ color: MUTED, textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/terms" className="text-xs transition-colors" style={{ color: MUTED, textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}