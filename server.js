require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');

const { connectDB, sequelize } = require('./config/db');
const { startCronJobs } = require('./services/cronService');
const validateSession = require('./middleware/sessionValidator');
const tenantIdentification = require('./middleware/tenantIdentification');
const logger = require('./services/logger');

// Ensure logs directory exists for Winston
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const app = express();
const PORT = process.env.PORT || 5000;


// Wrap Express with HTTP server for Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

// 1. PRODUCTION SECURITY MIDDLEWARE
app.use(helmet()); // Sets various HTTP headers for security

// 2. PRODUCTION RATE LIMITING (DDoS Protection)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again after 15 minutes.'
});
app.use('/api/', limiter);

// 3. PRODUCTION CORS CONFIG
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [/\.educreative\.com$/, /\.veereducation\.com$/] 
    : '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Multi-tenant SaaS Contextual Layer
app.use(tenantIdentification);

// Initialize Database connection
connectDB();

// Start Automated Background Tasks (Overdue Installments)
startCronJobs();

// Basic Route
app.get('/', (req, res) => res.send('AI-Powered Education Platform API is running...'));

// Socket.io Communication Engine Layer
io.on('connection', (socket) => {
  logger.info('A user connected via socket: %s', socket.id);
  socket.on('disconnect', () => logger.info('User disconnected: %s', socket.id));
});

// Global Session Validation (Secures One Device Policy)
app.use(validateSession);

// Import Models
const User = require('./models/User');
const Course = require('./models/Course');
const Tenant = require('./models/Tenant');
const Transaction = require('./models/Transaction');
const SubscriptionPlan = require('./models/SubscriptionPlan');
const Category = require('./models/Category');
const SupportTicket = require('./models/SupportTicket');

// Institute Academy Extension Models
const Batch = require('./models/Batch');
const Attendance = require('./models/Attendance');
const Exam = require('./models/Exam');
const Installment = require('./models/Installment');
const Expense = require('./models/Expense');

// Enrollment & Live Class
const Enrollment = require('./models/Enrollment');
const LiveClass = require('./models/LiveClass');
const CourseSection = require('./models/CourseSection');
const CourseChapter = require('./models/CourseChapter');

// Gamification & Wallet Engine
const Wallet = require('./models/Wallet');
const Review = require('./models/Review');
const TeacherCertification = require('./models/TeacherCertification');
const UserProgress = require('./models/UserProgress');

// Import Associations
const defineAssociations = require('./models/associations');
defineAssociations();

// Import Routes
const authRoutes = require('./routes/auth');
const configRoutes = require('./routes/config');
const learningRoutes = require('./routes/learning');
const courseRoutes = require('./routes/courses');
const superAdminRoutes = require('./routes/superAdmin');
const instituteAdminRoutes = require('./routes/instituteAdmin');
const teacherRoutes = require('./routes/teacher');
const studentRoutes = require('./routes/student');
const paymentRoutes = require('./routes/payments');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/v1', configRoutes); // Branding logic
app.use('/api/learning', learningRoutes); // Heartbeat & AI
app.use('/api/courses', courseRoutes);
app.use('/api/admin', superAdminRoutes);
app.use('/api/institute', instituteAdminRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/payments', paymentRoutes);

// Global Error Logger for production
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something went wrong on the server!');
});

// Sync Database & Start Server using the wrapped `server`
sequelize.sync().then(() => {
  logger.info('Database synced globally with advanced models');
  server.listen(PORT, () => logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`));
}).catch(err => logger.error('Failed to sync database: %O', err));
