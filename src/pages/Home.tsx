// src/pages/Home.tsx
import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { ImageSlider } from '../components/common/ImageSlider';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.shape.borderRadius,
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 8px ${theme.palette.primary.main}40`,
  },
}));

const sliderImages = [
  {
    url: '/images/accounting-1.jpg',
    title: 'خدمات حسابداری حرفه‌ای',
    description: 'ارائه خدمات حسابداری و مشاوره مالی با بالاترین استانداردها',
  },
  {
    url: '/images/tax-consultation.jpg',
    title: 'مشاوره مالیاتی',
    description: 'مشاوره تخصصی در زمینه مالیات و بهینه‌سازی مالیاتی',
  },
  {
    url: '/images/financial-planning.jpg',
    title: 'برنامه‌ریزی مالی',
    description: 'کمک به برنامه‌ریزی مالی و مدیریت سرمایه شما',
  },
];

const Home = () => {
  return (
    <Box>
      <ImageSlider images={sliderImages} />

      <Container maxWidth="xl" sx={{ mt: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography
              variant="h3"
              textAlign="center"
              color="primary"
              sx={{ mb: 4 }}
            >
              خدمات موسسه حسابداری آیان تراز
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <StyledButton href="/articles">مقالات</StyledButton>
              </Grid>
              <Grid item>
                <StyledButton href="/tutorials">آموزش‌ها</StyledButton>
              </Grid>
              <Grid item>
                <StyledButton href="/register">ثبت‌نام</StyledButton>
              </Grid>
              <Grid item>
                <StyledButton href="/cooperation">
                  نحوه همکاری با ما
                </StyledButton>
              </Grid>
              <Grid item>
                <StyledButton href="/tax-calculator">
                  محاسبه مالیات
                </StyledButton>
              </Grid>
              <Grid item>
                <StyledButton href="/consultation">نوبت مشاوره</StyledButton>
              </Grid>
              <Grid item>
                <StyledButton href="/feedback">نظرات و پیشنهادات</StyledButton>
              </Grid>
              <Grid item>
                <StyledButton href="/mini-book">مینی بوک</StyledButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
