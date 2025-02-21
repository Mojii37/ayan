import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CircularProgress
} from '@mui/material';
import { articleService } from '@/services/articleService';

export default function ArticlesList() {
  const { data, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: () => articleService.getArticles({ status: 'published' })
  });

  if (isLoading) return <CircularProgress />;

  return (
    <Grid container spacing={3}>
      {data?.articles.map(article => (
        <Grid item xs={12} sm={6} md={4} key={article.id}>
          <Card>
            <CardActionArea component={Link} to={`/articles/${article.id}`}>
              <CardContent>
                <Typography gutterBottom variant="h6" noWrap>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {article.excerpt || article.content.substring(0, 100)}...
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  {new Date(article.createdAt).toLocaleDateString('fa-IR')}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}