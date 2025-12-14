import React, { useState, useEffect } from "react";
import NavBarCom from "./NavBarCom";
import { useSelector, useDispatch } from 'react-redux';
import { GetOrders } from '../Redux/Food/CartSlice';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(state => state.cart);
  const currentUser = useSelector(state => state.user?.currentUser);
  const isAuthenticated = useSelector(state => state.user?.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(GetOrders());
    }
  }, [dispatch, isAuthenticated]);

  // إذا لم يكن مسجل الدخول
  if (!isAuthenticated) {
    return (
      <div>
        <NavBarCom />
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card shadow-lg border-0">
                <div className="card-body text-center">
                  <h3>يرجى تسجيل الدخول</h3>
                  <p>يجب عليك تسجيل الدخول لعرض طلباتك</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <NavBarCom />
        <div className="container mt-5">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">جاري التحميل...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavBarCom />
        <div className="container mt-5">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    if (!orders || orders.length === 0) return "0.00";
    return orders.reduce((total, order) => total + order.totalAmount, 0).toFixed(2);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'مكتمل':
        return 'success';
      case 'قيد التحضير':
        return 'warning';
      case 'تم الإلغاء':
        return 'danger';
      default:
        return 'info';
    }
  };

  return (
    <div>
      <style>{`
        .page-header {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 2rem;
          border-radius: 15px;
          margin-bottom: 2rem;
          border: 1px solid #dee2e6;
        }
        .order-stats {
          background: white !important;
          border: 2px solid #e9ecef;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .order-card {
          background: white;
          border-radius: 15px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          border: 1px solid #e9ecef;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .order-card:hover {
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }
        .order-card-header {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%) !important;
          border-bottom: 2px solid #dee2e6;
        }
        .order-item-product {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        .order-item-product:hover {
          background: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .order-item-product img {
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        .order-total-section {
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%) !important;
          border-top: 2px solid #2196f3;
        }
        @media (max-width: 768px) {
          .page-header {
            padding: 1.5rem;
            text-align: center;
          }
          .order-stats {
            margin-top: 1rem;
          }
          .order-card-header .col-md-6:last-child {
            text-align: center !important;
            margin-top: 1rem;
          }
          .order-item-product img {
            width: 60px !important;
            height: 60px !important;
          }
        }
      `}</style>
      <NavBarCom />
      <div className="container mt-5">
        <div className="page-header mb-5">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-6 fw-bold text-primary mb-2">
                📋 طلباتي
              </h1>
              <p className="lead text-muted mb-0">
                تتبع جميع طلباتك السابقة وحدث حالتها
              </p>
            </div>
            <div className="col-md-4 text-md-end">
              <div className="order-stats bg-light p-3 rounded">
                <div className="row text-center">
                  <div className="col-6">
                    <h3 className="text-primary fw-bold mb-0">{orders.length}</h3>
                    <small className="text-muted">إجمالي الطلبات</small>
                  </div>
                  <div className="col-6">
                    <h3 className="text-success fw-bold mb-0">{calculateTotal()} ج.م</h3>
                    <small className="text-muted">إجمالي المبالغ</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {(!orders || orders.length === 0) ? (
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h4>لا توجد طلبات حتى الآن</h4>
                  <p>ابدأ بالتسوق واطلب أشهى المأكولات!</p>
                  <a href="/" className="btn btn-primary">تصفح المطعم</a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-12 col-md-8">
              {/* Orders List */}
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="mb-3">تفاصيل الطلبات</h4>
                  
                  {orders.map((order) => (
                    <div key={order._id} className="order-card mb-4 shadow-sm border-0">
                      <div className="order-card-header bg-light p-3 rounded-top">
                        <div className="row align-items-center">
                          <div className="col-md-6">
                            <h5 className="mb-1 fw-bold text-primary">
                              🍽️ طلب #{order._id.slice(-6)}
                            </h5>
                            <small className="text-muted">
                              📅
                              {new Date(order.orderDate).toLocaleDateString('ar-EG', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </small>
                          </div>
                          <div className="col-md-6 text-md-end">
                            <span className={`badge px-3 py-2 fs-6 bg-${getStatusColor(order.status)}`}>
                              ● {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="order-card-body p-3">
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <div className="order-info-item">
                              <strong className="text-muted d-block mb-1">
                                📍 عنوان التوصيل
                              </strong>
                              <p className="mb-0">{order.deliveryAddress}</p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="order-info-item">
                              <strong className="text-muted d-block mb-1">
                                💳 طريقة الدفع
                              </strong>
                              <p className="mb-0">{order.paymentMethod}</p>
                            </div>
                          </div>
                        </div>
                      
                      <div className="order-items">
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item-product mb-3 p-3 border rounded">
                            <div className="row align-items-center">
                              <div className="col-auto">
                                <img 
                                  src={item.image} 
                                  onError={(e) => { e.currentTarget.src = `https://loremflickr.com/120/120/${encodeURIComponent(item.name || 'food')}`; }}
                                  alt={item.name}
                                  className="rounded shadow-sm"
                                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                />
                              </div>
                              <div className="col">
                                <h6 className="mb-1 fw-bold">{item.name}</h6>
                                <p className="mb-1 text-muted">
                                  <small>الكمية: {item.quantity} × {item.price} ج.م</small>
                                </p>
                                <p className="mb-0 text-primary fw-semibold">
                                  المجموع: {(item.quantity * item.price).toFixed(2)} ج.م
                                </p>
                              </div>
                              <div className="col-auto text-end">
                                <span className="badge bg-light text-dark border">
                                  {item.quantity}×
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                        </div>
                        
                        <div className="order-total-section bg-light p-3 rounded-bottom">
                          <div className="row align-items-center">
                            <div className="col">
                              <h6 className="mb-0 text-muted">إجمالي الطلب</h6>
                            </div>
                            <div className="col-auto">
                              <h4 className="mb-0 text-primary fw-bold">
                                {order.totalAmount} ج.م
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="col-12 col-md-4">
              {/* Order Summary */}
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="mb-3">ملخص الطلبات</h4>
                  <div className="d-flex justify-content-between">
                    <span>عدد الطلبات:</span>
                    <strong>{orders.length}</strong>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span>إجمالي المبالغ:</span>
                    <strong>{calculateTotal()} ج.م</strong>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span>متوسط قيمة الطلب:</span>
                    <strong>{(parseFloat(calculateTotal()) / orders.length).toFixed(2)} ج.م</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
