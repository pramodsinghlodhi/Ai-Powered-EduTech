import React, { useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './DashboardLayout.css'; // Let's use a specific CSS file for sleek design

const DashboardLayout = ({ allowedRoles = [] }) => {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) return <div>Loading Profile...</div>;

  // Extremely basic protection layout
  // In a real app you might want this in a ProtectedRoute component wrapper,
  // but we can enforce it here too
  if (!user) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Unauthorized Access</h2>
        <p>You must log in to view this page.</p>
        <Link to="/login" className="btn btn-primary">Go to Login</Link>
      </div>
    );
  }

  // Check if role is allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Access Denied</h2>
        <p>Your role ({user.role}) does not have permission to view this panel.</p>
        <button onClick={() => navigate(-1)} className="btn btn-primary">Go Back</button>
      </div>
    );
  }

  // Sidebar Links based on role
  let sidebarLinks = [];
  if (user.role === 'Super Admin') {
    sidebarLinks = [
      { name: 'Platform Overview', path: '/super-admin' },
      { name: 'Manage Institutes', path: '/super-admin/institutes' },
      { name: 'Revenue Reports', path: '/super-admin/revenue' },
    ];
  } else if (user.role === 'Institute Admin') {
    sidebarLinks = [
      { name: 'Academy Dashboard', path: '/institute' },
      { name: 'Teachers', path: '/institute/teachers' },
      { name: 'Students', path: '/institute/students' },
      { name: 'Billing', path: '/institute/billing' },
    ];
  } else if (user.role === 'Teacher') {
    sidebarLinks = [
      { name: 'My Classes', path: '/teacher' },
      { name: 'Manage Courses', path: '/teacher/courses' },
      { name: 'Earnings', path: '/teacher/earnings' },
    ];
  } else if (user.role === 'Student') {
    sidebarLinks = [
      { name: 'Learning Path', path: '/student' },
      { name: 'My Courses', path: '/student/courses' },
      { name: 'Certificates', path: '/student/certificates' },
    ];
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <h3>EduCreative</h3>
          <span className="role-badge">{user.role}</span>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {sidebarLinks.map((link, idx) => (
              <li key={idx}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <p>{user.name}</p>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </aside>
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h2>Welcome back, {user.name}</h2>
        </header>

        <div className="dashboard-content">
           {/* Outlet renders the nested child routes (e.g. Teacher Panel content) */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
