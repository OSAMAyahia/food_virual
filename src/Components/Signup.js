import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Createuser } from '../Redux/Food/Security';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../showToast';
import { ToastContainer, toast } from 'react-toastify';
import './Auth.css';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const loading = useSelector((state) => state.user?.loading);
  const error = useSelector((state) => state.user?.err);

  useEffect(() => {
    document.body.classList.add('no-navbar-padding');
    return () => {
      document.body.classList.remove('no-navbar-padding');
    };
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error('الرجاء ملء جميع الحقول');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('كلمتا المرور غير متطابقتين');
      return;
    }

    if (password.length < 6) {
      toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    try {
      await dispatch(
        Createuser({
          name,
          email,
          password,
          confirmPassword,
        })
      ).unwrap();

      showToast(true);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      toast.error(err?.message || 'فشل إنشاء الحساب');
    }
  };

  return (
    <>
      <div className="position-relative" style={{ top: 0, left: 0, right: 0 }}>
        <ToastContainer position="top-right" />

        <div 
          className="d-flex align-items-center justify-content-center position-relative overflow-hidden auth-page-container"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            minHeight: '80vh',
            height: 'auto',
            padding: '20px 0',
          }}
        >
          {/* تأثيرات بصرية خفيفة */}
          <div className="position-absolute top-0 start-0 w-100 h-100">
            <div className="position-absolute top-0 start-0 translate-middle bg-white opacity-10 rounded-circle" style={{ width: '300px', height: '300px', top: '10%', left: '-10%' }}></div>
            <div className="position-absolute bottom-0 end-0 translate-middle bg-white opacity-10 rounded-circle" style={{ width: '250px', height: '250px', bottom: '10%', right: '-10%' }}></div>
          </div>

          <div 
            className="col-12 col-md-9 col-lg-7 col-xl-6 position-relative z-index-2 mx-auto"
          >
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden auth-card">
              <div className="row g-0">
                {/* قسم المعلومات الجانبية (مخفٍ على الشاشات الصغيرة) */}
                <div className="col-lg-5 d-none d-lg-block">
                  <div 
                    className="h-100 d-flex flex-column justify-content-center align-items-center p-5 text-white"
                    style={{ backgroundColor: '#667eea' }}
                  >
                    <h3 className="fw-bold mb-3">مرحبًا بك!</h3>
                    <p className="text-center opacity-75 mb-0">
                      انضم إلى مجتمعنا وابدأ رحلتك معنا. أنشئ حسابك الآن واحصل على تجربة فريدة.
                    </p>
                  </div>
                </div>

                {/* قسم النموذج */}
                <div className="col-lg-7">
                  <div className="card-body p-3 p-lg-4 bg-white rounded-end-4">
                    <h2 className="mb-3 text-center fw-bold text-dark">انضم إلينا!</h2>
                    <p className="text-center text-muted mb-4 small">
                      أنشئ حسابك لتبدأ رحلتك
                    </p>

                    {error && (
                      <div className="alert alert-danger text-center rounded-3" role="alert">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSignup}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-semibold text-dark">
                          الاسم الكامل
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="form-control form-control-lg py-2 rounded-3 border-0 shadow-sm"
                          placeholder="أدخل اسمك الكامل"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold text-dark">
                          البريد الإلكتروني
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="form-control form-control-lg py-2 rounded-3 border-0 shadow-sm"
                          placeholder="example@domain.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-semibold text-dark">
                          كلمة المرور
                        </label>
                        <input
                          id="password"
                          type="password"
                          className="form-control form-control-lg py-2 rounded-3 border-0 shadow-sm"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="confirmPassword" className="form-label fw-semibold text-dark">
                          تأكيد كلمة المرور
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          className="form-control form-control-lg py-2 rounded-3 border-0 shadow-sm"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="d-grid mb-3">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg py-2 fw-bold rounded-3 shadow-sm"
                          disabled={loading}
                          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}
                        >
                          {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
                        </button>
                      </div>
                    </form>

                    <div className="mt-4 text-center">
                      <p className="mb-0 text-dark">
                        هل لديك حساب بالفعل؟{' '}
                        <a href="/login" className="text-decoration-none fw-bold" style={{ color: '#667eea' }}>
                          تسجيل الدخول
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
