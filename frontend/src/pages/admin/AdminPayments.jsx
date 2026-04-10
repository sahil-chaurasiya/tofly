import { useState, useEffect } from 'react'
import { CreditCard, Search, RefreshCw, TrendingUp, CheckCircle, Clock, XCircle, IndianRupee } from 'lucide-react'

const STATUS_CONFIG = {
  paid:    { label: 'Paid',    color: '#2ecc71', bg: 'rgba(46,204,113,0.1)',  border: 'rgba(46,204,113,0.25)',  Icon: CheckCircle },
  created: { label: 'Pending', color: '#f39c12', bg: 'rgba(243,156,18,0.1)', border: 'rgba(243,156,18,0.25)', Icon: Clock },
  failed:  { label: 'Failed',  color: '#e74c3c', bg: 'rgba(231,76,60,0.1)',  border: 'rgba(231,76,60,0.25)',  Icon: XCircle },
}

const PLAN_COLORS = {
  basic:    '#00D2FF',
  standard: '#FF2D75',
  premium:  '#A855F7',
}

function formatAmount(paise) {
  return '₹' + (paise / 100).toLocaleString('en-IN')
}

function timeAgo(date) {
  const diff = (Date.now() - new Date(date)) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago'
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago'
  return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function AdminPayments() {
  const token = localStorage.getItem('tfm_token')
  const [payments, setPayments] = useState([])
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({})

  async function fetchPayments() {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, limit: 15 })
      if (statusFilter !== 'all') params.append('status', statusFilter)
      const res = await fetch(`/api/payment?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.success) {
        setPayments(data.payments)
        setStats(data.stats)
        setPagination(data.pagination)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPayments() }, [page, statusFilter])

  const filtered = search
    ? payments.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase()) ||
        p.phone.includes(search) ||
        p.planLabel.toLowerCase().includes(search.toLowerCase())
      )
    : payments

  // Aggregate stats
  const totalRevenue = stats.find(s => s._id === 'paid')?.total || 0
  const paidCount    = stats.find(s => s._id === 'paid')?.count || 0
  const pendingCount = stats.find(s => s._id === 'created')?.count || 0
  const failedCount  = stats.find(s => s._id === 'failed')?.count || 0

  return (
    <div style={{ fontFamily: 'inherit' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Payments</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>All Razorpay transactions from the pricing page</p>
        </div>
        <button
          onClick={fetchPayments}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '8px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.6)',
            fontSize: 13, cursor: 'pointer',
          }}
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total Revenue', value: formatAmount(totalRevenue), icon: IndianRupee, color: '#2ecc71' },
          { label: 'Successful', value: paidCount, icon: CheckCircle, color: '#2ecc71' },
          { label: 'Pending', value: pendingCount, icon: Clock, color: '#f39c12' },
          { label: 'Failed', value: failedCount, icon: XCircle, color: '#e74c3c' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16, padding: '18px 20px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{label}</span>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={15} color={color} />
              </div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1', minWidth: 200 }}>
          <Search size={14} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, phone, plan..."
            style={{
              width: '100%', paddingLeft: 36, paddingRight: 14, paddingTop: 9, paddingBottom: 9,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10, color: '#fff', fontSize: 13, outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
        {/* Status filter */}
        {['all', 'paid', 'created', 'failed'].map(s => (
          <button
            key={s}
            onClick={() => { setStatusFilter(s); setPage(1) }}
            style={{
              padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer',
              background: statusFilter === s ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
              border: statusFilter === s ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.08)',
              color: statusFilter === s ? '#818cf8' : 'rgba(255,255,255,0.5)',
            }}
          >
            {s === 'all' ? 'All' : s === 'created' ? 'Pending' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
            Loading payments…
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center' }}>
            <CreditCard size={36} color="rgba(255,255,255,0.1)" style={{ margin: '0 auto 12px' }} />
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>No payments found</div>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Customer', 'Plan', 'Amount', 'Status', 'Date', 'Razorpay ID'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const status = STATUS_CONFIG[p.status] || STATUS_CONFIG.created
                const StatusIcon = status.Icon
                return (
                  <tr
                    key={p._id}
                    style={{
                      borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {/* Customer */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{p.email}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{p.phone}</div>
                    </td>
                    {/* Plan */}
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                        background: `${PLAN_COLORS[p.planId] || '#888'}18`,
                        color: PLAN_COLORS[p.planId] || '#888',
                        border: `1px solid ${PLAN_COLORS[p.planId] || '#888'}33`,
                      }}>
                        {p.planLabel}
                      </span>
                    </td>
                    {/* Amount */}
                    <td style={{ padding: '14px 16px', fontSize: 15, fontWeight: 700, color: '#fff' }}>
                      {formatAmount(p.amount)}
                    </td>
                    {/* Status */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 20,
                        background: status.bg, color: status.color, border: `1px solid ${status.border}`,
                      }}>
                        <StatusIcon size={11} />
                        {status.label}
                      </div>
                    </td>
                    {/* Date */}
                    <td style={{ padding: '14px 16px', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
                      {timeAgo(p.createdAt)}
                    </td>
                    {/* Razorpay ID */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>
                        {p.razorpayPaymentId || p.razorpayOrderId?.slice(0, 20) + '…'}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 20 }}>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              padding: '7px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)', color: page === 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.6)',
              cursor: page === 1 ? 'not-allowed' : 'pointer', fontSize: 13,
            }}
          >← Prev</button>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            Page {page} of {pagination.pages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
            disabled={page === pagination.pages}
            style={{
              padding: '7px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)', color: page === pagination.pages ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.6)',
              cursor: page === pagination.pages ? 'not-allowed' : 'pointer', fontSize: 13,
            }}
          >Next →</button>
        </div>
      )}
    </div>
  )
}