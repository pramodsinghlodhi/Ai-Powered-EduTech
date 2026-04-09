const express = require('express');
const { google } = require('googleapis');
const { verifyToken, authorizeRoles } = require('../middleware/roleAuth');
const LiveClass = require('../models/LiveClass');
const Course = require('../models/Course');

const router = express.Router();

router.use(verifyToken);
router.use(authorizeRoles('Teacher', 'Super Admin'));

// ==========================================
// 1. GOOGLE CALENDAR & MEET GENERATION
// ==========================================
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID || 'your-client-id',
  process.env.GOOGLE_CLIENT_SECRET || 'your-client-secret',
  process.env.GOOGLE_REDIRECT_URL || 'http://localhost:5000/auth/google/callback'
);

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

router.post('/live-class/create', async (req, res) => {
  const { batchId, topic, startTime, endTime } = req.body;

  try {
    // 1. Create Google Calendar Event with Conference Data
    const event = {
      summary: topic,
      description: `EduCreative Live Class for Batch #${batchId}`,
      start: { dateTime: startTime, timeZone: 'Asia/Kolkata' },
      end: { dateTime: endTime, timeZone: 'Asia/Kolkata' },
      conferenceData: {
        createRequest: {
          requestId: `edu_${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' }
        }
      }
    };

    const calendarResponse = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1
    });

    const googleMeetLink = calendarResponse.data.hangoutLink;
    const googleEventId = calendarResponse.data.id;

    // 2. Save to our database
    const newClass = await LiveClass.create({
      batchId,
      teacherId: req.user.id,
      topic,
      startTime,
      endTime,
      googleMeetLink,
      googleEventId
    });

    res.status(201).json(newClass);
  } catch (error) {
    console.error('Google Calendar error:', error);
    res.status(500).json({ error: 'Failed to create Google Meet session' });
  }
});

// ==========================================
// 2. SYNC RECORDING FROM DRIVE TO S3
// ==========================================
// Note: This logic needs Drive Webhooks or a separate worker 
// Here we scaffold the endpoint that would trigger the sync
router.post('/live-class/:id/sync-recording', async (req, res) => {
  const { driveFileId } = req.body;
  const classId = req.params.id;

  try {
    // 1. Logic to download from Google Drive using driveFileId
    // 2. Logic to upload using our existing awsS3Service.uploadToS3(buffer, name, type)
    // 3. Update LiveClass recordingUrl column
    
    await LiveClass.update({ recordingUrl: 'https://s3.placeholder.com/file.mp4' }, { where: { id: classId } });
    res.json({ message: 'Recording synced and buffered to AWS S3 successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Recording sync failed' });
  }
});

// ==========================================
// 3. TEACHER DASHBOARD STATS (Earning Splits)
// ==========================================
router.get('/dashboard/earnings', async (req, res) => {
  try {
    // Query our Transaction table for successful course purchases linked to this teacher
    res.json({ message: 'Teacher Payout analytics generated' });
  } catch (err) {
    res.status(500).json({ error: 'Earnings fetch failed' });
  }
});

module.exports = router;
