import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { 
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, IconButton, Button, Box, Typography, CircularProgress,
  Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchArticles, deleteArticle } from '@/store/slices/articlesSlice';

export default function ArticlesList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items: articles, loading, error } = useAppSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (window.confirm('آیا از حذف این مقاله مطمئن هستید؟')) {
      await dispatch(deleteArticle(id));
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">مدیریت مقالات</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/admin/articles/new')}
        >
          مقاله جدید
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>عنوان</TableCell>
              <TableCell>دسته‌بندی</TableCell>
              <TableCell>وضعیت</TableCell>
              <TableCell>تاریخ</TableCell>
              <TableCell>عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>{article.title}</TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell>{article.status}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat('fa-IR').format(new Date(article.createdAt))}
                </TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => navigate(`/admin/articles/${article.id}/edit`)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDelete(article.id)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}