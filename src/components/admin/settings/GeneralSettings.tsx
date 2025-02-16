import React, { useState, useCallback, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Avatar,
} from '@mui/material';
import { Edit, Save } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GeneralSettings as GeneralSettingsType } from '../../../types/settings';

interface GeneralSettingsProps {
  settings: GeneralSettingsType;
  onSave: (settings: GeneralSettingsType) => Promise<void>;
}

const validationSchema = Yup.object({
  siteName: Yup.string().required('نام سایت الزامی است'),
  siteDescription: Yup.string().required('توضیحات سایت الزامی است'),
  contactEmail: Yup.string()
    .email('ایمیل نامعتبر است')
    .required('ایمیل تماس الزامی است'),
  contactPhone: Yup.string().required('شماره تماس الزامی است'),
  address: Yup.string().required('آدرس الزامی است'),
});

// Helper function to convert file to base64 string
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (typeof FileReader === 'undefined') {
      reject(new Error('FileReader is not supported in this environment.'));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(
          new Error('Failed to convert file to base64: Result is not a string.')
        );
      }
    };

    reader.onerror = error => {
      reject(new Error(`FileReader error: ${error}`));
    };

    reader.readAsDataURL(file);
  });
};

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  settings,
  onSave,
}) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  // Initialize previews from settings on component mount
  useEffect(() => {
    setLogoPreview(settings.logo || null);
    setFaviconPreview(settings.favicon || null);
  }, [settings.logo, settings.favicon]);

  const formik = useFormik({
    initialValues: {
      ...settings,
      socialMedia: {
        instagram: settings.socialMedia?.instagram || '',
        telegram: settings.socialMedia?.telegram || '',
        whatsapp: settings.socialMedia?.whatsapp || '',
        linkedin: settings.socialMedia?.linkedin || '',
      },
    },
    validationSchema,
    onSubmit: async values => {
      try {
        // Prepare the data to be saved.  Only include logo/favicon if they've changed.
        const saveData: GeneralSettingsType = {
          ...values,
        };

        if (logoPreview !== settings.logo) {
          saveData.logo = logoPreview || ''; // Ensure it's an empty string if null
        }

        if (faviconPreview !== settings.favicon) {
          saveData.favicon = faviconPreview || ''; // Ensure it's an empty string if null
        }

        await onSave(saveData);
      } catch (error) {
        console.error('Error saving settings:', error);
      }
    },
  });

  const handleLogoChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        try {
          const base64String = await fileToBase64(file);
          setLogoPreview(base64String);
        } catch (error) {
          console.error('Error converting logo to base64:', error);
          // Optionally, display an error message to the user
        }
      }
    },
    []
  );

  const handleFaviconChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        try {
          const base64String = await fileToBase64(file);
          setFaviconPreview(base64String);
        } catch (error) {
          console.error('Error converting favicon to base64:', error);
          // Optionally, display an error message to the user
        }
      }
    },
    []
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        تنظیمات عمومی
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={logoPreview || settings.logo}
                  alt="لوگو"
                  sx={{ width: 100, height: 100, mr: 2 }}
                />
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<Edit />}
                >
                  تغییر لوگو
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                </Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src={faviconPreview || settings.favicon}
                  alt="فاوآیکون"
                  sx={{ width: 32, height: 32, mr: 2 }}
                />
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<Edit />}
                >
                  تغییر فاوآیکون
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFaviconChange}
                  />
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="siteName"
              label="نام سایت"
              value={formik.values.siteName}
              onChange={formik.handleChange}
              error={formik.touched.siteName && Boolean(formik.errors.siteName)}
              helperText={formik.touched.siteName && formik.errors.siteName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              name="siteDescription"
              label="توضیحات سایت"
              value={formik.values.siteDescription}
              onChange={formik.handleChange}
              error={
                formik.touched.siteDescription &&
                Boolean(formik.errors.siteDescription)
              }
              helperText={
                formik.touched.siteDescription && formik.errors.siteDescription
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="contactEmail"
              label="ایمیل تماس"
              value={formik.values.contactEmail}
              onChange={formik.handleChange}
              error={
                formik.touched.contactEmail &&
                Boolean(formik.errors.contactEmail)
              }
              helperText={
                formik.touched.contactEmail && formik.errors.contactEmail
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="contactPhone"
              label="شماره تماس"
              value={formik.values.contactPhone}
              onChange={formik.handleChange}
              error={
                formik.touched.contactPhone &&
                Boolean(formik.errors.contactPhone)
              }
              helperText={
                formik.touched.contactPhone && formik.errors.contactPhone
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              name="address"
              label="آدرس"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              شبکه‌های اجتماعی
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="socialMedia.instagram"
                  label="اینستاگرام"
                  value={formik.values.socialMedia.instagram}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="socialMedia.telegram"
                  label="تلگرام"
                  value={formik.values.socialMedia.telegram}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="socialMedia.whatsapp"
                  label="واتس‌اپ"
                  value={formik.values.socialMedia.whatsapp}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="socialMedia.linkedin"
                  label="لینکدین"
                  value={formik.values.socialMedia.linkedin}
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
