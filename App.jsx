import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';

// Base Pages
import SuperAdminPanel from './pages/panels/SuperAdminPanel';
import InstitutePanel from './pages/panels/InstitutePanel';
import TeacherPanel from './pages/panels/TeacherPanel';
import StudentPanel from './pages/panels/StudentPanel';
import AlumniPanel from './pages/panels/AlumniPanel';
import LandingPage from './pages/public/LandingPage';
import CourseMarketplace from './pages/public/CourseMarketplace';
import TeacherMarketplace from './pages/public/TeacherMarketplace';
import TeacherProfilePage from './pages/public/TeacherProfilePage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import AdminLoginPage from './pages/auth/AdminLoginPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/courses" element={<CourseMarketplace />} />
          <Route path="/teachers" element={<TeacherMarketplace />} />
          <Route path="/teacher/:id" element={<TeacherProfilePage />} />
          
          {/* Auth Pages (Firebase Backed) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Secure Protected Dashboard Routes */}
          {/* Super Admin Area */}
          <Route path="/super-admin" element={<DashboardLayout allowedRoles={['Super Admin']} />}>
            <Route index element={<SuperAdminPanel />} />
          </Route>

          {/* Institute Admin Area */}
          <Route path="/institute" element={<DashboardLayout allowedRoles={['Institute Admin', 'Super Admin']} />}>
            <Route index element={<InstitutePanel />} />
          </Route>

          {/* Teacher Area */}
          <Route path="/teacher" element={<DashboardLayout allowedRoles={['Teacher']} />}>
            <Route index element={<TeacherPanel />} />
          </Route>

          {/* Student Area */}
          <Route path="/student" element={<DashboardLayout allowedRoles={['Student']} />}>
            <Route index element={<StudentPanel />} />
          </Route>

          {/* Alumni Area */}
          <Route path="/alumni" element={<DashboardLayout allowedRoles={['Alumni']} />}>
            <Route index element={<AlumniPanel />} />
          </Route>

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
