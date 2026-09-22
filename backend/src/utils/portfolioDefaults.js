// Default content for the /tofly-portfolio page — this is exactly the copy
// that used to be hardcoded in the page. It is used once, to auto-create
// the PortfolioContent singleton the first time GET /api/portfolio runs
// against an empty database. After that, everything comes from Mongo and
// is edited from Admin → Tofly Portfolio.

module.exports = {
  key: 'tofly-portfolio',

  nav: [
    { mark: '+24.0', label: 'Who we are', href: '#who' },
    { mark: '+18.0', label: 'Content', href: '#content' },
    { mark: '+13.5', label: 'Ads', href: '#ads' },
    { mark: '+09.0', label: 'Leads', href: '#leads' },
    { mark: '+04.5', label: 'Web', href: '#web' },
    { mark: '+02.0', label: 'Automation', href: '#auto' },
    { mark: '±00.0', label: 'Work', href: '#work' },
    { mark: '-02.0', label: 'Talk', href: '#talk' }
  ],

  brand: {
    logoText: 'To Fly Media',
    locationText: 'Bhopal, Madhya Pradesh'
  },

  hero: {
    title: 'We fill site visits, not just lead forms.',
    subtitle: 'A performance marketing and content studio built for developers, interior studios and construction firms. We handle the drone shoot, the script, the ad account, the follow-up calls and the CRM — so the only number you have to watch is bookings.',
    ctaPrimaryText: 'Book a 30-minute call',
    ctaPrimaryHref: '#talk',
    ctaSecondaryText: 'See the work',
    ctaSecondaryHref: '#work',
    credentials: [
      { value: 'Since 20––', label: 'Building brands out of Bhopal, serving clients across India.', highlight: true },
      { value: '––+', label: 'Brands handled across real estate, interiors, retail and services.', highlight: true },
      { value: '₹––L+', label: 'Ad spend managed on Meta and Google.', highlight: true },
      { value: 'In-house', label: 'Drone, camera and edit team. No shoot is outsourced and re-sold.', highlight: false }
    ]
  },

  who: {
    anchorId: 'who',
    levelLabel: '+24.0',
    heading: 'A growth partner, not a posting service',
    paragraphs: [
      'Most agencies hand a builder a content calendar and a monthly report full of reach and impressions. That is not what sells an apartment. Bookings come from a specific chain: the right person sees a credible piece of content, clicks, gets called within minutes, and actually turns up at the site.',
      'We own that entire chain. One team, one point of contact, and one number we are accountable for — qualified site visits at a cost you can live with.'
    ],
    note: 'We work with a limited number of projects per city at a time. Two competing developers in the same micro-market will not both be our clients — your audience, creatives and learnings stay yours.',
    edgelist: [
      { title: 'Bhopal page network', description: "Established working relationships with the city's largest local pages and community accounts, for seeding launches and reaching local buyers organically." },
      { title: 'Direct influencer access', description: "Direct contact with Bhopal's top creators — no agency middleman, no inflated rates. Property walkthroughs, interior reveals and site tours with faces the city already trusts." },
      { title: 'Full production in-house', description: 'Drone, cinema camera and iPhone-native content under one roof. Construction progress, elevation shots, model flat tours, founder pieces.' },
      { title: 'Complete visibility', description: 'Your project shows up where your buyer already is — Instagram, Google Search, Maps, YouTube and WhatsApp — with a consistent story across all of them.' },
      { title: 'Built for this sector', description: 'We understand booking cycles, channel partners, RERA-safe claims, inventory-wise targeting and why a 60-day lead is still a live lead.' }
    ]
  },

  serviceSections: [
    {
      anchorId: 'content',
      levelLabel: '+18.0',
      heading: 'Content & social media management',
      intro: '',
      blocks: [
        {
          no: 'Production',
          title: 'We shoot it ourselves',
          description: 'Drone for elevation and locality context, cinema camera for walkthroughs and brand films, iPhone for fast reels that actually perform. Monthly shoot days planned around your construction timeline.',
          bullets: [
            'Drone aerials — site, elevation, locality and connectivity shots',
            'Model flat and sample interior walkthroughs',
            'Monthly construction progress films',
            'Founder, CEO and sales team authority content',
            'Customer handover and testimonial shoots',
            'Before / after interior transformation edits',
            'Material, finish and craftsmanship detail shots',
            'Models and influencers arranged on request'
          ],
          note: ''
        },
        {
          no: 'Planning',
          title: 'Scripts and content strategy',
          description: 'Nothing is shot without a reason. Every month starts with a plan mapped to what you are trying to sell that month.',
          bullets: [
            'Monthly content calendar approved before shoot day',
            'Reel scripts, hooks and voice-over copy',
            'Caption writing in Hindi, English or Hinglish',
            'Hashtag, location and keyword strategy',
            'Trend and audio research for local relevance',
            'Static creatives, carousels and offer posts',
            'Festive and launch campaign concepts',
            'Brand guideline and template system'
          ],
          note: ''
        },
        {
          no: 'Management',
          title: 'Daily handling and engagement',
          description: 'Your page is a sales channel, so it is treated like one. Comments and DMs are answered by people who know your inventory and pricing.',
          bullets: [
            'Scheduling and posting across Instagram, Facebook, YouTube and LinkedIn',
            'Story management — polls, behind the scenes, daily site updates',
            'Comment and DM replies within working hours',
            'Enquiries from DMs passed to your sales team, not left unread',
            'Review and reputation monitoring',
            'Negative comment and crisis handling protocol',
            'Competitor activity tracking',
            "Monthly performance report with next month's plan"
          ],
          note: 'Models, influencers, actors and any paid page seeding are billed at actual cost with the invoice shared — we do not add a margin on top of talent fees.'
        }
      ]
    },
    {
      anchorId: 'ads',
      levelLabel: '+13.5',
      heading: 'Performance marketing',
      intro: 'Lead cost is easy to reduce and meaningless on its own. We optimise for cost per site visit and cost per booking, which means we cut audiences that produce cheap leads nobody can reach.',
      blocks: [
        {
          no: 'Setup',
          title: 'Account and tracking foundation',
          description: 'Built in your own ad accounts, under your Business Manager. You keep every asset, audience and learning if we ever part ways.',
          bullets: [
            'Meta and Google Ads account structure',
            'Pixel, Conversions API and server-side tracking',
            'GA4, Google Tag Manager and call tracking setup',
            'Offline conversion upload — bookings fed back into the algorithm',
            'UTM convention so every lead is traceable to a creative',
            'Baseline report of your current numbers before we touch anything'
          ],
          note: ''
        },
        {
          no: 'Creative',
          title: 'Systematic A/B testing',
          description: 'In this category the creative is the targeting. We run structured tests instead of guessing, and retire losers fast.',
          bullets: [
            'Multiple creative variants live per campaign, every month',
            'Hook, thumbnail and first-three-second testing',
            'Offer and headline testing — price point, EMI, possession date',
            'Format testing across reel, carousel, static and collection',
            'Landing page vs instant form vs WhatsApp click testing',
            'Winning angles scaled, losing spend cut within the same week'
          ],
          note: ''
        },
        {
          no: 'Targeting',
          title: 'Reaching actual buyers',
          description: 'Filtering out the window shoppers matters more than reach. Qualification starts in the ad, not in the call centre.',
          bullets: [
            'Locality, pincode and radius targeting around your project',
            'Income, life-stage and behaviour layering',
            'Lookalikes built from your actual buyers, not from form fills',
            'Google Search capture for high-intent project and locality queries',
            'Retargeting across video viewers, page visitors and dropped leads',
            'NRI and out-of-city targeting where relevant',
            'Qualifying questions in-form to filter budget and timeline',
            'Channel partner and broker recruitment campaigns'
          ],
          note: ''
        },
        {
          no: 'Reporting',
          title: 'Numbers you can act on',
          description: 'A live dashboard you can open any time, plus a monthly review call where we tell you what failed as clearly as what worked.',
          bullets: [
            'Live dashboard — spend, leads, CPL, site visits, bookings',
            'Creative-level performance so you see which video sold',
            'Weekly snapshot on WhatsApp, monthly report and strategy call',
            'Daily budget pacing and anomaly checks',
            'Full ad spend reconciliation each month',
            'Quarterly business review with next-quarter plan'
          ],
          note: ''
        }
      ]
    },
    {
      anchorId: 'leads',
      levelLabel: '+09.0',
      heading: 'Lead management system',
      intro: 'Most developers lose more money to slow follow-up than to expensive ads. We give you a system — on web and mobile — where every enquiry has an owner, a status and a next action.',
      blocks: [
        {
          no: 'Capture',
          title: 'Every lead in one place',
          description: "Nothing sits in a spreadsheet, a WhatsApp forward or somebody's personal inbox.",
          bullets: [
            'Meta, Google, website, GMB, WhatsApp and walk-ins in one pipeline',
            'Instant alert to the assigned salesperson on new lead',
            'Automatic distribution by project, source or round-robin',
            "Duplicate detection so two people don't call the same buyer",
            'Source tagged on every lead, down to the exact creative'
          ],
          note: ''
        },
        {
          no: 'Follow-up',
          title: 'The full journey, tracked',
          description: 'New → contacted → qualified → site visit scheduled → visited → negotiation → booked → lost. Every stage time-stamped.',
          bullets: [
            'Click-to-call from the app with automatic call recording',
            'Follow-up reminders and task alerts for the sales team',
            'Site visit scheduling and attendance marking',
            'Lost reason capture — price, location, possession, competitor',
            'Notes, documents and quotations stored against the lead',
            'Automatic re-engagement of cold and dropped leads'
          ],
          note: ''
        },
        {
          no: 'Control',
          title: 'Visibility for the owner',
          description: 'You see what your sales team is doing without asking for it.',
          bullets: [
            'Salesperson-wise performance — calls, visits, conversions',
            'Response time report: how fast leads are actually being called',
            'Untouched and overdue lead alerts',
            'Source-wise ROI — which campaign produced real bookings',
            'Mobile app for the field team, web dashboard for management',
            'Team training and onboarding included in setup'
          ],
          note: 'This closes the loop back into the ad account. Once bookings flow back into Meta and Google, the platforms start finding more people like your actual buyers instead of more people who fill forms.'
        }
      ]
    },
    {
      anchorId: 'web',
      levelLabel: '+04.5',
      heading: 'Google Business, websites & landing pages',
      intro: '',
      blocks: [
        {
          no: 'Local search',
          title: 'Google Business Profile',
          description: 'For interior studios and contractors this is often the highest-intent, lowest-cost channel available — and it is usually neglected.',
          bullets: [
            'Profile setup, verification and category optimisation',
            'Photo, video and project gallery management',
            'Weekly posts, offers and event updates',
            'Review generation system and reply management',
            'Local SEO and map pack ranking work',
            'Q&A, service listing and booking link setup'
          ],
          note: ''
        },
        {
          no: 'Build',
          title: 'Websites and landing pages',
          description: 'Fast, mobile-first pages built to convert traffic into enquiries — not brochure sites that take eight seconds to load.',
          bullets: [
            'Project microsites and campaign landing pages',
            'Company websites with portfolio and project galleries',
            'Mobile-first, sub-three-second load targets',
            'Floor plans, pricing, location map and virtual tour integration',
            'Enquiry forms wired directly into the lead system',
            'WhatsApp and click-to-call buttons on every scroll position',
            'RERA details, disclaimers and compliance blocks',
            'Conversion rate testing after launch, not just handover'
          ],
          note: ''
        }
      ]
    },
    {
      anchorId: 'auto',
      levelLabel: '+02.0',
      heading: 'WhatsApp & AI automation',
      intro: 'A lead called within five minutes converts several times better than one called the next day. Automation makes sure the first response is instant, even at 11pm on a Sunday.',
      blocks: [
        {
          no: 'WhatsApp',
          title: 'Official API setup',
          description: 'Verified business number, green tick application, and message flows that run whether your team is at their desk or not.',
          bullets: [
            'WhatsApp Business API setup and green tick application',
            'Instant auto-reply with brochure, price list and location pin',
            'Drip follow-up sequences for leads who go quiet',
            'Site visit reminders and confirmation messages',
            'Broadcast campaigns for launches, offers and price revisions',
            'Shared team inbox so no chat is stuck on one phone',
            'Click-to-WhatsApp ads that open a chat directly'
          ],
          note: ''
        },
        {
          no: 'AI',
          title: 'Qualification and workflow automation',
          description: 'An AI assistant handles the repetitive first conversation and hands your salesperson a lead that is already qualified.',
          bullets: [
            'AI chat assistant answering FAQs 24×7 — price, size, possession, location',
            'Automatic budget, timeline and intent qualification before handover',
            'Conversations in Hindi and English',
            'Call recording transcription and summary against each lead',
            'Automated daily sales report to management on WhatsApp',
            'Review requests triggered automatically after handover',
            'Internal workflow automation across CRM, sheets and calendars'
          ],
          note: ''
        }
      ]
    }
  ],

  work: {
    anchorId: 'work',
    levelLabel: '±00.0',
    heading: 'Selected work',
    intro: 'Tap any tile to open the full video or case study.',
    items: [
      { tag: 'Showreel', title: 'Agency showreel — add link', description: 'Replace with your 60–90 second reel covering drone, walkthrough and interior work.', href: 'https://www.instagram.com/toflymedia/', orientation: 'horizontal', wide: true },
      { tag: 'Real estate', title: 'Project name', description: 'Drone elevation film. Add result: leads, cost per lead, site visits.', href: 'https://www.instagram.com/toflymedia/', orientation: 'vertical', wide: false },
      { tag: 'Interiors', title: 'Studio name', description: 'Before / after transformation reel. Add reach and enquiry numbers.', href: 'https://www.instagram.com/toflymedia/', orientation: 'vertical', wide: false },
      { tag: 'Construction', title: 'Company name', description: 'Monthly progress film. Add what it did for buyer confidence.', href: 'https://www.instagram.com/toflymedia/', orientation: 'vertical', wide: false },
      { tag: 'Influencer', title: 'Creator collaboration', description: 'Bhopal creator walkthrough. Add views and enquiries generated.', href: 'https://www.instagram.com/toflymedia/', orientation: 'vertical', wide: false },
      { tag: 'Ad creative', title: 'Campaign name', description: 'Screenshot of the ads manager result — spend, leads, cost per lead.', href: 'https://www.instagram.com/toflymedia/', orientation: 'horizontal', wide: false },
      { tag: 'Dashboard', title: 'Lead system screenshot', description: 'Show the pipeline view so clients understand what they get.', href: 'https://www.instagram.com/toflymedia/', orientation: 'horizontal', wide: false },
      { tag: 'Website', title: 'Landing page build', description: 'Add the live URL and its conversion rate.', href: 'https://www.toflymediaa.com/', orientation: 'horizontal', wide: false }
    ]
  },

  verticals: {
    levelLabel: 'Sector',
    heading: 'What this looks like in your business',
    items: [
      {
        title: 'Real estate developers',
        description: 'Pre-launch interest, launch-day volume and steady site visits through the sales cycle.',
        bullets: [
          'Pre-launch waitlist campaigns',
          'Inventory-wise targeting by configuration',
          'Channel partner recruitment',
          'Cost per site visit as the headline metric',
          'Construction progress content for buyer confidence'
        ]
      },
      {
        title: 'Interior designers & studios',
        description: 'A portfolio that does the selling before the first meeting, and enquiries with real budgets.',
        bullets: [
          'Before / after and reveal-format content',
          'Budget-qualified enquiry forms',
          'Google Business and local search dominance',
          'Material and craftsmanship detail films',
          'Client testimonial and handover shoots'
        ]
      },
      {
        title: 'Construction & contracting',
        description: 'Credibility content for a business where trust decides the contract, plus B2B lead flow.',
        bullets: [
          'Project capability and scale films',
          'Timeline and delivery-record content',
          'B2B targeting of developers and architects',
          'Tender and credential documentation support',
          'Safety, quality and team culture content'
        ]
      }
    ]
  },

  process: {
    levelLabel: 'Process',
    heading: 'How we start',
    steps: [
      { number: '01', title: 'Discovery call — 45 minutes', description: 'Your projects, current marketing, what your booking cycle actually looks like and what has failed before. No pitch on this call.' },
      { number: '02', title: 'Free audit', description: 'We review your ad accounts, page, website and Google listing, then present specific gaps and what fixing them is worth. Yours to keep whether you hire us or not.' },
      { number: '03', title: 'Proposal and scope', description: 'Strategy, deliverables with quantities, timelines, team, pricing and what is explicitly not included. Sent within 48 hours of the audit.' },
      { number: '04', title: 'Agreement and kickoff', description: 'Signed agreement, access to your own accounts, tracking setup, baseline numbers recorded and a 30-60-90 day roadmap presented to your team.' },
      { number: '05', title: 'First shoot and launch', description: 'Content produced, campaigns live, lead system connected and your sales team trained on it — typically inside the first three weeks.' },
      { number: '06', title: 'Optimise and review', description: 'Weekly optimisation, monthly reports and strategy calls, quarterly business reviews. You always know what we are doing and why.' }
    ]
  },

  cta: {
    anchorId: 'talk',
    heading: "Tell us what you're launching.",
    description: "Bring your current numbers to the first call — spend, lead cost, site visits, bookings. If we don't think we can improve them, we'll say so on the call.",
    contactList: [
      { label: 'Call / WhatsApp', value: '+91 –– –––– ––––', href: 'tel:', external: false },
      { label: 'Email', value: 'hello@toflymedia.com', href: 'mailto:', external: false },
      { label: 'Instagram', value: '@toflymedia', href: 'https://www.instagram.com/toflymedia/', external: true },
      { label: 'Website', value: 'toflymediaa.com', href: 'https://www.toflymediaa.com/', external: true },
      { label: 'Office', value: 'Bhopal, MP — add address', href: '', external: false }
    ]
  },

  footer: {
    line1: 'To Fly Media — growth partner for real estate, interiors and construction.',
    line2: 'Bhopal · Serving clients across India'
  }
};