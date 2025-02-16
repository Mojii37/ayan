import React, { Component, ErrorInfo } from 'react';
import { Box, Paper, Typography, Button, Collapse } from '@mui/material';
import { ErrorOutline, Refresh, BugReport } from '@mui/icons-material';
import { ErrorLog } from '../../types/error';
import { ErrorService } from '../../services/ErrorService';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      showDetails: false,
    };
  }

  static getDerivedStateFromError(_error: Error) { // اضافه کردن _ برای رفع خطای متغیر استفاده نشده
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    const errorLog: Partial<ErrorLog> = {
      timestamp: new Date(),
      user: 'Mojim37',
      severity: 'error',
      source: 'client',
      message: error.message,
      stack: error.stack,
      context: {
        component: errorInfo.componentStack,
        url: window.location.href,
      },
    };

    ErrorService.logError(errorLog);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }
  handleReload = () => {
    window.location.reload();
  };

  handleShowDetails = () => {
    this.setState(prev => ({
      showDetails: !prev.showDetails,
    }));
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            p: 3,
          }}
        >
          <Paper
            sx={{
              p: 4,
              maxWidth: 600,
              textAlign: 'center',
            }}
          >
            <ErrorOutline color="error" sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              متأسفیم! خطایی رخ داده است
            </Typography>
            <Typography color="text.secondary" paragraph>
              لطفاً صفحه را مجدداً بارگذاری کنید. اگر مشکل همچنان ادامه داشت، با
              پشتیبانی تماس بگیرید.
            </Typography>

            <Box
              sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}
            >
              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={this.handleReload}
              >
                بارگذاری مجدد
              </Button>
              <Button
                variant="outlined"
                startIcon={<BugReport />}
                onClick={this.handleShowDetails}
              >
                جزئیات خطا
              </Button>
            </Box>

            <Collapse in={this.state.showDetails}>
              <Paper
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: 'grey.100',
                  maxHeight: 300,
                  overflow: 'auto',
                }}
              >
                <Typography
                  component="pre"
                  sx={{
                    fontSize: 12,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {this.state.error?.stack}
                  {'\n\nComponent Stack:\n'}
                  {this.state.errorInfo?.componentStack}
                </Typography>
              </Paper>
            </Collapse>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}