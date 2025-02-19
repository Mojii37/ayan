import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams
} from '@mui/x-data-grid';
import {
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  IconButton
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
      valueGetter: (params: GridValueGetterParams) => {
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
      valueGetter: (params: GridValueGetterParams) => 
        new Date(params.row.createdAt).toLocaleDateString('fa-IR')
    },
    {
      field: 'actions',
      headerName: 'عملیات',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <IconButton
            onClick={() => navigate(`/admin/articles/${params.row.id}/edit`)}
            color="primary"
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.id)}
            color="error"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
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
        disableSelectionOnClick
      />
    </Box>
  );
};

export default AdminArticles;