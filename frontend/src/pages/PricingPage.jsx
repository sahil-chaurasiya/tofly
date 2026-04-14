import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Check, ArrowUpRight, ChevronDown,
  Moon, Star, Sun, Users, TrendingUp, Award,
  MessageCircle, Sparkles, Shield, Rocket,
  Search, Target, Share2, Globe, PenTool, Video,
  Mail, Phone, MapPin, Send,
  Plus, Minus, ShoppingCart, Sliders, X as XIcon,
  BarChart2, MapPin as GMB, Smartphone, Layout, FileText, Youtube
} from 'lucide-react'
import Footer from '../components/layout/Footer'
import PaymentModal from '../components/payment/PaymentModal'

// ─── CUSTOM PLAN SERVICES CATALOG ─────────────────────────────────────────────
const SERVICE_CATALOG = [
  {
    category: 'Google My Business',
    emoji: '📍',
    color: '#4285F4',
    services: [
      { id: 'gmb-setup',       name: 'GMB Profile Setup & Optimization',   desc: 'Complete setup, keyword-rich description, category & attributes', price: 499900 },
      { id: 'gmb-posts',       name: 'GMB Weekly Posts (1 Month)',          desc: '8 branded posts to keep your listing active & visible',           price: 299900 },
      { id: 'gmb-reviews',     name: 'GMB Review Generation Campaign',      desc: 'Strategy + templates to collect 20+ genuine 5-star reviews',      price: 399900 },
      { id: 'gmb-qa',          name: 'GMB Q&A Management (3 Months)',       desc: 'Active Q&A monitoring and replies to boost local trust',           price: 199900 },
    ],
  },
  {
    category: 'Social Media Marketing',
    emoji: '📱',
    color: '#E8A0BF',
    services: [
      { id: 'smm-ig-month',    name: 'Instagram Management (1 Month)',      desc: '12 posts + stories, captions, hashtags, engagement',              price: 799900 },
      { id: 'smm-fb-month',    name: 'Facebook Page Management (1 Month)', desc: '10 posts, page optimization, audience building',                  price: 599900 },
      { id: 'smm-reels',       name: 'Reels / Shorts Creation (4 Videos)', desc: 'Script, shoot-ready brief, edit & post 4 short-form videos',       price: 999900 },
      { id: 'smm-content-cal', name: 'Content Calendar (1 Month)',         desc: '30-day content plan across platforms with captions ready',         price: 299900 },
    ],
  },
  {
    category: 'SEO',
    emoji: '🔍',
    color: '#00CFFF',
    services: [
      { id: 'seo-audit',       name: 'Full SEO Audit',                      desc: 'Technical, on-page & off-page audit with priority fixes',          price: 499900 },
      { id: 'seo-onpage',      name: 'On-Page SEO (10 Pages)',              desc: 'Meta tags, headings, internal links, keyword mapping',             price: 699900 },
      { id: 'seo-local',       name: 'Local SEO Package (3 Months)',        desc: 'Citations, local keywords, map pack optimization',                 price: 1499900 },
      { id: 'seo-backlinks',   name: 'Backlink Building (20 Links)',        desc: 'High-DA guest posts & directory submissions',                     price: 999900 },
    ],
  },
  {
    category: 'Website',
    emoji: '🌐',
    color: '#F6C90E',
    services: [
      { id: 'web-basic',       name: '5-Page Informational Website',        desc: 'Home, About, Services, Blog, Contact — mobile-first & SEO-ready',  price: 1999900 },
      { id: 'web-booking',     name: 'Booking-Enabled Astrology Website',   desc: 'Calendly / Razorpay integration, client portal, 8 pages',          price: 3499900 },
      { id: 'web-speed',       name: 'Website Speed Optimization',          desc: 'Core Web Vitals fix — aim for 90+ PageSpeed score',               price: 599900 },
      { id: 'web-maintenance', name: 'Website Maintenance (3 Months)',      desc: 'Updates, security patches, uptime monitoring',                    price: 899900 },
    ],
  },
  {
    category: 'Landing Page',
    emoji: '🎯',
    color: '#C77DFF',
    services: [
      { id: 'lp-basic',        name: 'Single Conversion Landing Page',      desc: 'High-converting page for one service with lead form',             price: 1499900 },
      { id: 'lp-funnel',       name: 'Full Lead Funnel (3 Pages)',           desc: 'Landing + Thank you + Upsell pages with email capture',           price: 2499900 },
      { id: 'lp-ab',           name: 'A/B Testing Setup (1 Month)',         desc: 'Two variants tested with analytics and winner report',            price: 699900 },
    ],
  },
  {
    category: 'Paid Ads',
    emoji: '📣',
    color: '#FF7043',
    services: [
      { id: 'ads-google',      name: 'Google Ads Setup + 1 Month Mgmt',    desc: 'Campaign creation, keyword research, bid strategy, weekly report',  price: 1299900 },
      { id: 'ads-meta',        name: 'Meta Ads Setup + 1 Month Mgmt',      desc: 'Facebook & Instagram campaigns, audience targeting, creatives',    price: 999900 },
      { id: 'ads-youtube',     name: 'YouTube Ads (1 Month)',               desc: 'In-stream & discovery ads targeting spiritual seekers',            price: 899900 },
    ],
  },
  {
    category: 'YouTube & Video',
    emoji: '🎬',
    color: '#FF0000',
    services: [
      { id: 'yt-setup',        name: 'YouTube Channel Setup',               desc: 'Banner, icon, description, first 3 videos optimized',             price: 599900 },
      { id: 'yt-seo',          name: 'YouTube SEO (5 Videos)',              desc: 'Titles, descriptions, tags, thumbnails for 5 existing videos',    price: 499900 },
      { id: 'yt-monthly',      name: 'YouTube Management (1 Month)',        desc: '4 videos uploaded, optimized & promoted with community posts',    price: 1299900 },
    ],
  },
]

// ─── GLOBAL STYLES (Extended with new styles) ─────────────────────────────────
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
  .wide-wrap { max-width: 1280px; margin: 0 auto 80px; padding: 0 20px; }
  @media (max-width: 640px) { .wide-wrap { margin-bottom: 56px; padding: 0 16px; } }
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

  /* ── CUSTOM PLAN BUILDER (GoDaddy style) ── */
  .cp-layout {
    display: grid;
    grid-template-columns: 1fr 310px;
    gap: 20px;
    align-items: start;
  }
  @media (max-width: 860px) {
    .cp-layout { grid-template-columns: 1fr; }
    .cp-summary-col { position: static !important; order: -1; }
  }

  .cp-category-block {
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 10px;
    background: rgba(255,255,255,0.015);
  }
  .cp-category-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 18px; cursor: pointer;
    background: rgba(255,255,255,0.02);
    border: none; width: 100%; text-align: left;
    font-family: 'Lato', sans-serif;
    transition: background 0.15s;
    -webkit-tap-highlight-color: transparent;
  }
  .cp-category-header:hover { background: rgba(255,255,255,0.04); }

  .cp-service-row {
    display: flex; align-items: center; gap: 12px;
    padding: 13px 18px; cursor: pointer;
    border-top: 1px solid rgba(255,255,255,0.04);
    transition: background 0.15s;
    -webkit-tap-highlight-color: transparent;
  }
  @media (max-width: 480px) {
    .cp-service-row { padding: 12px 14px; gap: 10px; }
    .cp-category-header { padding: 12px 14px; }
  }
  .cp-service-row:hover { background: rgba(255,255,255,0.03); }
  .cp-service-row.selected { background: rgba(199,125,255,0.06); }

  .cp-checkbox {
    width: 20px; height: 20px; border-radius: 6px; flex-shrink: 0;
    border: 2px solid rgba(255,255,255,0.18);
    display: flex; align-items: center; justify-content: center;
    transition: all 0.18s;
  }
  .cp-checkbox.checked { background: #C77DFF; border-color: #C77DFF; }

  .cp-summary-col { position: sticky; top: 24px; }
  .cp-summary-box {
    background: rgba(13,11,28,0.97);
    border: 1px solid rgba(199,125,255,0.25);
    border-radius: 18px;
    overflow: hidden;
  }
  .cp-summary-header {
    background: linear-gradient(135deg, rgba(199,125,255,0.12), rgba(123,47,190,0.08));
    padding: 16px 20px;
    border-bottom: 1px solid rgba(199,125,255,0.15);
  }
  .cp-summary-items {
    padding: 10px 20px;
    max-height: 240px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(199,125,255,0.3) transparent;
  }
  .cp-summary-item {
    display: flex; justify-content: space-between; align-items: flex-start;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    gap: 10px;
  }
  .cp-summary-item:last-child { border-bottom: none; }
  .cp-summary-footer { padding: 14px 20px 18px; border-top: 1px solid rgba(255,255,255,0.07); }
  .cp-empty-state { padding: 28px 20px; text-align: center; }
  .cp-proceed-btn {
    width: 100%; padding: 13px; border-radius: 50px; border: none;
    background: linear-gradient(135deg, #C77DFF, #7B2FBE);
    color: #fff; font-size: 14px; font-weight: 700; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    font-family: 'Lato', sans-serif;
    box-shadow: 0 4px 20px rgba(199,125,255,0.3);
    transition: opacity 0.15s; white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
  }
  .cp-proceed-btn:hover { opacity: 0.88; }
  .cp-proceed-btn:disabled { opacity: 0.35; cursor: not-allowed; box-shadow: none; }
  .cp-remove-btn {
    background: none; border: none; cursor: pointer; padding: 2px 4px;
    color: rgba(255,255,255,0.25); line-height: 0; flex-shrink: 0;
    transition: color 0.15s;
  }
  .cp-remove-btn:hover { color: #ff5050; }

  .trust-strip {
    display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;
    padding: 28px 20px; border-top: 1px solid rgba(255,255,255,0.05);
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .trust-pill {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; color: rgba(255,255,255,0.45);
  }
  
  .astro-image {
    width: 100%;
    height: auto;
    border-radius: 24px;
    margin: 32px 0;
    box-shadow: 0 12px 32px rgba(0,0,0,0.4);
    border: 1px solid rgba(255,255,255,0.1);
  }
  
  .service-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(246,201,14,0.1);
    border-radius: 20px;
    padding: 28px 20px;
    text-align: center;
    transition: all 0.25s ease;
  }
  .service-card:hover {
    background: rgba(246,201,14,0.05);
    border-color: rgba(246,201,14,0.3);
    transform: translateY(-4px);
  }

  .benefit-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 16px;
    padding: 24px 20px;
    transition: all 0.2s ease;
  }
  .benefit-card:hover {
    background: rgba(255,255,255,0.04);
    border-color: rgba(246,201,14,0.2);
  }

  .reason-card {
    background: rgba(11, 10, 22, 0.7);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(246,201,14,0.12);
    border-radius: 20px;
    padding: 28px 24px;
    text-align: center;
    transition: transform 0.2s;
  }
  .reason-card:hover { transform: scale(1.02); }

  .contact-form input, .contact-form textarea {
    width: 100%;
    padding: 14px 18px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(246,201,14,0.15);
    border-radius: 12px;
    color: #fff;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    transition: border-color 0.2s;
  }
  .contact-form input:focus, .contact-form textarea:focus {
    outline: none;
    border-color: #F6C90E;
    background: rgba(255,255,255,0.05);
  }
  .contact-form input::placeholder, .contact-form textarea::placeholder {
    color: rgba(255,255,255,0.3);
  }
`

// ─── DATA (Existing) ───────────────────────────────────────────────────────────
const PLANS = [
  // ... (keep exactly as provided)
  {
    id: 'quarterly',
    num: '01',
    Icon: Moon,
    label: 'Quarterly',
    duration: '3 Months',
    tagline: 'Your first wave of paying clients',
    orig: '₹1,20,000',
    price: '₹99,000',
    discount: '17% OFF',
    bookings: '150+ Paid Consultations in 3 Months',
    leads: '150+ Consultation Bookings in 3 Months',
    color: '#00CFFF',
    gradient: 'linear-gradient(135deg, #00CFFF, #0077AA)',
    badge: null,
    services: [
      'Cosmic Branding: Instagram & Google Business setup for spiritual seekers',
      'SEO-optimized presence so locals find you before the competition',
      'Targeted ads reaching people actively seeking clarity',
      'Automated booking system for effortless scheduling & payments',
      'Monthly celestial report: track where clients are coming from',
      'Strategy to build a glowing constellation of reviews',
    ],
    result: 'A steady stream of new clients discovering you every week — not just when someone refers you.',
  },
  {
    id: 'halfyearly',
    num: '02',
    Icon: Star,
    label: 'Half Yearly',
    duration: '6 Months',
    tagline: 'Turn curious followers into devoted clients',
    orig: '₹2,40,000',
    price: '₹1,79,998',
    discount: '25% OFF',
    bookings: '350+ Paid Consultations in 6 Months',
    leads: '350+ Consultation Bookings in 6 Months',
    color: '#E8A0BF',
    gradient: 'linear-gradient(135deg, #E8A0BF, #A04070)',
    badge: '🔥 Most Popular',
    services: [
      'Everything in Rising',
      'Dedicated landing page that converts starry-eyed visitors into bookings',
      'Advanced Meta + Google Ads, managed weekly',
      'Automated WhatsApp follow-ups to re-engage lost souls',
      'A/B tested messaging that resonates with client fears and desires',
      'Weekly strategy calls with your growth guide',
      'Retargeting to capture those who visited but didn\'t book',
      'Astro-content calendar to keep you top-of-mind',
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
    bookings: '800+ Paid Consultations in 12 Months',
    leads: '800+ Consultation Bookings in 12 Months',
    color: '#F6C90E',
    gradient: 'linear-gradient(135deg, #F6C90E, #C77DFF)',
    badge: '✨ Best Value',
    services: [
      'Everything in Zenith',
      'Complete digital ecosystem: first impression to paid booking',
      'Advanced nurture sequences — clients self-qualify before you speak',
      'Influencer collaborations in the spiritual & wellness space',
      'Custom analytics dashboard — all your growth in one view',
      'Dedicated strategy manager who breathes your mission',
      'Scaling ad strategy as your audience expands',
      'Competitor research to keep you ahead of the cosmic curve',
    ],
    result: 'In 90 days, clients will know your name before they even start searching — or we keep working free until they do.',
  },
]

const PROBLEMS = [
  // ... (keep exactly as provided)
  {
    icon: '🙏',
    pain: 'People constantly ask "meri shaadi kab hogi?" but vanish when it\'s time to pay for your deep insights',
    fix: 'We position you as a premium guide, so clients arrive ready to invest in your wisdom, not just take free samples',
  },
  {
    icon: '📉',
    pain: 'Your income follows the moon — full some months, empty the next, making it impossible to plan',
    fix: 'A consistent flow of booking requests every week, so you can finally trade uncertainty for a full calendar',
  },
  {
    icon: '🔄',
    pain: 'You rely 100% on word-of-mouth and feel invisible to the thousands searching online for guidance',
    fix: 'Paid ads + SEO bring you clients who have never heard of you before — and are actively seeking help right now',
  },
  {
    icon: '📱',
    pain: 'You spend hours posting on Instagram but only get likes, not bookings — and the apps take a huge cut',
    fix: 'A content strategy that builds your own authority and funnels clients directly to your own booking system',
  },
  {
    icon: '🗺️',
    pain: 'Cheaper astrologers on big apps are showing up first, making it hard to charge what your years of study are worth',
    fix: 'Local SEO and Google Business optimisation that positions you as the premium expert in your area',
  },
]

// New Service Data
const DIGITAL_SERVICES = [
  { icon: Search, title: 'Astrology SEO', desc: 'Rank #1 for "best astrologer near me" and niche keywords. We optimize your site to attract clients actively searching for guidance.', color: '#00CFFF' },
  { icon: Target, title: 'PPC & Google Ads', desc: 'Certified Google Partners managing high-ROI ad campaigns. Get instant visibility and qualified leads from day one.', color: '#E8A0BF' },
  { icon: Share2, title: 'Social Media Management', desc: 'Instagram, Facebook, YouTube — we create and schedule content that builds trust and drives bookings.', color: '#C77DFF' },
  { icon: Globe, title: 'Astrology Web Design', desc: 'Responsive, spiritually-aligned websites that convert visitors into paying clients. Mobile-first, SEO-ready.', color: '#F6C90E' },
  { icon: PenTool, title: 'Online Reputation Mgmt', desc: 'We help you collect and showcase glowing reviews while handling any negative feedback with grace.', color: '#E8A0BF' },
  { icon: Video, title: 'YouTube Promotion', desc: 'Grow your channel with optimized videos, thumbnails, and promotion strategies tailored to spiritual content.', color: '#00CFFF' },
]

const BENEFITS = [
  { num: '01', title: 'Increase Customer Loyalty', desc: 'Frequent, value-driven communication keeps you top-of-mind and builds lasting relationships.' },
  { num: '02', title: 'Engage at Every Stage', desc: 'From awareness to final booking, we nurture leads through the entire client journey.' },
  { num: '03', title: 'Target the Right Audience', desc: 'We reach people actively seeking astrological guidance — by location, interest, and intent.' },
  { num: '04', title: 'Continuous Lead Pipeline', desc: 'Never worry about where your next client will come from. A steady flow, guaranteed.' },
  { num: '05', title: 'Higher Conversion Rates', desc: 'Optimized funnels mean more of your visitors become paying clients.' },
  { num: '06', title: 'Transparent & Measurable', desc: 'Detailed monthly reports show exactly where every lead and booking came from.' },
  { num: '07', title: 'Build Trust & Credibility', desc: 'In the spiritual space, trust is everything. We position you as the authority.' },
  { num: '08', title: 'Maximum ROI', desc: 'Digital marketing delivers the best return on investment for astrology services.' },
  { num: '09', title: 'Level Playing Field', desc: 'Whether solo practitioner or established brand, you compete and win online.' },
]

const REASONS = [
  { num: '01', title: '9+ Years Industry Experience', desc: 'Over 200 astrologers served across India, UK, Canada & USA. We know what works.', color: '#00CFFF' },
  { num: '02', title: '₹9Cr+ Ad Spend Managed', desc: 'We\'ve mastered the art of profitable ad campaigns for spiritual practitioners.', color: '#E8A0BF' },
  { num: '03', title: 'Always Available', desc: 'Phone, Email, WhatsApp — we\'re here when you need us. Regular reports keep you informed.', color: '#C77DFF' },
  { num: '04', title: 'On-Time, Quality Delivery', desc: 'We follow best practices to ensure we hit your goals without compromising quality.', color: '#F6C90E' },
  { num: '05', title: 'Dedicated Astrology Team', desc: 'Designers, SEO experts, Google-certified ad pros, and content writers who speak astrology.', color: '#00CFFF' },
  { num: '06', title: 'Cost-Effective & ROI-Driven', desc: 'Packages designed to fit your budget while maximizing your return. Custom plans available.', color: '#E8A0BF' },
]

// ─── CUSTOM PLAN BUILDER COMPONENT (GoDaddy style) ────────────────────────────
function CustomPlanBuilder({ onPay }) {
  const [selected, setSelected] = useState({})
  const [openCats, setOpenCats] = useState(
    () => Object.fromEntries(SERVICE_CATALOG.map(g => [g.category, false]))
  )

  const toggle = (service) =>
    setSelected(prev => {
      const next = { ...prev }
      if (next[service.id]) delete next[service.id]
      else next[service.id] = service
      return next
    })

  const removeItem = (id) =>
    setSelected(prev => { const n = { ...prev }; delete n[id]; return n })

  const toggleCat = (cat) =>
    setOpenCats(prev => ({ ...prev, [cat]: !prev[cat] }))

  const selectedList = Object.values(selected)
  const totalPaise   = selectedList.reduce((s, sv) => s + sv.price, 0)
  const fmt          = (p) => '₹' + (p / 100).toLocaleString('en-IN')

  const handleCheckout = () => {
    if (!selectedList.length) return
    onPay({
      id:       'custom',
      label:    'Custom Plan',
      tagline:  `${selectedList.length} service${selectedList.length > 1 ? 's' : ''} selected`,
      price:    fmt(totalPaise),
      orig:     fmt(totalPaise),
      discount: 'CUSTOM',
      leads:    `${selectedList.length} Services`,
      color:    '#C77DFF',
      gradient: 'linear-gradient(135deg, #C77DFF, #7B2FBE)',
      selectedServices: selectedList.map(s => ({
        id:       s.id,
        name:     s.name,
        category: SERVICE_CATALOG.find(g => g.services.some(sv => sv.id === s.id))?.category || '',
        price:    s.price,
      })),
    })
  }

  return (
    <div className="cp-layout">

      {/* ── LEFT: All categories stacked ── */}
      <div>
        {SERVICE_CATALOG.map(group => {
          const isOpen        = openCats[group.category]
          const selectedInCat = group.services.filter(s => selected[s.id]).length
          return (
            <div key={group.category} className="cp-category-block">
              <button className="cp-category-header" onClick={() => toggleCat(group.category)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: `${group.color}18`, border: `1px solid ${group.color}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 17,
                  }}>{group.emoji}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{group.category}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>
                      {group.services.length} services
                      {selectedInCat > 0 && (
                        <span style={{ marginLeft: 8, color: group.color, fontWeight: 700 }}>
                          · {selectedInCat} added
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={16} color="rgba(255,255,255,0.4)" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    {group.services.map(service => {
                      const isChecked = !!selected[service.id]
                      return (
                        <div
                          key={service.id}
                          className={`cp-service-row${isChecked ? ' selected' : ''}`}
                          onClick={() => toggle(service)}
                        >
                          <div className={`cp-checkbox${isChecked ? ' checked' : ''}`}>
                            {isChecked && <Check size={12} color="#fff" strokeWidth={3} />}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: isChecked ? '#fff' : 'rgba(255,255,255,0.85)', lineHeight: 1.3 }}>
                              {service.name}
                            </div>
                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 2, lineHeight: 1.5 }}>
                              {service.desc}
                            </div>
                          </div>
                          <div style={{
                            fontSize: 14, fontWeight: 700, flexShrink: 0,
                            color: isChecked ? group.color : 'rgba(255,255,255,0.6)',
                          }}>
                            {fmt(service.price)}
                          </div>
                        </div>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* ── RIGHT: Order Summary panel ── */}
      <div className="cp-summary-col">
        <div className="cp-summary-box">

          <div className="cp-summary-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <ShoppingCart size={16} color="#C77DFF" />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#C77DFF', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Cinzel, serif' }}>
                Your Order
              </span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
              {selectedList.length === 0
                ? 'No services selected yet'
                : `${selectedList.length} service${selectedList.length > 1 ? 's' : ''} selected`}
            </div>
          </div>

          {selectedList.length === 0 && (
            <div className="cp-empty-state">
              <div style={{ fontSize: 32, marginBottom: 10 }}>🛒</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>
                Tick any service on the left to add it here. Mix and match across categories.
              </div>
            </div>
          )}

          {selectedList.length > 0 && (
            <div className="cp-summary-items">
              <AnimatePresence>
                {selectedList.map(s => {
                  const catGroup = SERVICE_CATALOG.find(g => g.services.some(sv => sv.id === s.id))
                  return (
                    <motion.div
                      key={s.id}
                      className="cp-summary-item"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, color: catGroup?.color || '#C77DFF', fontWeight: 600, marginBottom: 1 }}>
                          {catGroup?.emoji} {catGroup?.category}
                        </div>
                        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.35 }}>{s.name}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{fmt(s.price)}</span>
                        <button className="cp-remove-btn" onClick={(e) => { e.stopPropagation(); removeItem(s.id) }}>
                          <XIcon size={13} />
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}

          <div className="cp-summary-footer">
            {selectedList.length > 0 && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Subtotal</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{fmt(totalPaise)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Total</span>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{fmt(totalPaise)}</span>
                </div>
              </>
            )}
            <button
              className="cp-proceed-btn"
              onClick={handleCheckout}
              disabled={selectedList.length === 0}
            >
              <ShoppingCart size={16} />
              {selectedList.length === 0 ? 'Add services to proceed' : `Proceed to Pay · ${fmt(totalPaise)}`}
            </button>
            {selectedList.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 12 }}>
                <Shield size={11} color="rgba(255,255,255,0.25)" />
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Secured by Razorpay · UPI · Cards</span>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

// ─── PLAN CARD (Keep unchanged) ─────────────────────────────────────────────────
function PlanCard({ plan, index, onPay }) {
  // ... (exact copy from provided code)
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

// ─── PROBLEM ROW (Keep unchanged) ───────────────────────────────────────────────
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

// ─── STAR FIELD (Keep unchanged) ───────────────────────────────────────────────
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

// ─── MAIN PAGE (Enhanced with new sections) ────────────────────────────────────
export default function AstrologyLandingPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const [selectedPlan, setSelectedPlan] = useState(null)
  
  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', website: '', message: '' })
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission (e.g., send to API)
    alert('Thank you! We will contact you shortly.')
    setFormData({ name: '', email: '', phone: '', website: '', message: '' })
  }

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

          {/* ── HERO (UPDATED) ─────────────────────────────────────────────────────── */}
          <div ref={heroRef} className="hero-section">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}
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
                <span style={{ fontSize: 12, fontWeight: 700, color: '#F6C90E', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Cinzel, serif' }}>
                  India's Premier Astrology Digital Marketing Agency
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08 }}
              style={{
                fontSize: 'clamp(36px, 10vw, 72px)',
                fontWeight: 900, lineHeight: 1.15,
                margin: '0 0 24px',
                letterSpacing: '-0.01em',
              }}
            >
              Turn Your Divine Gift <br />
              <span className="gtext">Into a Thriving Online Practice</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                fontSize: 'clamp(16px, 4vw, 20px)',
                color: 'rgba(255,255,255,0.55)',
                maxWidth: 620, margin: '0 auto 44px', lineHeight: 1.7,
              }}
            >
              We help astrologers, numerologists, and tarot readers attract a consistent flow of high-paying clients — without relying on referrals or spending hours on social media.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.28 }}
            >
              <div className="stats-row">
                {[
                  { value: '50+', label: 'Astrologers Scaled', Icon: Users },
                  { value: '₹4Cr+', label: 'Client Revenue Generated', Icon: TrendingUp },
                  { value: '98%', label: 'Retention Rate', Icon: Award },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginBottom: 4 }}>
                      <s.Icon size={15} color="#F6C90E" strokeWidth={2} />
                      <span style={{ fontSize: 'clamp(22px, 6vw, 30px)', fontWeight: 800, color: '#fff', fontFamily: 'Cinzel, serif' }}>{s.value}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, fontSize: 12, color: 'rgba(246,201,14,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                ⭐ Trusted by 50+ Spiritual Practitioners
              </div>
            </motion.div>
          </div>

          {/* ── TRUST STRIP (Enhanced with more stats) ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="trust-strip"
          >
            {[
              { icon: '🔮', text: '5000+ Accounts Handled' },
              { icon: '👥', text: '90+ Team of Professionals' },
              { icon: '🌍', text: '25+ Serving Countries' },
              { icon: '💯', text: '98% Client Retention' },
            ].map((t, i) => (
              <div key={i} className="trust-pill">
                <span style={{ fontSize: 13 }}>{t.icon} {t.text}</span>
              </div>
            ))}
          </motion.div>

          <div style={{ textAlign: 'center', margin: '64px auto 64px', opacity: 0.5 }}>
            <span className="ornament">✦ ✦ ✦</span>
          </div>

          {/* ── PROBLEMS (Existing) ─────────────────────────────────────────────────── */}
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

          {/* ── HOW IT WORKS (Existing) ─────────────────────────────────────────────── */}
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
                { step: '01', title: 'We build your presence', desc: 'Your social media, Google profile, and ads are set up to attract people who are genuinely searching for spiritual guidance right now.', color: '#00CFFF' },
                { step: '02', title: 'They discover and trust you', desc: "Targeted content and testimonials position you as the expert to go to — so when they're ready to book, they think of you first.", color: '#E8A0BF' },
                { step: '03', title: 'They book. You consult.', desc: 'Automated follow-ups and a seamless booking system means you wake up to new consultation requests — without chasing a single person.', color: '#F6C90E' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${item.color}22`, borderRadius: 20, padding: '28px 24px' }}>
                  <div style={{ fontSize: 'clamp(32px, 7vw, 44px)', fontWeight: 900, color: item.color, fontFamily: 'Cinzel, serif', opacity: 0.25, marginBottom: 12 }}>{item.step}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 10, fontFamily: 'Cinzel, serif', lineHeight: 1.3 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
          
{/* ── WHY THE STARS CHOOSE US (Existing) ───────────────────────────────────── */}
<div className="section-wrap" style={{ marginBottom: 80 }}>
  <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 40 }}>
    <div style={{ fontSize: 11, color: '#F6C90E', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10, fontFamily: 'Cinzel, serif' }}>Why the Stars Choose Us</div>
    <h2 style={{ fontSize: 'clamp(24px, 4.5vw, 40px)', fontWeight: 800, margin: '0 0 12px' }}>Your cosmic practice deserves a <span className="gtext">cosmic presence</span></h2>
  </motion.div>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, alignItems: 'stretch' }}>
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      style={{ position: 'relative', minHeight: 300, borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 12px 32px rgba(0,0,0,0.4)' }}
    >
      <img
        src="/hero/cosmic.jpeg"
        alt="Cosmic astrology chart with glowing elements"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </motion.div>
    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div><div style={{ fontSize: 14, fontWeight: 700, color: '#F6C90E', marginBottom: 8 }}>🔮 Beyond the Birth Chart</div><p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0 }}>We don't just build websites. We craft digital sanctuaries that reflect the depth of your work — from Vedic astrology to tarot, numerology to energy healing. Your unique gifts deserve a platform that does them justice.</p></div>
        <div><div style={{ fontSize: 14, fontWeight: 700, color: '#F6C90E', marginBottom: 8 }}>✨ Attract Aligned Souls</div><p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0 }}>Stop attracting clients who want free readings or quick fixes. Our strategic approach attracts those who are ready for transformation and understand the value of your time and wisdom.</p></div>
        <div><div style={{ fontSize: 14, fontWeight: 700, color: '#F6C90E', marginBottom: 8 }}>🌙 We Speak Your Language</div><p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0 }}>From Mercury retrograde to Saturn returns, our team understands the astrological landscape. We create messaging that resonates with your ideal clients on a soul level.</p></div>
      </div>
    </motion.div>
  </div>
</div>

          {/* ── NEW: WHAT IS ASTROLOGY DIGITAL MARKETING? ────────────────────────────── */}
          <div className="section-wrap" style={{ marginBottom: 80 }}>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontSize: 11, color: '#C77DFF', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10, fontFamily: 'Cinzel, serif' }}>Understanding the Cosmos of Marketing</div>
              <h2 style={{ fontSize: 'clamp(24px, 4.5vw, 40px)', fontWeight: 800, margin: '0 0 12px' }}>What is <span className="gtext">Astrology Digital Marketing?</span></h2>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(246,201,14,0.1)', borderRadius: 24, padding: '36px 32px' }}>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: 24 }}>
                Astrology is the ancient science of divination through celestial bodies. But in today's digital age, even the most gifted astrologer needs more than just the stars to grow their practice. 
                <strong style={{ color: '#F6C90E' }}> Astrology Digital Marketing</strong> is the specialized art of promoting astrological services—Vedic astrology, numerology, tarot, palmistry, kundli matching—through online channels to attract clients who are actively seeking guidance.
              </p>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
                Gone are the days of waiting for clients to walk through your door. Thousands search daily for "best astrologer near me," "love problem solution," or "career astrology." If you're not visible when they search, you're invisible to them. We bridge that gap—ensuring your divine gift reaches those who need it most, while you focus on what you do best: guiding souls.
              </p>
            </motion.div>
          </div>

          {/* ── NEW: DIGITAL MARKETING SERVICES WE OFFER ────────────────────────────── */}
          <div className="wide-wrap">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 11, color: '#E8A0BF', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10, fontFamily: 'Cinzel, serif' }}>Our Cosmic Toolkit</div>
              <h2 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 800, margin: '0 0 14px' }}>Digital Marketing Services <span className="gtext">For Astrologers</span></h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 600, margin: '0 auto' }}>Specialized solutions designed to attract, engage, and convert spiritual seekers into loyal clients.</p>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
              {DIGITAL_SERVICES.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="service-card">
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `${s.color}18`, border: `1px solid ${s.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <s.icon size={28} color={s.color} strokeWidth={1.5} />
                  </div>
                  <h4 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12, fontFamily: 'Cinzel, serif' }}>{s.title}</h4>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── NEW: 9 STRIKING BENEFITS ────────────────────────────────────────────── */}
          <div className="wide-wrap" style={{ marginTop: 80 }}>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 11, color: '#F6C90E', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10, fontFamily: 'Cinzel, serif' }}>The Celestial Advantage</div>
              <h2 style={{ fontSize: 'clamp(24px, 4.5vw, 40px)', fontWeight: 800, margin: '0 0 12px' }}>9 Striking Benefits of <span className="gtext">Digital Marketing</span></h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 600, margin: '0 auto' }}>Why top astrologers and spiritual coaches are investing in their digital presence.</p>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {BENEFITS.map((b, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="benefit-card">
                  <div style={{ fontSize: 32, fontWeight: 900, color: '#F6C90E', opacity: 0.15, fontFamily: 'Cinzel, serif', marginBottom: 12 }}>{b.num}</div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8, fontFamily: 'Cinzel, serif' }}>{b.title}</h4>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── NEW: 6 REASONS TO CHOOSE US ─────────────────────────────────────────── */}
          <div className="wide-wrap" style={{ marginTop: 80 }}>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 11, color: '#C77DFF', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10, fontFamily: 'Cinzel, serif' }}>Why Partner With Us</div>
              <h2 style={{ fontSize: 'clamp(24px, 4.5vw, 40px)', fontWeight: 800, margin: '0 0 12px' }}>6 Reasons You Should Choose <span className="gtext">ToFly Media</span></h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
              {REASONS.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="reason-card">
                  <div style={{ fontSize: 36, fontWeight: 900, color: r.color, opacity: 0.3, fontFamily: 'Cinzel, serif', marginBottom: 12 }}>{r.num}</div>
                  <h4 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10, fontFamily: 'Cinzel, serif' }}>{r.title}</h4>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{r.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── PLANS ────────────────────────────────────────────────────── */}
          <div className="plans-wrap" style={{ marginTop: 80 }}>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: 52 }}>
              <div style={{ fontSize: 11, color: '#F6C90E', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10, fontFamily: 'Cinzel, serif' }}>Growth Packages</div>
              <h2 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 800, margin: '0 0 14px', letterSpacing: '0.01em' }}>Choose your <span className="gtext">ascension</span></h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.32)', maxWidth: 460, margin: '0 auto' }}>Every package is built around one goal — getting you more paid consultations. No hidden costs. No vague promises.</p>
            </motion.div>
            <div className="plans-grid">
              {PLANS.map((plan, i) => <PlanCard key={plan.id} plan={plan} index={i} onPay={setSelectedPlan} />)}
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: '80px auto 20px', opacity: 0.5 }}>
            <span className="ornament">✦ ✦ ✦</span>
          </div>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>Or build your own — pick only what you need</p>
          </div>

          {/* ── CUSTOM PLAN BUILDER ──────────────────────────────────────────────── */}
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', marginBottom: 48 }}
            >
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(199,125,255,0.08)', border: '1px solid rgba(199,125,255,0.25)',
                padding: '7px 20px', borderRadius: 60, marginBottom: 20,
              }}>
                <Sliders size={13} color="#C77DFF" />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#C77DFF', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Cinzel, serif' }}>
                  Build Your Own Plan
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 800, margin: '0 0 14px', letterSpacing: '0.01em' }}>
                Pick exactly what you need. <span className="gtext">Pay only for that.</span>
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.38)', maxWidth: 540, margin: '0 auto' }}>
                Not ready for a full package? No problem. Select individual services — GMB, SEO, SMM, website, landing page, ads — and we'll handle exactly what you pick.
              </p>
            </motion.div>

            <CustomPlanBuilder onPay={setSelectedPlan} />
          </div>

          {/* ── TESTIMONIALS (Existing) ─────────────────────────────────────────────── */}
          <div style={{ maxWidth: 800, margin: '80px auto 0', padding: '0 20px' }}>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ fontSize: 11, color: '#E8A0BF', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10, fontFamily: 'Cinzel, serif' }}>In Their Words</div>
              <h2 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800, margin: 0 }}>Practitioners who made the shift</h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {[
                { quote: 'Within 6 weeks I went from 3 referral clients a month to 18 booking requests in a week. I actually had to put a waitlist.', name: 'Divya M.', role: 'Vedic Astrologer, Pune', color: '#00CFFF' },
                { quote: 'I was spending hours on Instagram getting likes. Now people find me on Google and book directly. No convincing needed.', name: 'Rohit S.', role: 'Tarot & Numerology Coach, Delhi', color: '#E8A0BF' },
                { quote: 'The automated follow-ups alone paid for the entire package. Clients who went cold came back ready to book.', name: 'Priya K.', role: 'Spiritual Life Coach, Bengaluru', color: '#F6C90E' },
              ].map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${t.color}22`, borderRadius: 20, padding: '24px 20px' }}>
                  <div style={{ fontSize: 24, color: t.color, marginBottom: 12, opacity: 0.6 }}>"</div>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: '0 0 16px' }}>{t.quote}</p>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{t.role}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── GUARANTEE (Existing) ────────────────────────────────────────────────── */}
          <div style={{ maxWidth: 860, margin: '80px auto 0', padding: '0 20px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="guarantee-box">
              <div style={{ fontSize: 40, marginBottom: 14 }}>🛡️</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(246,201,14,0.08)', border: '1px solid rgba(246,201,14,0.25)', borderRadius: 40, padding: '5px 18px', marginBottom: 20 }}>
                <Shield size={13} color="#F6C90E" />
                <span style={{ fontSize: 11, color: '#F6C90E', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Cinzel, serif' }}>Booking Guarantee</span>
              </div>
              <h3 style={{ fontSize: 'clamp(20px, 4vw, 34px)', fontWeight: 800, marginBottom: 14, letterSpacing: '0.01em', fontFamily: 'Cinzel, serif' }}>We deliver your bookings — or we keep working <span style={{ color: '#F6C90E' }}>at no extra charge</span></h3>
              <p style={{ fontSize: 'clamp(14px, 3vw, 16px)', color: 'rgba(255,255,255,0.45)', maxWidth: 500, margin: '0 auto', lineHeight: 1.75 }}>If we don't hit the promised consultation booking numbers by the end of your package, we continue working for you free of charge until we do. Your success is not optional for us.</p>
            </motion.div>
          </div>



          {/* ── FINAL CTA (Existing) ────────────────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ maxWidth: 900, margin: '72px auto 0', padding: '0 20px' }}>
            <div className="final-cta-box">
              <div style={{ fontSize: 36, marginBottom: 8 }}>🔮</div>
              <h3 style={{ fontSize: 'clamp(22px, 5vw, 40px)', fontWeight: 800, marginBottom: 14, letterSpacing: '0.01em', fontFamily: 'Cinzel, serif' }}>Ready to fill your <span className="gtext">calendar?</span></h3>
              <p style={{ fontSize: 'clamp(14px, 3vw, 15px)', color: 'rgba(255,255,255,0.42)', maxWidth: 460, margin: '0 auto 32px', lineHeight: 1.75 }}>We take on a limited number of practitioners each month to give every client the attention they deserve. Book a free 30-minute strategy call — we'll map out exactly what your practice needs to grow.</p>
              <div className="cta-btn-row">
                <a href="https://wa.me/919752523894?text=Hi%20ToFly!%20I'm%20an%20astrologer%20and%20I'd%20like%20a%20free%20strategy%20call" target="_blank" rel="noopener noreferrer" className="cta-btn-primary">Book My Free Strategy Call <Rocket size={16} /></a>
                <a href="https://wa.me/919752523894" target="_blank" rel="noopener noreferrer" className="cta-btn-secondary"><MessageCircle size={16} /> WhatsApp Us Now</a>
              </div>
            </div>
          </motion.div>

          <div style={{ paddingTop: 80 }}>
            <Footer />
          </div>

        </div>
      </div>

      {selectedPlan && <PaymentModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}

      <motion.a href="https://wa.me/919752523894?text=Hi%20ToFly!%20I'm%20interested%20in%20growing%20my%20astrology%20practice" target="_blank" rel="noopener noreferrer" className="whatsapp-fab" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, type: 'spring', stiffness: 200 }}>
        <MessageCircle size={17} /> Chat on WhatsApp
      </motion.a>
    </>
  )
}