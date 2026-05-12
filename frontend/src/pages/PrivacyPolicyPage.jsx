import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Shield, Database, Eye, Share2, Cookie, Puzzle, CheckCircle, UserCheck, Phone, RefreshCw, Mail, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PageWrapper, SectionWrapper, SectionTag, CTABanner } from '../components/common'

const SECTIONS = [
  {
    icon: Database,
    number: '01',
    title: 'Information We Collect',
    intro: 'We may collect the following information from users who reach out to us:',
    list: [
      'Name',
      'Phone Number',
      'Email Address',
      'Business Information',
      'Website Requirements',
      'Any other details submitted through forms or inquiries',
    ],
  },
  {
    icon: Eye,
    number: '02',
    title: 'How We Use Your Information',
    intro: 'The information collected is used strictly for:',
    list: [
      'Contacting you regarding our services',
      'Providing website development and digital solutions',
      'Sharing quotations and project details',
      'Customer support and communication',
      'Improving our services and marketing campaigns',
    ],
  },
  {
    icon: Shield,
    number: '03',
    title: 'Data Protection',
    body: 'To Fly Media takes reasonable security measures to protect your personal information from unauthorized access, misuse, or disclosure. We implement appropriate technical and organizational safeguards to ensure your data remains secure.',
  },
  {
    icon: Share2,
    number: '04',
    title: 'Sharing of Information',
    body: 'We do not sell, rent, or share your personal information with third parties for marketing purposes. Your information is used only for business communication related to our services.',
  },
  {
    icon: Cookie,
    number: '05',
    title: 'Cookies & Tracking',
    body: 'Our website may use cookies or similar technologies to improve user experience, analyze website traffic, and optimize marketing campaigns. You can control cookie settings through your browser preferences.',
  },
  {
    icon: Puzzle,
    number: '06',
    title: 'Third-Party Services',
    body: 'We may use third-party tools such as Meta Ads, Google Analytics, WhatsApp, or email services for communication and marketing purposes. These services have their own privacy policies governing the use of your information.',
  },
  {
    icon: CheckCircle,
    number: '07',
    title: 'User Consent',
    body: 'By submitting your information through our website or advertisement forms, you consent to being contacted by To Fly Media regarding website development and related services.',
  },
  {
    icon: UserCheck,
    number: '08',
    title: 'Your Rights',
    body: 'You may request to update or remove your personal information at any time by contacting us directly. We will process your request promptly and in accordance with applicable data protection laws.',
  },
  {
    icon: RefreshCw,
    number: '10',
    title: 'Updates to This Policy',
    body: 'To Fly Media reserves the right to update or modify this Privacy Policy at any time without prior notice. We encourage users to review this page periodically to stay informed about how we protect your information.',
  },
]

export default function PrivacyPolicyPage() {
  const navigate = useNavigate()
  return (
    <PageWrapper>
      <Helmet>
        <title>Privacy Policy – To Fly Media</title>
        <meta
          name="description"
          content="Privacy Policy of To Fly Media — learn how we collect, use, and protect your personal information."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-500/8 blur-[120px] pointer-events-none" />
        <div
          className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: 'rgba(249,115,22,0.06)' }}
        />
        <div className="container-site relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-8">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors group"
              >
                <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-200" />
                Back
              </button>
            </div>
            <div className="block mb-2">
              <SectionTag icon={Shield}>Legal</SectionTag>
            </div>
            <h1 className="section-heading text-white text-5xl md:text-6xl xl:text-7xl mt-5 mb-6 leading-[1.05]">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-lg text-white/50 leading-relaxed max-w-2xl">
              Welcome to <span className="text-white/80 font-semibold">To Fly Media</span>. Your privacy matters to us. This policy explains how we collect, use, and protect information shared through our website, advertisements, and contact forms.
            </p>
            <div
              className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(51,105,255,0.08)',
                border: '1px solid rgba(51,105,255,0.2)',
                color: 'rgba(125,168,255,0.8)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
              Effective Date: May 12, 2026
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <SectionWrapper className="pb-8">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Sticky sidebar (desktop only) */}
            <aside className="hidden lg:block">
              <div className="glass-card p-6 sticky top-28">
                <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Contents</p>
                <nav className="space-y-1">
                  {[
                    'Information We Collect',
                    'How We Use Your Information',
                    'Data Protection',
                    'Sharing of Information',
                    'Cookies & Tracking',
                    'Third-Party Services',
                    'User Consent',
                    'Your Rights',
                    'Contact Us',
                    'Updates to This Policy',
                  ].map((item, i) => (
                    <a
                      key={i}
                      href={`#section-${i}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/40 hover:text-white/80 hover:bg-white/[0.04] transition-all duration-200 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-brand-500/50 group-hover:bg-brand-400 transition-colors shrink-0" />
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Cards */}
            <div className="lg:col-span-2 space-y-5">
              {SECTIONS.map((section, i) => (
                <motion.div
                  key={i}
                  id={`section-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card p-8 hover:border-brand-500/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-5">
                    <div className="shrink-0 flex flex-col items-center gap-2">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: 'rgba(51,105,255,0.1)', border: '1px solid rgba(51,105,255,0.2)' }}
                      >
                        <section.icon size={20} className="text-brand-400" />
                      </div>
                      <span className="text-[10px] font-bold text-white/20 font-display tracking-wider">{section.number}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-bold text-white mb-3">{section.title}</h2>
                      {section.intro && (
                        <p className="text-white/50 text-sm mb-3 leading-relaxed">{section.intro}</p>
                      )}
                      {section.body && (
                        <p className="text-white/50 text-sm leading-relaxed">{section.body}</p>
                      )}
                      {section.list && (
                        <ul className="space-y-2 mt-1">
                          {section.list.map((item, j) => (
                            <li key={j} className="flex items-start gap-3 text-sm text-white/50">
                              <span
                                className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                                style={{ background: 'rgba(51,105,255,0.7)' }}
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Contact card — accent styled */}
              <motion.div
                id="section-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-2xl p-8 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(51,105,255,0.10) 0%, rgba(249,115,22,0.06) 100%)',
                  border: '1px solid rgba(51,105,255,0.25)',
                }}
              >
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-brand-500/15 blur-2xl pointer-events-none" />
                <div className="flex items-start gap-5 relative z-10">
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)' }}
                    >
                      <Phone size={20} className="text-accent-400" />
                    </div>
                    <span className="text-[10px] font-bold text-white/20 font-display tracking-wider">09</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white mb-3">Contact Us</h2>
                    <p className="text-white/50 text-sm mb-5 leading-relaxed">
                      Have questions about this Privacy Policy? Reach out to us directly.
                    </p>
                    <p className="text-white/80 font-semibold mb-3">To Fly Media</p>
                    <div className="space-y-3">
                      <a
                        href="tel:+919752523894"
                        className="flex items-center gap-3 text-sm group/link"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover/link:border-brand-500/30 transition-colors">
                          <Phone size={14} className="text-brand-400" />
                        </div>
                        <span className="text-white/55 group-hover/link:text-white/90 transition-colors">+91 9752523894</span>
                      </a>
                      <a
                        href="mailto:toflymedia@gmail.com"
                        className="flex items-center gap-3 text-sm group/link"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover/link:border-brand-500/30 transition-colors">
                          <Mail size={14} className="text-brand-400" />
                        </div>
                        <span className="text-white/55 group-hover/link:text-white/90 transition-colors">toflymedia@gmail.com</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </SectionWrapper>

      <div className="pb-20" />
      {/* <CTABanner /> */}
    </PageWrapper>
  )
}