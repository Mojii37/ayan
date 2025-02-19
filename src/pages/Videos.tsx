import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActionArea,
  LinearProgress,
  TextField
} from '@mui/material';

// تعریف نوع برای ویدیو
interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  category: string;
}

const Videos: React.FC = () => {
  // استیت‌های مدیریت ویدیوها
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('همه');

  // دریافت ویدیوها از API یا منبع داده
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // شبیه‌سازی درخواست API
        const mockVideos: Video[] = [
          {
            id: '1',
            title: 'مقدمات React',
            description: 'آموزش مقدماتی React برای مبتدیان',
            thumbnailUrl: '/path/to/react-thumbnail.jpg',
            videoUrl: '/path/to/react-video.mp4',
            duration: '12:34',
            category: 'برنامه‌نویسی'
          },
          {
            id: '2',
            title: 'طراحی UI با Figma',
            description: 'آموزش حرفه‌ای طراحی رابط کاربری',
            thumbnailUrl: '/path/to/figma-thumbnail.jpg',
            videoUrl: '/path/to/figma-video.mp4',
            duration: '18:45',
            category: 'طراحی'
          }
          // می‌توانید ویدیوهای بیشتری اضافه کنید
        ];

        setVideos(mockVideos);
        setLoading(false);
      } catch (error) {
        console.error('خطا در بارگذاری ویدیوها:', error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // فیلتر ویدیوها بر اساس جستجو و دسته‌بندی
  const filteredVideos = videos.filter(video => 
    video.title.includes(searchTerm) && 
    (selectedCategory === 'همه' || video.category === selectedCategory)
  );

  // هندل پخش ویدیو
  const handleVideoPlay = (videoUrl: string) => {
    // می‌توانید منطق پخش ویدیو را اینجا اضافه کنید
    window.open(videoUrl, '_blank');
  };

  // دسته‌بندی‌های موجود
  const categories = ['همه', 'برنامه‌نویسی', 'طراحی', 'بازاریابی'];

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        ویدیوهای آموزشی
      </Typography>

      {/* جستجو و فیلتر */}
      <Box sx={{ display: 'flex', mb: 3, gap: 2 }}>
        <TextField
          label="جستجوی ویدیو"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <TextField
          select
          label="دسته‌بندی"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          variant="outlined"
          SelectProps={{ native: true }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </TextField>
      </Box>

      {/* گرید ویدیوها */}
      <Grid container spacing={3}>
        {filteredVideos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <Card>
              <CardActionArea onClick={() => handleVideoPlay(video.videoUrl)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={video.thumbnailUrl}
                  alt={video.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {video.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {video.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    مدت: {video.duration} | دسته: {video.category}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* نمایش پیام در صورت نبود ویدیو */}
      {filteredVideos.length === 0 && (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          ویدیویی یافت نشد
        </Typography>
      )}
    </Box>
  );
};

export default Videos;