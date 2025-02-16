// src/components/common/FormFields.tsx
import React from 'react';
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.main + '40',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

interface SelectFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  options: Array<{ value: string; label: string }>;
  error?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  value,
  onChange,
  options,
  error,
}) => (
  <FormControl fullWidth error={!!error}>
    <InputLabel>{label}</InputLabel>
    <Select name={name} value={value} onChange={onChange} label={label}>
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
    {error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
);
