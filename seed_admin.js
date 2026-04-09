const bcrypt = require('bcrypt');
const User = require('./models/User');
const { sequelize } = require('./config/db');
require('dotenv').config();

async function seedAdmin() {
  try {
    console.log('--- ADMIN SEEDER ---');
    
    // 1. Check if Admin already exists
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@educreative.com';
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });

    if (existingAdmin) {
      console.log(`Admin already exists with email: ${adminEmail}`);
      process.exit(0);
    }

    // 2. Hash Password
    const adminPass = process.env.ADMIN_PASS || 'admin123456';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPass, salt);

    // 3. Create Admin User (Super Admin)
    const newAdmin = await User.create({
      name: 'System Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'Super Admin',
      session_id: 'initial_seed'
    });

    console.log('✅ Super Admin created successfully!');
    console.log(`Email: ${newAdmin.email}`);
    console.log(`Password: ${adminPass}`);
    console.log('--------------------');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
