import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Paper,
  MenuItem,
  CircularProgress,
  Alert,
  FormHelperText
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store';
import { 
  createArticle, 
  updateArticle, 
  fetchArticle,
  clearArticleState 
} from '@/store/slices/articlesSlice';
import type { ArticleInput } from '@/types/content';

export default function ArticleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, selectedArticle, error } = useAppSelector(state => state.articles);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ArticleInput>({
    defaultValues: {
      title: '',
      content: '',
      categoryId: '',
      status: 'draft',
      excerpt: '',
      tags: []
    }
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchArticle(id));
    }
    return () => {
      dispatch(clearArticleState());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedArticle && id) {
      reset({
        title: selectedArticle.title,
        content: selectedArticle.content,
        categoryId: selectedArticle.categoryId,
        status: selectedArticle.status,
        excerpt: selectedArticle.excerpt,
        tags: selectedArticle.tags || []
      });
    }
  }, [selectedArticle, reset, id]);

  const onSubmit = async (data: ArticleInput) => {
    try {
      if (id) {
        await dispatch(updateArticle({ id, data })).unwrap();
      } else {
        await dispatch(createArticle({
          ...data,
          excerpt: data.excerpt || data.content.substring(0, 150)
        })).unwrap();
      }
      navigate('/admin/articles');
    } catch (err) {
      console.error('Error:', err);
    }
  };

  if (loading && id) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="عنوان"
          margin="normal"
          {...register('title', { required: 'عنوان ضروری است' })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="محتوا"
          margin="normal"
          {...register('content', { required: 'محتوا ضروری است' })}
          error={!!errors.content}
          helperText={errors.content?.message}
        />

        <TextField
          select
          fullWidth
          label="وضعیت"
          margin="normal"
          {...register('status')}
          defaultValue="draft"
        >
          <MenuItem value="draft">پیش‌نویس</MenuItem>
          <MenuItem value="published">منتشر شده</MenuItem>
          <MenuItem value="archived">آرشیو شده</MenuItem>
        </TextField>

        <TextField
          fullWidth
          label="شناسه دسته‌بندی"
          margin="normal"
          {...register('categoryId', { required: 'دسته‌بندی ضروری است' })}
          error={!!errors.categoryId}
          helperText={errors.categoryId?.message}
        />

        <TextField
          fullWidth
          label="خلاصه"
          margin="normal"
          multiline
          rows={2}
          {...register('excerpt')}
        />

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button 
            type="submit" 
            variant="contained"
            disabled={loading}
          >
            {id ? 'به‌روزرسانی' : 'ایجاد'}
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/admin/articles')}
            disabled={loading}
          >
            انصراف
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}