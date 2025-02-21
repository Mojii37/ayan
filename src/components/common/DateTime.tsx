import { FC } from 'react';
import { Typography, Box, type SxProps, type Theme } from '@mui/material';
import { format as formatDate } from 'date-fns';
import { faIR } from 'date-fns/locale';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface DateTimeProps {
  date: Date;
  format?: string;
  showIcon?: boolean;
  showTimeAgo?: boolean;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2';
  sx?: SxProps<Theme>;
}

export const DateTime: FC<DateTimeProps> = ({
  date,
  format = 'yyyy/MM/dd HH:mm:ss',
  showIcon = false,
  showTimeAgo = false,
  variant = 'body1',
  sx
}) => {
  const formattedDate = formatDate(date, format, { locale: faIR });
  
  const timeAgo = (date: Date): string => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'همین الان';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} دقیقه پیش`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} ساعت پیش`;
    return `${Math.floor(seconds / 86400)} روز پیش`;
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ...sx }}>
      {showIcon && <AccessTimeIcon fontSize="small" />}
      <Typography variant={variant}>
        {formattedDate}
        {showTimeAgo && ` (${timeAgo(date)})`}
      </Typography>
    </Box>
  );
};