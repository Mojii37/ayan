// src/components/admin/seo/SEOSettings.tsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  LinearProgress,
} from '@mui/material';
import { Add, Save, Refresh } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SEOData } from '../../../types/seo';

interface SEOSettingsProps {
  data: SEOData;
  onSave: (data: SEOData) => Promise<void>;
  onAnalyze: () => Promise<void>;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required('عنوان الزامی است')
    .max(60, 'عنوان نباید بیشتر از 60 کاراکتر باشد'),
  description: Yup.string()
    .required('توضیحات الزامی است')
    .max(160, 'توضیحات نباید بیشتر از 160 کاراکتر باشد'),
  keywords: Yup.array()
    .min(1, 'حداقل یک کلمه کلیدی وارد کنید')
    .max(10, 'حداکثر 10 کلمه کلیدی مجاز است'),
});

export const SEOSettings: React.FC<SEOSettingsProps> = ({
  data,
  onSave,
  onAnalyze,
}) => {
  const [keyword, setKeyword] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const formik = useFormik({
    initialValues: data,
    validationSchema,
    onSubmit: async values => {
      try {
        await onSave(values);
      } catch (error) {
        console.error('Error saving SEO settings:', error);
      }
    },
  });

  const handleAddKeyword = () => {
    if (keyword && !formik.values.keywords.includes(keyword)) {
      formik.setFieldValue('keywords', [...formik.values.keywords, keyword]);
      setKeyword('');
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    formik.setFieldValue(
      'keywords',
      formik.values.keywords.filter(k => k !== keywordToRemove)
    );
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      await onAnalyze();
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">تنظیمات SEO</Typography>
        <Button
          variant="contained"
          startIcon={<Refresh />}
          onClick={handleAnalyze}
          disabled={analyzing}
        >
          تحلیل SEO
        </Button>
      </Box>

      {analyzing && (
        <Box sx={{ mb: 3 }}>
          <LinearProgress />
          <Typography variant="body2" sx={{ mt: 1 }}>
            در حال تحلیل صفحات...
          </Typography>
        </Box>
      )}

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="title"
              label="عنوان صفحه"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={
                (formik.touched.title && formik.errors.title) ||
                `${formik.values.title.length}/60 کاراکتر`
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              name="description"
              label="توضیحات متا"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                (formik.touched.description && formik.errors.description) ||
                `${formik.values.description.length}/160 کاراکتر`
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="کلمات کلیدی"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleAddKeyword()}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleAddKeyword}>
                      <Add />
                    </IconButton>
                  ),
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {formik.values.keywords.map(k => (
                <Chip
                  key={k}
                  label={k}
                  onDelete={() => handleRemoveKeyword(k)}
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>ایندکس ربات‌ها</InputLabel>
              <Select
                name="robots"
                value={formik.values.robots}
                onChange={formik.handleChange}
              >
                <MenuItem value="index,follow">ایندکس و دنبال کردن</MenuItem>
                <MenuItem value="noindex,nofollow">
                  عدم ایندکس و دنبال نکردن
                </MenuItem>
                <MenuItem value="index,nofollow">ایندکس و دنبال نکردن</MenuItem>
                <MenuItem value="noindex,follow">
                  عدم ایندکس و دنبال کردن
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="canonical"
              label="آدرس canonical"
              value={formik.values.canonical}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              تنظیمات Open Graph
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="openGraph.title"
                  label="عنوان Open Graph"
                  value={formik.values.openGraph.title}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  name="openGraph.description"
                  label="توضیحات Open Graph"
                  value={formik.values.openGraph.description}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="openGraph.image"
                  label="تصویر Open Graph"
                  value={formik.values.openGraph.image}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Save />}
                disabled={formik.isSubmitting}
              >
                ذخیره تنظیمات
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
