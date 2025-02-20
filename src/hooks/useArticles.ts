import { useState, useEffect } from 'react';
import { Article } from '../types/content';
import { ErrorService } from '../services/ErrorService';

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error('خطا در دریافت مقالات');
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'خطای ناشناخته';
        setError(message);
        ErrorService.logError({
          severity: 'error',
          source: 'client',
          message: `خطا در دریافت مقالات: ${message}`,
          context: {
            component: 'Articles',
            action: 'fetchArticles'
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error };
};