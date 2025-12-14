import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, clearSearch } from '../Redux/Root';
import { logout } from '../Redux/Food/Security';
import './Nav.css';
import logo from './template-for-design-and-decoration-of-restaurant-menu-catering-or-gastro-service-flat-design-W33RTY-removebg-preview.png';

const NavBarCom = ({ islogged }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();

  // Get data from Redux
  const currentUser = useSelector(state => state.user?.currentUser);
  const isAuthenticated = useSelector(state => state.user?.isAuthenticated);
  const cartItems = useSelector(state => state.food?.cartItems || []);
  const favoriteItems = useSelector(state => state.food?.favoriteItems || []);
  const foodItems = useSelector(state => state.food?.foodItem || []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch(setSearchTerm(query));

    // Show search suggestions if query length > 2
    if (query.length > 2) {
      // Filter food items based on search query
      const filteredSuggestions = foodItems.filter(food =>
        food.name.toLowerCase().includes(query.toLowerCase()) ||
        food.category.toLowerCase().includes(query.toLowerCase()) ||
        food.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(query.toLowerCase())
        )
      ).slice(0, 5); // Limit to 5 suggestions

      setSearchSuggestions(filteredSuggestions);
    } else {
      setSearchSuggestions([]);
    }
  };

  const clearSearchQuery = () => {
    setSearchQuery('');
    dispatch(clearSearch());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    setShowUserDropdown(false);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const handleUserDropdownClick = (action) => {
    setShowUserDropdown(false);
    if (action === 'logout') {
      handleLogout();
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close menu and clear search when changing route
  useEffect(() => {
    setIsMenuOpen(false);
    setShowSearch(false);
    setSearchQuery('');
    dispatch(clearSearch());
  }, [location.pathname, dispatch]);

  return (
    <>
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" width="45px" />
          <div className="food">Delicious</div>
        </div>

        {/* Search functionality */}
        <div className={`search-container ${showSearch ? 'active' : ''}`}>
          <div className="search-box">
            <div className="search-icon-container">
              <SearchIcon className="search-icon" />
            </div>
            <input
              type="text"
              placeholder="Search food ..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
              autoComplete="off"
            />
            {searchQuery && (
              <button className="clear-search" onClick={clearSearchQuery}>
                ×
              </button>
            )}
          </div>
          {searchQuery.length > 0 && (
            <div className="search-suggestions">
              {searchSuggestions.length > 0 ? (
                <>
                  <div className="suggestion-item search-header">
                    <SearchIcon className="suggestion-icon" />
                    <span>Search results for "{searchQuery}"</span>
                  </div>
                  <div className="suggestion-divider"></div>
                  {searchSuggestions.map((food) => (
                    <Link
                      key={food._id}
                      to={`/details/${food._id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      onClick={() => {
                        setShowSearch(false);
                        setIsMenuOpen(false);
                        clearSearchQuery();
                      }}
                    >
                      <div className="suggestion-item food-suggestion">
                        <img src={food.image} alt={food.name} className="suggestion-food-image" />
                        <div className="suggestion-food-info">
                          <div className="suggestion-food-name">{food.name}</div>
                          <div className="suggestion-food-category">{food.category}</div>
                          <div className="suggestion-food-price">${food.price}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </>
              ) : searchQuery.length > 2 ? (
                <div className="suggestion-item no-results">
                  <SearchIcon className="suggestion-icon" />
                  <span>No results found for "{searchQuery}"</span>
                </div>
              ) : (
                <div className="suggestion-item">
                  <SearchIcon className="suggestion-icon" />
                  <span>Continue typing to search...</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Actions (Cart + Hamburger) */}
        <div className="mobile-nav-actions">
          {isAuthenticated && (
            <Link to="/cart" className="mobile-cart-icon" onClick={() => setIsMenuOpen(false)}>
              <ShoppingCartIcon />
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
          )}

         <div 
  className="hamburger" 
  onClick={toggleMenu}
  onTouchStart={(e) => {
    // منع التأخير في الضغط على الموبايل
    e.currentTarget.style.transform = 'scale(0.95)';
  }}
  onTouchEnd={(e) => {
    e.currentTarget.style.transform = 'scale(1)';
  }}
  role="button" 
  aria-label="Toggle menu"
  style={{ 
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'manipulation' // تحسين استجابة اللمس
  }}
>
  {isMenuOpen ? <CloseIcon style={{ pointerEvents: 'none' }} /> : <MenuIcon  style={{ pointerEvents: 'none' }} />}
</div>
        </div>

        {/* Menus */}
        <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className="list">
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li className={location.pathname === '/dishes' ? 'active' : ''}>
              <Link to="/dishes" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Dishes
              </Link>
            </li>


            
            
      
            
            { isAuthenticated && (
                <li className={location.pathname === '/orders' ? 'active' : ''}>
                  <Link to="/order" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                    Orders
                  </Link>
                </li>
              )}

            <li className={location.pathname === '/contact' ? 'active' : ''}>
              <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </li>

            {isAuthenticated && (
              <li className={location.pathname === '/favorites' ? 'active' : ''}>
                <Link to="/favorites" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  <FavoriteBorderIcon />
                  {favoriteItems.length > 0 && (
                    <span className="badge">{favoriteItems.length}</span>
                  )}
                </Link>
              </li>
            )}
          </ul>

          {/* Mobile search input */}
          {showSearch && (
            <div className="mobile-search-container">
              <div className="mobile-search-box">
                <div className="search-icon-container">
                  <SearchIcon className="search-icon" />
                </div>
                <input
                  type="text"
                  placeholder="Search food"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="mobile-search-input"
                  autoComplete="off"
                />
                {searchQuery && (
                  <button className="clear-search" onClick={clearSearchQuery}>
                    ×
                  </button>
                )}
              </div>
              {searchQuery.length > 0 && (
                <div className="mobile-search-suggestions">
                  {searchSuggestions.length > 0 ? (
                    <>
                      <div className="suggestion-item search-header">
                        <SearchIcon className="suggestion-icon" />
                        <span>Results for "{searchQuery}"</span>
                      </div>
                      <div className="suggestion-divider"></div>
                      {searchSuggestions.map((food) => (
                        <Link
                          key={food._id}
                          to={`/details/${food._id}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                          onClick={() => {
                            setShowSearch(false);
                            setIsMenuOpen(false);
                            clearSearchQuery();
                          }}
                        >
                          <div className="suggestion-item food-suggestion">
                            <img src={food.image} alt={food.name} className="suggestion-food-image" />
                            <div className="suggestion-food-info">
                              <div className="suggestion-food-name">{food.name}</div>
                              <div className="suggestion-food-category">{food.category}</div>
                              <div className="suggestion-food-price">${food.price}</div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </>
                  ) : searchQuery.length > 2 ? (
                    <div className="suggestion-item no-results">
                      <SearchIcon className="suggestion-icon" />
                      <span>No results for "{searchQuery}"</span>
                    </div>
                  ) : (
                    <div className="suggestion-item">
                      <SearchIcon className="suggestion-icon" />
                      <span>Keep typing...</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <ul className="list">
            {/* Search icon */}
            <li className="search-icon-mobile" onClick={() => setShowSearch(!showSearch)}>
              <SearchIcon />
            </li>


            {isAuthenticated && (
              <li className={location.pathname === '/cart' ? 'active' : ''}>
                <Link to="/cart" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  <ShoppingCartIcon />
                  {cartItems.length > 0 && (
                    <span className="badge">{cartItems.length}</span>
                  )}
                </Link>
              </li>
            )}

            {isAuthenticated && (
              <li className={location.pathname === '/profile' ? 'active' : ''}>
                <Link to="/profile" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  <PersonIcon />
                </Link>
              </li>
            )}

            {isAuthenticated ? (
              <li className="user-dropdown">
                <button className="user-dropdown-toggle" onClick={toggleUserDropdown}>
                  <PersonIcon />
                  <span className="user-name">{currentUser.name}</span>
                  <span className={`dropdown-arrow ${showUserDropdown ? 'open' : ''}`}>▼</span>
                </button>
                {showUserDropdown && (
                  <div className="user-dropdown-menu">
                    <Link to="/profile" className="dropdown-item" onClick={() => handleUserDropdownClick('profile')}>
                      <PersonIcon className="dropdown-icon" />
                      Profile
                    </Link>
                    <Link to="/order" className="dropdown-item"  >
                      <ShoppingCartIcon className="dropdown-icon" />
                      My Orders
                    </Link>
                    <Link to="/favorites" className="dropdown-item" onClick={() => handleUserDropdownClick('favorites')}>
                      <FavoriteBorderIcon className="dropdown-icon" />
                      Favorites
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout-btn" onClick={() => handleUserDropdownClick('logout')}>
                      Logout
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <li>
                <Link to='/login' className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </li>
            )}

            
            
       
          </ul>


        </div>
      </nav>

      {/* Overlay when menu is open */}
      {isMenuOpen && <div className="menu-overlay active"></div>}
    </>
  );
};

export default NavBarCom;