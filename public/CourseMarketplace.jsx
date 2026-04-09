import React, { useState, useContext, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const CourseMarketplace = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [courses] = useState([
    { id: 1, title: 'Advanced React & Microfrontends', cat: 'Software Engineering', price: 4999, oldPrice: 8999, type: 'Hybrid', instructor: 'Kaushik Dey', rating: 4.8 },
    { id: 2, title: 'Data Science & Machine Learning', cat: 'AI/ML Hub', price: 9999, oldPrice: 12999, type: 'Live', instructor: 'Anup Singh', rating: 4.9 },
    { id: 3, title: 'System Design Interview Crash Course', cat: 'Software Engineering', price: 2999, oldPrice: 4999, type: 'Recorded', instructor: 'Rahul', rating: 4.5 },
    { id: 4, title: 'AI Engineering with LLMs', cat: 'AI/ML Hub', price: 7999, oldPrice: 15999, type: 'Live', instructor: 'Sarah J.', rating: 5.0 },
    { id: 2, title: 'NEET Biology Complete Course', cat: 'AI/ML Hub', price: 12999, oldPrice: 18999, type: 'Live', instructor: 'Dr. Sarah', rating: 4.9 },
    { id: 6, title: 'UI/UX Design Masterclass', cat: 'UI Design', price: 3499, oldPrice: 6999, type: 'Recorded', instructor: 'Emily Chen', rating: 4.9 },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All Modules');

  // Filter Logic
  const filteredCourses = useMemo(() => {
    if (selectedCategory === 'All Modules') return courses;
    return courses.filter(c => c.cat === selectedCategory);
  }, [selectedCategory, courses]);

  const handleEnroll = (courseId) => {
    if (!user) {
      navigate(`/login?then=/courses/${courseId}`);
    } else {
      alert(`Proceeding to enroll in Course #${courseId}`);
    }
  };

  return (
    <div className="bg-light min-vh-100">
      
      {/* 🚀 Marketplace Navbar (Light Theme) */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top py-3 shadow-sm border-bottom">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
            <div className="bg-primary text-white p-2 rounded-3 fw-black">EDU</div>
            <div className="d-flex flex-column" style={{lineHeight: '1'}}>
                <span className="fw-black text-dark" style={{fontSize: '1rem', letterSpacing: '-0.5px'}}>CREATIVE</span>
                <span className="text-primary fw-bold" style={{fontSize: '0.7rem', letterSpacing: '2px'}}>EDUCATION</span>
            </div>
          </Link>
          <div className="d-flex align-items-center gap-3 gap-md-4">
            <Link to="/teachers" className="nav-link text-secondary small fw-bold d-none d-md-block hover-primary">Browse Instructors</Link>
            {user ? (
              <Link to={`/${user.role?.toLowerCase().replace(' ', '-')}`} className="btn btn-primary px-4 py-2 small fw-bold rounded-3">Dashboard</Link>
            ) : (
              <Link to="/login" className="btn btn-primary px-4 py-2 fw-bold small rounded-3">Log In</Link>
            )}
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row g-5">
          
          {/* 🔍 Global Filters Sidebar */}
          <aside className="col-lg-3">
             <div className="card border-0 shadow-sm p-4 sticky-top rounded-4 bg-white" style={{top: '100px'}}>
                <h5 className="fw-black text-dark mb-4">Discovery</h5>
                <div className="mb-4">
                    <label className="form-label text-secondary small fw-bold text-uppercase ms-1 mb-2" style={{fontSize: '10px', letterSpacing: '1px'}}>Filter by Category</label>
                    <select 
                        className="form-select border-0 bg-light py-2 rounded-3"
                        style={{fontSize: '14px', color: '#1e293b'}}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="All Modules">All Modules</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="AI/ML Hub">AI/ML Hub</option>
                        <option value="UI Design">UI Design</option>
                    </select>
                </div>
                <button 
                    onClick={() => setSelectedCategory('All Modules')}
                    className="btn btn-light w-100 py-2 small fw-bold text-secondary"
                >
                    Reset Filters
                </button>
             </div>
          </aside>

          {/* 📚 Course Grid */}
          <main className="col-lg-9">
             <div className="mb-5 animate-fade-in">
                <h2 className="display-6 fw-black text-dark mb-2">Build your <span className="text-primary">Skills</span></h2>
                <p className="text-secondary small">Explore premium curricula from over 500 white-labeled institutes.</p>
             </div>

             <div className="row g-4">
                {filteredCourses.length > 0 ? filteredCourses.map(c => (
                  <div key={c.id} className="col-md-6 col-xl-4">
                    <div className="card h-100 border-0 shadow-sm overflow-hidden hover-lift transition-all bg-white rounded-4">
                       <div className="position-relative bg-light border-bottom" style={{height: '180px'}}>
                          <div className="w-100 h-100 d-flex align-items-center justify-content-center text-secondary opacity-25">
                            <span className="display-4">📚</span>
                          </div>
                          <span className="position-absolute top-0 end-0 m-3 badge bg-primary p-2 px-3 rounded-pill text-uppercase fw-black" style={{fontSize: '9px', letterSpacing: '1px'}}>
                            {c.type}
                          </span>
                       </div>
                       
                       <div className="p-4">
                          <span className="text-primary small fw-black text-uppercase mb-2 d-block" style={{fontSize: '9px', letterSpacing: '1px'}}>{c.cat}</span>
                          <h6 className="fw-black text-dark mb-3 line-clamp-2" style={{minHeight: '2.8rem'}}>{c.title}</h6>
                          
                          <div className="d-flex justify-content-between align-items-center mb-4">
                             <div className="small text-secondary">By {c.instructor}</div>
                             <div className="small text-warning fw-black">★ {c.rating}</div>
                          </div>

                          <div className="pt-3 border-top d-flex align-items-center justify-content-between">
                             <div>
                                <span className="d-block h5 fw-black text-dark mb-0">₹{c.price}</span>
                                <span className="small text-secondary text-decoration-line-through">₹{c.oldPrice}</span>
                             </div>
                             <button 
                               onClick={() => handleEnroll(c.id)}
                               className="btn btn-primary px-3 py-2 small fw-black rounded-3"
                             >
                               Enroll Now
                             </button>
                          </div>
                       </div>
                    </div>
                  </div>
                )) : (
                    <div className="col-12 py-5 text-center text-secondary opacity-50">
                        <p className="display-4">No courses found</p>
                        <p>Try adjusting your category filter.</p>
                    </div>
                )}
             </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default CourseMarketplace;
