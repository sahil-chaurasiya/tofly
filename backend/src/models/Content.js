const mongoose = require('mongoose');

// ─── SERVICE MODEL ───────────────────────────────────────────────
const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: [300, 'Short description cannot exceed 300 characters']
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String, // icon name or SVG string
    default: 'Zap'
  },
  features: [{
    title: String,
    description: String
  }],
  benefits: [String],
  coverImage: String,
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  metaTitle: String,
  metaDescription: String
}, { timestamps: true });

serviceSchema.pre('save', function(next) {
  const slugify = require('slugify');
  if (this.isModified('title') && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});


// ─── TESTIMONIAL MODEL ───────────────────────────────────────────
const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
  designation: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  avatar: {
    type: String,
    default: null
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  testimonial: {
    type: String,
    required: [true, 'Testimonial text is required'],
    maxlength: [600, 'Testimonial cannot exceed 600 characters']
  },
  service: {
    type: String // which service they used
  },
  resultMetric: {
    type: String // e.g. "3x ROI in 2 months"
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });


// ─── CASE STUDY MODEL ────────────────────────────────────────────
const caseStudySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  client: {
    name: String,
    industry: String,
    logo: String
  },
  challenge: {
    type: String,
    required: true
  },
  solution: {
    type: String,
    required: true
  },
  approach: {
    type: String
  },
  results: [{
    metric: String,   // e.g. "Revenue Growth"
    value: String,    // e.g. "312%"
    description: String
  }],
  services: [String],
  coverImage: String,
  gallery: [String],
  duration: String,  // e.g. "6 months"
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  metaTitle: String,
  metaDescription: String
}, { timestamps: true });

caseStudySchema.pre('save', function(next) {
  const slugify = require('slugify');
  if (this.isModified('title') && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});


module.exports = {
  Service: mongoose.model('Service', serviceSchema),
  Testimonial: mongoose.model('Testimonial', testimonialSchema),
  CaseStudy: mongoose.model('CaseStudy', caseStudySchema)
};
