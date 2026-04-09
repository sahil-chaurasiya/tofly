import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tfm_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle auth errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth and redirect to login (if in admin section)
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('tfm_token')
        localStorage.removeItem('tfm_user')
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  }
)

// ── Public API helpers ──────────────────────────────────────

export const publicAPI = {
  // Blogs
  getBlogs: (params) => api.get('/blogs', { params }),
  getBlog: (slug) => api.get(`/blogs/${slug}`),

  // Services
  getServices: () => api.get('/services'),
  getService: (slug) => api.get(`/services/${slug}`),

  // Testimonials
  getTestimonials: (params) => api.get('/testimonials', { params }),

  // Case Studies
  getCaseStudies: (params) => api.get('/case-studies', { params }),
  getCaseStudy: (slug) => api.get(`/case-studies/${slug}`),

  // Leads
  submitLead: (data) => api.post('/leads', data),
}

// ── Admin API helpers ───────────────────────────────────────

export const adminAPI = {
  // Auth
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  changePassword: (data) => api.put('/auth/change-password', data),

  // Leads (admin)
  getLeads: (params) => api.get('/leads', { params }),
  updateLeadStatus: (id, data) => api.put(`/leads/${id}/status`, data),
  deleteLead: (id) => api.delete(`/leads/${id}`),

  // Blogs (admin)
  getBlogs: (params) => api.get('/blogs', { params: { ...params, admin: true } }),
  getBlog: (id) => api.get(`/blogs/id/${id}`),
  createBlog: (data) => api.post('/blogs', data),
  updateBlog: (id, data) => api.put(`/blogs/${id}`, data),
  deleteBlog: (id) => api.delete(`/blogs/${id}`),

  // Services
  getServices: () => api.get('/services', { params: { admin: true } }),
  createService: (data) => api.post('/services', data),
  updateService: (id, data) => api.put(`/services/${id}`, data),
  deleteService: (id) => api.delete(`/services/${id}`),

  // Testimonials
  getTestimonials: () => api.get('/testimonials', { params: { admin: true } }),
  createTestimonial: (data) => api.post('/testimonials', data),
  updateTestimonial: (id, data) => api.put(`/testimonials/${id}`, data),
  deleteTestimonial: (id) => api.delete(`/testimonials/${id}`),

  // Case Studies
  getCaseStudies: () => api.get('/case-studies', { params: { admin: true } }),
  createCaseStudy: (data) => api.post('/case-studies', data),
  updateCaseStudy: (id, data) => api.put(`/case-studies/${id}`, data),
  deleteCaseStudy: (id) => api.delete(`/case-studies/${id}`),

  // Upload
  uploadImage: (file, type = 'misc') => {
    const formData = new FormData()
    formData.append('image', file)
    return api.post(`/upload?type=${type}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
}

export default api