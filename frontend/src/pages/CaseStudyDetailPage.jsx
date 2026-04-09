import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react'
import { publicAPI } from '../utils/api'
import { PageWrapper, SectionWrapper, CTABanner, SkeletonText } from '../components/common'

export default function CaseStudyDetailPage() {
  const { slug } = useParams()

  const { data: caseStudy, isLoading, isError } = useQuery({
    queryKey: ['case-study', slug],
    queryFn: () => publicAPI.getCaseStudy(slug),
    select: res => res.data.caseStudy
  })

  if (isLoading) return (
    <PageWrapper>
      <div className="container-site pt-36 pb-24 max-w-4xl"><SkeletonText lines={8} /></div>
    </PageWrapper>
  )

  if (isError || !caseStudy) return (
    <PageWrapper>
      <div className="container-site pt-36 pb-24 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Case Study Not Found</h1>
        <Link to="/case-studies" className="btn-primary">Back to Case Studies</Link>
      </div>
    </PageWrapper>
  )

  return (
    <PageWrapper>
      <Helmet>
        <title>{caseStudy.metaTitle || `${caseStudy.title} – To Fly Media`}</title>
        <meta name="description" content={caseStudy.metaDescription || `See how To Fly Media helped ${caseStudy.client?.name} achieve outstanding growth results.`} />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-500/8 blur-[100px] pointer-events-none" />
        <div className="container-site relative z-10">
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm mb-10 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Case Studies
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {caseStudy.client?.industry && (
              <span className="section-tag">{caseStudy.client.industry}</span>
            )}
            {caseStudy.duration && (
              <span className="flex items-center gap-1.5 text-white/35 text-sm">
                <Clock size={13} /> {caseStudy.duration}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white max-w-4xl leading-tight mb-8">
            {caseStudy.title}
          </h1>

          {/* Results hero strip */}
          {caseStudy.results?.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {caseStudy.results.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="metric-card"
                >
                  <div className="text-3xl font-black font-display gradient-text mb-1">{r.value}</div>
                  <div className="text-xs text-white/45 font-medium">{r.metric}</div>
                  {r.description && (
                    <div className="text-xs text-white/25 mt-1">{r.description}</div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <SectionWrapper className="container-site pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">The Challenge</h2>
              <p className="text-white/55 leading-relaxed">{caseStudy.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Solution</h2>
              <p className="text-white/55 leading-relaxed">{caseStudy.solution}</p>
            </div>
            {caseStudy.approach && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">The Approach</h2>
                <p className="text-white/55 leading-relaxed">{caseStudy.approach}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {caseStudy.client && (
              <div className="glass-card p-6">
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Client</h3>
                <div className="text-white font-semibold">{caseStudy.client.name}</div>
                {caseStudy.client.industry && (
                  <div className="text-white/40 text-sm mt-1">{caseStudy.client.industry}</div>
                )}
              </div>
            )}

            {caseStudy.services?.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Services Used</h3>
                <ul className="space-y-2">
                  {caseStudy.services.map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/60 text-sm">
                      <CheckCircle size={13} className="text-brand-400" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="glass-card p-6">
              <p className="text-white/50 text-sm mb-4">Want results like these for your business?</p>
              <Link to="/contact" className="btn-primary w-full justify-center text-sm">
                Let's Talk
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <CTABanner />
    </PageWrapper>
  )
}
