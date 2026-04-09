const express = require('express');
const { body, validationResult } = require('express-validator');
const Blog = require('../models/Blog');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/blogs
// @desc    Get published blogs (public) or all blogs (admin)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 9, category, search, admin } = req.query;

    const query = {};
    // Only show published for public
    if (!admin) query.isPublished = true;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const skip = (page - 1) * limit;
    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .populate('author', 'name avatar')
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .select('-content'), // exclude heavy content from list view
      Blog.countDocuments(query)
    ]);

    res.json({
      success: true,
      blogs,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/blogs/id/:id
// @desc    Get single blog by ID (admin edit)
// @access  Private
router.get('/id/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name avatar');
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
      .populate('author', 'name avatar');

    if (!blog || (!blog.isPublished && !req.query.preview)) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    // Increment views (fire and forget)
    Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } }).exec();

    // Get related blogs
    const related = await Blog.find({
      _id: { $ne: blog._id },
      category: blog.category,
      isPublished: true
    }).limit(3).select('title slug excerpt coverImage publishedAt readTime');

    res.json({ success: true, blog, related });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/blogs
// @desc    Create blog
// @access  Private
router.post('/', protect, [
  body('title').trim().notEmpty().withMessage('Title required'),
  body('excerpt').trim().notEmpty().withMessage('Excerpt required'),
  body('content').trim().notEmpty().withMessage('Content required'),
  body('category').notEmpty().withMessage('Category required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }

  try {
    const blogData = { ...req.body, author: req.user._id };
    // Ensure publishedAt is stamped when creating as published
    if (blogData.isPublished && !blogData.publishedAt) {
      blogData.publishedAt = new Date();
    }
    const blog = await Blog.create(blogData);
    res.status(201).json({ success: true, blog });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'A blog with this title already exists' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update blog
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    // Allow slug update if title changed
    if (req.body.title) {
      const slugify = require('slugify');
      req.body.slug = slugify(req.body.title, { lower: true, strict: true });
    }
    // Set publishedAt when publishing (findByIdAndUpdate bypasses pre('save') hook)
    if (req.body.isPublished) {
      const existing = await Blog.findById(req.params.id).select('publishedAt');
      if (existing && !existing.publishedAt) {
        req.body.publishedAt = new Date();
      }
    }
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete blog
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;