import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Star, Calendar, Clock, TrendingUp } from 'lucide-react'

// ── PageWrapper: handles entry animation ──────────────────────
export function PageWrapper({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── SectionWrapper: animate section when scrolled into view ──
export function SectionWrapper({ children, className = '', delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// ── SectionTag ────────────────────────────────────────────────
export function SectionTag({ children, icon: Icon }) {
  return (
    <div className="section-tag w-fit mb-4">
      {Icon && <Icon size={13} />}
      {children}
    </div>
  )
}

// ── Skeleton loaders ──────────────────────────────────────────
export function SkeletonCard({ className = '' }) {
  return (
    <div className={`glass-card p-6 space-y-4 ${className}`}>
      <div className="skeleton h-5 w-3/4" />
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-5/6" />
      <div className="skeleton h-4 w-2/3" />
      <div className="skeleton h-10 w-28 mt-4" />
    </div>
  )
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-4"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  )
}

// ── Service Card — editorial capability-index entry ─────────────
export function ServiceCard({ service, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Link to={`/services/${service.slug}`} className="group block h-full p-7 border border-line bg-paper-50 hover:border-brand-500 transition-colors duration-400">
        <div className="flex items-center justify-between mb-8">
          <TrendingUp size={20} className="text-stone-400 group-hover:text-brand-500 transition-colors" />
          <ArrowUpRight size={18} className="text-ink-900 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </div>
        <h3 className="font-display text-2xl text-ink-900 mb-3 group-hover:text-brand-500 transition-colors">
          {service.title}
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed mb-5">
          {service.shortDescription}
        </p>
        <div className="flex items-center gap-2 text-ink-900 text-sm font-medium">
          <span className="border-b border-ink-900 group-hover:border-brand-500 group-hover:text-brand-500 transition-colors">Learn more</span>
        </div>
      </Link>
    </motion.div>
  )
}

// ── Testimonial Card — editorial quote block ────────────────────
export function TestimonialCard({ testimonial, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="border border-line bg-paper-50 p-8 h-full flex flex-col"
    >
      {/* Result metric badge */}
      {testimonial.resultMetric && (
        <div className="eyebrow text-brand-500 mb-5">
          {testimonial.resultMetric}
        </div>
      )}

      <blockquote className="font-display text-2xl leading-snug text-ink-900 flex-1 mb-6">
        &ldquo;{testimonial.testimonial}&rdquo;
      </blockquote>

      <div className="flex items-center justify-between pt-5 border-t border-line">
        <div>
          <div className="text-sm font-semibold text-ink-900">{testimonial.name}</div>
          <div className="text-xs text-stone-400">{testimonial.designation}{testimonial.company ? `, ${testimonial.company}` : ''}</div>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
            <Star key={i} size={12} className="text-brand-500 fill-brand-500" />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ── Blog Card — editorial journal entry ──────────────────────────
export function BlogCard({ blog, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Link to={`/blog/${blog.slug}`} className="block group">
        {/* Cover image */}
        <div
          className="aspect-[4/3] overflow-hidden mb-5 relative"
          style={!blog.coverImage ? { background: 'linear-gradient(145deg, #eef1ff 0%, #dce3ff 55%, #b6c2ff 100%)' } : undefined}
        >
          {blog.coverImage ? (
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover scale-[1.04] group-hover:scale-100 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(49, 87, 255, 0.14)' }}>
                <TrendingUp size={22} className="text-brand-500" />
              </div>
            </div>
          )}
        </div>

        {/* Category */}
        <span className="eyebrow text-brand-500">
          {blog.category}
        </span>

        <h3 className="font-display text-2xl text-ink-900 mt-2 mb-3 leading-snug group-hover:text-brand-500 transition-colors line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {blog.excerpt}
        </p>

        <div className="flex items-center gap-4 text-xs text-stone-400">
          {blog.publishedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          )}
          {blog.readTime && (
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {blog.readTime} min read
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

// ── CaseStudy Card — portfolio composition ────────────────────────
export function CaseStudyCard({ cs, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Link to={`/case-studies/${cs.slug}`} className="block group">
        <div className="aspect-[4/3] overflow-hidden relative mb-5" style={{ background: 'linear-gradient(155deg, #1c2340 0%, #2a3568 100%)' }}>
          {cs.coverImage ? (
            <img src={cs.coverImage} alt={cs.title} className="w-full h-full object-cover opacity-90 scale-[1.05] group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 ease-out" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="text-center">
                <div className="font-display text-5xl" style={{ color: '#F5F3EE' }}>
                  {cs.results?.[0]?.value || '+300%'}
                </div>
                <div className="text-xs mt-1" style={{ color: 'rgba(245,243,238,0.4)' }}>{cs.results?.[0]?.metric}</div>
              </div>
            </div>
          )}
          {cs.client?.industry && (
            <div className="absolute top-4 left-4 eyebrow px-3 py-1 rounded-full" style={{ backgroundColor: '#F5F3EE', color: '#111111' }}>{cs.client.industry}</div>
          )}
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: '#F5F3EE' }}>
            <ArrowUpRight size={18} className="text-ink-900" />
          </div>
        </div>

        <h3 className="font-display text-2xl text-ink-900 mb-3 leading-snug group-hover:text-brand-500 transition-colors line-clamp-2">
          {cs.title}
        </h3>

        {cs.results?.length > 0 && (
          <div className="flex flex-wrap gap-x-6 gap-y-1 mb-1">
            {cs.results.slice(0, 2).map((r, i) => (
              <div key={i} className="flex items-baseline gap-1.5">
                <span className="font-display text-lg text-brand-500">{r.value}</span>
                <span className="text-xs text-stone-400">{r.metric}</span>
              </div>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  )
}

// ── MetricsCounter — editorial statistic ────────────────────────
export function MetricCounter({ value, label, suffix = '' }) {
  return (
    <div className="metric-card">
      <div className="font-display text-5xl md:text-6xl text-ink-900 mb-2">
        {value}{suffix}
      </div>
      <div className="text-sm text-stone-500">{label}</div>
    </div>
  )
}

// ── CTABanner — editorial closing statement ──────────────────────
export function CTABanner() {
  return (
    <SectionWrapper className="container-site pb-24">
      <div
        className="relative overflow-hidden text-center"
        style={{ background: '#EFEBE1', border: '1px solid #D8D5CE', padding: '64px 32px' }}
      >
        <div className="relative z-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase mx-auto mb-6"
            style={{
              border: '1px solid #D8D5CE',
              color: '#6B6A65',
              borderRadius: 999,
              letterSpacing: '0.1em',
              width: 'fit-content',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Ready to Scale?
          </div>
          <h2
            className="mb-6"
            style={{
              fontFamily: "'Instrument Serif', 'DM Serif Display', serif",
              fontWeight: 400,
              fontSize: 'clamp(2.6rem, 6vw, 5.2rem)',
              lineHeight: 0.98,
              color: '#111111',
            }}
          >
            Let&apos;s Build Your<br />
            <span style={{ color: '#3157FF' }}>Growth Machine</span>
          </h2>
          <p
            className="text-lg max-w-xl mx-auto mb-10"
            style={{ color: '#6B6A65' }}
          >
            Get a free marketing audit and a custom growth strategy tailored for your business.
            No fluff. Just a clear plan to scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold transition-all duration-300"
              style={{ background: '#111111', color: '#F5F3EE', border: '1px solid #111111', borderRadius: 2 }}
            >
              Get Free Audit
              <ArrowRight size={18} />
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi%2C+I'd+like+a+free+marketing+audit+for+my+business."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold transition-all duration-300"
              style={{ background: 'transparent', color: '#111111', border: '1px solid #111111', borderRadius: 2 }}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}