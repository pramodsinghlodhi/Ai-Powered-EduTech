import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const InstitutePanel = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const menuItems = [
    { id: 'Overview', icon: '🏢' },
    { id: 'Teachers', icon: '👨‍🏫' },
    { id: 'Courses', icon: '📚' },
    { id: 'Admissions', icon: '📝' },
    { id: 'Academic', icon: '🎓' },
    { id: 'Financials', icon: '💳' },
    { id: 'Support', icon: '💬' }
  ];

  return (
    <div className="container-fluid bg-light min-vh-100 p-0 d-flex flex-column flex-lg-row">
      
      {/* 🏢 Institute Sidebar */}
      <aside className="bg-white border-end d-flex flex-column p-4 sticky-top" style={{ width: '280px', height: '100vh' }}>
        <div className="d-flex align-items-center gap-2 mb-5 px-2">
            <div className="bg-primary text-white p-2 rounded-3 fw-black small">EDU</div>
            <span className="fw-black text-dark h5 mb-0" style={{letterSpacing: '-1px'}}>ACADEMY<span className="text-primary">HUB</span></span>
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

      {/* 🖥️ Administration Workspace */}
      <main className="flex-grow-1 p-4 p-md-5 overflow-auto">
        <header className="d-flex justify-content-between align-items-center mb-5">
           <div>
              <h2 className="fw-black text-dark mb-1">{activeTab}</h2>
              <p className="text-secondary small mb-0">Managing local academy operations & staff</p>
           </div>
           <div className="d-flex gap-3">
              <button className="btn btn-white bg-white border rounded-pill px-4 small fw-bold shadow-sm">White-Label Settings</button>
              <button className="btn btn-primary rounded-pill px-4 small fw-bold shadow-lg">+ Add Item</button>
           </div>
        </header>

        {activeTab === 'Overview' && (
          <div className="animate-fade-in">
             <div className="row g-4 mb-5">
                {[
                  { label: 'Active Students', value: '840', icon: '👤', color: 'primary' },
                  { label: 'Total Teachers', value: '42', icon: '👨‍🏫', color: 'success' },
                  { label: 'Today Attendance', value: '94%', icon: '📅', color: 'warning' },
                  { label: 'Gross Revenue', value: '₹12.5L', icon: '💰', color: 'info' }
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
                <div className="col-lg-7">
                   <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
                      <h5 className="fw-bold mb-4">Batch Performance Grid</h5>
                      <div className="bg-light rounded-4 p-5 text-center">
                         <p className="text-secondary small mb-0 opacity-50">Interactive classroom management loading...</p>
                      </div>
                   </div>
                </div>
                <div className="col-lg-5">
                   <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
                      <h5 className="fw-bold mb-4">Pending Admissions</h5>
                      <div className="space-y-3">
                         {[1,2,3,4].map(i => (
                            <div key={i} className="d-flex align-items-center justify-content-between p-3 bg-light rounded-4 mb-2">
                               <div>
                                  <h6 className="mb-0 small fw-bold">Rahul Sharma</h6>
                                  <span className="x-small text-secondary">Course: UPSC 2026 Batch</span>
                               </div>
                               <span className="badge bg-warning bg-opacity-10 text-warning px-2 py-1 rounded-pill">Pending</span>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'Financials' && (
           <div className="animate-fade-in text-center py-5">
              <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden text-start">
                 <div className="p-4 border-bottom bg-light">
                    <h5 className="fw-bold mb-0">Student Installments & Fees</h5>
                 </div>
                 <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                       <thead className="bg-white border-bottom">
                          <tr className="small text-secondary text-uppercase fw-bold" style={{fontSize: '10px'}}>
                             <th className="px-4 py-3">Student</th>
                             <th className="py-3">Batch</th>
                             <th className="py-3">Amount Due</th>
                             <th className="py-3">Due Date</th>
                             <th className="px-4 py-3 text-end">Status</th>
                          </tr>
                       </thead>
                       <tbody>
                          <tr>
                             <td className="px-4 py-5 text-center text-secondary opacity-50 fw-bold" colSpan="5">No outstanding installments found for this period.</td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
        )}

        {['Teachers', 'Courses', 'Admissions', 'Academic', 'Support'].includes(activeTab) && (
           <div className="animate-fade-in text-center py-5">
              <div className="display-1 opacity-10 mb-4">{menuItems.find(i => i.id === activeTab).icon}</div>
              <h4 className="fw-black text-dark">{activeTab} Control Center</h4>
              <p className="text-secondary mx-auto mb-4" style={{maxWidth: '400px'}}>The institute management API is syncing. Real-time data for {activeTab.toLowerCase()} will be displayed here shortly.</p>
              <button className="btn btn-primary rounded-pill px-5 py-3 shadow-lg">Refresh Sync State</button>
           </div>
        )}
      </main>
    </div>
  );
};

export default InstitutePanel;
