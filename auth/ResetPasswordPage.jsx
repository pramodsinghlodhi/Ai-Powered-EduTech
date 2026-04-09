import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const { resetPassword } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    setLoading(true);
    setError('');
    setMessage('');
    const result = await resetPassword(token, password);
    if (result.success) {
      setMessage("Password successfully updated! Redirecting...");
      setTimeout(() => navigate('/login'), 3000);
    } else {
      setError(result.error || "Token expired or invalid.");
    }
    setLoading(false);
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="glass-card p-4 p-md-5 animate-fade-in" style={{maxWidth: '450px', width: '100%'}}>
        <div className="text-center mb-5">
          <div className="display-4 mb-3">🛠️</div>
          <h2 className="text-white fw-bold">Reset Password</h2>
          <p className="text-secondary small">Enter your new secure password below.</p>
        </div>

        {message && <div className="alert alert-success border-0 small text-center mb-4 py-3" style={{borderRadius: '12px'}}>{message}</div>}
        {error && <div className="alert alert-danger border-0 small text-center mb-4 py-3" style={{borderRadius: '12px'}}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-secondary small fw-bold text-uppercase ms-1" style={{fontSize: '10px'}}>New Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!token || !!message}
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-secondary small fw-bold text-uppercase ms-1" style={{fontSize: '10px'}}>Confirm Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={!token || !!message}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading || !token || !!message}
            className="btn btn-primary-custom w-100 py-3 mb-4"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>

        <div className="text-center">
          <Link to="/login" className="text-secondary small text-decoration-none">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
