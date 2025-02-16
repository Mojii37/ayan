import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Avatar,
  CardActionArea,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AccessTime, RemoveRedEye } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Content } from '../../types/content';

const StyledCard = styled(Card)(() => ({  // حذف theme از پارامتر
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const ContentInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

interface ContentCardProps {
  content: Content;
  type: 'article' | 'tutorial';
}

export const ContentCard: React.FC<ContentCardProps> = ({ content, type }) => {
  return (
    <StyledCard>
      <CardActionArea component={Link} to={`/${type}s/${content.slug}`}>
        <CardMedia
          component="img"
          height="200"
          image={content.thumbnail || '/images/default-thumbnail.jpg'}
          alt={content.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {content.title}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {content.summary}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {content.tags.slice(0, 3).map(tag => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
              />
            ))}
          </Box>

          <ContentInfo>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                src={content.author.avatar}
                alt={content.author.name}
                sx={{ width: 24, height: 24 }}
              />
              <Typography variant="body2">{content.author.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTime sx={{ fontSize: '1rem' }} />
              <Typography variant="body2">{content.readTime} دقیقه</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <RemoveRedEye sx={{ fontSize: '1rem' }} />
              <Typography variant="body2">{content.viewCount}</Typography>
            </Box>
          </ContentInfo>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};