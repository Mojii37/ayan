import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea,
  Chip,
  LinearProgress,
  TextField,
  Divider
} from '@mui/material';
import { 
  BookOutlined, 
  CodeOutlined, 
  DesignServicesOutlined 
} from '@mui/icons-material';

// Tutorial Interface
interface Tutorial {
  id: string;
  title: string;
  description: string;
  level: 'مبتدی' | 'متوسط' | 'پیشرفته';
  category: string;
  duration: string;
  tags: string[];
  link: string;
}

const Tutorials: React.FC = () => {
  // State Management
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('همه');

  // Fetch Tutorials (Simulated API Call)
  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        // Mock Tutorial Data
        const mockTutorials: Tutorial[] = [
          {
            id: '1',
            title: 'راه‌اندازی پروژه React از صفر',
            description: 'آموزش کامل ساخت یک پروژه React با بهترین متدها',
            level: 'مبتدی',
            category: 'برنامه‌نویسی',
            duration: '2 ساعت',
            tags: ['React', 'JavaScript', 'Web Development'],
            link: 'https://example.com/react-tutorial'
          },
          {
            id: '2',
            title: 'مبانی پیشرفته TypeScript',
            description: 'عمیق‌دایو در قابلیت‌های پیشرفته TypeScript',
            level: 'پیشرفته',
            category: 'برنامه‌نویسی',
            duration: '3 ساعت',
            tags: ['TypeScript', 'Advanced', 'Programming'],
            link: 'https://example.com/typescript-advanced'
          },
          {
            id: '3',
            title: 'طراحی رابط کاربری با Figma',
            description: 'از مبانی تا طراحی حرفه‌ای با Figma',
            level: 'متوسط',
            category: 'طراحی',
            duration: '1.5 ساعت',
            tags: ['Figma', 'UI/UX', 'Design'],
            link: 'https://example.com/figma-design'
          }
        ];

        setTutorials(mockTutorials);
        setLoading(false);
      } catch (error) {
        console.error('خطا در بارگذاری آموزش‌ها:', error);
        setLoading(false);
      }
    };

    fetchTutorials();
  }, []);

  // Filter Tutorials
  const filteredTutorials = tutorials.filter(tutorial => 
    tutorial.title.includes(searchTerm) && 
    (selectedLevel === 'همه' || tutorial.level === selectedLevel)
  );

  // Open Tutorial Link
  const handleTutorialOpen = (link: string) => {
    window.open(link, '_blank');
  };

  // Level Icons
  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'مبتدی': return <BookOutlined color="primary" />;
      case 'متوسط': return <CodeOutlined color="secondary" />;
      case 'پیشرفته': return <DesignServicesOutlined color="error" />;
      default: return null;
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        آموزش‌های تخصصی
      </Typography>

      {/* Search and Filter */}
      <Box sx={{ display: 'flex', mb: 3, gap: 2 }}>
        <TextField
          label="جستجوی آموزش"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <TextField
          select
          label="سطح دشواری"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          variant="outlined"
          SelectProps={{ native: true }}
        >
          {['همه', 'مبتدی', 'متوسط', 'پیشرفته'].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </TextField>
      </Box>

      {/* Tutorials Grid */}
      <Grid container spacing={3}>
        {filteredTutorials.map((tutorial) => (
          <Grid item xs={12} sm={6} md={4} key={tutorial.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardActionArea 
                onClick={() => handleTutorialOpen(tutorial.link)}
                sx={{ flexGrow: 1 }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" component="div">
                      {tutorial.title}
                    </Typography>
                    {getLevelIcon(tutorial.level)}
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {tutorial.description}
                  </Typography>

                  <Divider sx={{ mb: 2 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption">
                      مدت: {tutorial.duration}
                    </Typography>
                    <Chip 
                      label={tutorial.level} 
                      size="small" 
                      color={
                        tutorial.level === 'مبتدی' ? 'primary' : 
                        tutorial.level === 'متوسط' ? 'secondary' : 'error'
                      } 
                    />
                  </Box>

                  <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {tutorial.tags.map((tag) => (
                      <Chip 
                        key={tag} 
                        label={tag} 
                        size="small" 
                        variant="outlined" 
                      />
                    ))}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredTutorials.length === 0 && (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          آموزشی یافت نشد
        </Typography>
      )}
    </Box>
  );
};

export default Tutorials;