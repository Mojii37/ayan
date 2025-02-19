import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
  Typography
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import type { Content } from '../../../types/content';

interface ContentListProps {
  contents: Content[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ContentList: React.FC<ContentListProps> = ({ 
  contents = [], 
  onEdit,
  onDelete 
}) => {
  const getContentTypeLabel = (type: Content['type']) => {
    const types = {
      article: 'مقاله',
      news: 'خبر',
      page: 'صفحه'
    };
    return types[type] || type;
  };

  return (
    <Box>
      {contents.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
          محتوایی یافت نشد
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>عنوان</TableCell>
                <TableCell>نوع</TableCell>
                <TableCell>تاریخ ایجاد</TableCell>
                <TableCell>وضعیت</TableCell>
                <TableCell>عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contents.map((content) => (
                <TableRow key={content.id}>
                  <TableCell>{content.title}</TableCell>
                  <TableCell>{getContentTypeLabel(content.type)}</TableCell>
                  <TableCell>{content.createdAt}</TableCell>
                  <TableCell>
                    <Chip
                      label={content.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                      color={content.status === 'published' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      size="small" 
                      onClick={() => onEdit?.(content.id)}
                      aria-label="ویرایش"
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => onDelete?.(content.id)} 
                      color="error"
                      aria-label="حذف"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ContentList;