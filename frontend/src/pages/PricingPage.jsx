import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  Check, ArrowUpRight, ChevronDown, Zap,
  Rocket, Crown, Users, TrendingUp, Award,
  MessageCircle, Sparkles, Shield
} from 'lucide-react'
import Footer from '../components/layout/Footer'

/* ─────────────────────────────────────────
   GLOBAL STYLES
   - Removed: fixed blur blobs, pulse-glow animation, float animation
   - Removed: filter:blur on any positioned element
   - Kept: grid overlay (cheap), shimmer on text only, card hover
───────────────────────────────────────── */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');

  .pricing-root, .pricing-root * { font-family: 'Inter', sans-serif !important; box-sizing: border-box; }

  .gtext {
    background: linear-gradient(135deg, #00D2FF 0%, #7B2F9D 50%, #FF2D75 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 4s linear infinite;
  }

  @keyframes shimmer {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  .plan-card {
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    will-change: transform;
  }
  .plan-card:hover { transform: translateY(-8px); }
`

/* ─────────────────────────────────────────
   DATA — REAL PRICING
───────────────────────────────────────── */
const PLANS = [
  {
    id: 'basic',
    num: '01',
    Icon: Zap,
    label: 'Basic',
    tagline: 'Start getting leads',
    orig: '₹1,20,000',
    price: '₹99,000',
    discount: '17% OFF',
    leads: '200+ Leads / Month',
    color: '#00D2FF',
    gradient: 'linear-gradient(135deg, #00D2FF, #0088BB)',
    badge: null,
    services: [
      'Social Media Management (2 platforms)',
      'Google My Business optimisation',
      'Facebook & Instagram Ads setup',
      'Lead generation system',
      'Monthly analytics report',
      'Review generation strategy',
    ],
    result: 'Consistent brand presence that fills your pipeline with 200+ leads every month.',
  },
  {
    id: 'standard',
    num: '02',
    Icon: Rocket,
    label: 'Standard',
    tagline: 'Turn clicks into clients',
    orig: '₹2,40,000',
    price: '₹1,79,998',
    discount: '25% OFF',
    leads: '450+ Leads / Month',
    color: '#FF2D75',
    gradient: 'linear-gradient(135deg, #FF2D75, #CC0052)',
    badge: '🔥 Most Popular',
    services: [
      'Everything in Basic',
      'High-converting landing page',
      'Meta + Google Ads management',
      'A/B testing & funnel optimisation',
      'CRM setup + lead nurturing flows',
      'WhatsApp automation sequences',
      'Weekly performance calls',
      'Conversion rate optimisation',
    ],
    result: 'Qualified leads hitting your inbox every week — on autopilot.',
  },
  {
    id: 'premium',
    num: '03',
    Icon: Crown,
    label: 'Premium',
    tagline: 'Own your market',
    orig: '₹4,80,000',
    price: '₹3,11,998',
    discount: '35% OFF',
    leads: '950+ Leads / Month',
    color: '#7B2F9D',
    gradient: 'linear-gradient(135deg, #A855F7, #6D28D9)',
    badge: '👑 Elite',
    services: [
      'Everything in Standard',
      'Full funnel — ads to closed deal',
      'Advanced automation + CRM',
      'Influencer & PR outreach',
      'Custom analytics dashboard',
      'Dedicated strategy manager',
      'Scaling ad strategy',
      'Competitor intelligence reports',
    ],
    result: 'Undeniable market authority in 90 days — or we work free until you get there.',
  },
]

const PROBLEMS = [
  { icon: '📉', pain: 'Posting content but getting zero engagement', fix: 'Data-driven strategy aligned to your audience\'s exact scroll habits' },
  { icon: '💸', pain: 'Spending on ads with no trackable ROI', fix: 'Full-funnel attribution — every rupee tracked back to a real sale' },
  { icon: '🔄', pain: 'Leads come in but never convert', fix: 'Automated nurturing sequences that warm leads while you sleep' },
  { icon: '🗺️', pain: 'Competitors outranking you on Google Maps', fix: 'Aggressive GMB + local SEO that puts you #1 in your city' },
  { icon: '🤷', pain: 'Still 100% dependent on referrals', fix: 'Consistent inbound pipeline that runs with or without referrals' },
]

/* ─────────────────────────────────────────
   PLAN CARD
───────────────────────────────────────── */
function PlanCard({ plan, index }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="plan-card"
      style={{
        flex: '1 1 0',
        minWidth: 290,
        maxWidth: 380,
        borderRadius: 28,
        background: 'rgba(12, 14, 22, 0.9)',
        border: `1px solid rgba(255,255,255,0.08)`,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: plan.badge ? `0 0 40px ${plan.color}22` : '0 8px 32px rgba(0,0,0,0.3)',
        ...(plan.badge ? { borderColor: `${plan.color}55` } : {}),
      }}
    >
      {/* Top color bar */}
      <div style={{ height: 3, background: plan.gradient, width: '100%' }} />

      {plan.badge && (
        <div style={{
          position: 'absolute', top: 20, right: 20,
          background: plan.gradient,
          color: '#fff', fontSize: 11, fontWeight: 700,
          letterSpacing: '0.04em',
          padding: '5px 14px', borderRadius: 40, zIndex: 2,
        }}>
          {plan.badge}
        </div>
      )}

      <div style={{ padding: '28px 28px 0' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 11, color: plan.color, letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase' }}>{plan.num}</span>
          <div style={{
            width: 42, height: 42, borderRadius: 14,
            background: `${plan.color}18`,
            border: `1px solid ${plan.color}33`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <plan.Icon size={20} color={plan.color} strokeWidth={1.6} />
          </div>
        </div>

        <div style={{
          fontSize: 34, fontWeight: 800,
          background: plan.gradient,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em', marginBottom: 4,
        }}>
          {plan.label}
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>{plan.tagline}</div>

        {/* Pricing block */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${plan.color}22`,
          borderRadius: 16, padding: '16px 18px', marginBottom: 26,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through' }}>{plan.orig}</span>
            <span style={{
              fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6,
              background: 'rgba(46,204,113,0.15)', color: '#2ecc71',
            }}>{plan.discount}</span>
          </div>
          <div style={{ fontSize: 36, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{plan.price}</div>
          <div style={{ fontSize: 12, color: plan.color, fontWeight: 600, marginTop: 8 }}>📈 {plan.leads}</div>
        </div>

        {/* Features */}
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {plan.services.map((s, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{
                marginTop: 2, flexShrink: 0, width: 17, height: 17, borderRadius: '50%',
                background: `${plan.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Check size={9} color={plan.color} strokeWidth={3} />
              </div>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{s}</span>
            </li>
          ))}
        </ul>

        {/* Result */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 12, padding: '12px 14px', marginBottom: 20,
          borderLeft: `3px solid ${plan.color}`,
        }}>
          <div style={{ fontSize: 10, color: plan.color, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5, fontWeight: 600 }}>Result</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{plan.result}</div>
        </div>
      </div>

      {/* Add-ons toggle — no addons data needed, keeping as expandable note */}
      <div style={{ padding: '0 28px' }}>
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '12px 0', width: '100%',
            fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: plan.color,
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <span>Custom add-ons available</span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={13} color={plan.color} />
          </motion.div>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ paddingBottom: 14, fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                Extra platforms, video ad creatives, email drip campaigns, full website builds, app/portal development — priced on request.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div style={{ padding: '16px 28px 28px', marginTop: 'auto' }}>
        <a
          href={`https://wa.me/919752523894?text=Hi%20ToFly!%20I'm%20interested%20in%20the%20${encodeURIComponent(plan.label)}%20Plan`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '14px 24px', borderRadius: 50, width: '100%',
            textDecoration: 'none', fontSize: 14, fontWeight: 700,
            background: plan.gradient, color: '#fff',
            boxShadow: `0 4px 18px ${plan.color}44`,
            transition: 'opacity 0.15s, transform 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Get Started <ArrowUpRight size={15} />
        </a>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   PROBLEM ROW
───────────────────────────────────────── */
function ProblemRow({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderRadius: 18,
        padding: '20px 24px',
        display: 'grid',
        gridTemplateColumns: '44px 1fr 28px 1fr',
        alignItems: 'center',
        gap: 16,
        border: '1px solid rgba(255,255,255,0.05)',
        transition: 'background 0.2s',
      }}
      onHoverStart={e => e.currentTarget && (e.currentTarget.style.background = 'rgba(0,210,255,0.05)')}
      onHoverEnd={e => e.currentTarget && (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
    >
      <div style={{ fontSize: 28, lineHeight: 1 }}>{item.icon}</div>
      <div>
        <div style={{ fontSize: 11, color: 'rgba(255,100,100,0.8)', marginBottom: 5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Problem</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>{item.pain}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ArrowUpRight size={18} color="#00D2FF" />
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#00D2FF', marginBottom: 5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Solution</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.4 }}>{item.fix}</div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function PricingPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />
      <Helmet>
        <title>ToFly Media — Growth Packages</title>
        <meta name="description" content="Results-driven digital marketing packages. Transparent pricing, guaranteed leads." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="pricing-root" style={{
        minHeight: '100vh',
        background: '#08090F',
        color: '#fff',
        overflowX: 'hidden',
        position: 'relative',
      }}>
        {/* Static grid overlay — GPU friendly, zero JS */}
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)`,
          backgroundSize: '52px 52px',
        }} />

        {/* Static gradient accents — no animation, no filter:blur on fixed elements */}
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '50vh',
          background: 'radial-gradient(ellipse 80% 60% at 20% 0%, rgba(0,210,255,0.07) 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, height: '50vh',
          background: 'radial-gradient(ellipse 80% 60% at 80% 100%, rgba(255,45,117,0.07) 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>

          {/* ── HERO ── */}
          <div ref={heroRef} style={{ textAlign: 'center', padding: '72px 24px 72px', maxWidth: 860, margin: '0 auto' }}>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: 36, display: 'flex', justifyContent: 'center' }}
            >
              <img
                src="/hero/logo.jpg"
                alt="ToFly Media"
                style={{ height: 56, width: 'auto', objectFit: 'contain', borderRadius: 12 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: 28 }}
            >
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(0,210,255,0.08)',
                padding: '7px 18px', borderRadius: 60,
                border: '1px solid rgba(0,210,255,0.25)',
              }}>
                <Sparkles size={14} color="#00D2FF" />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#00D2FF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>2026 Growth Packages</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 }}
              style={{ fontSize: 'clamp(40px, 8vw, 78px)', fontWeight: 800, lineHeight: 1.08, marginBottom: 20, letterSpacing: '-0.03em' }}
            >
              Stop Guessing.<br />
              <span className="gtext">Start Getting Leads.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.18 }}
              style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)', maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.65 }}
            >
              A complete digital growth system — ads, social, automation — built to fill your pipeline every single month.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.26 }}
              style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}
            >
              {[
                { value: '50+', label: 'Businesses Scaled', Icon: Users },
                { value: '₹4Cr+', label: 'Revenue Generated', Icon: TrendingUp },
                { value: '98%', label: 'Client Retention', Icon: Award },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginBottom: 4 }}>
                    <s.Icon size={16} color="#00D2FF" strokeWidth={2} />
                    <span style={{ fontSize: 30, fontWeight: 800, color: '#fff' }}>{s.value}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── DIVIDER ── */}
          <div style={{
            width: '60%', maxWidth: 240, height: 2,
            background: 'linear-gradient(90deg, transparent, #00D2FF, #FF2D75, #7B2F9D, transparent)',
            margin: '0 auto 88px', borderRadius: 2,
          }} />

          {/* ── PROBLEMS ── */}
          <div style={{ maxWidth: 960, margin: '0 auto 96px', padding: '0 24px' }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', marginBottom: 44 }}
            >
              <div style={{ fontSize: 11, color: '#FF2D75', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>We Fix These</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                From <span style={{ color: 'rgba(255,255,255,0.25)' }}>frustration</span> to{' '}
                <span className="gtext">results</span>
              </h2>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {PROBLEMS.map((item, i) => <ProblemRow key={i} item={item} index={i} />)}
            </div>
          </div>

          {/* ── PLANS ── */}
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', marginBottom: 56 }}
            >
              <div style={{ fontSize: 11, color: '#7B2F9D', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>Pricing</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Choose your <span className="gtext">trajectory</span>
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', maxWidth: 460, margin: '14px auto 0' }}>
                Monthly retainers. Cancel anytime. No lock-in.
              </p>
            </motion.div>

            <div style={{
              display: 'flex', gap: 24,
              justifyContent: 'center', alignItems: 'stretch', flexWrap: 'wrap',
            }}>
              {PLANS.map((plan, i) => <PlanCard key={plan.id} plan={plan} index={i} />)}
            </div>
          </div>

          {/* ── GUARANTEE ── */}
          <div style={{ maxWidth: 860, margin: '96px auto 0', padding: '0 24px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,200,50,0.2)',
                borderRadius: 28, padding: '52px 48px', textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 44, marginBottom: 16 }}>🛡️</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,200,50,0.1)', border: '1px solid rgba(255,200,50,0.25)', borderRadius: 40, padding: '5px 16px', marginBottom: 20 }}>
                <Shield size={13} color="#ffc832" />
                <span style={{ fontSize: 11, color: '#ffc832', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Lead Guarantee</span>
              </div>
              <h3 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.02em' }}>
                We deliver or we work <span style={{ color: '#ffc832' }}>free</span>
              </h3>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
                If we don't hit the promised lead numbers, we keep working at zero cost until we do. No excuses. No fine print.
              </p>
            </motion.div>
          </div>

          {/* ── FINAL CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: 900, margin: '80px auto 0', padding: '0 24px' }}
          >
            <div style={{
              background: 'linear-gradient(135deg, rgba(0,210,255,0.08), rgba(255,45,117,0.05), rgba(123,47,157,0.08))',
              borderRadius: 36, padding: '52px 48px', textAlign: 'center',
              border: '1px solid rgba(0,210,255,0.15)',
            }}>
              <h3 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.02em' }}>
                Ready to <span className="gtext">scale?</span>
              </h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', maxWidth: 440, margin: '0 auto 32px', lineHeight: 1.65 }}>
                Only 5 client spots open this month. Book a free 30-minute strategy call and we'll map out exactly what your business needs.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="https://wa.me/919752523894?text=Hi%20ToFly!%20I'd%20like%20a%20free%20strategy%20call"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    padding: '15px 36px', borderRadius: 60,
                    background: 'linear-gradient(135deg, #00D2FF, #FF2D75)',
                    color: '#fff', fontWeight: 700, textDecoration: 'none',
                    fontSize: 15, boxShadow: '0 0 24px rgba(0,210,255,0.25)',
                    transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Book Free Strategy Call <Rocket size={16} />
                </a>
                <a
                  href="https://wa.me/919752523894"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '15px 28px', borderRadius: 60,
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.6)', fontWeight: 600, textDecoration: 'none',
                    fontSize: 15, transition: 'border-color 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#00D2FF'; e.currentTarget.style.color = '#00D2FF' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
                >
                  <MessageCircle size={16} /> WhatsApp Us Now
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <div style={{ paddingTop: 80 }}>
        <Footer />
      </div>

      {/* Sticky WhatsApp */}
      <motion.a
        href="https://wa.me/919752523894?text=Hi%20ToFly!%20I'm%20interested%20in%20your%20services"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '13px 24px', borderRadius: 60,
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          color: '#fff', fontWeight: 700, fontSize: 14,
          textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(37,211,102,0.35)',
          border: '1px solid rgba(255,255,255,0.15)',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
        onHoverStart={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(37,211,102,0.45)' }}
        onHoverEnd={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.35)' }}
      >
        <MessageCircle size={17} />
        Chat on WhatsApp
      </motion.a>
    </>
  )
}