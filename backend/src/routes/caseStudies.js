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
    console.error('GET case-studies error:', error);
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
    console.error('GET case-study error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const caseStudy = await CaseStudy.create(req.body);
    res.status(201).json({ success: true, caseStudy });
  } catch (error) {
    console.error('POST case-study error:', error.message);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'A case study with this title already exists.' });
    }
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    // Strip fields that must never be overwritten on update
    const { _id, __v, slug, createdAt, updatedAt, client, ...updateData } = req.body;

    // Re-map nested client fields as dot-notation to avoid MongoDB path conflict
    // (sending both `client` object AND `client.name` flat key causes a conflict)
    if (client && typeof client === 'object') {
      if (client.name !== undefined)     updateData['client.name']     = client.name;
      if (client.industry !== undefined) updateData['client.industry'] = client.industry;
      if (client.logo !== undefined)     updateData['client.logo']     = client.logo;
    }

    const caseStudy = await CaseStudy.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!caseStudy) {
      return res.status(404).json({ success: false, message: 'Case study not found' });
    }

    res.json({ success: true, caseStudy });
  } catch (error) {
    console.error('PUT case-study error:', error.message);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'A case study with this title already exists.' });
    }
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await CaseStudy.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Case study deleted' });
  } catch (error) {
    console.error('DELETE case-study error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
