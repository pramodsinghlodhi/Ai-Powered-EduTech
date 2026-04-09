const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  enrollmentDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Percentage 0-100'
  },
  status: {
    type: DataTypes.ENUM('Active', 'Completed', 'Dropped'),
    defaultValue: 'Active'
  }
}, {
  timestamps: true,
});

module.exports = Enrollment;
