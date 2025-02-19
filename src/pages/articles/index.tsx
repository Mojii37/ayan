import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  MenuItem,
  Pagination,
  CircularProgress,
  Alert,
} from '@mui/material';
import { ContentCard } from '../../components/content/ContentCard';
import { articleService } from '../../services/articleService';
import { Article } from '../../types/content';

const ITEMS_PER_PAGE = 9;

const categories = [
  { id: 'all', title: 'همه' },
  { id: 'tax', title: 'مالیات' },
  { id: 'accounting', title: 'حسابداری' },
  { id: 'business', title: 'کسب و کار' },
];

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);

  const { data: articles = [], isLoading, error } = useQuery<Article[]>(
    ['articles'],
    () => articleService.getArticles(),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || article.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const pageCount = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const displayedArticles = filteredArticles.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        خطا در دریافت مقالات
      </Alert>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          مقالات
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="جستجو در مقالات"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="دسته‌بندی"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {displayedArticles.map(article => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <ContentCard content={article} type="article" />
            </Grid>
          ))}
        </Grid>

        {pageCount > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Articles;