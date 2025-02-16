import { Box, TextField, Button } from '@mui/material';
import { FormEvent, useState } from 'react';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      data-testid="login-form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1,
        border: 1,
        borderColor: 'primary.dark',
      }}
    >
      <TextField
        id="username"
        name="username"
        label="نام کاربری"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        inputProps={{
          'aria-label': 'نام کاربری',
        }}
      />
      <TextField
        id="password"
        name="password"
        label="رمز عبور"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        inputProps={{
          'aria-label': 'رمز عبور',
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        ورود
      </Button>
    </Box>
  );
};