import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowRight } from 'lucide-react'
import { PageWrapper } from '../components/common'

export default function NotFoundPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/6 blur-[120px] pointer-events-none" />

        <div className="text-center relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[150px] md:text-[200px] font-black font-display leading-none mb-4"
            style={{ background: 'linear-gradient(135deg, rgba(51,105,255,0.15), rgba(51,105,255,0.04))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            404
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
            <p className="text-white/45 mb-10 max-w-md mx-auto">
              Looks like this page flew too high and got lost. Let's get you back on track.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link to="/" className="btn-primary">
                <Home size={18} />
                Back to Home
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact Us
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
