import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'

// Public layout + pages
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import CaseStudyDetailPage from './pages/CaseStudyDetailPage'
import BlogPage from './pages/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import PricingPage from './pages/PricingPage'

// Admin
import AdminLayout from './components/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLeads from './pages/admin/AdminLeads'
import AdminBlogs from './pages/admin/AdminBlogs'
import AdminBlogEditor from './pages/admin/AdminBlogEditor'
import AdminServices from './pages/admin/AdminServices'
import AdminTestimonials from './pages/admin/AdminTestimonials'
import AdminCaseStudies from './pages/admin/AdminCaseStudies'
import AdminPayments from './pages/admin/AdminPayments'
import ProtectedRoute from './components/admin/ProtectedRoute'

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.key === 'm') {
        e.preventDefault()
        navigate('/astrology-pricing')
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [navigate])

  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          {/* ── Public Routes (with Navbar + Footer) ── */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* ── Standalone (no Navbar / Footer) ── */}
          <Route path="/astrology-pricing" element={<PricingPage />} />

          {/* ── Admin Routes ── */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="blogs/new" element={<AdminBlogEditor />} />
            <Route path="blogs/edit/:id" element={<AdminBlogEditor />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="case-studies" element={<AdminCaseStudies />} />
            <Route path="payments" element={<AdminPayments />} />
          </Route>

        </Routes>
      </AnimatePresence>
    </AuthProvider>
  )
}