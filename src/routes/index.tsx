import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';

const Routes: React.FC = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<div>Home Page</div>} />
      {/* Add more routes as needed */}
    </RouterRoutes>
  );
};

export default Routes;
