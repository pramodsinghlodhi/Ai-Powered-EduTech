const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CourseChapter = sequelize.define('CourseChapter', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sectionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  videoUrl: {
    type: DataTypes.STRING,
    comment: 'AWS S3 URL'
  },
  duration: {
    type: DataTypes.STRING
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true,
});

module.exports = CourseChapter;
