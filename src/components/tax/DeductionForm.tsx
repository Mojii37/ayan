import { Grid, TextField, Button, Typography } from '@mui/material';

export const DeductionForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Deductions</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label="Charitable Donations" type="number" />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label="Medical Expenses" type="number" />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label="Education Expenses" type="number" />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary">
          Update Deductions
        </Button>
      </Grid>
    </Grid>
  );
};
