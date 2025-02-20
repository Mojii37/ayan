export const formatDateTime = (date: Date): string => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  };
  
  export const getCurrentDateTime = (): string => {
    return formatDateTime(new Date());
  };
  
  export const parseDateTime = (dateTimeStr: string): Date => {
    return new Date(dateTimeStr.replace(' ', 'T') + 'Z');
  };