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

const NavBarCom = ({islogged}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Get data from Redux
  const currentUser = useSelector(state => state.user?.currentUser);
  const isAuthenticated = useSelector(state => state.user?.isAuthenticated);
  const cartItems = useSelector(state => state.food?.cartItems || []);
  const favoriteItems = useSelector(state => state.food?.favoriteItems || []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch(setSearchTerm(query));
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
  };

  // Close menu when clicking outside or changing route
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar')) {
        setIsMenuOpen(false);
      }
    };

    const handleRouteChange = () => {
      setIsMenuOpen(false);
      setShowSearch(false);
      clearSearchQuery();
    };

    document.addEventListener('click', handleClickOutside);
    handleRouteChange();

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen, location.pathname]);

  return (
    <>
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" width="49px" />
          <div className="food">Delicious</div>
        </div>

        {/* Search functionality */}
        <div className={`search-container ${showSearch ? 'active' : ''}`}>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search food, category, or ingredients..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
            {searchQuery && (
              <button className="clear-search" onClick={clearSearchQuery}>
                ×
              </button>
            )}
          </div>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>

        {/* Menus */}
        <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className="list">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setIsMenuOpen(false)}>
              <li className={location.pathname === '/' ? 'active' : ''}>Home</li>
            </Link>
            <Link to="/category" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setIsMenuOpen(false)}>
              <li className={location.pathname === '/dishes' ? 'active' : ''}>Dishes</li>
            </Link>
            
            {isAuthenticated && (
              <Link to="/favorites" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setIsMenuOpen(false)}>
                <li className={location.pathname === '/favorites' ? 'active' : ''}>
                  Favorites
                  {favoriteItems.length > 0 && (
                    <span className="badge">{favoriteItems.length}</span>
                  )}
                </li>
              </Link>
            )}
            
            {isAuthenticated && (
              <Link to="/order" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setIsMenuOpen(false)}>
                <li className={location.pathname === '/orders' ? 'active' : ''}>Orders</li>
              </Link>
            )}
            
            <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setIsMenuOpen(false)}>
              <li className={location.pathname === '/contact' ? 'active' : ''}>Contact</li>
            </Link>
          </ul>
          
          <ul className="list">
            {/* Search icon */}
            <li className="search-icon-mobile" onClick={() => setShowSearch(!showSearch)}>
              <SearchIcon />
            </li>
            
            <li>
              <FavoriteBorderIcon />
            </li>
            
            {isAuthenticated && (
              <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setIsMenuOpen(false)}>
                <li className={location.pathname === '/cart' ? 'active' : ''}>
                  <ShoppingCartIcon />
                  {cartItems.length > 0 && (
                    <span className="badge">{cartItems.length}</span>
                  )}
                </li>
              </Link>
            )}
            
            {isAuthenticated && (
              <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setIsMenuOpen(false)}>
                <li className={location.pathname === '/profile' ? 'active' : ''}>
                  <PersonIcon />
                </li>
              </Link>
            )}
            
            {isAuthenticated ? (
              <li onClick={handleLogout} style={{ cursor: 'pointer', color: 'inherit' }}>
                Logout
              </li>
            ) : (
              <Link to='/login' style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setIsMenuOpen(false)}>
                <li>Login</li>
              </Link>
            )}
          </ul>
          
          {/* Display user info if logged in */}
          {isAuthenticated && currentUser && (
            <div className="user-info">
              مرحباً، {currentUser.name}
            </div>
          )}
        </div>
      </nav>
      
      {/* Overlay when menu is open */}
      {isMenuOpen && <div className="menu-overlay active"></div>}
    </>
  );
};

export default NavBarCom;