const mongoose = require('mongoose');

// ─────────────────────────────────────────────────────────────
// PricingContent — a SINGLE (singleton) document that drives every
// piece of text/price on the /tofly-pricing page. Every field here
// maps 1:1 to something rendered on that page, and is fully editable
// from Admin → Tofly Pricing.
//
// Mirrors the pattern used by PortfolioContent.js for /tofly-portfolio.
// ─────────────────────────────────────────────────────────────

// A single price card, e.g. "Monthly plan · ₹20,000/month · 20% off"
const planCardSchema = new mongoose.Schema({
  planLabel: { type: String, default: '' },   // e.g. "Monthly plan"
  was: { type: String, default: '' },         // e.g. "₹25,000" or "38%" — struck through
  now: { type: String, default: '' },         // e.g. "₹20,000" or "25%"
  per: { type: String, default: '' },         // e.g. "/month", "total", "of ad spend"
  effective: { type: String, default: '' },   // e.g. "Effective ₹16,667/month" — blank hides it
  badge: { type: String, default: '' },       // e.g. "20% off" — blank hides the badge
  highlight: { type: Boolean, default: false } // gold "recommended" card styling
}, { _id: false });

// A row of the Track 2 ad-spend rate table
const rateRowSchema = new mongoose.Schema({
  budget: { type: String, default: '' },
  regularFee: { type: String, default: '' },
  offerFee: { type: String, default: '' },
  billing: { type: String, default: '' }
}, { _id: false });

// A single add-on line item
const addonItemSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  value: { type: String, default: '' },   // e.g. "₹5,000" or "At cost"
  sub: { type: String, default: '' }      // e.g. "per day" or "invoice shared"
}, { _id: false });

// A one-time-setup card (Website/GMB, WhatsApp automation, ...)
const oneTimeCardSchema = new mongoose.Schema({
  planLabel: { type: String, required: true },
  was: { type: String, default: '' },
  now: { type: String, default: '' },
  per: { type: String, default: 'one-time' },
  badge: { type: String, default: '' },
  bullets: [{ type: String }],
  note: { type: String, default: '' }
}, { _id: false });

const pricingContentSchema = new mongoose.Schema({
  key: { type: String, default: 'tofly-pricing', unique: true },

  brand: {
    logoText: { type: String, default: 'To Fly Media' },
    locationText: { type: String, default: 'Bhopal, Madhya Pradesh' }
  },

  header: {
    title: { type: String, default: 'Pricing & Packages' },
    subtitle: { type: String, default: '' },
    validityText: { type: String, default: '' }
  },

  // ── Track 1: Content & Social Media Management ──
  track1: {
    tag: { type: String, default: 'Track 1' },
    heading: { type: String, required: true },
    lede: { type: String, default: '' },
    plans: [planCardSchema],
    bullets: [{ type: String }],
    teamLabel: { type: String, default: 'Team included:' },
    teamValue: { type: String, default: '' },
    note: { type: String, default: '' }
  },

  // ── Track 2: Performance Marketing ──
  track2: {
    tag: { type: String, default: 'Track 2' },
    heading: { type: String, required: true },
    lede: { type: String, default: '' },
    rateTableHeaders: {
      budget: { type: String, default: 'Monthly ad budget' },
      regularFee: { type: String, default: 'Regular fee' },
      offerFee: { type: String, default: 'Offer fee' },
      billing: { type: String, default: 'Billing' }
    },
    rateRows: [rateRowSchema],
    plans: [planCardSchema],
    bullets: [{ type: String }],
    teamLabel: { type: String, default: 'Team included:' },
    teamValue: { type: String, default: '' },
    note: { type: String, default: '' }
  },

  // ── Growth Bundle ──
  bundle: {
    tag: { type: String, default: 'Best value' },
    heading: { type: String, default: '' },
    lede: { type: String, default: '' },
    recommendBadge: { type: String, default: 'Recommended' },
    plans: [planCardSchema],
    savenote: { type: String, default: '' }
  },

  // ── One-time setup ──
  onetime: {
    tag: { type: String, default: 'One-time setup' },
    heading: { type: String, default: '' },
    lede: { type: String, default: '' },
    cards: [oneTimeCardSchema]
  },

  // ── Add-ons ──
  addons: {
    tag: { type: String, default: 'Add-ons' },
    heading: { type: String, default: '' },
    lede: { type: String, default: '' },
    items: [addonItemSchema]
  },

  // ── Terms ── (items may contain **bold** to highlight key phrases)
  terms: {
    tag: { type: String, default: 'Terms' },
    items: [{ type: String }]
  },

  footer: {
    line1: { type: String, default: '' },
    validPrefix: { type: String, default: 'Valid as on' },
    validDate: { type: String, default: '' }
  }

}, { timestamps: true, minimize: false });

module.exports = mongoose.model('PricingContent', pricingContentSchema);