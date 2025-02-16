import { useState, useEffect, useCallback } from 'react';

interface DateTimeOptions {
  updateInterval?: number;
  format?: 'UTC' | 'local';
  locale?: string;
}

export const useDateTime = ({
  updateInterval = 1000,
  format = 'UTC',
  locale = 'fa-IR',
}: DateTimeOptions = {}) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, updateInterval);

    return () => clearInterval(timer);
  }, [updateInterval]);

  const formatDateTime = useCallback(
    (date: Date) => {
      if (format === 'UTC') {
        return date.toISOString().replace('T', ' ').slice(0, 19);
      }

      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(date);
    },
    [format, locale]
  );

  return {
    currentDateTime,
    formattedDateTime: formatDateTime(currentDateTime),
    refresh: () => setCurrentDateTime(new Date()),
  };
};