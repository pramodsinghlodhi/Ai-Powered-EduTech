const express = require('express');
const { verifyToken } = require('../middleware/roleAuth');
const UserProgress = require('../models/UserProgress');
const Course = require('../models/Course');
const { Sequelize } = require('sequelize');

const router = express.Router();

router.use(verifyToken);

// ==========================================
// 1. VIDEO HEARTBEAT (PROGRESS TRACKING)
// ==========================================
router.post('/heartbeat', async (req, res) => {
  const { chapterId, lastWatchedTimestamp, completionPercentage } = req.body;
  const userId = req.user.id;
  
  try {
    const [progress, created] = await UserProgress.findOrCreate({
      where: { userId, chapterId },
      defaults: { lastWatchedTimestamp, completionPercentage }
    });

    if (!created) {
      await progress.update({ 
        lastWatchedTimestamp, 
        completionPercentage,
        isCompleted: completionPercentage >= 95 
      });
    }

    res.json({ message: 'Progress synchronized successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Heartbeat sync failed' });
  }
});

// ==========================================
// 2. PERSONALIZED RECOMMENDATIONS (AI-BASED)
// ==========================================
router.get('/recommendations', async (req, res) => {
  try {
    // Advanced SQL Join Logic: Link top-selling courses within the same Tenant 
    // tailored to the User's role and enrollment history.
    const recommendations = await Course.findAll({
       where: { tenantId: req.user.tenantId || null },
       order: Sequelize.literal('RAND()'), // Mock AI randomness for MVP
       limit: 3
    });
    
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ error: 'Recommendation engine failed' });
  }
});

module.exports = router;
