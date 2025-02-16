import { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class DevErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log errors in development environment
    if (process.env.NODE_ENV === 'development') {
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            m: 2, 
            bgcolor: 'grey.100',
            border: '1px solid',
            borderColor: 'warning.main'
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'warning.main',
              fontWeight: 'medium'
            }}
          >
            خطای توسعه
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.primary',
                fontFamily: 'monospace'
              }}
            >
              {this.state.error?.message}
            </Typography>
            {this.state.errorInfo && (
              <Box
                component="pre"
                sx={{
                  overflow: 'auto',
                  maxHeight: '300px',
                  p: 2,
                  mt: 2,
                  bgcolor: 'grey.50',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem'
                }}
              >
                {this.state.errorInfo.componentStack}
              </Box>
            )}
          </Box>
          <Button
            variant="contained"
            color="warning"
            onClick={() => window.location.reload()}
            sx={{ 
              mt: 2,
              '&:hover': {
                bgcolor: 'warning.dark'
              }
            }}
          >
            بارگذاری مجدد
          </Button>
        </Paper>
      );
    }

    return this.props.children;
  }
}