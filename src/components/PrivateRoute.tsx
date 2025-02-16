import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/types';

const PrivateRoute: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
