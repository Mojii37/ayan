import React, { useState, useEffect, useCallback } from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { styled } from '@mui/material/styles'; // حذف useTheme

interface ImageSliderProps {
  images: string[];
  autoPlayInterval?: number;
}

const SliderContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '500px',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
}));

const SlideImageStyled = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'opacity 0.5s ease-in-out',
});

const SlideOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
  padding: theme.spacing(3),
  color: theme.palette.primary.main,
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(0,0,0,0.5)',
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
}));

const SlideIndicators = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(1),
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: theme.spacing(1),
}));

const SlideIndicator = styled('button')<{ active?: boolean }>(
  ({ theme, active }) => ({
    width: 12,
    height: 12,
    borderRadius: '50%',
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: active ? theme.palette.primary.main : 'transparent',
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  })
);

export const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  autoPlayInterval = 15000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const previousSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [nextSlide, autoPlayInterval]);

  if (!images.length) return null;

  return (
    <SliderContainer>
      <SlideImageStyled
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
      />
      <SlideOverlay>
        <h2>{`Slide ${currentIndex + 1}`}</h2>
      </SlideOverlay>
      <NavigationButton onClick={previousSlide} sx={{ left: 8 }}>
        <ChevronLeft />
      </NavigationButton>
      <NavigationButton onClick={nextSlide} sx={{ right: 8 }}>
        <ChevronRight />
      </NavigationButton>
      <SlideIndicators>
        {images.map((_, index) => (
          <SlideIndicator
            key={index}
            active={index === currentIndex}
            onClick={() => goToSlide(index)}
          />
        ))}
      </SlideIndicators>
    </SliderContainer>
  );
};

export default ImageSlider;