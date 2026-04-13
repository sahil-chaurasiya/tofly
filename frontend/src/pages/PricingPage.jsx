import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Check, ArrowUpRight, ChevronDown,
  Moon, Star, Sun, Users, TrendingUp, Award,
  MessageCircle, Sparkles, Shield, Rocket
} from 'lucide-react'
import Footer from '../components/layout/Footer'
import PaymentModal from '../components/payment/PaymentModal'

// ─── GLOBAL STYLES ───────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Lato:wght@300;400;700&display=swap');

  .astro-root, .astro-root * { box-sizing: border-box; }
  .astro-root { font-family: 'Lato', sans-serif !important; }
  .astro-root h1, .astro-root h2, .astro-root h3, .astro-root h4 {
    font-family: 'Cinzel', serif !important;
  }

  .gtext {
    background: linear-gradient(135deg, #F6C90E 0%, #E8A0BF 45%, #C77DFF 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 5s linear infinite;
  }
  @keyframes shimmer {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.2; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }

  .plan-card {
    transition: transform 0.28s ease, box-shadow 0.28s ease;
  }
  @media (hover: hover) {
    .plan-card:hover { transform: translateY(-10px); }
  }

  .cta-btn-primary {
    display: inline-flex; align-items: center; justify-content: center;
    gap: 10px; padding: 15px 36px; border-radius: 60px;
    background: linear-gradient(135deg, #F6C90E, #C77DFF);
    color: #0B0A12; font-weight: 700; text-decoration: none;
    font-size: 15px; font-family: 'Lato', sans-serif;
    box-shadow: 0 0 28px rgba(246,201,14,0.3);
    transition: opacity 0.15s; white-space: nowrap; border: none; cursor: pointer;
  }
  .cta-btn-primary:hover { opacity: 0.85; }

  .cta-btn-secondary {
    display: inline-flex; align-items: center; justify-content: center;
    gap: 8px; padding: 15px 28px; border-radius: 60px;
    background: transparent; border: 1px solid rgba(246,201,14,0.2);
    color: rgba(246,201,14,0.6); font-weight: 600; text-decoration: none;
    font-size: 15px; font-family: 'Lato', sans-serif;
    transition: border-color 0.15s, color 0.15s; white-space: nowrap;
  }
  .cta-btn-secondary:hover { border-color: #F6C90E; color: #F6C90E; }

  .problem-row {
    background: rgba(255,255,255,0.03);
    border-radius: 18px; padding: 20px 24px;
    display: grid; grid-template-columns: 44px 1fr 28px 1fr;
    align-items: center; gap: 16px;
    border: 1px solid rgba(246,201,14,0.07);
    transition: background 0.2s;
  }
  .problem-row:hover { background: rgba(246,201,14,0.04); }

  @media (max-width: 640px) {
    .problem-row { grid-template-columns: 1fr; gap: 10px; padding: 16px; }
    .problem-arrow { display: none; }
  }

  .stats-row { display: flex; justify-content: center; gap: 44px; flex-wrap: wrap; }
  @media (max-width: 480px) { .stats-row { gap: 24px; } }

  .plans-grid { display: flex; gap: 24px; justify-content: center; align-items: stretch; flex-wrap: wrap; }
  .plan-card-wrapper { flex: 1 1 0; min-width: 280px; max-width: 380px; }
  @media (max-width: 900px) { .plan-card-wrapper { min-width: 260px; max-width: 100%; flex: 1 1 280px; } }
  @media (max-width: 640px) { .plan-card-wrapper { min-width: 0; max-width: 100%; flex: 1 1 100%; } .plans-grid { gap: 16px; } }

  .cta-btn-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  @media (max-width: 480px) {
    .cta-btn-row { flex-direction: column; align-items: stretch; }
    .cta-btn-primary, .cta-btn-secondary { width: 100%; padding: 14px 20px; font-size: 14px; }
  }

  .hero-section { text-align: center; padding: 72px 20px 64px; max-width: 880px; margin: 0 auto; }
  @media (max-width: 640px) { .hero-section { padding: 52px 16px 48px; } }
  .section-wrap { max-width: 960px; margin: 0 auto 80px; padding: 0 20px; }
  @media (max-width: 640px) { .section-wrap { margin-bottom: 56px; padding: 0 16px; } }
  .plans-wrap { max-width: 1280px; margin: 0 auto; padding: 0 20px; }
  @media (max-width: 640px) { .plans-wrap { padding: 0 16px; } }

  .plan-card-inner { padding: 24px 24px 0; }
  @media (max-width: 380px) { .plan-card-inner { padding: 18px 16px 0; } }
  .plan-cta-area { padding: 16px 24px 24px; margin-top: auto; }
  @media (max-width: 380px) { .plan-cta-area { padding: 14px 16px 20px; } }
  .plan-addons-area { padding: 0 24px; }
  @media (max-width: 380px) { .plan-addons-area { padding: 0 16px; } }

  .guarantee-box {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(246,201,14,0.18);
    border-radius: 28px; padding: 52px 48px; text-align: center;
  }
  @media (max-width: 640px) { .guarantee-box { padding: 32px 20px; border-radius: 20px; } }

  .final-cta-box {
    background: linear-gradient(135deg, rgba(246,201,14,0.06), rgba(199,125,255,0.05), rgba(232,160,191,0.06));
    border-radius: 36px; padding: 52px 48px; text-align: center;
    border: 1px solid rgba(246,201,14,0.15);
  }
  @media (max-width: 640px) { .final-cta-box { padding: 32px 20px; border-radius: 24px; } }

  .whatsapp-fab {
    position: fixed; bottom: 24px; right: 24px; z-index: 1000;
    display: flex; align-items: center; gap: 10px;
    padding: 13px 24px; border-radius: 60px;
    background: linear-gradient(135deg, #25D366, #128C7E);
    color: #fff; font-weight: 700; font-size: 14px;
    font-family: 'Lato', sans-serif;
    text-decoration: none;
    box-shadow: 0 4px 20px rgba(37,211,102,0.35);
    border: 1px solid rgba(255,255,255,0.15);
    transition: transform 0.15s, box-shadow 0.15s;
  }
  @media (max-width: 480px) {
    .whatsapp-fab { bottom: 16px; right: 16px; padding: 11px 18px; font-size: 13px; gap: 7px; }
  }
  .whatsapp-fab:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(37,211,102,0.45); }

  .ornament { letter-spacing: 12px; color: rgba(246,201,14,0.4); font-size: 16px; }

  .trust-strip {
    display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;
    padding: 28px 20px; border-top: 1px solid rgba(255,255,255,0.05);
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .trust-pill {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; color: rgba(255,255,255,0.45);
  }
`

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PLANS = [
  {
    id: 'quarterly',
    num: '01',
    Icon: Moon,
    label: 'Quarterly',
    duration: '3 Months',
    tagline: 'Get your first wave of bookings',
    orig: '₹1,20,000',
    price: '₹99,000',
    discount: '17% OFF',
    bookings: '150+ Consultation Bookings in 3 Months',
    leads: '150+ Consultation Bookings in 3 Months',
    color: '#00CFFF',
    gradient: 'linear-gradient(135deg, #00CFFF, #0077AA)',
    badge: null,
    services: [
      'Instagram & Facebook presence built for astrologers',
      'Google Business profile optimised for local searches',
      'Targeted ads to people actively seeking guidance',
      'Booking link setup so clients can pay & schedule instantly',
      'Monthly report — exactly where your bookings came from',
      'Strategy to grow genuine reviews from happy clients',
    ],
    result: 'A steady stream of new clients discovering you every week — not just when someone refers you.',
  },
  {
    id: 'halfyearly',
    num: '02',
    Icon: Star,
    label: 'Half Yearly',
    duration: '6 Months',
    tagline: 'Turn curious followers into paying clients',
    orig: '₹2,40,000',
    price: '₹1,79,998',
    discount: '25% OFF',
    bookings: '350+ Consultation Bookings in 6 Months',
    leads: '350+ Consultation Bookings in 6 Months',
    color: '#E8A0BF',
    gradient: 'linear-gradient(135deg, #E8A0BF, #A04070)',
    badge: '🔥 Most Popular',
    services: [
      'Everything in Rising',
      'A dedicated landing page built to convert visitors into bookings',
      'Ads on Meta + Google — managed and optimised every week',
      'Automated WhatsApp follow-ups so no lead ever goes cold',
      'A/B tested messaging that speaks to what your clients fear and desire',
      'Weekly strategy calls with your dedicated growth manager',
      "Retargeting — reach people who visited but didn't book yet",
      'Content calendar keeping your name top-of-mind at all times',
    ],
    result: 'Paid consultation requests landing in your inbox consistently — without you chasing anyone.',
  },
  {
    id: 'annually',
    num: '03',
    Icon: Sun,
    label: 'Annually',
    duration: '12 Months',
    tagline: 'Become the most trusted name in your niche',
    orig: '₹4,80,000',
    price: '₹3,11,998',
    discount: '35% OFF',
    bookings: '800+ Consultation Bookings in 12 Months',
    leads: '800+ Consultation Bookings in 12 Months',
    color: '#F6C90E',
    gradient: 'linear-gradient(135deg, #F6C90E, #C77DFF)',
    badge: '✨ Best Value',
    services: [
      'Everything in Zenith',
      'Full digital presence — from first impression to paid booking',
      'Advanced follow-up sequences — clients self-nurture without your time',
      'Influencer collaborations in the spiritual & wellness space',
      'Custom analytics dashboard — see everything in one place',
      'Dedicated strategy manager who lives and breathes your growth',
      'Scaling ad strategy as your audience grows',
      "Competitor research so you're always one step ahead",
    ],
    result: 'In 90 days, clients will know your name before they even start searching — or we keep working free until they do.',
  },
]

const PROBLEMS = [
  {
    icon: '🙏',
    pain: 'People keep asking for free readings — and you feel guilty saying no',
    fix: 'We position you as a premium expert, so clients arrive ready to pay — not to bargain',
  },
  {
    icon: '📉',
    pain: 'Income is unpredictable — some months full, other months empty',
    fix: 'A consistent flow of booking requests every week, so you can finally plan your calendar with confidence',
  },
  {
    icon: '🔄',
    pain: '100% dependent on referrals and word of mouth',
    fix: 'Paid ads + SEO bring you clients who have never heard of you before — and are actively seeking help right now',
  },
  {
    icon: '📱',
    pain: 'Posting on Instagram every day but getting likes, not bookings',
    fix: 'Content strategy built specifically to convert spiritual seekers into consultation clients',
  },
  {
    icon: '🗺️',
    pain: 'Competing astrologers showing up first when people Google in your city',
    fix: 'Local SEO and Google Business optimisation that puts your name first where it matters most',
  },
]

// ─── PLAN CARD ────────────────────────────────────────────────────────────────
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
        background: 'rgba(11, 10, 22, 0.92)',
        border: `1px solid ${plan.badge ? `${plan.color}55` : 'rgba(255,255,255,0.07)'}`,
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        boxShadow: plan.badge ? `0 0 48px ${plan.color}22` : '0 8px 32px rgba(0,0,0,0.35)',
      }}
    >
      <div style={{ height: 3, background: plan.gradient, width: '100%', flexShrink: 0 }} />

      {plan.badge && (
        <div style={{
          position: 'absolute', top: 20, right: 20,
          background: plan.gradient, color: plan.id === 'annually' ? '#0B0A12' : '#fff',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
          padding: '5px 14px', borderRadius: 40, zIndex: 2,
        }}>
          {plan.badge}
        </div>
      )}

      <div className="plan-card-inner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: plan.color, letterSpacing: '0.1em', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'Cinzel, serif' }}>{plan.num}</span>
            <span style={{
              fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.35)',
              background: 'rgba(255,255,255,0.06)', borderRadius: 20,
              padding: '3px 10px', letterSpacing: '0.04em',
            }}>{plan.duration}</span>
          </div>
          <div style={{
            width: 42, height: 42, borderRadius: 14,
            background: `${plan.color}18`, border: `1px solid ${plan.color}33`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <plan.Icon size={20} color={plan.color} strokeWidth={1.5} />
          </div>
        </div>

        <div style={{
          fontSize: 'clamp(28px, 6vw, 34px)', fontWeight: 900, fontFamily: 'Cinzel, serif',
          background: plan.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '0.01em', marginBottom: 4,
        }}>
          {plan.label}
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>{plan.tagline}</div>

        <div style={{
          background: 'rgba(255,255,255,0.03)', border: `1px solid ${plan.color}22`,
          borderRadius: 16, padding: '14px 16px', marginBottom: 22,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)', textDecoration: 'line-through' }}>{plan.orig}</span>
            <span style={{
              fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6,
              background: 'rgba(46,204,113,0.15)', color: '#2ecc71', whiteSpace: 'nowrap',
            }}>{plan.discount}</span>
          </div>
          <div style={{ fontSize: 'clamp(28px, 7vw, 36px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{plan.price}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>total for {plan.duration.toLowerCase()}</div>
          <div style={{ fontSize: 12, color: plan.color, fontWeight: 600, marginTop: 10 }}>🔮 {plan.bookings}</div>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: 9 }}>
          {plan.services.map((s, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{
                marginTop: 2, flexShrink: 0, width: 17, height: 17, borderRadius: '50%',
                background: `${plan.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Check size={9} color={plan.color} strokeWidth={3} />
              </div>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{s}</span>
            </li>
          ))}
        </ul>

        <div style={{
          background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: '12px 14px',
          marginBottom: 18, borderLeft: `3px solid ${plan.color}`,
        }}>
          <div style={{ fontSize: 10, color: plan.color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5, fontWeight: 700, fontFamily: 'Cinzel, serif' }}>What you'll experience</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>{plan.result}</div>
        </div>
      </div>

      <div className="plan-addons-area">
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '12px 0', width: '100%',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: plan.color,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            WebkitTapHighlightColor: 'transparent', fontFamily: 'Lato, sans-serif',
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
                YouTube channel management, short-form video editing, email newsletter setup, custom website or course portal, app development — priced on request.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="plan-cta-area">
        <button
          onClick={() => onPay && onPay(plan)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '14px 24px', borderRadius: 50, width: '100%',
            border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700,
            background: plan.gradient, color: plan.id === 'annually' ? '#0B0A12' : '#fff',
            boxShadow: `0 4px 20px ${plan.color}44`,
            transition: 'opacity 0.15s', WebkitTapHighlightColor: 'transparent',
            minHeight: 48, fontFamily: 'Lato, sans-serif',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Start Growing <ArrowUpRight size={15} />
        </button>
      </div>
    </motion.div>
  )
}

// ─── PROBLEM ROW ──────────────────────────────────────────────────────────────
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
        <div style={{ fontSize: 11, color: 'rgba(255,100,100,0.8)', marginBottom: 5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'Cinzel, serif' }}>The struggle</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{item.pain}</div>
      </div>
      <div className="problem-arrow" style={{ display: 'flex', justifyContent: 'center' }}>
        <ArrowUpRight size={18} color="#F6C90E" />
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#F6C90E', marginBottom: 5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'Cinzel, serif' }}>What changes</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.82)', lineHeight: 1.5 }}>{item.fix}</div>
      </div>
    </motion.div>
  )
}

// ─── STAR FIELD ──────────────────────────────────────────────────────────────
function StarField() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 3,
  }))

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position: 'absolute', top: s.top, left: s.left,
          width: s.size, height: s.size, borderRadius: '50%',
          background: '#fff',
          animation: `twinkle ${s.duration}s ${s.delay}s infinite ease-in-out`,
        }} />
      ))}
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function AstrologyLandingPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />

      <div
        className="astro-root"
        style={{
          minHeight: '100vh',
          background: 'radial-gradient(ellipse at 50% 0%, #0D0B1F 0%, #080710 60%, #050508 100%)',
          color: '#fff',
          overflowX: 'clip',
          position: 'relative',
        }}
      >
        <StarField />

        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '55vh',
          background: 'radial-gradient(ellipse 70% 50% at 30% 0%, rgba(199,125,255,0.08) 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, height: '55vh',
          background: 'radial-gradient(ellipse 70% 50% at 70% 100%, rgba(246,201,14,0.06) 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        <div style={{ position: 'relative', zIndex: 2, WebkitOverflowScrolling: 'touch' }}>

          {/* ── HERO ─────────────────────────────────────────────────────── */}
          <div ref={heroRef} className="hero-section">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: 32, display: 'flex', justifyContent: 'center' }}
            >
              <img
                src="/hero/logo.png"
                alt="ToFly Media"
                style={{ height: 52, width: 'auto', objectFit: 'contain', borderRadius: 12 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: 28 }}
            >
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(246,201,14,0.07)',
                padding: '7px 20px', borderRadius: 60,
                border: '1px solid rgba(246,201,14,0.22)',
              }}>
                <Sparkles size={13} color="#F6C90E" />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#F6C90E', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Cinzel, serif' }}>
                  Built for Astrologers & Spiritual Guides
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08 }}
              style={{
                fontSize: 'clamp(34px, 9vw, 76px)',
                fontWeight: 900, lineHeight: 1.1,
                margin: '0 0 20px',
                letterSpacing: '0.01em',
              }}
            >
              Your Gift Deserves<br />
              <span className="gtext">to Be Discovered.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                fontSize: 'clamp(15px, 3.5vw, 18px)',
                color: 'rgba(255,255,255,0.42)',
                maxWidth: 540, margin: '0 auto 44px', lineHeight: 1.7,
              }}
            >
              We help astrologers, tarot readers, and spiritual coaches build a consistent stream of paying consultation clients — so your calendar fills itself, month after month.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.28 }}
            >
              <div className="stats-row">
                {[
                  { value: '50+', label: 'Practitioners Scaled', Icon: Users },
                  { value: '₹4Cr+', label: 'Client Revenue Generated', Icon: TrendingUp },
                  { value: '98%', label: 'Retention Rate', Icon: Award },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginBottom: 4 }}>
                      <s.Icon size={15} color="#F6C90E" strokeWidth={2} />
                      <span style={{ fontSize: 'clamp(22px, 6vw, 30px)', fontWeight: 800, color: '#fff', fontFamily: 'Cinzel, serif' }}>{s.value}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── TRUST STRIP ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="trust-strip"
          >
            {[
              '🔮 Specialised in Spiritual Niches',
              '📅 Booking System Included',
              '📊 Full Reporting Every Month',
              '🤝 Dedicated Growth Manager',
              '🛡️ Consultation Booking Guarantee',
            ].map((t, i) => (
              <div key={i} className="trust-pill">
                <span style={{ fontSize: 13 }}>{t}</span>
              </div>
            ))}
          </motion.div>

          <div style={{ textAlign: 'center', margin: '64px auto 64px', opacity: 0.5 }}>
            <span className="ornament">✦ ✦ ✦</span>
          </div>

          {/* ── PROBLEMS ─────────────────────────────────────────────────── */}
          <div className="section-wrap">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', marginBottom: 40 }}
            >
              <div style={{ fontSize: 11, color: '#E8A0BF', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10, fontFamily: 'Cinzel, serif' }}>
                We've Heard This Before
              </div>
              <h2 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 800, letterSpacing: '0.01em', margin: '0 0 14px' }}>
                From <span style={{ color: 'rgba(255,255,255,0.2)' }}>invisible</span> to{' '}
                <span className="gtext">sought-after</span>
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
                These are the exact struggles astrologers and spiritual coaches come to us with — and here is what we do about each one.
              </p>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PROBLEMS.map((item, i) => <ProblemRow key={i} item={item} index={i} />)}
            </div>
          </div>

          {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
          <div className="section-wrap" style={{ marginBottom: 80 }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 40 }}
            >
              <div style={{ fontSize: 11, color: '#C77DFF', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10, fontFamily: 'Cinzel, serif' }}>How It Works</div>
              <h2 style={{ fontSize: 'clamp(24px, 4.5vw, 40px)', fontWeight: 800, margin: '0 0 12px' }}>
                Simple. Proven. <span className="gtext">Results-first.</span>
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
              {[
                {
                  step: '01',
                  title: 'We build your presence',
                  desc: 'Your social media, Google profile, and ads are set up to attract people who are genuinely searching for spiritual guidance right now.',
                  color: '#00CFFF',
                },
                {
                  step: '02',
                  title: 'They discover and trust you',
                  desc: "Targeted content and testimonials position you as the expert to go to — so when they're ready to book, they think of you first.",
                  color: '#E8A0BF',
                },
                {
                  step: '03',
                  title: 'They book. You consult.',
                  desc: 'Automated follow-ups and a seamless booking system means you wake up to new consultation requests — without chasing a single person.',
                  color: '#F6C90E',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${item.color}22`,
                    borderRadius: 20, padding: '28px 24px',
                  }}
                >
                  <div style={{ fontSize: 'clamp(32px, 7vw, 44px)', fontWeight: 900, color: item.color, fontFamily: 'Cinzel, serif', opacity: 0.25, marginBottom: 12 }}>{item.step}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 10, fontFamily: 'Cinzel, serif', lineHeight: 1.3 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── PLANS ────────────────────────────────────────────────────── */}
          <div className="plans-wrap">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', marginBottom: 52 }}
            >
              <div style={{ fontSize: 11, color: '#F6C90E', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10, fontFamily: 'Cinzel, serif' }}>Growth Packages</div>
              <h2 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 800, margin: '0 0 14px', letterSpacing: '0.01em' }}>
                Choose your <span className="gtext">ascension</span>
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.32)', maxWidth: 460, margin: '0 auto' }}>
                Every package is built around one goal — getting you more paid consultations. No hidden costs. No vague promises.
              </p>
            </motion.div>

            <div className="plans-grid">
              {PLANS.map((plan, i) => (
                <PlanCard key={plan.id} plan={plan} index={i} onPay={setSelectedPlan} />
              ))}
            </div>
          </div>

          {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
          <div style={{ maxWidth: 800, margin: '80px auto 0', padding: '0 20px' }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 36 }}
            >
              <div style={{ fontSize: 11, color: '#E8A0BF', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10, fontFamily: 'Cinzel, serif' }}>In Their Words</div>
              <h2 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800, margin: 0 }}>Practitioners who made the shift</h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {[
                {
                  quote: 'Within 6 weeks I went from 3 referral clients a month to 18 booking requests in a week. I actually had to put a waitlist.',
                  name: 'Divya M.',
                  role: 'Vedic Astrologer, Pune',
                  color: '#00CFFF',
                },
                {
                  quote: 'I was spending hours on Instagram getting likes. Now people find me on Google and book directly. No convincing needed.',
                  name: 'Rohit S.',
                  role: 'Tarot & Numerology Coach, Delhi',
                  color: '#E8A0BF',
                },
                {
                  quote: 'The automated follow-ups alone paid for the entire package. Clients who went cold came back ready to book.',
                  name: 'Priya K.',
                  role: 'Spiritual Life Coach, Bengaluru',
                  color: '#F6C90E',
                },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${t.color}22`,
                    borderRadius: 20, padding: '24px 20px',
                  }}
                >
                  <div style={{ fontSize: 24, color: t.color, marginBottom: 12, opacity: 0.6 }}>"</div>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: '0 0 16px' }}>{t.quote}</p>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{t.role}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── GUARANTEE ────────────────────────────────────────────────── */}
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
                background: 'rgba(246,201,14,0.08)', border: '1px solid rgba(246,201,14,0.25)',
                borderRadius: 40, padding: '5px 18px', marginBottom: 20,
              }}>
                <Shield size={13} color="#F6C90E" />
                <span style={{ fontSize: 11, color: '#F6C90E', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Cinzel, serif' }}>
                  Booking Guarantee
                </span>
              </div>
              <h3 style={{ fontSize: 'clamp(20px, 4vw, 34px)', fontWeight: 800, marginBottom: 14, letterSpacing: '0.01em', fontFamily: 'Cinzel, serif' }}>
                We deliver your bookings — or we keep working <span style={{ color: '#F6C90E' }}>at no extra charge</span>
              </h3>
              <p style={{ fontSize: 'clamp(14px, 3vw, 16px)', color: 'rgba(255,255,255,0.45)', maxWidth: 500, margin: '0 auto', lineHeight: 1.75 }}>
                If we don't hit the promised consultation booking numbers by the end of your package, we continue working for you free of charge until we do. Your success is not optional for us.
              </p>
            </motion.div>
          </div>

          {/* ── FINAL CTA ────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: 900, margin: '72px auto 0', padding: '0 20px' }}
          >
            <div className="final-cta-box">
              <div style={{ fontSize: 36, marginBottom: 8 }}>🔮</div>
              <h3 style={{ fontSize: 'clamp(22px, 5vw, 40px)', fontWeight: 800, marginBottom: 14, letterSpacing: '0.01em', fontFamily: 'Cinzel, serif' }}>
                Ready to fill your <span className="gtext">calendar?</span>
              </h3>
              <p style={{ fontSize: 'clamp(14px, 3vw, 15px)', color: 'rgba(255,255,255,0.42)', maxWidth: 460, margin: '0 auto 32px', lineHeight: 1.75 }}>
                We take on a limited number of practitioners each month to give every client the attention they deserve. Book a free 30-minute strategy call — we'll map out exactly what your practice needs to grow.
              </p>
              <div className="cta-btn-row">
                <a
                  href="https://wa.me/919752523894?text=Hi%20ToFly!%20I'm%20an%20astrologer%20and%20I'd%20like%20a%20free%20strategy%20call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-btn-primary"
                >
                  Book My Free Strategy Call <Rocket size={16} />
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

      {/* ── PAYMENT MODAL ────────────────────────────────────────────────── */}
      {selectedPlan && (
        <PaymentModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}

      {/* Sticky WhatsApp FAB */}
      <motion.a
        href="https://wa.me/919752523894?text=Hi%20ToFly!%20I'm%20interested%20in%20growing%20my%20astrology%20practice"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      >
        <MessageCircle size={17} />
        Chat on WhatsApp
      </motion.a>
    </>
  )
}