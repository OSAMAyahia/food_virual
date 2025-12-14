import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  addToFavorites 
} from '../Redux/Root';
import { 
  ShoppingCart, 
  Delete, 
  Add, 
  Remove, 
  Favorite, 
  Clear,
  LocalOffer,
  Payment,
  Schedule
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.food?.cartItems || []);
  const totalPrice = useSelector(state => state.food?.totalPrice || 0);
  const totalQuantities = useSelector(state => state.food?.totalQuantities || 0);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState('30-45 min');

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(itemId));
    } else {
      dispatch(updateQuantity({ _id: itemId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleAddToFavorites = (item) => {
    dispatch(addToFavorites(item));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warning('Your cart is empty!');
      return;
    }
    toast.success('Proceeding to checkout...');
    // Here you would typically redirect to checkout page
  };

  const handlePromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setDiscount(0.1); // 10% discount
      toast.success('Promo code applied! 10% discount added.');
    } else if (promoCode.toUpperCase() === 'WELCOME20') {
      setDiscount(0.2); // 20% discount
      toast.success('Promo code applied! 20% discount added.');
    } else if (promoCode.trim() !== '') {
      toast.error('Invalid promo code. Try SAVE10 or WELCOME20.');
      setDiscount(0);
    }
  };

  const calculateDiscount = () => {
    return totalPrice * discount;
  };

  const calculateFinalTotal = () => {
    const subtotal = totalPrice;
    const discountAmount = calculateDiscount();
    const deliveryFee = 5;
    const tax = (subtotal - discountAmount) * 0.08;
    return subtotal - discountAmount + deliveryFee + tax;
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <ShoppingCart className="empty-icon" />
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to="/category" className="browse-link">
            Browse Dishes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <div className="cart-summary">
          <div className="summary-item">
            <span>Items:</span>
            <span>{totalQuantities}</span>
          </div>
          <div className="summary-item">
            <span>Total:</span>
            <span className="total-price">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="item-image">
                <img 
                  src={item.image} 
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop';
                  }}
                />
              </div>
              
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">${item.price.toFixed(2)} each</p>
                
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  >
                    <Remove />
                  </button>
                  
                  <span className="quantity">{item.quantity}</span>
                  
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  >
                    <Add />
                  </button>
                </div>
                
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
              
              <div className="item-actions">
                <button 
                  className="action-btn favorite-btn"
                  onClick={() => handleAddToFavorites(item)}
                  title="Add to Favorites"
                >
                  <Favorite />
                </button>
                
                <button 
                  className="action-btn remove-btn"
                  onClick={() => handleRemoveItem(item._id)}
                  title="Remove from Cart"
                >
                  <Delete />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-sidebar">
          <div className="order-summary">
            <h3>Order Summary</h3>
            
            {/* Promo Code Section */}
            <div className="promo-section">
              <div className="promo-input-group">
                <LocalOffer className="promo-icon" />
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-input"
                />
                <button onClick={handlePromoCode} className="promo-btn">
                  Apply
                </button>
              </div>
              <small className="promo-hint">Try: SAVE10 or WELCOME20</small>
            </div>

            {/* Delivery Time */}
            <div className="delivery-info">
              <Schedule className="delivery-icon" />
              <span>Estimated delivery: {deliveryTime}</span>
            </div>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal ({totalQuantities} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="summary-row discount">
                  <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                  <span>-${calculateDiscount().toFixed(2)}</span>
                </div>
              )}
              
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>$5.00</span>
              </div>
              
              <div className="summary-row">
                <span>Tax (8%)</span>
                <span>${((totalPrice - calculateDiscount()) * 0.08).toFixed(2)}</span>
              </div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${calculateFinalTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <button className="checkout-btn" onClick={handleCheckout}>
              <Payment />
              Proceed to Checkout
            </button>
            
            <button className="clear-cart-btn" onClick={handleClearCart}>
              <Clear />
              Clear Cart
            </button>
          </div>
          
          <div className="cart-actions">
            <Link to="/category" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;