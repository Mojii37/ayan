import { useState, useEffect } from 'react';
import { Typography, TypographyVariant, Box, SxProps, Theme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { format, formatDistance } from 'date-fns';
import { faIR } from 'date-fns/locale';

interface DateTimeProps {
  date: Date;
  format?: string;
  showIcon?: boolean;
  showTimeAgo?: boolean;
  variant?: TypographyVariant;
  sx?: SxProps<Theme>;
  updateInterval?: number;
}

const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

// تابع تبدیل اعداد انگلیسی به فارسی
const toPersianNumber = (str: string): string => {
  return str.replace(/\d/g, (d) => persianDigits[parseInt(d)]);
};

export const DateTime = ({
  date,
  format: dateFormat = 'yyyy/MM/dd',
  showIcon = false,
  showTimeAgo = false,
  variant = 'body1',
  sx,
  updateInterval = 60000
}: DateTimeProps) => {
  const [, setUpdate] = useState(0);

  useEffect(() => {
    if (showTimeAgo && updateInterval > 0) {
      const timer = setInterval(() => {
        setUpdate(prev => prev + 1);
      }, updateInterval);

      return () => clearInterval(timer);
    }
  }, [showTimeAgo, updateInterval]);

  const formattedDate = toPersianNumber(format(date, dateFormat, { locale: faIR }));
  const timeAgo = showTimeAgo
    ? formatDistance(date, new Date(), { addSuffix: true, locale: faIR })
    : null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ...sx }}>
      {showIcon && <AccessTimeIcon color="inherit" fontSize="small" />}
      <Typography variant={variant} component="span">
        {formattedDate}
      </Typography>
      {timeAgo && (
        <Typography variant={variant} component="span" sx={{ opacity: 0.8 }}>
          ({timeAgo})
        </Typography>
      )}
    </Box>
  );
};