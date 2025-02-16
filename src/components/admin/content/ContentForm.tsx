import React, { Suspense } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-quill/dist/quill.snow.css';
import { Content } from '../../../types/content';
import { useTheme } from '../../../hooks/useTheme';

// Lazy load ReactQuill
const ReactQuill = React.lazy(() => import('react-quill'));

interface ContentFormProps {
  initialValues?: Partial<Content>;
  onSubmit: (values: Partial<Content>) => Promise<void>;
  categories: Array<{ id: string; title: string }>;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required('عنوان الزامی است')
    .min(3, 'عنوان باید حداقل 3 کاراکتر باشد'),
  content: Yup.string()
    .required('محتوا الزامی است')
    .min(10, 'محتوا باید حداقل 10 کاراکتر باشد'),
  categoryId: Yup.string().required('دسته‌بندی الزامی است'),
  status: Yup.string()
    .oneOf(['draft', 'published', 'archived'], 'وضعیت نامعتبر است')
    .required('وضعیت الزامی است'),
});

export const ContentForm: React.FC<ContentFormProps> = ({
  initialValues = {
    title: '',
    content: '',
    categoryId: '',
    status: 'draft',
  },
  onSubmit,
  categories,
}) => {
  const theme = useTheme();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    },
  });

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ direction: 'rtl' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        id="title"
        name="title"
        label="عنوان"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>دسته‌بندی</InputLabel>
        <Select
          id="categoryId"
          name="categoryId"
          value={formik.values.categoryId}
          onChange={formik.handleChange}
          error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
        >
          {categories.map(category => (
            <MenuItem key={category.id} value={category.id}>
              {category.title}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.categoryId && formik.errors.categoryId && (
          <FormHelperText error>{formik.errors.categoryId}</FormHelperText>
        )}
      </FormControl>

      <Box sx={{ mb: 2 }}>
        <Suspense fallback={<div>در حال بارگذاری ویرایشگر...</div>}>
          <ReactQuill
            value={formik.values.content}
            onChange={(value: string) => formik.setFieldValue('content', value)}
            modules={quillModules}
            style={{
              height: '300px',
              marginBottom: '50px',
              direction: 'rtl',
              background: theme.palette.background.paper,
            }}
          />
        </Suspense>
        {formik.touched.content && formik.errors.content && (
          <FormHelperText error>{formik.errors.content}</FormHelperText>
        )}
      </Box>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>وضعیت</InputLabel>
        <Select
          id="status"
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          error={formik.touched.status && Boolean(formik.errors.status)}
        >
          <MenuItem value="draft">پیش‌نویس</MenuItem>
          <MenuItem value="published">منتشر شده</MenuItem>
          <MenuItem value="archived">آرشیو شده</MenuItem>
        </Select>
        {formik.touched.status && formik.errors.status && (
          <FormHelperText error>{formik.errors.status}</FormHelperText>
        )}
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? 'در حال ذخیره...' : 'ذخیره'}
      </Button>
    </Box>
  );
};