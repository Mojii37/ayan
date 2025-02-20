import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Typography, 
  Container, 
  Grid,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { 
  fetchArticles, 
  deleteArticle,
  selectAllArticles,
  selectArticleStatus,
  selectArticleError
} from '../../store/slices/articlesSlice';
import type { AppDispatch } from '../../store/store';

const Articles: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const articles = useSelector(selectAllArticles);
  const status = useSelector(selectArticleStatus);
  const errorMessage = useSelector(selectArticleError);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchArticles());
    }
  }, [status, dispatch]);

  const handleDelete = async (id: string) => {
    if (window.confirm('آیا از حذف این مقاله اطمینان دارید؟')) {
      try {
        await dispatch(deleteArticle(id)).unwrap();
      } catch (error: unknown) {
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'خطا در حذف مقاله';
        alert(errorMessage);
      }
    }
  };

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed' && errorMessage) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {errorMessage}
      </Alert>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4 
        }}>
          <Typography variant="h5">مدیریت مقالات</Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/admin/articles/new')}
          >
            مقاله جدید
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {articles.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {article.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      mb: 2
                    }}
                  >
                    {article.content}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => navigate(`/admin/articles/${article.id}/edit`)}
                    >
                      ویرایش
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(article.id)}
                    >
                      حذف
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {articles.length === 0 && (
          <Typography textAlign="center" color="text.secondary" mt={4}>
            مقاله‌ای یافت نشد
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Articles;