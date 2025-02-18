import { ErrorLog, ErrorSeverity, ErrorSource, StoredError } from '../types/error';

export class ErrorService {
  private static readonly API_URL = '/api/errors';
  private static readonly MAX_RETRY_ATTEMPTS = 3;
  private static readonly STORAGE_KEY = 'pendingErrors';

  private static generateErrorId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }

  private static getSystemInfo() {
    return {
      browser: navigator.userAgent,
      os: navigator.platform,
      deviceType: /mobile/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      route: window.location.pathname,
    };
  }

  static async logError(error: Partial<ErrorLog>): Promise<void> {
    let attempts = 0;
    const fullError: ErrorLog = {
      id: this.generateErrorId(),
      timestamp: new Date(),
      severity: error.severity || 'error',
      source: error.source || 'client',
      message: error.message || 'Unknown error',
      stack: error.stack,
      context: {
        ...this.getSystemInfo(),
        ...error.context,
      },
    };

    while (attempts < this.MAX_RETRY_ATTEMPTS) {
      try {
        const response = await fetch(this.API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fullError),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        break;
      } catch (error) {
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
      };

      storedErrors.push(storedError);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storedErrors));
    } catch (error) {
      console.error('Failed to store error:', error);
    }
  }

  static async syncStoredErrors(): Promise<void> {
    const storedErrors = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    if (storedErrors.length === 0) return;

    const successfulSyncs: string[] = [];
    for (const error of storedErrors) {
      try {
        await this.logError(error);
        successfulSyncs.push(error.id);
      } catch (error) {
        console.error('Error syncing:', error);
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
        severity: 'error',
        source: 'client',
        message: message.toString(),
        stack: error?.stack,
        context: {
          source,
          line: lineno,
          column: colno,
          url: window.location.href,
        },
      });
    };

    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        severity: 'error',
        source: 'client',
        message: 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        context: {
          reason: event.reason,
          url: window.location.href,
        },
      });
    });
  }
}

export default ErrorService;