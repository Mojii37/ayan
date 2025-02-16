interface TimeUnit {
    value: number;
    unit: string;
  }
  
  const TIME_UNITS: TimeUnit[] = [
    { value: 31536000, unit: 'سال' },
    { value: 2592000, unit: 'ماه' },
    { value: 86400, unit: 'روز' },
    { value: 3600, unit: 'ساعت' },
    { value: 60, unit: 'دقیقه' },
    { value: 1, unit: 'ثانیه' },
  ];
  
  export const formatDateTime = (date: Date, format: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
  
    const formatter = new Intl.DateTimeFormat('fa-IR', options);
    const parts = formatter.formatToParts(date);
    
    let formattedDate = format;
    
    const replacements: Record<string, string> = {
      'YYYY': parts.find(p => p.type === 'year')?.value || '',
      'MM': parts.find(p => p.type === 'month')?.value || '',
      'DD': parts.find(p => p.type === 'day')?.value || '',
      'HH': parts.find(p => p.type === 'hour')?.value || '',
      'mm': parts.find(p => p.type === 'minute')?.value || '',
      'ss': parts.find(p => p.type === 'second')?.value || '',
    };
  
    Object.entries(replacements).forEach(([key, value]) => {
      formattedDate = formattedDate.replace(key, value);
    });
  
    return formattedDate;
  };
  
  export const timeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 5) {
      return 'همین الان';
    }
  
    for (const { value, unit } of TIME_UNITS) {
      const interval = Math.floor(seconds / value);
      if (interval >= 1) {
        return `${interval} ${unit} پیش`;
      }
    }
  
    return formatDateTime(date, 'YYYY-MM-DD HH:mm:ss');
  };
  
  export const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  
  export const isFuture = (date: Date): boolean => {
    return date.getTime() > new Date().getTime();
  };
  
  export const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
  
  export const startOfDay = (date: Date): Date => {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  };
  
  export const endOfDay = (date: Date): Date => {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
  };
  
  // برای استفاده در فرم‌ها
  export const toISODateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };
  
  // تبدیل تاریخ میلادی به شمسی
  export const toJalali = (date: Date): string => {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  // تبدیل تاریخ شمسی به میلادی (نیاز به کتابخانه moment-jalaali دارد)
  // export const fromJalali = (jalaliDate: string): Date => {
  //   return moment(jalaliDate, 'jYYYY/jMM/jDD').toDate();
  // };