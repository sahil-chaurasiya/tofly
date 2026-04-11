import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, User, Mail, Phone, Building2, Shield, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

const API_BASE = ''  // Vite proxy handles /api → http://localhost:5000

const MODAL_STYLES = `
  .pm-input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 12px 16px 12px 44px;
    color: #fff;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    font-family: 'Inter', sans-serif;
  }
  .pm-input::placeholder { color: rgba(255,255,255,0.3); }
  .pm-input:focus {
    border-color: rgba(0,210,255,0.5);
    background: rgba(0,210,255,0.05);
  }
  .pm-input.error { border-color: rgba(255,80,80,0.6); }
`

function InputField({ icon: Icon, label, error, ...props }) {
  return (
    <div style={{ position: 'relative' }}>
      <label style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <Icon size={15} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        <input className={`pm-input${error ? ' error' : ''}`} {...props} />
      </div>
      {error && <p style={{ fontSize: 11, color: '#ff5050', marginTop: 4 }}>{error}</p>}
    </div>
  )
}

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function PaymentModal({ plan, onClose }) {
  const [step, setStep] = useState('form') // 'form' | 'processing' | 'success' | 'error'
  const [successData, setSuccessData] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim() || form.phone.trim().length < 10) e.phone = 'Valid phone number required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handlePay() {
    if (!validate()) return
    setLoading(true)

    try {
      // 1. Load Razorpay SDK
      const loaded = await loadRazorpayScript()
      if (!loaded) throw new Error('Could not load payment gateway. Check your internet connection.')

      // 2. Create order on backend
      const res = await fetch(`${API_BASE}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: plan.id, ...form }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || 'Could not create order')

      setLoading(false)
      setStep('processing')

      // 3. Open Razorpay checkout
      const rzp = new window.Razorpay({
        key:         data.keyId,
        amount:      data.amount,
        currency:    data.currency,
        order_id:    data.orderId,
        name:        'ToFly Media',
        description: `${data.planLabel} Plan`,
        image:       'https://www.toflymedia.com/hero/logo.png',
        prefill: {
          name:    form.name,
          email:   form.email,
          contact: form.phone,
        },
        theme: { color: plan.color },
        modal: {
          ondismiss: () => setStep('form'),
        },
        handler: async (response) => {
          // 4. Verify on backend
          try {
            const verifyRes = await fetch(`${API_BASE}/api/payment/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id:   response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature:  response.razorpay_signature,
              }),
            })
            const verifyData = await verifyRes.json()
            if (!verifyData.success) throw new Error(verifyData.message)
            setSuccessData(verifyData.payment)
            setStep('success')
          } catch (err) {
            setErrorMsg(err.message || 'Payment verification failed. Please contact us.')
            setStep('error')
          }
        },
      })

      rzp.on('payment.failed', (response) => {
        setErrorMsg(response.error?.description || 'Payment failed. Please try again.')
        setStep('error')
      })

      rzp.open()
    } catch (err) {
      setLoading(false)
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
      setStep('error')
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MODAL_STYLES }} />
      <AnimatePresence>
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={step === 'processing' ? undefined : onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 9998,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(6px)',
          }}
        />

        {/* Modal */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
            pointerEvents: 'none',
          }}
        >
          <div style={{
            pointerEvents: 'auto',
            width: '100%', maxWidth: 480,
            background: '#0d0f1a',
            border: `1px solid ${plan.color}33`,
            borderRadius: 28,
            overflow: 'hidden',
            boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)`,
          }}>
            {/* Top color bar */}
            <div style={{ height: 3, background: plan.gradient }} />

            {/* ── FORM STEP ── */}
            {step === 'form' && (
              <div style={{ padding: '28px 32px 32px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                  <div>
                    <div style={{ fontSize: 11, color: plan.color, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                      Secure Checkout
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{plan.label} Plan</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{plan.tagline}</div>
                  </div>
                  <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 10, padding: 8, cursor: 'pointer', color: 'rgba(255,255,255,0.5)', lineHeight: 0 }}>
                    <X size={16} />
                  </button>
                </div>

                {/* Price summary */}
                <div style={{
                  background: `${plan.color}10`,
                  border: `1px solid ${plan.color}25`,
                  borderRadius: 14, padding: '14px 18px', marginBottom: 24,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 3 }}>
                      <span style={{ textDecoration: 'line-through', marginRight: 8 }}>{plan.orig}</span>
                      <span style={{ background: 'rgba(46,204,113,0.15)', color: '#2ecc71', padding: '1px 7px', borderRadius: 5, fontSize: 10, fontWeight: 700 }}>{plan.discount}</span>
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: '#fff' }}>{plan.price}</div>
                  </div>
                  <div style={{ fontSize: 12, color: plan.color, fontWeight: 600 }}>📈 {plan.leads}</div>
                </div>

                {/* Form fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
                  <InputField icon={User} label="Full Name *" placeholder="Your full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} error={errors.name} />
                  <InputField icon={Mail} label="Email *" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} error={errors.email} />
                  <InputField icon={Phone} label="Phone *" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} error={errors.phone} />
                  <InputField icon={Building2} label="Company (optional)" placeholder="Your business name" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                </div>

                {/* Pay button */}
                <button
                  onClick={handlePay}
                  disabled={loading}
                  style={{
                    width: '100%', padding: '15px', borderRadius: 50,
                    border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                    background: loading ? 'rgba(255,255,255,0.1)' : plan.gradient,
                    color: '#fff', fontSize: 15, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    transition: 'opacity 0.15s',
                    boxShadow: loading ? 'none' : `0 4px 20px ${plan.color}44`,
                  }}
                >
                  {loading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <CreditCard size={18} />}
                  {loading ? 'Preparing Checkout…' : `Pay ${plan.price} Securely`}
                </button>

                {/* Trust badges */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>
                    <Shield size={12} /> Secured by Razorpay
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)' }}>•</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>UPI · Cards · Net Banking</div>
                </div>
              </div>
            )}

            {/* ── PROCESSING STEP ── */}
            {step === 'processing' && (
              <div style={{ padding: '60px 32px', textAlign: 'center' }}>
                <Loader2 size={40} color={plan.color} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 20px' }} />
                <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Opening Secure Checkout…</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Please complete the payment in the Razorpay window.</div>
              </div>
            )}

            {/* ── SUCCESS STEP ── */}
            {step === 'success' && (
              <div style={{ padding: '48px 32px', textAlign: 'center' }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  <CheckCircle2 size={56} color="#2ecc71" style={{ margin: '0 auto 20px' }} />
                </motion.div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Payment Successful! 🎉</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 24, lineHeight: 1.6 }}>
                  Welcome aboard, {successData?.name}! Your <strong style={{ color: plan.color }}>{successData?.planLabel} Plan</strong> is confirmed.
                  <br />We'll reach out to <strong style={{ color: '#fff' }}>{successData?.email}</strong> within 24 hours to get you started.
                </div>
                <div style={{ background: 'rgba(46,204,113,0.08)', border: '1px solid rgba(46,204,113,0.2)', borderRadius: 14, padding: '14px 18px', marginBottom: 24, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                  📱 Expect a WhatsApp message from us at <strong style={{ color: '#fff' }}>{form.phone}</strong>
                </div>
                <button
                  onClick={onClose}
                  style={{
                    width: '100%', padding: '14px', borderRadius: 50, border: 'none',
                    background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
                    color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  Done
                </button>
              </div>
            )}

            {/* ── ERROR STEP ── */}
            {step === 'error' && (
              <div style={{ padding: '48px 32px', textAlign: 'center' }}>
                <AlertCircle size={52} color="#ff5050" style={{ margin: '0 auto 20px' }} />
                <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 10 }}>Payment Failed</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 28, lineHeight: 1.6 }}>{errorMsg}</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={() => setStep('form')}
                    style={{
                      flex: 1, padding: '13px', borderRadius: 50, border: 'none',
                      background: plan.gradient, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                    }}
                  >
                    Try Again
                  </button>
                  <a
                    href="https://wa.me/919752523894?text=Hi%20ToFly!%20I%20had%20a%20payment%20issue"
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      flex: 1, padding: '13px', borderRadius: 50,
                      background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)',
                      color: '#25d366', fontSize: 14, fontWeight: 700,
                      textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    WhatsApp Us
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  )
}