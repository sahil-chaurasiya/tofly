import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { Send, MapPin, Phone, Mail, MessageCircle, CheckCircle } from 'lucide-react'
import { publicAPI } from '../utils/api'
import { PageWrapper, SectionWrapper, SectionTag } from '../components/common'

const SERVICES = [
  { value: 'brand-strategy-consulting', label: 'Brand Strategy & Consulting' },
  { value: 'website-development-ecommerce', label: 'Website Development & E-Commerce' },
  { value: 'social-media-marketing', label: 'Social Media Marketing' },
  { value: 'google-meta-ads', label: 'Google & Meta Ads' },
  { value: 'influencer-awareness-marketing', label: 'Influencer & Awareness Marketing' },
  { value: 'branding-solutions', label: 'Branding Solutions' },
  { value: 'seo-local-marketing', label: 'SEO & Local Marketing' },
  { value: 'bulk-whatsapp-sms-marketing', label: 'Bulk WhatsApp & SMS Marketing' },
  { value: 'bulk-voice-call-ivr', label: 'Bulk Voice Call & IVR Services' },
  { value: 'other', label: 'Not Sure Yet' },
]

const BUDGETS = [
  { value: 'under-25k', label: 'Under ₹25,000/mo' },
  { value: '25k-50k', label: '₹25,000 – ₹50,000/mo' },
  { value: '50k-1L', label: '₹50,000 – ₹1,00,000/mo' },
  { value: '1L-5L', label: '₹1L – ₹5L/mo' },
  { value: 'above-5L', label: 'Above ₹5L/mo' },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await publicAPI.submitLead({ ...data, source: 'contact-form' })
      setSubmitted(true)
      reset()
      toast.success("Message sent! We'll be in touch within 24 hours.")
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <Helmet>
        <title>Contact Us – To Fly Media | Get Your Free Marketing Audit</title>
        <meta name="description" content="Contact To Fly Media for a free digital marketing audit. Serving businesses across Bhopal, Mumbai, Delhi & Ahmedabad. Reach us via form, phone, email, or WhatsApp." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-500/8 blur-[100px] pointer-events-none" />
        <div className="container-site relative z-10">
          <SectionTag icon={MessageCircle}>Get in Touch</SectionTag>
          <h1 className="section-heading text-white text-5xl md:text-6xl mt-4 mb-6">
            Let's Build Something<br />
            <span className="gradient-text">Great Together</span>
          </h1>
          <p className="text-xl text-white/50 max-w-xl">
            Tell us about your business and goals. We'll analyze your current marketing and come back with a clear growth plan. Free. No obligations.
          </p>
        </div>
      </section>

      <SectionWrapper className="container-site pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-12 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={36} className="text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Message Received! 🎉</h2>
                <p className="text-white/55 mb-8">
                  Thanks for reaching out. Our team will review your details and get back to you within 24 hours with a custom growth plan.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary">
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <div className="glass-card p-8 md:p-10">
                <h2 className="text-2xl font-bold text-white mb-2">Get Your Free Marketing Audit</h2>
                <p className="text-white/45 text-sm mb-8">Fill out the form and we'll reach out within 24 hours.</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">
                        Your Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        {...register('name', { required: 'Name is required', maxLength: { value: 100, message: 'Too long' } })}
                        placeholder="Rahul Sharma"
                        className={`input-field ${errors.name ? 'border-red-500/50' : ''}`}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' }
                        })}
                        type="email"
                        placeholder="rahul@company.com"
                        className={`input-field ${errors.email ? 'border-red-500/50' : ''}`}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">Phone Number</label>
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">Company Name</label>
                      <input
                        {...register('company')}
                        placeholder="Your Company"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Service Interested In</label>
                    <select {...register('service')} className="input-field appearance-none cursor-pointer">
                      {SERVICES.map(s => (
                        <option key={s.value} value={s.value} style={{ background: '#0d0d20' }}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-white/60 mb-3">
                      Monthly Marketing Budget
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {BUDGETS.map(b => (
                        <label key={b.value} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            value={b.value}
                            {...register('budget')}
                            className="accent-brand-500"
                          />
                          <span className="text-sm text-white/50 group-hover:text-white/80 transition-colors">
                            {b.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div> */}

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Tell Us About Your Goals
                    </label>
                    <textarea
                      {...register('message', { maxLength: { value: 1000, message: 'Max 1000 characters' } })}
                      rows={4}
                      placeholder="What are your current challenges? What does success look like in 6 months?"
                      className={`input-field resize-none ${errors.message ? 'border-red-500/50' : ''}`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-white/25">
                    By submitting, you agree to receive marketing communications from To Fly Media.
                  </p>
                </form>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* WhatsApp */}
            <a
              href="https://wa.me/919752523894?text=Hi%2C+I'd+like+a+free+marketing+audit."
              target="_blank"
              rel="noopener noreferrer"
              className="block glass-card p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(37,211,102,0.1)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#25d366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-green-400 transition-colors">Chat on WhatsApp</div>
                  <div className="text-xs text-white/35 mt-0.5">Usually responds within an hour</div>
                </div>
              </div>
            </a>

            {/* Contact details */}
            <div className="glass-card p-6 space-y-5">
              <h3 className="font-semibold text-white">Direct Contact</h3>
              {[
                { icon: Phone, label: '+91 9752523894', href: 'tel:+919752523894' },
                { icon: Mail, label: 'toflymedia@gmail.com', href: 'mailto:toflymedia@gmail.com' },
              ].map(({ icon: Icon, label, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-brand-400" />
                  </div>
                  {href ? (
                    <a href={href} className="text-sm text-white/55 hover:text-white transition-colors">{label}</a>
                  ) : (
                    <span className="text-sm text-white/55">{label}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Availability */}
            <div className="glass-card p-6">
              <h3 className="font-semibold text-white mb-4">Availability</h3>
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-white/70 text-sm font-medium">24 / 7</span>
                  <span className="text-white/40 text-xs mt-0.5">Always available for you</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                We're online right now
              </div>
            </div>

            {/* Where we work + map */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={15} className="text-brand-400" />
                <h3 className="font-semibold text-white">Office Locations</h3>
              </div>

              {/* City tabs */}
              {(() => {
                const cities = [
                  { city: 'Bhopal', tag: 'HQ', q: 'Bhopal,+Madhya+Pradesh,+India' },
                  { city: 'Mumbai', tag: null, q: 'Mumbai,+Maharashtra,+India' },
                  { city: 'Delhi', tag: null, q: 'New+Delhi,+Delhi,+India' },
                  { city: 'Ahmedabad', tag: null, q: 'Ahmedabad,+Gujarat,+India' },
                ]
                const [active, setActive] = useState(0)
                return (
                  <>
                    <div className="grid grid-cols-4 gap-1.5 mb-4">
                      {cities.map(({ city, tag }, i) => (
                        <button
                          key={city}
                          onClick={() => setActive(i)}
                          className={`flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl border text-xs font-medium transition-all duration-200 ${
                            active === i
                              ? 'border-brand-500/50 bg-brand-500/10 text-brand-300'
                              : 'border-white/6 bg-white/3 text-white/40 hover:text-white/70 hover:border-white/15'
                          }`}
                        >
                          {city}
                          {tag && (
                            <span className="text-[9px] font-semibold uppercase tracking-wider text-brand-400">
                              {tag}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="rounded-xl overflow-hidden border border-white/6">
                      <iframe
                        key={active}
                        src={`https://maps.google.com/maps?q=${cities[active].q}&output=embed&z=12`}
                        width="100%"
                        height="200"
                        style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)', display: 'block' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`${cities[active].city} location`}
                      />
                    </div>
                  </>
                )
              })()}

              <p className="text-xs text-white/25 mt-3">Remote-first. We work with clients pan-India.</p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </PageWrapper>
  )
}