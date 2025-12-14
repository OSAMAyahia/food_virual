import React from 'react';
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
  Clear 
} from '@mui/icons-material';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.food?.cartItems || []);
  const totalPrice = useSelector(state => state.food?.totalPrice || 0);
  const totalQuantities = useSelector(state => state.food?.totalQuantities || 0);

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
    alert('Checkout functionality would be implemented here!');
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
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal ({totalQuantities} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>$5.00</span>
              </div>
              
              <div className="summary-row">
                <span>Tax</span>
                <span>${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${(totalPrice + 5 + (totalPrice * 0.08)).toFixed(2)}</span>
              </div>
            </div>
            
            <button className="checkout-btn" onClick={handleCheckout}>
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