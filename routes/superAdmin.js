const express = require('express');
const { verifyToken, authorizeRoles } = require('../middleware/roleAuth');
const User = require('../models/User');
const Tenant = require('../models/Tenant');
const Course = require('../models/Course');
const Transaction = require('../models/Transaction');
const SupportTicket = require('../models/SupportTicket');

const router = express.Router();

// Apply auth strictly for Super Admins
router.use(verifyToken);
router.use(authorizeRoles('Super Admin'));

// ==========================================
// 1. PLATFORM & DASHBOARD ANALYTICS
// ==========================================
router.get('/dashboard/stats', async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalInstitutes = await Tenant.count();
    const totalCourses = await Course.count();
    
    // Calculate Total Revenue using sum aggregator
    const totalRevenue = await Transaction.sum('amount', { where: { status: 'Successful' }}) || 0;

    res.json({
      stats: {
        totalUsers,
        totalInstitutes,
        totalCourses,
        totalRevenue
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error loading stats' });
  }
});

// ==========================================
// 2. USER & INSTITUTE MANAGEMENT
// ==========================================
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] }});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error logic' });
  }
});

router.post('/institutes/approve', async (req, res) => {
  try {
    const { tenantId, status } = req.body;
    await Tenant.update({ isActive: status }, { where: { id: tenantId }});
    res.json({ message: `Institute status updated successfully` });
  } catch (error) {
    res.status(500).json({ error: 'Server error logic' });
  }
});

// ==========================================
// 3. FINANCIAL & TRANSACTION MANAGEMENT
// ==========================================
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ order: [['createdAt', 'DESC']], limit: 100 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Server error logic' });
  }
});

// ==========================================
// 4. SUPPORT & TICKETS
// ==========================================
router.get('/tickets', async (req, res) => {
  try {
    const tickets = await SupportTicket.findAll();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Server error logic' });
  }
});

module.exports = router;
