import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
  GridPaginationModel
} from '@mui/x-data-grid';
import {
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { articleService } from '@/services/articleService';
import type { Article } from '@/types/content';
import { useConfirm } from '@/hooks/useConfirm'; // این هوک را باید بسازید

const ROWS_PER_PAGE = 10;

const AdminArticles: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { confirm } = useConfirm();
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: ROWS_PER_PAGE,
  });

  // کوئری دریافت مقالات
  const { 
    data: articles = [], 
    isLoading, 
    error 
  } = useQuery<Article[]>({
    queryKey: ['admin-articles', paginationModel],
    queryFn: () => articleService.getArticles({
      page: paginationModel.page + 1,
      limit: paginationModel.pageSize
    }),
    keepPreviousData: true
  });

  // میوتیشن حذف مقاله
  const deleteMutation = useMutation({
    mutationFn: (id: string) => articleService.removeArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
    }
  });

  // هندلر حذف مقاله
  const handleDelete = async (id: string) => {
    try {
      const confirmed = await confirm({
        title: 'حذف مقاله',
        message: 'آیا از حذف این مقاله اطمینان دارید؟',
        confirmText: 'بله، حذف شود',
        cancelText: 'خیر'
      });

      if (confirmed) {
        await deleteMutation.mutateAsync(id);
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  // تعریف ستون‌های جدول
  const columns: GridColDef[] = [
    { 
      field: 'title', 
      headerName: 'عنوان', 
      width: 250,
      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <span>{params.value}</span>
        </Tooltip>
      )
    },
    { 
      field: 'categoryId', 
      headerName: 'دسته‌بندی', 
      width: 130,
      valueGetter: (params: GridValueGetterParams) => {
        const categories: Record<string, string> = {
          '1': 'مالیات',
          '2': 'حسابداری',
          '3': 'قوانین'
          // سایر دسته‌بندی‌ها
        };
        return categories[params.value] || 'نامشخص';
      }
    },
    { 
      field: 'status', 
      headerName: 'وضعیت', 
      width: 120,
      renderCell: (params: GridRenderCellParams) => {
        const statusConfig: Record<string, { label: string; color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' }> = {
          draft: { label: 'پیش‌نویس', color: 'default' },
          published: { label: 'منتشر شده', color: 'success' },
          archived: { label: 'بایگانی شده', color: 'error' }
        };
        const status = statusConfig[params.row.status] || { label: params.row.status, color: 'default' };
        
        return (
          <Chip 
            label={status.label} 
            color={status.color}
            size="small"
          />
        );
      }
    },
    {
      field: 'createdAt',
      headerName: 'تاریخ ایجاد',
      width: 150,
      valueGetter: (params: GridValueGetterParams) => {
        try {
          return new Date(params.row.createdAt).toLocaleDateString('fa-IR');
        } catch {
          return 'تاریخ نامعتبر';
        }
      }
    },
    {
      field: 'actions',
      headerName: 'عملیات',
      width: 120,
      renderCell: (params: GridRenderCellParams<Article>) => (
        <Box>
          <Tooltip title="ویرایش">
            <IconButton
              onClick={() => navigate(`/admin/articles/${params.row.id}/edit`)}
              color="primary"
              size="small"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="حذف">
            <IconButton
              onClick={() => handleDelete(params.row.id)}
              color="error"
              size="small"
              disabled={deleteMutation.isLoading}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert 
        severity="error" 
        action={
          <Button color="inherit" size="small" onClick={() => navigate(0)}>
            تلاش مجدد
          </Button>
        }
      >
        خطا در دریافت اطلاعات
      </Alert>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2 
        }}
      >
        <Typography variant="h5" component="h1">
          مدیریت مقالات
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/admin/articles/new')}
          startIcon={<EditIcon />}
        >
          مقاله جدید
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <DataGrid
          rows={articles}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 20, 50]}
          getRowId={(row) => row.id!}
          disableRowSelectionOnClick
          loading={isLoading}
          localeText={{
            noRowsLabel: 'هیچ مقاله‌ای یافت نشد',
            footerRowSelected: (count) => `${count} مقاله انتخاب شده`,
            errorOverlayDefaultLabel: 'خطایی رخ داده است'
          }}
        />
      </Box>
    </Box>
  );
};

export default AdminArticles;