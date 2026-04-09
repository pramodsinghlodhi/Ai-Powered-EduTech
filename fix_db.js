const { sequelize } = require('./config/db');
// Import all models to ensure they are registered with Sequelize
require('./models/User');
require('./models/Course');
require('./models/Tenant');
require('./models/Transaction');
require('./models/SubscriptionPlan');
require('./models/Category');
require('./models/SupportTicket');
require('./models/Batch');
require('./models/Attendance');
require('./models/Exam');
require('./models/Installment');
require('./models/Expense');
require('./models/Enrollment');
require('./models/LiveClass');
require('./models/CourseSection');
require('./models/CourseChapter');
require('./models/Wallet');
require('./models/Review');
require('./models/TeacherCertification');
require('./models/UserProgress');

// Import Associations
const defineAssociations = require('./models/associations');

async function fixDatabaseSchema() {
  try {
    console.log('Starting database schema sync...');
    
    // 1. Define associations before syncing
    defineAssociations();
    
    // 2. Sync with { alter: true } to add missing columns without deleting data
    await sequelize.sync({ alter: true });
    
    console.log('Database schema has been updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating database schema:', error);
    process.exit(1);
  }
}

fixDatabaseSchema();
