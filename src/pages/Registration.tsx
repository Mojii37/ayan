import React from 'react';
import { Container, Paper, Typography, Grid, Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { StyledTextField } from '../components/common/FormFields';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('Required')
    .min(2, 'Must be at least 2 characters'),
  lastName: Yup.string()
    .required('Required')
    .min(2, 'Must be at least 2 characters'),
  email: Yup.string().email('Invalid email').required('Required'),
  mobile: Yup.string()
    .matches(/^09[0-9]{9}$/, 'Invalid phone number')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Must contain letters')
    .matches(/[0-9]/, 'Must contain numbers')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

const RegistrationPage = () => {
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
    onSubmit: async values => {
      try {
        // Submit the form values to the server
        console.log('Form submitted:', values);
        // Add your server submission code here
      } catch (error) {
        console.error('Registration error:', error);
      }
    },
  });

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" color="primary" align="center" gutterBottom>
            Register to Ayan Taraz
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  name="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>

              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  name="email"
                  label="Email"
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
                  label="Mobile Number"
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
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  Register
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
