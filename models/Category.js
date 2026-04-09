const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    unique: true
  },
  type: {
    type: DataTypes.ENUM('Course', 'Exam', 'Blog'),
    defaultValue: 'Course'
  },
  iconUrl: {
    type: DataTypes.STRING,
  }
}, {
  timestamps: true,
});

module.exports = Category;
