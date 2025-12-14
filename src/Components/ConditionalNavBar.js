import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBarCom from './NavBarCom';

const ConditionalNavBar = ({ islogged }) => {
  const location = useLocation();
  
  // Hide navigation on login and signup pages
  const hideNavRoutes = ['/login', '/signup'];
  const shouldHideNav = hideNavRoutes.includes(location.pathname);
  
  if (shouldHideNav) {
    return null;
  }
  
  return <NavBarCom islogged={islogged} />;
};

export default ConditionalNavBar;