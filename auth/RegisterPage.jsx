import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';

const RegisterPage = () => {
  const { user, register } = useContext(AuthContext);
  const [selectedRole, setSelectedRole] = useState('Student');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (user && !user.isNewUser) {
    const targetPath = user.role === 'Super Admin' ? 'super-admin' : user.role?.toLowerCase().replace(' ', '-');
    return <Navigate to={`/${targetPath || 'student'}`} replace />;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await register(formData.name, formData.email, formData.password, selectedRole);
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || "Registration failed.");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="container min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="card border-0 shadow-lg p-5 text-center animate-fade-in" style={{maxWidth: '500px', borderRadius: '24px'}}>
          <div className="display-1 mb-4">🚀</div>
          <h2 className="fw-black text-dark mb-3">Welcome Aboard!</h2>
          <p className="text-secondary mb-5">Your {selectedRole} account has been created successfully. The future of learning starts today.</p>
          <Link to="/login" className="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow-lg">Login to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-5 bg-light">
      <div className="row w-100 justify-content-center animate-fade-in">
        <div className="col-12 col-md-10 col-lg-9 col-xl-8">
          <div className="card shadow-2xl border-0 overflow-hidden" style={{borderRadius: '30px'}}>
            <div className="row g-0">
              {/* Left Column: Role Selection */}
              <div className="col-lg-5 p-4 p-md-5 text-white" style={{background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'}}>
                <div className="d-flex align-items-center gap-2 mb-4">
                    <div className="bg-white text-primary p-2 rounded-3 fw-black small">EDU</div>
                    <span className="fw-black h5 mb-0">CREATIVE</span>
                </div>
                
                <h2 className="display-6 fw-black mb-3" style={{letterSpacing: '-1.5px'}}>Join the <br/> Revolution.</h2>
                <p className="small opacity-75 mb-5">Select your role to unlock personalized features and tools.</p>
                
                <div className="space-y-3">
                  {[
                    { id: 'Student', icon: '🎓', desc: 'I want to learn' },
                    { id: 'Teacher', icon: '👨‍🏫', desc: 'I want to teach' },
                    { id: 'Institution', icon: '🏢', desc: 'Manage my academy' }
                  ].map(role => (
                    <div 
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-3 rounded-4 mb-3 d-flex align-items-center gap-3 cursor-pointer transition-all border-2 ${selectedRole === role.id ? 'bg-white text-primary border-white' : 'bg-white bg-opacity-10 border-white border-opacity-10 hover-bg-opacity-20'}`}
                    >
                      <div className="fs-3">{role.icon}</div>
                      <div>
                        <div className="fw-black small">{role.id}</div>
                        <div className="x-small opacity-75 fw-bold" style={{fontSize: '9px'}}>{role.desc}</div>
                      </div>
                      {selectedRole === role.id && <div className="ms-auto">✓</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="col-lg-7 p-4 p-md-5 bg-white">
                <div className="mb-4">
                    <h3 className="fw-black text-dark mb-1">Create Account</h3>
                    <p className="text-secondary small">Enter your details to register as a <span className="text-primary fw-bold text-uppercase">{selectedRole}</span></p>
                </div>

                {error && <div className="alert alert-danger border-0 small py-3 mb-4 rounded-3 fw-bold">{error}</div>}

                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label className="form-label text-secondary small fw-bold text-uppercase" style={{fontSize: '10px', letterSpacing: '1px'}}>Full Name</label>
                    <input 
                      type="text" 
                      className="form-control border-0 bg-light py-3 px-4 rounded-3" 
                      placeholder="e.g. Anup Singh"
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      style={{color: '#1e293b'}}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-secondary small fw-bold text-uppercase" style={{fontSize: '10px', letterSpacing: '1px'}}>Email Address</label>
                    <input 
                      type="email" 
                      className="form-control border-0 bg-light py-3 px-4 rounded-3" 
                      placeholder="name@example.com"
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      style={{color: '#1e293b'}}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label text-secondary small fw-bold text-uppercase" style={{fontSize: '10px', letterSpacing: '1px'}}>Secure Password</label>
                    <input 
                      type="password" 
                      className="form-control border-0 bg-light py-3 px-4 rounded-3" 
                      placeholder="Min 6 characters"
                      required
                      minLength={6}
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                      style={{color: '#1e293b'}}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="btn btn-primary w-100 py-3 mb-4 fw-black rounded-3 shadow-lg"
                  >
                    {loading ? 'Onboarding...' : 'Join Platform Now'}
                  </button>
                </form>

                <div className="text-center pt-3 border-top">
                  <p className="text-secondary small mb-0 fw-bold">
                    Already a member? <Link to="/login" className="text-primary fw-black text-decoration-none ms-1">Sign In</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
