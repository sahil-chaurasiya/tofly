import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  CheckCircle, ArrowRight,
  Layers, Globe, Share2, Target,
  Users, Palette, Search, MessageSquare, Phone, Zap
} from 'lucide-react'
import { publicAPI } from '../utils/api'
import { PageWrapper, SectionWrapper, CTABanner, SkeletonText } from '../components/common'
import { getServiceBySlug } from '../data/services'

const ICON_MAP = {
  Layers, Globe, Share2, Target, Users, Palette, Search, MessageSquare, Phone,
}

function StaticServiceDetail({ service }) {
  const Icon = ICON_MAP[service.icon] || Zap

  return (
    <PageWrapper>
      <Helmet>
        <title>{service.title} – To Fly Media</title>
        <meta name="description" content={service.shortDescription} />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-500/8 blur-[100px] pointer-events-none" />
        <div className="container-site relative z-10">
          <nav className="flex items-center gap-2 text-sm text-white/30 mb-8">
            <Link to="/services" className="hover:text-white/60 transition-colors">Solutions</Link>
            <span>/</span>
            <span className="text-white/60">{service.title}</span>
          </nav>
          <div className="max-w-3xl">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-6">
              <Icon size={26} className="text-brand-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-xl text-white/55 leading-relaxed mb-8">
              {service.shortDescription}
            </p>
            <Link to="/contact" className="btn-primary text-base px-8 py-3.5">
              Get Started <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <SectionWrapper className="container-site pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main content */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-6">What's Included</h2>
            <p className="text-white/55 leading-relaxed text-lg mb-10">
              {service.description}
            </p>

            {service.features?.length > 0 && (
              <div className="space-y-5">
                {service.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="glass-card p-6 flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle size={16} className="text-brand-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-white/45 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Benefits sidebar */}
          {service.benefits?.length > 0 && (
            <div className="lg:col-span-1">
              <div className="glass-card p-7 sticky top-28">
                <h3 className="text-lg font-bold text-white mb-6">Why Choose Us</h3>
                <ul className="space-y-4">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/55 text-sm">
                      <CheckCircle size={15} className="text-green-400 shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-white/6">
                  <Link to="/contact" className="btn-primary w-full justify-center text-sm">
                    Start Now <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
      </SectionWrapper>

      <CTABanner />
    </PageWrapper>
  )
}

export default function ServiceDetailPage() {
  const { slug } = useParams()

  const { data: service, isLoading, isError } = useQuery({
    queryKey: ['service', slug],
    queryFn: () => publicAPI.getService(slug),
    select: res => res.data.service,
    retry: false,
  })

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="container-site pt-36 pb-24">
          <SkeletonText lines={6} />
        </div>
      </PageWrapper>
    )
  }

  // API returned a valid service — use it
  if (!isError && service) {
    return (
      <PageWrapper>
        <Helmet>
          <title>{service.metaTitle || `${service.title} – To Fly Media`}</title>
          <meta name="description" content={service.metaDescription || service.shortDescription} />
        </Helmet>

        <section className="relative pt-36 pb-20 overflow-hidden">
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-500/8 blur-[100px] pointer-events-none" />
          <div className="container-site relative z-10">
            <nav className="flex items-center gap-2 text-sm text-white/30 mb-8">
              <Link to="/services" className="hover:text-white/60 transition-colors">Solutions</Link>
              <span>/</span>
              <span className="text-white/60">{service.title}</span>
            </nav>
            <div className="max-w-3xl">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-6">
                <Zap size={26} className="text-brand-400" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6">{service.title}</h1>
              <p className="text-xl text-white/55 leading-relaxed mb-8">{service.shortDescription}</p>
              <Link to="/contact" className="btn-primary text-base px-8 py-3.5">
                Get Started <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <SectionWrapper className="container-site pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-white mb-6">What's Included</h2>
              <p className="text-white/55 leading-relaxed text-lg mb-10">{service.description}</p>
              {service.features?.length > 0 && (
                <div className="space-y-5">
                  {service.features.map((feature, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                      className="glass-card p-6 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-brand-500/15 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle size={16} className="text-brand-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                        <p className="text-white/45 text-sm">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            {service.benefits?.length > 0 && (
              <div className="lg:col-span-1">
                <div className="glass-card p-7 sticky top-28">
                  <h3 className="text-lg font-bold text-white mb-6">Why Choose Us</h3>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/55 text-sm">
                        <CheckCircle size={15} className="text-green-400 shrink-0 mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-white/6">
                    <Link to="/contact" className="btn-primary w-full justify-center text-sm">
                      Start Now <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SectionWrapper>
        <CTABanner />
      </PageWrapper>
    )
  }

  // API failed — try static data
  const staticService = getServiceBySlug(slug)
  if (staticService) {
    return <StaticServiceDetail service={staticService} />
  }

  // Nothing found at all
  return (
    <PageWrapper>
      <div className="container-site pt-36 pb-24 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Service Not Found</h1>
        <Link to="/services" className="btn-primary">Back to Solutions</Link>
      </div>
    </PageWrapper>
  )
}