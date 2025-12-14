import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Search, Close, ShoppingCart, Favorite } from '@mui/icons-material';
import './SearchResults.css';

const SearchResults = () => {
  const searchTerm = useSelector(state => state.food?.searchTerm || '');
  const allFoods = useSelector(state => state.food?.foodArray || []);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (searchTerm.trim().length > 2) {
      setIsLoading(true);
      setShowResults(true);
      
      // Simulate search delay for better UX
      const timer = setTimeout(() => {
        const results = allFoods.filter(food => 
          food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          food.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          food.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          food.ingredients.some(ingredient => 
            ingredient.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
        
        setSearchResults(results);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchTerm, allFoods]);

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="highlighted-text">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (!showResults || searchTerm.length <= 2) {
    return null;
  }

  return (
    <div className="search-results-overlay">
      <div className="search-results-container">
        <div className="search-results-header">
          <h3>Search Results for "{searchTerm}"</h3>
          <button 
            className="close-results"
            onClick={() => setShowResults(false)}
          >
            <Close />
          </button>
        </div>

        {isLoading ? (
          <div className="search-loading">
            <div className="search-spinner"></div>
            <p>Searching...</p>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="no-results">
            <Search className="no-results-icon" />
            <h4>No results found</h4>
            <p>Try searching with different keywords</p>
            <div className="search-suggestions">
              <p>Popular searches:</p>
              <div className="suggestion-tags">
                <span className="suggestion-tag">Pizza</span>
                <span className="suggestion-tag">Burger</span>
                <span className="suggestion-tag">Pasta</span>
                <span className="suggestion-tag">Salad</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="search-results-grid">
            {searchResults.map((food) => (
              <div key={food._id} className="search-result-item">
                <div className="result-image">
                  <img 
                    src={food.image} 
                    alt={food.name}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop';
                    }}
                  />
                </div>
                
                <div className="result-content">
                  <h4 className="result-name">
                    {highlightText(food.name, searchTerm)}
                  </h4>
                  <p className="result-description">
                    {highlightText(food.description.substring(0, 80) + '...', searchTerm)}
                  </p>
                  <div className="result-meta">
                    <span className="result-category">{food.category}</span>
                    <span className="result-price">${food.price}</span>
                  </div>
                </div>
                
                <div className="result-actions">
                  <Link 
                    to={`/fooddetails/${food._id}`}
                    className="view-details-btn"
                  >
                    View Details
                  </Link>
                  <div className="result-action-icons">
                    <button className="action-icon" title="Add to Cart">
                      <ShoppingCart />
                    </button>
                    <button className="action-icon" title="Add to Favorites">
                      <Favorite />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {searchResults.length > 0 && (
          <div className="search-results-footer">
            <Link to="/category" className="view-all-results">
              View All Results ({searchResults.length} items)
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;