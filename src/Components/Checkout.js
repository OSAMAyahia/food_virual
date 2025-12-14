import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../Redux/Root';
import { 
  Payment, 
  CreditCard, 
  Person, 
  LocationOn, 
  Phone, 
  Email,
  Schedule,
  LocalOffer,
  ArrowBack
} from '@mui/icons-material';
import NavBarCom from './NavBarCom';
import { toast } from 'react-toastify';
import './Checkout.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.food?.cartItems || []);
  const totalPrice = useSelector(state => state.food?.totalPrice || 0);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState('30-45 min');

  useEffect(() => {
    if (cartItems.length === 0) {
      toast.warning('Your cart is empty!');
      navigate('/cart');
    }
  }, [cartItems.length, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces every 4 digits
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    // Format expiry date as MM/YY
    if (name === 'expiryDate') {
      const formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2').slice(0, 5);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    // CVV should be max 3-4 digits
    if (name === 'cvv') {
      const formattedValue = value.replace(/\D/g, '').slice(0, 4);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (formData.cardNumber.replace(/\s/g, '').length !== 16) newErrors.cardNumber = 'Card number must be 16 digits';
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = 'Invalid expiry date format (MM/YY)';
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3-4 digits';
    if (!formData.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Fake payment processing - randomly succeed or fail for demo
      const paymentSuccess = Math.random() > 0.1; // 90% success rate
      
      if (paymentSuccess) {
        // Generate fake order number
        const orderNumber = 'ORD-' + Date.now().toString().slice(-6);
        
        toast.success(`Payment successful! Order ${orderNumber} confirmed.`);
        dispatch(clearCart());
        
        // Navigate to order confirmation page after 2 seconds
        setTimeout(() => {
          navigate('/order-confirmation', { 
            state: { 
              orderNumber, 
              totalAmount: calculateFinalTotal(),
              deliveryTime 
            } 
          });
        }, 2000);
      } else {
        toast.error('Payment failed. Please check your card details and try again.');
        setIsProcessing(false);
      }
    }, 3000); // Simulate 3 second processing time
  };

  const calculateDiscount = () => {
    return totalPrice * 0; // No discount for now
  };

  const calculateFinalTotal = () => {
    const subtotal = totalPrice;
    const discountAmount = calculateDiscount();
    const deliveryFee = 5;
    const tax = (subtotal - discountAmount) * 0.08;
    return subtotal - discountAmount + deliveryFee + tax;
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <NavBarCom />
        <div className="checkout-empty">
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate('/cart')} className="back-to-cart">
            <ArrowBack /> Back to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBarCom />
      <div className="checkout-container">
        <div className="checkout-header">
          <button onClick={() => navigate('/cart')} className="back-btn">
            <ArrowBack /> Back to Cart
          </button>
          <h1>Checkout</h1>
        </div>
        
        <div className="checkout-content">
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit} className="checkout-form">
              {/* Personal Information */}
              <div className="form-section">
                <h3><Person /> Personal Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? 'error' : ''}
                    />
                    {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? 'error' : ''}
                    />
                    {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>
                </div>
              </div>
              
              {/* Delivery Address */}
              <div className="form-section">
                <h3><LocationOn /> Delivery Address</h3>
                <div className="form-group">
                  <label>Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="error-text">{errors.address}</span>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <span className="error-text">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label>ZIP Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={errors.zipCode ? 'error' : ''}
                    />
                    {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
                  </div>
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="form-section">
                <h3><CreditCard /> Payment Information</h3>
                <div className="form-group">
                  <label>Card Number *</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className={errors.cardNumber ? 'error' : ''}
                  />
                  {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date *</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      className={errors.expiryDate ? 'error' : ''}
                    />
                    {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
                  </div>
                  <div className="form-group">
                    <label>CVV *</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength="4"
                      className={errors.cvv ? 'error' : ''}
                    />
                    {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Cardholder Name *</label>
                  <input
                    type="text"
                    name="cardholderName"
                    value={formData.cardholderName}
                    onChange={handleInputChange}
                    className={errors.cardholderName ? 'error' : ''}
                  />
                  {errors.cardholderName && <span className="error-text">{errors.cardholderName}</span>}
                </div>
              </div>
              
              <button 
                type="submit" 
                className="submit-order-btn"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="processing">
                    <div className="spinner"></div>
                    Processing Payment...
                  </span>
                ) : (
                  <span>
                    <Payment />
                    Complete Order - ${calculateFinalTotal().toFixed(2)}
                  </span>
                )}
              </button>
            </form>
          </div>
          
          <div className="order-summary-section">
            <div className="order-summary-card">
              <h3>Order Summary</h3>
              <div className="delivery-info">
                <Schedule />
                <span>Estimated delivery: {deliveryTime}</span>
              </div>
              
              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item._id} className="order-item">
                    <div className="item-info">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <h4>{item.name}</h4>
                        <p>Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Delivery Fee</span>
                  <span>$5.00</span>
                </div>
                <div className="total-row">
                  <span>Tax (8%)</span>
                  <span>${((totalPrice) * 0.08).toFixed(2)}</span>
                </div>
                <div className="total-row final">
                  <span>Total</span>
                  <span>${calculateFinalTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;