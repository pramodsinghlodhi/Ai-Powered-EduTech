import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudentPanel = () => {
  const [activeTab, setActiveTab] = useState('My Learning');
  const videoRef = useRef(null);

  const courses = [
    { id: 1, title: 'Quantum Physics Intro', teacher: 'Dr. Freeman', progress: 45, image: '⚛️' },
    { id: 2, title: 'Creative Writing Masterclass', teacher: 'Mark Twain', progress: 82, image: '✍️' },
    { id: 3, title: 'AI Engineering with Python', teacher: 'Anup Singh', progress: 10, image: '🤖' }
  ];

  // Video heartbeat simulation
  useEffect(() => {
    let interval;
    if (activeTab === 'Classroom') {
      interval = setInterval(() => {
        if (videoRef.current && !videoRef.current.paused) {
          console.log('%c[STUDENT_HEARTBEAT]', 'color: #3b82f6', {
            time: Math.floor(videoRef.current.currentTime),
            progress: Math.floor((videoRef.current.currentTime / videoRef.current.duration) * 100) || 0
          });
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div className="container-fluid bg-light min-vh-100 p-0">
      <div className="row g-0">
        
        {/* 📚 Student Sidebar */}
        <aside className="col-lg-3 col-xl-2 bg-white border-end d-flex flex-column p-4 sticky-top" style={{height: '100vh'}}>
          <div className="d-flex align-items-center gap-2 mb-5 px-2">
             <div className="bg-primary text-white p-2 rounded-3 fw-black small">EDU</div>
             <span className="fw-black text-dark h5 mb-0" style={{letterSpacing: '-1px'}}>STUDENT<span className="text-primary">HUB</span></span>
          </div>

          <nav className="flex-grow-1">
             <ul className="list-unstyled space-y-2">
                {['My Learning', 'Classroom', 'Certificates', 'Support'].map(tab => (
                   <li key={tab} className="mb-2">
                      <button 
                        onClick={() => setActiveTab(tab)}
                        className={`btn w-100 text-start px-3 py-3 rounded-4 transition-all border-0 ${activeTab === tab ? 'bg-primary text-white shadow-lg fw-bold' : 'text-secondary hover-bg-light'}`}
                      >
                         {tab === 'My Learning' ? '📚 ' : tab === 'Classroom' ? '📺 ' : tab === 'Certificates' ? '🎓 ' : '💬 '}
                         {tab}
                      </button>
                   </li>
                ))}
             </ul>
          </nav>

          <div className="mt-auto pt-4 border-top text-center text-lg-start">
             <div className="d-flex align-items-center gap-3 px-2 mb-4">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{width: '40px', height: '40px'}}>S</div>
                <div className="overflow-hidden">
                   <h6 className="mb-0 small fw-bold text-dark text-truncate">Student Name</h6>
                   <span className="x-small text-secondary">Premium Plan</span>
                </div>
             </div>
             <Link to="/" className="btn btn-outline-danger w-100 py-2 rounded-3 small fw-bold">Logout</Link>
          </div>
        </aside>

        {/* 🖥️ Main Learning Area */}
        <main className="col-lg-9 col-xl-10 p-4 p-md-5">
           <header className="mb-5 d-flex justify-content-between align-items-end">
              <div>
                 <h2 className="fw-black text-dark mb-1">{activeTab}</h2>
                 <p className="text-secondary small mb-0">Track your progress and continue learning</p>
              </div>
              <div className="d-none d-md-block text-end">
                 <span className="small text-secondary fw-bold text-uppercase d-block mb-1" style={{fontSize: '9px'}}>Current Streak</span>
                 <span className="h4 fw-black text-primary">🔥 12 Days</span>
              </div>
           </header>

           {activeTab === 'My Learning' && (
             <div className="animate-fade-in">
                <div className="row g-4">
                   {courses.map(c => (
                     <div key={c.id} className="col-md-6 col-xl-4">
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 bg-white hover-lift transition-all">
                           <div className="p-4 d-flex align-items-center gap-3 border-bottom bg-light">
                              <div className="fs-1">{c.image}</div>
                              <div>
                                 <h6 className="fw-bold mb-1 text-dark line-clamp-1">{c.title}</h6>
                                 <span className="x-small text-secondary">By {c.teacher}</span>
                              </div>
                           </div>
                           <div className="p-4">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                 <span className="small text-secondary fw-bold">Overall Progress</span>
                                 <span className="small text-primary fw-black">{c.progress}%</span>
                              </div>
                              <div className="progress mb-4" style={{height: '8px', borderRadius: '10px'}}>
                                 <div className="progress-bar bg-primary rounded-pill progress-bar-striped progress-bar-animated" style={{width: `${c.progress}%`}}></div>
                              </div>
                              <button className="btn btn-primary w-100 py-2 fw-bold" onClick={() => setActiveTab('Classroom')}>Continue Course</button>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                {/* AI Recommendations */}
                <div className="mt-5 pt-5 border-top">
                   <h5 className="fw-black text-dark mb-4 d-flex align-items-center gap-2">
                      <span className="text-primary fs-4">✨</span>AI Insights for You
                   </h5>
                   <div className="row g-4">
                      <div className="col-md-6 col-lg-4">
                         <div className="card border-0 bg-primary bg-opacity-10 shadow-none rounded-4 p-4 border-start border-primary border-4">
                            <h6 className="fw-bold mb-2">Focus on "Wave Theory"</h6>
                            <p className="small text-secondary mb-0">We noticed your quiz scores are low in this module. Try watching Lesson 3 again.</p>
                         </div>
                      </div>
                      <div className="col-md-6 col-lg-4">
                         <div className="card border-0 bg-success bg-opacity-10 shadow-none rounded-4 p-4 border-start border-success border-4">
                            <h6 className="fw-bold mb-2">Weekend Challenge</h6>
                            <p className="small text-secondary mb-0">Complete 2 more chapters to earn the "Fast Learner" badge this week.</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'Classroom' && (
             <div className="animate-fade-in">
                <div className="row g-4">
                   {/* Player Area */}
                   <div className="col-xl-8">
                      <div className="card border-0 shadow-lg rounded-4 overflow-hidden bg-black" style={{aspectRatio: '16/9'}}>
                         <video 
                           ref={videoRef}
                           className="w-100 h-100" 
                           controls 
                           poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"
                         >
                            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                         </video>
                      </div>
                      <div className="mt-4">
                         <h4 className="fw-black mb-2 text-dark">1.2 Understanding Quantum Duality</h4>
                         <p className="text-secondary small">This lesson dives deep into subatomic particles and their wave-particle behaviors under different observation metrics.</p>
                         <div className="d-flex gap-3 mt-4">
                            <button className="btn btn-light rounded-pill px-4 small fw-bold">Download Notes</button>
                            <button className="btn btn-light rounded-pill px-4 small fw-bold">Ask Doubt</button>
                         </div>
                      </div>
                   </div>

                   {/* Playlist Area */}
                   <div className="col-xl-4">
                      <div className="card border-0 shadow-sm rounded-4 bg-white p-4 h-100">
                         <h6 className="fw-black mb-4">Course Curriculum</h6>
                         <div className="space-y-2 overflow-auto mb-4" style={{maxHeight: '400px'}}>
                            {[1,2,3,4,5,6].map(i => (
                               <div key={i} className={`p-3 rounded-4 mb-2 cursor-pointer transition-all ${i === 2 ? 'bg-primary text-white shadow-lg' : 'bg-light hover-bg-gray text-dark'}`}>
                                  <div className="d-flex justify-content-between align-items-center mb-1">
                                     <span className="x-small fw-bold opacity-75">Chapter {i}</span>
                                     {i < 2 && <span className="small">✅</span>}
                                  </div>
                                  <h6 className={`mb-0 small fw-bold ${i === 2 ? 'text-white' : 'text-dark'}`}>Phase Dynamics Part {i}</h6>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'Certificates' && (
             <div className="animate-fade-in">
                <div className="row g-4">
                   <div className="col-md-6 col-lg-4">
                      <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white border-top border-primary border-4">
                         <div className="display-4 mb-4">🏆</div>
                         <h6 className="fw-black mb-1">Quantum Physics Intro</h6>
                         <p className="x-small text-secondary mb-4">Earned on Apr 09, 2026</p>
                         <button className="btn btn-primary-custom w-100 py-3 small">Download PDF</button>
                      </div>
                   </div>
                </div>
             </div>
           )}
        </main>
      </div>
    </div>
  );
};

export default StudentPanel;
