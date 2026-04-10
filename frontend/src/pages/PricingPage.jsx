import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  Check, ArrowUpRight, ChevronDown, Zap,
  Rocket, Crown, Users, TrendingUp, Award,
  MessageCircle, Sparkles, Shield
} from 'lucide-react'
import Footer from '../components/layout/Footer'
import PaymentModal from '../components/payment/PaymentModal'

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
  }

  @media (hover: hover) {
    .plan-card:hover { transform: translateY(-8px); }
  }

  .cta-btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 15px 36px;
    border-radius: 60px;
    background: linear-gradient(135deg, #00D2FF, #FF2D75);
    color: #fff;
    font-weight: 700;
    text-decoration: none;
    font-size: 15px;
    box-shadow: 0 0 24px rgba(0,210,255,0.25);
    transition: opacity 0.15s;
    white-space: nowrap;
  }
  .cta-btn-primary:hover { opacity: 0.85; }

  .cta-btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 15px 28px;
    border-radius: 60px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.6);
    font-weight: 600;
    text-decoration: none;
    font-size: 15px;
    transition: border-color 0.15s, color 0.15s;
    white-space: nowrap;
  }
  .cta-btn-secondary:hover { border-color: #00D2FF; color: #00D2FF; }

  .problem-row {
    background: rgba(255,255,255,0.03);
    border-radius: 18px;
    padding: 20px 24px;
    display: grid;
    grid-template-columns: 44px 1fr 28px 1fr;
    align-items: center;
    gap: 16px;
    border: 1px solid rgba(255,255,255,0.05);
    transition: background 0.2s;
  }
  .problem-row:hover { background: rgba(0,210,255,0.05); }

  @media (max-width: 640px) {
    .problem-row {
      grid-template-columns: 1fr;
      gap: 10px;
      padding: 16px;
    }
    .problem-arrow { display: none; }
  }

  .stats-row {
    display: flex;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    .stats-row { gap: 24px; }
    .stats-row > div { min-width: 80px; }
  }

  .plans-grid {
    display: flex;
    gap: 24px;
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;
  }

  .plan-card-wrapper {
    flex: 1 1 0;
    min-width: 280px;
    max-width: 380px;
  }

  @media (max-width: 900px) {
    .plan-card-wrapper {
      min-width: 260px;
      max-width: 100%;
      flex: 1 1 280px;
    }
  }

  @media (max-width: 640px) {
    .plan-card-wrapper {
      min-width: 0;
      max-width: 100%;
      flex: 1 1 100%;
    }
    .plans-grid { gap: 16px; }
  }

  .cta-btn-row {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    .cta-btn-row { flex-direction: column; align-items: stretch; }
    .cta-btn-primary, .cta-btn-secondary {
      width: 100%;
      padding: 14px 20px;
      font-size: 14px;
    }
  }

  .guarantee-box {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,200,50,0.2);
    border-radius: 28px;
    padding: 52px 48px;
    text-align: center;
  }

  @media (max-width: 640px) {
    .guarantee-box { padding: 32px 20px; border-radius: 20px; }
  }

  .final-cta-box {
    background: linear-gradient(135deg, rgba(0,210,255,0.08), rgba(255,45,117,0.05), rgba(123,47,157,0.08));
    border-radius: 36px;
    padding: 52px 48px;
    text-align: center;
    border: 1px solid rgba(0,210,255,0.15);
  }

  @media (max-width: 640px) {
    .final-cta-box { padding: 32px 20px; border-radius: 24px; }
  }

  .hero-section {
    text-align: center;
    padding: 64px 20px 64px;
    max-width: 860px;
    margin: 0 auto;
  }

  @media (max-width: 640px) {
    .hero-section { padding: 48px 16px 48px; }
  }

  .section-wrap {
    max-width: 960px;
    margin: 0 auto 80px;
    padding: 0 20px;
  }

  @media (max-width: 640px) {
    .section-wrap { margin-bottom: 56px; padding: 0 16px; }
  }

  .plans-wrap {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
  }

  @media (max-width: 640px) {
    .plans-wrap { padding: 0 16px; }
  }

  .plan-card-inner {
    padding: 24px 24px 0;
  }

  @media (max-width: 380px) {
    .plan-card-inner { padding: 18px 16px 0; }
  }

  .plan-cta-area {
    padding: 16px 24px 24px;
    margin-top: auto;
  }

  @media (max-width: 380px) {
    .plan-cta-area { padding: 14px 16px 20px; }
  }

  .plan-addons-area {
    padding: 0 24px;
  }

  @media (max-width: 380px) {
    .plan-addons-area { padding: 0 16px; }
  }

  .whatsapp-fab {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 13px 24px;
    border-radius: 60px;
    background: linear-gradient(135deg, #25D366, #128C7E);
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    text-decoration: none;
    box-shadow: 0 4px 20px rgba(37,211,102,0.35);
    border: 1px solid rgba(255,255,255,0.15);
    transition: transform 0.15s, box-shadow 0.15s;
  }

  @media (max-width: 480px) {
    .whatsapp-fab {
      bottom: 16px;
      right: 16px;
      padding: 11px 18px;
      font-size: 13px;
      gap: 7px;
    }
  }

  .whatsapp-fab:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(37,211,102,0.45);
  }
`

const PLANS = [
  {
    id: 'quarterly',
    num: '01',
    Icon: Zap,
    label: 'Quarterly',
    duration: '3 Months',
    tagline: 'Start getting leads',
    orig: '₹1,20,000',
    price: '₹99,000',
    discount: '17% OFF',
    leads: '200+ Leads in 3 Months',
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
    result: 'Consistent brand presence that fills your pipeline with 200+ leads over 3 months.',
  },
  {
    id: 'halfyearly',
    num: '02',
    Icon: Rocket,
    label: 'Half Yearly',
    duration: '6 Months',
    tagline: 'Turn clicks into clients',
    orig: '₹2,40,000',
    price: '₹1,79,998',
    discount: '25% OFF',
    leads: '450+ Leads in 6 Months',
    color: '#FF2D75',
    gradient: 'linear-gradient(135deg, #FF2D75, #CC0052)',
    badge: '🔥 Most Popular',
    services: [
      'Everything in Quarterly',
      'High-converting landing page',
      'Meta + Google Ads management',
      'A/B testing & funnel optimisation',
      'CRM setup + lead nurturing flows',
      'WhatsApp automation sequences',
      'Weekly performance calls',
      'Conversion rate optimisation',
    ],
    result: 'Qualified leads hitting your inbox every week — on autopilot for 6 months.',
  },
  {
    id: 'annually',
    num: '03',
    Icon: Crown,
    label: 'Annually',
    duration: '12 Months',
    tagline: 'Own your market',
    orig: '₹4,80,000',
    price: '₹3,11,998',
    discount: '35% OFF',
    leads: '950+ Leads in 12 Months',
    color: '#7B2F9D',
    gradient: 'linear-gradient(135deg, #A855F7, #6D28D9)',
    badge: '👑 Best Value',
    services: [
      'Everything in Half Yearly',
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
  { icon: '📉', pain: 'Posting content but getting zero engagement', fix: "Data-driven strategy aligned to your audience's exact scroll habits" },
  { icon: '💸', pain: 'Spending on ads with no trackable ROI', fix: 'Full-funnel attribution — every rupee tracked back to a real sale' },
  { icon: '🔄', pain: 'Leads come in but never convert', fix: 'Automated nurturing sequences that warm leads while you sleep' },
  { icon: '🗺️', pain: 'Competitors outranking you on Google Maps', fix: 'Aggressive GMB + local SEO that puts you #1 in your city' },
  { icon: '🤷', pain: 'Still 100% dependent on referrals', fix: 'Consistent inbound pipeline that runs with or without referrals' },
]

function PlanCard({ plan, index, onPay }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="plan-card plan-card-wrapper"
      style={{
        borderRadius: 28,
        background: 'rgba(12, 14, 22, 0.9)',
        border: `1px solid ${plan.badge ? `${plan.color}55` : 'rgba(255,255,255,0.08)'}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: plan.badge ? `0 0 40px ${plan.color}22` : '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      <div style={{ height: 3, background: plan.gradient, width: '100%', flexShrink: 0 }} />

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

      <div className="plan-card-inner">
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: plan.color, letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase' }}>{plan.num}</span>
            <span style={{
              fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.35)',
              background: 'rgba(255,255,255,0.06)', borderRadius: 20,
              padding: '3px 10px', letterSpacing: '0.04em',
            }}>{plan.duration}</span>
          </div>
          <div style={{
            width: 42, height: 42, borderRadius: 14,
            background: `${plan.color}18`,
            border: `1px solid ${plan.color}33`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <plan.Icon size={20} color={plan.color} strokeWidth={1.6} />
          </div>
        </div>

        <div style={{
          fontSize: 'clamp(28px, 6vw, 34px)', fontWeight: 800,
          background: plan.gradient,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em', marginBottom: 4,
        }}>
          {plan.label}
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>{plan.tagline}</div>

        {/* Pricing block */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${plan.color}22`,
          borderRadius: 16, padding: '14px 16px', marginBottom: 22,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through' }}>{plan.orig}</span>
            <span style={{
              fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6,
              background: 'rgba(46,204,113,0.15)', color: '#2ecc71', whiteSpace: 'nowrap',
            }}>{plan.discount}</span>
          </div>
          <div style={{ fontSize: 'clamp(28px, 7vw, 36px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{plan.price}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>total for {plan.duration.toLowerCase()}</div>
          <div style={{ fontSize: 12, color: plan.color, fontWeight: 600, marginTop: 10 }}>📈 {plan.leads}</div>
        </div>

        {/* Features */}
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: 9 }}>
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
          borderRadius: 12, padding: '12px 14px', marginBottom: 18,
          borderLeft: `3px solid ${plan.color}`,
        }}>
          <div style={{ fontSize: 10, color: plan.color, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5, fontWeight: 600 }}>Result</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{plan.result}</div>
        </div>
      </div>

      {/* Add-ons toggle */}
      <div className="plan-addons-area">
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '12px 0', width: '100%',
            fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: plan.color,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            WebkitTapHighlightColor: 'transparent',
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
      <div className="plan-cta-area">
        <button
          onClick={() => onPay(plan)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '14px 24px', borderRadius: 50, width: '100%',
            border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700,
            background: plan.gradient, color: '#fff',
            boxShadow: `0 4px 18px ${plan.color}44`,
            transition: 'opacity 0.15s',
            WebkitTapHighlightColor: 'transparent',
            minHeight: 48,
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Get Started <ArrowUpRight size={15} />
        </button>
      </div>
    </motion.div>
  )
}

function ProblemRow({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="problem-row"
    >
      <div style={{ fontSize: 28, lineHeight: 1 }}>{item.icon}</div>
      <div>
        <div style={{ fontSize: 11, color: 'rgba(255,100,100,0.8)', marginBottom: 5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Problem</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>{item.pain}</div>
      </div>
      <div className="problem-arrow" style={{ display: 'flex', justifyContent: 'center' }}>
        <ArrowUpRight size={18} color="#00D2FF" />
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#00D2FF', marginBottom: 5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Solution</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.4 }}>{item.fix}</div>
      </div>
    </motion.div>
  )
}

export default function PricingPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />
      <Helmet>
        <title>ToFly Media — Growth Packages</title>
        <meta name="description" content="Results-driven digital marketing packages. Transparent pricing, guaranteed leads." />
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Helmet>

      <div
        className="pricing-root"
        style={{
          minHeight: '100vh',
          background: '#08090F',
          color: '#fff',
          overflowX: 'clip',
          position: 'relative',
        }}
      >
        {/* Grid overlay */}
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)`,
          backgroundSize: '52px 52px',
        }} />

        {/* Static gradient accents */}
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

        <div style={{ position: 'relative', zIndex: 2, WebkitOverflowScrolling: 'touch' }}>

          {/* ── HERO ── */}
          <div ref={heroRef} className="hero-section">

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: 32, display: 'flex', justifyContent: 'center' }}
            >
              <img
                src="/hero/logo.jpg"
                alt="ToFly Media"
                style={{ height: 52, width: 'auto', objectFit: 'contain', borderRadius: 12 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: 24 }}
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
              style={{
                fontSize: 'clamp(36px, 9vw, 78px)',
                fontWeight: 800, lineHeight: 1.08,
                margin: '0 0 18px',
                letterSpacing: '-0.03em',
              }}
            >
              Stop Guessing.<br />
              <span className="gtext">Start Getting Leads.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.18 }}
              style={{
                fontSize: 'clamp(15px, 3.5vw, 18px)',
                color: 'rgba(255,255,255,0.45)',
                maxWidth: 520,
                margin: '0 auto 40px',
                lineHeight: 1.65,
              }}
            >
              A complete digital growth system — ads, social, automation — built to fill your pipeline for the entire duration of your plan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.26 }}
            >
              <div className="stats-row">
                {[
                  { value: '50+', label: 'Businesses Scaled', Icon: Users },
                  { value: '₹4Cr+', label: 'Revenue Generated', Icon: TrendingUp },
                  { value: '98%', label: 'Client Retention', Icon: Award },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginBottom: 4 }}>
                      <s.Icon size={16} color="#00D2FF" strokeWidth={2} />
                      <span style={{ fontSize: 'clamp(24px, 6vw, 30px)', fontWeight: 800, color: '#fff' }}>{s.value}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── DIVIDER ── */}
          <div style={{
            width: '60%', maxWidth: 240, height: 2,
            background: 'linear-gradient(90deg, transparent, #00D2FF, #FF2D75, #7B2F9D, transparent)',
            margin: '0 auto 72px', borderRadius: 2,
          }} />

          {/* ── PROBLEMS ── */}
          <div className="section-wrap">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', marginBottom: 36 }}
            >
              <div style={{ fontSize: 11, color: '#FF2D75', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>We Fix These</div>
              <h2 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
                From <span style={{ color: 'rgba(255,255,255,0.25)' }}>frustration</span> to{' '}
                <span className="gtext">results</span>
              </h2>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PROBLEMS.map((item, i) => <ProblemRow key={i} item={item} index={i} />)}
            </div>
          </div>

          {/* ── PLANS ── */}
          <div className="plans-wrap">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', marginBottom: 48 }}
            >
              <div style={{ fontSize: 11, color: '#7B2F9D', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>Pricing</div>
              <h2 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 12px' }}>
                Choose your <span className="gtext">trajectory</span>
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', maxWidth: 460, margin: '0 auto' }}>
                Commit to a plan. Get results for the full duration. No hidden fees.
              </p>
            </motion.div>

            <div className="plans-grid">
              {PLANS.map((plan, i) => (
                <PlanCard key={plan.id} plan={plan} index={i} onPay={setSelectedPlan} />
              ))}
            </div>
          </div>

          {/* ── GUARANTEE ── */}
          <div style={{ maxWidth: 860, margin: '80px auto 0', padding: '0 20px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="guarantee-box"
            >
              <div style={{ fontSize: 40, marginBottom: 14 }}>🛡️</div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(255,200,50,0.1)',
                border: '1px solid rgba(255,200,50,0.25)',
                borderRadius: 40, padding: '5px 16px', marginBottom: 18,
              }}>
                <Shield size={13} color="#ffc832" />
                <span style={{ fontSize: 11, color: '#ffc832', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Lead Guarantee</span>
              </div>
              <h3 style={{ fontSize: 'clamp(20px, 4vw, 34px)', fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em' }}>
                We deliver or we work <span style={{ color: '#ffc832' }}>free</span>
              </h3>
              <p style={{ fontSize: 'clamp(14px, 3vw, 16px)', color: 'rgba(255,255,255,0.5)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
                If we don't hit the promised lead numbers by the end of your plan, we keep working at zero cost until we do. No excuses. No fine print.
              </p>
            </motion.div>
          </div>

          {/* ── FINAL CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: 900, margin: '72px auto 0', padding: '0 20px' }}
          >
            <div className="final-cta-box">
              <h3 style={{ fontSize: 'clamp(22px, 5vw, 40px)', fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em' }}>
                Ready to <span className="gtext">scale?</span>
              </h3>
              <p style={{ fontSize: 'clamp(14px, 3vw, 15px)', color: 'rgba(255,255,255,0.45)', maxWidth: 440, margin: '0 auto 28px', lineHeight: 1.65 }}>
                Only 5 client spots open this month. Book a free 30-minute strategy call and we'll map out exactly what your business needs.
              </p>
              <div className="cta-btn-row">
                <a
                  href="https://wa.me/919752523894?text=Hi%20ToFly!%20I'd%20like%20a%20free%20strategy%20call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-btn-primary"
                >
                  Book Free Strategy Call <Rocket size={16} />
                </a>
                <a
                  href="https://wa.me/919752523894"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-btn-secondary"
                >
                  <MessageCircle size={16} /> WhatsApp Us Now
                </a>
              </div>
            </div>
          </motion.div>

          <div style={{ paddingTop: 80 }}>
            <Footer />
          </div>

        </div>
      </div>

      {/* Payment Modal — unchanged */}
      {selectedPlan && (
        <PaymentModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}

      {/* Sticky WhatsApp FAB */}
      <motion.a
        href="https://wa.me/919752523894?text=Hi%20ToFly!%20I'm%20interested%20in%20your%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
      >
        <MessageCircle size={17} />
        Chat on WhatsApp
      </motion.a>
    </>
  )
}