import { FC } from 'react';
import { Container, Box, useTheme } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import AppRoutes from './routes';
import { DateTime } from './components/common/DateTime';
import type { SxProps, Theme } from '@mui/material/styles';
import { cacheRtl } from './utils/cache';
const App: FC = () => {
  const theme = useTheme();
  const currentDate = new Date();

  const commonBoxStyles: SxProps<Theme> = {
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: theme.shadows[4],
    border: `1px solid ${theme.palette.gold.main}`,
    p: 2,
  };

  return (
    <CacheProvider value={cacheRtl}>
      <Container 
        maxWidth="lg" 
        sx={{ 
          minHeight: '100vh',
          py: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            minHeight: 'inherit',
          }}
        >
          <Box
            component="header"
            data-testid="app-header"
            sx={{
              ...commonBoxStyles,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <DateTime 
              date={currentDate}
              showIcon
              showTimeAgo
              variant="h6"
              sx={{ color: 'gold.main' }}
            />
          </Box>

          <Box
            component="main"
            data-testid="app-main"
            sx={{
              ...commonBoxStyles,
              flex: 1,
            }}
          >
            <AppRoutes />
          </Box>

          <Box
            component="footer"
            data-testid="app-footer"
            sx={{
              ...commonBoxStyles,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <DateTime 
              date={currentDate}
              format="yyyy/MM/dd"
              variant="body2"
              sx={{ color: 'text.secondary' }}
            />
            <DateTime 
              date={currentDate}
              showTimeAgo
              variant="body2"
              sx={{ color: 'gold.main' }}
            />
          </Box>
        </Box>
      </Container>
    </CacheProvider>
  );
};

export default App;