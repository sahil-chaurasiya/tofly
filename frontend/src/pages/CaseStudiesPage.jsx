import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { BarChart2 } from 'lucide-react'
import { publicAPI } from '../utils/api'
import { PageWrapper, SectionWrapper, SectionTag, CaseStudyCard, SkeletonCard, CTABanner } from '../components/common'

export default function CaseStudiesPage() {
  const { data: caseStudies, isLoading } = useQuery({
    queryKey: ['case-studies'],
    queryFn: () => publicAPI.getCaseStudies(),
    select: res => res.data.caseStudies
  })

  return (
    <PageWrapper>
      <Helmet>
        <title>Case Studies – Real Results from To Fly Media</title>
        <meta name="description" content="See how To Fly Media has helped brands achieve 3x-10x growth with performance marketing. Real numbers, real results." />
      </Helmet>

      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-500/8 blur-[100px] pointer-events-none" />
        <div className="container-site relative z-10 text-center">
          <SectionTag icon={BarChart2}>Proof of Work</SectionTag>
          <h1 className="section-heading text-white text-5xl md:text-7xl mt-4 mb-6">
            Our Work, <span className="gradient-text">Their Results</span>
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Real campaigns. Real brands. Real numbers. No case study is published without the client's verified results.
          </p>
        </div>
      </section>

      <SectionWrapper className="container-site pb-24">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1,2,3,4].map(i => <SkeletonCard key={i} className="h-96" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(caseStudies || []).map((cs, i) => (
              <CaseStudyCard key={cs._id} cs={cs} delay={i * 0.1} />
            ))}
          </div>
        )}

        {!isLoading && (!caseStudies || caseStudies.length === 0) && (
          <div className="text-center py-24">
            <p className="text-white/30 text-lg">Case studies coming soon...</p>
          </div>
        )}
      </SectionWrapper>

      <CTABanner />
    </PageWrapper>
  )
}
