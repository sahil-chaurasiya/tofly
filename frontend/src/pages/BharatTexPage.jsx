import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  MapPin, Calendar, ArrowRight, ExternalLink, Clock,
  Layers, Shirt, Leaf, Globe2, Building2, Sprout,
} from 'lucide-react'
import { PageWrapper, SectionWrapper, SectionTag } from '../components/common'

// ── Event window — 14–17 July 2026, Bharat Mandapam, New Delhi ──
const EVENT_START = new Date('2026-07-14T00:00:00+05:30')
const EVENT_END = new Date('2026-07-17T23:59:59+05:30')

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

const QUICK_FACTS = [
  { value: '4', label: 'Days of Business' },
  { value: '10,000+', label: 'Exhibitors' },
  { value: '40+', label: 'Countries' },
  { value: '2.2M+', label: 'Sq. Ft. of Showcase' },
]

const PILLARS = [
  { icon: Layers, title: 'Textiles', desc: 'Fibres, yarns, fabrics, handloom, technical textiles and the full value chain from raw material to finished cloth.' },
  { icon: Shirt, title: 'Fashion', desc: 'Apparel, home furnishings, accessories and design — where craftsmanship meets contemporary style.' },
  { icon: Leaf, title: 'Sustainability', desc: 'Circular practices, sustainable fibres and responsible manufacturing shaping the industry\'s next chapter.' },
]

const HIGHLIGHTS = [
  {
    icon: Globe2,
    title: 'A Global Sourcing Platform',
    desc: 'International buyers, importers and manufacturers from dozens of countries come together under one roof to source, network and strike deals across the entire textile value chain.',
  },
  {
    icon: Building2,
    title: 'Every Segment, One Venue',
    desc: 'From fibres and yarns to apparel, home textiles, carpets and technical textiles — the show spans the complete spectrum of India\'s textile and garment industry.',
  },
  {
    icon: Sprout,
    title: 'Part of a Bigger Vision',
    desc: "Bharat Tex supports the Government of India's 5F vision — Farm to Fibre to Fabric to Fashion to Foreign — connecting Indian textiles to global markets.",
  },
]

export default function BharatTexPage() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const phase = getPhase(now)
  const countdownTarget = phase === 'upcoming' ? EVENT_START : EVENT_END
  const cd = useCountdown(countdownTarget)

  return (
    <PageWrapper>
      <Helmet>
        <title>Bharat Tex 2026 — India's Global Textile Expo | To Fly Media</title>
        <meta
          name="description"
          content="Bharat Tex 2026 — 14–17 July, Bharat Mandapam, New Delhi. Dates, venue, key highlights and everything to know about India's largest global textile expo."
        />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-accent-500/10 blur-[110px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[360px] h-[360px] rounded-full bg-brand-500/10 blur-[100px] pointer-events-none" />

        <div className="container-site relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTag icon={Calendar}>
                {phase === 'live' ? 'Live Now · Bharat Mandapam, New Delhi' : 'Coming Up · Bharat Mandapam, New Delhi'}
              </SectionTag>

              <h1 className="section-heading text-white text-5xl md:text-6xl mt-4 mb-6">
                Everything Textiles,<br />
                <span className="gradient-text">In One Place.</span>
              </h1>

              <p className="text-xl text-white/50 max-w-xl mb-8">
                Bharat Tex 2026 is India's largest global textile expo — bringing manufacturers,
                exporters, designers and buyers from across the world together under one roof.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-10 text-sm text-white/60">
                <span className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full">
                  <Calendar size={15} className="text-accent-400" /> 14–17 July 2026
                </span>
                <span className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full">
                  <MapPin size={15} className="text-accent-400" /> Bharat Mandapam, New Delhi
                </span>
              </div>

              <a
                href="https://bharat-tex.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-8 py-3.5"
              >
                Visit Official Website <ExternalLink size={16} />
              </a>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl overflow-hidden glass-card"
            >
              <img
                src="/hero/tex%20summit.png"
                alt="Bharat Tex 2026 — Global Textile Expo, 14–17 July, Bharat Mandapam, New Delhi"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>

          {/* Quick facts strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {QUICK_FACTS.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card p-5 text-center"
              >
                <div className="text-2xl md:text-3xl font-black font-display gradient-text">{f.value}</div>
                <div className="text-xs text-white/45 mt-1">{f.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Countdown ────────────────────────────────────── */}
      <SectionWrapper className="container-site pb-24">
        <div
          className="relative rounded-3xl overflow-hidden p-8 md:p-10 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(249,115,22,0.14) 0%, rgba(19,28,87,0.35) 55%, rgba(51,105,255,0.1) 100%)',
            border: '1px solid rgba(249,115,22,0.28)',
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-6 text-accent-400 font-semibold text-sm uppercase tracking-wider">
            <Clock size={16} />
            {phase === 'live' ? 'Show floor closes in' : 'Bharat Tex 2026 opens in'}
          </div>
          <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap">
            {[
              ['Days', cd.days],
              ['Hours', cd.hours],
              ['Minutes', cd.minutes],
              ['Seconds', cd.seconds],
            ].map(([label, val]) => (
              <div key={label} className="glass-card px-5 py-4 md:px-7 md:py-5 min-w-[84px]">
                <div className="text-3xl md:text-4xl font-black font-display text-white tabular-nums">
                  {String(val).padStart(2, '0')}
                </div>
                <div className="text-[11px] text-white/45 mt-1 uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── Three pillars ────────────────────────────────── */}
      <SectionWrapper className="container-site pb-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionTag icon={Layers}>The Three Pillars</SectionTag>
          <h2 className="section-heading text-white mt-4">
            Textiles <span className="gradient-text">·</span> Fashion <span className="gradient-text">·</span> Sustainability
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card-hover p-7 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center mb-5 mx-auto">
                <p.icon size={26} className="text-accent-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── About / highlights ───────────────────────────── */}
      <SectionWrapper className="container-site pb-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionTag icon={Globe2}>About the Show</SectionTag>
          <h2 className="section-heading text-white mt-4">
            What Makes <span className="gradient-text">Bharat Tex 2026</span> Different
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HIGHLIGHTS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card-hover p-7"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-5">
                <card.icon size={22} className="text-brand-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="glass-card p-8 md:p-10 mt-6 text-center"
        >
          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-3xl mx-auto italic">
            In the Prime Minister's own words, Bharat Tex stands out as a platform that puts
            India's textile strengths on the world stage.
          </p>
          <p className="text-white/35 text-sm mt-4">— Shri Narendra Modi, Hon'ble Prime Minister of India</p>
        </motion.div>
      </SectionWrapper>

      {/* ── Closing note ─────────────────────────────────── */}
      <SectionWrapper className="container-site pb-28">
        <div className="max-w-2xl mx-auto text-center glass-card p-10 md:p-12">
          <h2 className="text-2xl font-bold text-white mb-3">Exhibiting at Bharat Tex 2026?</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            If your brand is showing up at the expo, To Fly Media can help you show up ready online too.
          </p>
          <Link to="/contact" className="btn-secondary text-base px-8 py-3.5">
            Talk to Us <ArrowRight size={16} />
          </Link>
        </div>
      </SectionWrapper>
    </PageWrapper>
  )
}