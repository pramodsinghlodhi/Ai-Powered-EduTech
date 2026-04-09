const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Tenant = sequelize.define('Tenant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subdomain: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    comment: 'e.g. abcacademy'
  },
  customDomain: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
    comment: 'e.g. veereducation.com'
  },
  themePrimaryColor: {
    type: DataTypes.STRING,
    defaultValue: '#4F46E5',
    comment: 'Brand primary color'
  },
  logoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  subscriptionPlan: {
    type: DataTypes.ENUM('Starter', 'Growth', 'Pro', 'Enterprise'),
    defaultValue: 'Starter'
  },
  branding_json: {
    type: DataTypes.JSON,
    comment: 'Custom CSS, logos, and theme metadata'
  },
  api_keys: {
    type: DataTypes.JSON,
    comment: 'Stripe/Razorpay keys for this specific tenant'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
});

module.exports = Tenant;
