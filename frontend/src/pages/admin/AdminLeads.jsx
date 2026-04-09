import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { Search, Trash2, X, MessageCircle, Phone, Mail } from 'lucide-react'
import { adminAPI } from '../../utils/api'

const STATUS_OPTIONS = ['new', 'contacted', 'qualified', 'proposal-sent', 'converted', 'lost']
const STATUS_COLORS = {
  new: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  contacted: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  qualified: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
  'proposal-sent': 'bg-orange-500/15 text-orange-400 border-orange-500/25',
  converted: 'bg-green-500/15 text-green-400 border-green-500/25',
  lost: 'bg-red-500/15 text-red-400 border-red-500/25',
}

export default function AdminLeads() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)
  const [selectedLead, setSelectedLead] = useState(null)
  const qc = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-leads', statusFilter, search, page],
    queryFn: () => adminAPI.getLeads({ status: statusFilter, search: search || undefined, page, limit: 15 }),
    select: res => res.data
  })

  const updateStatus = useMutation({
    mutationFn: ({ id, status, notes }) => adminAPI.updateLeadStatus(id, { status, notes }),
    onSuccess: () => {
      qc.invalidateQueries(['admin-leads'])
      toast.success('Lead status updated')
    }
  })

  const deleteLead = useMutation({
    mutationFn: (id) => adminAPI.deleteLead(id),
    onSuccess: () => {
      qc.invalidateQueries(['admin-leads'])
      toast.success('Lead deleted')
      setSelectedLead(null)
    }
  })

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Leads</h1>
          <p className="text-white/40 text-sm">
            {data?.pagination?.total || 0} total leads
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-3 sm:p-4 flex flex-col gap-3">
        {/* Search */}
        <form onSubmit={handleSearch} className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search by name, email or company..."
            className="input-field pl-10 text-sm py-2.5"
          />
        </form>
        {/* Status filter pills — horizontal scroll on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
          {['all', ...STATUS_OPTIONS].map(s => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setPage(1) }}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all capitalize whitespace-nowrap shrink-0 ${
                statusFilter === s
                  ? 'bg-brand-500 text-white'
                  : 'text-white/45 hover:text-white border border-white/8 hover:border-white/20 bg-white/3'
              }`}
            >
              {s.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: '700px' }}>
            <thead>
              <tr className="border-b border-white/5">
                {['Lead', 'Contact', 'Service', 'Status', 'Date', ''].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-white/35 uppercase tracking-wider px-4 sm:px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/3">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-4 sm:px-5 py-4">
                        <div className="skeleton h-4 rounded w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : data?.leads?.length ? (
                data.leads.map((lead) => (
                  <tr
                    key={lead._id}
                    onClick={() => setSelectedLead(lead)}
                    className="border-b border-white/3 hover:bg-white/2 transition-colors cursor-pointer"
                  >
                    <td className="px-4 sm:px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-500/15 flex items-center justify-center text-xs font-bold text-brand-300 shrink-0">
                          {lead.name?.[0]}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-white truncate max-w-[110px]">{lead.name}</div>
                          {lead.company && <div className="text-xs text-white/35 truncate max-w-[110px]">{lead.company}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-4 max-w-[140px]">
                      <div className="text-xs text-white/55 truncate">{lead.email}</div>
                      {lead.phone && <div className="text-xs text-white/35 mt-0.5">{lead.phone}</div>}
                    </td>
                    <td className="px-4 sm:px-5 py-4 text-xs text-white/45 capitalize whitespace-nowrap">
                      {lead.service?.replace(/-/g, ' ')}
                    </td>
                    
                    <td className="px-4 sm:px-5 py-4">
                      <select
                        value={lead.status}
                        onChange={e => {
                          e.stopPropagation()
                          updateStatus.mutate({ id: lead._id, status: e.target.value })
                        }}
                        onClick={e => e.stopPropagation()}
                        className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border cursor-pointer outline-none ${STATUS_COLORS[lead.status] || 'bg-white/5 text-white/40 border-white/10'}`}
                        style={{ background: 'transparent' }}
                      >
                        {STATUS_OPTIONS.map(s => (
                          <option key={s} value={s} style={{ background: '#0d0d20' }} className="capitalize">{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 sm:px-5 py-4 text-xs text-white/30 whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                    </td>
                    <td className="px-4 sm:px-5 py-4">
                      <button
                        onClick={e => { e.stopPropagation(); if(confirm('Delete this lead?')) deleteLead.mutate(lead._id) }}
                        className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center text-white/25 text-sm">
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data?.pagination?.pages > 1 && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 sm:px-5 py-4 border-t border-white/5">
            <span className="text-xs text-white/30">
              Showing {((page - 1) * 15) + 1}–{Math.min(page * 15, data.pagination.total)} of {data.pagination.total}
            </span>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="btn-secondary text-xs px-4 py-2 disabled:opacity-40">Prev</button>
              <button onClick={() => setPage(p => Math.min(data.pagination.pages, p + 1))} disabled={page === data.pagination.pages}
                className="btn-secondary text-xs px-4 py-2 disabled:opacity-40">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Lead detail drawer */}
      <AnimatePresence>
        {selectedLead && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md z-50 overflow-y-auto"
              style={{ background: '#0a0a18', borderLeft: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h2 className="text-xl font-bold text-white">Lead Details</h2>
                  <button onClick={() => setSelectedLead(null)} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-5 sm:space-y-6">
                  {/* Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-500/15 flex items-center justify-center text-xl font-bold text-brand-300 shrink-0">
                      {selectedLead.name?.[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg font-bold text-white truncate">{selectedLead.name}</div>
                      {selectedLead.company && <div className="text-sm text-white/40 truncate">{selectedLead.company}</div>}
                    </div>
                  </div>

                  {/* Contact actions */}
                  <div className="flex gap-2 sm:gap-3">
                    <a href={`mailto:${selectedLead.email}`} className="btn-secondary flex-1 justify-center text-sm py-2.5">
                      <Mail size={15} /> Email
                    </a>
                    {selectedLead.phone && (
                      <a href={`tel:${selectedLead.phone}`} className="btn-secondary flex-1 justify-center text-sm py-2.5">
                        <Phone size={15} /> Call
                      </a>
                    )}
                    {selectedLead.phone && (
                      <a href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
                        className="btn-secondary flex-1 justify-center text-sm py-2.5"
                        style={{ color: '#25d366' }}>
                        <MessageCircle size={15} /> WA
                      </a>
                    )}
                  </div>

                  {/* Details grid */}
                  {[
                    { label: 'Email', value: selectedLead.email },
                    { label: 'Phone', value: selectedLead.phone || '—' },
                    { label: 'Service', value: selectedLead.service?.replace(/-/g, ' ') || '—' },
                    { label: 'Budget', value: selectedLead.budget?.replace(/-/g, ' ') || '—' },
                    { label: 'Source', value: selectedLead.source || '—' },
                    { label: 'Submitted', value: new Date(selectedLead.createdAt).toLocaleString('en-IN') },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between py-3 border-b border-white/4 gap-4">
                      <span className="text-sm text-white/35 shrink-0">{label}</span>
                      <span className="text-sm text-white/75 capitalize text-right break-all">{value}</span>
                    </div>
                  ))}

                  {/* Message */}
                  {selectedLead.message && (
                    <div>
                      <div className="text-sm text-white/35 mb-2">Message</div>
                      <div className="glass-card p-4 text-sm text-white/65 leading-relaxed">{selectedLead.message}</div>
                    </div>
                  )}

                  {/* Status update */}
                  <div>
                    <label className="block text-sm text-white/35 mb-2">Update Status</label>
                    <select
                      defaultValue={selectedLead.status}
                      onChange={e => {
                        updateStatus.mutate({ id: selectedLead._id, status: e.target.value })
                        setSelectedLead({ ...selectedLead, status: e.target.value })
                      }}
                      className="input-field text-sm"
                    >
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s} style={{ background: '#0d0d20' }} className="capitalize">{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => { if(confirm('Delete this lead permanently?')) deleteLead.mutate(selectedLead._id) }}
                    className="w-full py-3 rounded-xl text-red-400 text-sm font-medium border border-red-500/20 hover:bg-red-500/10 transition-colors"
                  >
                    Delete Lead
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}