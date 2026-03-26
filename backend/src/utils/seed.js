const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { Service, Testimonial, CaseStudy } = require('../models/Content');
const Blog = require('../models/Blog');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
};

const seedData = async () => {
  await connectDB();

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Service.deleteMany({}),
    Testimonial.deleteMany({}),
    CaseStudy.deleteMany({}),
    Blog.deleteMany({})
  ]);
  console.log('Cleared existing data');

  // Create admin user
  const admin = await User.create({
    name: 'Arjun Sharma',
    email: 'admin@toflymedia.com',
    password: 'Admin@123456',
    role: 'admin'
  });
  console.log('Admin created:', admin.email);

  // Seed services
  const services = await Service.insertMany([
    {
      title: 'Graphic Design',
      slug: 'graphic-design',
      shortDescription: 'Stunning visuals that communicate your brand story effectively.',
      description: 'We create compelling graphic design solutions — from brand identity to marketing collateral — that make a lasting impression and set your business apart.',
      icon: 'Palette',
      order: 1,
      features: [
        { title: 'Brand Identity', description: 'Logos, color palettes, and brand guidelines' },
        { title: 'Marketing Collateral', description: 'Brochures, banners, social creatives, and more' },
        { title: 'Print & Digital', description: 'Designs optimized for all mediums' }
      ],
      benefits: ['Dedicated designer', 'Unlimited revisions', 'Source files included', 'Fast turnaround']
    },
    {
      title: 'Video Editing',
      slug: 'video-editing',
      shortDescription: 'Professional video editing that captures attention and drives engagement.',
      description: 'From raw footage to polished final cuts, our video editors craft compelling stories for ads, social media, corporate content, and more.',
      icon: 'Video',
      order: 2,
      features: [
        { title: 'Social Media Videos', description: 'Reels, Shorts, and TikTok-ready edits' },
        { title: 'Ad Creatives', description: 'High-converting video ads for every platform' },
        { title: 'Motion Graphics', description: 'Animated intros, lower thirds, and transitions' }
      ],
      benefits: ['4K output quality', 'Quick delivery', 'Color grading included', 'Multiple format exports']
    },
    {
      title: 'Web Development',
      slug: 'web-development',
      shortDescription: 'Fast, beautiful, and conversion-optimized websites built to perform.',
      description: 'We design and develop high-performance websites tailored to your business goals — from landing pages to full-scale web applications.',
      icon: 'Globe',
      order: 3,
      features: [
        { title: 'Custom Websites', description: 'Fully bespoke designs built from scratch' },
        { title: 'E-Commerce', description: 'Shopify, WooCommerce, and custom stores' },
        { title: 'SEO Optimized', description: 'Built for speed and search engine visibility' }
      ],
      benefits: ['Mobile-first design', '99.9% uptime', 'CMS integration', '1 year support']
    },
    {
      title: 'App Development',
      slug: 'app-development',
      shortDescription: 'Scalable mobile and web apps engineered for seamless user experiences.',
      description: 'We build intuitive, feature-rich mobile and web applications for iOS, Android, and beyond — from MVP to enterprise-grade products.',
      icon: 'Smartphone',
      order: 4,
      features: [
        { title: 'iOS & Android', description: 'Cross-platform and native app development' },
        { title: 'UI/UX Integrated', description: 'Design and development under one roof' },
        { title: 'API & Backend', description: 'Robust, scalable backend infrastructure' }
      ],
      benefits: ['Agile development', 'App Store submission', 'Post-launch support', 'Performance optimized']
    },
    {
      title: 'Digital Marketing',
      slug: 'digital-marketing',
      shortDescription: 'Data-driven digital marketing that grows your brand and drives revenue.',
      description: 'From SEO and paid ads to email campaigns and content strategy, we deliver integrated digital marketing that creates measurable business impact.',
      icon: 'BarChart2',
      order: 5,
      features: [
        { title: 'SEO & Content', description: 'Rank higher and attract organic traffic' },
        { title: 'Paid Campaigns', description: 'Google, Meta, and LinkedIn advertising' },
        { title: 'Email Marketing', description: 'Automated sequences that nurture and convert' }
      ],
      benefits: ['Full-funnel strategy', 'Monthly reporting', 'Dedicated account manager', 'ROI-focused approach']
    },
    {
      title: 'UI/UX Design',
      slug: 'ui-ux-design',
      shortDescription: 'User-centered design that delights users and boosts conversions.',
      description: 'We craft intuitive, aesthetically stunning UI/UX designs backed by research and user testing — turning complex products into effortless experiences.',
      icon: 'Layout',
      order: 6,
      features: [
        { title: 'User Research', description: 'Personas, journey maps, and usability testing' },
        { title: 'Wireframing & Prototyping', description: 'Interactive prototypes before development' },
        { title: 'Design Systems', description: 'Scalable component libraries and style guides' }
      ],
      benefits: ['Figma deliverables', 'Responsive designs', 'Accessibility compliant', 'Developer handoff ready']
    }
  ]);
  console.log(`${services.length} services created`);

  // Seed testimonials
  await Testimonial.insertMany([
    {
      name: 'Rohit Mehta',
      designation: 'Founder & CEO',
      company: 'TechVenture India',
      rating: 5,
      testimonial: 'To Fly Media transformed our digital presence completely. Within 3 months, our lead volume tripled and our cost per acquisition dropped by 60%. The team is data-obsessed in the best possible way.',
      service: 'Performance Marketing',
      resultMetric: '3x leads, 60% lower CPA',
      isFeatured: true,
      order: 1
    },
    {
      name: 'Priya Joshi',
      designation: 'Marketing Director',
      company: 'StyleCraft D2C',
      rating: 5,
      testimonial: "Their Meta Ads strategy gave us our best ROAS ever — 8.4x during our peak season. The creative testing process they run is methodical and the results speak for themselves.",
      service: 'Paid Advertising',
      resultMetric: '8.4x ROAS peak season',
      isFeatured: true,
      order: 2
    },
    {
      name: 'Vikram Singh',
      designation: 'Co-Founder',
      company: 'EduReach Platform',
      rating: 5,
      testimonial: 'We went from 200 to 2,000 enrolled students in 4 months. The lead generation system they built is a machine. Highly recommend for EdTech companies scaling rapidly.',
      service: 'Lead Generation',
      resultMetric: '10x student enrollments',
      isFeatured: true,
      order: 3
    },
    {
      name: 'Ananya Gupta',
      designation: 'Brand Manager',
      company: 'Organic Earth',
      rating: 5,
      testimonial: 'Our Instagram following grew from 5K to 85K in 6 months and more importantly, the engagement rate stayed high. These guys understand social media at a deep level.',
      service: 'Social Media Marketing',
      resultMetric: '17x Instagram growth',
      isFeatured: false,
      order: 4
    },
    {
      name: 'Sanjay Rathore',
      designation: 'Director',
      company: 'RealPro Realty',
      rating: 5,
      testimonial: 'We were spending ₹2L/month on ads with minimal results. To Fly Media restructured everything and within 60 days we were getting 40+ qualified property inquiries weekly.',
      service: 'Performance Marketing',
      resultMetric: '40+ weekly qualified leads',
      isFeatured: false,
      order: 5
    }
  ]);
  console.log('Testimonials seeded');

  // Seed case studies
  await CaseStudy.insertMany([
    {
      title: 'How We Grew TechVenture\'s Revenue by 312% in 6 Months',
      slug: 'techventure-revenue-growth',
      client: { name: 'TechVenture India', industry: 'SaaS / B2B Tech' },
      challenge: 'TechVenture was burning through ad budget with minimal qualified pipeline. Their MQL-to-SQL conversion was under 8%, and CAC was 4x their target. They needed a complete rethink.',
      solution: 'We audited their entire funnel and rebuilt from scratch — new ICP definition, funnel-stage content, automated nurture sequences, and a full-funnel paid strategy across Google and LinkedIn.',
      approach: 'Month 1: Audit + Strategy. Month 2-3: Infrastructure build + campaign launch. Month 4-6: Scale and optimize.',
      results: [
        { metric: 'Revenue Growth', value: '312%', description: 'In 6 months vs prior period' },
        { metric: 'CAC Reduction', value: '68%', description: 'Cost per acquired customer dropped sharply' },
        { metric: 'MQL-to-SQL Rate', value: '34%', description: 'Up from 8% at project start' },
        { metric: 'Monthly Leads', value: '450+', description: 'From 40 per month at start' }
      ],
      services: ['Performance Marketing', 'Lead Generation', 'Paid Advertising'],
      duration: '6 months',
      isPublished: true,
      isFeatured: true,
      order: 1
    },
    {
      title: 'StyleCraft D2C: From ₹50L to ₹2Cr Monthly Revenue',
      slug: 'stylecraft-d2c-scale',
      client: { name: 'StyleCraft', industry: 'D2C Fashion' },
      challenge: 'StyleCraft was plateauing at ₹50L monthly revenue with declining ROAS on Meta due to audience saturation and creative fatigue.',
      solution: 'We implemented a systematic creative testing framework, expanded to Google Shopping, and built a retention-focused email + WhatsApp flow that brought back existing customers.',
      approach: 'Creative overhaul, channel diversification, and lifecycle marketing automation.',
      results: [
        { metric: 'Monthly Revenue', value: '₹2Cr+', description: 'From ₹50L — 4x growth' },
        { metric: 'ROAS', value: '8.4x', description: 'Average across Meta + Google' },
        { metric: 'Retention Rate', value: '42%', description: '60-day repeat purchase rate' },
        { metric: 'Ad Spend Efficiency', value: '3.2x', description: 'Revenue per rupee spent' }
      ],
      services: ['Paid Advertising', 'Performance Marketing'],
      duration: '4 months',
      isPublished: true,
      isFeatured: true,
      order: 2
    }
  ]);
  console.log('Case studies seeded');

  // Seed sample blog
  await Blog.create({
    title: '10 Performance Marketing Strategies That Actually Work in 2025',
    slug: '10-performance-marketing-strategies-2025',
    excerpt: 'The performance marketing landscape has shifted dramatically. Here are the strategies that top brands are using to drive consistent, profitable growth.',
    content: `<p>Performance marketing in 2025 looks very different from just two years ago. With rising CPCs, tighter privacy regulations, and AI-powered bidding, the playbook has fundamentally changed.</p>
<h2>1. First-Party Data Is Non-Negotiable</h2>
<p>With third-party cookies phased out, brands that invested in first-party data collection are winning. Build email lists, loyalty programs, and SMS subscribers aggressively.</p>
<h2>2. Creative Is the New Targeting</h2>
<p>As audience targeting becomes less precise due to privacy changes, your creative is your most powerful targeting tool. The right message resonates with the right person organically.</p>
<h2>3. Full-Funnel Attribution</h2>
<p>Stop optimizing for last-click. Brands using data-driven attribution models are finding 20-40% more efficiency in their ad spend.</p>`,
    category: 'Performance Marketing',
    tags: ['performance marketing', 'digital marketing', 'ROAS', 'strategy'],
    author: admin._id,
    isPublished: true,
    publishedAt: new Date(),
    metaTitle: '10 Performance Marketing Strategies for 2025 | To Fly Media',
    metaDescription: 'Discover the top performance marketing strategies driving real ROI in 2025. Expert insights from To Fly Media, Bhopal.'
  });
  console.log('Sample blog created');

  console.log('\n✅ Seed complete!');
  console.log('─────────────────────────────────');
  console.log('Admin Login:');
  console.log('  Email:    admin@toflymedia.com');
  console.log('  Password: Admin@123456');
  console.log('─────────────────────────────────\n');

  process.exit(0);
};

seedData().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
