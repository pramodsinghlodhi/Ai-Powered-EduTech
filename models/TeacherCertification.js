const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const TeacherCertification = sequelize.define('TeacherCertification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  teacherId: {
    type: DataTypes.INTEGER,
    unique: true
  },
  level: {
    type: DataTypes.ENUM('Basic', 'Intermediate', 'Advanced'),
    defaultValue: 'Basic'
  },
  status: {
    type: DataTypes.ENUM('ELIGIBLE', 'PENDING_PAYMENT', 'CERTIFIED'),
    defaultValue: 'ELIGIBLE'
  },
  certificateUrl: {
    type: DataTypes.STRING,
    comment: 'PDF S3 path'
  }
}, {
  timestamps: true,
});

module.exports = TeacherCertification;
