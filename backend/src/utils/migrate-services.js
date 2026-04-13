/**
 * migrate-services.js
 * -------------------
 * Replaces ONLY the services collection with the 9 new service names.
 * Does NOT touch users, testimonials, case studies, or blogs.
 *
 * Run once from your backend folder:
 *   node src/utils/migrate-services.js
 */

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { Service } = require('../models/Content');
// ... rest of your code unchanged

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');
};

const NEW_SERVICES = [
  {
    title: 'Brand Strategy & Consulting',
    slug: 'brand-strategy-consulting',
    shortDescription: 'Build a brand that breaks through the noise. We define your USP, tone of voice, and go-to-market strategy so your audience remembers you — and chooses you.',
    description: "Whether you're launching from scratch or repositioning an existing brand, our expert-led consulting gives you clarity, direction, and a playbook to win. We research your market, dissect your competitors, and craft an identity that resonates deeply with your ideal customers.",
    icon: 'Layers',
    order: 1,
    features: [
      { title: 'Market & Competitor Research', description: 'Know exactly where you stand and how to outflank the competition.' },
      { title: 'USP & Positioning Workshop', description: 'Uncover what makes you genuinely different and build your story around it.' },
      { title: 'Tone of Voice & Messaging Guide', description: 'A consistent voice across every touchpoint — ads, social, sales calls.' },
      { title: 'Go-to-Market (GTM) Strategy', description: 'A sequenced launch plan with channel priorities and 90-day milestones.' }
    ],
    benefits: ['Clarity on who you are and who you serve', 'Messaging that converts strangers into believers', 'Confidence in every marketing decision you make', 'A foundation that makes every rupee of ad spend work harder'],
    isActive: true
  },
  {
    title: 'Website Development & E-Commerce',
    slug: 'website-development-ecommerce',
    shortDescription: 'From sleek business websites to full-scale e-commerce stores — we build platforms that load fast, look premium, and convert visitors into customers.',
    description: 'Your website is your best salesperson. We build mobile-first, performance-optimised websites and e-commerce stores that are designed to sell. From product cataloguing and secure payment gateway integration to custom landing pages and CMS.',
    icon: 'Globe',
    order: 2,
    features: [
      { title: 'Mobile-First Design', description: "Flawless experience on every screen size, built for India's mobile-first audience." },
      { title: 'E-Commerce & Product Cataloguing', description: 'Full-featured online stores with inventory management and secure checkout.' },
      { title: 'Payment Gateway Integration', description: 'Razorpay, PayU, Stripe — we integrate what works best for your customers.' },
      { title: 'Speed & SEO Optimisation', description: 'Fast load times and clean code that Google loves.' }
    ],
    benefits: ['24/7 lead generation without lifting a finger', 'A brand impression that builds instant trust', 'Scalable architecture that grows as you do', 'Full ownership — no vendor lock-in'],
    isActive: true
  },
  {
    title: 'Social Media Marketing',
    slug: 'social-media-marketing',
    shortDescription: "Don't just post. Perform. We build data-driven social media strategies that grow your following, boost engagement, and turn scrollers into paying customers.",
    description: "Likes don't pay the bills — sales do. We manage your Instagram, Facebook, and LinkedIn presence with a content strategy built around your audience's actual behaviour.",
    icon: 'Share2',
    order: 3,
    features: [
      { title: 'Content Strategy & Calendar', description: "A month's worth of intentional content planned and scheduled in advance." },
      { title: 'Reel & Graphic Production', description: 'Scroll-stopping visuals and videos that match your brand aesthetic.' },
      { title: 'Community Management', description: 'Timely responses to comments and DMs — we keep your audience warm.' },
      { title: 'Monthly Analytics Report', description: "Clear data on what grew, what converted, and what we're doing next." }
    ],
    benefits: ['Consistent brand presence across platforms', 'A growing audience that actually engages', 'Content that works while you focus on your business', 'Social proof that builds trust with new visitors'],
    isActive: true
  },
  {
    title: 'Google & Meta Ads',
    slug: 'google-meta-ads',
    shortDescription: 'Performance-first paid advertising on Google, YouTube, Facebook & Instagram. Every rupee is tracked, tested, and optimised for maximum ROI.',
    description: 'We run search, display, shopping, and retargeting campaigns across Google and Meta platforms with one obsession: your return on ad spend.',
    icon: 'Target',
    order: 4,
    features: [
      { title: 'Search & Display Campaigns', description: 'Capture high-intent buyers actively searching for what you offer.' },
      { title: 'Facebook & Instagram Ads', description: 'Scroll-stopping creatives with laser-targeted audience segments.' },
      { title: 'Retargeting Campaigns', description: "Re-engage visitors who didn't convert the first time." },
      { title: 'A/B Testing & Optimisation', description: 'Continuous creative and copy testing to lower cost per lead every month.' }
    ],
    benefits: ['Predictable, scalable lead flow', "Full attribution — know exactly what's working", 'Lower cost per acquisition over time', 'Campaigns that scale when results arrive'],
    isActive: true
  },
  {
    title: 'Influencer & Awareness Marketing',
    slug: 'influencer-awareness-marketing',
    shortDescription: 'Partner with credible micro- and macro-influencers across India. We manage the full campaign — from sourcing to execution to ROI reporting.',
    description: 'Trust travels through people. We identify and onboard the right influencers for your category and manage the entire collaboration from brief to content delivery and performance tracking.',
    icon: 'Users',
    order: 5,
    features: [
      { title: 'Influencer Research & Vetting', description: 'We find creators whose audience genuinely matches your ideal customer.' },
      { title: 'Campaign Brief & Coordination', description: 'Clear creative direction so influencers represent your brand perfectly.' },
      { title: 'Content Review & Approval', description: 'Every piece of content is reviewed before it goes live.' },
      { title: 'ROI Reporting', description: 'Reach, engagement, link clicks, and conversions — all tracked and reported.' }
    ],
    benefits: ['Instant credibility with new audiences', 'Content you can repurpose across your own channels', 'Authentic word-of-mouth at scale', 'Measurable brand lift, not just vanity reach'],
    isActive: true
  },
  {
    title: 'Branding Solutions',
    slug: 'branding-solutions',
    shortDescription: 'Logos, brand guidelines, packaging, and visual identity — we shape the way your brand looks, feels, and is remembered.',
    description: 'Great design is silent salesmanship. Our creative team combines design thinking with consumer psychology to build visual identities that influence buying decisions.',
    icon: 'Palette',
    order: 6,
    features: [
      { title: 'Logo Design & Brand Kit', description: 'A professional logo with full usage guidelines, colour palette, and typography.' },
      { title: 'Visual Identity System', description: 'Consistent design language across every customer touchpoint.' },
      { title: 'Packaging Design', description: 'Product packaging that stands out on the shelf and online.' },
      { title: 'Marketing Collateral', description: 'Brochures, presentations, social templates — everything on-brand.' }
    ],
    benefits: ['A brand that looks as good as your product', 'Instant professionalism that builds trust', 'Design assets ready to use across all channels', 'A visual identity that scales with your ambitions'],
    isActive: true
  },
  {
    title: 'SEO & Local Marketing',
    slug: 'seo-local-marketing',
    shortDescription: 'Rank higher on Google with technical SEO, on-page optimisation, and Google Business Profile strategies that drive organic calls, visits, and enquiries.',
    description: 'When someone searches for what you offer in your city, you need to appear first. We handle every layer of SEO — technical audits, keyword strategy, on-page optimisation, local citations, and Google Business Profile management.',
    icon: 'Search',
    order: 7,
    features: [
      { title: 'Technical SEO Audit & Fixes', description: 'Site speed, crawlability, indexing — every technical issue resolved.' },
      { title: 'Keyword Research & On-Page Optimisation', description: 'Targeting the exact terms your customers are searching for.' },
      { title: 'Google Business Profile Management', description: 'Optimised GMB listing that drives calls, visits, and direction requests.' },
      { title: 'Local Citation Building', description: 'Consistent NAP listings across all major directories.' }
    ],
    benefits: ['Organic traffic that compounds over time', 'Top rankings in local map and search results', 'Inbound leads without ongoing ad spend', "Long-term visibility that competitors can't buy"],
    isActive: true
  },
  {
    title: 'Bulk WhatsApp & SMS Marketing',
    slug: 'bulk-whatsapp-sms-marketing',
    shortDescription: 'Reach thousands instantly with personalised WhatsApp blasts and SMS campaigns. Automate follow-ups and convert leads while you sleep.',
    description: 'WhatsApp has a 98% open rate. We help you tap into that with personalised bulk messaging campaigns that feel human, not spammy. From promotional offers to automated lead follow-up sequences.',
    icon: 'MessageSquare',
    order: 8,
    features: [
      { title: 'Bulk WhatsApp Campaigns', description: 'Broadcast personalised messages to thousands of contacts in minutes.' },
      { title: 'SMS Marketing', description: "Reach customers who aren't on WhatsApp with high-delivery SMS blasts." },
      { title: 'Automated Follow-Up Sequences', description: 'Set up drip messages that nurture leads automatically over days or weeks.' },
      { title: 'Delivery & Engagement Reports', description: 'Track open rates, click-throughs, and responses in real time.' }
    ],
    benefits: ['Near-instant reach to your entire contact list', 'Dramatically higher open rates than email', 'Automated lead nurturing without manual effort', 'Personalisation at scale'],
    isActive: true
  },
  {
    title: 'Bulk Voice Call & IVR Services',
    slug: 'bulk-voice-call-ivr',
    shortDescription: 'Connect with your audience instantly through voice. Missed call marketing, IVR menus, automated follow-ups, and survey campaigns — all managed for you.',
    description: 'Voice is still one of the most powerful ways to connect. Our bulk voice call and IVR services let you reach thousands of prospects simultaneously — for product launches, appointment reminders, surveys, or lead qualification.',
    icon: 'Phone',
    order: 9,
    features: [
      { title: 'Bulk Voice Broadcasts', description: 'Send pre-recorded voice messages to thousands of numbers at once.' },
      { title: 'IVR Menu Setup', description: 'Multi-level interactive menus that route callers to the right team.' },
      { title: 'Missed Call Marketing', description: 'Give customers a number to give a missed call — capture leads instantly.' },
      { title: 'Survey & Feedback Campaigns', description: 'Collect responses at scale using automated voice surveys.' }
    ],
    benefits: ["Reach customers who don't respond to text", 'Qualify leads automatically before they reach your team', 'Higher engagement than digital-only outreach', 'Scalable communication with no extra headcount'],
    isActive: true
  }
];

const migrate = async () => {
  await connectDB();

  // Delete only services — nothing else is touched
  await Service.deleteMany({});
  console.log('🗑  Old services removed');

  const inserted = await Service.insertMany(NEW_SERVICES);
  console.log(`✅ ${inserted.length} new services inserted`);

  inserted.forEach(s => console.log(`   • ${s.title}  →  /services/${s.slug}`));

  console.log('\n✅ Migration complete. No other data was changed.\n');
  process.exit(0);
};

migrate().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});