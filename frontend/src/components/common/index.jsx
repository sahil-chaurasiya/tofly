import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Calendar, Clock, TrendingUp } from 'lucide-react'

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
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
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
      {Icon && <Icon size={14} />}
      {children}
    </div>
  )
}

// ── Skeleton loaders ──────────────────────────────────────────
export function SkeletonCard({ className = '' }) {
  return (
    <div className={`glass-card p-6 space-y-4 ${className}`}>
      <div className="skeleton h-5 w-3/4 rounded" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-5/6 rounded" />
      <div className="skeleton h-4 w-2/3 rounded" />
      <div className="skeleton h-10 w-28 rounded-lg mt-4" />
    </div>
  )
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-4 rounded"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  )
}

// ── Service Card ──────────────────────────────────────────────
export function ServiceCard({ service, delay = 0 }) {
  const icons = {
    TrendingUp: TrendingUp,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
    >
      <Link to={`/services/${service.slug}`} className="glass-card-hover block p-7 h-full group">
        <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-5 group-hover:bg-brand-500/20 group-hover:border-brand-500/40 transition-all duration-300">
          <TrendingUp size={22} className="text-brand-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-300 transition-colors">
          {service.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-5">
          {service.shortDescription}
        </p>
        <div className="flex items-center gap-2 text-brand-400 text-sm font-medium">
          <span>Learn more</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </Link>
    </motion.div>
  )
}

// ── Testimonial Card ──────────────────────────────────────────
export function TestimonialCard({ testimonial, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-7 h-full flex flex-col"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
          <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Result metric badge */}
      {testimonial.resultMetric && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 w-fit"
          style={{ background: 'rgba(51,105,255,0.1)', border: '1px solid rgba(51,105,255,0.2)', color: '#7da8ff' }}>
          <TrendingUp size={11} />
          {testimonial.resultMetric}
        </div>
      )}

      <blockquote className="text-white/65 text-sm leading-relaxed flex-1 mb-6 italic">
        "{testimonial.testimonial}"
      </blockquote>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500/30 to-brand-700/30 border border-brand-500/20 flex items-center justify-center text-sm font-bold text-brand-300">
          {testimonial.name?.[0] || 'C'}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{testimonial.name}</div>
          <div className="text-xs text-white/40">{testimonial.designation}{testimonial.company ? `, ${testimonial.company}` : ''}</div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Blog Card ─────────────────────────────────────────────────
export function BlogCard({ blog, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Link to={`/blog/${blog.slug}`} className="glass-card-hover block group overflow-hidden">
        {/* Cover image */}
        <div className="aspect-[16/9] bg-gradient-to-br from-brand-900/50 to-dark-800 overflow-hidden">
          {blog.coverImage ? (
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-brand-500/15 flex items-center justify-center">
                <TrendingUp size={24} className="text-brand-400/50" />
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          {/* Category */}
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">
            {blog.category}
          </span>

          <h3 className="text-lg font-bold text-white mt-2 mb-3 leading-snug group-hover:text-brand-300 transition-colors line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-white/45 text-sm leading-relaxed mb-4 line-clamp-2">
            {blog.excerpt}
          </p>

          <div className="flex items-center gap-4 text-xs text-white/30">
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
        </div>
      </Link>
    </motion.div>
  )
}

// ── CaseStudy Card ────────────────────────────────────────────
export function CaseStudyCard({ cs, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Link to={`/case-studies/${cs.slug}`} className="glass-card-hover block group overflow-hidden">
        <div className="aspect-[16/9] bg-gradient-to-br from-brand-900/30 to-dark-800 overflow-hidden relative">
          {cs.coverImage ? (
            <img src={cs.coverImage} alt={cs.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="text-center">
                <div className="text-4xl font-black font-display gradient-text">
                  {cs.results?.[0]?.value || '+300%'}
                </div>
                <div className="text-xs text-white/30 mt-1">{cs.results?.[0]?.metric}</div>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent" />
          {cs.client?.industry && (
            <div className="absolute top-4 left-4 section-tag text-xs">{cs.client.industry}</div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-brand-300 transition-colors line-clamp-2">
            {cs.title}
          </h3>

          {cs.results?.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {cs.results.slice(0, 2).map((r, i) => (
                <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(51,105,255,0.06)', border: '1px solid rgba(51,105,255,0.15)' }}>
                  <div className="text-xl font-black font-display text-brand-400">{r.value}</div>
                  <div className="text-xs text-white/40 mt-0.5">{r.metric}</div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 text-brand-400 text-sm font-medium">
            <span>Read case study</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ── MetricsCounter ────────────────────────────────────────────
export function MetricCounter({ value, label, suffix = '' }) {
  return (
    <div className="metric-card">
      <div className="text-4xl md:text-5xl font-black font-display gradient-text mb-2">
        {value}{suffix}
      </div>
      <div className="text-sm text-white/50">{label}</div>
    </div>
  )
}

// ── CTABanner ─────────────────────────────────────────────────
export function CTABanner() {
  return (
    <SectionWrapper className="container-site pb-24">
      <div className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(51,105,255,0.15) 0%, rgba(19,28,87,0.4) 50%, rgba(51,105,255,0.1) 100%)',
          border: '1px solid rgba(51,105,255,0.25)'
        }}>
        {/* Glow orbs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-accent-500/8 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="section-tag w-fit mx-auto mb-6">Ready to Scale?</div>
          <h2 className="section-heading text-white mb-5">
            Let's Build Your<br />
            <span className="gradient-text">Growth Machine</span>
          </h2>
          <p className="text-white/55 text-lg max-w-xl mx-auto mb-10">
            Get a free marketing audit and a custom growth strategy tailored for your business.
            No fluff. Just a clear plan to scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary text-base px-8 py-3.5">
              Get Free Audit
              <ArrowRight size={18} />
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi%2C+I'd+like+a+free+marketing+audit+for+my+business."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base px-8 py-3.5"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
