const User = require('./User');
const Course = require('./Course');
const Tenant = require('./Tenant');
const Batch = require('./Batch');
const Enrollment = require('./Enrollment');
const CourseSection = require('./CourseSection');
const CourseChapter = require('./CourseChapter');
const Transaction = require('./Transaction');
const Wallet = require('./Wallet');
const Review = require('./Review');
const TeacherCertification = require('./TeacherCertification');
const UserProgress = require('./UserProgress');

const defineAssociations = () => {
  
  // 1. Course & Content Relationships
  Course.hasMany(CourseSection, { foreignKey: 'courseId' });
  CourseSection.belongsTo(Course, { foreignKey: 'courseId' });

  CourseSection.hasMany(CourseChapter, { foreignKey: 'sectionId', as: 'chapters' });
  CourseChapter.belongsTo(CourseSection, { foreignKey: 'sectionId' });

  // 2. Enrollment & Progress Relationships
  User.hasMany(Enrollment, { foreignKey: 'studentId' });
  Enrollment.belongsTo(User, { foreignKey: 'studentId' });

  Course.hasMany(Enrollment, { foreignKey: 'courseId' });
  Enrollment.belongsTo(Course, { foreignKey: 'courseId' });

  User.hasMany(UserProgress, { foreignKey: 'userId' });
  UserProgress.belongsTo(User, { foreignKey: 'userId' });

  // 3. Tenant (Institute) Relationships
  Tenant.hasMany(User, { foreignKey: 'tenantId' });
  User.belongsTo(Tenant, { foreignKey: 'tenantId' });

  Tenant.hasMany(Course, { foreignKey: 'tenantId' });
  Course.belongsTo(Tenant, { foreignKey: 'tenantId' });

  // 4. Batch Relationships
  Course.hasMany(Batch, { foreignKey: 'courseId' });
  Batch.belongsTo(Course, { foreignKey: 'courseId' });

  // 5. Transaction & Financial Relationships
  User.hasMany(Transaction, { foreignKey: 'userId' });
  Transaction.belongsTo(User, { foreignKey: 'userId' });

  User.hasOne(Wallet, { foreignKey: 'userId' });
  Wallet.belongsTo(User, { foreignKey: 'userId' });

  // 6. Review & Gamification
  User.hasMany(Review, { foreignKey: 'studentId' });
  Review.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

  Course.hasMany(Review, { foreignKey: 'courseId' });
  Review.belongsTo(Course, { foreignKey: 'courseId' });

  User.hasOne(TeacherCertification, { foreignKey: 'teacherId' });
  TeacherCertification.belongsTo(User, { foreignKey: 'teacherId' });

};

module.exports = defineAssociations;
