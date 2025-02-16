import { useState, useEffect, useCallback } from 'react';

export const useCurrentDateTime = () => {
  const [dateTime, setDateTime] = useState<string>('');

  const formatDateTime = useCallback((date: Date): string => {
    return date.toISOString()
      .replace('T', ' ')
      .slice(0, 19);
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      setDateTime(formatDateTime(new Date()));
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);

    return () => clearInterval(timer);
  }, [formatDateTime]);

  return dateTime;
};