import React, { useState, useCallback } from 'react';
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
import type { SEOData } from '../../../types/seo';

interface SEOSettingsProps {
  initialData: SEOData;
  onSave: (data: SEOData) => Promise<void>;
  onAnalyze: () => Promise<void>;
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('عنوان الزامی است')
    .max(60, 'عنوان نباید بیشتر از 60 کاراکتر باشد'),
  description: Yup.string()
    .required('توضیحات الزامی است')
    .max(160, 'توضیحات نباید بیشتر از 160 کاراکتر باشد'),
  keywords: Yup.array()
    .of(Yup.string())
    .min(1, 'حداقل یک کلمه کلیدی وارد کنید')
    .max(10, 'حداکثر 10 کلمه کلیدی مجاز است'),
  robots: Yup.string().required('انتخاب وضعیت ربات‌ها الزامی است'),
  canonical: Yup.string().url('آدرس canonical معتبر نیست'),
  metaTags: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required(),
      content: Yup.string().required(),
    })
  ),
  openGraph: Yup.object().shape({
    title: Yup.string().required('عنوان Open Graph الزامی است'),
    description: Yup.string().required('توضیحات Open Graph الزامی است'),
    image: Yup.string().url('آدرس تصویر Open Graph معتبر نیست'),
    url: Yup.string().url('آدرس URL معتبر نیست'),
    type: Yup.string().oneOf(['website', 'article']),
  }),
  schema: Yup.object(),
});

export const SEOSettings: React.FC<SEOSettingsProps> = ({
  initialData,
  onSave,
  onAnalyze,
}) => {
  const [keyword, setKeyword] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const formik = useFormik({
    initialValues: initialData,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSave(values);
      } catch (error) {
        console.error('Error saving SEO settings:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleAddKeyword = useCallback(() => {
    if (keyword && !formik.values.keywords.includes(keyword)) {
      formik.setFieldValue('keywords', [...formik.values.keywords, keyword]);
      setKeyword('');
    }
  }, [keyword, formik.values.keywords, formik.setFieldValue]);

  const handleRemoveKeyword = useCallback((keywordToRemove: string) => {
    formik.setFieldValue(
      'keywords',
      formik.values.keywords.filter(k => k !== keywordToRemove)
    );
  }, [formik.values.keywords, formik.setFieldValue]);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      await onAnalyze();
    } finally {
      setAnalyzing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
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
              onBlur={formik.handleBlur}
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
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
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
                onChange={(e) => setKeyword(e.target.value)}
                onKeyPress={handleKeyPress}
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
              {formik.values.keywords.map((k) => (
                <Chip
                  key={k}
                  label={k}
                  onDelete={() => handleRemoveKeyword(k)}
                />
              ))}
            </Box>
            {formik.touched.keywords && formik.errors.keywords && (
              <Typography color="error" variant="caption">
                {String(formik.errors.keywords)}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>ایندکس ربات‌ها</InputLabel>
              <Select
                name="robots"
                value={formik.values.robots}
                label="ایندکس ربات‌ها"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.robots && Boolean(formik.errors.robots)}
              >
                <MenuItem value="index,follow">ایندکس و دنبال کردن</MenuItem>
                <MenuItem value="noindex,nofollow">عدم ایندکس و دنبال نکردن</MenuItem>
                <MenuItem value="index,nofollow">ایندکس و دنبال نکردن</MenuItem>
                <MenuItem value="noindex,follow">عدم ایندکس و دنبال کردن</MenuItem>
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
              onBlur={formik.handleBlur}
              error={formik.touched.canonical && Boolean(formik.errors.canonical)}
              helperText={formik.touched.canonical && formik.errors.canonical}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              تنظیمات Open Graph
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="openGraph.title"
                  label="عنوان Open Graph"
                  value={formik.values.openGraph.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.openGraph?.title &&
                    Boolean(formik.errors.openGraph?.title)
                  }
                  helperText={
                    formik.touched.openGraph?.title && formik.errors.openGraph?.title
                  }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="openGraph.description"
                  label="توضیحات Open Graph"
                  value={formik.values.openGraph.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.openGraph?.description &&
                    Boolean(formik.errors.openGraph?.description)
                  }
                  helperText={
                    formik.touched.openGraph?.description &&
                    formik.errors.openGraph?.description
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="openGraph.image"
                  label="تصویر Open Graph"
                  value={formik.values.openGraph.image}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.openGraph?.image &&
                    Boolean(formik.errors.openGraph?.image)
                  }
                  helperText={
                    formik.touched.openGraph?.image && formik.errors.openGraph?.image
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>نوع Open Graph</InputLabel>
                  <Select
                    name="openGraph.type"
                    value={formik.values.openGraph.type}
                    label="نوع Open Graph"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value="website">وب‌سایت</MenuItem>
                    <MenuItem value="article">مقاله</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Save />}
                disabled={formik.isSubmitting || analyzing}
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

export default SEOSettings