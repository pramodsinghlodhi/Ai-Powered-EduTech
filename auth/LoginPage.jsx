import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';

const LoginPage = () => {
  const { user, signInWithGoogle, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('Student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    const targetPath = user.role === 'Super Admin' ? 'super-admin' : user.role?.toLowerCase().replace(' ', '-');
    return <Navigate to={`/${targetPath || 'student'}`} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(email, password, selectedRole);
    if (!result.success) {
      setError(result.error || "Invalid login credentials.");
    }
    setLoading(false);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-5 bg-light">
      <div className="row w-100 justify-content-center animate-fade-in text-center">
        <div className="col-12 col-md-10 col-lg-7 col-xl-4 text-start">
          
          <div className="card border-0 shadow-2xl overflow-hidden" style={{borderRadius: '30px'}}>
            {/* Role Header */}
            <div className="p-4 bg-primary text-white text-center">
                <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                    <div className="bg-white text-primary p-1 px-2 rounded-2 fw-black small">EDU</div>
                    <span className="fw-black h6 mb-0">CREATIVE LOGIN</span>
                </div>
                <p className="x-small mb-3 opacity-75">Choose your role to sign in</p>
                <div className="d-flex justify-content-center gap-2">
                    {['Student', 'Teacher', 'Institution'].map(role => (
                       <button 
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`btn btn-sm px-3 rounded-pill fw-bold transition-all ${selectedRole === role ? 'bg-white text-primary shadow-sm' : 'text-white border-white border-opacity-25'}`}
                        style={{fontSize: '11px'}}
                       >
                         {role}
                       </button>
                    ))}
                </div>
            </div>

            <div className="p-4 p-md-5 bg-white">
                <h4 className="fw-black text-dark mb-4">Sign In</h4>
                {error && <div className="alert alert-danger border-0 small py-3 mb-4 rounded-3 fw-bold">{error}</div>}

                {/* Social Login */}
                <button 
                    onClick={signInWithGoogle}
                    className="btn w-100 d-flex align-items-center justify-content-center gap-3 py-3 mb-4 border rounded-3 bg-light text-dark shadow-sm"
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20" alt="google" />
                    <span className="small fw-bold">Sign in as {selectedRole}</span>
                </button>

                <div className="d-flex align-items-center gap-3 mb-4 opacity-10">
                    <hr className="flex-grow-1" />
                    <span className="small fw-bold">OR</span>
                    <hr className="flex-grow-1" />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-secondary small fw-bold text-uppercase ms-1" style={{fontSize: '10px', letterSpacing: '1px'}}>Email Address</label>
                        <input 
                            type="email" 
                            className="form-control border-0 bg-light py-3 px-4 rounded-3" 
                            placeholder="name@example.com"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{color: '#1e293b'}}
                        />
                    </div>

                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-end mb-2">
                            <label className="form-label text-secondary small fw-bold text-uppercase ms-1 mb-0" style={{fontSize: '10px', letterSpacing: '1px'}}>Password</label>
                            <Link to="/forgot-password" size="sm" className="text-primary fw-bold text-decoration-none" style={{fontSize: '11px'}}>Forgot?</Link>
                        </div>
                        <input 
                            type="password" 
                            className="form-control border-0 bg-light py-3 px-4 rounded-3" 
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{color: '#1e293b'}}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="btn btn-primary w-100 py-3 mb-4 fw-black rounded-3 shadow-lg"
                    >
                        {loading ? 'Authenticating...' : `Enter ${selectedRole} Dashboard`}
                    </button>
                </form>

                <div className="text-center pt-3 border-top">
                    <p className="text-secondary small mb-0 fw-bold">
                        New to EduCreative? <Link to="/register" className="text-primary fw-black text-decoration-none ms-1">Create Account</Link>
                    </p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
