const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const LiveClass = sequelize.define('LiveClass', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  batchId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  googleMeetLink: {
    type: DataTypes.STRING,
    allowNull: false
  },
  googleEventId: {
    type: DataTypes.STRING,
    comment: 'Used for updating or cancelling the calendar event'
  },
  recordingUrl: {
    type: DataTypes.STRING,
    comment: 'AWS S3 URL once synced from Drive'
  },
  status: {
    type: DataTypes.ENUM('Scheduled', 'Ongoing', 'Completed', 'Cancelled'),
    defaultValue: 'Scheduled'
  }
}, {
  timestamps: true,
});

module.exports = LiveClass;
