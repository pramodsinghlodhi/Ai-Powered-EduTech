import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const TeacherProfilePage = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);

  // Mock Data (In real app, fetch from API using ID)
  const teachers = [
    { id: 1, name: 'Anup Singh', title: 'Senior AI Researcher', rating: 4.9, reviews: 120, tags: ['Data Science', 'Python'], bio: 'Specializing in LLMs and generative AI with 10+ years of research experience.' },
    { id: 2, name: 'Kaushik Dey', title: 'Frontend Systems Architect', rating: 4.8, reviews: 95, tags: ['React', 'Angular'], bio: 'Expert in building scalable micro-frontends and high-performance web systems.' },
    { id: 3, name: 'Sarah Jenkins', title: 'UX Design Lead', rating: 5.0, reviews: 210, tags: ['UI/UX', 'Figma'], bio: 'Passionate about human-centric design and intuitive digital experiences.' },
    { id: 4, name: 'Michael Brown', title: 'Cloud Solutions Architect', rating: 4.7, reviews: 88, tags: ['AWS', 'Docker'], bio: 'Cloud native specialist focused on serverless architectures and DevOps.' },
  ];

  useEffect(() => {
    const found = teachers.find(t => t.id === parseInt(id));
    setTeacher(found);
  }, [id]);

  if (!teacher) {
    return (
      <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center text-white">
        <div className="text-center">
            <h1 className="display-1 fw-black opacity-10">404</h1>
            <p>Teacher profile not found.</p>
            <Link to="/teachers" className="btn btn-primary-custom mt-4">Back to Marketplace</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark min-vh-100 text-white">
      <nav className="navbar navbar-expand-lg navbar-dark py-4 px-3" style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
        <div className="container">
          <Link to="/" className="navbar-brand fw-black">
             EduCreative<span className="text-primary">Profile</span>
          </Link>
          <Link to="/teachers" className="text-secondary small fw-bold text-decoration-none">← All Instructors</Link>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row g-5">
          {/* Header Column */}
          <div className="col-lg-4">
            <div className="glass-card p-5 text-center transition-all border-opacity-25">
               <div className="rounded-circle d-flex align-items-center justify-content-center fw-black shadow-lg mx-auto mb-4" 
                    style={{width: '150px', height: '150px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', fontSize: '3rem'}}>
                   {teacher.name.split(' ').map(n => n[0]).join('')}
               </div>
               <h2 className="fw-black text-white mb-2">{teacher.name}</h2>
               <p className="text-primary fw-bold mb-4">{teacher.title}</p>
               
               <div className="d-flex justify-content-center gap-3 mb-4">
                  <div className="p-3 bg-white bg-opacity-5 rounded-4 flex-grow-1">
                     <span className="d-block h4 fw-black mb-0 text-warning">★ {teacher.rating}</span>
                     <span className="x-small text-uppercase text-secondary fw-bold" style={{fontSize: '9px'}}>Rating</span>
                  </div>
                  <div className="p-3 bg-white bg-opacity-5 rounded-4 flex-grow-1">
                     <span className="d-block h4 fw-black mb-0 text-white">{teacher.reviews}</span>
                     <span className="x-small text-uppercase text-secondary fw-bold" style={{fontSize: '9px'}}>Reviews</span>
                  </div>
               </div>

               <button className="btn btn-primary-custom w-100 py-3 fw-black">Follow Instructor</button>
            </div>
          </div>

          {/* Details Column */}
          <div className="col-lg-8">
             <div className="mb-5">
                <h4 className="fw-black text-white mb-4">Biography</h4>
                <p className="lead text-secondary line-height-lg">
                    {teacher.bio} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
             </div>

             <div className="mb-5">
                <h4 className="fw-black text-white mb-4">Expertise</h4>
                <div className="d-flex flex-wrap gap-2">
                    {teacher.tags.map(tag => (
                        <span key={tag} className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 p-2 px-3 rounded-pill fw-bold">
                            {tag}
                        </span>
                    ))}
                    <span className="badge bg-white bg-opacity-5 text-secondary border border-white border-opacity-10 p-2 px-3 rounded-pill fw-bold">LMS Expert</span>
                    <span className="badge bg-white bg-opacity-5 text-secondary border border-white border-opacity-10 p-2 px-3 rounded-pill fw-bold">Curriculum Design</span>
                </div>
             </div>

             <div>
                <h4 className="fw-black text-white mb-4">Available Courses</h4>
                <div className="glass-card p-4 border-opacity-25 d-flex align-items-center justify-content-between mb-3 hover-lift transition-all">
                   <div className="d-flex align-items-center gap-4">
                      <div className="bg-dark rounded-4" style={{width: '60px', height: '60px'}}></div>
                      <div>
                         <h6 className="fw-bold mb-1 text-white">Fullstack Development Bootcamp</h6>
                         <span className="text-secondary small">Web Development • ₹4,999</span>
                      </div>
                   </div>
                   <Link to="/courses" className="btn btn-outline-light btn-sm fw-black px-4 rounded-3 border-opacity-25">View</Link>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfilePage;
