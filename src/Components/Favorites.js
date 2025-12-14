import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromFavorites, addToCart } from '../Redux/Root';
import { Favorite, ShoppingCart, Star, Delete } from '@mui/icons-material';
import NavBarCom from './NavBarCom';
import './Favorites.css';

const Favorites = () => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector(state => state.food?.favoriteItems || []);
  const cartItems = useSelector(state => state.food?.cartItems || []);

  const handleRemoveFromFavorites = (itemId) => {
    dispatch(removeFromFavorites(itemId));
  };

  const handleAddToCart = (item) => {
    const isAlreadyInCart = cartItems.some(cartItem => cartItem._id === item._id);
    if (!isAlreadyInCart) {
      dispatch(addToCart(item));
    }
  };

  const isItemInCart = (itemId) => {
    return cartItems.some(cartItem => cartItem._id === itemId);
  };

  if (!favoriteItems || favoriteItems.length === 0) {
    return (
      <div>
        <NavBarCom />
        <div className="favorites-container">
          <div className="empty-favorites">
            <Favorite className="empty-icon" />
            <h2>No Favorites Yet</h2>
            <p>You haven't added any items to your favorites.</p>
            <Link to="/category" className="browse-link">
              Browse Dishes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBarCom />
      <div className="favorites-container">
      <div className="favorites-header">
        <h1>My Favorites</h1>
        <div className="favorites-count">
          <Favorite className="count-icon" />
          <span>{favoriteItems.length} items</span>
        </div>
      </div>

      <div className="favorites-grid">
        {favoriteItems.map((item) => (
          <div key={item._id} className="favorite-item">
            <div className="item-image">
              <img 
                src={item.image} 
                alt={item.name}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop';
                }}
              />
              <button 
                className="remove-btn"
                onClick={() => handleRemoveFromFavorites(item._id)}
              >
                <Delete />
              </button>
            </div>
            
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-description">{item.description}</p>
              
              <div className="item-rating">
                <Star className="star-icon" />
                <span>{item.rating}</span>
                <span className="reviews">({item.reviews} reviews)</span>
              </div>
              
              <div className="item-category">
                <span>{item.category}</span>
              </div>
              
              <div className="item-price">
                <span className="price">${item.price}</span>
                {item.discount > 0 && (
                  <span className="discount">{item.discount}% OFF</span>
                )}
              </div>
              
              <div className="item-actions">
                <button 
                  className={`add-to-cart-btn ${isItemInCart(item._id) ? 'in-cart' : ''}`}
                  onClick={() => handleAddToCart(item)}
                  disabled={isItemInCart(item._id)}
                >
                  <ShoppingCart />
                  {isItemInCart(item._id) ? 'In Cart' : 'Add to Cart'}
                </button>
                
                <Link 
                  to={`/details/${item._id}`}
                  className="view-details-btn"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Favorites;