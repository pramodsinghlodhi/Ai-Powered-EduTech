const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  batchId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Present', 'Absent', 'Late', 'Excused'),
    defaultValue: 'Present'
  },
  qrDataRef: {
    type: DataTypes.STRING,
    comment: 'Scanned QR Code ref if applicable'
  }
}, {
  timestamps: true,
});

module.exports = Attendance;
