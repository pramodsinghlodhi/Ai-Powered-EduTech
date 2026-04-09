import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const { user, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user && (user.role === 'Super Admin' || user.role === 'Institute Admin')) {
    return <Navigate to="/super-admin" replace />;
  }

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error || "Administrative access denied.");
    }
    setLoading(false);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-5" 
         style={{background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)'}}>
      <div className="row w-100 justify-content-center animate-fade-in">
        <div className="col-12 col-md-8 col-lg-5 col-xl-4 text-center">
          
          <div className="mb-5">
            <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-circle mb-4" 
                 style={{width: '80px', height: '80px'}}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="h3 fw-black text-white mb-1 tracking-tight">Admin Console</h1>
            <p className="text-secondary small">Authorization Required</p>
          </div>

          <div className="glass-card p-4 p-md-5 text-start border-top border-primary border-opacity-50 border-3">
            {error && <div className="alert alert-danger border-0 small text-center mb-4 py-3" style={{borderRadius: '12px'}}>{error}</div>}

            <form onSubmit={handleAdminLogin}>
              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold text-uppercase ms-1" style={{fontSize: '10px'}}>Admin Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="admin@educreative.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary small fw-bold text-uppercase ms-1" style={{fontSize: '10px'}}>Secret Key</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-primary w-100 py-3 mb-4 fw-bold"
                style={{borderRadius: '12px', background: '#3b82f6'}}
              >
                {loading ? 'Verifying...' : 'Authenticate'}
              </button>
            </form>

            <div className="text-center pt-3 border-top border-white border-opacity-10">
              <Link to="/login" className="text-secondary text-decoration-none small">Return to Portal</Link>
            </div>
          </div>

          <div className="mt-5 opacity-25">
             <p className="small text-white tracking-widest text-uppercase" style={{fontSize: '10px'}}>© 2026 secure system</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
