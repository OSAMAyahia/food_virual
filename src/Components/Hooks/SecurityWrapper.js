import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const SecurityWrapper = ({ islogged, children, route }) => {
  if (islogged === false) {
    return <Navigate to={route} />;
  }

  return children ? children : <Outlet />;
};

export default SecurityWrapper;
