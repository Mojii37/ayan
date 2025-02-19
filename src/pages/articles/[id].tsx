import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  DataGrid, 
  GridColDef, 
  GridActionsCellItem 
} from '@mui/x-data-grid';
import {
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { articleService } from '../../../services/articleService';
import { Article } from '../../../types/content';

const AdminArticles = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: articles = [], isLoading, error } = useQuery<Article[]>(
    ['admin-articles'],
    articleService.getArticles
  );

  const deleteMutation = useMutation(
    (id: string) => articleService.removeArticle(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['admin-articles']);
      }
    }
  );

  const handleDelete = async (id: string) => {
    if (window.confirm('آیا از حذف این مقاله اطمینان دارید؟')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'عنوان', width: 250 },
    { field: 'categoryId', headerName: 'دسته‌بندی', width: 130 },
    { 
      field: 'status', 
      headerName: 'وضعیت', 
      width: 120,
      valueGetter: (params) => {
        const statusMap: Record<string, string> = {
          draft: 'پیش‌نویس',
          published: 'منتشر شده',
          archived: 'بایگانی شده'
        };
        return statusMap[params.row.status] || params.row.status;
      }
    },
    {
      field: 'createdAt',
      headerName: 'تاریخ ایجاد',
      width: 150,
      valueGetter: (params) => new Date(params.row.createdAt).toLocaleDateString('fa-IR')
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'عملیات',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="ویرایش"
          onClick={() => navigate(`/admin/articles/${params.row.id}/edit`)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="حذف"
          onClick={() => handleDelete(params.row.id!)}
          color="error"
        />
      ]
    }
  ];

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">خطا در دریافت اطلاعات</Alert>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">مدیریت مقالات</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/admin/articles/new')}
        >
          مقاله جدید
        </Button>
      </Box>

      <DataGrid
        rows={articles}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight
        getRowId={(row) => row.id!}
      />
    </Box>
  );
};

export default AdminArticles;