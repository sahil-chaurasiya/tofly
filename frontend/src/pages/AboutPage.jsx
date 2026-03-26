import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Heart, Target, Eye, Award, MapPin, Users } from 'lucide-react'
import { PageWrapper, SectionWrapper, SectionTag, CTABanner } from '../components/common'

const TEAM = [
  {
    name: 'Arjun Sharma',
    role: 'Founder & CEO',
    bio: '8+ years in performance marketing. Ex-Google certified partner. Built and scaled 3 agencies before founding To Fly Media.',
    emoji: '🚀'
  },
  {
    name: 'Priya Kapoor',
    role: 'Head of Paid Media',
    bio: 'Former digital lead at a top Mumbai agency. Managed ₹10Cr+ monthly ad spends. Google & Meta certified.',
    emoji: '🎯'
  },
  {
    name: 'Rohan Verma',
    role: 'Lead Generation Strategist',
    bio: '6 years building B2B lead gen systems. Specializes in LinkedIn, cold outreach, and funnel automation.',
    emoji: '⚡'
  },
  {
    name: 'Sneha Jain',
    role: 'Social Media Director',
    bio: 'Grew 40+ brand accounts from scratch. Viral content strategist. Has built communities of 500K+ followers.',
    emoji: '✨'
  },
  {
    name: 'Manish Tiwari',
    role: 'Data & Analytics Lead',
    bio: 'Data engineer turned marketer. Builds custom attribution models and dashboards that actually tell the truth.',
    emoji: '📊'
  },
  {
    name: 'Kavya Singh',
    role: 'Creative Strategist',
    bio: 'Award-winning copywriter and creative director. Specializes in direct-response content that converts.',
    emoji: '🎨'
  }
]

const VALUES = [
  { icon: Target, title: 'Results First', desc: 'We measure everything. If it doesn\'t move the needle, we don\'t do it.' },
  { icon: Heart, title: 'Client Obsessed', desc: 'Your business goals become our business goals. We win when you win.' },
  { icon: Eye, title: 'Radical Transparency', desc: 'You see every number, every decision, every test. No black boxes.' },
  { icon: Award, title: 'Continuous Learning', desc: 'Marketing changes fast. We study, test, and evolve constantly to stay ahead.' }
]

export default function AboutPage() {
  return (
    <PageWrapper>
      <Helmet>
        <title>About Us – To Fly Media | Digital Marketing Agency Bhopal</title>
        <meta name="description" content="Learn about To Fly Media – Bhopal's fastest growing performance marketing agency. Our story, mission, and the team behind your results." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-brand-500/8 blur-[100px] pointer-events-none" />
        <div className="container-site relative z-10">
          <div className="max-w-4xl">
            <SectionTag icon={Users}>Our Story</SectionTag>
            <h1 className="section-heading text-white text-5xl md:text-7xl mt-4 mb-6">
              We Didn't Start an Agency.<br />
              <span className="gradient-text">We Built a Growth Engine.</span>
            </h1>
            <p className="text-xl text-white/55 leading-relaxed max-w-2xl">
              To Fly Media was founded in Bhopal with one belief: digital marketing should be accountable to one thing — your business results. Not vanity metrics. Not pretty dashboards. Revenue.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <SectionWrapper className="container-site pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">How We Got Here</h2>
            <div className="space-y-5 text-white/55 leading-relaxed">
              <p>
                In 2019, our founder Arjun was running campaigns for a mid-size e-commerce brand and kept hitting the same wall: agencies promised results but delivered reports. Beautiful reports. Useless reports.
              </p>
              <p>
                He quit his cushy job and started To Fly Media with a simple promise — we will only take credit for what we actually achieve. That meant building systems, not just launching campaigns.
              </p>
              <p>
                Five years later, we've managed over ₹50 crore in ad spend, scaled 150+ brands, and built a team of specialists who care as much about your ROAS as you do.
              </p>
              <p>
                We're based in Bhopal, but our clients stretch from Mumbai to Singapore. Great marketing isn't about where you're based — it's about the quality of your thinking and the discipline of your execution.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: '2019', label: 'Founded in Bhopal' },
              { num: '150+', label: 'Brands Scaled' },
              { num: '₹50Cr+', label: 'Ad Spend Managed' },
              { num: '98%', label: 'Client Retention' }
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="metric-card aspect-square flex flex-col items-center justify-center rounded-2xl"
              >
                <div className="text-3xl font-black font-display gradient-text mb-2">{item.num}</div>
                <div className="text-xs text-white/45 text-center">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Mission & Vision */}
      <SectionWrapper className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/15 to-transparent pointer-events-none" />
        <div className="container-site relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-10">
              <div className="w-12 h-12 rounded-xl bg-brand-500/15 flex items-center justify-center mb-6">
                <Target size={24} className="text-brand-400" />
              </div>
              <div className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-3">Our Mission</div>
              <h3 className="text-2xl font-bold text-white mb-4">Make marketing accountable</h3>
              <p className="text-white/50 leading-relaxed">
                Every rupee you spend on marketing should have a measurable return. Our mission is to build marketing systems that are transparent, data-driven, and directly tied to your revenue — not to industry benchmarks or agency awards.
              </p>
            </div>
            <div className="glass-card p-10">
              <div className="w-12 h-12 rounded-xl bg-accent-500/15 flex items-center justify-center mb-6">
                <Eye size={24} className="text-accent-400" />
              </div>
              <div className="text-xs font-semibold text-accent-400 uppercase tracking-widest mb-3">Our Vision</div>
              <h3 className="text-2xl font-bold text-white mb-4">India's most trusted growth partner</h3>
              <p className="text-white/50 leading-relaxed">
                We want to be the agency that founders and CMOs trust with their most important growth challenges — not because we're the biggest, but because we're the most reliable, most transparent, and most results-obsessed team in the room.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper className="container-site py-24">
        <div className="text-center mb-14">
          <SectionTag>What Drives Us</SectionTag>
          <h2 className="section-heading text-white mt-2">Our Core <span className="gradient-text">Values</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-7"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-500/10 flex items-center justify-center mb-5">
                <v.icon size={20} className="text-brand-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{v.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Team */}
      <SectionWrapper className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/15 to-transparent pointer-events-none" />
        <div className="container-site relative z-10">
          <div className="text-center mb-14">
            <SectionTag>The People</SectionTag>
            <h2 className="section-heading text-white mt-2">Meet the <span className="gradient-text">Team</span></h2>
            <p className="text-white/45 mt-4 max-w-lg mx-auto">
              Specialists, not generalists. Every team member is best-in-class at their specific discipline.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card-hover p-7"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500/20 to-brand-700/20 border border-brand-500/20 flex items-center justify-center text-3xl mb-5">
                  {member.emoji}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <div className="text-sm text-brand-400 font-medium mb-4">{member.role}</div>
                <p className="text-white/45 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Office location */}
      <SectionWrapper className="container-site pb-24">
        <div className="glass-card p-10 flex flex-col md:flex-row items-start gap-8">
          <div className="w-12 h-12 rounded-xl bg-brand-500/15 flex items-center justify-center shrink-0">
            <MapPin size={24} className="text-brand-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">Proudly Based in Bhopal</h3>
            <p className="text-white/50 leading-relaxed max-w-2xl">
              Our office is in the heart of Bhopal, Madhya Pradesh. While we serve clients across India and internationally, we're deeply rooted in the Central Indian business ecosystem. We understand the market, the culture, and the ambition of brands here.
            </p>
            <div className="mt-6 flex items-center gap-2 text-white/40 text-sm">
              <MapPin size={14} className="text-brand-400" />
              <span>Bhopal, Madhya Pradesh, India – 462001</span>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <CTABanner />
    </PageWrapper>
  )
}
