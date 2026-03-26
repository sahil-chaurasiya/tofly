import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Plus, Pencil, Trash2, X, Save, ToggleLeft, ToggleRight } from 'lucide-react'
import { adminAPI } from '../../utils/api'

export default function AdminServices() {
  const qc = useQueryClient()
  const [editing, setEditing] = useState(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const { data: services, isLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: () => adminAPI.getServices(),
    select: res => res.data.services
  })

  const save = useMutation({
    mutationFn: (data) =>
      editing?._id
        ? adminAPI.updateService(editing._id, data)
        : adminAPI.createService(data),
    onSuccess: () => {
      qc.invalidateQueries(['admin-services'])
      toast.success(editing?._id ? 'Service updated' : 'Service created')
      setEditing(null)
      reset()
    },
    onError: err => toast.error(err.response?.data?.message || 'Error saving service')
  })

  const del = useMutation({
    mutationFn: id => adminAPI.deleteService(id),
    onSuccess: () => {
      qc.invalidateQueries(['admin-services'])
      toast.success('Service deleted')
    }
  })

  const toggleActive = useMutation({
    mutationFn: ({ id, isActive }) => adminAPI.updateService(id, { isActive }),
    onSuccess: () => qc.invalidateQueries(['admin-services'])
  })

  const openEdit = (service) => {
    setEditing(service)
    reset({
      title: service.title,
      shortDescription: service.shortDescription,
      description: service.description,
      icon: service.icon,
      isActive: service.isActive,
      order: service.order,
      metaTitle: service.metaTitle || '',
      metaDescription: service.metaDescription || ''
    })
  }

  const openNew = () => {
    setEditing('new')
    reset({ isActive: true, order: 0, icon: 'TrendingUp' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Services</h1>
          <p className="text-white/40 text-sm">{services?.length || 0} services configured</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm">
          <Plus size={16} /> Add Service
        </button>
      </div>

      {editing && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">
              {editing === 'new' ? 'New Service' : `Editing: ${editing.title}`}
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
                Title <span className="text-red-400">*</span>
              </label>
              <input
                {...register('title', { required: 'Title is required' })}
                placeholder="e.g. Performance Marketing"
                className={`input-field ${errors.title ? 'border-red-500/50' : ''}`}
              />
              {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Icon Name</label>
              <input
                {...register('icon')}
                placeholder="e.g. TrendingUp, Target, Users"
                className="input-field"
              />
              <p className="text-xs text-white/20 mt-1">Use any Lucide icon name</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/60 mb-2">
                Short Description <span className="text-red-400">*</span>
              </label>
              <textarea
                {...register('shortDescription', {
                  required: 'Short description is required',
                  maxLength: { value: 300, message: 'Max 300 characters' }
                })}
                rows={2}
                placeholder="One-liner shown on cards and listings..."
                className={`input-field resize-none ${errors.shortDescription ? 'border-red-500/50' : ''}`}
              />
              {errors.shortDescription && <p className="text-red-400 text-xs mt-1">{errors.shortDescription.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/60 mb-2">
                Full Description <span className="text-red-400">*</span>
              </label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={5}
                placeholder="Detailed description shown on the service detail page..."
                className={`input-field resize-none ${errors.description ? 'border-red-500/50' : ''}`}
              />
              {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
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

            <div className="flex items-center gap-3 pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input type="checkbox" {...register('isActive')} className="sr-only peer" />
                  <div className="w-10 h-6 bg-white/10 rounded-full peer peer-checked:bg-brand-500 transition-colors" />
                  <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
                </div>
                <span className="text-sm text-white/70">Active (visible on website)</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Meta Title</label>
              <input
                {...register('metaTitle')}
                placeholder="SEO title (optional)"
                className="input-field text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Meta Description</label>
              <input
                {...register('metaDescription')}
                placeholder="SEO description (optional)"
                className="input-field text-sm"
              />
            </div>

            <div className="md:col-span-2 flex gap-3 pt-2">
              <button
                type="submit"
                disabled={save.isLoading}
                className="btn-primary text-sm px-6"
              >
                <Save size={15} />
                {save.isLoading ? 'Saving...' : editing?._id ? 'Update Service' : 'Create Service'}
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
              {['Order', 'Title', 'Short Description', 'Status', ''].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-white/35 uppercase tracking-wider px-5 py-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-white/3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} className="px-5 py-4"><div className="skeleton h-4 rounded" /></td>
                  ))}
                </tr>
              ))
            ) : services?.length ? (
              services.map(service => (
                <tr key={service._id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4 text-sm text-white/35 w-16">{service.order}</td>
                  <td className="px-5 py-4">
                    <div className="text-sm font-medium text-white">{service.title}</div>
                    <div className="text-xs text-white/30 mt-0.5">/{service.slug}</div>
                  </td>
                  <td className="px-5 py-4 text-sm text-white/45 max-w-xs">
                    <span className="line-clamp-2">{service.shortDescription}</span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggleActive.mutate({ id: service._id, isActive: !service.isActive })}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                        service.isActive
                          ? 'bg-green-500/15 text-green-400 border-green-500/25 hover:bg-green-500/25'
                          : 'bg-white/5 text-white/35 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {service.isActive ? <ToggleRight size={12} /> : <ToggleLeft size={12} />}
                      {service.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(service)}
                        className="p-1.5 rounded-lg text-white/25 hover:text-brand-400 hover:bg-brand-500/10 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => { if (confirm(`Delete "${service.title}"?`)) del.mutate(service._id) }}
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
                  No services yet.{' '}
                  <button onClick={openNew} className="text-brand-400 hover:text-brand-300">
                    Add your first service →
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
