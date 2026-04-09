const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 }
  },
  comment: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true,
  hooks: {
    afterCreate: async (review, options) => {
      if (review.teacherId) {
        // Correctly import model within hook to avoid circular dependency
        const TeacherCertification = require('./TeacherCertification');
        const reviewCount = await Review.count({ where: { teacherId: review.teacherId }});
        
        // Threshold check for eligibility (5, 10, or 20 reviews)
        if ([5, 10, 20].includes(reviewCount)) {
          await TeacherCertification.findOrCreate({
            where: { teacherId: review.teacherId },
            defaults: { status: 'ELIGIBLE', level: 'Basic' }
          });
        }
      }
    }
  }
});

module.exports = Review;
