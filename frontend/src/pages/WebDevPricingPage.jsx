import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Check, ChevronDown, MessageCircle, Rocket,
  X as XIcon, ClipboardList, Shield, ArrowRight, ExternalLink
} from 'lucide-react'

// ─── THEME: Distressed black + yellow ────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap');

  .wd-root, .wd-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .wd-root {
    font-family: 'Barlow', sans-serif;
    background: #0d0d0d;
    color: #fff;
    min-height: 100vh;
    overflow-x: clip;
  }

  .wd-root::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    opacity: 0.045;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
    background-size: 256px;
  }

  .wd-content { position: relative; z-index: 2; }

  .yd { color: #FFD600; }
  .wd-yellow { color: #FFD600; }

  .wd-headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    text-transform: uppercase;
    line-height: 0.9;
    letter-spacing: -0.01em;
  }

  .wd-highlight-block {
    display: inline-block;
    background: #FFD600;
    color: #0d0d0d;
    padding: 2px 12px 4px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    text-transform: uppercase;
  }

  .wd-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #FFD600;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .wd-label::before {
    content: '';
    display: block;
    width: 3px;
    height: 16px;
    background: #FFD600;
    flex-shrink: 0;
  }

  .wd-rule {
    border: none;
    border-top: 1px solid rgba(255,214,0,0.25);
    margin: 0;
  }

  .wd-card {
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.025);
    transition: border-color 0.25s, background 0.25s;
  }
  .wd-card:hover {
    border-color: rgba(255,214,0,0.35);
    background: rgba(255,214,0,0.04);
  }

  .wd-cat-block {
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.02);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 6px;
    transition: border-color 0.2s;
  }
  .wd-cat-block:hover { border-color: rgba(255,214,0,0.2); }
  .wd-cat-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 15px 18px; cursor: pointer;
    background: none; border: none; width: 100%; text-align: left;
    font-family: 'Barlow', sans-serif;
    transition: background 0.15s;
    -webkit-tap-highlight-color: transparent;
  }
  .wd-cat-header:hover { background: rgba(255,255,255,0.03); }
  .wd-svc-row {
    display: flex; align-items: center; gap: 14px;
    padding: 13px 18px; cursor: pointer;
    border-top: 1px solid rgba(255,255,255,0.05);
    transition: background 0.15s;
    -webkit-tap-highlight-color: transparent;
  }
  .wd-svc-row:hover { background: rgba(255,214,0,0.04); }
  .wd-svc-row.sel { background: rgba(255,214,0,0.07); }
  .wd-checkbox {
    width: 19px; height: 19px; border-radius: 3px; flex-shrink: 0;
    border: 1.5px solid rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s;
  }
  .wd-checkbox.checked { background: #FFD600; border-color: #FFD600; }

  .wd-summary {
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.025);
    border-radius: 4px;
    overflow: hidden;
    position: sticky;
    top: 20px;
  }
  .wd-summary-hd {
    background: rgba(255,214,0,0.1);
    border-bottom: 1px solid rgba(255,214,0,0.2);
    padding: 16px 20px;
  }
  .wd-summary-list {
    padding: 8px 20px;
    max-height: 260px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,214,0,0.3) transparent;
  }
  .wd-summary-item {
    display: flex; justify-content: space-between; align-items: flex-start;
    padding: 9px 0; gap: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .wd-summary-item:last-child { border-bottom: none; }

  .wd-wa-btn {
    width: 100%; padding: 14px; border-radius: 3px; border: none;
    background: linear-gradient(135deg, #25D366, #128C7E);
    color: #fff; font-size: 14px; font-weight: 700; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    font-family: 'Barlow', sans-serif;
    transition: opacity 0.15s, transform 0.1s;
    text-decoration: none; white-space: nowrap;
    box-shadow: 0 4px 20px rgba(37,211,102,0.2);
  }
  .wd-wa-btn:hover { opacity: 0.9; transform: scale(1.01); }
  .wd-wa-btn.disabled { opacity: 0.3; pointer-events: none; box-shadow: none; }
  @keyframes wd-pulse { 0%,100%{box-shadow:0 4px 20px rgba(37,211,102,0.2)} 50%{box-shadow:0 4px 28px rgba(37,211,102,0.45)} }
  .wd-wa-btn:not(.disabled) { animation: wd-pulse 2.5s ease-in-out infinite; }

  .wd-rm-btn {
    background: none; border: none; cursor: pointer; padding: 2px 4px;
    color: rgba(255,255,255,0.2); line-height: 0; flex-shrink: 0;
    transition: color 0.15s;
  }
  .wd-rm-btn:hover { color: #ff4444; }

  .wd-builder-grid {
    display: grid;
    grid-template-columns: 1fr 310px;
    gap: 20px;
    align-items: start;
  }
  @media (max-width: 820px) {
    .wd-builder-grid { grid-template-columns: 1fr; }
    .wd-summary { position: static; order: -1; }
  }

  @keyframes wd-tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .wd-ticker-track { display:flex; animation:wd-tick 30s linear infinite; width:max-content; }
  .wd-ticker-wrap {
    overflow: hidden; position: relative;
    border-top: 1px solid rgba(255,214,0,0.15);
    border-bottom: 1px solid rgba(255,214,0,0.15);
  }
  .wd-ticker-wrap::before,.wd-ticker-wrap::after {
    content:''; position:absolute; top:0; bottom:0; width:60px; z-index:2;
  }
  .wd-ticker-wrap::before { left:0; background:linear-gradient(to right,#0d0d0d,transparent); }
  .wd-ticker-wrap::after  { right:0; background:linear-gradient(to left,#0d0d0d,transparent); }

  .wd-stat-num {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    line-height: 1;
  }

  .wd-fab {
    position: fixed; bottom: 22px; right: 22px; z-index: 100;
    display: flex; align-items: center; gap: 9px;
    padding: 12px 22px; border-radius: 60px;
    background: linear-gradient(135deg, #25D366, #128C7E);
    color: #fff; font-weight: 700; font-size: 13px;
    font-family: 'Barlow', sans-serif;
    text-decoration: none;
    box-shadow: 0 4px 20px rgba(37,211,102,0.35);
    border: 1px solid rgba(255,255,255,0.15);
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .wd-fab:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(37,211,102,0.5); }

  .wd-btn-primary {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 14px 32px;
    background: #FFD600; color: #0d0d0d;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; font-size: 16px;
    text-transform: uppercase; letter-spacing: 0.04em;
    text-decoration: none; border: none; cursor: pointer;
    transition: background 0.15s, transform 0.15s;
  }
  .wd-btn-primary:hover { background: #ffe033; transform: translateY(-2px); }

  .wd-btn-ghost {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 13px 28px;
    background: transparent;
    border: 1.5px solid rgba(255,255,255,0.25);
    color: #fff;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700; font-size: 16px;
    text-transform: uppercase; letter-spacing: 0.04em;
    text-decoration: none; cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }
  .wd-btn-ghost:hover { border-color: #FFD600; color: #FFD600; }

  .wd-wrap { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
  .wd-wrap-wide { max-width: 1320px; margin: 0 auto; padding: 0 24px; }

  /* ── CLIENT LOGOS GRID ── */
  .wd-logos {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1px;
    background: rgba(255,255,255,0.07);
  }
  .wd-logo-cell {
    background: #0d0d0d;
    padding: 20px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80px;
    transition: background 0.2s;
  }
  .wd-logo-cell:hover { background: rgba(255,214,0,0.06); }
  .wd-logo-cell img {
    width: auto;
    height: 32px;
    max-width: 110px;
    object-fit: contain;
    filter: none;
    opacity: 0.75;
    transition: opacity 0.2s;
    display: block;
  }
  .wd-logo-cell:hover img { opacity: 1; }
  .wd-logo-cell img.color-logo { filter: none; opacity: 0.75; }
  .wd-logo-cell:hover img.color-logo { opacity: 1; }

  /* ── ADVANTAGE CARDS ── */
  .wd-adv-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }
  .wd-adv-card {
    padding: 28px 24px;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 3px;
    transition: border-color 0.25s, transform 0.2s;
  }
  .wd-adv-card:hover {
    border-color: rgba(255,214,0,0.35);
    transform: translateY(-3px);
  }

  /* ── PLATFORM RACK ── */
  .wd-platform-rack {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.06);
  }
  .wd-platform-tile {
    background: #0d0d0d;
    padding: 28px 16px 22px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    cursor: default;
    transition: background 0.2s;
    position: relative;
    overflow: hidden;
  }
  .wd-platform-tile::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: #FFD600;
    transform: scaleX(0);
    transition: transform 0.25s;
    transform-origin: left;
  }
  .wd-platform-tile:hover { background: rgba(255,214,0,0.045); }
  .wd-platform-tile:hover::after { transform: scaleX(1); }
  .wd-platform-tile img {
    width: 40px; height: 40px;
    object-fit: contain;
    filter: grayscale(1) brightness(0.7);
    transition: filter 0.25s;
  }
  .wd-platform-tile:hover img { filter: grayscale(0) brightness(1); }
  .wd-platform-tile-emoji {
    font-size: 28px;
    line-height: 1;
    display: none;
  }
  .wd-platform-tile-name {
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.08em;
    color: rgba(255,255,255,0.35);
    text-align: center;
    transition: color 0.2s;
  }
  .wd-platform-tile:hover .wd-platform-tile-name { color: #FFD600; }

  /* ── PORTFOLIO CINEMATIC ── */
  .wd-port-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    margin-bottom: 48px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    padding-bottom: 0;
  }
  .wd-port-tab {
    padding: 10px 20px;
    font-size: 11px; font-weight: 800;
    text-transform: uppercase; letter-spacing: 0.1em;
    background: none;
    border: none;
    color: rgba(255,255,255,0.28);
    cursor: pointer;
    font-family: 'Barlow', sans-serif;
    position: relative;
    transition: color 0.2s;
    white-space: nowrap;
    margin-bottom: -1px;
  }
  .wd-port-tab::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: #FFD600;
    transform: scaleX(0);
    transition: transform 0.22s cubic-bezier(0.4,0,0.2,1);
    transform-origin: left;
  }
  .wd-port-tab:hover { color: rgba(255,255,255,0.55); }
  .wd-port-tab.active { color: #FFD600; }
  .wd-port-tab.active::after { transform: scaleX(1); }

  .wd-port-spotlight {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 2px;
    background: rgba(255,255,255,0.04);
    min-height: 400px;
  }
  @media (max-width: 820px) {
    .wd-port-spotlight { grid-template-columns: 1fr; }
    .wd-port-list { display: none; }
  }

  .wd-port-featured {
    position: relative;
    overflow: hidden;
    background: #111;
    cursor: pointer;
    display: block;
    text-decoration: none;
  }
  .wd-port-featured-bg {
    width: 100%; height: 100%;
    min-height: 380px;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .wd-port-featured:hover .wd-port-featured-bg { transform: scale(1.04); }
  .wd-port-featured-placeholder {
    width: 100%;
    min-height: 380px;
    background: linear-gradient(135deg, rgba(255,214,0,0.04) 0%, rgba(255,255,255,0.01) 100%);
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .wd-port-featured:hover .wd-port-featured-placeholder { transform: scale(1.04); }
  .wd-port-feat-ph-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-size: clamp(28px, 5vw, 52px);
    text-transform: uppercase; color: rgba(255,255,255,0.04);
    letter-spacing: -0.01em; text-align: center; padding: 0 32px;
  }
  .wd-port-featured-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(13,13,13,0.96) 0%, rgba(13,13,13,0.4) 45%, transparent 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 32px 36px;
    pointer-events: none;
  }
  .wd-port-featured-overlay > * { pointer-events: auto; }
  .wd-port-feat-num {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-size: 96px;
    color: rgba(255,214,0,0.1); line-height: 1;
    margin-bottom: -16px;
    user-select: none;
  }
  .wd-port-feat-ind {
    font-size: 10px; font-weight: 800;
    text-transform: uppercase; letter-spacing: 0.18em;
    color: #FFD600; margin-bottom: 8px;
    opacity: 0.8;
  }
  .wd-port-feat-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(24px, 3.5vw, 40px);
    color: #fff;
    text-transform: uppercase;
    letter-spacing: -0.01em;
    margin-bottom: 16px;
    line-height: 1;
  }
  .wd-port-feat-link {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 20px;
    background: #FFD600;
    color: #0d0d0d;
    font-size: 11px; font-weight: 800;
    text-transform: uppercase; letter-spacing: 0.1em;
    text-decoration: none;
    transition: background 0.15s, transform 0.15s;
    width: fit-content;
  }
  .wd-port-feat-link:hover { background: #ffe033; transform: translateY(-1px); }

  .wd-port-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .wd-port-list-item {
    flex: 1;
    position: relative;
    overflow: hidden;
    background: #0d0d0d;
    cursor: pointer;
    display: flex;
    align-items: stretch;
    text-decoration: none;
    transition: background 0.2s;
    min-height: 0;
  }
  .wd-port-list-item:hover { background: rgba(255,214,0,0.04); }
  .wd-port-list-thumb {
    width: 84px;
    flex-shrink: 0;
    object-fit: cover;
    filter: grayscale(0.7) brightness(0.75);
    transition: filter 0.3s;
    display: block;
  }
  .wd-port-list-placeholder {
    width: 84px;
    flex-shrink: 0;
    background: rgba(255,255,255,0.02);
    display: flex; align-items: center; justify-content: center;
  }
  .wd-port-list-item:hover .wd-port-list-thumb { filter: grayscale(0) brightness(0.9); }
  .wd-port-list-body {
    padding: 10px 12px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3px;
  }
  .wd-port-list-num {
    font-size: 9px; font-weight: 800;
    color: rgba(255,214,0,0.4);
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
  .wd-port-list-name {
    font-size: 12px; font-weight: 700;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    line-height: 1.3;
    transition: color 0.2s;
  }
  .wd-port-list-item:hover .wd-port-list-name { color: rgba(255,255,255,0.85); }
  .wd-port-list-arrow {
    display: flex; align-items: center;
    padding: 0 14px;
    color: rgba(255,255,255,0.1);
    font-size: 14px;
    transition: color 0.2s, transform 0.2s;
    flex-shrink: 0;
  }
  .wd-port-list-item:hover .wd-port-list-arrow { color: #FFD600; transform: translateX(3px); }
`

// ─── SERVICE CATALOG ─────────────────────────────────────────────────────────
const CATALOG = [
  {
    category: 'Website Design & Development',
    icon: '🌐',
    color: '#FFD600',
    services: [
      { id: 'w1', name: 'Landing Page (1 Page)',         desc: 'High-converting single-page site — CTA-optimised, mobile-first, fast' },
      { id: 'w2', name: 'Business Website (5 Pages)',    desc: 'Home, About, Services, Portfolio, Contact — responsive & SEO-ready' },
      { id: 'w3', name: 'Custom Multi-Page Website',     desc: '8–15 pages — custom animations, CMS, admin panel, scalable architecture' },
      { id: 'w4', name: 'Website Redesign',              desc: 'Modernise your site — new UI, better UX, faster Core Web Vitals' },
    ],
  },
  {
    category: 'E-Commerce Development',
    icon: '🛒',
    color: '#FF9500',
    services: [
      { id: 'e1', name: 'Shopify Store Setup',           desc: 'Complete Shopify store — theme, products, payment gateway, shipping' },
      { id: 'e2', name: 'WooCommerce Store',             desc: 'WordPress store — custom features, inventory & order management' },
      { id: 'e3', name: 'Custom E-Commerce Platform',    desc: 'Fully bespoke store built from scratch — your rules, your features' },
    ],
  },
  {
    category: 'SEO & Performance Optimisation',
    icon: '🔍',
    color: '#00C6FF',
    services: [
      { id: 's1', name: 'Technical SEO Audit & Fix',         desc: 'Full audit — schema markup, sitemap, robots.txt, on-page fixes' },
      { id: 's2', name: 'Speed & Core Web Vitals',           desc: '90+ PageSpeed scores — image compression, lazy loading, CDN setup' },
      { id: 's3', name: 'Local SEO & Google Business Setup', desc: 'GMB optimisation, local citations, NAP consistency, map pack ranking' },
    ],
  },
  {
    category: 'Web Apps & Booking Systems',
    icon: '⚙️',
    color: '#FF6B6B',
    services: [
      { id: 'a1', name: 'Appointment / Booking System',  desc: 'Time-slot management, SMS/email reminders, online payment' },
      { id: 'a2', name: 'Client / Member Portal',        desc: 'Secure login portal — dashboards, billing, document access' },
      { id: 'a3', name: 'Admin Dashboard & Analytics',   desc: 'Custom reporting — real-time data, CSV exports, user management' },
    ],
  },
  {
    category: 'Maintenance & Support',
    icon: '🛡️',
    color: '#00D4A0',
    services: [
      { id: 'm1', name: 'Monthly Website Maintenance',       desc: 'Security patches, updates, uptime monitoring, priority support' },
      { id: 'm2', name: 'Managed Hosting Setup',             desc: 'SSL, CDN, daily backups, server optimisation — fully managed' },
      { id: 'm3', name: 'UX Audit & Conversion Optimisation',desc: 'Heatmaps, user flow, A/B testing, conversion rate improvements' },
    ],
  },
]

// ─── CLIENTS ─────────────────────────────────────────────────────────────────
const CLIENTS = [
  { name: 'TAJ',                      logo: '/logos/taj.png',                       colorLogo: false },
  { name: 'Radisson',                  logo: '/logos/radisson.png',                  colorLogo: false },
  { name: 'Zomato',                    logo: '/logos/zomato.png',                    colorLogo: false },
  { name: 'SBI',                       logo: '/logos/sbi.png',                       colorLogo: false },
  { name: 'Swiggy',                    logo: '/logos/swiggy.png',                    colorLogo: false },
  { name: 'Archies',                   logo: '/logos/archies.jpg',                   colorLogo: false },
  { name: 'Blinkit',                   logo: '/logos/blinkit.png',                   colorLogo: true  },
  { name: 'Apollo Pharmacy',           logo: '/logos/apollo.png',                    colorLogo: false },
  { name: 'Romeo Lane',                logo: '/logos/romeo-lane.png',                colorLogo: false },
  { name: 'Armonia Home',              logo: '/logos/armonia-home.png',              colorLogo: false },
  { name: 'AceOtel',                   logo: '/logos/aceotel.png',                   colorLogo: false },
  { name: 'RNTU',                      logo: '/logos/rntu.png',                      colorLogo: true  },
  { name: 'OFY Clinics',               logo: '/logos/ofy-clinics.png',               colorLogo: false },
  { name: 'Little Ninja Gym',          logo: '/logos/little-ninja-gym.png',          colorLogo: false },
  { name: 'Origins',                   logo: '/logos/origins.png',                   colorLogo: false },
  { name: 'Ivoryy',                    logo: '/logos/ivoryy.png',                    colorLogo: false },
  { name: 'The Chamda',                logo: '/logos/the-chamda.png',                colorLogo: false },
  { name: 'Safal Retreat',             logo: '/logos/safal-retreat.png',             colorLogo: false },
  { name: 'Bhopali Zayka',             logo: '/logos/bhopali-zayka.png',             colorLogo: false },
  { name: 'Natural Cosmetic Surgery',  logo: '/logos/natural-cosmetic-surgery.png',  colorLogo: false },
  { name: 'Drools',                    logo: '/logos/drools.png',                    colorLogo: true  },
  { name: 'Pandit Ji',                 logo: '/logos/pandit-ji.png',                 colorLogo: false },
  { name: 'Anytime Astro',             logo: '/logos/anytime-astro.png',             colorLogo: true  },
  { name: 'Rashi Jain',                logo: '/logos/rashi-jain.png',                colorLogo: false },
  { name: 'Puris',                     logo: '/logos/puris.png',                     colorLogo: false },
  { name: 'Sabdhani Coaching',         logo: '/logos/sabdhani-coaching.png',         colorLogo: false },
  { name: 'Hotel Awadh Palace',        logo: '/logos/hotel-awadh-palace.png',        colorLogo: false },
  { name: 'MP Tourism',                logo: '/logos/mp-tourism.png',                colorLogo: true  },
]

// ─── PLATFORMS ───────────────────────────────────────────────────────────────
const PLATFORMS = [
  { name: 'Shopify',         icon: '🛍️', logo: '/platform-logos/shopify.png'    },
  { name: 'WordPress',       icon: '🔷', logo: '/platform-logos/wordpress.png'  },
  { name: 'Webflow',         icon: '🌊', logo: '/platform-logos/webflow.png'    },
  { name: 'Wix',             icon: '✦',  logo: '/platform-logos/wix.png'        },
  { name: 'React',           icon: '⚛️', logo: '/platform-logos/react.png'      },
  { name: 'Laravel',         icon: '🔺', logo: '/platform-logos/laravel.png'    },
  { name: 'PHP',             icon: '🐘', logo: '/platform-logos/php.png'        },
  { name: 'HTML / CSS / JS', icon: '</>', logo: '/platform-logos/html.png'       },
]

const PLATFORM_EXTRAS = ['WooCommerce', 'Custom CMS', 'CRM', 'SaaS', 'API Integration']

// ─── INDUSTRIES WITH PORTFOLIO ────────────────────────────────────────────────
const INDUSTRIES = [
  {
    id: 'corporate',
    label: 'Corporate & Business',
    projects: [
      { name: 'Global Gas',         url: 'https://youtube.com', thumb: '/portfolio/globalgas.jpg'    },
      { name: 'Mercurius',          url: 'https://youtube.com', thumb: '/portfolio/mercurius.jpg'    },
      { name: 'ToneOpEats',         url: 'https://youtube.com', thumb: '/portfolio/toneopeats.jpg'   },
      { name: 'Digital Agency',     url: 'https://youtube.com', thumb: '/portfolio/digital.jpg'      },
      { name: 'Powering Success',   url: 'https://youtube.com', thumb: '/portfolio/success.jpg'      },
    ],
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce Stores',
    projects: [
      { name: 'Fashion Store',      url: 'https://youtube.com', thumb: '/portfolio/fashion.jpg'      },
      { name: 'Origins Hyderabad',  url: 'https://youtube.com', thumb: '/portfolio/origins.jpg'      },
      { name: 'KWC Watches',        url: 'https://youtube.com', thumb: '/portfolio/kwc.jpg'          },
      { name: 'Leej Treasures',     url: 'https://youtube.com', thumb: '/portfolio/leej.jpg'         },
      { name: 'Clothing Brand',     url: 'https://youtube.com', thumb: '/portfolio/clothing.jpg'     },
    ],
  },
  {
    id: 'hospitals',
    label: 'Hospitals & Clinics',
    projects: [
      { name: 'Seawoods Support',   url: 'https://youtube.com', thumb: '/portfolio/seawoods.jpg'     },
      { name: 'Krishna Cancer',     url: 'https://youtube.com', thumb: '/portfolio/krishna.jpg'      },
      { name: 'Bansai Hospital',    url: 'https://youtube.com', thumb: '/portfolio/bansai.jpg'       },
      { name: 'Spine Clinic',       url: 'https://youtube.com', thumb: '/portfolio/spine.jpg'        },
      { name: 'Natural Cosmetic',   url: 'https://youtube.com', thumb: '/portfolio/natural.jpg'      },
    ],
  },
  {
    id: 'astrology',
    label: 'Astrologer & Tarot',
    projects: [
      { name: 'InstaAstro',         url: 'https://youtube.com', thumb: '/portfolio/instaastro.jpg'   },
      { name: 'Astrology Reveals',  url: 'https://youtube.com', thumb: '/portfolio/astroreveals.jpg' },
      { name: 'Anytime Astro',      url: 'https://youtube.com', thumb: '/portfolio/anytimeastro.jpg' },
      { name: 'Premium Astrologers',url: 'https://youtube.com', thumb: '/portfolio/premium-astro.jpg'},
      { name: 'Dr. Sohini Sastri',  url: 'https://youtube.com', thumb: '/portfolio/sohini.jpg'       },
    ],
  },
  {
    id: 'education',
    label: 'Education & Coaching',
    projects: [
      { name: 'Online Coaching',    url: 'https://youtube.com', thumb: '/portfolio/coaching.jpg'     },
      { name: 'Vision IAS',         url: 'https://youtube.com', thumb: '/portfolio/vision.jpg'       },
      { name: 'TIT Technocrats',    url: 'https://youtube.com', thumb: '/portfolio/tit.jpg'          },
      { name: 'CAT Course',         url: 'https://youtube.com', thumb: '/portfolio/cat.jpg'          },
      { name: 'TimesCAT',           url: 'https://youtube.com', thumb: '/portfolio/timescat.jpg'     },
    ],
  },
  {
    id: 'realestate',
    label: 'Real Estate',
    projects: [
      { name: 'Amaltas India',      url: 'https://youtube.com', thumb: '/portfolio/amaltas.jpg'      },
      { name: 'Estatex Landbase',   url: 'https://youtube.com', thumb: '/portfolio/estatex.jpg'      },
      { name: 'Dream Home Portal',  url: 'https://youtube.com', thumb: '/portfolio/dreamhome.jpg'    },
      { name: 'Buck Premium',       url: 'https://youtube.com', thumb: '/portfolio/buck.jpg'         },
      { name: 'Secure Living',      url: 'https://youtube.com', thumb: '/portfolio/secureliving.jpg' },
    ],
  },
  {
    id: 'restaurant',
    label: 'Restaurant & Food',
    projects: [
      { name: 'Openhouse',          url: 'https://youtube.com', thumb: '/portfolio/openhouse.jpg'    },
      { name: 'Ratnagiri',          url: 'https://youtube.com', thumb: '/portfolio/ratnagiri.jpg'    },
      { name: 'Coffee & Country',   url: 'https://youtube.com', thumb: '/portfolio/coffeecountry.jpg'},
      { name: 'Bhopali Restaurants',url: 'https://youtube.com', thumb: '/portfolio/bhopali.jpg'      },
      { name: 'Chocolate Brand',    url: 'https://youtube.com', thumb: '/portfolio/choco.jpg'        },
    ],
  },
  {
    id: 'hotel',
    label: 'Hotels & Resorts',
    projects: [
      { name: 'Summer Wine Kasauli',url: 'https://youtube.com', thumb: '/portfolio/summerwine.jpg'   },
      { name: 'Premium Stay Hotel', url: 'https://youtube.com', thumb: '/portfolio/premiumstay.jpg'  },
      { name: 'Graces Resort MP',   url: 'https://youtube.com', thumb: '/portfolio/graces.jpg'       },
      { name: 'Jaipur Heritage',    url: 'https://youtube.com', thumb: '/portfolio/jaipur.jpg'       },
      { name: 'Discover Retreat',   url: 'https://youtube.com', thumb: '/portfolio/discover.jpg'     },
    ],
  },
  {
    id: 'travel',
    label: 'Tour & Travel',
    projects: [
      { name: 'Top Goa Tours',      url: 'https://youtube.com', thumb: '/portfolio/goatours.jpg'     },
      { name: 'From Where You Start',url:'https://youtube.com', thumb: '/portfolio/fromwhere.jpg'    },
      { name: 'City Guide Portal',  url: 'https://youtube.com', thumb: '/portfolio/cityguide.jpg'    },
      { name: 'Sterling Vacations', url: 'https://youtube.com', thumb: '/portfolio/sterling.jpg'     },
      { name: 'Udaipur Traveling',  url: 'https://youtube.com', thumb: '/portfolio/udaipur.jpg'      },
    ],
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing & Industrial',
    projects: [
      { name: 'APA Construction',   url: 'https://youtube.com', thumb: '/portfolio/apa.jpg'          },
      { name: 'Organic Spices',     url: 'https://youtube.com', thumb: '/portfolio/spices.jpg'       },
      { name: 'Million Cases',      url: 'https://youtube.com', thumb: '/portfolio/millioncases.jpg' },
      { name: 'Adityaa Food',       url: 'https://youtube.com', thumb: '/portfolio/adityaa.jpg'      },
      { name: 'Packaging Co',       url: 'https://youtube.com', thumb: '/portfolio/packaging.jpg'    },
    ],
  },
]

// ─── TICKER ───────────────────────────────────────────────────────────────────
const TICKER = [
  'Website Design & Development',
  'E-Commerce Stores (Shopify / WooCommerce)',
  'Custom Web Apps & Portals',
  'Booking & Appointment Systems',
  'SEO & Performance Optimisation',
  'React / Laravel / PHP Development',
  'UI/UX Design & Prototyping',
  'Maintenance & Managed Hosting',
]

// ─── PLAN BUILDER ─────────────────────────────────────────────────────────────
function Builder() {
  const [selected, setSelected] = useState({})
  const [openCats, setOpenCats] = useState(
    () => Object.fromEntries(CATALOG.map(g => [g.category, false]))
  )

  const toggle = (svc) =>
    setSelected(prev => {
      const n = { ...prev }
      if (n[svc.id]) delete n[svc.id]; else n[svc.id] = svc
      return n
    })

  const remove = (id) =>
    setSelected(prev => { const n = { ...prev }; delete n[id]; return n })

  const toggleCat = (cat) =>
    setOpenCats(prev => ({ ...prev, [cat]: !prev[cat] }))

  const list = Object.values(selected)

  const waLink = () => {
    if (!list.length) return '#'
    const lines = list.map(s => {
      const g = CATALOG.find(c => c.services.some(x => x.id === s.id))
      return `• ${s.name} (${g?.category || ''})`
    }).join('\n')
    return `https://wa.me/919752523894?text=${encodeURIComponent(`Hi ToFly! 👋 Interested in these website development services:\n\n${lines}\n\nPlease share pricing & timeline. I'd love a free consultation!`)}`
  }

  return (
    <div className="wd-builder-grid">
      {/* LEFT */}
      <div>
        {CATALOG.map(grp => {
          const open = openCats[grp.category]
          const selCount = grp.services.filter(s => selected[s.id]).length
          return (
            <div key={grp.category} className="wd-cat-block">
              <button className="wd-cat-header" onClick={() => toggleCat(grp.category)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 3, flexShrink: 0,
                    background: `${grp.color}15`, border: `1px solid ${grp.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                  }}>{grp.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{grp.category}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>
                      {grp.services.length} services
                      {selCount > 0 && <span style={{ marginLeft: 8, color: grp.color, fontWeight: 700 }}>· {selCount} selected</span>}
                    </div>
                  </div>
                </div>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={15} color="rgba(255,255,255,0.3)" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                    transition={{ duration: 0.22 }} style={{ overflow: 'hidden' }}
                  >
                    {grp.services.map(svc => {
                      const checked = !!selected[svc.id]
                      return (
                        <div key={svc.id} className={`wd-svc-row${checked ? ' sel' : ''}`} onClick={() => toggle(svc)}>
                          <div className={`wd-checkbox${checked ? ' checked' : ''}`}>
                            {checked && <Check size={11} color="#0d0d0d" strokeWidth={3} />}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: checked ? '#fff' : 'rgba(255,255,255,0.65)', lineHeight: 1.3 }}>{svc.name}</div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', marginTop: 3, lineHeight: 1.5 }}>{svc.desc}</div>
                          </div>
                          {checked && (
                            <div style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, background: `${grp.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Check size={10} color={grp.color} strokeWidth={3} />
                            </div>
                          )}
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

      {/* RIGHT — Summary */}
      <div>
        <div className="wd-summary">
          <div className="wd-summary-hd">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <ClipboardList size={13} color="#FFD600" />
              <span style={{ fontSize: 11, fontWeight: 800, color: '#FFD600', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                Your Build List
              </span>
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
              {list.length === 0 ? 'Nothing selected yet' : `${list.length} service${list.length > 1 ? 's' : ''} selected`}
            </div>
          </div>

          {list.length === 0 && (
            <div style={{ padding: '30px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>🌐</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
                Pick any services — we'll WhatsApp you a custom quote fast.
              </div>
            </div>
          )}

          {list.length > 0 && (
            <div className="wd-summary-list">
              <AnimatePresence>
                {list.map(s => {
                  const g = CATALOG.find(c => c.services.some(x => x.id === s.id))
                  return (
                    <motion.div key={s.id} className="wd-summary-item"
                      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.15 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 10, color: g?.color || '#FFD600', fontWeight: 700, marginBottom: 2 }}>{g?.icon} {g?.category}</div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>{s.name}</div>
                      </div>
                      <button className="wd-rm-btn" onClick={(e) => { e.stopPropagation(); remove(s.id) }}>
                        <XIcon size={12} />
                      </button>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}

          <div style={{ padding: '14px 20px 18px', borderTop: list.length > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
            {list.length > 0 && (
              <div style={{
                background: 'rgba(255,214,0,0.07)', border: '1px solid rgba(255,214,0,0.18)',
                borderRadius: 3, padding: '10px 13px', marginBottom: 12,
                display: 'flex', gap: 9, alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>⚡</span>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                  Personalised quote sent on WhatsApp — usually within the hour.
                </div>
              </div>
            )}
            <a href={list.length > 0 ? waLink() : undefined} target="_blank" rel="noopener noreferrer"
              className={`wd-wa-btn${list.length === 0 ? ' disabled' : ''}`}>
              <MessageCircle size={15} />
              {list.length === 0 ? 'Select services to continue' : `Send to WhatsApp · ${list.length} service${list.length > 1 ? 's' : ''}`}
            </a>
            {list.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 10 }}>
                <Shield size={10} color="rgba(255,255,255,0.2)" />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>No commitment · Free consultation</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: 10, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 3, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>🎯</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: 3 }}>Not sure where to start?</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', lineHeight: 1.6 }}>
              Message us — we'll audit your online presence for free and recommend the right services.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── LOGO CELL ────────────────────────────────────────────────────────────────
function LogoCell({ client, index }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.02 }}
      className="wd-logo-cell"
      title={client.name}
    >
      <img
        src={client.logo}
        alt={client.name}
        className={client.colorLogo ? 'color-logo' : ''}
      />
    </motion.div>
  )
}

// ─── PORTFOLIO SECTION — Cinematic Spotlight ──────────────────────────────────
function PortfolioSection() {
  const [active, setActive] = useState('corporate')
  const current = INDUSTRIES.find(i => i.id === active)
  const featured = current.projects[0]
  const rest = current.projects.slice(1)

  return (
    <section style={{ padding: '100px 0' }}>
      <div className="wd-wrap-wide">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 52 }}
        >
          <div className="wd-label" style={{ marginBottom: 20 }}>Our Work</div>
          <h2 className="wd-headline" style={{ fontSize: 'clamp(36px, 7vw, 88px)', color: '#fff', marginBottom: 8 }}>
            INDUSTRIES WE'VE <span className="wd-yellow">SERVED</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 520, lineHeight: 1.7 }}>
            We have delivered websites across diverse industries — each one custom-built, conversion-focused, and performance-tested.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="wd-port-tabs">
          {INDUSTRIES.map(ind => (
            <button
              key={ind.id}
              className={`wd-port-tab${active === ind.id ? ' active' : ''}`}
              onClick={() => setActive(ind.id)}
            >
              {ind.label}
            </button>
          ))}
        </div>

        {/* Cinematic Spotlight */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="wd-port-spotlight"
          >
            {/* Featured large card — left */}
            <a
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer"
              className="wd-port-featured"
            >
              {featured.thumb ? (
                <img
                  src={featured.thumb}
                  alt={featured.name}
                  className="wd-port-featured-bg"
                />
              ) : (
                <div className="wd-port-featured-placeholder">
                  <div className="wd-port-feat-ph-text">{featured.name}</div>
                </div>
              )}
              <div className="wd-port-featured-overlay">
                <div className="wd-port-feat-num">01</div>
                <div className="wd-port-feat-ind">
                  {current.label}
                </div>
                <div className="wd-port-feat-title">{featured.name}</div>
                <div className="wd-port-feat-link">
                  <ExternalLink size={10} /> Visit Website
                </div>
              </div>
            </a>

            {/* Stacked list — right */}
            <div className="wd-port-list">
              {rest.map((project, i) => (
                <motion.a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wd-port-list-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  {project.thumb ? (
                    <img
                      src={project.thumb}
                      alt={project.name}
                      className="wd-port-list-thumb"
                    />
                  ) : (
                    <div className="wd-port-list-placeholder">
                      <span style={{
                        fontSize: 9, fontWeight: 700,
                        color: 'rgba(255,255,255,0.08)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        textAlign: 'center',
                        padding: '0 8px',
                      }}>
                        {project.name}
                      </span>
                    </div>
                  )}
                  <div className="wd-port-list-body">
                    <div className="wd-port-list-num">0{i + 2}</div>
                    <div className="wd-port-list-name">{project.name}</div>
                  </div>
                  <div className="wd-port-list-arrow">→</div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// ─── PLATFORM SECTION ─────────────────────────────────────────────────────────
function PlatformSection() {
  return (
    <section style={{ padding: '100px 0 80px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="wd-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 52 }}
        >
          <div className="wd-label" style={{ marginBottom: 20 }}>Technology Stack</div>
          <h2 className="wd-headline" style={{ fontSize: 'clamp(36px, 7vw, 80px)', color: '#fff', marginBottom: 8 }}>
            WE BUILD ON <span className="wd-yellow">MULTIPLE PLATFORMS</span>
          </h2>
          <h2 className="wd-headline" style={{ fontSize: 'clamp(24px, 4vw, 48px)', color: 'rgba(255,255,255,0.25)' }}>
            TO SUIT YOUR NEEDS
          </h2>
        </motion.div>

        {/* Platform rack — image slots with emoji fallback */}
        <motion.div
          className="wd-platform-rack"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: 20 }}
        >
          {PLATFORMS.map((p, i) => (
            <motion.div
              key={i}
              className="wd-platform-tile"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <img
                src={p.logo}
                alt={p.name}
                style={{ width: 40, height: 40, objectFit: 'contain', filter: 'grayscale(1) brightness(0.7)', transition: 'filter 0.25s' }}
                onError={e => {
                  e.currentTarget.style.display = 'none'
                  const sibling = e.currentTarget.nextElementSibling
                  if (sibling) sibling.style.display = 'block'
                }}
              />
              <span className="wd-platform-tile-emoji">{p.icon}</span>
              <div className="wd-platform-tile-name">{p.name}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Extras pill strip */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          {PLATFORM_EXTRAS.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              style={{
                padding: '7px 18px',
                fontSize: 11,
                fontWeight: 700,
                border: '1px solid rgba(255,214,0,0.22)',
                color: 'rgba(255,214,0,0.55)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              + {e}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function WebDevProposalPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  const items = [...TICKER, ...TICKER]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="wd-root">
        <div className="wd-content">

          {/* ── HERO ──────────────────────────────────────────────────────────── */}
          <section
            ref={heroRef}
            style={{
              minHeight: '100vh',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: '80px 24px 60px',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* BG word */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 900, fontSize: 'clamp(80px, 18vw, 260px)',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.025)',
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
              userSelect: 'none', pointerEvents: 'none',
              lineHeight: 1,
            }}>
              WEBSITE
            </div>

            <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative' }}>

              {/* Logo + label */}
              <motion.div
                initial={{ opacity: 0, y: -12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 52 }}
              >
                <img src="/hero/logo.png" alt="To Fly Media" style={{ height: 44, width: 'auto', objectFit: 'contain' }} />
                <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.15)' }} />
                <div className="wd-label">Website Development Proposal</div>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 40 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.05 }}
                style={{ marginBottom: 32 }}
              >
                <h1 className="wd-headline" style={{ fontSize: 'clamp(52px, 11vw, 148px)', color: '#fff', marginBottom: 0 }}>
                  WEBSITE
                </h1>
                <h1 className="wd-headline wd-yellow" style={{ fontSize: 'clamp(52px, 11vw, 148px)', marginBottom: 0 }}>
                  DEVELOPMENT
                </h1>
                <h1 className="wd-headline" style={{ fontSize: 'clamp(52px, 11vw, 148px)', color: '#fff' }}>
                  PROPOSAL
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ fontSize: 'clamp(13px, 1.6vw, 17px)', color: 'rgba(255,255,255,0.45)', maxWidth: 600, lineHeight: 1.7, marginBottom: 48, textTransform: 'uppercase', letterSpacing: '0.04em' }}
              >
                Crafting Modern Websites For Every Business Type
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.28 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 0, marginBottom: 52 }}
              >
                {[
                  { num: '100+', label: 'Projects Delivered', sub: 'Successfully built websites across diverse industries.' },
                  { num: '10+', label: 'Skilled Developers', sub: 'A strong in-house team with specialised roles.' },
                  { num: 'UI/UX', label: 'to SEO Experts', sub: 'End-to-end expertise for complete web solutions.' },
                  { num: '3–7+', label: 'Years Experience', sub: 'Every team member is highly experienced.' },
                ].map((s, i) => (
                  <div key={i} style={{
                    paddingRight: 40, paddingBottom: 20,
                    borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    marginRight: i < 3 ? 40 : 0,
                  }}>
                    <div className="wd-stat-num wd-yellow" style={{ fontSize: 'clamp(28px, 5vw, 44px)' }}>{s.num}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginTop: 4, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', maxWidth: 180, lineHeight: 1.5, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{s.sub}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.38 }}
                style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}
              >
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a href="https://wa.me/919752523894?text=Hi%20ToFly!%20I%27d%20like%20to%20discuss%20website%20development" target="_blank" rel="noopener noreferrer" className="wd-btn-primary">
                    Get My Website Built <Rocket size={15} />
                  </a>
                  <a href="https://wa.me/919752523894" target="_blank" rel="noopener noreferrer" className="wd-btn-ghost">
                    <MessageCircle size={15} /> Free Consultation
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── TICKER ────────────────────────────────────────────────────────── */}
          <div className="wd-ticker-wrap" style={{ padding: '16px 0' }}>
            <div className="wd-ticker-track">
              {items.map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.22)', padding: '0 28px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t}</span>
                  <span style={{ color: '#FFD600', fontSize: 8 }}>◆</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── KEY ADVANTAGES ────────────────────────────────────────────────── */}
          <section style={{ padding: '80px 0', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="wd-wrap">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 48 }}>
                <div className="wd-label" style={{ marginBottom: 20 }}>Why Choose Us</div>
                <h2 className="wd-headline" style={{ fontSize: 'clamp(36px, 7vw, 80px)', color: '#fff' }}>
                  KEY ADVANTAGES<br /><span className="wd-yellow">FOR YOU</span>
                </h2>
              </motion.div>
              <div className="wd-adv-grid">
                {[
                  { icon: '🎨', title: '100% Custom Website', desc: 'No templates. Every pixel is designed specifically for your brand and your audience.' },
                  { icon: '🔍', title: 'SEO Optimised Code', desc: 'Schema markup, clean HTML, sitemap, meta tags — built for Google from day one.' },
                  { icon: '📱', title: 'Mobile Responsive', desc: 'Flawless on every device — smartphones, tablets, desktops, large screens.' },
                  { icon: '⚡', title: 'Speed Optimised', desc: '90+ PageSpeed scores, CDN setup, lazy loading, compressed assets.' },
                  { icon: '🔒', title: 'Secure & Reliable', desc: 'SSL certificate, daily backups, uptime monitoring and security hardening included.' },
                  { icon: '📊', title: 'Analytics Ready', desc: 'Google Analytics, Search Console, Facebook Pixel — set up and integrated.' },
                  { icon: '🛠️', title: 'Easy to Manage', desc: 'Intuitive CMS so your team can update content without touching code.' },
                  { icon: '🤝', title: 'Post-Launch Support', desc: "We don't disappear after delivery. Dedicated support and monthly care plans available." },
                ].map((adv, i) => (
                  <motion.div
                    key={i}
                    className="wd-adv-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 14 }}>{adv.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, fontFamily: 'Barlow Condensed, sans-serif' }}>{adv.title}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>{adv.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── INDUSTRIES / PORTFOLIO ────────────────────────────────────────── */}
          <PortfolioSection />

          {/* ── 100+ CLIENTS ──────────────────────────────────────────────────── */}
          <section style={{ padding: '80px 0', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="wd-wrap-wide">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}>
                <h2 className="wd-headline" style={{ fontSize: 'clamp(36px, 7vw, 88px)', color: '#fff' }}>
                  100+ CLIENTS <span className="wd-yellow">TRUSTED US</span>
                </h2>
              </motion.div>
              <div className="wd-logos">
                {CLIENTS.map((c, i) => (
                  <LogoCell key={i} client={c} index={i} />
                ))}
                <motion.div
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  className="wd-logo-cell"
                  style={{ color: 'rgba(255,214,0,0.5)', fontStyle: 'italic', fontSize: 11, fontWeight: 600 }}
                >
                  and many more across the globe since 2018
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── OUR PROCESS ───────────────────────────────────────────────────── */}
          <section style={{ padding: '100px 0' }}>
            <div className="wd-wrap">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 52 }}>
                <div className="wd-label" style={{ marginBottom: 20 }}>How It Works</div>
                <h2 className="wd-headline" style={{ fontSize: 'clamp(36px, 7vw, 80px)', color: '#fff', marginBottom: 8 }}>
                  OUR WEBSITE<br /><span className="wd-yellow">DELIVERY PROCESS</span>
                </h2>
              </motion.div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 0, position: 'relative' }}>
                {[
                  { step: '01', title: 'Discovery & Briefing', desc: 'We understand your business, goals, target audience, and brand identity before touching a single line of code.' },
                  { step: '02', title: 'UI/UX Design', desc: 'Wireframes and design mockups tailored to your brand. You approve every screen before development starts.' },
                  { step: '03', title: 'Development', desc: 'Our developers build your site using the right technology stack — clean code, fast, secure, and scalable.' },
                  { step: '04', title: 'Testing & QA', desc: "Cross-browser, cross-device testing. We break it so your users don't. Zero bugs policy before launch." },
                  { step: '05', title: 'Launch & Handover', desc: 'We deploy your site, set up analytics, submit to Google, and train your team to manage the CMS.' },
                  { step: '06', title: 'Support & Growth', desc: 'Post-launch support, performance monitoring, ongoing improvements and digital marketing integrations.' },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      padding: '32px 28px',
                      borderRight: i % 3 !== 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                      borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    }}
                  >
                    <div style={{
                      fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900,
                      fontSize: 52, color: 'rgba(255,214,0,0.12)', lineHeight: 1, marginBottom: 16,
                    }}>{step.step}</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10, fontFamily: 'Barlow Condensed, sans-serif' }}>{step.title}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', lineHeight: 1.8 }}>{step.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── PLAN BUILDER ──────────────────────────────────────────────────── */}
          <section style={{ padding: '100px 24px', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="wd-wrap-wide">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 56 }}>
                <div className="wd-label" style={{ marginBottom: 20 }}>Build Your Package</div>
                <h2 className="wd-headline" style={{ fontSize: 'clamp(36px, 7vw, 88px)', color: '#fff', marginBottom: 12 }}>
                  PICK WHAT YOU NEED.<br /><span className="wd-yellow">WE HANDLE THE REST.</span>
                </h2>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 540, lineHeight: 1.7 }}>
                  Select the services you need, send us your wishlist on WhatsApp, and we'll send back a custom quote and timeline — no commitment, no pressure.
                </p>
              </motion.div>
              <Builder />
            </div>
          </section>

          {/* ── TECHNOLOGY STACK (below plan builder) ─────────────────────────── */}
          <PlatformSection />

          {/* ── CONTACT / FINAL CTA ───────────────────────────────────────────── */}
          <section style={{ padding: '0 0 0' }}>
            <div style={{
              position: 'relative', overflow: 'hidden',
              background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{
                position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)',
                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900,
                fontSize: 'clamp(80px, 20vw, 280px)', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.025)', letterSpacing: '-0.02em', lineHeight: 0.85,
                userSelect: 'none', writingMode: 'vertical-rl',
              }}>CONTACT<br />THANK YOU</div>

              <div className="wd-wrap" style={{ padding: '80px 24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 60 }}>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <img src="/hero/logo.png" alt="To Fly Media" style={{ height: 52, objectFit: 'contain', marginBottom: 20 }} />
                    <hr className="wd-rule" style={{ marginBottom: 32, maxWidth: 160 }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Phone Number</div>
                        <div style={{ fontSize: 14, color: '#FFD600', fontWeight: 600 }}>+91 9752523894</div>
                        <div style={{ fontSize: 14, color: '#FFD600', fontWeight: 600 }}>+91 6260154125</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Website</div>
                        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>www.toflymedia.com</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Social Media</div>
                        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>@toflymedia</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Email Address</div>
                        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>toflymedia@gmail.com</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                  >
                    <h2 className="wd-headline" style={{ fontSize: 'clamp(36px, 6vw, 72px)', color: '#fff', marginBottom: 16 }}>
                      READY TO <span className="wd-yellow">LAUNCH?</span>
                    </h2>
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 28 }}>
                      Let's build a website that doesn't just look good — it converts, ranks, and scales your brand online.
                    </p>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <a
                        href="https://wa.me/919752523894?text=Hi%20ToFly!%20I%27d%20like%20to%20discuss%20website%20development%20for%20my%20brand"
                        target="_blank" rel="noopener noreferrer"
                        className="wd-btn-primary"
                      >
                        <MessageCircle size={16} /> Chat on WhatsApp
                      </a>
                      <a href="tel:+919752523894" className="wd-btn-ghost">
                        Call Now
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* WhatsApp FAB */}
      <motion.a
        href="https://wa.me/919752523894?text=Hi%20ToFly!%20I%27m%20interested%20in%20website%20development%20services"
        target="_blank" rel="noopener noreferrer"
        className="wd-fab"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      >
        <MessageCircle size={15} /> Chat on WhatsApp
      </motion.a>
    </>
  )
}