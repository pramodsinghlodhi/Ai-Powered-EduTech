const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const SubscriptionPlan = sequelize.define('SubscriptionPlan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'e.g. Starter, Growth, Pro'
  },
  monthlyPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  maxUsers: {
    type: DataTypes.INTEGER,
    comment: 'e.g. 20, 50, 1000'
  },
  maxTeachers: {
    type: DataTypes.INTEGER
  },
  features: {
    type: DataTypes.JSON,
    comment: 'Array or Object of allowed features (AI, White-label, etc)'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
});

module.exports = SubscriptionPlan;
