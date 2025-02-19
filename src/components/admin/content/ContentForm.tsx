import React from 'react';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ContentFormData } from '../../../types/content';

const validationSchema = Yup.object({
  title: Yup.string().required('عنوان الزامی است'),
  type: Yup.string().required('نوع محتوا الزامی است'),
  content: Yup.string().required('محتوا الزامی است'),
  status: Yup.string().oneOf(['draft', 'published']).required('وضعیت الزامی است')
});

const initialValues: ContentFormData = {
  title: '',
  type: '',
  content: '',
  status: 'draft'
};

interface ContentFormProps {
  onSubmit?: (data: ContentFormData) => Promise<void>;
}

export const ContentForm: React.FC<ContentFormProps> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (onSubmit) {
        await onSubmit(values);
      }
    }
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        fullWidth
        id="title"
        name="title"
        label="عنوان"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />

      <FormControl fullWidth>
        <InputLabel>نوع محتوا</InputLabel>
        <Select
          id="type"
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.type && Boolean(formik.errors.type)}
          label="نوع محتوا"
        >
          <MenuItem value="article">مقاله</MenuItem>
          <MenuItem value="news">خبر</MenuItem>
          <MenuItem value="page">صفحه</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        multiline
        rows={4}
        id="content"
        name="content"
        label="محتوا"
        value={formik.values.content}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.content && Boolean(formik.errors.content)}
        helperText={formik.touched.content && formik.errors.content}
      />

      <FormControl fullWidth>
        <InputLabel>وضعیت</InputLabel>
        <Select
          id="status"
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.status && Boolean(formik.errors.status)}
          label="وضعیت"
        >
          <MenuItem value="draft">پیش‌نویس</MenuItem>
          <MenuItem value="published">منتشر شده</MenuItem>
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary" disabled={!formik.isValid || formik.isSubmitting}>
        ثبت محتوا
      </Button>
    </Box>
  );
};