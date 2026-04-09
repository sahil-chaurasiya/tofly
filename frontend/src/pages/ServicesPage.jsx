// ServicesPage.jsx
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { Zap } from 'lucide-react'
import { publicAPI } from '../utils/api'
import { PageWrapper, SectionWrapper, SectionTag, ServiceCard, SkeletonCard, CTABanner } from '../components/common'

export function ServicesPage() {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () => publicAPI.getServices(),
    select: res => res.data.services
  })

  return (
    <PageWrapper>
      <Helmet>
        <title>Our Services – Performance Marketing, Lead Gen, Paid Ads | To Fly Media</title>
        <meta name="description" content="Explore To Fly Media's full range of digital marketing services: Performance Marketing, Lead Generation, Social Media, Paid Advertising, and Affiliate Marketing." />
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
            Every service we offer is designed around one outcome: growing your revenue. Pick one, or let us build your full growth stack.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <SectionWrapper className="container-site pb-24">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(services || []).map((service, i) => (
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
