import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SuperAdminPanel = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const menuItems = [
    { id: 'Overview', icon: '📊' },
    { id: 'Institutes', icon: '🏢' },
    { id: 'Users', icon: '👥' },
    { id: 'Financials', icon: '💳' },
    { id: 'Courses', icon: '📚' },
    { id: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="container-fluid p-0 d-flex flex-column flex-lg-row min-vh-100 bg-light">
      
      {/* 🧭 Sidebar Navigation */}
      <aside className="bg-white border-end d-flex flex-column p-4" style={{ width: '280px', position: 'sticky', top: 0, height: '100vh' }}>
        <div className="d-flex align-items-center gap-2 mb-5 px-2">
            <div className="bg-primary text-white p-2 rounded-3 fw-black small">EDU</div>
            <span className="fw-black text-dark h5 mb-0" style={{letterSpacing: '-1px'}}>MASTER<span className="text-primary">ADMIN</span></span>
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
           <Link to="/" className="btn btn-outline-danger w-100 py-2 rounded-3 small fw-bold">Sign Out</Link>
        </div>
      </aside>

      {/* 🖥️ Main Dashboard Content */}
      <main className="flex-grow-1 p-4 p-md-5 overflow-auto">
        <header className="d-flex justify-content-between align-items-center mb-5">
           <div>
              <h2 className="fw-black text-dark mb-1">{activeTab}</h2>
              <p className="text-secondary small mb-0">Platform performance & system status</p>
           </div>
           <div className="d-flex gap-3">
              <button className="btn btn-white bg-white border rounded-pill px-4 small fw-bold">Export Report</button>
              <button className="btn btn-primary rounded-pill px-4 small fw-bold">+ New Institute</button>
           </div>
        </header>

        {activeTab === 'Overview' && (
          <div className="animate-fade-in">
            {/* Stats Grid */}
            <div className="row g-4 mb-5">
              {[
                { label: 'Total Revenue', value: '₹48.4 Lakh', trend: '+12%', color: 'primary' },
                { label: 'Active Institutes', value: '254', trend: '+5.4%', color: 'success' },
                { label: 'Total Enrollments', value: '1.2M', trend: '+24%', color: 'info' },
                { label: 'System Health', value: '99.9%', trend: 'Stable', color: 'purple' }
              ].map((stat, i) => (
                <div key={i} className="col-sm-6 col-xl-3">
                   <div className="card border-0 shadow-sm p-4 rounded-4 h-100 bg-white">
                      <p className="small text-secondary fw-bold text-uppercase mb-3" style={{fontSize: '10px', letterSpacing: '1px'}}>{stat.label}</p>
                      <h3 className="fw-black mb-2">{stat.value}</h3>
                      <span className={`badge bg-${stat.trend.includes('+') ? 'success' : 'primary'} bg-opacity-10 text-${stat.trend.includes('+') ? 'success' : 'primary'} rounded-pill`}>
                        {stat.trend} this month
                      </span>
                   </div>
                </div>
              ))}
            </div>

            {/* Performance Charts & Recent Payouts */}
            <div className="row g-4">
               <div className="col-lg-8">
                  <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
                     <h5 className="fw-bold text-dark mb-4">Institute Growth Analytics</h5>
                     <div className="bg-light rounded-4 d-flex align-items-center justify-content-center" style={{height: '300px'}}>
                        <p className="text-secondary opacity-50 small italic">Interractive Chart Placeholder</p>
                     </div>
                  </div>
               </div>
               <div className="col-lg-4">
                  <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
                     <h5 className="fw-bold text-dark mb-4">Pending Approvals</h5>
                     <div className="space-y-4">
                        {[
                          { name: 'Sky High Academy', loc: 'Delhi', type: 'Schools' },
                          { name: 'Quantum Physics Inst', loc: 'Mumbai', type: 'Coaching' },
                          { name: 'Creative Arts Hub', loc: 'Bangalore', type: 'Design' }
                        ].map((inst, idx) => (
                           <div key={idx} className="d-flex align-items-center justify-content-between p-3 bg-light rounded-4 mb-2">
                              <div>
                                 <h6 className="fw-bold mb-0 small text-dark">{inst.name}</h6>
                                 <span className="x-small text-secondary">{inst.loc} • {inst.type}</span>
                              </div>
                              <button className="btn btn-primary btn-sm rounded-pill px-3">Review</button>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'Financials' && (
          <div className="animate-fade-in">
             <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden">
                <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                   <h5 className="fw-bold mb-0">Gateway Transactions</h5>
                   <input type="text" className="form-control form-control-sm w-auto" placeholder="Search Txn ID..." />
                </div>
                <div className="table-responsive p-0">
                   <table className="table table-hover align-middle mb-0">
                      <thead className="bg-light">
                         <tr className="small text-secondary text-uppercase fw-bold">
                            <th className="px-4 py-3 border-0">Transaction ID</th>
                            <th className="py-3 border-0">Institute</th>
                            <th className="py-3 border-0">Amount</th>
                            <th className="py-3 border-0">Method</th>
                            <th className="py-3 border-0">Status</th>
                            <th className="px-4 py-3 border-0 text-end">Action</th>
                         </tr>
                      </thead>
                      <tbody>
                         {[1,2,3,4,5].map(txn => (
                           <tr key={txn}>
                              <td className="px-4 py-4 fw-medium text-dark">#TXN-94827{txn}</td>
                              <td className="small">Bright Minds Academy</td>
                              <td className="fw-bold">₹{txn},240</td>
                              <td><span className="badge bg-light text-dark border">UPI Payment</span></td>
                              <td><span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3">Completed</span></td>
                              <td className="px-4 text-end"><button className="btn btn-light btn-sm rounded-circle shadow-sm">⋮</button></td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
        )}

        {['Institutes', 'Users', 'Courses', 'Settings'].includes(activeTab) && (
          <div className="animate-fade-in text-center py-5">
             <div className="display-1 opacity-10 mb-4">{menuItems.find(i => i.id === activeTab).icon}</div>
             <h4 className="fw-black text-dark">{activeTab} Module Ready</h4>
             <p className="text-secondary mx-auto mb-4" style={{maxWidth: '400px'}}>The secure API backend is connected. You can now manage all platform {activeTab.toLowerCase()} from this central panel.</p>
             <button className="btn btn-primary rounded-pill px-5 py-3 shadow-lg">Load Cloud Data</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SuperAdminPanel;
