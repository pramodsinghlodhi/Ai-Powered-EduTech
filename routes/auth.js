const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { validateRequest, registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } = require('../middleware/validator');
const { sendResetEmail } = require('../services/emailService');
const logger = require('../services/logger');
const { Op } = require('sequelize');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  logger.error('CRITICAL ERROR: JWT_SECRET is not defined in environment variables!');
  // In a real production app, you might want to process.exit(1) here
}


// Register (Traditional)
router.post('/register', validateRequest(registerSchema), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with Tenant Context and Session ID
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'Student',
      tenantId: req.tenant ? req.tenant.id : null,
      session_id: crypto.randomUUID()
    });

    logger.info(`User registered: ${email} for Tenant: ${newUser.tenantId}`);
    res.status(201).json({ message: 'User registered successfully', userId: newUser.id, tenantId: newUser.tenantId });
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login (Traditional)
router.post('/login', validateRequest(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Single Session Control: Generate new session ID
    const newSessionId = crypto.randomUUID();
    await user.update({ session_id: newSessionId });

    // Create Token with Session ID
    const token = jwt.sign(
      { id: user.id, role: user.role, tenantId: user.tenantId, session_id: newSessionId },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    logger.info(`User logged in: ${email}`);
    res.json({
      message: 'Logged in successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId
      }
    });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Firebase / Social Sync Endpoint
// Bridges Firebase Auth (External) with our MySQL Relational DB (Internal)
router.post('/firebase-sync', async (req, res) => {
  try {
    const { uid, email, name, role } = req.body;

    // 1. Find or Create User Record in MySQL
    let user = await User.findOne({ where: { email } });

    if (!user) {
      // If it's a first-time Social login, create the entry with the chosen Role
      user = await User.create({
        name,
        email,
        role: role || 'Student',
        tenantId: req.tenant ? req.tenant.id : null,
        session_id: crypto.randomUUID()
      });
      logger.info(`New Social User Synced: ${email} (Role: ${user.role})`);
    }

    // 2. Refresh Session ID for "One Device Policy" protection
    const newSessionId = crypto.randomUUID();
    await user.update({ session_id: newSessionId });

    // 3. Generate our Platform JWT for subsequent API access
    const token = jwt.sign(
      { id: user.id, role: user.role, tenantId: user.tenantId, session_id: newSessionId },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Social login synchronized successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId
      }
    });
  } catch (error) {
    logger.error(`Social Sync Fail: ${error.message}`);
    res.status(500).json({ error: 'Internal server error during social sync' });
  }
});

// Forgot Password Request
router.post('/forgot-password', validateRequest(forgotPasswordSchema), async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // For security, don't reveal if user exists or not
      return res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' });
    }

    // Generate token
    const token = crypto.randomBytes(20).toString('hex');
    const expiry = Date.now() + 3600000; // 1 hour from now

    // Save to DB
    await user.update({
      resetPasswordToken: token,
      resetPasswordExpires: expiry
    });

    // Send Email
    await sendResetEmail(email, token);

    res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
  } catch (error) {
    logger.error(`Forgot password error: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Reset Password Execution
router.post('/reset-password', validateRequest(resetPasswordSchema), async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() }
      }
    });

    if (!user) {
      return res.status(400).json({ error: 'Password reset token is invalid or has expired.' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user and clear reset fields
    await user.update({
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null
    });

    res.json({ message: 'Password has been successfully reset! You can now login with your new password.' });
  } catch (error) {
    logger.error(`Reset password error: ${error.message}`);
    res.status(500).json({ error: 'Internal server error during password reset' });
  }
});

module.exports = router;
