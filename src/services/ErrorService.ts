import { ErrorLog } from '../types/error';

export class ErrorService {
  private static readonly API_URL = '/api/errors';
  private static readonly MAX_RETRY_ATTEMPTS = 3;

  static async logError(error: Partial<ErrorLog>): Promise<void> {
    let attempts = 0;
    while (attempts < this.MAX_RETRY_ATTEMPTS) {
      try {
        await fetch(this.API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...error,
            timestamp: new Date().toISOString(),
          }),
        });
        break; 
      } catch (e) {
        attempts++;
        if (attempts === this.MAX_RETRY_ATTEMPTS) {
          
          this.storeErrorLocally(error);
        }
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }
  }

  private static storeErrorLocally(error: Partial<ErrorLog>): void {
    const storedErrors = JSON.parse(
      localStorage.getItem('pendingErrors') || '[]'
    );
    storedErrors.push({ ...error, timestamp: new Date().toISOString() }); // Add timestamp to stored error
    localStorage.setItem('pendingErrors', JSON.stringify(storedErrors));
  }

  static async syncStoredErrors(): Promise<void> {
    const storedErrors = JSON.parse(
      localStorage.getItem('pendingErrors') || '[]'
    );
    if (storedErrors.length === 0) return;

    const successfulSyncs: number[] = [];
    for (let i = 0; i < storedErrors.length; i++) {
      try {
        await this.logError(storedErrors[i]);
        successfulSyncs.push(i); // Keep track of successfully synced errors
      } catch (e) {
        console.error('Error syncing stored error:', e);
      }
    }

   
    const remainingErrors = storedErrors.filter(
      (index,_) => !successfulSyncs.includes(index)
    );
    

    localStorage.setItem('pendingErrors', JSON.stringify(remainingErrors));
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

    window.addEventListener('unhandledrejection', event => {
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