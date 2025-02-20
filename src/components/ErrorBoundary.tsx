import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Here you can log the error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ 
      hasError: false,
      error: undefined,
      errorInfo: undefined
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px',
            textAlign: 'center',
            p: 3,
          }}
        >
          <ErrorOutlineIcon
            sx={{
              fontSize: 64,
              color: 'error.main',
              mb: 2
            }}
          />
          <Typography variant="h5" gutterBottom color="error">
            متأسفانه خطایی رخ داده است
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            لطفاً صفحه را رفرش کنید یا با پشتیبانی تماس بگیرید
          </Typography>
          {process.env.NODE_ENV === 'development' && (
            <Typography 
              variant="body2" 
              component="pre"
              sx={{ 
                mt: 2,
                p: 2,
                bgcolor: 'grey.100',
                borderRadius: 1,
                overflow: 'auto',
                maxWidth: '100%'
              }}
            >
              {this.state.error?.toString()}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            تلاش مجدد
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;