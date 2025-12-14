import React, { useEffect, useState } from 'react';
import { login } from '../Redux/Food/Security';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showToast } from './../showToast';
import { ToastContainer, toast } from 'react-toastify';
import './Auth.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const currentUser = useSelector((state) => state.user?.currentUser);
  const loading = useSelector((state) => state.user?.loading);
  const error = useSelector((state) => state.user?.err);

  useEffect(() => {
    document.body.classList.add('no-navbar-padding');
    return () => {
      document.body.classList.remove('no-navbar-padding');
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('الرجاء إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    if (password.length < 6) {
      toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    try {
      const result = await dispatch(login({ email, password })).unwrap();
      if (result) {
        showToast(true);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (err) {
      toast.error(err?.message || 'فشل تسجيل الدخول');
    }
  };

  return (
    <>
      <div className="position-relative" style={{ top: 0, left: 0, right: 0 }}>
        <ToastContainer position="top-right" />

        <div
          className="d-flex align-items-center justify-content-center auth-page-container"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            minHeight: '100vh',
            width: '100%',
            padding: '20px',
          }}
        >
          {/* Decorative Circles */}
          <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ pointerEvents: 'none' }}>
            <div className="position-absolute bg-white opacity-10 rounded-circle" style={{ width: '300px', height: '300px', top: '-50px', left: '-50px', opacity: 0.1 }}></div>
            <div className="position-absolute bg-white opacity-10 rounded-circle" style={{ width: '200px', height: '200px', bottom: '-50px', right: '-50px', opacity: 0.1 }}></div>
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
                      سجل دخولك الآن واستمتع بتجربة فريدة ومميزة.
                    </p>
                  </div>
                </div>

                {/* قسم النموذج */}
                <div className="col-lg-7">
                  <div className="card-body p-3 p-lg-4 bg-white rounded-end-4">
                    <h2 className="mb-3 text-center fw-bold text-dark">مرحبًا بك!</h2>
                    <p className="text-center text-muted mb-4 small">
                      سجل دخولك للمتابعة
                    </p>

                    {error && (
                      <div className="alert alert-danger text-center rounded-3" role="alert">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleLogin}>
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

                      <div className="mb-4">
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

                      <div className="d-grid mb-3">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg py-2 fw-bold rounded-3 shadow-sm"
                          disabled={loading}
                          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}
                        >
                          {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                        </button>
                      </div>
                    </form>

                    <div className="mt-4 text-center">
                      <p className="mb-0 text-dark">
                        ليس لديك حساب؟{' '}
                        <a href="/signup" className="text-decoration-none fw-bold" style={{ color: '#667eea' }}>
                          اشترك الآن
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

export default Login;
