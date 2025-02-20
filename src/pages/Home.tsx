import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Button, 
  ThemeProvider, 
  createTheme 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

// تنظیمات کش برای پشتیبانی از RTL
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// تعریف تم سفارشی برای رنگ‌های فارسی
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'IranSans, Roboto, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

// کامپوننت اسلایدر تصاویر
const ImageSlider = ({ images }: { images: Array<{ title: string; description: string; backgroundColor: string }> }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % images.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden' }}>
      {images.map((image, index) => (
        <Box 
          key={index} 
          sx={{ 
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            opacity: index === currentImageIndex ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            backgroundColor: image.backgroundColor,
          }}
        >
          <Box 
            sx={{ 
              position: 'absolute', 
              bottom: 20, 
              left: '50%', 
              transform: 'translateX(-50%)',
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: 2,
              borderRadius: 2,
              textAlign: 'center',
              width: '90%',
              maxWidth: 600,
            }}
          >
            <Typography variant="h5">{image.title}</Typography>
            <Typography variant="body2">{image.description}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

// استایل دکمه با استفاده از تم MUI
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

// لیست تصاویر اسلایدر با پلیس‌هولدر
const sliderImages = [
  {
    backgroundColor: '#3f51b5',
    title: 'خدمات حسابداری حرفه‌ای',
    description: 'ارائه خدمات حسابداری و مشاوره مالی با بالاترین استانداردها',
  },
  {
    backgroundColor: '#2196f3',
    title: 'مشاوره مالیاتی',
    description: 'مشاوره تخصصی در زمینه مالیات و بهینه‌سازی مالیاتی',
  },
  {
    backgroundColor: '#00bcd4',
    title: 'برنامه‌ریزی مالی',
    description: 'کمک به برنامه‌ریزی مالی و مدیریت سرمایه شما',
  },
];

// کامپوننت صفحه اصلی
const Home: React.FC = () => {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Box sx={{ direction: 'rtl' }}>
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
                <Grid 
                  container 
                  spacing={2} 
                  justifyContent="center"
                  sx={{ 
                    flexDirection: { 
                      xs: 'column', 
                      sm: 'row' 
                    }, 
                    alignItems: 'center' 
                  }}
                >
                  {[
                    { href: "/articles", title: "مقالات" },
                    { href: "/tutorials", title: "آموزش‌ها" },
                    { href: "/register", title: "ثبت‌نام" },
                    { href: "/cooperation", title: "نحوه همکاری با ما" },
                    { href: "/tax-calculator", title: "محاسبه مالیات" },
                    { href: "/consultation", title: "نوبت مشاوره" },
                    { href: "/feedback", title: "نظرات و پیشنهادات" },
                    { href: "/mini-book", title: "مینی بوک" }
                  ].map((item, index) => (
                    <Grid item key={index} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                      <StyledButton 
                        href={item.href} 
                        fullWidth 
                        variant="outlined"
                      >
                        {item.title}
                      </StyledButton>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Home;