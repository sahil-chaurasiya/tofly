import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Check, ArrowUpRight, ChevronDown,
  Users, TrendingUp, Award,
  MessageCircle, Shield, Rocket,
  Search, Target, Share2, Globe, PenTool, Video,
  Plus, Minus, ShoppingCart, Sliders, X as XIcon,
  BarChart2, Smartphone, Star, CalendarCheck,
  Activity, HeartPulse, Stethoscope, ClipboardList, MapPin, BadgeCheck
} from 'lucide-react'
import Footer from '../components/layout/Footer'
import PaymentModal from '../components/payment/PaymentModal'

// ─── SERVICE CATALOG ────────────────────────────────────────────────────────
const SERVICE_CATALOG = [
  {
    category: 'Local SEO & Google Maps',
    emoji: '📍',
    color: '#1E88E5',
    services: [
      { id: 'gmb-setup',    name: 'Google Business Profile Setup',       desc: 'Complete GMB optimization, category, photos, service areas',    price: 499900 },
      { id: 'gmb-posts',    name: 'GMB Weekly Posts (1 Month)',           desc: '8 health-focused posts to keep your listing active & visible',   price: 299900 },
      { id: 'gmb-reviews',  name: 'Patient Review Generation Campaign',   desc: 'Strategy + templates to collect 20+ genuine 5-star reviews',     price: 399900 },
      { id: 'seo-local',    name: 'Local SEO Package (3 Months)',         desc: 'Citations, local keywords, map pack optimization for clinics',    price: 1499900 },
    ],
  },
  {
    category: 'Google Ads for Patient Acquisition',
    emoji: '📣',
    color: '#26A69A',
    services: [
      { id: 'ads-google',   name: 'Google Ads Setup + 1 Month Mgmt',     desc: 'Campaigns targeting high-intent patient searches in your area',   price: 1299900 },
      { id: 'ads-meta',     name: 'Meta Ads Setup + 1 Month Mgmt',       desc: 'Facebook & Instagram campaigns for local patient awareness',      price: 999900 },
      { id: 'ads-youtube',  name: 'YouTube Ads (1 Month)',                desc: 'Educational health video ads targeting local patients',           price: 899900 },
    ],
  },
  {
    category: 'Website & Online Booking',
    emoji: '🌐',
    color: '#1E88E5',
    services: [
      { id: 'web-clinic',   name: 'Clinic Website (5 Pages)',             desc: 'Home, About, Services, Doctors, Contact — mobile-first & SEO',   price: 1999900 },
      { id: 'web-booking',  name: 'Appointment Booking Website',          desc: 'Online booking system, payment integration, patient portal',     price: 3499900 },
      { id: 'web-speed',    name: 'Website Speed Optimization',           desc: 'Core Web Vitals fix — 90+ PageSpeed score for better ranking',   price: 599900 },
      { id: 'web-maint',    name: 'Website Maintenance (3 Months)',       desc: 'Updates, security patches, uptime monitoring',                   price: 899900 },
    ],
  },
  {
    category: 'Social Media for Clinics',
    emoji: '📱',
    color: '#26A69A',
    services: [
      { id: 'smm-ig',       name: 'Instagram Management (1 Month)',       desc: '12 educational health posts + stories, captions, hashtags',      price: 799900 },
      { id: 'smm-fb',       name: 'Facebook Page Management (1 Month)',   desc: '10 posts, page optimization, patient community building',        price: 599900 },
      { id: 'smm-reels',    name: 'Health Reels / Shorts (4 Videos)',     desc: 'Patient education videos, health tips, doctor Q&A reels',        price: 999900 },
      { id: 'smm-calendar', name: 'Content Calendar (1 Month)',           desc: '30-day health content plan across all platforms',                price: 299900 },
    ],
  },
  {
    category: 'Reputation Management',
    emoji: '⭐',
    color: '#1E88E5',
    services: [
      { id: 'rep-reviews',  name: 'Review Monitoring & Response',         desc: 'Monitor and respond to all reviews professionally',              price: 399900 },
      { id: 'rep-strategy', name: 'Online Reputation Strategy (3 Mo)',    desc: 'Comprehensive plan to build and protect your clinic\'s reputation', price: 1199900 },
    ],
  },
  {
    category: 'SEO',
    emoji: '🔍',
    color: '#26A69A',
    services: [
      { id: 'seo-audit',    name: 'Full Medical SEO Audit',               desc: 'Technical, on-page & local SEO audit with priority action plan', price: 499900 },
      { id: 'seo-onpage',   name: 'On-Page SEO (10 Pages)',               desc: 'Medical keyword mapping, meta tags, schema markup',              price: 699900 },
      { id: 'seo-backlinks','name': 'Backlink Building (20 Links)',        desc: 'High-authority medical directory & guest post submissions',       price: 999900 },
    ],
  },
]

// ─── GLOBAL STYLES ───────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;600;700;900&display=swap');

  .med-root, .med-root * { box-sizing: border-box; }
  .med-root { font-family: 'Plus Jakarta Sans', sans-serif !important; }
  .med-root h1, .med-root h2, .med-root h3, .med-root h4 {
    font-family: 'Fraunces', serif !important;
  }

  .med-gtext {
    background: linear-gradient(135deg, #1E88E5 0%, #26A69A 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .med-plan-card {
    transition: transform 0.28s ease, box-shadow 0.28s ease;
  }
  @media (hover: hover) {
    .med-plan-card:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(30,136,229,0.12) !important; }
  }

  .med-cta-btn-primary {
    display: inline-flex; align-items: center; justify-content: center;
    gap: 10px; padding: 15px 36px; border-radius: 12px;
    background: linear-gradient(135deg, #1E88E5, #1565C0);
    color: #fff; font-weight: 700; text-decoration: none;
    font-size: 15px; font-family: 'Plus Jakarta Sans', sans-serif;
    box-shadow: 0 4px 20px rgba(30,136,229,0.35);
    transition: all 0.2s; white-space: nowrap; border: none; cursor: pointer;
  }
  .med-cta-btn-primary:hover { box-shadow: 0 8px 32px rgba(30,136,229,0.45); transform: translateY(-1px); }

  .med-cta-btn-secondary {
    display: inline-flex; align-items: center; justify-content: center;
    gap: 8px; padding: 15px 28px; border-radius: 12px;
    background: transparent; border: 1.5px solid #1E88E5;
    color: #1E88E5; font-weight: 600; text-decoration: none;
    font-size: 15px; font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.2s; white-space: nowrap;
  }
  .med-cta-btn-secondary:hover { background: rgba(30,136,229,0.06); }

  .med-problem-row {
    background: #fff;
    border-radius: 16px; padding: 20px 24px;
    display: grid; grid-template-columns: 48px 1fr 28px 1fr;
    align-items: center; gap: 16px;
    border: 1px solid #E3ECF7;
    box-shadow: 0 2px 12px rgba(30,136,229,0.06);
    transition: box-shadow 0.2s;
  }
  .med-problem-row:hover { box-shadow: 0 4px 20px rgba(30,136,229,0.12); }

  @media (max-width: 640px) {
    .med-problem-row { grid-template-columns: 1fr; gap: 10px; padding: 16px; }
    .med-problem-arrow { display: none; }
  }

  .med-stats-row { display: flex; justify-content: center; gap: 44px; flex-wrap: wrap; }
  @media (max-width: 480px) { .med-stats-row { gap: 24px; } }

  .med-plans-grid { display: flex; gap: 24px; justify-content: center; align-items: stretch; flex-wrap: wrap; }
  .med-plan-card-wrapper { flex: 1 1 0; min-width: 280px; max-width: 380px; }
  @media (max-width: 900px) { .med-plan-card-wrapper { min-width: 260px; max-width: 100%; flex: 1 1 280px; } }
  @media (max-width: 640px) { .med-plan-card-wrapper { min-width: 0; max-width: 100%; flex: 1 1 100%; } .med-plans-grid { gap: 16px; } }

  .med-cta-btn-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  @media (max-width: 480px) {
    .med-cta-btn-row { flex-direction: column; align-items: stretch; }
    .med-cta-btn-primary, .med-cta-btn-secondary { width: 100%; padding: 14px 20px; font-size: 14px; }
  }

  .med-hero-section { text-align: center; padding: 80px 20px 64px; max-width: 900px; margin: 0 auto; }
  @media (max-width: 640px) { .med-hero-section { padding: 52px 16px 48px; } }

  .med-section-wrap { max-width: 960px; margin: 0 auto 80px; padding: 0 20px; }
  @media (max-width: 640px) { .med-section-wrap { margin-bottom: 56px; padding: 0 16px; } }
  .med-wide-wrap { max-width: 1280px; margin: 0 auto 80px; padding: 0 20px; }
  @media (max-width: 640px) { .med-wide-wrap { margin-bottom: 56px; padding: 0 16px; } }
  .med-plans-wrap { max-width: 1280px; margin: 0 auto; padding: 0 20px; }
  @media (max-width: 640px) { .med-plans-wrap { padding: 0 16px; } }

  .med-plan-card-inner { padding: 28px 28px 0; }
  @media (max-width: 380px) { .med-plan-card-inner { padding: 20px 18px 0; } }
  .med-plan-cta-area { padding: 16px 28px 28px; margin-top: auto; }
  @media (max-width: 380px) { .med-plan-cta-area { padding: 14px 18px 22px; } }
  .med-plan-addons-area { padding: 0 28px; }
  @media (max-width: 380px) { .med-plan-addons-area { padding: 0 18px; } }

  .med-guarantee-box {
    background: linear-gradient(135deg, #EBF5FB, #E8F8F5);
    border: 1.5px solid #AED6F1;
    border-radius: 28px; padding: 52px 48px; text-align: center;
  }
  @media (max-width: 640px) { .med-guarantee-box { padding: 32px 20px; border-radius: 20px; } }

  .med-final-cta-box {
    background: linear-gradient(135deg, #1E88E5, #1565C0);
    border-radius: 28px; padding: 60px 48px; text-align: center;
    box-shadow: 0 16px 48px rgba(30,136,229,0.25);
  }
  @media (max-width: 640px) { .med-final-cta-box { padding: 36px 20px; border-radius: 20px; } }

  .med-whatsapp-fab {
    position: fixed; bottom: 24px; right: 24px; z-index: 1000;
    display: flex; align-items: center; gap: 10px;
    padding: 13px 24px; border-radius: 60px;
    background: linear-gradient(135deg, #25D366, #128C7E);
    color: #fff; font-weight: 700; font-size: 14px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    text-decoration: none;
    box-shadow: 0 4px 20px rgba(37,211,102,0.35);
    border: 1px solid rgba(255,255,255,0.15);
    transition: transform 0.15s, box-shadow 0.15s;
  }
  @media (max-width: 480px) {
    .med-whatsapp-fab { bottom: 16px; right: 16px; padding: 11px 18px; font-size: 13px; gap: 7px; }
  }
  .med-whatsapp-fab:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(37,211,102,0.45); }

  /* CUSTOM PLAN BUILDER */
  .med-cp-layout {
    display: grid;
    grid-template-columns: 1fr 310px;
    gap: 20px;
    align-items: start;
  }
  @media (max-width: 860px) {
    .med-cp-layout { grid-template-columns: 1fr; }
    .med-cp-summary-col { position: static !important; order: -1; }
  }
  .med-cp-category-block {
    border: 1.5px solid #E3ECF7;
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 10px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(30,136,229,0.05);
  }
  .med-cp-category-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 18px; cursor: pointer;
    background: #F8FBFF;
    border: none; width: 100%; text-align: left;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: background 0.15s;
    -webkit-tap-highlight-color: transparent;
  }
  .med-cp-category-header:hover { background: #EEF5FD; }
  .med-cp-service-row {
    display: flex; align-items: center; gap: 12px;
    padding: 13px 18px; cursor: pointer;
    border-top: 1px solid #EEF5FD;
    transition: background 0.15s;
    -webkit-tap-highlight-color: transparent;
  }
  @media (max-width: 480px) {
    .med-cp-service-row { padding: 12px 14px; gap: 10px; }
    .med-cp-category-header { padding: 12px 14px; }
  }
  .med-cp-service-row:hover { background: #F8FBFF; }
  .med-cp-service-row.selected { background: #EBF5FB; }
  .med-cp-checkbox {
    width: 20px; height: 20px; border-radius: 6px; flex-shrink: 0;
    border: 2px solid #CBD5E0;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.18s;
  }
  .med-cp-checkbox.checked { background: #1E88E5; border-color: #1E88E5; }
  .med-cp-summary-col { position: sticky; top: 24px; }
  .med-cp-summary-box {
    background: #fff;
    border: 1.5px solid #AED6F1;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(30,136,229,0.1);
  }
  .med-cp-summary-header {
    background: linear-gradient(135deg, #EBF5FB, #E8F8F5);
    padding: 16px 20px;
    border-bottom: 1.5px solid #AED6F1;
  }
  .med-cp-summary-items {
    padding: 10px 20px;
    max-height: 240px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #AED6F1 transparent;
  }
  .med-cp-summary-item {
    display: flex; justify-content: space-between; align-items: flex-start;
    padding: 8px 0;
    border-bottom: 1px solid #F0F6FD;
    gap: 10px;
  }
  .med-cp-summary-item:last-child { border-bottom: none; }
  .med-cp-summary-footer { padding: 14px 20px 18px; border-top: 1px solid #EEF5FD; }
  .med-cp-empty-state { padding: 28px 20px; text-align: center; }
  .med-cp-proceed-btn {
    width: 100%; padding: 13px; border-radius: 10px; border: none;
    background: linear-gradient(135deg, #1E88E5, #1565C0);
    color: #fff; font-size: 14px; font-weight: 700; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    box-shadow: 0 4px 16px rgba(30,136,229,0.3);
    transition: opacity 0.15s; white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
  }
  .med-cp-proceed-btn:hover { opacity: 0.88; }
  .med-cp-proceed-btn:disabled { opacity: 0.35; cursor: not-allowed; box-shadow: none; }
  .med-cp-remove-btn {
    background: none; border: none; cursor: pointer; padding: 2px 4px;
    color: #CBD5E0; line-height: 0; flex-shrink: 0;
    transition: color 0.15s;
  }
  .med-cp-remove-btn:hover { color: #e53e3e; }

  .med-trust-strip {
    display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;
    padding: 28px 20px;
    background: #F8FBFF;
    border-top: 1px solid #E3ECF7;
    border-bottom: 1px solid #E3ECF7;
  }
  .med-trust-pill {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; color: #4A6FA5; font-weight: 500;
  }

  .med-service-card {
    background: #fff;
    border: 1.5px solid #E3ECF7;
    border-radius: 16px;
    text-align: left;
    transition: all 0.25s ease;
    box-shadow: 0 2px 8px rgba(30,136,229,0.05);
    overflow: hidden;
  }
  .med-service-card:hover {
    border-color: #1E88E5;
    box-shadow: 0 8px 24px rgba(30,136,229,0.12);
    transform: translateY(-4px);
  }

  .med-benefit-card {
    background: #fff;
    border: 1.5px solid #E3ECF7;
    border-radius: 14px;
    padding: 24px 20px;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(30,136,229,0.04);
  }
  .med-benefit-card:hover {
    border-color: #1E88E5;
    box-shadow: 0 6px 20px rgba(30,136,229,0.1);
  }

  .med-reason-card {
    background: #fff;
    border: 1.5px solid #E3ECF7;
    border-radius: 20px;
    padding: 28px 24px;
    text-align: center;
    transition: all 0.2s;
    box-shadow: 0 2px 8px rgba(30,136,229,0.05);
  }
  .med-reason-card:hover { 
    box-shadow: 0 8px 24px rgba(30,136,229,0.12); 
    transform: translateY(-2px);
  }

  .med-divider {
    border: none;
    border-top: 1.5px solid #E3ECF7;
    margin: 0 auto;
    max-width: 120px;
  }

  /* Hero image grid */
  .med-hero-img-grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr;
    gap: 16px;
    align-items: stretch;
  }
  @media (max-width: 700px) {
    .med-hero-img-grid {
      grid-template-columns: 1fr 1fr;
    }
    .med-hero-img-grid > :first-child {
      grid-column: 1 / -1;
    }
  }
  @media (max-width: 420px) {
    .med-hero-img-grid { display: none; }
  }

  /* Subtle grid bg for hero */
  .med-hero-bg {
    background-image: 
      radial-gradient(ellipse 70% 50% at 50% 0%, rgba(30,136,229,0.07) 0%, transparent 70%),
      linear-gradient(to bottom, #F8FBFF 0%, #ffffff 100%);
  }
`

// ─── DATA ────────────────────────────────────────────────────────────────────
const PLANS = [
  {
    id: 'clinic-growth',
    num: '01',
    Icon: Activity,
    label: 'Clinic Growth',
    duration: '3 Months',
    tagline: 'Start filling your appointment calendar',
    orig: '₹1,20,000',
    price: '₹99,000',
    discount: '17% OFF',
    bookings: '150+ Patient Appointments in 3 Months',
    color: '#1E88E5',
    gradient: 'linear-gradient(135deg, #1E88E5, #1565C0)',
    badge: null,
    services: [
      'Google Business Profile setup & optimization for local patient discovery',
      'Local SEO so patients find your clinic before competitors',
      'Targeted Google Ads reaching patients actively searching for your specialty',
      'Automated online appointment booking system',
      'Monthly performance report: appointments, calls, and ad results',
      'Patient review generation strategy for Google & Practo',
    ],
    result: 'A consistent flow of new patients discovering and booking your clinic — not just through word-of-mouth.',
  },
  {
    id: 'patient-expansion',
    num: '02',
    Icon: HeartPulse,
    label: 'Patient Expansion',
    duration: '6 Months',
    tagline: 'Become the go-to clinic in your area',
    orig: '₹2,40,000',
    price: '₹1,79,998',
    discount: '25% OFF',
    bookings: '350+ Patient Appointments in 6 Months',
    color: '#26A69A',
    gradient: 'linear-gradient(135deg, #26A69A, #00796B)',
    badge: '🏆 Most Popular',
    services: [
      'Everything in Clinic Growth',
      'Dedicated landing page designed to convert visitors into booked appointments',
      'Advanced Meta + Google Ads, managed and optimized weekly',
      'Automated WhatsApp reminders to reduce no-shows',
      'A/B tested ad copy and targeting for your specialty',
      'Bi-weekly strategy calls with your dedicated growth manager',
      'Retargeting campaigns for patients who visited but didn\'t book',
      'Social media health content calendar to build patient trust',
    ],
    result: 'Appointment requests arriving consistently — without your team spending hours following up with every inquiry.',
  },
  {
    id: 'authority-builder',
    num: '03',
    Icon: BadgeCheck,
    label: 'Authority Builder',
    duration: '12 Months',
    tagline: 'The most trusted specialist in your city',
    orig: '₹4,80,000',
    price: '₹3,11,998',
    discount: '35% OFF',
    bookings: '800+ Patient Appointments in 12 Months',
    color: '#1E88E5',
    gradient: 'linear-gradient(135deg, #1E88E5, #26A69A)',
    badge: '✨ Best Value',
    services: [
      'Everything in Patient Expansion',
      'Full digital presence: from first Google search to confirmed appointment',
      'Advanced patient nurture sequences — educated, pre-qualified leads',
      'Video marketing: patient education content that builds authority',
      'Custom analytics dashboard — all your growth metrics in one place',
      'Dedicated strategy manager focused on your specialty and goals',
      'Scaling ad strategy as your practice expands',
      'Competitive analysis to keep your clinic ahead in local rankings',
    ],
    result: 'Within 90 days, patients in your city will find your name every time they search for your specialty — or we keep working free until they do.',
  },
]

const PROBLEMS = [
  {
    icon: '📅',
    pain: 'Patients call to inquire but never show up — empty slots cost you real revenue every single day',
    fix: 'Automated appointment reminders and seamless online booking reduce no-shows and fill your calendar reliably',
  },
  {
    icon: '🔍',
    pain: 'You have years of expertise but patients can\'t find you online — they\'re booking competitors instead',
    fix: 'Local SEO and Google Business optimization put your clinic at the top when patients search your specialty nearby',
  },
  {
    icon: '💬',
    pain: 'You depend entirely on word-of-mouth referrals, making it impossible to predict next month\'s appointments',
    fix: 'A predictable digital pipeline delivers new patient inquiries every week — independent of referrals',
  },
  {
    icon: '⭐',
    pain: 'Low Google ratings and few reviews make patients choose better-reviewed clinics even if yours is superior',
    fix: 'A structured review generation strategy helps you collect genuine 5-star reviews that build lasting trust',
  },
  {
    icon: '📉',
    pain: 'You\'re spending on ads but can\'t tell what\'s working — budget is wasted on clicks that never book',
    fix: 'Data-driven campaigns with full conversion tracking so every rupee you spend is accountable and optimized',
  },
]

const DIGITAL_SERVICES = [
  { icon: MapPin,       title: 'Local SEO & Google Maps', desc: 'Rank at the top for "doctor near me" and specialty keywords. We optimize your clinic to attract patients searching in your area right now.', color: '#1E88E5', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop' },
  { icon: Target,       title: 'Google Ads for Patients',  desc: 'High-intent patient acquisition campaigns. Get instant visibility and qualified appointment inquiries from day one.', color: '#26A69A', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80&auto=format&fit=crop' },
  { icon: Globe,        title: 'Clinic Website Development', desc: 'Professional, mobile-first clinic websites with appointment booking, doctor profiles, and patient resources.', color: '#1E88E5', img: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&q=80&auto=format&fit=crop' },
  { icon: CalendarCheck,title: 'Appointment Booking System', desc: 'Automated online scheduling, SMS/WhatsApp reminders, and seamless patient intake — fewer no-shows, more revenue.', color: '#26A69A', img: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=400&q=80&auto=format&fit=crop' },
  { icon: Star,         title: 'Reputation Management',    desc: 'Build and protect your online reputation. We help you collect glowing reviews on Google, Practo, and Justdial.', color: '#1E88E5', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80&auto=format&fit=crop' },
  { icon: Share2,       title: 'Social Media (Health Content)', desc: 'Educational content that positions you as an expert, builds patient trust, and keeps your clinic top-of-mind.', color: '#26A69A', img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80&auto=format&fit=crop' },
]

const BENEFITS = [
  { num: '01', title: 'Consistent Appointment Flow',    desc: 'Stop depending on unpredictable referrals. A reliable digital pipeline fills your calendar week after week.' },
  { num: '02', title: 'Higher Patient Trust',           desc: 'Professional online presence, verified reviews, and educational content make patients choose you with confidence.' },
  { num: '03', title: 'Reduced No-Shows',               desc: 'Automated reminders and easy rescheduling cut no-show rates significantly, protecting your revenue.' },
  { num: '04', title: 'Measurable ROI',                 desc: 'Every campaign is tracked. You see exactly which channels drive bookings and what each patient costs to acquire.' },
  { num: '05', title: 'Local Authority',                desc: 'Dominate your specialty in local search results so you\'re the first name patients see when they need care.' },
  { num: '06', title: 'Ethical Patient Acquisition',    desc: 'Privacy-conscious, compliant marketing that respects patient confidentiality at every touchpoint.' },
  { num: '07', title: 'Attract the Right Patients',     desc: 'Target campaigns to your specific specialty and location — attract patients who actually need your care.' },
  { num: '08', title: 'Scale Without Chaos',            desc: 'Grow your patient base at a manageable pace with systems that scale — no staffing emergencies.' },
  { num: '09', title: 'Outpace Competitors',            desc: 'While other clinics rely on word-of-mouth, you\'ll be the top result every time a patient searches online.' },
]

const REASONS = [
  { num: '01', title: '9+ Years in Healthcare Marketing', desc: 'Over 200 doctors and clinics served across India. We understand the unique compliance and sensitivity of healthcare marketing.', color: '#1E88E5' },
  { num: '02', title: '₹9Cr+ Ad Spend Managed',          desc: 'We\'ve mastered ROI-positive patient acquisition campaigns across every major medical specialty.', color: '#26A69A' },
  { num: '03', title: 'Privacy-First Approach',           desc: 'All our campaigns are designed with patient confidentiality in mind. We never compromise on responsible marketing.', color: '#1E88E5' },
  { num: '04', title: 'Specialty-Specific Strategies',    desc: 'Dermatology, orthopaedics, dentistry, physiotherapy — we have dedicated playbooks for each specialty.', color: '#26A69A' },
  { num: '05', title: 'Dedicated Healthcare Team',        desc: 'Designers, SEO experts, and Google-certified ad specialists who understand medical terminology and patient psychology.', color: '#1E88E5' },
  { num: '06', title: 'Transparent Monthly Reporting',    desc: 'Clear reports showing appointments generated, cost per patient, ROI, and what we\'re doing next.', color: '#26A69A' },
]

// ─── CUSTOM PLAN BUILDER ─────────────────────────────────────────────────────
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
      color:    '#1E88E5',
      gradient: 'linear-gradient(135deg, #1E88E5, #26A69A)',
      selectedServices: selectedList.map(s => ({
        id:       s.id,
        name:     s.name,
        category: SERVICE_CATALOG.find(g => g.services.some(sv => sv.id === s.id))?.category || '',
        price:    s.price,
      })),
    })
  }

  return (
    <div className="med-cp-layout">
      <div>
        {SERVICE_CATALOG.map(group => {
          const isOpen        = openCats[group.category]
          const selectedInCat = group.services.filter(s => selected[s.id]).length
          return (
            <div key={group.category} className="med-cp-category-block">
              <button className="med-cp-category-header" onClick={() => toggleCat(group.category)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: `${group.color}18`, border: `1.5px solid ${group.color}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 17,
                  }}>{group.emoji}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1A2B4A' }}>{group.category}</div>
                    <div style={{ fontSize: 11, color: '#7A94B8', marginTop: 1 }}>
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
                  <ChevronDown size={16} color="#7A94B8" />
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
                          className={`med-cp-service-row${isChecked ? ' selected' : ''}`}
                          onClick={() => toggle(service)}
                        >
                          <div className={`med-cp-checkbox${isChecked ? ' checked' : ''}`}>
                            {isChecked && <Check size={12} color="#fff" strokeWidth={3} />}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: isChecked ? '#1A2B4A' : '#3D5A80', lineHeight: 1.3 }}>
                              {service.name}
                            </div>
                            <div style={{ fontSize: 12, color: '#7A94B8', marginTop: 2, lineHeight: 1.5 }}>
                              {service.desc}
                            </div>
                          </div>
                          <div style={{
                            fontSize: 14, fontWeight: 700, flexShrink: 0,
                            color: isChecked ? group.color : '#4A6FA5',
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

      <div className="med-cp-summary-col">
        <div className="med-cp-summary-box">
          <div className="med-cp-summary-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <ShoppingCart size={16} color="#1E88E5" />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#1E88E5', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Your Selection
              </span>
            </div>
            <div style={{ fontSize: 12, color: '#7A94B8' }}>
              {selectedList.length === 0
                ? 'No services selected yet'
                : `${selectedList.length} service${selectedList.length > 1 ? 's' : ''} selected`}
            </div>
          </div>

          {selectedList.length === 0 && (
            <div className="med-cp-empty-state">
              <div style={{ fontSize: 32, marginBottom: 10 }}>🏥</div>
              <div style={{ fontSize: 13, color: '#7A94B8', lineHeight: 1.6 }}>
                Select services on the left to build your custom package.
              </div>
            </div>
          )}

          {selectedList.length > 0 && (
            <div className="med-cp-summary-items">
              <AnimatePresence>
                {selectedList.map(s => {
                  const catGroup = SERVICE_CATALOG.find(g => g.services.some(sv => sv.id === s.id))
                  return (
                    <motion.div
                      key={s.id}
                      className="med-cp-summary-item"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, color: catGroup?.color || '#1E88E5', fontWeight: 600, marginBottom: 1 }}>
                          {catGroup?.emoji} {catGroup?.category}
                        </div>
                        <div style={{ fontSize: 13, color: '#1A2B4A', lineHeight: 1.35 }}>{s.name}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#1A2B4A' }}>{fmt(s.price)}</span>
                        <button className="med-cp-remove-btn" onClick={(e) => { e.stopPropagation(); removeItem(s.id) }}>
                          <XIcon size={13} />
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}

          <div className="med-cp-summary-footer">
            {selectedList.length > 0 && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: '#7A94B8' }}>Subtotal</span>
                  <span style={{ fontSize: 13, color: '#4A6FA5' }}>{fmt(totalPaise)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingTop: 10, borderTop: '1px solid #EEF5FD' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#1A2B4A' }}>Total</span>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#1A2B4A' }}>{fmt(totalPaise)}</span>
                </div>
              </>
            )}
            <button
              className="med-cp-proceed-btn"
              onClick={handleCheckout}
              disabled={selectedList.length === 0}
            >
              <ShoppingCart size={16} />
              {selectedList.length === 0 ? 'Add services to proceed' : `Proceed · ${fmt(totalPaise)}`}
            </button>
            {selectedList.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 12 }}>
                <Shield size={11} color="#7A94B8" />
                <span style={{ fontSize: 11, color: '#7A94B8' }}>Secured by Razorpay · UPI · Cards</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

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
      className="med-plan-card med-plan-card-wrapper"
      style={{
        borderRadius: 24,
        background: '#fff',
        border: `1.5px solid ${plan.badge ? plan.color + '55' : '#E3ECF7'}`,
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        boxShadow: plan.badge ? `0 8px 32px ${plan.color}18` : '0 2px 16px rgba(30,136,229,0.07)',
      }}
    >
      <div style={{ height: 4, background: plan.gradient, width: '100%', flexShrink: 0 }} />

      {plan.badge && (
        <div style={{
          position: 'absolute', top: 20, right: 20,
          background: plan.gradient, color: '#fff',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
          padding: '5px 14px', borderRadius: 40, zIndex: 2,
        }}>
          {plan.badge}
        </div>
      )}

      <div className="med-plan-card-inner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: plan.color, letterSpacing: '0.1em', fontWeight: 700, textTransform: 'uppercase' }}>{plan.num}</span>
            <span style={{
              fontSize: 11, fontWeight: 600, color: '#7A94B8',
              background: '#F0F6FD', borderRadius: 20,
              padding: '3px 10px', letterSpacing: '0.04em',
            }}>{plan.duration}</span>
          </div>
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            background: `${plan.color}12`, border: `1.5px solid ${plan.color}25`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <plan.Icon size={20} color={plan.color} strokeWidth={1.5} />
          </div>
        </div>

        <div style={{
          fontSize: 'clamp(26px, 5vw, 32px)', fontWeight: 900,
          fontFamily: 'Fraunces, serif',
          background: plan.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.01em', marginBottom: 4,
        }}>
          {plan.label}
        </div>
        <div style={{ fontSize: 13, color: '#7A94B8', marginBottom: 20 }}>{plan.tagline}</div>

        <div style={{
          background: '#F8FBFF', border: `1.5px solid ${plan.color}22`,
          borderRadius: 14, padding: '14px 16px', marginBottom: 22,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: '#A0B4CC', textDecoration: 'line-through' }}>{plan.orig}</span>
            <span style={{
              fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6,
              background: 'rgba(38,166,154,0.12)', color: '#00796B', whiteSpace: 'nowrap',
            }}>{plan.discount}</span>
          </div>
          <div style={{ fontSize: 'clamp(28px, 7vw, 36px)', fontWeight: 800, color: '#1A2B4A', letterSpacing: '-0.02em', lineHeight: 1 }}>{plan.price}</div>
          <div style={{ fontSize: 11, color: '#A0B4CC', marginTop: 4 }}>total for {plan.duration.toLowerCase()}</div>
          <div style={{ fontSize: 12, color: plan.color, fontWeight: 600, marginTop: 10 }}>📅 {plan.bookings}</div>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: 9 }}>
          {plan.services.map((s, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{
                marginTop: 3, flexShrink: 0, width: 17, height: 17, borderRadius: '50%',
                background: `${plan.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Check size={9} color={plan.color} strokeWidth={3} />
              </div>
              <span style={{ fontSize: 13, color: '#4A6FA5', lineHeight: 1.5 }}>{s}</span>
            </li>
          ))}
        </ul>

        <div style={{
          background: '#F8FBFF', borderRadius: 12, padding: '12px 14px',
          marginBottom: 18, borderLeft: `3px solid ${plan.color}`,
        }}>
          <div style={{ fontSize: 10, color: plan.color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5, fontWeight: 700 }}>Expected outcome</div>
          <div style={{ fontSize: 13, color: '#4A6FA5', lineHeight: 1.55 }}>{plan.result}</div>
        </div>
      </div>

      <div className="med-plan-addons-area">
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '12px 0', width: '100%',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: plan.color,
            borderTop: '1px solid #EEF5FD',
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
              <div style={{ paddingBottom: 14, fontSize: 13, color: '#7A94B8', lineHeight: 1.6 }}>
                Patient feedback systems, online pharmacy integration, telemedicine setup, health app development, email newsletters, custom CRM — priced on request.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="med-plan-cta-area">
        <button
          onClick={() => onPay && onPay(plan)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '14px 24px', borderRadius: 12, width: '100%',
            border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700,
            background: plan.gradient, color: '#fff',
            boxShadow: `0 4px 16px ${plan.color}40`,
            transition: 'opacity 0.15s', WebkitTapHighlightColor: 'transparent',
            minHeight: 48,
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Get More Patients <ArrowUpRight size={15} />
        </button>
      </div>
    </motion.div>
  )
}

// ─── PROBLEM ROW ─────────────────────────────────────────────────────────────
function ProblemRow({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="med-problem-row"
    >
      <div style={{ fontSize: 28, lineHeight: 1 }}>{item.icon}</div>
      <div>
        <div style={{ fontSize: 11, color: '#E53E3E', marginBottom: 5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>The Challenge</div>
        <div style={{ fontSize: 14, color: '#4A6FA5', lineHeight: 1.5 }}>{item.pain}</div>
      </div>
      <div className="med-problem-arrow" style={{ display: 'flex', justifyContent: 'center' }}>
        <ArrowUpRight size={18} color="#1E88E5" />
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#26A69A', marginBottom: 5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>The Solution</div>
        <div style={{ fontSize: 14, color: '#1A2B4A', lineHeight: 1.5, fontWeight: 500 }}>{item.fix}</div>
      </div>
    </motion.div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function DoctorPricingPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />

      <div
        className="med-root"
        style={{
          minHeight: '100vh',
          background: '#F8FBFF',
          color: '#1A2B4A',
          overflowX: 'clip',
          position: 'relative',
        }}
      >
        {/* Top gradient strip */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '520px',
          background: 'linear-gradient(180deg, #EBF5FB 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>

{/* ── HERO ─────────────────────────────────────────────────────────── */}
          <div
            ref={heroRef}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr minmax(0, 640px) 1fr',
              alignItems: 'center',
              gap: 0,
              padding: '80px 0 64px',
              maxWidth: 1400,
              margin: '0 auto',
            }}
          >
            {/* LEFT — Doctors image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              style={{
                height: '100%',
                minHeight: 420,
                maxHeight: 260,
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                // overflow: 'hidden',
              }}
            >
              <img
                src="/hero/doctors2_cropped.png"
                alt="Doctors"
                style={{
                  width: '100%',
                  maxHeight: 520,
                  objectFit: 'contain',
                  objectPosition: 'center bottom',
                  display: 'block',
                  transform: 'scaleX(-1)',
                  marginBottom: 0,
                  alignSelf: 'flex-end',
                }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, transparent 70%, #F8FBFF 100%)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', bottom: 20, left: 20,
                background: 'rgba(255,255,255,0.93)', backdropFilter: 'blur(8px)',
                borderRadius: 12, padding: '10px 16px',
                display: 'flex', alignItems: 'center', gap: 10,
                boxShadow: '0 4px 16px rgba(30,136,229,0.12)',
              }}>
                <span style={{ fontSize: 20 }}>📅</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1A2B4A' }}>+38 Bookings</div>
                  <div style={{ fontSize: 11, color: '#7A94B8' }}>This week</div>
                </div>
              </div>
            </motion.div>

            {/* CENTER — Text content */}
            <div style={{ textAlign: 'center', padding: '0 40px' }}>
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
                  background: 'rgba(30,136,229,0.08)',
                  padding: '7px 20px', borderRadius: 60,
                  border: '1.5px solid rgba(30,136,229,0.2)',
                }}>
                  <Stethoscope size={13} color="#1E88E5" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#1E88E5', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    India's Leading Digital Marketing Agency for Healthcare
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.08 }}
                style={{
                  fontSize: 'clamp(34px, 5vw, 68px)',
                  fontWeight: 900, lineHeight: 1.15,
                  margin: '0 0 24px',
                  letterSpacing: '-0.02em',
                  color: '#1A2B4A',
                }}
              >
                More Patients.{' '}
                <br />
                <span className="med-gtext">Fuller Appointment Calendars.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  fontSize: 'clamp(15px, 2vw, 19px)',
                  color: '#4A6FA5',
                  maxWidth: 520, margin: '0 auto 44px', lineHeight: 1.75,
                }}
              >
                We help doctors, clinics, and healthcare specialists attract consistent patient appointments through ethical, data-driven digital marketing — without depending on referrals alone.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.28 }}
              >
                <div className="med-stats-row">
                  {[
                    { value: '200+', label: 'Clinics Scaled', Icon: Users },
                    { value: '50,000+', label: 'Patients Generated', Icon: CalendarCheck },
                    { value: '98%', label: 'Retention Rate', Icon: Award },
                  ].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginBottom: 4 }}>
                        <s.Icon size={15} color="#1E88E5" strokeWidth={2} />
                        <span style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color: '#1A2B4A', fontFamily: 'Fraunces, serif' }}>{s.value}</span>
                      </div>
                      <div style={{ fontSize: 13, color: '#7A94B8' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 36, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <a
                    href="https://wa.me/919752523894?text=Hi%20ToFly!%20I%27m%20a%20doctor%20and%20I%27d%20like%20to%20get%20more%20patients"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="med-cta-btn-primary"
                  >
                    Get More Patients <Rocket size={15} />
                  </a>
                  <a
                    href="https://wa.me/919752523894"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="med-cta-btn-secondary"
                  >
                    <MessageCircle size={15} /> Book Free Consultation
                  </a>
                </div>
              </motion.div>
            </div>

            {/* RIGHT — Stethoscope image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              style={{
                height: '100%',
                minHeight: 420,
                position: 'relative',
                overflow: 'hidden',
                // borderRadius: '28px 0 0 28px',
                // background: 'linear-gradient(135deg, #EBF5FB 0%, #E8F8F5 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // boxShadow: '-8px 0 40px rgba(30,136,229,0.10)',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                // background: 'linear-gradient(to left, transparent 55%, #F8FBFF 100%)',
                zIndex: 1,
                
              }} />
              <img
                src="/hero/stethoscope_cropped.png"
                alt="Stethoscope"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  position: 'relative',
                  zIndex: 2,
                  filter: 'drop-shadow(0 8px 32px rgba(30,136,229,0.18))',
                }}
              />
              <div style={{
                position: 'absolute', bottom: 20, right: 20, zIndex: 3,
                background: 'linear-gradient(135deg, #1E88E5, #26A69A)',
                borderRadius: 12, padding: '10px 16px', textAlign: 'center',
                boxShadow: '0 4px 16px rgba(30,136,229,0.25)',
              }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', fontFamily: 'Fraunces, serif' }}>4.9★</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>Avg. Google Rating</div>
              </div>
            </motion.div>
          </div>

          {/* ── HERO IMAGES ──────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="med-hero-img-grid"
            style={{ maxWidth: 960, margin: '0 auto 0', padding: '0 20px 48px' }}
          >
            <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 32px rgba(30,136,229,0.13)', position: 'relative', minHeight: 220 }}>
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80&auto=format&fit=crop"
                alt="Doctor consulting patient"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', bottom: 14, left: 14,
                background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
                borderRadius: 10, padding: '8px 14px',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ fontSize: 18 }}>📅</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1A2B4A' }}>+38 Bookings</div>
                  <div style={{ fontSize: 10, color: '#7A94B8' }}>This week</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 32px rgba(30,136,229,0.1)', flex: 1 }}>
                <img
                  src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&q=80&auto=format&fit=crop"
                  alt="Medical team"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{
                borderRadius: 16, background: 'linear-gradient(135deg,#1E88E5,#26A69A)',
                padding: '18px 16px', textAlign: 'center',
                boxShadow: '0 4px 20px rgba(30,136,229,0.25)',
              }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', fontFamily: 'Fraunces, serif' }}>4.9★</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>Avg. Google Rating</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{
                borderRadius: 16, background: '#fff', border: '1.5px solid #E3ECF7',
                padding: '18px 16px', textAlign: 'center',
                boxShadow: '0 4px 16px rgba(30,136,229,0.08)',
              }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#1E88E5', fontFamily: 'Fraunces, serif' }}>200+</div>
                <div style={{ fontSize: 11, color: '#7A94B8', marginTop: 2 }}>Clinics Scaled</div>
              </div>
              <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 32px rgba(30,136,229,0.1)', flex: 1 }}>
                <img
                  src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&q=80&auto=format&fit=crop"
                  alt="Clinic reception"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </motion.div>

          {/* ── TRUST STRIP ──────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="med-trust-strip"
          >
            {[
              { icon: '🏥', text: '200+ Clinics Served' },
              { icon: '👨‍⚕️', text: '15+ Medical Specialties' },
              { icon: '🌍', text: 'Pan-India Coverage' },
              { icon: '📋', text: 'Privacy-First Marketing' },
            ].map((t, i) => (
              <div key={i} className="med-trust-pill">
                <span>{t.icon} {t.text}</span>
              </div>
            ))}
          </motion.div>

          <div style={{ textAlign: 'center', margin: '60px auto 60px' }}>
            <hr className="med-divider" />
          </div>

          {/* ── PROBLEMS ─────────────────────────────────────────────────────── */}
          <div className="med-section-wrap">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', marginBottom: 40 }}
            >
              <div style={{ fontSize: 11, color: '#26A69A', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>
                Real Challenges, Real Solutions
              </div>
              <h2 style={{ fontSize: 'clamp(24px, 4.5vw, 40px)', fontWeight: 800, letterSpacing: '-0.01em', margin: '0 0 14px', color: '#1A2B4A' }}>
                From{' '}
                <span style={{ color: '#A0B4CC' }}>half-empty clinics</span>{' '}
                to{' '}
                <span className="med-gtext">fully booked schedules</span>
              </h2>
              <p style={{ fontSize: 14, color: '#7A94B8', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
                These are the exact challenges healthcare professionals come to us with — and here is what we do about each one.
              </p>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PROBLEMS.map((item, i) => <ProblemRow key={i} item={item} index={i} />)}
            </div>
          </div>

          {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
          <div className="med-section-wrap">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 40 }}
            >
              <div style={{ fontSize: 11, color: '#1E88E5', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>How It Works</div>
              <h2 style={{ fontSize: 'clamp(24px, 4.5vw, 40px)', fontWeight: 800, margin: '0 0 12px', color: '#1A2B4A' }}>
                Simple. Systematic. <span className="med-gtext">Measurable.</span>
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
              {[
                { step: '01', title: 'Build your online presence', desc: 'We set up and optimize your Google profile, website, and ad campaigns to ensure patients find your clinic when they need you.', color: '#1E88E5' },
                { step: '02', title: 'Patients discover and trust you', desc: 'Verified reviews, educational content, and a professional online presence build the credibility that converts searchers into callers.', color: '#26A69A' },
                { step: '03', title: 'They book. You treat.', desc: 'An automated booking system, appointment reminders, and seamless intake means you wake up to confirmed appointments — not inquiry chains.', color: '#1E88E5' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                  style={{ background: '#fff', border: `1.5px solid ${item.color}22`, borderRadius: 20, padding: '28px 24px', boxShadow: '0 2px 12px rgba(30,136,229,0.06)' }}>
                  <div style={{ fontSize: 'clamp(32px, 7vw, 44px)', fontWeight: 900, color: item.color, fontFamily: 'Fraunces, serif', opacity: 0.2, marginBottom: 12 }}>{item.step}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#1A2B4A', marginBottom: 10, fontFamily: 'Fraunces, serif', lineHeight: 1.3 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: '#7A94B8', lineHeight: 1.65 }}>{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── WHY CHOOSE US ─────────────────────────────────────────────────── */}
          <div style={{ background: '#EBF5FB', padding: '64px 0', marginBottom: 80 }}>
            <div className="med-section-wrap" style={{ marginBottom: 0 }}>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 40 }}>
                <div style={{ fontSize: 11, color: '#26A69A', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>Why Partner With Us</div>
                <h2 style={{ fontSize: 'clamp(24px, 4.5vw, 40px)', fontWeight: 800, margin: '0 0 12px', color: '#1A2B4A' }}>
                  Healthcare marketing needs a <span className="med-gtext">specialist</span>
                </h2>
              </motion.div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, alignItems: 'center' }}>
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#1E88E5', marginBottom: 8 }}>🏥 Healthcare-Focused Expertise</div>
                      <p style={{ fontSize: 14, color: '#4A6FA5', lineHeight: 1.7, margin: 0 }}>We don't apply generic marketing to healthcare. We understand compliance requirements, patient psychology, and the unique ethical considerations of promoting medical services.</p>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#26A69A', marginBottom: 8 }}>🔒 Privacy-Conscious Campaigns</div>
                      <p style={{ fontSize: 14, color: '#4A6FA5', lineHeight: 1.7, margin: 0 }}>Every campaign we run respects patient confidentiality. Our messaging never exploits medical anxieties — we build trust through education and credibility.</p>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#1E88E5', marginBottom: 8 }}>📊 Measurable Patient ROI</div>
                      <p style={{ fontSize: 14, color: '#4A6FA5', lineHeight: 1.7, margin: 0 }}>You see exactly how many patients were generated, what each cost to acquire, and what your return on investment is — every single month.</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <div style={{ background: '#fff', border: '1.5px solid #AED6F1', borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 20px rgba(30,136,229,0.08)' }}>
                    <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                      <img
                        src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80&auto=format&fit=crop"
                        alt="Medical specialists"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to bottom, transparent 40%, rgba(30,136,229,0.6) 100%)',
                      }} />
                      <div style={{ position: 'absolute', bottom: 14, left: 16 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>15+ Medical Specialties Covered</span>
                      </div>
                    </div>
                    <div style={{ padding: 24 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: '#1A2B4A', marginBottom: 12, fontFamily: 'Fraunces, serif' }}>Specialties We Serve</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {['General Physicians', 'Dentists', 'Dermatologists', 'Orthopaedics', 'Gynaecologists', 'Physiotherapists', 'Eye Specialists', 'Paediatricians', 'ENT Specialists', 'Cardiologists'].map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#4A6FA5' }}>
                          <Check size={13} color="#26A69A" strokeWidth={2.5} />
                          {s}
                        </div>
                      ))}
                    </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ── SERVICES ─────────────────────────────────────────────────────── */}
          <div className="med-wide-wrap">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 11, color: '#1E88E5', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>Our Services</div>
              <h2 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 800, margin: '0 0 14px', color: '#1A2B4A' }}>
                Digital Marketing Services <span className="med-gtext">for Doctors</span>
              </h2>
              <p style={{ fontSize: 15, color: '#7A94B8', maxWidth: 600, margin: '0 auto' }}>Everything your clinic needs to attract, convert, and retain patients in the digital age.</p>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
              {DIGITAL_SERVICES.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="med-service-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ height: 140, overflow: 'hidden', position: 'relative' }}>
                    <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 40%, ${s.color}55 100%)` }} />
                    <div style={{ position: 'absolute', bottom: 12, left: 12, width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
                      <s.icon size={20} color={s.color} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div style={{ padding: '20px 20px 24px' }}>
                    <h4 style={{ fontSize: 17, fontWeight: 700, color: '#1A2B4A', marginBottom: 10, fontFamily: 'Fraunces, serif' }}>{s.title}</h4>
                    <p style={{ fontSize: 13, color: '#7A94B8', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── VISUAL BANNER ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ maxWidth: 1100, margin: '0 auto 80px', padding: '0 20px' }}
          >
            <div style={{ borderRadius: 28, overflow: 'hidden', position: 'relative', height: 260, boxShadow: '0 16px 48px rgba(30,136,229,0.18)' }}>
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80&auto=format&fit=crop"
                alt="Modern clinic"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(21,101,192,0.82) 0%, rgba(38,166,154,0.72) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                textAlign: 'center', padding: '24px 32px',
              }}>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12, fontWeight: 700 }}>
                  Trusted by Doctors Across India
                </div>
                <h3 style={{ fontSize: 'clamp(22px,5vw,38px)', fontWeight: 900, color: '#fff', fontFamily: 'Fraunces, serif', margin: '0 0 18px', lineHeight: 1.2 }}>
                  Every day, patients are searching for a doctor like you.
                </h3>
                <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {[['50,000+','Patients Generated'],['₹9Cr+','Ad Spend Managed'],['98%','Retention Rate']].map(([val, lab], i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 'clamp(20px,4vw,28px)', fontWeight: 900, color: '#fff', fontFamily: 'Fraunces, serif' }}>{val}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>{lab}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── 6 REASONS ─────────────────────────────────────────────────────── */}
          <div className="med-wide-wrap">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 11, color: '#1E88E5', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>Why ToFly Media</div>
              <h2 style={{ fontSize: 'clamp(24px, 4.5vw, 40px)', fontWeight: 800, margin: '0 0 12px', color: '#1A2B4A' }}>
                6 Reasons Doctors Choose <span className="med-gtext">ToFly Media</span>
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
              {REASONS.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="med-reason-card">
                  <div style={{ fontSize: 36, fontWeight: 900, color: r.color, opacity: 0.15, fontFamily: 'Fraunces, serif', marginBottom: 12 }}>{r.num}</div>
                  <h4 style={{ fontSize: 18, fontWeight: 700, color: '#1A2B4A', marginBottom: 10, fontFamily: 'Fraunces, serif' }}>{r.title}</h4>
                  <p style={{ fontSize: 13, color: '#7A94B8', lineHeight: 1.7, margin: 0 }}>{r.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── PLANS ────────────────────────────────────────────────────────── */}
          <div className="med-plans-wrap" style={{ marginTop: 80 }}>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: 52 }}>
              <div style={{ fontSize: 11, color: '#1E88E5', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>Growth Packages</div>
              <h2 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 800, margin: '0 0 14px', letterSpacing: '-0.01em', color: '#1A2B4A' }}>
                Choose your <span className="med-gtext">growth plan</span>
              </h2>
              <p style={{ fontSize: 15, color: '#7A94B8', maxWidth: 460, margin: '0 auto' }}>Every package is built around one goal: getting your clinic more confirmed appointments. No hidden costs. No vague promises.</p>
            </motion.div>
            <div className="med-plans-grid">
              {PLANS.map((plan, i) => <PlanCard key={plan.id} plan={plan} index={i} onPay={setSelectedPlan} />)}
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: '60px auto 20px' }}>
            <hr className="med-divider" />
          </div>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <p style={{ fontSize: 14, color: '#7A94B8' }}>Or build your own — pick only what you need</p>
          </div>

          {/* ── CUSTOM PLAN BUILDER ──────────────────────────────────────────── */}
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
                background: 'rgba(30,136,229,0.08)', border: '1.5px solid rgba(30,136,229,0.2)',
                padding: '7px 20px', borderRadius: 60, marginBottom: 20,
              }}>
                <Sliders size={13} color="#1E88E5" />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#1E88E5', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Build Your Own Package
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 800, margin: '0 0 14px', letterSpacing: '-0.01em', color: '#1A2B4A' }}>
                Pick exactly what you need.{' '}
                <span className="med-gtext">Pay only for that.</span>
              </h2>
              <p style={{ fontSize: 15, color: '#7A94B8', maxWidth: 540, margin: '0 auto' }}>
                Not ready for a full package? Select individual services — Local SEO, Google Ads, website, booking system, reputation management — and we'll handle exactly what you pick.
              </p>
            </motion.div>
            <CustomPlanBuilder onPay={setSelectedPlan} />
          </div>

          {/* ── 9 BENEFITS (moved below custom plans) ────────────────────────── */}
          <div style={{ background: '#F0F8FF', padding: '64px 0', marginTop: 80, marginBottom: 0 }}>
            <div className="med-wide-wrap" style={{ marginBottom: 0 }}>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}>
                <div style={{ fontSize: 11, color: '#26A69A', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>Why It Works</div>
                <h2 style={{ fontSize: 'clamp(24px, 4.5vw, 40px)', fontWeight: 800, margin: '0 0 12px', color: '#1A2B4A' }}>
                  9 Reasons Clinics Invest in <span className="med-gtext">Digital Marketing</span>
                </h2>
              </motion.div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                {BENEFITS.map((b, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="med-benefit-card">
                    <div style={{ fontSize: 32, fontWeight: 900, color: '#1E88E5', opacity: 0.12, fontFamily: 'Fraunces, serif', marginBottom: 12 }}>{b.num}</div>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1A2B4A', marginBottom: 8, fontFamily: 'Fraunces, serif' }}>{b.title}</h4>
                    <p style={{ fontSize: 13, color: '#7A94B8', lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
          <div style={{ maxWidth: 800, margin: '80px auto 0', padding: '0 20px' }}>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ fontSize: 11, color: '#26A69A', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>In Their Words</div>
              <h2 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800, margin: 0, color: '#1A2B4A', fontFamily: 'Fraunces, serif' }}>Doctors who made the shift</h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {[
                { quote: 'Within 8 weeks we went from 12 walk-ins a week to 35+ confirmed appointments. Our Google rating went from 3.8 to 4.7 stars.', name: 'Dr. Ravi M.', role: 'Orthopaedic Surgeon, Pune', color: '#1E88E5', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&q=80&auto=format&fit=crop&crop=face' },
                { quote: 'I used to depend entirely on hospital referrals. Now 60% of my new patients find me on Google. The ROI has been phenomenal.', name: 'Dr. Sunita K.', role: 'Dermatologist, Delhi', color: '#26A69A', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=80&q=80&auto=format&fit=crop&crop=face' },
                { quote: 'The automated booking and WhatsApp reminders alone reduced no-shows by 40%. That\'s real revenue I was losing every month.', name: 'Dr. Prashant J.', role: 'Dentist, Bengaluru', color: '#1E88E5', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=80&q=80&auto=format&fit=crop&crop=face' },
              ].map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{ background: '#fff', border: `1.5px solid ${t.color}22`, borderRadius: 20, padding: '24px 20px', boxShadow: '0 2px 12px rgba(30,136,229,0.06)' }}>
                  <div style={{ fontSize: 24, color: t.color, marginBottom: 12, opacity: 0.5 }}>"</div>
                  <p style={{ fontSize: 14, color: '#4A6FA5', lineHeight: 1.7, margin: '0 0 16px' }}>{t.quote}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={t.img} alt={t.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${t.color}33` }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#1A2B4A' }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: '#7A94B8', marginTop: 2 }}>{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ maxWidth: 900, margin: '72px auto 0', padding: '0 20px' }}>
            <div className="med-final-cta-box">
              <div style={{ fontSize: 36, marginBottom: 8 }}>📅</div>
              <h3 style={{ fontSize: 'clamp(22px, 5vw, 40px)', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.01em', fontFamily: 'Fraunces, serif', color: '#fff' }}>
                Ready to fill your appointment calendar?
              </h3>
              <p style={{ fontSize: 'clamp(14px, 3vw, 15px)', color: 'rgba(255,255,255,0.75)', maxWidth: 460, margin: '0 auto 36px', lineHeight: 1.75 }}>
                We take on a limited number of clinics each month to give every client the attention they deserve. Book a free 30-minute strategy call — we'll map out exactly what your practice needs to grow.
              </p>
              <div className="med-cta-btn-row">
                <a
                  href="https://wa.me/919752523894?text=Hi%20ToFly!%20I%27m%20a%20doctor%20and%20I%27d%20like%20a%20free%20strategy%20call"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    padding: '15px 36px', borderRadius: 12,
                    background: '#fff', color: '#1565C0',
                    fontWeight: 700, textDecoration: 'none',
                    fontSize: 15, boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    transition: 'all 0.2s', whiteSpace: 'nowrap',
                  }}
                >
                  Book My Free Strategy Call <Rocket size={16} />
                </a>
                <a
                  href="https://wa.me/919752523894"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '15px 28px', borderRadius: 12,
                    background: 'transparent', border: '1.5px solid rgba(255,255,255,0.5)',
                    color: '#fff', fontWeight: 600, textDecoration: 'none',
                    fontSize: 15, transition: 'all 0.2s', whiteSpace: 'nowrap',
                  }}
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

      {selectedPlan && <PaymentModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}

      <motion.a
        href="https://wa.me/919752523894?text=Hi%20ToFly!%20I%27m%20interested%20in%20growing%20my%20medical%20practice"
        target="_blank" rel="noopener noreferrer"
        className="med-whatsapp-fab"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      >
        <MessageCircle size={17} /> Chat on WhatsApp
      </motion.a>
    </>
  )
}