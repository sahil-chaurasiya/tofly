import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Eye, Upload, X } from 'lucide-react'
import { adminAPI } from '../../utils/api'

const CATEGORIES = [
  'Performance Marketing', 'Lead Generation', 'Social Media',
  'Paid Ads', 'SEO', 'Business Growth', 'Case Study', 'Industry News'
]

export default function AdminBlogEditor() {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()
  const qc = useQueryClient()
  const [coverPreview, setCoverPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [tagsInput, setTagsInput] = useState('')

  const { register, handleSubmit, formState: { errors, isDirty }, reset, setValue, watch } = useForm({
    defaultValues: {
      isPublished: false,
      category: 'Performance Marketing',
    }
  })

  const { data: existingBlog } = useQuery({
    queryKey: ['admin-blog-edit', id],
    queryFn: () => adminAPI.getBlog(id),
    select: res => res.data.blog,
    enabled: isEdit,
  })

  useEffect(() => {
    if (existingBlog) {
      reset({
        title: existingBlog.title,
        excerpt: existingBlog.excerpt,
        content: existingBlog.content,
        category: existingBlog.category,
        metaTitle: existingBlog.metaTitle || '',
        metaDescription: existingBlog.metaDescription || '',
        isPublished: existingBlog.isPublished,
        coverImage: existingBlog.coverImage || ''
      })
      setCoverPreview(existingBlog.coverImage || null)
      setTagsInput(existingBlog.tags?.join(', ') || '')
    }
  }, [existingBlog, reset])

  const saveBlog = useMutation({
    mutationFn: (data) => isEdit ? adminAPI.updateBlog(id, data) : adminAPI.createBlog(data),
    onSuccess: () => {
      qc.invalidateQueries(['admin-blogs'])
      toast.success(isEdit ? 'Blog updated!' : 'Blog created!')
      navigate('/admin/blogs')
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Error saving blog')
  })

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const res = await adminAPI.uploadImage(file, 'blogs')
      const url = res.data.url
      setValue('coverImage', url)
      setCoverPreview(url)
      toast.success('Image uploaded!')
    } catch {
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = (data) => {
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean)
    saveBlog.mutate({ ...data, tags })
  }

  return (
    <div className="space-y-5 sm:space-y-6 max-w-4xl">
      {/* Header — stacks on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link to="/admin/blogs" className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors shrink-0">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">{isEdit ? 'Edit Post' : 'New Blog Post'}</h1>
            <p className="text-white/35 text-xs sm:text-sm mt-0.5">{isEdit ? 'Update and republish' : 'Create and publish a new article'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 pl-11 sm:pl-0">
          <button
            type="button"
            onClick={() => setValue('isPublished', false, { shouldDirty: true })}
            className="btn-secondary text-sm py-2.5 px-4 sm:px-5"
          >
            Save Draft
          </button>
          <button
            onClick={() => { setValue('isPublished', true, { shouldDirty: true }); handleSubmit(onSubmit)() }}
            disabled={saveBlog.isLoading}
            className="btn-primary text-sm py-2.5 px-4 sm:px-5"
          >
            <Eye size={15} />
            {saveBlog.isLoading ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-5">
          <div className="glass-card p-4 sm:p-6 space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Post Title <span className="text-red-400">*</span>
              </label>
              <input
                {...register('title', { required: 'Title is required' })}
                placeholder="e.g. 10 Performance Marketing Strategies for 2025"
                className={`input-field text-base sm:text-lg font-semibold ${errors.title ? 'border-red-500/50' : ''}`}
              />
              {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Excerpt / Summary <span className="text-red-400">*</span>
              </label>
              <textarea
                {...register('excerpt', { required: 'Excerpt is required', maxLength: { value: 500, message: 'Max 500 chars' } })}
                rows={3}
                placeholder="A brief summary that appears in blog listings and social shares..."
                className={`input-field resize-none ${errors.excerpt ? 'border-red-500/50' : ''}`}
              />
              <div className="flex justify-between mt-1">
                {errors.excerpt && <p className="text-red-400 text-xs">{errors.excerpt.message}</p>}
                <span className="text-xs text-white/20 ml-auto">{watch('excerpt')?.length || 0}/500</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Content (HTML) <span className="text-red-400">*</span>
              </label>
              <textarea
                {...register('content', { required: 'Content is required' })}
                rows={20}
                placeholder="Write your article content here. You can use HTML tags like <h2>, <p>, <ul>, <strong>..."
                className={`input-field resize-y font-mono text-sm ${errors.content ? 'border-red-500/50' : ''}`}
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              />
              {errors.content && <p className="text-red-400 text-xs mt-1">{errors.content.message}</p>}
              <p className="text-xs text-white/20 mt-1">Supports HTML. Use &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt;, &lt;img&gt;, etc.</p>
            </div>
          </div>

          {/* SEO */}
          <div className="glass-card p-4 sm:p-6 space-y-4 sm:space-y-5">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">SEO Settings</h3>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Meta Title <span className="text-white/25">(max 70 chars)</span>
              </label>
              <input
                {...register('metaTitle', { maxLength: { value: 70, message: 'Max 70 chars' } })}
                placeholder="Defaults to post title"
                className="input-field text-sm"
              />
              <span className="text-xs text-white/20 mt-1 block">{watch('metaTitle')?.length || 0}/70</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Meta Description <span className="text-white/25">(max 160 chars)</span>
              </label>
              <textarea
                {...register('metaDescription', { maxLength: { value: 160, message: 'Max 160 chars' } })}
                rows={3}
                placeholder="Defaults to excerpt"
                className="input-field resize-none text-sm"
              />
              <span className="text-xs text-white/20 mt-1 block">{watch('metaDescription')?.length || 0}/160</span>
            </div>
          </div>
        </div>

        {/* Sidebar — sits below main column on mobile, right column on desktop */}
        <div className="space-y-4 sm:space-y-5">
          {/* Cover Image */}
          <div className="glass-card p-4 sm:p-5">
            <h3 className="font-semibold text-white text-sm mb-4">Cover Image</h3>
            {coverPreview ? (
              <div className="relative rounded-xl overflow-hidden aspect-video mb-3">
                <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => { setCoverPreview(null); setValue('coverImage', '') }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white/70 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-white/10 hover:border-brand-500/30 cursor-pointer transition-colors bg-white/2 mb-3">
                <Upload size={24} className="text-white/20 mb-2" />
                <span className="text-xs text-white/30">Click to upload</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>
            )}
            {uploading && <p className="text-xs text-brand-400 mb-2">Uploading...</p>}
            <div>
              <label className="block text-xs text-white/40 mb-1.5">Or paste URL</label>
              <input
                {...register('coverImage')}
                placeholder="https://..."
                className="input-field text-xs py-2"
                onChange={e => setCoverPreview(e.target.value)}
              />
            </div>
          </div>

          {/* Category */}
          <div className="glass-card p-4 sm:p-5">
            <label className="block text-sm font-medium text-white/60 mb-3">Category</label>
            <select {...register('category')} className="input-field text-sm">
              {CATEGORIES.map(c => (
                <option key={c} value={c} style={{ background: '#0d0d20' }}>{c}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="glass-card p-4 sm:p-5">
            <label className="block text-sm font-medium text-white/60 mb-3">Tags</label>
            <input
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              placeholder="tag1, tag2, tag3"
              className="input-field text-sm"
            />
            <p className="text-xs text-white/20 mt-1.5">Comma-separated</p>
          </div>

          {/* Status */}
          <div className="glass-card p-4 sm:p-5">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input type="checkbox" {...register('isPublished')} className="sr-only peer" />
                <div className="w-10 h-6 bg-white/10 rounded-full peer peer-checked:bg-brand-500 transition-colors" />
                <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
              </div>
              <span className="text-sm text-white/70">Published</span>
            </label>
          </div>

          {/* Save button */}
          <button
            type="submit"
            disabled={saveBlog.isLoading}
            className="btn-primary w-full justify-center py-3"
          >
            <Save size={16} />
            {saveBlog.isLoading ? 'Saving...' : isEdit ? 'Update Post' : 'Save Post'}
          </button>
        </div>
      </form>
    </div>
  )
}