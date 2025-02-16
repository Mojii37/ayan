import { useState, useCallback } from 'react';
import { ErrorService } from '../services/ErrorService';
// حذف import { ErrorLog } چون استفاده نشده

export const useError = () => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const handleError = useCallback(async (e: Error, context?: object) => {
    setError(e);
    setLoading(true);

    try {
      await ErrorService.logError({
        severity: 'error',
        source: 'client',
        message: e.message,
        stack: e.stack,
        context: {
          ...context,
          url: window.location.href,
          timestamp: new Date().toISOString(),
          user: 'Mojim37',
        },
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    loading,
    handleError,
    clearError,
  };
};