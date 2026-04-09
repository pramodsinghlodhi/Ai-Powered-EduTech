import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TeacherMarketplace = () => {
  const navigate = useNavigate();
  const [teachers] = useState([
    { id: 1, name: 'Anup Singh', title: 'Senior AI Researcher', rating: 4.9, reviews: 120, tags: ['Data Science', 'Python'], bio: 'Specializing in LLMs and generative AI with 10+ years of research experience.' },
    { id: 2, name: 'Kaushik Dey', title: 'Frontend Systems Architect', rating: 4.8, reviews: 95, tags: ['React', 'Angular'], bio: 'Expert in building scalable micro-frontends and high-performance web systems.' },
    { id: 3, name: 'Sarah Jenkins', title: 'UX Design Lead', rating: 5.0, reviews: 210, tags: ['UI/UX', 'Figma'], bio: 'Passionate about human-centric design and intuitive digital experiences.' },
    { id: 4, name: 'Michael Brown', title: 'Cloud Solutions Architect', rating: 4.7, reviews: 88, tags: ['AWS', 'Docker'], bio: 'Cloud native specialist focused on serverless architectures and DevOps.' },
  ]);

  return (
    <div className="bg-dark min-vh-100 text-white">
      {/* Shared Marketplace Header */}
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top py-3" style={{background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
        <div className="container">
          <Link to="/" className="navbar-brand fw-black fs-3">
            EduCreative<span className="text-primary">Market</span>
          </Link>
          <div className="d-flex align-items-center gap-3">
            <Link to="/courses" className="nav-link text-secondary small fw-bold hover-white">All Courses</Link>
            <Link to="/login" className="btn btn-outline-light px-4 py-2 fw-bold small rounded-3 ms-2">Log In</Link>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <div className="text-center mb-5 animate-fade-in">
          <h2 className="display-5 fw-black mb-3">Learn from the <span className="text-primary">Elite</span></h2>
          <p className="text-secondary mx-auto" style={{maxWidth: '600px'}}>Browse our directory of certified platform instructors and institute lecturers.</p>
        </div>

        <div className="row g-4">
          {teachers.map(t => (
            <div key={t.id} className="col-md-6 col-lg-4 col-xl-3">
              <div className="glass-card p-4 h-100 d-flex flex-column align-items-center text-center hover-lift transition-all border-opacity-25">
                <div className="mb-4 position-relative">
                    <div className="rounded-circle d-flex align-items-center justify-content-center fw-black shadow-lg" 
                         style={{width: '100px', height: '100px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', fontSize: '2rem'}}>
                        {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                </div>

                <h5 className="fw-black text-white mb-1">{t.name}</h5>
                <p className="text-primary small fw-bold mb-3">{t.title}</p>
                
                <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                  {t.tags.map(tag => (
                    <span key={tag} className="badge bg-white bg-opacity-10 text-secondary border border-white border-opacity-10 px-2 py-1" style={{fontSize: '9px'}}>{tag}</span>
                  ))}
                </div>

                <p className="small text-secondary mb-4 line-clamp-3 overflow-hidden" style={{height: '3.6rem'}}>
                    {t.bio}
                </p>

                <div className="mt-auto pt-3 border-top border-white border-opacity-5 w-100">
                    <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                        <span className="text-warning fw-black small">★ {t.rating}</span>
                        <span className="text-secondary small" style={{fontSize: '11px'}}>({t.reviews} Reviews)</span>
                    </div>
                    <button 
                        onClick={() => navigate(`/teacher/${t.id}`)}
                        className="btn btn-primary-custom w-100 py-2 small fw-black d-flex align-items-center justify-content-center gap-2"
                    >
                        <span>View Profile</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherMarketplace;
