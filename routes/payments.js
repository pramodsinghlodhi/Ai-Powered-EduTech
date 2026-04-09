const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');
const Razorpay = require('razorpay');
const { verifyToken } = require('../middleware/roleAuth');
const Transaction = require('../models/Transaction');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_secret_placeholder',
});

// Helper for Commission Calculation
const calculateCommissions = (amount, teacherSharePercent = 70) => {
  const platformSharePercent = 100 - teacherSharePercent;
  const teacherAmount = (amount * teacherSharePercent) / 100;
  const platformAmount = (amount * platformSharePercent) / 100;
  return { teacherAmount, platformAmount };
};

// ==========================================
// 1. STRIPE CHECKOUT
// ==========================================
router.post('/stripe/create-checkout-session', verifyToken, async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: { name: course.title },
          unit_amount: Math.round(course.discountPrice * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: { courseId, userId: req.user.id }
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Stripe session creation failed' });
  }
});

// ==========================================
// 2. RAZORPAY ORDER
// ==========================================
router.post('/razorpay/create-order', verifyToken, async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const options = {
      amount: Math.round(course.discountPrice * 100),
      currency: 'INR',
      receipt: `course_enroll_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Razorpay order creation failed' });
  }
});

// ==========================================
// 3. CAPTURE & COMMISSION (WEBHOOK OR POSTMAN)
// ==========================================
router.post('/success-webhook', async (req, res) => {
  // Logic to finalize enrollment and split commissions
  const { userId, courseId, amount, transactionId, gateway } = req.body;
  
  try {
    const { teacherAmount, platformAmount } = calculateCommissions(amount);

    // 1. Record Transaction
    await Transaction.create({
      transactionId,
      gateway,
      amount,
      commissionAmount: platformAmount, // Platform net cut
      status: 'Successful',
      userId,
      type: 'Course Purchase'
    });

    // 2. Enroll Student
    await Enrollment.create({ studentId: userId, courseId });

    res.json({ message: 'Enrollment successful and commissions split.' });
  } catch (err) {
    res.status(500).json({ error: 'Processing finalization failed' });
  }
});

module.exports = router;
