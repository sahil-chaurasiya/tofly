const express = require('express');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const { body, validationResult } = require('express-validator');
const Payment = require('../models/Payment');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Plan prices in paise (INR × 100)
const PLAN_PRICES = {
  quarterly:  { label: 'Quarterly',   amount: 9900000  }, // ₹99,000
  halfyearly: { label: 'Half Yearly', amount: 17999800 }, // ₹1,79,998
  annually:   { label: 'Annually',    amount: 31199800 }, // ₹3,11,998
};

function getRazorpay() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay keys not configured');
  }
  return new Razorpay({
    key_id:     process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

// ─────────────────────────────────────────────
// POST /api/payment/create-order
// Creates a Razorpay order & saves to DB
// Supports both standard plans and custom plan
// ─────────────────────────────────────────────
router.post('/create-order', [
  body('planId').notEmpty().withMessage('Plan ID is required'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('company').optional().trim(),
  body('selectedServices').optional().isArray(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }

  const { planId, name, email, phone, company, selectedServices } = req.body;

  let planLabel, amount;

  if (planId === 'custom') {
    // Custom plan: calculate total from selected services
    if (!selectedServices || selectedServices.length === 0) {
      return res.status(400).json({ success: false, message: 'Please select at least one service for a custom plan.' });
    }
    amount = selectedServices.reduce((sum, s) => sum + (s.price || 0), 0);
    if (amount < 100) {
      return res.status(400).json({ success: false, message: 'Custom plan amount too low.' });
    }
    planLabel = 'Custom Plan';
  } else {
    const plan = PLAN_PRICES[planId];
    if (!plan) {
      return res.status(400).json({ success: false, message: 'Invalid plan selected.' });
    }
    planLabel = plan.label;
    amount = plan.amount;
  }

  try {
    const razorpay = getRazorpay();

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt:  `tofly_${planId}_${Date.now()}`,
      notes:    { planId, planLabel, name, email, phone },
    });

    // Save to DB
    await Payment.create({
      razorpayOrderId: order.id,
      planId,
      planLabel,
      amount,
      name, email, phone,
      company:  company || '',
      status:   'created',
      selectedServices: planId === 'custom' ? selectedServices : [],
      ipAddress: req.ip || req.headers['x-forwarded-for'],
    });

    res.json({
      success: true,
      orderId:  order.id,
      amount,
      currency: 'INR',
      planLabel,
      keyId:    process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Razorpay create-order error:', error);
    res.status(500).json({ success: false, message: 'Could not create payment order. Please try again.' });
  }
});

// ─────────────────────────────────────────────
// POST /api/payment/verify
// Verifies signature & marks payment as paid
// ─────────────────────────────────────────────
router.post('/verify', [
  body('razorpay_order_id').notEmpty(),
  body('razorpay_payment_id').notEmpty(),
  body('razorpay_signature').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Missing payment fields' });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    // Verify HMAC signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: 'failed' }
      );
      return res.status(400).json({ success: false, message: 'Payment verification failed. Contact support.' });
    }

    // Mark as paid
    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: 'paid',
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Payment verified successfully!',
      payment: {
        id:        payment._id,
        planLabel: payment.planLabel,
        amount:    payment.amount,
        name:      payment.name,
        email:     payment.email,
      },
    });
  } catch (error) {
    console.error('Razorpay verify error:', error);
    res.status(500).json({ success: false, message: 'Verification error. Please contact support.' });
  }
});

// ─────────────────────────────────────────────
// GET /api/payment  (admin only)
// ─────────────────────────────────────────────
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status && status !== 'all' ? { status } : {};
    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      Payment.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      Payment.countDocuments(query),
    ]);

    const stats = await Payment.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 }, total: { $sum: '$amount' } } },
    ]);

    res.json({
      success: true, payments,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) },
      stats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;