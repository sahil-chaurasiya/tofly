import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, MapPin, Clock } from 'lucide-react'

// ── Bharat Tex 2026 — event window ──────────────────────────────
// 14–17 July 2026, Bharat Mandapam, New Delhi
// Banner sits below the navbar, above every page's hero (see Layout.jsx).
// It stays up for the entire run of the event and disappears on its own
// once it's over — there is no dismiss button, by design.
const EVENT_START = new Date('2026-07-14T00:00:00+05:30')
const EVENT_END = new Date('2026-07-17T23:59:59+05:30')

// Leftover key from an earlier version that had a dismiss button.
// Clearing it on load means anyone who dismissed it before will see it again.
const LEGACY_DISMISS_KEY = 'tofly_bharat_tex_banner_dismissed_v1'

function getPhase(now) {
  if (now < EVENT_START) return 'upcoming'
  if (now <= EVENT_END) return 'live'
  return 'over'
}

function useCountdown(target) {
  const [remaining, setRemaining] = useState(() => Math.max(0, target - new Date()))
  useEffect(() => {
    const id = setInterval(() => setRemaining(Math.max(0, target - new Date())), 1000)
    return () => clearInterval(id)
  }, [target])

  const totalSeconds = Math.floor(remaining / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

export default function EventBanner() {
  const [now, setNow] = useState(() => new Date())
  const { pathname } = useLocation()

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    try {
      sessionStorage.removeItem(LEGACY_DISMISS_KEY)
    } catch {
      /* storage unavailable — nothing to clean up */
    }
  }, [])

  const phase = getPhase(now)
  const cd = useCountdown(EVENT_END)

  if (phase === 'over') return null
  // The banner links to this page — showing it there too would be redundant.
  if (pathname === '/bharat-tex-2026') return null

  return (
    <motion.section
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="pt-28 sm:pt-32 pb-0"
    >
      <div className="container-site">
        <Link
          to="/bharat-tex-2026"
          className="relative grid grid-cols-1 lg:grid-cols-2 items-stretch glass-card-hover overflow-hidden group"
          style={{ textDecoration: 'none' }}
        >
          {/* Poster visual — full image shown, never cropped */}
          <div className="relative flex items-center justify-center bg-black/20 p-3 sm:p-5 h-[280px] sm:h-[360px] lg:h-auto lg:min-h-[440px]">
            <img
              src="/hero/tex%20summit.png"
              alt="Bharat Tex 2026 — Global Textile Expo, 14–17 July, Bharat Mandapam, New Delhi"
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* Copy */}
          <div className="flex-1 flex flex-col justify-center gap-5 p-6 sm:p-10 lg:p-12">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-400" />
              </span>
              <span className="text-xs font-bold tracking-wide text-accent-400 uppercase">
                {phase === 'live' ? 'Live Now' : 'Coming Up'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug font-display">
              Bharat Tex 2026 — India's Global Textile Expo
            </h2>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/55">
              <span className="inline-flex items-center gap-2">
                <Calendar size={15} className="text-white/35" /> 14–17 July 2026
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} className="text-white/35" /> Bharat Mandapam, New Delhi
              </span>
            </div>

            {/* Countdown to the end of the show */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-white/40 text-xs font-semibold uppercase tracking-wider">
                <Clock size={13} />
                {phase === 'live' ? 'Show floor closes in' : 'Show opens in'}
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                {[
                  ['Days', cd.days],
                  ['Hrs', cd.hours],
                  ['Min', cd.minutes],
                  ['Sec', cd.seconds],
                ].map(([label, val]) => (
                  <div key={label} className="glass-card px-3.5 py-2.5 sm:px-4 sm:py-3 min-w-[62px] text-center">
                    <div className="text-xl sm:text-2xl font-black font-display text-white tabular-nums">
                      {String(val).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] text-white/40 mt-0.5 uppercase tracking-wide">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 mt-2">
              See what's happening
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </div>
        </Link>
      </div>
    </motion.section>
  )
}