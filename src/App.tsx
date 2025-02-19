import { FC } from 'react';
import { Container, Box, useTheme } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { store } from './store';
import AppRoutes from './routes';
import { DateTime } from './components/common/DateTime';
import { ThemeProvider } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { cacheRtl } from './utils/cache';
import { theme } from './theme';

const App: FC = () => {
  const muiTheme = useTheme();
  const currentDate = new Date();

  const commonBoxStyles: SxProps<Theme> = {
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: muiTheme.shadows[4],
    border: `1px solid ${muiTheme.palette.gold.main}`,
    p: 2,
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CacheProvider value={cacheRtl}>
          <Container 
            maxWidth="lg" 
            sx={{ 
              minHeight: '100vh',
              py: 3,
              bgcolor: 'background.default',
              color: 'text.primary',
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
      </ThemeProvider>
    </Provider>
  );
};

export default App;