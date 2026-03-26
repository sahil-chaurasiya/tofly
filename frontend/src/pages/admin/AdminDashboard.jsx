import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Users, FileText, Briefcase, Star, BookOpen, TrendingUp, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { adminAPI } from '../../utils/api'
import { useAuth } from '../../context/AuthContext'

function StatCard({ label, value, icon: Icon, color, path, loading }) {
  return (
    <Link to={path} className="block">
      <motion.div
        whileHover={{ y: -2 }}
        className="glass-card p-6 cursor-pointer border hover:border-brand-500/25 transition-all duration-200"
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
            <Icon size={18} />
          </div>
          <ArrowRight size={14} className="text-white/20" />
        </div>
        {loading ? (
          <div className="skeleton h-8 w-16 rounded mb-2" />
        ) : (
          <div className="text-3xl font-black font-display text-white mb-1">{value}</div>
        )}
        <div className="text-sm text-white/45">{label}</div>
      </motion.div>
    </Link>
  )
}

export default function AdminDashboard() {
  const { user } = useAuth()

  const { data: leadsData, isLoading: leadsLoading } = useQuery({
    queryKey: ['admin', 'leads'],
    queryFn: () => adminAPI.getLeads({ limit: 5 }),
    select: res => res.data
  })

  const { data: blogsData, isLoading: blogsLoading } = useQuery({
    queryKey: ['admin', 'blogs'],
    queryFn: () => adminAPI.getBlogs({ limit: 1 }),
    select: res => res.data
  })

  const STATUS_COLORS = {
    new: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
    contacted: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
    qualified: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
    'proposal-sent': 'bg-orange-500/15 text-orange-400 border-orange-500/25',
    converted: 'bg-green-500/15 text-green-400 border-green-500/25',
    lost: 'bg-red-500/15 text-red-400 border-red-500/25',
  }

  const statCards = [
    {
      label: 'Total Leads',
      value: leadsData?.pagination?.total ?? '—',
      icon: Users,
      color: 'bg-brand-500/15 text-brand-400',
      path: '/admin/leads',
      loading: leadsLoading
    },
    {
      label: 'New Leads',
      value: leadsData?.stats?.find(s => s._id === 'new')?.count ?? '0',
      icon: TrendingUp,
      color: 'bg-green-500/15 text-green-400',
      path: '/admin/leads',
      loading: leadsLoading
    },
    {
      label: 'Blog Posts',
      value: blogsData?.pagination?.total ?? '—',
      icon: FileText,
      color: 'bg-purple-500/15 text-purple-400',
      path: '/admin/blogs',
      loading: blogsLoading
    },
    {
      label: 'Converted',
      value: leadsData?.stats?.find(s => s._id === 'converted')?.count ?? '0',
      icon: Star,
      color: 'bg-amber-500/15 text-amber-400',
      path: '/admin/leads',
      loading: leadsLoading
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-white/40 text-sm">Here's what's happening with your website today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <StatCard {...card} />
          </motion.div>
        ))}
      </div>

      {/* Lead pipeline */}
      {leadsData?.stats && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Lead Pipeline</h2>
            <Link to="/admin/leads" className="text-sm text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {['new', 'contacted', 'qualified', 'proposal-sent', 'converted', 'lost'].map(status => {
              const count = leadsData.stats.find(s => s._id === status)?.count || 0
              return (
                <div key={status} className={`px-4 py-2.5 rounded-xl border text-sm font-medium ${STATUS_COLORS[status] || 'bg-white/5 text-white/40 border-white/10'}`}>
                  <span className="capitalize">{status.replace('-', ' ')}</span>
                  <span className="ml-2 font-bold">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Recent leads table */}
      {leadsData?.leads?.length > 0 && (
        <div className="glass-card overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <h2 className="text-lg font-bold text-white">Recent Leads</h2>
            <Link to="/admin/leads" className="text-sm text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-1">
              All Leads <ArrowRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {['Name', 'Email', 'Service', 'Status', 'Date'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-white/35 uppercase tracking-wider px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leadsData.leads.map((lead) => (
                  <tr key={lead._id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-500/15 flex items-center justify-center text-xs font-bold text-brand-300">
                          {lead.name?.[0]}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{lead.name}</div>
                          {lead.company && <div className="text-xs text-white/35">{lead.company}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/55">{lead.email}</td>
                    <td className="px-6 py-4 text-sm text-white/40 capitalize">{lead.service?.replace(/-/g, ' ')}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[lead.status] || 'bg-white/5 text-white/40 border-white/10'}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-white/30">
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'New Blog Post', path: '/admin/blogs/new', icon: FileText, desc: 'Create and publish an article' },
            { label: 'View Leads', path: '/admin/leads', icon: Users, desc: 'Manage your sales pipeline' },
            { label: 'Manage Services', path: '/admin/services', icon: Briefcase, desc: 'Update service offerings' },
            { label: 'Case Studies', path: '/admin/case-studies', icon: BookOpen, desc: 'Add new success stories' },
          ].map(({ label, path, icon: Icon, desc }) => (
            <Link key={path} to={path} className="glass-card p-5 hover:border-brand-500/25 transition-all duration-200 block group">
              <Icon size={20} className="text-white/40 group-hover:text-brand-400 transition-colors mb-3" />
              <div className="text-sm font-semibold text-white mb-1">{label}</div>
              <div className="text-xs text-white/35">{desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
