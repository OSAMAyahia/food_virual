import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Home, ShoppingCart } from '@mui/icons-material';
import NavBarCom from './NavBarCom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { orderNumber, totalAmount, deliveryTime } = location.state || {};
  
  if (!orderNumber) {
    return (
      <div>
        <NavBarCom />
        <div className="order-confirmation-error">
          <h2>No order found</h2>
          <button onClick={() => navigate('/')} className="home-btn">
            <Home /> Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBarCom />
      <div className="order-confirmation-container">
        <div className="confirmation-card">
          <div className="success-icon">
            <CheckCircle />
          </div>
          
          <h1>Order Confirmed!</h1>
          <p className="confirmation-message">
            Thank you for your order. Your payment has been processed successfully.
          </p>
          
          <div className="order-details">
            <div className="detail-item">
              <span className="label">Order Number:</span>
              <span className="value order-number">{orderNumber}</span>
            </div>
            
            <div className="detail-item">
              <span className="label">Total Amount:</span>
              <span className="value total-amount">${totalAmount?.toFixed(2)}</span>
            </div>
            
            <div className="detail-item">
              <span className="label">Estimated Delivery:</span>
              <span className="value delivery-time">{deliveryTime}</span>
            </div>
          </div>
          
          <div className="confirmation-actions">
            <button onClick={() => navigate('/order')} className="view-order-btn">
              <ShoppingCart /> View Order Details
            </button>
            
            <button onClick={() => navigate('/')} className="continue-shopping-btn">
              <Home /> Continue Shopping
            </button>
          </div>
          
          <div className="confirmation-note">
            <p>You will receive an email confirmation shortly with your order details and tracking information.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;