import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Chip,
  LinearProgress,
  Divider,
  TextField,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  CalendarTodayOutlined, 
  NotificationsActiveOutlined, 
  EventNoteOutlined 
} from '@mui/icons-material';

// Tax Calendar Event Interface
interface TaxEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  type: 'deadline' | 'reminder' | 'important';
  category: string;
}

const TaxCalendar: React.FC = () => {
  // State Management
  const [taxEvents, setTaxEvents] = useState<TaxEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('همه');

  // Fetch Tax Events (Simulated API Call)
  useEffect(() => {
    const fetchTaxEvents = async () => {
      try {
        // Mock Tax Calendar Data
        const mockTaxEvents: TaxEvent[] = [
          {
            id: '1',
            title: 'ارسال اظهارنامه مالیاتی',
            date: '1403/02/31',
            description: 'مهلت ارسال اظهارنامه مالیاتی اشخاص حقیقی و حقوقی',
            type: 'deadline',
            category: 'اشخاص حقیقی'
          },
          {
            id: '2',
            title: 'پرداخت مالیات بر ارزش افزوده',
            date: '1403/03/15',
            description: 'مهلت پرداخت مالیات بر ارزش افزوده فصل زمستان',
            type: 'deadline',
            category: 'مالیات بر ارزش افزوده'
          },
          {
            id: '3',
            title: 'یادآوری تسویه مالیاتی',
            date: '1403/02/20',
            description: 'بررسی و تسویه بدهی‌های مالیاتی معوقه',
            type: 'reminder',
            category: 'تسویه حساب'
          }
        ];

        setTaxEvents(mockTaxEvents);
        setLoading(false);
      } catch (error) {
        console.error('خطا در بارگذاری رویدادهای مالیاتی:', error);
        setLoading(false);
      }
    };

    fetchTaxEvents();
  }, []);

  // Filter Tax Events
  const filteredTaxEvents = taxEvents.filter(event => 
    event.title.includes(searchTerm) && 
    (selectedCategory === 'همه' || event.category === selectedCategory)
  );

  const getEventTypeDetails = (type: string) => {
    switch (type) {
      case 'deadline': 
        return { 
          icon: <EventNoteOutlined color="error" />, 
          chipColor: 'error' as const // اضافه کردن as const
        };
      case 'reminder': 
        return { 
          icon: <NotificationsActiveOutlined color="warning" />, 
          chipColor: 'warning' as const // اضافه کردن as const
        };
      case 'important': 
        return { 
          icon: <CalendarTodayOutlined color="primary" />, 
          chipColor: 'primary' as const // اضافه کردن as const
        };
      default: 
        return { 
          icon: null, 
          chipColor: 'default' as const // اضافه کردن as const
        };
    }
  };
  // Copy Event Details
  const handleCopyEventDetails = (event: TaxEvent) => {
    const eventDetails = `عنوان: ${event.title}\nتاریخ: ${event.date}\nتوضیحات: ${event.description}`;
    navigator.clipboard.writeText(eventDetails)
      .then(() => alert('جزئیات رویداد کپی شد'))
      .catch(err => console.error('خطا در کپی کردن:', err));
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        تقویم مالیاتی
      </Typography>

      {/* Search and Filter */}
      <Box sx={{ display: 'flex', mb: 3, gap: 2 }}>
        <TextField
          label="جستجوی رویداد"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <TextField
          select
          label="دسته‌بندی"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          variant="outlined"
          SelectProps={{ native: true }}
        >
          {['همه', 'اشخاص حقیقی', 'مالیات بر ارزش افزوده', 'تسویه حساب'].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </TextField>
      </Box>

      {/* Tax Events Grid */}
      <Grid container spacing={3}>
        {filteredTaxEvents.map((event) => {
          const { icon, chipColor } = getEventTypeDetails(event.type);
          
          return (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" component="div">
                      {event.title}
                    </Typography>
                    {icon}
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {event.description}
                  </Typography>

                  <Divider sx={{ mb: 2 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ color: 'primary.main' }}>
                      <CalendarTodayOutlined sx={{ verticalAlign: 'middle', mr: 1, fontSize: 'small' }} />
                      {event.date}
                    </Typography>
                    
                    <Chip 
                       label={event.category} 
                     size="small" 
                       color={chipColor as 'error' | 'warning' | 'primary' | 'default'} 
                        variant="outlined"
                    />
                    </Box>

                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip 
                      label={event.type === 'deadline' ? 'مهلت' : event.type === 'reminder' ? 'یادآوری' : 'مهم'}
                      size="small"
                      color={chipColor}
                    />

                    <Tooltip title="کپی جزئیات رویداد">
                      <IconButton 
                        size="small" 
                        onClick={() => handleCopyEventDetails(event)}
                      >
                        <NotificationsActiveOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Empty State */}
      {filteredTaxEvents.length === 0 && (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          رویداد مالیاتی یافت نشد
        </Typography>
      )}
    </Box>
  );
};

export default TaxCalendar;