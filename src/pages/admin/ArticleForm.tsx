import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface ArticleFormProps {
  control: Control<Article>;
}

export const ArticleForm: React.FC<ArticleFormProps> = ({ control }) => {
  return (
    <div>
      <Controller
        name="title"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField {...field} label="عنوان" fullWidth margin="normal" error={!!error} helperText={error?.message} />
        )}
      />
      <Controller
        name="content"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField {...field} label="محتوا" fullWidth multiline rows={4} margin="normal" error={!!error} helperText={error?.message} />
        )}
      />
      <Controller
        name="category"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth margin="normal" error={!!error}>
            <InputLabel>دسته‌بندی</InputLabel>
            <Select {...field} label="دسته‌بندی">
              <MenuItem value="category1">دسته‌بندی 1</MenuItem>
              <MenuItem value="category2">دسته‌بندی 2</MenuItem>
              <MenuItem value="category3">دسته‌بندی 3</MenuItem>
            </Select>
          </FormControl>
        )}
      />
    </div>
  );
};

export default ArticleForm;