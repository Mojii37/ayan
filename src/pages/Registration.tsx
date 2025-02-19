import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Grid, 
  Button, 
  Box, 
  IconButton, 
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { StyledTextField } from '../components/common/FormFields';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('نام الزامی است')
    .min(2, 'نام باید حداقل 2 کاراکتر باشد'),
  lastName: Yup.string()
    .required('نام خانوادگی الزامی است')    
    .min(2, 'نام خانوادگی باید حداقل 2 کاراکتر باشد'),
  email: Yup.string()
    .email('ایمیل نامعتبر است')
    .required('ایمیل الزامی است'),
  mobile: Yup.string()
    .matches(/^09[0-9]{9}$/, 'شماره موبایل نامعتبر است')
    .required('شماره موبایل الزامی است'),
  password: Yup.string()
    .min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد')
    .matches(/[a-zA-Z]/, 'رمز عبور باید شامل حروف انگلیسی باشد')
    .matches(/[0-9]/, 'رمز عبور باید شامل اعداد باشد')
    .required('رمز عبور الزامی است'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'رمزهای عبور مطابقت ندارند') 
    .required('تکرار رمز عبور الزامی است'),
});

const RegistrationPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '', 
      mobile: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Submit the form values to the server
        console.log('اطلاعات ثبت‌نام:', values);
        // Add your server submission code here
      } catch (error) {
        console.error('خطای ثبت‌نام:', error);
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' 
          }}
        >
          <Typography variant="h4" color="primary" align="center" gutterBottom>
            ثبت‌نام در آیان تراز
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  name="firstName"
                  label="نام"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  name="lastName" 
                  label="نام خانوادگی"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}  
                />
              </Grid>

              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  name="email"
                  label="ایمیل"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />  
              </Grid>

              <Grid item xs={12}>
                <StyledTextField 
                  fullWidth
                  name="mobile"
                  label="شماره موبایل"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                  helperText={formik.touched.mobile && formik.errors.mobile}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  name="password"
                  label="رمز عبور"
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledTextField  
                  fullWidth
                  name="confirmPassword"
                  label="تکرار رمز عبور"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  color="primary" 
                  type="submit"
                  sx={{ py: 1.5 }}
                >
                  ثبت‌نام
                </Button>  
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegistrationPage;