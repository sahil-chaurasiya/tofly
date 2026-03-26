import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play, CheckCircle, TrendingUp, Target, Star, ChevronRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { publicAPI } from '../utils/api'
import {
  PageWrapper, SectionWrapper, SectionTag,
  ServiceCard, TestimonialCard, BlogCard, MetricCounter, CTABanner,
  SkeletonCard
} from '../components/common'

// ── Static data ───────────────────────────────────────────────
const METRICS = [
  { value: '150+', label: 'Clients Served' },
  { value: '₹50Cr+', label: 'Ad Spend Managed' },
  { value: '3.8x', label: 'Average ROAS' },
  { value: '98%', label: 'Client Retention' },
]

const PROCESS_STEPS = [
  { step: '01', title: 'Discovery & Audit', desc: 'We deep-dive into your current marketing, competitors, and audience to uncover real opportunities.' },
  { step: '02', title: 'Strategy Build', desc: 'Custom growth roadmap with channel mix, budget allocation, and 90-day milestones.' },
  { step: '03', title: 'Launch & Execute', desc: 'Campaigns built, creatives produced, tracking set up. We move fast without cutting corners.' },
  { step: '04', title: 'Optimize & Scale', desc: 'Weekly data review, continuous testing. When something works, we scale it hard.' },
]

const TRUSTED_BY = [
  'TechVenture', 'StyleCraft', 'EduReach', 'RealPro', 'Organic Earth',
  'FinanceHub', 'MedCare', 'CloudStack', 'RetailPro', 'GrowthBase'
]

// ─────────────────────────────────────────────────────────────
// HERO COLLAGE — Dramatic editorial cuts, layered depth
// Drop real images into: frontend/public/hero/1.png … 5.png
// ─────────────────────────────────────────────────────────────

const MEDIA = [
  // { src: '/hero/1.png' },
  // { src: '/hero/2.png' },
  // { src: '/hero/3.png' },
  // { src: '/hero/4.png' },
  // { src: '/hero/5.png' },
]

// Each panel's gradient fallback when no real image exists
const PANEL_FILLS = [
  'linear-gradient(155deg, #080e2a 0%, #112069 45%, #1e3db8 100%)',
  'linear-gradient(125deg, #0b0e22 0%, #0e1d60 50%, #f97316 260%)',
  'linear-gradient(145deg, #060918 0%, #0c1a52 50%, #3b82f6 140%)',
  'linear-gradient(160deg, #070820 0%, #101c5e 55%, #7c3aed 160%)',
  'linear-gradient(135deg, #050714 0%, #0a1545 50%, #0ea5e9 130%)',
]

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E")`

function Panel({ index, delay = 0, clip, style = {}, children }) {
  const media = MEDIA[index] || {}
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="absolute overflow-hidden"
      style={{ clipPath: clip, ...style }}
    >
      {media.src && (
        <img
          src={media.src}
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 1 }}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{ background: PANEL_FILLS[index % PANEL_FILLS.length], zIndex: 0 }}
      />
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60"
        style={{ backgroundImage: NOISE, backgroundSize: '256px 256px', zIndex: 2 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -2px 0 rgba(0,0,0,0.5)',
          zIndex: 3,
        }}
      />
      <div className="absolute inset-0" style={{ zIndex: 4 }}>
        {children}
      </div>
    </motion.div>
  )
}

function Sparkle({ x, y, size = 3, delay = 0 }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: 'white' }}
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
      transition={{ duration: 2.4 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}

function HeroCollage() {
  return (
    <div
      className="relative w-full select-none"
      style={{ height: 580 }}
    >
      {/* [0] Big dominant slab — top-left, wide diagonal slash across bottom edge */}
      <Panel
        index={0} delay={0.1}
        clip="polygon(0 0, 100% 0, 100% 72%, 88% 100%, 0 88%)"
        style={{ top: 0, left: 0, width: '63%', height: '55%', borderRadius: '18px 0 0 0' }}
      >
        {[15, 35, 55, 75].map(pct => (
          <div key={pct} className="absolute left-0 right-0 h-px opacity-[0.06]"
            style={{ top: `${pct}%`, background: 'white' }} />
        ))}
        <div className="absolute top-5 left-6 flex gap-1.5 opacity-25">
          {[1,2,3].map(i => <div key={i} className="w-4 h-px bg-white" />)}
        </div>
        <Sparkle x="78%" y="22%" size={2} delay={0.3} />
        <Sparkle x="55%" y="68%" size={2} delay={1.1} />
      </Panel>

      {/* [1] Tall right shard — angled left edge */}
      <Panel
        index={1} delay={0.22}
        clip="polygon(18% 0, 100% 0, 100% 100%, 0 100%, 0 12%)"
        style={{ top: 0, right: 0, width: '35%', height: '43%', borderRadius: '0 18px 0 0' }}
      >
        <div className="absolute inset-0 opacity-[0.12]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />
        <Sparkle x="35%" y="55%" size={2.5} delay={0.7} />
      </Panel>

      {/* [2] Mid-left vertical sliver — skewed parallelogram */}
      <Panel
        index={2} delay={0.33}
        clip="polygon(0 8%, 100% 0, 100% 92%, 0 100%)"
        style={{ top: '57%', left: 0, width: '28%', height: '38%', borderRadius: '0 0 0 18px' }}
      >
        <div className="absolute bottom-5 left-5 flex items-end gap-[3px] opacity-30">
          {[30, 55, 40, 80, 60, 95, 72, 88].map((h, i) => (
            <motion.div
              key={i}
              className="w-[5px] rounded-sm bg-white"
              style={{ height: `${h * 0.22}px` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.07, ease: 'backOut' }}
            />
          ))}
        </div>
      </Panel>

      {/* [3] Wide mid-right band — diagonal top cut */}
      <Panel
        index={3} delay={0.42}
        clip="polygon(5% 0, 100% 8%, 100% 100%, 0 100%)"
        style={{ top: '45%', right: 0, width: '70%', height: '32%' }}
      >
        <div className="absolute top-[35%] left-[10%] right-[15%] h-px opacity-15"
          style={{ background: 'linear-gradient(90deg, transparent, white 40%, transparent)' }} />
        <Sparkle x="70%" y="60%" size={2} delay={1.5} />
      </Panel>

      {/* [4] Accent corner shard — bottom-right */}
      <Panel
        index={4} delay={0.54}
        clip="polygon(12% 0, 100% 0, 100% 100%, 0 100%, 0 18%)"
        style={{ bottom: 0, right: 0, width: '28%', height: '22%', borderRadius: '0 0 18px 0' }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-15">
          <div className="w-16 h-16 rounded-full" style={{ border: '1px solid white' }} />
          <div className="absolute w-10 h-10 rounded-full" style={{ border: '1px solid white', opacity: 0.5 }} />
        </div>
      </Panel>

      {/* Gap filler: seam between panel 0 and panel 1 */}
      <div className="absolute pointer-events-none" style={{
        top: 0, left: '61%', width: '4%', height: '44%',
        background: '#03030a',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 35% 100%)',
        zIndex: 10,
      }} />
      {/* Gap filler: seam between panel 2 and panel 3 */}
      <div className="absolute pointer-events-none" style={{
        top: '55%', left: '27%', width: '4%', height: '43%',
        background: '#03030a',
        clipPath: 'polygon(0 0, 100% 12%, 100% 100%, 0 100%)',
        zIndex: 10,
      }} />

      {/* Floating stat pills */}
      {[
        { value: '3.8×',  label: 'Avg ROAS',  pos: { top: '6%',    left: '-4%'  }, delay: 0.85, accent: true  },
        { value: '₹50Cr+',label: 'Ad Spend',  pos: { top: '40%',   right: '-2%' }, delay: 0.95, accent: false },
        { value: '98%',   label: 'Retention', pos: { bottom: '5%', left: '26%'  }, delay: 1.08, accent: false },
      ].map((pill) => (
        <motion.div
          key={pill.value}
          initial={{ opacity: 0, y: 14, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: pill.delay, ease: [0.16, 1, 0.3, 1] }}
          className="absolute z-30 flex flex-col px-4 py-3 rounded-2xl"
          style={{
            ...pill.pos,
            background: pill.accent
              ? 'linear-gradient(135deg, rgba(51,105,255,0.3), rgba(51,105,255,0.12))'
              : 'rgba(3,3,10,0.82)',
            border: pill.accent
              ? '1px solid rgba(51,105,255,0.55)'
              : '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            boxShadow: pill.accent
              ? '0 0 40px rgba(51,105,255,0.25), 0 10px 40px rgba(0,0,0,0.7)'
              : '0 10px 40px rgba(0,0,0,0.6)',
          }}
        >
          <span className="text-xl font-black leading-none gradient-text" style={{ fontFamily: 'Syne, sans-serif' }}>
            {pill.value}
          </span>
          <span className="text-[9px] text-white/40 mt-1 font-semibold tracking-widest uppercase whitespace-nowrap">
            {pill.label}
          </span>
        </motion.div>
      ))}

      {/* Ambient corner glows */}
      <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: 'rgba(51,105,255,0.13)', filter: 'blur(50px)', zIndex: 0 }} />
      <div className="absolute -bottom-6 left-[20%] w-40 h-40 rounded-full pointer-events-none"
        style={{ background: 'rgba(249,115,22,0.09)', filter: 'blur(40px)', zIndex: 0 }} />
      <div className="absolute top-[40%] right-[10%] w-24 h-24 rounded-full pointer-events-none"
        style={{ background: 'rgba(99,102,241,0.12)', filter: 'blur(30px)', zIndex: 0 }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(3,3,10,0.6))' }} />
    </div>
  )
}

// ── HomePage ──────────────────────────────────────────────────
export default function HomePage() {
  const { data: servicesData, isLoading: servicesLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () => publicAPI.getServices(),
    select: (res) => res.data.services
  })

  const { data: testimonialsData, isLoading: testimonialsLoading } = useQuery({
    queryKey: ['testimonials', 'featured'],
    queryFn: () => publicAPI.getTestimonials({ featured: true }),
    select: (res) => res.data.testimonials
  })

  const { data: blogsData } = useQuery({
    queryKey: ['blogs', 'recent'],
    queryFn: () => publicAPI.getBlogs({ limit: 3 }),
    select: (res) => res.data.blogs
  })

  const { data: caseStudiesData } = useQuery({
    queryKey: ['case-studies', 'featured'],
    queryFn: () => publicAPI.getCaseStudies({ featured: true }),
    select: (res) => res.data.caseStudies
  })

  return (
    <PageWrapper>
      <Helmet>
        <title>To Fly Media – Performance Marketing Agency in Bhopal, India</title>
        <meta name="description" content="To Fly Media is a results-driven digital marketing agency in Bhopal. We specialize in Performance Marketing, Lead Generation, and Paid Ads." />
      </Helmet>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Backgrounds */}
        <div className="absolute inset-0" style={{ background: '#03030a' }} />
        {/* Large diagonal sweep behind collage */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(118deg, transparent 45%, rgba(51,105,255,0.045) 100%)',
        }} />
        {/* Blue blob — left */}
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none"
          style={{ background: 'rgba(51,105,255,0.09)' }} />
        {/* Orange warmth — bottom right */}
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
          style={{ background: 'rgba(249,115,22,0.07)' }} />
        {/* Fine dot grid */}
        <div className="absolute inset-0 opacity-[0.018] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }} />
        {/* Diagonal rule line — decorative */}
        <div className="absolute top-0 right-[42%] w-px h-full pointer-events-none opacity-[0.04]"
          style={{ background: 'linear-gradient(to bottom, transparent, white 30%, white 70%, transparent)' }} />

        <div className="container-site relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center pt-32 pb-24 min-h-screen">

            {/* ── Left: Copy ── */}
            <div className="flex flex-col justify-center order-2 lg:order-1">
              {/* Live badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-8 w-fit"
                style={{ background: 'rgba(51,105,255,0.1)', border: '1px solid rgba(51,105,255,0.22)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-brand-300 font-medium">Now serving 150+ brands across India</span>
                <ChevronRight size={13} className="text-brand-400" />
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="font-black leading-[1.04] mb-6"
                style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.8rem, 4.8vw, 5rem)' }}
              >
                <span className="text-white">Marketing That</span>
                <br />
                <span className="gradient-text">Actually Works.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-white/50 mb-10 leading-relaxed max-w-[480px]"
              >
                Performance marketing agency in Bhopal. We turn ad spend into predictable
                revenue — data-driven, results-obsessed, no fluff.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.42 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                <Link to="/contact" className="btn-primary text-base px-7 py-3.5">
                  Get Free Audit <ArrowRight size={17} />
                </Link>
                <Link to="/case-studies" className="btn-secondary text-base px-7 py-3.5">
                  <Play size={15} /> See Results
                </Link>
              </motion.div>

              {/* Trust row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.58 }}
                className="flex flex-col sm:flex-row flex-wrap gap-3 text-sm text-white/35"
              >
                {['No long-term contracts', 'Free marketing audit', 'Results in 30 days'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle size={13} className="text-green-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Collage ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative order-1 lg:order-2 hidden lg:block"
              style={{ height: 560 }}
            >
              <HeroCollage />
            </motion.div>

          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-white/12 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-white/25" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── TRUSTED BY ───────────────────────────────────────── */}
      <section className="py-12 border-y border-white/5 overflow-hidden">
        <div className="container-site mb-5 text-center">
          <p className="text-xs text-white/25 uppercase tracking-widest font-semibold">Trusted by growing brands</p>
        </div>
        <div className="relative">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...TRUSTED_BY, ...TRUSTED_BY].map((brand, i) => (
              <span key={i} className="text-white/20 font-bold text-lg font-display tracking-wide">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── METRICS ──────────────────────────────────────────── */}
      <SectionWrapper className="container-site py-24">
        <div className="text-center mb-14">
          <SectionTag icon={TrendingUp}>Our Numbers</SectionTag>
          <h2 className="section-heading text-white">
            Results That <span className="gradient-text">Speak for Themselves</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICS.map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <MetricCounter value={m.value} label={m.label} />
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <SectionWrapper className="container-site py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <SectionTag icon={Target}>What We Do</SectionTag>
            <h2 className="section-heading text-white mt-2">
              Services Engineered<br /><span className="gradient-text">for Growth</span>
            </h2>
          </div>
          <Link to="/services" className="btn-secondary text-sm w-fit">View All Services <ArrowRight size={16} /></Link>
        </div>
        {servicesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(servicesData || []).map((service, i) => (
              <ServiceCard key={service._id} service={service} delay={i * 0.08} />
            ))}
          </div>
        )}
      </SectionWrapper>

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <SectionWrapper className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent pointer-events-none" />
        <div className="container-site relative z-10">
          <div className="text-center mb-16">
            <SectionTag>How We Work</SectionTag>
            <h2 className="section-heading text-white mt-2">Our Proven <span className="gradient-text">4-Step Process</span></h2>
            <p className="text-white/45 mt-4 max-w-xl mx-auto">Every engagement follows a structured process designed for speed, clarity, and consistent results.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative glass-card p-7">
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-6 h-px bg-gradient-to-r from-brand-500/30 to-transparent z-10" />
                )}
                <div className="text-6xl font-black font-display text-brand-500/15 mb-4 leading-none">{step.step}</div>
                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── CASE STUDIES ─────────────────────────────────────── */}
      {caseStudiesData && caseStudiesData.length > 0 && (
        <SectionWrapper className="container-site py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <SectionTag>Proof of Work</SectionTag>
              <h2 className="section-heading text-white mt-2">Case Studies That<br /><span className="gradient-text">Show Our Impact</span></h2>
            </div>
            <Link to="/case-studies" className="btn-secondary text-sm w-fit">All Case Studies <ArrowRight size={16} /></Link>
          </div>
          {caseStudiesData[0] && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="glass-card-hover overflow-hidden rounded-3xl mb-6">
              <Link to={`/case-studies/${caseStudiesData[0].slug}`} className="flex flex-col lg:flex-row group">
                <div className="lg:w-1/2 aspect-video lg:aspect-auto min-h-[280px] bg-gradient-to-br from-brand-900/40 to-dark-800 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                      {caseStudiesData[0].results?.slice(0, 4).map((r, i) => (
                        <div key={i} className="p-4 rounded-xl text-center"
                          style={{ background: 'rgba(51,105,255,0.1)', border: '1px solid rgba(51,105,255,0.2)' }}>
                          <div className="text-2xl font-black font-display gradient-text">{r.value}</div>
                          <div className="text-xs text-white/40 mt-0.5 leading-tight">{r.metric}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 p-10 flex flex-col justify-center">
                  <div className="section-tag w-fit mb-4">{caseStudiesData[0].client?.industry || 'Case Study'}</div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-snug group-hover:text-brand-300 transition-colors">{caseStudiesData[0].title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-6 line-clamp-3">{caseStudiesData[0].challenge}</p>
                  <div className="flex items-center gap-2 text-brand-400 font-medium">
                    Read Full Case Study <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </SectionWrapper>
      )}

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <SectionWrapper className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/15 to-transparent pointer-events-none" />
        <div className="container-site relative z-10">
          <div className="text-center mb-14">
            <SectionTag icon={Star}>Client Love</SectionTag>
            <h2 className="section-heading text-white mt-2">What Our Clients <span className="gradient-text">Say About Us</span></h2>
          </div>
          {testimonialsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{[1,2,3].map(i => <SkeletonCard key={i} />)}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(testimonialsData || []).slice(0, 3).map((t, i) => (
                <TestimonialCard key={t._id} testimonial={t} delay={i * 0.1} />
              ))}
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* ── BLOG ─────────────────────────────────────────────── */}
      {blogsData && blogsData.length > 0 && (
        <SectionWrapper className="container-site py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <SectionTag>Latest Insights</SectionTag>
              <h2 className="section-heading text-white mt-2">From Our <span className="gradient-text">Marketing Blog</span></h2>
            </div>
            <Link to="/blog" className="btn-secondary text-sm w-fit">All Articles <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogsData.map((blog, i) => <BlogCard key={blog._id} blog={blog} delay={i * 0.1} />)}
          </div>
        </SectionWrapper>
      )}

      <CTABanner />
    </PageWrapper>
  )
}