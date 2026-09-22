// ─────────────────────────────────────────────────────────────
// Fallback content for the /tofly-pricing page — used while the
// admin-editable content is loading from the API, or if the API is
// ever unreachable, so the page always renders something sensible.
// This mirrors backend/src/utils/pricingDefaults.js exactly.
// ─────────────────────────────────────────────────────────────

const TFLY_PRICING_DEFAULTS = {
  brand: {
    logoText: 'To Fly Media',
    locationText: 'Bhopal, Madhya Pradesh'
  },

  header: {
    title: 'Pricing & Packages',
    subtitle: 'Pick the track that matches what you actually need — content, performance marketing, or both. Pay quarterly and lock in our deepest discount.',
    validityText: 'Offer prices valid for agreements signed within 15 days of this quote'
  },

  track1: {
    tag: 'Track 1',
    heading: 'Content & Social Media Management',
    lede: 'Full content engine across every active platform — shot, scripted, posted and engaged with, daily.',
    plans: [
      { planLabel: 'Monthly plan', was: '₹25,000', now: '₹20,000', per: '/month', effective: '', badge: '20% off', highlight: false },
      { planLabel: '3-month plan · pay upfront', was: '₹75,000', now: '₹50,000', per: 'total', effective: 'Effective ₹16,667/month', badge: '33% off', highlight: true }
    ],
    bullets: [
      '12–15 reels/posts per month, plus daily status updates',
      'Monthly content planning, scripting and posting across all active platforms',
      'Engagement management — likes, comments, DM and review replies',
      'Real site posts, testimonials, AI-generated videos and graphics',
      'Minimum 200–300 new followers/engagement growth targeted per month',
      'Brand and page collaborations for added visibility and credibility',
      'Google Business Profile comment and review handling'
    ],
    teamLabel: 'Team included:',
    teamValue: 'Dedicated Social Media Manager, Editor / Graphic Designer',
    note: 'Excludes shoot days, influencer fees and printed materials — billed separately at actual cost (see Add-ons below).'
  },

  track2: {
    tag: 'Track 2',
    heading: 'Performance Marketing',
    lede: 'Ad creative, testing, targeting and a full lead management system — built to lower cost per site visit, not just cost per lead.',
    rateTableHeaders: {
      budget: 'Monthly ad budget',
      regularFee: 'Regular fee',
      offerFee: 'Offer fee',
      billing: 'Billing'
    },
    rateRows: [
      { budget: 'Up to ₹50,000', regularFee: '₹20,000/mo', offerFee: '₹15,000/mo', billing: 'Flat monthly' },
      { budget: 'Above ₹50,000', regularFee: '38% of spend', offerFee: '30% of spend', billing: '% of ad budget' }
    ],
    plans: [
      { planLabel: '3-month plan · budget ≤ ₹50k', was: '₹60,000', now: '₹40,000', per: 'total', effective: 'Effective ₹13,333/month', badge: '33% off', highlight: false },
      { planLabel: '3-month plan · budget > ₹50k', was: '38%', now: '25%', per: 'of ad spend', effective: 'Locked in for the full quarter', badge: '34% off', highlight: true }
    ],
    bullets: [
      'Engaging ad creatives, tested in multiple variants (A/B and A/B/n)',
      'Continuous lead-quality improvement, not just lower cost per lead',
      'Full Lead Management System — every lead tracked from new to converted',
      'Follow-up tracking and lead-quality monitoring with your sales team',
      'Sales script standardisation support for your calling team',
      'Manager dashboard — real-time status of every lead and site visit',
      'Weekly reports on ad spend and lead quality; regular creative and campaign testing',
      'Your leads stay exclusive to you and confidential — always',
      'We do not work with a direct competitor on the same project or micro-market'
    ],
    teamLabel: 'Team included:',
    teamValue: 'Dedicated Ad Manager · Sales Lead Coordinator available as an add-on',
    note: 'Ad spend itself is paid directly to Meta/Google by you (or reimbursed at actual) — this fee covers management only.'
  },

  bundle: {
    tag: 'Best value',
    heading: 'Growth Bundle — Content + Performance',
    lede: 'Both tracks under one retainer, one point of contact, one unified report. Recommended for developers and studios running always-on marketing. (Ad budget up to ₹50,000/month; higher budgets add the % fee from Track 2 above.)',
    recommendBadge: 'Recommended',
    plans: [
      { planLabel: 'Monthly', was: '₹50,000', now: '₹38,000', per: '/month', effective: '', badge: '24% off', highlight: false },
      { planLabel: '3-month plan · pay upfront', was: '₹1,50,000', now: '₹1,00,000', per: 'total', effective: 'Effective ₹33,333/month', badge: '33% off', highlight: false }
    ],
    savenote: 'Includes everything in Track 1 and Track 2 — one dedicated account team, no coordination gap between content and ads.'
  },

  onetime: {
    tag: 'One-time setup',
    heading: 'Website, GMB & Automation',
    lede: 'Built once, owned by you. Not a monthly retainer.',
    cards: [
      {
        planLabel: 'Website + Landing Page + GMB setup',
        was: '₹25,000', now: '₹20,000', per: 'one-time', badge: '20% off',
        bullets: [
          'Custom-built on Next.js + MongoDB — not WordPress or a template',
          'Dynamic 4–5 page website with admin panel for self-editing content',
          'Dedicated landing page for your sales funnel',
          'Domain + hosting included for 1 year',
          'Full source code handed over for future development',
          '1 month of free changes and support after launch',
          'Google Business Profile setup and optimisation'
        ],
        note: 'Website SEO is scoped and quoted separately after a free audit of your keywords and competition.'
      },
      {
        planLabel: 'WhatsApp Business + Automation setup',
        was: '₹10,000', now: '₹8,000', per: 'one-time', badge: '20% off',
        bullets: [
          'WhatsApp Business API setup and green-tick application',
          'Instant auto-reply with brochure, price list and location',
          'Drip follow-up flows and site-visit reminders',
          'Shared team inbox — no chat stuck on one phone'
        ],
        note: ''
      }
    ]
  },

  addons: {
    tag: 'Add-ons',
    heading: 'Billed at actual cost — zero markup',
    lede: 'Invoice shared for every one of these. You only pay what it actually costs.',
    items: [
      { name: 'Professional camera + drone shoot day', value: '₹5,000', sub: 'per day' },
      { name: 'iPhone-native content shoot day', value: '₹3,000', sub: 'per day' },
      { name: 'Influencers / models', value: 'At cost', sub: 'invoice shared' },
      { name: 'Standees, brochures & printed collateral', value: 'At cost', sub: 'invoice shared' }
    ]
  },

  terms: {
    tag: 'Terms',
    items: [
      'All prices are exclusive of **18% GST**.',
      'Offer prices are valid for agreements signed within **15 days** of this quote; regular pricing applies after.',
      '3-month plans require **100% payment in advance**; monthly plans require the current month in advance.',
      'Ad spend (where applicable) is separate from the management fee and paid directly to the platform.',
      'Scope not listed above — additional shoot days, extra platforms, paid influencer campaigns — is quoted separately before starting.'
    ]
  },

  footer: {
    line1: 'To Fly Media — growth partner for real estate, interiors and construction.',
    validPrefix: 'Valid as on',
    validDate: '20 September 2026'
  }
}

export default TFLY_PRICING_DEFAULTS