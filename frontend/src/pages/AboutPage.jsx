import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Heart, Target, Eye, Award, MapPin, Users } from 'lucide-react'
import { PageWrapper, SectionWrapper, SectionTag, CTABanner } from '../components/common'

const VALUES = [
  { icon: Target, title: 'Results First', desc: "We measure everything. If it doesn't move the needle, we don't do it." },
  { icon: Heart, title: 'Client Obsessed', desc: 'Your business goals become our business goals. We win when you win.' },
  { icon: Eye, title: 'Radical Transparency', desc: 'You see every number, every decision, every test. No black boxes.' },
  { icon: Award, title: 'Continuous Learning', desc: 'Marketing changes fast. We study, test, and evolve constantly to stay ahead.' }
]

const TIMELINE = [
  {
    year: '2018',
    title: 'Founded in Bhopal',
    desc: 'Two marketers, a designer, one laptop. A mission to bring design-first marketing to Indian brands.',
  },
  {
    year: '2019',
    title: 'First 10 Clients',
    desc: 'All from referrals. Word of mouth is still our biggest source of business — the work speaks.',
  },
  {
    year: '2020',
    title: 'In-House Design Studio',
    desc: 'Added a full creative team. Design and marketing integrated under one roof from this point on.',
  },
  {
    year: '2021',
    title: 'Team of 15+',
    desc: 'Senior strategists, lead designers, analysts. Moved into our Bhopal creative studio.',
  },
  {
    year: '2022',
    title: '₹10Cr+ Client Revenue',
    desc: 'Campaigns managed by ToFly generated over ₹10 crore in revenue for our clients.',
  },
  {
    year: '2023',
    title: 'Pan-India Reach',
    desc: 'Clients across Mumbai, Delhi, Bengaluru and beyond. 50+ active brand partnerships.',
  },
  {
    year: '2024',
    title: 'Full 360° Platform',
    desc: 'Design, digital marketing, content, and web — fully integrated. One team, one vision, one invoice.',
  },
]

// ─────────────────────────────────────────────────────────────
// ABOUT HERO COLLAGE — 4 team-relevant photos
// ─────────────────────────────────────────────────────────────
const collagePhotos = [
  { src: '/hero/1.jpeg',      alt: 'The Team',      width: '210px', aspect: '4/3', rotate: '-7deg',  top: '3%',   left: '2%',  zIndex: 4, label: 'The Team'    },
  { src: '/hero/2 (1).webp', alt: 'Strategy',       width: '185px', aspect: '4/3', rotate: '6deg',   top: '0%',   left: '44%', zIndex: 3, label: 'Our Studio'  },
  { src: '/hero/3.jpeg',      alt: 'Our Studio',     width: '168px', aspect: '1/1', rotate: '-4deg',  top: '50%',  left: '4%',  zIndex: 5, label: 'Workshop'    },
  { src: '/hero/4 (1).jpg',  alt: 'Collaboration',  width: '178px', aspect: '1/1', rotate: '8deg',   top: '54%',  left: '46%', zIndex: 2, label: 'Collaboration' },
]

const floatingBadges = [
  { text: '200+', sub: 'Brands Scaled',    top: '10%',  left: '54%', rotate: '-3deg', zIndex: 8, accent: true  },
  { text: '98%',  sub: 'Client Retention', top: '78%',  left: '24%', rotate: '5deg',  zIndex: 8, accent: false },
  { text: '6 Yrs', sub: 'Of Growth',       top: '62%',  left: '66%', rotate: '-4deg', zIndex: 9, accent: true  },
]

function AboutHeroCollage() {
  return (
    <div className="relative w-full select-none" style={{ height: 560 }}>

      {/* Photos */}
      {collagePhotos.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.84 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{
            scale: 1.1,
            zIndex: 40,
            rotate: 0,
            boxShadow: '14px 20px 60px rgba(0,0,0,0.65), 0 0 28px rgba(51,105,255,0.2)',
            transition: { duration: 0.22, ease: 'easeOut' },
          }}
          transition={{ duration: 0.72, delay: 0.1 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            width: p.width,
            top: p.top,
            left: p.left,
            zIndex: p.zIndex,
            rotate: p.rotate,
            background: 'white',
            padding: '9px 9px 28px',
            boxShadow: '6px 10px 34px rgba(0,0,0,0.5)',
            cursor: 'pointer',
          }}
        >
          <img
            src={p.src}
            alt={p.alt}
            draggable={false}
            style={{
              display: 'block',
              width: '100%',
              objectFit: 'cover',
              aspectRatio: p.aspect,
              height: p.aspect === '1/1' ? p.width : undefined,
            }}
            loading={i < 2 ? 'eager' : 'lazy'}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <span style={{
            position: 'absolute',
            bottom: 5, left: 0, right: 0,
            textAlign: 'center',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 10.5,
            fontWeight: 500,
            color: 'rgba(100,80,60,0.75)',
            letterSpacing: '0.04em',
          }}>
            {p.label}
          </span>
        </motion.div>
      ))}

      {/* Floating stat badges */}
      {floatingBadges.map((b, i) => (
        <motion.div
          key={`badge-${i}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.12,
            zIndex: 50,
            rotate: 0,
            boxShadow: '0 10px 36px rgba(0,0,0,0.6)',
            transition: { duration: 0.2 },
          }}
          transition={{ duration: 0.55, delay: 0.6 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: b.top,
            left: b.left,
            zIndex: b.zIndex,
            rotate: b.rotate,
            background: b.accent
              ? 'linear-gradient(135deg, rgba(249,115,22,0.18) 0%, rgba(12,8,3,0.92) 100%)'
              : 'linear-gradient(135deg, rgba(51,105,255,0.18) 0%, rgba(3,3,18,0.92) 100%)',
            border: b.accent
              ? '1px solid rgba(249,115,22,0.35)'
              : '1px solid rgba(51,105,255,0.3)',
            borderRadius: 14,
            padding: '10px 18px',
            backdropFilter: 'blur(14px)',
            cursor: 'default',
            minWidth: 86,
            textAlign: 'center',
            boxShadow: '4px 6px 28px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 20,
            color: b.accent ? '#f97316' : '#7da8ff',
            lineHeight: 1.1,
          }}>
            {b.text}
          </div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 10,
            fontWeight: 500,
            color: 'rgba(248,250,255,0.48)',
            marginTop: 3,
            letterSpacing: '0.04em',
          }}>
            {b.sub}
          </div>
        </motion.div>
      ))}

    </div>
  )
}

export default function AboutPage() {
  return (
    <PageWrapper>
      <Helmet>
        <title>About Us – To Fly Media | Digital Marketing Agency Bhopal</title>
        <meta name="description" content="Learn about To Fly Media – Bhopal's fastest growing performance marketing agency. Our story, mission, and the team behind your results." />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-500/8 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: 'rgba(249,115,22,0.06)' }} />

        <div className="container-site relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-20 items-center" style={{ minHeight: 520 }}>

            {/* Left copy */}
            <div className="max-w-xl">
              <SectionTag icon={Users}>Our Story</SectionTag>
              <h1 className="section-heading text-white text-5xl md:text-6xl xl:text-7xl mt-4 mb-6 leading-[1.05]">
                We Didn't Start an Agency.<br />
                <span className="gradient-text">We Built a Growth Engine.</span>
              </h1>
              <p className="text-xl text-white/55 leading-relaxed">
                To Fly Media was founded in Bhopal with one belief: digital marketing should be accountable to one thing — your business results. Not vanity metrics. Not pretty dashboards. Revenue.
              </p>
            </div>

            {/* Right collage */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <AboutHeroCollage />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────────── */}
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
                Five years later, we've managed over ₹50 crore in ad spend, scaled 200+ brands, and built a team of specialists who care as much about your ROAS as you do.
              </p>
              <p>
                We're based in Bhopal, but our clients stretch from Mumbai to Singapore. Great marketing isn't about where you're based — it's about the quality of your thinking and the discipline of your execution.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: '2022', label: 'Founded in Bhopal' },
              { num: '200+', label: 'Brands Scaled' },
              { num: '₹1Cr+', label: 'Ad Spend Managed' },
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

      {/* ── Our Journey Timeline ──────────────────────────────── */}
      <SectionWrapper className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent pointer-events-none" />
        <div className="container-site relative z-10">

          {/* Heading */}
          <div className="text-center mb-20">
            <SectionTag>Our Journey</SectionTag>
            <h2 className="section-heading text-white mt-2">
              Six Years of <span className="gradient-text">Compounding Growth</span>
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">

            {/* Central spine line */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden lg:block"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(51,105,255,0.35) 10%, rgba(51,105,255,0.35) 90%, transparent)' }}
            />

            <div className="space-y-10">
              {TIMELINE.map((item, i) => {
                const isLeft = i % 2 === 0
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: isLeft ? -32 : 32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-center`}
                  >
                    {/* Card — alternates sides on desktop */}
                    <div className={`${isLeft ? 'lg:pr-16 lg:text-right lg:order-1' : 'lg:col-start-2 lg:pl-16 lg:order-2'}`}>
                      <div
                        className="glass-card p-7 group cursor-default transition-all duration-300 hover:border-brand-500/30"
                        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(51,105,255,0.06)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                      >
                        {/* Year pill */}
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-4 ${isLeft ? 'lg:ml-auto' : ''}`}
                          style={{
                            background: i === TIMELINE.length - 1
                              ? 'linear-gradient(135deg, rgba(249,115,22,0.18), rgba(249,115,22,0.06))'
                              : 'rgba(51,105,255,0.12)',
                            border: i === TIMELINE.length - 1
                              ? '1px solid rgba(249,115,22,0.3)'
                              : '1px solid rgba(51,105,255,0.25)',
                            color: i === TIMELINE.length - 1 ? '#f97316' : '#7da8ff',
                          }}
                        >
                          {item.year}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>

                    {/* Centre dot on the spine (desktop only) */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full items-center justify-center"
                      style={{ background: '#03030a', border: '2px solid rgba(51,105,255,0.55)', boxShadow: '0 0 12px rgba(51,105,255,0.4)', zIndex: 2 }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                    </div>

                    {/* Empty placeholder col for the opposite side */}
                    <div className={`hidden lg:block ${isLeft ? 'lg:order-2' : 'lg:col-start-1 lg:order-1'}`} />

                  </motion.div>
                )
              })}
            </div>

            {/* End cap dot */}
            <div className="hidden lg:flex justify-center mt-8">
              <div
                className="w-5 h-5 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #f97316, #3369ff)',
                  boxShadow: '0 0 16px rgba(249,115,22,0.5)',
                }}
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Mission & Vision ──────────────────────────────────── */}
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

      {/* ── Values ───────────────────────────────────────────── */}
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

      {/* ── Location & Reach ───────────────────────────────────── */}
<SectionWrapper className="container-site pb-24">
  <div className="glass-card p-10 flex flex-col md:flex-row items-start gap-8">
    <div className="w-12 h-12 rounded-xl bg-brand-500/15 flex items-center justify-center shrink-0">
      <MapPin size={24} className="text-brand-400" />
    </div>
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-white">
        Rooted in Bhopal. <span className="gradient-text">Serving Everywhere.</span>
      </h3>
      <p className="text-white/50 leading-relaxed max-w-2xl">
        Bhopal is where we started, where our creative studio lives, and where our culture was built. 
        But we’re not confined by geography. With office hubs in Mumbai, Delhi, and Ahmedabad — 
        plus a remote‑first team — we work with brands across India and international markets. 
        Great marketing isn’t about where you sit; it’s about the clarity of your strategy and 
        the discipline of your execution.
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/40 text-sm">
        <div className="flex items-center gap-1">
          <MapPin size={14} className="text-brand-400" />
          <span>HQ: Bhopal, MP – 462024</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={14} className="text-brand-400 opacity-70" />
          <span>Mumbai</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={14} className="text-brand-400 opacity-70" />
          <span>Delhi</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={14} className="text-brand-400 opacity-70" />
          <span>Ahmedabad</span>
        </div>
        <span className="text-accent-400 text-xs font-medium tracking-wide ml-2">+ Remote‑First</span>
      </div>
    </div>
  </div>
</SectionWrapper>

      <CTABanner />
    </PageWrapper>
  )
}