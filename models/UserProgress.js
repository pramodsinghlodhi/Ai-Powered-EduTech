const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const UserProgress = sequelize.define('UserProgress', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  chapterId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  lastWatchedTimestamp: {
    type: DataTypes.INTEGER,
    comment: 'Seconds'
  },
  completionPercentage: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
});

module.exports = UserProgress;
