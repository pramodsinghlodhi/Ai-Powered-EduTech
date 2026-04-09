import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const { forgotPassword } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    const result = await forgotPassword(email);
    if (result.success) {
      setMessage("Recovery instructions sent to your inbox.");
    } else {
      setError(result.error || "Could not find an account with that email.");
    }
    setLoading(false);
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="glass-card p-4 p-md-5 animate-fade-in" style={{maxWidth: '450px', width: '100%'}}>
        <div className="text-center mb-5">
          <div className="display-4 mb-3">🔑</div>
          <h2 className="text-white fw-bold">Forgot Password?</h2>
          <p className="text-secondary small">No worries, we'll send you reset instructions.</p>
        </div>

        {message && <div className="alert alert-success border-0 small text-center mb-4 py-3" style={{borderRadius: '12px'}}>{message}</div>}
        {error && <div className="alert alert-danger border-0 small text-center mb-4 py-3" style={{borderRadius: '12px'}}>{error}</div>}

        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label className="form-label text-secondary small fw-bold text-uppercase ms-1" style={{fontSize: '10px'}}>Registered Email</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="name@example.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary-custom w-100 py-3 mb-4"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="text-center">
          <Link to="/login" className="text-secondary small text-decoration-none">← Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
