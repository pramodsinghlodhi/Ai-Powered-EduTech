const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    unique: true
  },
  level: {
    type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
    defaultValue: 'Beginner'
  },
  language: {
    type: DataTypes.STRING,
    defaultValue: 'English'
  },
  category: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.ENUM('Live', 'Recorded', 'Hybrid'),
    defaultValue: 'Recorded'
  },
  description: {
    type: DataTypes.TEXT
  },
  basePrice: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  discountPrice: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  thumbnail: {
    type: DataTypes.STRING,
  },
  tenantId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'To identify which institute owns this course if applicable'
  },
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  timestamps: true,
});

module.exports = Course;
