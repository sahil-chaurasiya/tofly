import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Plus, Pencil, Trash2, X, Save, Star } from 'lucide-react'
import { adminAPI } from '../../utils/api'

export default function AdminTestimonials() {
  const qc = useQueryClient()
  const [editing, setEditing] = useState(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['admin-testimonials'],
    queryFn: () => adminAPI.getTestimonials(),
    select: res => res.data.testimonials
  })

  const save = useMutation({
    mutationFn: (data) =>
      editing?._id
        ? adminAPI.updateTestimonial(editing._id, data)
        : adminAPI.createTestimonial(data),
    onSuccess: () => {
      qc.invalidateQueries(['admin-testimonials'])
      toast.success(editing?._id ? 'Testimonial updated' : 'Testimonial created')
      setEditing(null)
      reset()
    },
    onError: err => toast.error(err.response?.data?.message || 'Error saving testimonial')
  })

  const del = useMutation({
    mutationFn: id => adminAPI.deleteTestimonial(id),
    onSuccess: () => {
      qc.invalidateQueries(['admin-testimonials'])
      toast.success('Testimonial deleted')
    }
  })

  const openEdit = (t) => {
    setEditing(t)
    reset({
      name: t.name,
      designation: t.designation,
      company: t.company || '',
      testimonial: t.testimonial,
      rating: t.rating,
      service: t.service || '',
      resultMetric: t.resultMetric || '',
      isActive: t.isActive,
      isFeatured: t.isFeatured,
      order: t.order
    })
  }

  const openNew = () => {
    setEditing('new')
    reset({ rating: 5, isActive: true, isFeatured: false, order: 0 })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Testimonials</h1>
          <p className="text-white/40 text-sm">{testimonials?.length || 0} testimonials</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {editing && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">
              {editing === 'new' ? 'New Testimonial' : `Editing: ${editing.name}`}
            </h2>
            <button
              onClick={() => { setEditing(null); reset() }}
              className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit(data => save.mutate(data))} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Client Name <span className="text-red-400">*</span>
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                placeholder="e.g. Rohit Mehta"
                className={`input-field ${errors.name ? 'border-red-500/50' : ''}`}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Designation <span className="text-red-400">*</span>
              </label>
              <input
                {...register('designation', { required: 'Designation is required' })}
                placeholder="e.g. Founder & CEO"
                className={`input-field ${errors.designation ? 'border-red-500/50' : ''}`}
              />
              {errors.designation && <p className="text-red-400 text-xs mt-1">{errors.designation.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Company</label>
              <input
                {...register('company')}
                placeholder="e.g. TechVenture India"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Service Used</label>
              <input
                {...register('service')}
                placeholder="e.g. Performance Marketing"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Result Metric</label>
              <input
                {...register('resultMetric')}
                placeholder="e.g. 3x leads, 60% lower CPA"
                className="input-field"
              />
              <p className="text-xs text-white/20 mt-1">Shown as a badge on the testimonial card</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Rating (1–5)</label>
              <select {...register('rating', { valueAsNumber: true })} className="input-field">
                {[5, 4, 3, 2, 1].map(r => (
                  <option key={r} value={r} style={{ background: '#0d0d20' }}>
                    {'★'.repeat(r)}{'☆'.repeat(5 - r)} ({r}/5)
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/60 mb-2">
                Testimonial Text <span className="text-red-400">*</span>
              </label>
              <textarea
                {...register('testimonial', {
                  required: 'Testimonial text is required',
                  maxLength: { value: 600, message: 'Max 600 characters' }
                })}
                rows={4}
                placeholder="The client's testimonial in their own words..."
                className={`input-field resize-none ${errors.testimonial ? 'border-red-500/50' : ''}`}
              />
              {errors.testimonial && <p className="text-red-400 text-xs mt-1">{errors.testimonial.message}</p>}
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
                  <input type="checkbox" {...register('isActive')} className="sr-only peer" />
                  <div className="w-10 h-6 bg-white/10 rounded-full peer peer-checked:bg-brand-500 transition-colors" />
                  <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
                </div>
                <span className="text-sm text-white/70">Active</span>
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

            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" disabled={save.isLoading} className="btn-primary text-sm px-6">
                <Save size={15} />
                {save.isLoading ? 'Saving...' : editing?._id ? 'Update' : 'Create'}
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card p-6 space-y-3">
              <div className="skeleton h-4 w-3/4 rounded" />
              <div className="skeleton h-4 w-1/2 rounded" />
              <div className="skeleton h-16 w-full rounded" />
            </div>
          ))
        ) : testimonials?.length ? (
          testimonials.map(t => (
            <div key={t._id} className="glass-card p-6 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-white/40 mt-0.5">{t.designation}{t.company ? `, ${t.company}` : ''}</div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEdit(t)}
                    className="p-1.5 rounded-lg text-white/25 hover:text-brand-400 hover:bg-brand-500/10 transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => { if (confirm(`Delete testimonial from ${t.name}?`)) del.mutate(t._id) }}
                    className="p-1.5 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-white/15'}
                  />
                ))}
              </div>

              <p className="text-white/50 text-xs leading-relaxed line-clamp-3 italic">
                "{t.testimonial}"
              </p>

              {t.resultMetric && (
                <div className="text-xs font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 rounded-full px-3 py-1 w-fit">
                  {t.resultMetric}
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs border ${
                  t.isActive
                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                    : 'bg-white/5 text-white/25 border-white/10'
                }`}>
                  {t.isActive ? 'Active' : 'Inactive'}
                </span>
                {t.isFeatured && (
                  <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Featured
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="md:col-span-3 text-center py-20 text-white/25 text-sm">
            No testimonials yet.{' '}
            <button onClick={openNew} className="text-brand-400 hover:text-brand-300">
              Add your first testimonial →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
