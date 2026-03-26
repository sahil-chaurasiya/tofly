import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Plus, Pencil, Trash2, X, Save, Eye, EyeOff } from 'lucide-react'
import { adminAPI } from '../../utils/api'

export default function AdminCaseStudies() {
  const qc = useQueryClient()
  const [editing, setEditing] = useState(null)
  const [resultsText, setResultsText] = useState('')
  const [servicesText, setServicesText] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const { data: caseStudies, isLoading } = useQuery({
    queryKey: ['admin-case-studies'],
    queryFn: () => adminAPI.getCaseStudies(),
    select: res => res.data.caseStudies
  })

  const save = useMutation({
    mutationFn: (data) => {
      // Parse results from textarea (one per line: "Metric|Value|Description")
      const results = resultsText
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean)
        .map(line => {
          const [metric, value, description] = line.split('|').map(s => s.trim())
          return { metric, value, description }
        })

      const services = servicesText
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)

      const payload = { ...data, results, services }

      return editing?._id
        ? adminAPI.updateCaseStudy(editing._id, payload)
        : adminAPI.createCaseStudy(payload)
    },
    onSuccess: () => {
      qc.invalidateQueries(['admin-case-studies'])
      toast.success(editing?._id ? 'Case study updated' : 'Case study created')
      setEditing(null)
      reset()
      setResultsText('')
      setServicesText('')
    },
    onError: err => toast.error(err.response?.data?.message || 'Error saving case study')
  })

  const del = useMutation({
    mutationFn: id => adminAPI.deleteCaseStudy(id),
    onSuccess: () => {
      qc.invalidateQueries(['admin-case-studies'])
      toast.success('Case study deleted')
    }
  })

  const togglePublish = useMutation({
    mutationFn: ({ id, isPublished }) => adminAPI.updateCaseStudy(id, { isPublished }),
    onSuccess: () => qc.invalidateQueries(['admin-case-studies'])
  })

  const openEdit = (cs) => {
    setEditing(cs)
    reset({
      title: cs.title,
      'client.name': cs.client?.name || '',
      'client.industry': cs.client?.industry || '',
      challenge: cs.challenge,
      solution: cs.solution,
      approach: cs.approach || '',
      duration: cs.duration || '',
      coverImage: cs.coverImage || '',
      isPublished: cs.isPublished,
      isFeatured: cs.isFeatured,
      order: cs.order,
      metaTitle: cs.metaTitle || '',
      metaDescription: cs.metaDescription || ''
    })
    setResultsText(
      (cs.results || []).map(r => `${r.metric}|${r.value}|${r.description || ''}`).join('\n')
    )
    setServicesText((cs.services || []).join(', '))
  }

  const openNew = () => {
    setEditing('new')
    reset({ isPublished: false, isFeatured: false, order: 0 })
    setResultsText('')
    setServicesText('')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Case Studies</h1>
          <p className="text-white/40 text-sm">{caseStudies?.length || 0} case studies</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm">
          <Plus size={16} /> Add Case Study
        </button>
      </div>

      {editing && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">
              {editing === 'new' ? 'New Case Study' : `Editing: ${editing.title}`}
            </h2>
            <button
              onClick={() => { setEditing(null); reset() }}
              className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit(data => save.mutate(data))} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/60 mb-2">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                {...register('title', { required: 'Title is required' })}
                placeholder="e.g. How We Grew TechVenture's Revenue by 312% in 6 Months"
                className={`input-field ${errors.title ? 'border-red-500/50' : ''}`}
              />
              {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Client Name</label>
              <input
                {...register('client.name')}
                placeholder="e.g. TechVenture India"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Industry</label>
              <input
                {...register('client.industry')}
                placeholder="e.g. SaaS / B2B Tech"
                className="input-field"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/60 mb-2">
                The Challenge <span className="text-red-400">*</span>
              </label>
              <textarea
                {...register('challenge', { required: 'Challenge is required' })}
                rows={3}
                placeholder="What problem was the client facing before working with you?"
                className={`input-field resize-none ${errors.challenge ? 'border-red-500/50' : ''}`}
              />
              {errors.challenge && <p className="text-red-400 text-xs mt-1">{errors.challenge.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/60 mb-2">
                Our Solution <span className="text-red-400">*</span>
              </label>
              <textarea
                {...register('solution', { required: 'Solution is required' })}
                rows={3}
                placeholder="What strategy and approach did you use?"
                className={`input-field resize-none ${errors.solution ? 'border-red-500/50' : ''}`}
              />
              {errors.solution && <p className="text-red-400 text-xs mt-1">{errors.solution.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/60 mb-2">Approach / Process</label>
              <textarea
                {...register('approach')}
                rows={3}
                placeholder="Month-by-month breakdown or step-by-step approach..."
                className="input-field resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/60 mb-2">
                Results
                <span className="text-white/25 font-normal ml-2">— one per line: Metric | Value | Description</span>
              </label>
              <textarea
                value={resultsText}
                onChange={e => setResultsText(e.target.value)}
                rows={5}
                placeholder={"Revenue Growth|312%|In 6 months vs prior period\nCAC Reduction|68%|Cost per customer dropped sharply\nMonthly Leads|450+|From 40 per month at start"}
                className="input-field resize-none font-mono text-sm"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              />
              <p className="text-xs text-white/20 mt-1">Format: Metric Name | Value | Description (description optional)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Services Used
                <span className="text-white/25 font-normal ml-2">— comma-separated</span>
              </label>
              <input
                value={servicesText}
                onChange={e => setServicesText(e.target.value)}
                placeholder="Performance Marketing, Lead Generation, Paid Advertising"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Duration</label>
              <input
                {...register('duration')}
                placeholder="e.g. 6 months"
                className="input-field"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/60 mb-2">Cover Image URL</label>
              <input
                {...register('coverImage')}
                placeholder="https://..."
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Display Order</label>
              <input
                {...register('order', { valueAsNumber: true })}
                type="number"
                min="0"
                placeholder="0"
                className="input-field"
              />
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input type="checkbox" {...register('isPublished')} className="sr-only peer" />
                  <div className="w-10 h-6 bg-white/10 rounded-full peer peer-checked:bg-brand-500 transition-colors" />
                  <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
                </div>
                <span className="text-sm text-white/70">Published</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input type="checkbox" {...register('isFeatured')} className="sr-only peer" />
                  <div className="w-10 h-6 bg-white/10 rounded-full peer peer-checked:bg-amber-500 transition-colors" />
                  <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
                </div>
                <span className="text-sm text-white/70">Featured (shown on homepage)</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Meta Title</label>
              <input {...register('metaTitle')} placeholder="SEO title (optional)" className="input-field text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Meta Description</label>
              <input {...register('metaDescription')} placeholder="SEO description (optional)" className="input-field text-sm" />
            </div>

            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" disabled={save.isLoading} className="btn-primary text-sm px-6">
                <Save size={15} />
                {save.isLoading ? 'Saving...' : editing?._id ? 'Update Case Study' : 'Create Case Study'}
              </button>
              <button
                type="button"
                onClick={() => { setEditing(null); reset() }}
                className="btn-secondary text-sm px-6"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {['Title', 'Client', 'Results', 'Status', ''].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-white/35 uppercase tracking-wider px-5 py-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="border-b border-white/3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} className="px-5 py-4"><div className="skeleton h-4 rounded" /></td>
                  ))}
                </tr>
              ))
            ) : caseStudies?.length ? (
              caseStudies.map(cs => (
                <tr key={cs._id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <div className="text-sm font-medium text-white line-clamp-2 max-w-xs">{cs.title}</div>
                    <div className="text-xs text-white/30 mt-0.5">/{cs.slug}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm text-white/70">{cs.client?.name || '—'}</div>
                    <div className="text-xs text-white/35 mt-0.5">{cs.client?.industry || ''}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {(cs.results || []).slice(0, 2).map((r, i) => (
                        <span key={i} className="text-xs font-bold text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2 py-0.5 rounded-full">
                          {r.value}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => togglePublish.mutate({ id: cs._id, isPublished: !cs.isPublished })}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border w-fit transition-colors ${
                          cs.isPublished
                            ? 'bg-green-500/15 text-green-400 border-green-500/25'
                            : 'bg-white/5 text-white/35 border-white/10'
                        }`}
                      >
                        {cs.isPublished ? <Eye size={10} /> : <EyeOff size={10} />}
                        {cs.isPublished ? 'Published' : 'Draft'}
                      </button>
                      {cs.isFeatured && (
                        <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full w-fit">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(cs)}
                        className="p-1.5 rounded-lg text-white/25 hover:text-brand-400 hover:bg-brand-500/10 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => { if (confirm(`Delete "${cs.title}"?`)) del.mutate(cs._id) }}
                        className="p-1.5 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-5 py-16 text-center text-white/25 text-sm">
                  No case studies yet.{' '}
                  <button onClick={openNew} className="text-brand-400 hover:text-brand-300">
                    Add your first case study →
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
