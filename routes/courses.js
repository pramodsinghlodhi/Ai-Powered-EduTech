const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

// Get all courses (Marketplace)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching courses' });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching course' });
  }
});

// Create course (Admin/Teacher) - TODO: Add JWT middleware
router.post('/', async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while creating course' });
  }
});

module.exports = router;
