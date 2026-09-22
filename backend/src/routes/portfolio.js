// ─────────────────────────────────────────────
// portfolio.js — drives the fully-dynamic /tofly-portfolio page
// ─────────────────────────────────────────────
const express = require('express');
const PortfolioContent = require('../models/PortfolioContent');
const DEFAULTS = require('../utils/portfolioDefaults');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

const KEY = 'tofly-portfolio';

// GET /api/portfolio — public, auto-creates the default document the
// very first time it's requested so the page never breaks on a fresh DB.
router.get('/', async (req, res) => {
  try {
    let content = await PortfolioContent.findOne({ key: KEY });
    if (!content) {
      content = await PortfolioContent.create(DEFAULTS);
    }
    res.json({ success: true, content });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/portfolio — admin only. Upserts the whole document, so every
// section (arrays included) is fully replaced with whatever the admin
// panel sends — that's what lets items be added/removed/reordered.
router.put('/', protect, adminOnly, async (req, res) => {
  try {
    const body = { ...req.body };
    delete body._id;
    delete body.key;
    delete body.createdAt;
    delete body.updatedAt;
    delete body.__v;

    const content = await PortfolioContent.findOneAndUpdate(
      { key: KEY },
      { $set: body },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );
    res.json({ success: true, content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// POST /api/portfolio/reset — admin only. Restores the original default copy.
router.post('/reset', protect, adminOnly, async (req, res) => {
  try {
    const content = await PortfolioContent.findOneAndUpdate(
      { key: KEY },
      { $set: DEFAULTS },
      { new: true, upsert: true }
    );
    res.json({ success: true, content });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;