import React, { useEffect } from 'react'
import NavBarCom from './NavBarCom';
import '../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { getfoodDetails, addToCart, addToFavorites } from '../Redux/Root';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { showToast } from '../showToast';
import './FoodDetails.css';
import { ShoppingCart, Favorite } from '@mui/icons-material';

const FoodDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getfoodDetails(id));
  }, [id, dispatch]);

  const { currentFood, loading, error } = useSelector((state) => state?.food || {});
  const cartItems = useSelector(state => state.food?.cartItems || []);
  const favoriteItems = useSelector(state => state.food?.favoriteItems || []);

  if (loading) return (
    <div className="loading-container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <div className="alert alert-danger">
        <strong>Error:</strong> {error}
      </div>
    </div>
  );

  if (!currentFood) return (
    <div className="no-data-container">
      <div className="alert alert-info">
        No details available for this dish.
      </div>
    </div>
  );

  const handleAddToCart = () => {
    dispatch(addToCart(currentFood));
    toast.success('Added to cart successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(currentFood));
    toast.success('Added to favorites!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const isInCart = cartItems.some(item => item._id === currentFood._id);
  const isInFavorites = favoriteItems.some(item => item._id === currentFood._id);

  return (
    <div className="food-details-page">
      <ToastContainer />
      <NavBarCom />
      
      <div className="container">
        <div className="food-details-container">
          {/* Image Section */}
          <div className="food-image-section">
            <div className="image-wrapper">
              <img
                src={currentFood.image}
                onError={(e) => { 
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop'; 
                }}
                className="food-main-image"
                alt={currentFood.name}
              />
              <div className="price-badge">
                <span className="price-text">${currentFood.price}</span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="food-details-section">
            <div className="details-header">
              <h1 className="food-title">{currentFood.name}</h1>
              <span className="category-badge">{currentFood.category}</span>
            </div>

            <div className="rating-section">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`star ${i < Math.floor(currentFood.rating) ? 'filled' : ''}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-text">({currentFood.reviews} reviews)</span>
            </div>

            <div className="description-section">
              <h3 className="section-title">Description</h3>
              <p className="description-text">{currentFood.description}</p>
            </div>

            <div className="ingredients-section">
              <h3 className="section-title">Ingredients</h3>
              <div className="ingredients-grid">
                {Array.isArray(currentFood?.ingredients) && currentFood.ingredients.length > 0
                  ? currentFood.ingredients.map((item, index) => (
                      <span key={index} className="ingredient-tag">{item}</span>
                    ))
                  : <p className="no-ingredients">No ingredients available.</p>
                }
              </div>
            </div>

            <div className="nutrition-section">
              <h3 className="section-title">Nutritional Information (per serving)</h3>
              <div className="nutrition-grid">
                <div className="nutrition-item">
                  <span className="nutrition-value">{Math.floor(Math.random() * 200 + 300)}</span>
                  <span className="nutrition-label">Calories</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-value">{Math.floor(Math.random() * 20 + 15)}g</span>
                  <span className="nutrition-label">Protein</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-value">{Math.floor(Math.random() * 30 + 20)}g</span>
                  <span className="nutrition-label">Carbs</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-value">{Math.floor(Math.random() * 15 + 5)}g</span>
                  <span className="nutrition-label">Fat</span>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className={`btn-add-cart ${isInCart ? 'in-cart' : ''}`}
                onClick={handleAddToCart}
                disabled={isInCart}
              >
                <ShoppingCart />
                <span className="btn-text">
                  {isInCart ? 'Already in Cart' : 'Add to Cart'}
                </span>
              </button>
              
              <button 
                className={`btn-favorite ${isInFavorites ? 'in-favorites' : ''}`}
                onClick={handleAddToFavorites}
                disabled={isInFavorites}
              >
                <Favorite />
                <span className="btn-text">
                  {isInFavorites ? 'In Favorites' : 'Add to Favorites'}
                </span>
              </button>
            </div>

            <div className="delivery-info">
              <div className="delivery-item">
                <span className="delivery-icon">🚚</span>
                <span className="delivery-text">Free delivery on orders over $50</span>
              </div>
              <div className="delivery-item">
                <span className="delivery-icon">⏰</span>
                <span className="delivery-text">Delivery time: 30-45 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodDetails