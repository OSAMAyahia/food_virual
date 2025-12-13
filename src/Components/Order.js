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
      <NavBarCom />
      <div className="container mt-5">
        <h2 className="text-center mb-4">طلباتي</h2>
        
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
                    <div key={order._id} className="order-item mb-3 p-3 border rounded">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5>طلب #{order._id.slice(-6)}</h5>
                        <span className={`badge bg-${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="mb-2">
                        <small className="text-muted">
                          تاريخ الطلب: {new Date(order.orderDate).toLocaleDateString('ar-EG')}
                        </small>
                      </div>
                      
                      <div className="mb-2">
                        <small className="text-muted">
                          عنوان التوصيل: {order.deliveryAddress}
                        </small>
                      </div>
                      
                      <div className="mb-2">
                        <small className="text-muted">
                          طريقة الدفع: {order.paymentMethod}
                        </small>
                      </div>
                      
                      <div className="order-items">
                        {order.items.map((item, index) => (
                          <div key={index} className="d-flex align-items-center mb-2">
                            <img 
                              src={item.image} 
                              onError={(e) => { e.currentTarget.src = `https://loremflickr.com/60/60/${encodeURIComponent(item.name || 'food')}`; }}
                              alt={item.name}
                              className="me-3 rounded"
                              style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                            />
                            <div className="flex-grow-1">
                              <h6>{item.name}</h6>
                              <p className="mb-0">الكمية: {item.quantity}</p>
                              <p className="mb-0">السعر: {item.price} ج.م</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                        <strong>إجمالي الطلب:</strong>
                        <strong>{order.totalAmount} ج.م</strong>
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
