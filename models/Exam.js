const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Exam = sequelize.define('Exam', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  batchId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalMarks: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('Mock Test', 'Final Exam', 'Weekly Quiz'),
    defaultValue: 'Weekly Quiz'
  },
  certificateAwarded: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
});

module.exports = Exam;
