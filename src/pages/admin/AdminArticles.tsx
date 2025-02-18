import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  IconButton 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Types for better type safety
interface Article {
  id?: number;
  title: string;
  content: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

// Service functions (assumed to be defined in articleService.ts)
import { 
  getArticles, 
  createArticle, 
  updateArticle, 
  removeArticle 
} from '../../services/articleService';

// Validation schema
const validationSchema = yup.object().shape({
  title: yup.string().required('عنوان الزامی است'),
  content: yup.string().required('محتوا الزامی است'),
  category: yup.string().required('دسته‌بندی الزامی است'),
});

export const AdminArticles: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const queryClient = useQueryClient();

  // Queries and Mutations
  const { 
    data: articles = [], 
    isLoading, 
    error: fetchError 
  } = useQuery<Article[]>(['articles'], getArticles, {
    onError: (error) => {
      console.error('Failed to fetch articles:', error);
      // Optionally add error toast or notification
    }
  });

  const createMutation = useMutation(createArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(['articles']);
      handleClose();
    },
    onError: (error) => {
      console.error('Failed to create article:', error);
      // Optionally add error toast or notification
    }
  });

  const updateMutation = useMutation(updateArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(['articles']);
      handleClose();
    },
    onError: (error) => {
      console.error('Failed to update article:', error);
      // Optionally add error toast or notification
    }
  });

  const deleteMutation = useMutation(removeArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(['articles']);
    },
    onError: (error) => {
      console.error('Failed to delete article:', error);
      // Optionally add error toast or notification
    }
  });

  // Form setup with proper typing
  const { 
    control, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<Article>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: '',
      content: '',
      category: ''
    }
  });

  // Handler functions
  const handleClose = () => {
    setOpen(false);
    setSelectedArticle(null);
    reset();
  };

  const handleOpen = () => {
    reset();
    setSelectedArticle(null);
    setOpen(true);
  };

  const handleEdit = (article: Article) => {
    setSelectedArticle(article);
    reset(article);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    // Add confirmation dialog before deletion
    if (window.confirm('آیا از حذف این مقاله مطمئن هستید؟')) {
      deleteMutation.mutate(id);
    }
  };

  const onSubmit: SubmitHandler<Article> = (data) => {
    if (selectedArticle && selectedArticle.id) {
      // Update existing article
      updateMutation.mutate({
        ...selectedArticle,
        ...data,
        id: selectedArticle.id
      });
    } else {
      // Create new article
      createMutation.mutate(data);
    }
  };

  // Columns with actions
  const columns: GridColDef[] = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 90 
    },
    { 
      field: 'title', 
      headerName: 'عنوان', 
      width: 200 
    },
    { 
      field: 'category', 
      headerName: 'دسته‌بندی', 
      width: 150 
    },
    {
      field: 'createdAt',
      headerName: 'تاریخ ایجاد',
      type: 'date',
      width: 150,
      valueGetter: (params) => new Date(params.value),
    },
    {
      field: 'updatedAt',
      headerName: 'تاریخ بروزرسانی',
      type: 'date',
      width: 150,
      valueGetter: (params) => new Date(params.value),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'عملیات',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="ویرایش"
          className="textPrimary"
          onClick={() => handleEdit(params.row)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="حذف"
          onClick={() => handleDelete(params.row.id)}
          color="error"
        />,
      ],
    },
  ];

  return (
    <div>
      <h2>مدیریت مقالات</h2>
      <Button 
        variant="contained" 
        onClick={handleOpen} 
        sx={{ mb: 2 }}
      >
        ایجاد مقاله جدید
      </Button>

      {/* Error handling for fetch */}
      {fetchError && (
        <div style={{ color: 'red', marginBottom: 16 }}>
          خطا در بارگذاری مقالات: {fetchError.toString()}
        </div>
      )}

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={articles}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          loading={isLoading}
        />
      </div>

      {/* Article Form Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedArticle ? 'ویرایش مقاله' : 'ایجاد مقاله جدید'}
        </DialogTitle>
        <DialogContent>
          {/* Assuming you have an ArticleForm component */}
          <ArticleForm 
            control={control}
            errors={errors}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            لغو
          </Button>
          <Button 
            onClick={handleSubmit(onSubmit)} 
            color="primary" 
            variant="contained"
          >
            ذخیره
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminArticles;

// Placeholder for ArticleForm component (you should replace with your actual implementation)
interface ArticleFormProps {
  control: any;
  errors: any;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ control, errors }) => {
  return (
    <form>
      {/* Implement your form fields here using react-hook-form Controller */}
      {/* Example: 
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="عنوان"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      /> */}
    </form>
  );
};