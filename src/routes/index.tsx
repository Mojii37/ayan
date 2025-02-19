import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

const AdminArticles = lazy(() => import('../pages/admin/articles'));
const ArticleForm = lazy(() => import('../pages/admin/articles/form'));

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      }
    >
      <Routes>
        <Route path="/" element={<div>صفحه اصلی</div>} />
        <Route path="/admin/articles" element={<AdminArticles />} />
        <Route path="/admin/articles/new" element={<ArticleForm />} />
        <Route path="/admin/articles/:id/edit" element={<ArticleForm />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;