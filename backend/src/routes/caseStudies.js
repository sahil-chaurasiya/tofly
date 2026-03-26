const express = require('express');
const { CaseStudy } = require('../models/Content');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const query = req.query.admin ? {} : { isPublished: true };
    if (req.query.featured) query.isFeatured = true;
    const caseStudies = await CaseStudy.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, caseStudies });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findOne({ slug: req.params.slug });
    if (!caseStudy || (!caseStudy.isPublished && !req.query.preview)) {
      return res.status(404).json({ success: false, message: 'Case study not found' });
    }
    res.json({ success: true, caseStudy });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const caseStudy = await CaseStudy.create(req.body);
    res.status(201).json({ success: true, caseStudy });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!caseStudy) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, caseStudy });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await CaseStudy.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Case study deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
