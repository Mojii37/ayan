import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Chip
} from '@mui/material';
import { articleService } from '@/services/articleService';

export default function ArticleDetail() {
  const { id } = useParams();

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: () => articleService.getArticle(id!)
  });

  if (isLoading) return <CircularProgress />;
  if (!article) return <Typography>مقاله یافت نشد</Typography>;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {article.title}
      </Typography>

      <Box sx={{ my: 2 }}>
        <Chip label={article.categoryId} sx={{ mr: 1 }} />
        <Typography variant="caption" color="text.secondary">
          {new Date(article.createdAt).toLocaleDateString('fa-IR')}
        </Typography>
      </Box>

      <Typography variant="body1" sx={{ mt: 3 }}>
        {article.content}
      </Typography>

      {article.author && (
        <Typography variant="subtitle2" sx={{ mt: 4 }}>
          نویسنده: {article.author.name}
        </Typography>
      )}
    </Paper>
  );
}