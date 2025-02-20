import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import AdminLayout from '../layouts/AdminLayout';

// Lazy load components
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const Articles = lazy(() => import('../pages/admin/Articles'));
const ArticleForm = lazy(() => import('../pages/admin/ArticleForm'));
const Users = lazy(() => import('../pages/admin/Users'));
const Settings = lazy(() => import('../pages/admin/Settings'));

const LoadingFallback = () => (
  <Box display="flex" justifyContent="center" p={4}>
    <CircularProgress />
  </Box>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<div>صفحه اصلی</div>} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="articles" element={<Articles />} />
          <Route path="articles/new" element={<ArticleForm />} />
          <Route path="articles/:id/edit" element={<ArticleForm />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;