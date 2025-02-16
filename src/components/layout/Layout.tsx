import { Box, Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import { DateTime } from '../common/DateTime';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    py: 3,
    direction: 'rtl',
    bgcolor: 'background.default',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    p: 2,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 1,
    border: '1px solid',
    borderColor: 'primary.dark',
  },
  main: {
    flex: 1,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 1,
    p: 2,
    border: '1px solid',
    borderColor: 'primary.dark',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    p: 2,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 1,
    border: '1px solid',
    borderColor: 'primary.dark',
  }
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const currentDate = new Date('2025-02-15T08:40:16Z');

  return (
    <Box sx={styles.container}>
      <Box component="header" sx={styles.header}>
        <DateTime 
          date={currentDate}
          showIcon
          showTimeAgo
          variant="h6"
          sx={{ color: 'primary.main' }}
        />
      </Box>

      <Box component="main" sx={styles.main}>
        {children}
      </Box>

      <Box component="footer" sx={styles.footer}>
        <DateTime 
          date={currentDate}
          format="YYYY/MM/DD"
          variant="body2"
          sx={{ color: 'text.secondary' }}
        />
        <DateTime 
          date={currentDate}
          variant="body1"
          showTimeAgo
          sx={{ color: 'primary.main' }}
        />
      </Box>
    </Box>
  );
};

export default Layout;