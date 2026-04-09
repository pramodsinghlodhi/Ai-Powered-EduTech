const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('Super Admin', 'Institute Admin', 'Teacher', 'Student', 'Alumni'),
    defaultValue: 'Student'
  },
  tenantId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'For multi-tenant SaaS structure'
  },
  session_id: {
    type: DataTypes.STRING,
    comment: 'For One Device Policy Control'
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true,
});

module.exports = User;
