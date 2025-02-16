// src/pages/Consultation.tsx
import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { StyledTextField, SelectField } from '../components/common/FormFields';

const steps = ['انتخاب نوع مشاوره', 'انتخاب زمان', 'اطلاعات تماس'];

const consultationTypes = [
  { value: 'tax', label: 'مشاوره مالیاتی' },
  { value: 'accounting', label: 'مشاوره حسابداری' },
  { value: 'business', label: 'مشاوره کسب و کار' },
  { value: 'financial', label: 'مشاوره مالی' },
];

const validationSchema = Yup.object({
  consultationType: Yup.string().required('نوع مشاوره الزامی است'),
  date: Yup.date().required('تاریخ الزامی است'),
  time: Yup.string().required('ساعت الزامی است'),
  name: Yup.string().required('نام الزامی است'),
  phone: Yup.string()
    .matches(/^09[0-9]{9}$/, 'شماره موبایل نامعتبر است')
    .required('شماره موبایل الزامی است'),
  description: Yup.string(),
});

const ConsultationPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      consultationType: '',
      date: '',
      time: '',
      name: '',
      phone: '',
      description: '',
    },
    validationSchema,
    onSubmit: async values => {
      try {
        // ارسال اطلاعات به سرور
        console.log('Consultation form submitted:', values);
        // اینجا کد ارسال به سرور را اضافه کنید
      } catch (error) {
        console.error('Consultation booking error:', error);
      }
    },
  });

  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" color="primary" align="center" gutterBottom>
            رزرو مشاوره
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              {activeStep === 0 && (
                <>
                  <Grid item xs={12}>
                    <SelectField
                      name="consultationType"
                      label="نوع مشاوره"
                      value={formik.values.consultationType}
                      onChange={formik.handleChange}
                      options={consultationTypes}
                      error={
                        formik.touched.consultationType &&
                        formik.errors.consultationType
                      }
                    />
                  </Grid>
                </>
              )}

              {activeStep === 1 && (
                <>
                  <Grid item xs={12} md={6}>
                    <StyledTextField
                      fullWidth
                      name="date"
                      label="تاریخ"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formik.values.date}
                      onChange={formik.handleChange}
                      error={formik.touched.date && Boolean(formik.errors.date)}
                      helperText={formik.touched.date && formik.errors.date}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StyledTextField
                      fullWidth
                      name="time"
                      label="ساعت"
                      type="time"
                      InputLabelProps={{ shrink: true }}
                      value={formik.values.time}
                      onChange={formik.handleChange}
                      error={formik.touched.time && Boolean(formik.errors.time)}
                      helperText={formik.touched.time && formik.errors.time}
                    />
                  </Grid>
                </>
              )}

              {activeStep === 2 && (
                <>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      name="name"
                      label="نام و نام خانوادگی"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      name="phone"
                      label="شماره موبایل"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.phone && Boolean(formik.errors.phone)
                      }
                      helperText={formik.touched.phone && formik.errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      name="description"
                      label="توضیحات"
                      multiline
                      rows={4}
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 2,
                  }}
                >
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    مرحله قبل
                  </Button>
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={formik.isSubmitting}
                    >
                      ثبت درخواست
                    </Button>
                  ) : (
                    <Button variant="contained" onClick={handleNext}>
                      مرحله بعد
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default ConsultationPage;
