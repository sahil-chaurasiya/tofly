const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number too long']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  service: {
    type: String,
    enum: [
      'performance-marketing',
      'lead-generation',
      'social-media-marketing',
      'paid-advertising',
      'affiliate-marketing',
      'other'
    ],
    default: 'other'
  },
  message: {
    type: String,
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  budget: {
    type: String,
    enum: ['under-25k', '25k-50k', '50k-1L', '1L-5L', 'above-5L', 'not-specified'],
    default: 'not-specified'
  },
  source: {
    type: String,
    enum: ['contact-form', 'hero-cta', 'service-page', 'blog', 'other'],
    default: 'contact-form'
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'proposal-sent', 'converted', 'lost'],
    default: 'new'
  },
  notes: {
    type: String,
    trim: true
  },
  ipAddress: {
    type: String
  }
}, {
  timestamps: true
});

// Index for quick filtering
leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ email: 1 });

module.exports = mongoose.model('Lead', leadSchema);
