import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './Nav.css';
import logo from './template-for-design-and-decoration-of-restaurant-menu-catering-or-gastro-service-flat-design-W33RTY-removebg-preview.png';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/Food/Security';

const NavBarCom = ({islogged}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  
  // الحصول على بيانات المستخدم من Redux
  const currentUser = useSelector(state => state.user?.currentUser);
  const isAuthenticated = useSelector(state => state.user?.isAuthenticated);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar container">
      <div className="logo-container">
        <img src={logo} alt="Logo" width="49px" />
        <div className="food">food</div>
      </div>

      {/* زر الهامبرغر يظهر فقط في الشاشات الصغيرة */}
      <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>

      {/* القوائم */}
      <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <ul className="list">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <li className={location.pathname === '/' ? 'active' : ''}>Home</li>
          </Link>

          <Link to="/category" style={{ textDecoration: 'none', color: 'inherit' }}>
            <li className={location.pathname === '/dishes' ? 'active' : ''}>Dishes</li>
          </Link>
          
          {isAuthenticated && (
            <Link to="/order" style={{ textDecoration: 'none', color: 'inherit' }}>
              <li className={location.pathname === '/orders' ? 'active' : ''}>Orders</li>
            </Link>
          )}
          
          <li className={location.pathname === '/contact' ? 'active' : ''}>Contact</li>
        </ul>
        
        <ul className="list">
          <li>
            <SearchIcon />
          </li>
          <li>
            <FavoriteBorderIcon />
          </li>
          
          {isAuthenticated && (
            <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
              <li className={location.pathname === '/cart' ? 'active' : ''}>
                <ShoppingCartIcon />
              </li>
            </Link>
          )}
          
          {isAuthenticated && (
            <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
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
            <Link to='/login' style={{ textDecoration: 'none', color: 'inherit' }}>
              <li>Login</li>
            </Link>
          )}
        </ul>
      </div>
      
      {/* عرض اسم المستخدم إذا كان مسجل الدخول */}
      {isAuthenticated && currentUser && (
        <div className="user-info" style={{ marginLeft: '20px' }}>
          <span style={{ color: '#fff', fontSize: '14px' }}>
            مرحباً، {currentUser.name}
          </span>
        </div>
      )}
    </nav>
  );
};

export default NavBarCom;