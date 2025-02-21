import { type FC } from 'react';
import { Container, Box, useTheme } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { ErrorBoundary } from './components/ErrorBoundary';
import { store } from './store';
import AppRoutes from './routes';
import { DateTime } from './components/common/DateTime';
import { theme, rtlCache } from './theme';

interface Props {
  'data-testid'?: string;
}

const App: FC<Props> = ({ 'data-testid': testId = 'app' }) => {
  const muiTheme = useTheme();
  const currentDate = new Date('2025-02-20T09:57:51Z');

  const commonBoxStyles: SxProps<Theme> = {
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: muiTheme.shadows[4],
    border: `1px solid ${muiTheme.palette.gold.main}`,
    p: 2,
  };

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CacheProvider value={rtlCache}>
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
                data-testid={testId}
              >
                {/* ... بقیه کدها */}
              </Box>
            </Container>
          </CacheProvider>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;