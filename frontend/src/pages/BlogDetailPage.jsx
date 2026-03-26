import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import { publicAPI } from '../utils/api'
import { PageWrapper, BlogCard, SkeletonText, CTABanner } from '../components/common'

export default function BlogDetailPage() {
  const { slug } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => publicAPI.getBlog(slug),
    select: res => res.data
  })

  if (isLoading) return (
    <PageWrapper>
      <div className="container-site pt-36 pb-24 max-w-3xl mx-auto">
        <SkeletonText lines={12} />
      </div>
    </PageWrapper>
  )

  if (isError || !data?.blog) return (
    <PageWrapper>
      <div className="container-site pt-36 pb-24 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Article Not Found</h1>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    </PageWrapper>
  )

  const { blog, related } = data

  return (
    <PageWrapper>
      <Helmet>
        <title>{blog.metaTitle || `${blog.title} – To Fly Media Blog`}</title>
        <meta name="description" content={blog.metaDescription || blog.excerpt} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        {blog.coverImage && <meta property="og:image" content={blog.coverImage} />}
        <meta property="article:published_time" content={blog.publishedAt} />
        <meta property="article:section" content={blog.category} />
        {blog.tags?.map(tag => <meta key={tag} property="article:tag" content={tag} />)}
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-500/6 blur-[100px] pointer-events-none" />
        <div className="container-site relative z-10 max-w-4xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm mb-10 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="section-tag">{blog.category}</span>
            {blog.publishedAt && (
              <span className="flex items-center gap-1.5 text-white/35 text-sm">
                <Calendar size={13} />
                {new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            )}
            {blog.readTime && (
              <span className="flex items-center gap-1.5 text-white/35 text-sm">
                <Clock size={13} /> {blog.readTime} min read
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            {blog.title}
          </h1>
          <p className="text-xl text-white/50 leading-relaxed">{blog.excerpt}</p>

          {/* Author */}
          {blog.author && (
            <div className="flex items-center gap-3 mt-8 pt-8 border-t border-white/6">
              <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center text-sm font-bold text-brand-300">
                {blog.author.name?.[0] || 'A'}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{blog.author.name}</div>
                <div className="text-xs text-white/35">To Fly Media Team</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Cover image */}
      {blog.coverImage && (
        <div className="container-site max-w-4xl mx-auto mb-12">
          <div className="rounded-2xl overflow-hidden aspect-video">
            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container-site max-w-3xl mx-auto pb-16">
        <article
          className="prose-dark"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-white/6">
            <Tag size={14} className="text-white/30" />
            {blog.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs text-white/40 border border-white/8 bg-white/3">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Related articles */}
      {related?.length > 0 && (
        <div className="container-site pb-24">
          <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((b, i) => (
              <BlogCard key={b._id} blog={b} delay={i * 0.1} />
            ))}
          </div>
        </div>
      )}

      <CTABanner />
    </PageWrapper>
  )
}
