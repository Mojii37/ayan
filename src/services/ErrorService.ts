import type { 
  ErrorLog, 
  ErrorSeverity, 
  ErrorSource, 
  ErrorStatus,
  StoredError,
  ErrorContext 
} from '@/types/error';

export class ErrorService {
  private static readonly API_URL = '/api/errors';
  private static readonly MAX_RETRY_ATTEMPTS = 3;
  private static readonly STORAGE_KEY = 'pendingErrors';

  private static generateErrorId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }

  private static getSystemInfo(): ErrorContext {
    const deviceType = /mobile/i.test(navigator.userAgent) 
      ? 'mobile' 
      : /tablet/i.test(navigator.userAgent)
      ? 'tablet'
      : 'desktop';

    return {
      browser: navigator.userAgent,
      os: navigator.platform,
      deviceType,
      route: window.location.pathname,
      userId: localStorage.getItem('userId') || undefined,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV as 'development' | 'production' | 'test'
    };
  }

  static async logError(error: Partial<ErrorLog>): Promise<void> {
    let attempts = 0;
    const fullError: ErrorLog = {
      id: this.generateErrorId(),
      timestamp: new Date(),
      severity: error.severity || ErrorSeverity.ERROR,
      source: error.source || ErrorSource.CLIENT,
      message: error.message || 'Unknown error',
      stack: error.stack,
      status: ErrorStatus.NEW,
      retryCount: 0,
      maxRetries: this.MAX_RETRY_ATTEMPTS,
      context: {
        ...this.getSystemInfo(),
        ...error.context
      },
      relatedErrors: error.relatedErrors || [],
      tags: error.tags || []
    };

    while (attempts < this.MAX_RETRY_ATTEMPTS) {
      try {
        const response = await fetch(this.API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(fullError),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        break;
      } catch (err) {
        attempts++;
        if (attempts === this.MAX_RETRY_ATTEMPTS) {
          await this.storeErrorLocally(fullError);
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }
  }

  private static async storeErrorLocally(error: ErrorLog): Promise<void> {
    try {
      const storedErrors: StoredError[] = JSON.parse(
        localStorage.getItem(this.STORAGE_KEY) || '[]'
      );

      const storedError: StoredError = {
        ...error,
        timestamp: error.timestamp.toISOString(),
        lastRetryAt: error.lastRetryAt?.toISOString(),
        resolvedAt: error.resolvedAt?.toISOString(),
      };

      storedErrors.push(storedError);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storedErrors));
    } catch (err) {
      console.error('Failed to store error:', err);
    }
  }

  static async syncStoredErrors(): Promise<void> {
    const storedErrors = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    if (storedErrors.length === 0) return;

    const successfulSyncs: string[] = [];
    
    for (const error of storedErrors) {
      try {
        await this.logError({
          ...error,
          timestamp: new Date(error.timestamp),
          lastRetryAt: error.lastRetryAt ? new Date(error.lastRetryAt) : undefined,
          resolvedAt: error.resolvedAt ? new Date(error.resolvedAt) : undefined,
          status: ErrorStatus.PENDING
        });
        successfulSyncs.push(error.id);
      } catch (err) {
        console.error('Error syncing:', err);
      }
    }

    const remainingErrors = storedErrors.filter(
      error => !successfulSyncs.includes(error.id)
    );

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(remainingErrors));
  }

  static handleGlobalErrors(): void {
    window.onerror = (message, source, lineno, colno, error) => {
      this.logError({
        severity: ErrorSeverity.ERROR,
        source: ErrorSource.CLIENT,
        message: message.toString(),
        stack: error?.stack,
        status: ErrorStatus.NEW,
        context: {
          ...this.getSystemInfo(),
          source,
          line: lineno,
          column: colno,
          url: window.location.href,
        },
      });
    };

    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        severity: ErrorSeverity.ERROR,
        source: ErrorSource.CLIENT,
        message: 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        status: ErrorStatus.NEW,
        context: {
          ...this.getSystemInfo(),
          reason: event.reason,
          url: window.location.href,
        },
      });
    });
  }

  static async updateErrorStatus(
    errorId: string, 
    status: ErrorStatus
  ): Promise<void> {
    try {
      const response = await fetch(`${this.API_URL}/${errorId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update error status: ${response.status}`);
      }
    } catch (err) {
      console.error('Failed to update error status:', err);
      throw err;
    }
  }
}

export default ErrorService;