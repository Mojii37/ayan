import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { 
  MenuOpen as MenuOpenIcon 
} from '@mui/icons-material';

// Interface for Book Chapters
interface Chapter {
  id: string;
  title: string;
  content: string;
  image?: string; // Optional image for chapter
}

// Mock Book Data
const mockBook: Chapter[] = [
  {
    id: '1',
    title: 'فصل اول: مقدمه',
    content: 'این فصل مقدمه‌ای بر موضوع کتاب است. خوانندگان با مفاهیم اولیه آشنا می‌شوند.',
    image: '/path/to/chapter1-image.jpg'
  },
  {
    id: '2',
    title: 'فصل دوم: مبانی',
    content: 'در این فصل، جزئیات تخصصی‌تر و عمیق‌تر موضوع مورد بررسی قرار می‌گیرد.',
    image: '/path/to/chapter2-image.jpg'
  },
  {
    id: '3',
    title: 'فصل سوم: کاربردها',
    content: 'فصل سوم به کاربردهای عملی و مثال‌های واقعی اختصاص دارد.',
    image: '/path/to/chapter3-image.jpg'
  }
];

const MiniBook: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(mockBook[0]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleChapterSelect = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setDrawerOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            display: 'flex',
            minHeight: '70vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
          }}
        >
          {/* Chapter List (Drawer for Mobile) */}
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            sx={{
              display: { xs: 'block', md: 'none' }
            }}
          >
            <List sx={{ width: 250 }}>
              {mockBook.map((chapter) => (
                <ListItem 
                  key={chapter.id} 
                  disablePadding
                >
                  <ListItemButton onClick={() => handleChapterSelect(chapter)}>
                    <ListItemText primary={chapter.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>

          <Grid container spacing={3}>
            {/* Chapter List (Desktop) */}
            <Grid 
              item 
              xs={12} 
              md={3} 
              sx={{ 
                display: { xs: 'none', md: 'block' },
                borderLeft: '1px solid rgba(0,0,0,0.12)',
                pr: 2
              }}
            >
              <Typography variant="h6" gutterBottom>
                فهرست فصل‌ها
              </Typography>
              {mockBook.map((chapter) => (
                <Card 
                  key={chapter.id} 
                  sx={{ 
                    mb: 2, 
                    cursor: 'pointer',
                    bgcolor: selectedChapter.id === chapter.id ? 'primary.light' : 'background.paper'
                  }}
                  onClick={() => handleChapterSelect(chapter)}
                >
                  {chapter.image && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={chapter.image}
                      alt={chapter.title}
                    />
                  )}
                  <CardContent>
                    <Typography variant="subtitle1">{chapter.title}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>

            {/* Chapter Content */}
            <Grid item xs={12} md={9}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton 
                  sx={{ display: { xs: 'block', md: 'none' }, mr: 2 }}
                  onClick={() => setDrawerOpen(true)}
                >
                  <MenuOpenIcon />
                </IconButton>
                <Typography variant="h4" gutterBottom>
                  {selectedChapter.title}
                </Typography>
              </Box>

              <Card>
                {selectedChapter.image && (
                  <CardMedia
                    component="img"
                    height="300"
                    image={selectedChapter.image}
                    alt={selectedChapter.title}
                  />
                )}
                <CardContent>
                  <Typography variant="body1" paragraph>
                    {selectedChapter.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default MiniBook;