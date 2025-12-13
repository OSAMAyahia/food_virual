import React, { useEffect } from "react";
import NavBarCom from "./NavBarCom";
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../Redux/Food/Security';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user?.currentUser);
  const isAuthenticated = useSelector(state => state.user?.isAuthenticated);

  // التحقق من حالة المصادقة عند تحميل المكون
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // إذا لم يكن مسجل الدخول، أظهر رسالة
  if (!isAuthenticated || !currentUser) {
    return (
      <div>
        <NavBarCom />
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card shadow-lg border-0">
                <div className="card-body text-center">
                  <h3>يرجى تسجيل الدخول</h3>
                  <p>يجب عليك تسجيل الدخول لعرض ملفك الشخصي</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBarCom />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            {/* Profile Card */}
            <div className="card shadow-lg border-0">
              <div className="card-body text-center">
                <div className="mb-3">
                  {/* Profile Image */}
                  <img
                    src={currentUser.profileImage}
                    alt="Profile"
                    className="rounded-circle img-thumbnail"
                    width="120"
                    height="120"
                  />
                </div>
                {/* User Info */}
                <h3 className="card-title mb-3">{currentUser.name}</h3>
                <p className="text-muted mb-4">{currentUser.jobTitle}</p>

                <div className="d-flex flex-column align-items-start px-3">
                  <div className="mb-2">
                    <strong>البريد الإلكتروني:</strong>
                    <span className="text-muted"> {currentUser.email}</span>
                  </div>
                  <div className="mb-2">
                    <strong>رقم الهاتف:</strong>
                    <span className="text-muted"> {currentUser.phone}</span>
                  </div>
                  <div className="mb-2">
                    <strong>العنوان:</strong>
                    <span className="text-muted"> {currentUser.address}</span>
                  </div>
                  <div className="mb-2">
                    <strong>الدور:</strong>
                    <span className="text-muted"> {currentUser.role === 'admin' ? 'مدير' : 'عميل'}</span>
                  </div>
                  <div className="mb-2">
                    <strong>تاريخ الانضمام:</strong>
                    <span className="text-muted"> {new Date(currentUser.createdAt).toLocaleDateString('ar-EG')}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4">
                  <button className="btn btn-primary me-2">تعديل الملف الشخصي</button>
                  <button className="btn btn-outline-secondary">تغيير كلمة المرور</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;