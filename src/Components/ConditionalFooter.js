import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';

const ConditionalFooter = () => {
  const location = useLocation();
  
  // Hide footer on login and signup pages
  const hideFooterPaths = ['/login', '/signup'];
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);
  
  return shouldHideFooter ? null : <Footer />;
};

export default ConditionalFooter;