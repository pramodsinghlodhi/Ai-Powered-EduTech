const nodemailer = require('nodemailer');
const logger = require('./logger');

/**
 * Configure Transporter
 * For production, use actual SMTP credentials from .env
 */
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'placeholder@example.com',
    pass: process.env.EMAIL_PASS || 'password_placeholder',
  },
});

/**
 * Send Password Reset Email
 */
const sendResetEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${token}`;

  const mailOptions = {
    from: `"Support" <${process.env.EMAIL_USER || 'support@educreative.com'}>`,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <h2>Password Reset Request</h2>
      <p>A password reset has been requested for your account. Please click the link below to reset your password:</p>
      <a href="${resetUrl}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you did not request this, please ignore this email.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Reset email sent to: ${email}`);
    return true;
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
    // In development, we might still want to see the token in logs if email fails
    if (process.env.NODE_ENV === 'development') {
      console.log('--- DEVELOPMENT LOG: RESET TOKEN ---');
      console.log(`Email: ${email}`);
      console.log(`Token: ${token}`);
      console.log(`Reset URL: ${resetUrl}`);
      console.log('------------------------------------');
    }
    throw new Error('Failed to send reset email');
  }
};

module.exports = {
  sendResetEmail,
};
