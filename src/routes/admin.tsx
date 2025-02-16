import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import Articles from '../pages/admin/Articles';
import ArticleForm from '../pages/admin/ArticleForm';
import Users from '../pages/admin/Users';
import Settings from '../pages/admin/Settings';

export const adminRoutes = {
  path: '/admin',
  element: <AdminLayout />,
  children: [
    {
      path: '',
      element: <Dashboard />,
    },
    {
      path: 'articles',
      element: <Articles />,
    },
    {
      path: 'articles/new',
      element: <ArticleForm />,
    },
    {
      path: 'articles/:id/edit',
      element: <ArticleForm />,
    },
    {
      path: 'users',
      element: <Users />,
    },
    {
      path: 'settings',
      element: <Settings />,
    },
    {
      path: '*',
      element: <Navigate to="/admin" replace />,
    },
  ],
};
