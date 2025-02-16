import {
  Container,
  Typography,
  Box,
  Chip,
  Avatar,
  Divider,
  Paper,
} from '@mui/material';
import { AccessTime, RemoveRedEye, CalendarToday } from '@mui/icons-material';

const ArticleDetail = () => {
  // در نسخه واقعی، اطلاعات مقاله از API دریافت می‌شود

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h3" gutterBottom>
            عنوان مقاله
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar src="/path-to-avatar.jpg" />
              <Typography>نام نویسنده</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarToday fontSize="small" />
              <Typography>تاریخ انتشار</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTime fontSize="small" />
              <Typography>زمان مطالعه: 10 دقیقه</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <RemoveRedEye fontSize="small" />
              <Typography>1234 بازدید</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <img
              src="/path-to-image.jpg"
              alt="عنوان مقاله"
              style={{ width: '100%', borderRadius: 8 }}
            />
          </Box>

          <Typography variant="body1" sx={{ mb: 3 }}>
            متن مقاله...
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', gap: 1 }}>
            {['مالیات', 'حسابداری', 'کسب و کار'].map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ArticleDetail;