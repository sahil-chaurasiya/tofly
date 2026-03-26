import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { Search, BookOpen } from 'lucide-react'
import { publicAPI } from '../utils/api'
import { PageWrapper, SectionWrapper, SectionTag, BlogCard, SkeletonCard } from '../components/common'

const CATEGORIES = [
  'All',
  'Performance Marketing',
  'Lead Generation',
  'Social Media',
  'Paid Ads',
  'SEO',
  'Business Growth',
  'Case Study',
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['blogs', activeCategory, search, page],
    queryFn: () => publicAPI.getBlogs({
      category: activeCategory !== 'All' ? activeCategory : undefined,
      search: search || undefined,
      page,
      limit: 9
    }),
    select: res => res.data
  })

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  const handleCategory = (cat) => {
    setActiveCategory(cat)
    setPage(1)
    setSearch('')
    setSearchInput('')
  }

  return (
    <PageWrapper>
      <Helmet>
        <title>Marketing Blog – Insights from To Fly Media</title>
        <meta name="description" content="Expert digital marketing insights, strategies, and case studies from To Fly Media's team. Learn performance marketing, paid ads, and growth tactics." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-brand-500/8 blur-[100px] pointer-events-none" />
        <div className="container-site relative z-10 text-center">
          <SectionTag icon={BookOpen}>Our Blog</SectionTag>
          <h1 className="section-heading text-white text-5xl md:text-7xl mt-4 mb-6">
            Marketing <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-xl text-white/50 max-w-xl mx-auto mb-10">
            Strategies, frameworks, and case studies from the frontlines of digital marketing.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Search articles..."
                className="input-field pl-11"
              />
            </div>
            <button type="submit" className="btn-primary px-5 py-3">Search</button>
          </form>
        </div>
      </section>

      {/* Category filter */}
      <div className="container-site mb-12">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-brand-500 text-white shadow-glow-sm'
                  : 'text-white/50 hover:text-white border border-white/8 hover:border-white/20 bg-white/3'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog grid */}
      <SectionWrapper className="container-site pb-24">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : data?.blogs?.length ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.blogs.map((blog, i) => (
                <BlogCard key={blog._id} blog={blog} delay={i * 0.06} />
              ))}
            </div>

            {/* Pagination */}
            {data.pagination?.pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-14">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="btn-secondary text-sm px-5 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-white/40 text-sm px-4">
                  Page {page} of {data.pagination.pages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(data.pagination.pages, p + 1))}
                  disabled={page === data.pagination.pages}
                  className="btn-secondary text-sm px-5 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-white/30 text-lg">No articles found.</p>
            {search && (
              <button onClick={() => { setSearch(''); setSearchInput('') }} className="btn-secondary mt-4 text-sm">
                Clear search
              </button>
            )}
          </div>
        )}
      </SectionWrapper>
    </PageWrapper>
  )
}
