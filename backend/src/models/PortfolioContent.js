const mongoose = require('mongoose');

// ─────────────────────────────────────────────────────────────
// PortfolioContent — a SINGLE (singleton) document that drives
// every piece of text on the /tofly-portfolio page. Every field
// here maps 1:1 to something rendered on that page, and is fully
// editable from Admin → Tofly Portfolio.
// ─────────────────────────────────────────────────────────────

const navItemSchema = new mongoose.Schema({
  mark: { type: String, default: '' },   // small rail marker e.g. "+24.0"
  label: { type: String, required: true },
  href: { type: String, required: true } // e.g. "#who"
}, { _id: false });

const credentialSchema = new mongoose.Schema({
  value: { type: String, required: true }, // e.g. "Since 20––"
  label: { type: String, required: true },
  highlight: { type: Boolean, default: true } // brass accent + dashed underline
}, { _id: false });

const edgeItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
}, { _id: false });

const blockSchema = new mongoose.Schema({
  no: { type: String, default: '' },        // small eyebrow e.g. "Production"
  title: { type: String, required: true },
  description: { type: String, default: '' },
  bullets: [{ type: String }],
  note: { type: String, default: '' }
}, { _id: false });

const serviceSectionSchema = new mongoose.Schema({
  anchorId: { type: String, required: true },   // e.g. "content" (used as href="#content")
  levelLabel: { type: String, default: '' },     // e.g. "+18.0"
  heading: { type: String, required: true },
  intro: { type: String, default: '' },          // optional lede under the heading
  blocks: [blockSchema]
}, { _id: false });

const workItemSchema = new mongoose.Schema({
  tag: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  href: { type: String, default: '#' },
  orientation: { type: String, enum: ['horizontal', 'vertical'], default: 'vertical' },
  wide: { type: Boolean, default: false } // only meaningful when orientation = horizontal
}, { _id: false });

const verticalItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  bullets: [{ type: String }]
}, { _id: false });

const stepItemSchema = new mongoose.Schema({
  number: { type: String, required: true }, // e.g. "01"
  title: { type: String, required: true },
  description: { type: String, default: '' }
}, { _id: false });

const contactItemSchema = new mongoose.Schema({
  label: { type: String, required: true },  // e.g. "Call / WhatsApp"
  value: { type: String, required: true },  // display text, e.g. "+91 –– –––– ––––"
  href: { type: String, default: '' },      // e.g. "tel:+91..." — leave blank for plain text
  external: { type: Boolean, default: false }
}, { _id: false });

const portfolioContentSchema = new mongoose.Schema({
  key: { type: String, default: 'tofly-portfolio', unique: true },

  nav: [navItemSchema],

  brand: {
    logoText: { type: String, default: 'To Fly Media' },
    locationText: { type: String, default: 'Bhopal, Madhya Pradesh' }
  },

  hero: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    ctaPrimaryText: { type: String, default: '' },
    ctaPrimaryHref: { type: String, default: '#talk' },
    ctaSecondaryText: { type: String, default: '' },
    ctaSecondaryHref: { type: String, default: '#work' },
    credentials: [credentialSchema]
  },

  who: {
    anchorId: { type: String, default: 'who' },
    levelLabel: { type: String, default: '+24.0' },
    heading: { type: String, default: '' },
    paragraphs: [{ type: String }],
    note: { type: String, default: '' },
    edgelist: [edgeItemSchema]
  },

  serviceSections: [serviceSectionSchema],

  work: {
    anchorId: { type: String, default: 'work' },
    levelLabel: { type: String, default: '±00.0' },
    heading: { type: String, default: '' },
    intro: { type: String, default: '' },
    items: [workItemSchema]
  },

  verticals: {
    levelLabel: { type: String, default: 'Sector' },
    heading: { type: String, default: '' },
    items: [verticalItemSchema]
  },

  process: {
    levelLabel: { type: String, default: 'Process' },
    heading: { type: String, default: '' },
    steps: [stepItemSchema]
  },

  cta: {
    anchorId: { type: String, default: 'talk' },
    heading: { type: String, default: '' },
    description: { type: String, default: '' },
    contactList: [contactItemSchema]
  },

  footer: {
    line1: { type: String, default: '' },
    line2: { type: String, default: '' }
  }

}, { timestamps: true, minimize: false });

module.exports = mongoose.model('PortfolioContent', portfolioContentSchema);