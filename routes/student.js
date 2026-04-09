const express = require('express');
const { verifyToken, authorizeRoles } = require('../middleware/roleAuth');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const CourseSection = require('../models/CourseSection');
const CourseChapter = require('../models/CourseChapter');

const router = express.Router();

router.use(verifyToken);
router.use(authorizeRoles('Student', 'Super Admin'));

// ==========================================
// 1. MY ENROLLED COURSES
// ==========================================
router.get('/dashboard/courses', async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { studentId: req.user.id },
      include: [{ model: Course }]
    });
    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch enrolled courses' });
  }
});

// ==========================================
// 2. COURSE CONTENT (SECTIONS & CHAPTERS)
// ==========================================
router.get('/courses/:courseId/curriculum', async (req, res) => {
  const { courseId } = req.params;
  
  try {
    // 1. Check if the student is enrolled first (Shield content)
    const isEnrolled = await Enrollment.findOne({
      where: { studentId: req.user.id, courseId }
    });

    if (!isEnrolled && req.user.role !== 'Super Admin') {
      return res.status(403).json({ error: 'Access Denied. You must enroll in this course to view its content.' });
    }

    // 2. Fetch all sections and their nested chapters
    const sections = await CourseSection.findAll({
      where: { courseId },
      include: [{ model: CourseChapter, as: 'chapters' }],
      order: [
        ['order', 'ASC'],
        [{ model: CourseChapter, as: 'chapters' }, 'order', 'ASC']
      ]
    });

    res.json(sections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch course curriculum' });
  }
});

module.exports = router;
