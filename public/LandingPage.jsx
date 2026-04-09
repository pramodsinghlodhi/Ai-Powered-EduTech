import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import EnrollmentModal from '../../components/EnrollmentModal';

const LandingPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const liveCourses = [
    { id: 1, title: 'Complete UPSC Foundation 2026', instructor: 'Dr. Anoop Singh', price: 14999, oldPrice: 24999, rating: 4.8 },
    { id: 2, title: 'IIT JEE Math - Advanced Mastery', instructor: 'Kaushik Dey', price: 9999, oldPrice: 15999, rating: 4.9 },
    { id: 3, title: 'NEET Biology Complete Course', instructor: 'Sarah J.', price: 12999, oldPrice: 18999, rating: 5.0 },
    { id: 4, title: 'MA English Hons Entrance', instructor: 'Rahul K.', price: 5999, oldPrice: 8999, rating: 4.5 },
  ];

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  return (
    <div className="bg-white">
      {/* 📧 Top Info Bar */}
      <div className="section-dark-blue py-2 small d-none d-md-block">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex gap-4">
             <span className="opacity-75">📧 email: educreative@gmail.com</span>
             <span className="opacity-75">📞 Helpline: +91 98765 43210</span>
          </div>
          <div className="d-flex gap-3 fw-bold">
             <Link to="/login" className="text-white text-decoration-none hover-underline">Login Institution</Link>
             <span className="opacity-25">|</span>
             <Link to="/login" className="text-white text-decoration-none hover-underline">Login Teacher</Link>
          </div>
        </div>
      </div>

      {/* 🚀 Main Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top shadow-sm py-3">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
            <div className="bg-primary text-white p-2 rounded-3 fw-black">EDU</div>
            <div className="d-flex flex-column" style={{lineHeight: '1'}}>
                <span className="fw-black text-dark" style={{fontSize: '1rem', letterSpacing: '-0.5px'}}>CREATIVE</span>
                <span className="text-primary fw-bold" style={{fontSize: '0.7rem', letterSpacing: '2px'}}>EDUCATION</span>
            </div>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navNav">
            <ul className="navbar-nav mx-auto gap-lg-4">
              <li className="nav-item"><Link to="/" className="nav-link fw-bold text-dark border-bottom border-primary border-3">Home</Link></li>
              <li className="nav-item"><Link to="/courses" className="nav-link fw-bold text-secondary">Education</Link></li>
              <li className="nav-item"><Link to="/courses" className="nav-link fw-bold text-secondary">Post</Link></li>
              <li className="nav-item"><Link to="/faq" className="nav-link fw-bold text-secondary">FAQ</Link></li>
              <li className="nav-item"><Link to="/student" className="nav-link fw-bold text-secondary">My Studies</Link></li>
            </ul>
            {user ? (
               <button onClick={logout} className="btn btn-dark px-4 py-2 rounded-3 fw-bold">Logout</button>
            ) : (
               <Link to="/login" className="btn btn-primary px-4 py-2 rounded-3 fw-bold">Login Portal</Link>
            )}
          </div>
        </div>
      </nav>

      {/* 🌪️ Hero Section */}
      <header className="section-light-gray py-5 text-center">
        <div className="container py-5 animate-fade-in">
          <h1 className="display-3 fw-black text-dark mb-4" style={{letterSpacing: '-2px'}}>Find Your Perfect Match <br/> in <span className="text-primary">Video Courses</span></h1>
          <p className="text-secondary mb-5 mx-auto" style={{maxWidth: '700px'}}>Learn from India's top educators. Get access to live classes, test series, and personalized learning materials for your exam success.</p>
          <div className="d-flex justify-content-center gap-3">
             <Link to="/courses" className="btn btn-primary px-5 py-3 rounded-pill fw-black">Explore Live Courses</Link>
             <button className="btn btn-outline-dark px-5 py-3 rounded-pill fw-black bg-white">Start Free Test</button>
          </div>
        </div>
      </header>

      {/* 🔍 Search Bar Section */}
      <div className="container">
        <div className="search-container row g-0 mx-auto" style={{maxWidth: '800px'}}>
           <div className="col-12 col-md-5">
              <input type="text" className="form-control border-0 py-3 px-4 bg-transparent text-dark" placeholder="Choose Program..." />
           </div>
           <div className="col-12 col-md-5 border-start border-light d-none d-md-block">
              <input type="text" className="form-control border-0 py-3 px-4 bg-transparent text-dark" placeholder="Enter keywords..." />
           </div>
           <div className="col-12 col-md-2 p-1">
              <button className="btn btn-primary w-100 h-100 py-3 rounded-3 fw-black">Search</button>
           </div>
        </div>
      </div>

      {/* 📊 Stats Bar */}
      <section className="stats-bar text-center mt-5">
         <div className="container">
            <div className="row g-4">
               <div className="col-6 col-md-3">
                  <h2 className="display-6 fw-black">22,000+</h2>
                  <p className="small text-uppercase tracking-widest opacity-75">Students</p>
               </div>
               <div className="col-6 col-md-3">
                  <h2 className="display-6 fw-black">12.00+</h2>
                  <p className="small text-uppercase tracking-widest opacity-75">Teachers</p>
               </div>
               <div className="col-6 col-md-3">
                  <h2 className="display-6 fw-black">260+</h2>
                  <p className="small text-uppercase tracking-widest opacity-75">Live Courses</p>
               </div>
               <div className="col-6 col-md-3">
                  <h2 className="display-6 fw-black">65,000+</h2>
                  <p className="small text-uppercase tracking-widest opacity-75">Practice Tests</p>
               </div>
            </div>
         </div>
      </section>

      {/* 🏆 Why Choose Section */}
      <section className="py-5 mt-5">
         <div className="container py-5 text-center">
            <h2 className="fw-black text-dark mb-2">Why Choose <span className="text-primary">EDU Creative Digication</span></h2>
            <p className="text-secondary mb-5">Unmatched features and premium delivery that is focused on your success.</p>
            <div className="row g-4">
               {[
                 { title: 'Top Educators', icon: '👨‍🏫', color: 'purple' },
                 { title: 'Daily Quiz & Test Series', icon: '📝', color: 'pink' },
                 { title: 'Premium Study Materials', icon: '📚', color: 'green' }
               ].map((item, i) => (
                 <div key={i} className="col-md-4">
                    <div className="card border-0 shadow-sm p-5 rounded-4 h-100">
                       <div className={`display-4 mb-4 text-${item.color}`}>{item.icon}</div>
                       <h5 className="fw-black mb-3">{item.title}</h5>
                       <p className="text-secondary small">Learn from our experienced educators with personalized mentorship.</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 📁 Category Section */}
      <section className="py-5 section-light-gray">
         <div className="container text-center py-5">
            <h2 className="fw-black text-dark mb-5 border-bottom border-primary border-4 d-inline-block pb-2">Category</h2>
            <div className="row g-4 text-start">
               {[1,2,3,4].map(panel => (
                 <div key={panel} className="col-sm-6 col-lg-3">
                    <div className="category-card">
                       <h5>Academic Writing</h5>
                       <ul>
                          <li>Proofing and Revision</li>
                          <li>Draft Revision</li>
                          <li>English</li>
                          <li>Law</li>
                          <li>Geosciences</li>
                          <li>Computer Science</li>
                          <li>Art</li>
                          <li>English</li>
                          <li>History</li>
                          <li>HTML</li>
                          <li>Nursing and Midwifery</li>
                          <li>Anthropology</li>
                          <li>Political Science</li>
                       </ul>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 🚪 Portal Selection */}
      <section className="py-5">
         <div className="container text-center py-5">
            <h2 className="fw-black text-dark mb-5">Choose Your Portal</h2>
            <div className="row g-4 justify-content-center">
               <div className="col-md-4 col-xl-3">
                  <Link to="/login" className="portal-card blue d-block">
                     <div className="display-4 mb-3">👤</div>
                     <h5 className="fw-bold">Student Portal</h5>
                     <p className="small mb-0 opacity-75">Access learning, tests & statistics.</p>
                  </Link>
               </div>
               <div className="col-md-4 col-xl-3">
                  <Link to="/login" className="portal-card green d-block">
                     <div className="display-4 mb-3">👨‍🏫</div>
                     <h5 className="fw-bold">Teacher Portal</h5>
                     <p className="small mb-0 opacity-75">Conduct classes and manage students.</p>
                  </Link>
               </div>
               <div className="col-md-4 col-xl-3">
                  <Link to="/admin/login" className="portal-card purple d-block">
                     <div className="display-4 mb-3">⚙️</div>
                     <h5 className="fw-bold">Admin Portal</h5>
                     <p className="small mb-0 opacity-75">Manage platforms and users.</p>
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* 📺 Live Courses Section */}
      <section className="py-5 section-light-gray border-top border-bottom border-secondary border-opacity-10">
         <div className="container py-5 text-center">
            <div className="badge bg-danger p-2 px-3 fw-bold small text-uppercase mb-3">Learn Live</div>
            <h2 className="fw-black text-dark mb-2">Learn Live from India's <span className="text-primary">Best Education Educators</span></h2>
            <p className="text-secondary mb-5">Interactive sessions and doubt clearing to make your concepts crystal clear.</p>
            <div className="row g-4 text-start">
               {liveCourses.map((c, i) => (
                 <div key={i} className="col-md-6 col-lg-3">
                    <div className="live-course-card position-relative h-100">
                       <span className="badge-live">Live</span>
                       <span className="badge-save">Save 40%</span>
                       <div className="bg-light" style={{height: '160px'}}></div>
                       <div className="p-3">
                          <h6 className="fw-bold text-dark mb-1">{c.title}</h6>
                          <div className="small text-secondary mb-3"><span className="me-2">👥 Dr. Anoop Sangwan</span> <br/> <span>📅 Batch Starts: 15 July 2026</span></div>
                          <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                             <div>
                                <span className="fw-black text-dark h5 mb-0">₹{c.price}</span>
                                <span className="small text-secondary text-decoration-line-through ms-2">₹{c.oldPrice}</span>
                             </div>
                             <button className="btn btn-enroll small" onClick={() => handleEnrollClick(c)}>Enroll Now</button>
                          </div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 👨‍🏫 Teachers Section */}
      <section className="py-5 mt-5">
         <div className="container text-center py-5">
            <h2 className="fw-black text-dark mb-5 border-bottom border-primary border-4 d-inline-block pb-2">Our Teachers</h2>
            <div className="row g-4">
               {[1,2,3,4].map(t => (
                 <div key={t} className="col-6 col-md-3">
                    <div className="text-center">
                       <div className="bg-light rounded-2 mb-3 mx-auto shadow-sm" style={{width: '200px', height: '200px'}}></div>
                       <h6 className="fw-black text-dark mb-1">Anoop Patel</h6>
                       <p className="small text-primary fw-bold">IIT-JEE Physics</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 📱 Footer */}
      <footer className="section-dark-blue pt-5 pb-3">
         <div className="container pt-5 pb-4">
            <div className="row g-5">
               <div className="col-lg-4">
                  <div className="d-flex align-items-center gap-2 mb-4">
                     <div className="bg-primary text-white p-2 rounded-3 fw-black">EDU</div>
                     <span className="fw-black h5 mb-0">CREATIVE</span>
                  </div>
                  <p className="small opacity-50 mb-4 pe-lg-5">India's leading education platform providing high quality content and mentorship for specialized exams.</p>
                  <div className="d-flex gap-2">
                     <button className="btn btn-dark p-0 border-0"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png" width="120" alt="play" /></button>
                     <button className="btn btn-dark p-0 border-0"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/512px-Download_on_the_App_Store_Badge.svg.png" width="120" alt="app" /></button>
                  </div>
               </div>
               <div className="col-sm-6 col-lg-2">
                  <h6 className="fw-bold mb-4">Resources</h6>
                  <ul className="list-unstyled small opacity-50 space-y-2">
                     <li className="mb-2">Study Material</li>
                     <li className="mb-2">Courses</li>
                     <li className="mb-2">Live Classes</li>
                     <li className="mb-2">Practice Work</li>
                  </ul>
               </div>
               <div className="col-sm-6 col-lg-3">
                  <h6 className="fw-bold mb-4">For Teachers</h6>
                  <ul className="list-unstyled small opacity-50 space-y-2">
                     <li className="mb-2">Teach Online</li>
                     <li className="mb-2">Instructor Guidelines</li>
                     <li className="mb-2">Verification Flow</li>
                  </ul>
               </div>
               <div className="col-lg-3">
                  <h6 className="fw-bold mb-4">Help and Feedback</h6>
                  <ul className="list-unstyled small opacity-50 space-y-2">
                     <li className="mb-2">Contact Support</li>
                     <li className="mb-2">Raise Ticket</li>
                     <li className="mb-2">Privacy Policy</li>
                     <li className="mb-2">Terms & Conditions</li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="container-fluid border-top border-white border-opacity-10 pt-4 text-center mt-5">
            <p className="small opacity-25">© 2026 Edu Creative Digication • All rights reserved</p>
         </div>
      </footer>

      {showModal && selectedCourse && (
        <EnrollmentModal 
           course={selectedCourse} 
           onClose={() => { setShowModal(false); setSelectedCourse(null); }} 
        />
      )}
    </div>
  );
};

export default LandingPage;
