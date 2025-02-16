import { Container, Box } from '@mui/material';
import AppRoutes from './routes';
import { DateTime } from './components/common/DateTime';

const App = () => {
  const currentDate = new Date('2025-02-15T10:03:00Z');

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          py: 3,
          bgcolor: 'background.default'
        }}
      >
        <Box
          component="header"
          data-testid="app-header"
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1,
            border: 1,
            borderColor: 'primary.dark'
          }}
        >
          <DateTime 
            date={currentDate}
            showIcon
            showTimeAgo
            variant="h6"
            sx={{ color: 'primary.main' }}
          />
        </Box>

        <Box
          component="main"
          data-testid="app-main"
          sx={{
            flex: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1,
            p: 2,
            border: 1,
            borderColor: 'primary.dark'
          }}
        >
          <AppRoutes />
        </Box>

        <Box
          component="footer"
          data-testid="app-footer"
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1,
            border: 1,
            borderColor: 'primary.dark',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
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
            sx={{ color: 'primary.main' }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default App;