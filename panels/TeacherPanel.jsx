import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TeacherPanel = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const menuItems = [
    { id: 'Overview', icon: '🏠' },
    { id: 'My Courses', icon: '📚' },
    { id: 'Live Classes', icon: '🎥' },
    { id: 'Wallet', icon: '💰' },
    { id: 'Students', icon: '👥' }
  ];

  return (
    <div className="container-fluid bg-light min-vh-100 p-0 d-flex flex-column flex-lg-row">
      
      {/* 👨‍🏫 Teacher Sidebar */}
      <aside className="bg-white border-end d-flex flex-column p-4 sticky-top" style={{ width: '280px', height: '100vh' }}>
        <div className="d-flex align-items-center gap-2 mb-5 px-2">
            <div className="bg-primary text-white p-2 rounded-3 fw-black small">EDU</div>
            <span className="fw-black text-dark h5 mb-0" style={{letterSpacing: '-1px'}}>TEACHER<span className="text-primary">PRO</span></span>
        </div>

        <nav className="flex-grow-1">
          <ul className="list-unstyled space-y-2">
            {menuItems.map(item => (
              <li key={item.id} className="mb-2">
                <button 
                  onClick={() => setActiveTab(item.id)}
                  className={`btn w-100 text-start d-flex align-items-center gap-3 px-3 py-3 rounded-4 transition-all border-0 ${activeTab === item.id ? 'bg-primary text-white shadow-lg' : 'text-secondary hover-bg-light'}`}
                  style={{fontWeight: activeTab === item.id ? '700' : '500'}}
                >
                  <span className="fs-5">{item.icon}</span>
                  <span>{item.id}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-4 border-top">
           <Link to="/" className="btn btn-outline-danger w-100 py-2 rounded-3 small fw-bold">Logout</Link>
        </div>
      </aside>

      {/* 🖥️ Main Workspace */}
      <main className="flex-grow-1 p-4 p-md-5 overflow-auto">
        <header className="d-flex justify-content-between align-items-center mb-5">
           <div>
              <h2 className="fw-black text-dark mb-1">{activeTab}</h2>
              <p className="text-secondary small mb-0">Managing your knowledge and earnings</p>
           </div>
           <div className="d-flex gap-3">
              <button className="btn btn-white bg-white border rounded-pill px-4 small fw-bold shadow-sm">View Public Profile</button>
              <button className="btn btn-primary rounded-pill px-4 small fw-bold shadow-lg">+ Create Course</button>
           </div>
        </header>

        {activeTab === 'Overview' && (
          <div className="animate-fade-in">
             {/* Key Stats */}
             <div className="row g-4 mb-5">
                {[
                  { label: 'Total Earnings', value: '₹12,450', icon: '💰', color: 'success' },
                  { label: 'Your Students', value: '1,240', icon: '👥', color: 'primary' },
                  { label: 'Course Ratings', value: '4.9/5', icon: '⭐', color: 'warning' },
                  { label: 'Active Batches', value: '04', icon: '📅', color: 'info' }
                ].map((stat, i) => (
                   <div key={i} className="col-sm-6 col-md-3">
                      <div className="card border-0 shadow-sm p-4 rounded-4 h-100 bg-white">
                         <div className="d-flex justify-content-between mb-3 text-secondary">
                            <span className="small fw-bold text-uppercase" style={{fontSize: '9px'}}>{stat.label}</span>
                            <span>{stat.icon}</span>
                         </div>
                         <h3 className="fw-black text-dark mb-0">{stat.value}</h3>
                      </div>
                   </div>
                ))}
             </div>

             <div className="row g-4">
                <div className="col-lg-8">
                   <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
                      <h5 className="fw-bold mb-4">Earnings Multi-Layer Tracker</h5>
                      <div className="p-4 bg-light rounded-4 text-center">
                         <p className="text-secondary small italic mb-0 opacity-50">Revenue chart visualization loading...</p>
                      </div>
                   </div>
                </div>
                <div className="col-lg-4">
                   <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
                      <h5 className="fw-bold mb-4">Upcoming Classes</h5>
                      <div className="space-y-3">
                         {[1,2,3].map(i => (
                            <div key={i} className="p-3 bg-light rounded-4 mb-2 d-flex align-items-center gap-3">
                               <div className="bg-primary text-white rounded-3 px-2 py-1 small fw-bold">14 JUL</div>
                               <div>
                                  <h6 className="mb-0 small fw-bold">Advanced Physics</h6>
                                  <span className="x-small text-secondary">10:00 AM • Batch A</span>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'My Courses' && (
          <div className="animate-fade-in">
             <div className="row g-4">
                {[1,2,3].map(i => (
                  <div key={i} className="col-md-6 col-xl-4">
                     <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white hover-lift transition-all h-100">
                        <div className="bg-secondary bg-opacity-10" style={{height: '140px'}}></div>
                        <div className="p-4">
                           <h6 className="fw-bold mb-1">Interactive Course Title #{i}</h6>
                           <p className="small text-secondary mb-4">12 Modules • 45 Students Enrolled</p>
                           <div className="d-flex gap-2">
                              <button className="btn btn-outline-primary btn-sm rounded-pill flex-grow-1">Edit Content</button>
                              <button className="btn btn-light btn-sm rounded-pill">Analytics</button>
                           </div>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'Live Classes' && (
           <div className="animate-fade-in">
              <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 bg-white mx-auto" style={{maxWidth: '700px'}}>
                 <h4 className="fw-black text-center mb-5">Schedule Live Google Meet</h4>
                 <form className="row g-4">
                    <div className="col-md-6">
                       <label className="form-label small fw-bold text-secondary text-uppercase ms-1" style={{fontSize: '10px'}}>Target Batch</label>
                       <select className="form-select bg-light border-0 py-3 rounded-4 px-4">
                          <option>Batch A - Morning</option>
                          <option>Batch B - evening</option>
                       </select>
                    </div>
                    <div className="col-md-6">
                       <label className="form-label small fw-bold text-secondary text-uppercase ms-1" style={{fontSize: '10px'}}>Topic of Discussion</label>
                       <input type="text" className="form-control bg-light border-0 py-3 rounded-4 px-4" placeholder="e.g. Modern Physics" />
                    </div>
                    <div className="col-md-6">
                       <label className="form-label small fw-bold text-secondary text-uppercase ms-1" style={{fontSize: '10px'}}>Date & Time</label>
                       <input type="datetime-local" className="form-control bg-light border-0 py-3 rounded-4 px-4" />
                    </div>
                    <div className="col-md-6">
                       <label className="form-label small fw-bold text-secondary text-uppercase ms-1" style={{fontSize: '10px'}}>Duration</label>
                       <select className="form-select bg-light border-0 py-3 rounded-4 px-4">
                          <option>45 Minutes</option>
                          <option>60 Minutes</option>
                          <option>90 Minutes</option>
                       </select>
                    </div>
                    <div className="col-12 pt-3">
                       <button className="btn btn-primary-custom w-100 py-3 shadow-lg">Generate Class & Notify Students</button>
                    </div>
                 </form>
              </div>
           </div>
        )}

        {activeTab === 'Wallet' && (
           <div className="animate-fade-in">
              <div className="row g-4 mb-5">
                 <div className="col-md-6 col-lg-4">
                    <div className="card border-0 shadow-lg rounded-4 p-4 text-white" style={{background: 'linear-gradient(135deg, #4f46e5, #3b82f6)'}}>
                       <span className="small fw-bold opacity-75 text-uppercase" style={{fontSize: '10px'}}>Available Balance</span>
                       <h1 className="fw-black mb-4">₹8,450.50</h1>
                       <button className="btn btn-white bg-white text-primary w-100 py-3 fw-black rounded-4">Withdraw to Bank</button>
                    </div>
                 </div>
              </div>
              
              <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden">
                 <div className="p-4 border-bottom">
                    <h5 className="fw-bold mb-0">Commission Ledger</h5>
                 </div>
                 <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                       <thead className="bg-light">
                          <tr className="small text-secondary text-uppercase fw-bold" style={{fontSize: '10px'}}>
                             <th className="px-4 py-3">Course Name</th>
                             <th className="py-3">Sale Price</th>
                             <th className="py-3">Plat. Share (30%)</th>
                             <th className="py-3">Your Net (70%)</th>
                             <th className="px-4 py-3 text-end">Date</th>
                          </tr>
                       </thead>
                       <tbody>
                          {[1,2,3].map(i => (
                             <tr key={i}>
                                <td className="px-4 py-4 fw-bold text-dark small">Complete Physics Hub Module {i}</td>
                                <td className="small">₹1,000.00</td>
                                <td className="text-danger small">-₹300.00</td>
                                <td className="text-success fw-bold small">+₹700.00</td>
                                <td className="px-4 text-end text-secondary x-small fw-bold">12 JUL 2026</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
        )}
      </main>
    </div>
  );
};

export default TeacherPanel;
