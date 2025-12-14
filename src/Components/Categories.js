import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Favorite, FavoriteBorder, ShoppingCart } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites, addToCart } from '../Redux/Root';
import './Categories.css';

const Categories = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const foodItems = useSelector(state => state.food?.foodItem || []);
  const favoriteItems = useSelector(state => state.food?.favoriteItems || []);
  const cartItems = useSelector(state => state.food?.cartItems || []);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);

  // Get unique categories from food items
  useEffect(() => {
    if (foodItems.length > 0) {
      const uniqueCategories = ['All', ...new Set(foodItems.map(food => food.category))];
      setCategories(uniqueCategories);
      setFilteredFoods(foodItems);
    }
  }, [foodItems]);

  // Read category from URL query parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search, categories]);

  // Filter foods by selected category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredFoods(foodItems);
    } else {
      setFilteredFoods(foodItems.filter(food => food.category === selectedCategory));
    }
  }, [selectedCategory, foodItems]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const isFavorite = (foodId) => {
    return favoriteItems.some(item => item._id === foodId);
  };

  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.user?.isAuthenticated);

  // ... existing logic ...

  const toggleFavorite = (food) => {
    if (!isAuthenticated) {
      toast.info('Please login to manage favorites');
      navigate('/login');
      return;
    }
    if (isFavorite(food._id)) {
      dispatch(removeFromFavorites(food._id));
    } else {
      dispatch(addToFavorites(food));
    }
  };

  const handleAddToCart = (food) => {
    if (!isAuthenticated) {
      toast.info('Please login to add items to cart');
      navigate('/login');
      return;
    }
    dispatch(addToCart(food));
  };

  return (
    <div className="categories-container">
      <div className="categories-header">
        <h1>Food Categories</h1>
        <p>Discover delicious dishes from different cuisines</p>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="results-count">
        Showing {filteredFoods.length} {selectedCategory === 'All' ? 'dishes' : `${selectedCategory} dishes`}
      </div>

      {/* Food Grid */}
      <div className="food-grid">
        {filteredFoods.map((food) => (
          <div key={food._id} className="food-card">
            <div className="food-image-container">
              <img
                src={food.image}
                alt={food.name}
                className="food-image"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';
                }}
              />
              <button
                className={`favorite-btn ${isFavorite(food._id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(food)}
              >
                {isFavorite(food._id) ? <Favorite /> : <FavoriteBorder />}
              </button>
            </div>

            <div className="food-content">
              <div className="food-header">
                <h3 className="food-name">{food.name}</h3>
                <span className="food-category">{food.category}</span>
              </div>

              <p className="food-description">{food.description}</p>

              <div className="food-meta">
                <div className="food-rating">
                  <span className="rating-stars">{'★'.repeat(Math.floor(food.rating))}</span>
                  <span className="rating-text">{food.rating} ({food.reviews} reviews)</span>
                </div>
                <div className="food-time">{food.preparationTime}</div>
              </div>

              <div className="food-footer">
                <div className="food-price">
                  {food.price} SAR
                  {food.discount > 0 && (
                    <span className="discount-badge">-{food.discount}%</span>
                  )}
                </div>
                <div className="food-actions">
                  <Link to={`/details/${food._id}`} className="view-details-btn">
                    View Details
                  </Link>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(food)}
                  >
                    <ShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <div className="no-results">
          <h3>No dishes found</h3>
          <p>Try selecting a different category or search term</p>
        </div>
      )}
    </div>
  );
};

export default Categories;