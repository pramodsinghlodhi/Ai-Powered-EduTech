import React, { useState } from 'react';

const EnrollmentModal = ({ course, onClose }) => {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [step, setStep] = useState(1); // 1: Coupon, 2: Payment, 3: Success
  const [upiId, setUpiId] = useState('');

  const originalPrice = course.price;
  const finalPrice = originalPrice - discount;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'SAVE10') {
      setDiscount(originalPrice * 0.1);
      alert("Coupon Applied! 10% Discounted.");
    } else if (coupon.toUpperCase() === 'FIRST50') {
      setDiscount(originalPrice * 0.5);
      alert("Coupon Applied! 50% Discounted.");
    } else {
      alert("Invalid Coupon Code.");
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!upiId.includes('@')) {
        alert("Please enter a valid UPI ID (e.g. name@okaxis)");
        return;
    }
    setStep(3);
  };

  return (
    <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal-payment border-0 shadow-lg">
          <div className="modal-header border-0 p-4 pb-0">
            <h5 className="fw-black text-dark">Enroll in Course</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          
          <div className="modal-body p-4">
            {step === 1 && (
              <div className="animate-fade-in">
                <div className="d-flex align-items-center gap-3 mb-4 p-3 bg-light rounded-4">
                   <div className="bg-primary rounded-3 text-white d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px', fontSize: '1.5rem'}}>📚</div>
                   <div>
                      <h6 className="fw-bold mb-0 text-dark">{course.title}</h6>
                      <span className="small text-secondary">Instructor: {course.instructor}</span>
                   </div>
                </div>

                <div className="mb-4">
                   <label className="form-label small fw-bold text-uppercase text-secondary">Coupon Code</label>
                   <div className="input-group">
                      <input 
                        type="text" 
                        className="form-control border-end-0" 
                        placeholder="ENTER CODE (e.g. SAVE10)" 
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        style={{background: '#f8fafc', color: '#1e293b'}}
                      />
                      <button className="btn btn-primary px-4 fw-bold" onClick={applyCoupon}>Apply</button>
                   </div>
                </div>

                <div className="p-3 bg-light rounded-4 mb-4">
                   <div className="d-flex justify-content-between mb-2">
                       <span className="text-secondary">Course Price</span>
                       <span className="fw-bold text-dark">₹{originalPrice}</span>
                   </div>
                   <div className="d-flex justify-content-between mb-2 text-success">
                       <span>Discount Applied</span>
                       <span>-₹{discount}</span>
                   </div>
                   <hr className="my-2 opacity-10" />
                   <div className="d-flex justify-content-between h5 mb-0 fw-black text-dark">
                       <span>Total Payable</span>
                       <span>₹{finalPrice}</span>
                   </div>
                </div>

                <button className="btn btn-primary-custom w-100 py-3" onClick={() => setStep(2)}>Next: Choose Payment</button>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in text-center">
                <h6 className="fw-bold mb-4">Pay via UPI</h6>
                <div className="mb-4 p-4 bg-white border rounded-4 d-inline-block shadow-sm">
                   {/* DUMMY QR CODE */}
                   <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=educreative@upi&pn=EduCreative&am=1&cu=INR" alt="QR" />
                   <p className="mt-3 small text-secondary fw-bold">Scan to Pay ₹{finalPrice}</p>
                </div>

                <form onSubmit={handlePayment}>
                   <div className="mb-4 text-start">
                      <label className="form-label small fw-bold text-uppercase text-secondary">Or enter UPI ID</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="yourname@okaxis" 
                        required 
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        style={{background: '#f8fafc', color: '#1e293b'}}
                      />
                   </div>
                   <button type="submit" className="btn btn-primary-custom w-100 py-3">Confirm & Complete Payment</button>
                </form>
                <button className="btn btn-link text-secondary mt-2 small text-decoration-none" onClick={() => setStep(1)}>← Back</button>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in text-center py-4">
                <div className="display-1 text-success mb-3">✅</div>
                <h4 className="fw-black text-dark">Payment Successful!</h4>
                <p className="text-secondary px-4">Your enrollment in "<b>{course.title}</b>" is complete. Redirecting to your classroom...</p>
                <button className="btn btn-primary-custom px-5 py-3 mt-4" onClick={onClose}>Finish</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentModal;
