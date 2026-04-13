const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  // Razorpay IDs
  razorpayOrderId:   { type: String, required: true, unique: true },
  razorpayPaymentId: { type: String, default: null },
  razorpaySignature: { type: String, default: null },

  // Plan info
  planId:    { type: String, required: true, enum: ['quarterly', 'halfyearly', 'annually'] },
  planLabel: { type: String, required: true },
  amount:    { type: Number, required: true }, // in paise
  currency:  { type: String, default: 'INR' },

  // Customer info
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  phone:   { type: String, required: true },
  company: { type: String, default: '' },

  // Status
  status: {
    type: String,
    enum: ['created', 'paid', 'failed'],
    default: 'created',
  },

  // Meta
  ipAddress: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);