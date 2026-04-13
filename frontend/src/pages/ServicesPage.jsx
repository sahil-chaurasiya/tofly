import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  Zap, ArrowRight, Layers, Globe, Share2, Target,
  Users, Palette, Search, MessageSquare, Phone
} from 'lucide-react'
import { publicAPI } from '../utils/api'
import { PageWrapper, SectionWrapper, SectionTag, ServiceCard, CTABanner } from '../components/common'
import { STATIC_SERVICES } from '../data/services'

const ICON_MAP = {
  Layers, Globe, Share2, Target, Users, Palette, Search, MessageSquare, Phone,
}

function StaticServiceCard({ service, delay = 0 }) {
  const Icon = ICON_MAP[service.icon] || Zap
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        to={`/services/${service.slug}`}
        className="glass-card-hover block p-7 group"
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-5 group-hover:bg-brand-500/20 group-hover:border-brand-500/40 transition-all duration-300">
          <Icon size={22} className="text-brand-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-300 transition-colors">
          {service.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-5 flex-1">
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

export function ServicesPage() {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () => publicAPI.getServices(),
    select: res => res.data.services
  })

  const displayServices = services && services.length > 0 ? services : null
  const useStatic = !isLoading && !displayServices

  return (
    <PageWrapper>
      <Helmet>
        <title>Our Services – Brand Strategy, Social Media, Ads, SEO & More | To Fly Media</title>
        <meta name="description" content="Explore To Fly Media's full range of digital marketing services: Brand Strategy, Website Development, Social Media Marketing, Google & Meta Ads, SEO, WhatsApp Marketing, and more." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-500/8 blur-[100px] pointer-events-none" />
        <div className="container-site relative z-10 text-center">
          <SectionTag icon={Zap}>What We Offer</SectionTag>
          <h1 className="section-heading text-white text-5xl md:text-7xl mt-4 mb-6">
            Services Built for <span className="gradient-text">Scale</span>
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Every service we offer is designed around one outcome: growing your revenue.
            Pick one, or let us build your full growth stack.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <SectionWrapper className="container-site pb-24">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="glass-card p-6 space-y-4">
                <div className="skeleton h-5 w-3/4 rounded" />
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-5/6 rounded" />
              </div>
            ))}
          </div>
        ) : useStatic ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STATIC_SERVICES.map((service, i) => (
              <StaticServiceCard key={service.slug} service={service} delay={i * 0.07} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service, i) => (
              <ServiceCard key={service._id} service={service} delay={i * 0.08} />
            ))}
          </div>
        )}
      </SectionWrapper>

      <CTABanner />
    </PageWrapper>
  )
}

export default ServicesPage