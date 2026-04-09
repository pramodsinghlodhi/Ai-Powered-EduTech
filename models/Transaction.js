const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'e.g. Stripe pi_xxxx or Razorpay pay_xxxx'
  },
  gateway: {
    type: DataTypes.ENUM('Razorpay', 'Stripe', 'Wallet'),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'INR'
  },
  commissionAmount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
    comment: 'Platform earnings cut'
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Successful', 'Failed', 'Refunded'),
    defaultValue: 'Pending'
  },
  type: {
    type: DataTypes.ENUM('Course Purchase', 'SaaS Subscription', 'Wallet Topup', 'Withdrawal'),
    defaultValue: 'Course Purchase'
  },
  userId: {
    type: DataTypes.INTEGER,
    comment: 'User making the payment'
  },
  tenantId: {
    type: DataTypes.INTEGER,
    comment: 'Associated Institute payload (for Institute-wise earnings)'
  },
  teacherId: {
    type: DataTypes.INTEGER,
    comment: 'Associated Teacher (for Individual Teacher wise Earnings)'
  }
}, {
  timestamps: true,
});

module.exports = Transaction;
