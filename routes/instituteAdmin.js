const express = require('express');
const { verifyToken, authorizeRoles } = require('../middleware/roleAuth');
const User = require('../models/User');
const Course = require('../models/Course');
const Batch = require('../models/Batch');
const Installment = require('../models/Installment');

const router = express.Router();

// Apply auth strictly for Institute Admins
router.use(verifyToken);
router.use(authorizeRoles('Institute Admin', 'Super Admin'));

// ==========================================
// 1. TEACHER MANAGEMENT
// ==========================================
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await User.findAll({ where: { role: 'Teacher', tenantId: req.user.tenantId }});
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Server error logic' });
  }
});

// ==========================================
// 2. COURSE & BATCH SYSTEM
// ==========================================
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.findAll({ where: { tenantId: req.user.tenantId }});
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Server error logic' });
  }
});

router.get('/batches', async (req, res) => {
  try {
    const batches = await Batch.findAll({ where: { tenantId: req.user.tenantId }});
    res.json(batches);
  } catch (error) {
    res.status(500).json({ error: 'Server error logic' });
  }
});

// ==========================================
// 3. STUDENT ADMISSIONS & WALLET
// ==========================================
router.get('/students', async (req, res) => {
  try {
    // A more complex query via Enrollment table isn't needed for skeleton setup.
    const students = await User.findAll({ where: { role: 'Student' }});
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Server error logic' });
  }
});

// ==========================================
// 4. FINANCIAL (INSTALLMENTS / EXPENSES)
// ==========================================
router.get('/installments', async (req, res) => {
  try {
    const installments = await Installment.findAll(); // Should filter by batches owned by this tenant
    res.json(installments);
  } catch (error) {
    res.status(500).json({ error: 'Server error logic' });
  }
});

module.exports = router;
