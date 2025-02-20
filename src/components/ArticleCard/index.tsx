import { FC } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import ArticleCard from '../../components/ArticleCard';
import { useArticles } from '../../hooks/useArticles';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorAlert from '../../components/common/ErrorAlert';
import type { Article } from '../../types/content';

const Articles: FC = () => {
  const { articles, loading, error } = useArticles();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          مقالات
        </Typography>
        
        <Grid container spacing={3}>
          {articles.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Articles;