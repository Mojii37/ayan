import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Button,
  Grid,
} from '@mui/material';
import { FormConfig, FormField, FormValues } from '../../types/form';

interface DynamicFormProps {
  config: FormConfig;
  onSubmit: (data: FormValues) => void | Promise<void>;
  initialValues?: Partial<FormValues>;
}

const createValidationSchema = (fields: FormField[]) => {
  const schemaFields = fields.reduce<Record<string, yup.AnySchema>>((acc, field) => {
    let validator: yup.AnySchema = yup.mixed();

    if (field.required) {
      validator = validator.required(field.label + ' الزامی است');
    }

    field.validation?.forEach(rule => {
      switch (rule.type) {
        case 'required':
          validator = yup.string().required(rule.message);
          break;
        case 'email':
          validator = yup.string().email(rule.message);
          break;
        case 'min':
          validator = yup.number().min(Number(rule.params), rule.message);
          break;
        case 'max':
          validator = yup.number().max(Number(rule.params), rule.message);
          break;
        case 'minLength':
          validator = yup.string().min(Number(rule.params), rule.message);
          break;
        case 'pattern':
          if (typeof rule.params === 'string') {
            validator = yup.string().matches(new RegExp(rule.params), rule.message);
          }
          break;
      }
    });

    return { ...acc, [field.name]: validator };
  }, {});

  return yup.object().shape(schemaFields);
};

export function DynamicForm({ config, onSubmit, initialValues }: DynamicFormProps) {
  const schema = createValidationSchema(config.fields);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const renderField = (field: FormField) => {
    const isFullWidth = !config.columns || config.columns === 1;
    const gridWidth = 12 / (config.columns || 1);

    return (
      <Grid item xs={12} md={isFullWidth ? 12 : gridWidth} key={field.name}>
        <Controller
          name={field.name}
          control={control}
          defaultValue={field.defaultValue ?? ''}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormControl 
              fullWidth 
              margin="normal" 
              error={!!error}
              disabled={field.disabled}
            >
              {field.type === 'select' ? (
                <>
                  <InputLabel id={`label-${field.name}`}>{field.label}</InputLabel>
                  <Select
                    labelId={`label-${field.name}`}
                    value={value ?? ''}
                    onChange={onChange}
                    label={field.label}
                    multiple={field.multiple}
                  >
                    {field.options?.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {error && <FormHelperText>{error.message}</FormHelperText>}
                </>
              ) : field.type === 'textarea' ? (
                <TextField
                  multiline
                  rows={field.rows || 4}
                  label={field.label}
                  value={value ?? ''}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message}
                  placeholder={field.placeholder}
                />
              ) : (
                <TextField
                  label={field.label}
                  type={field.type}
                  value={value ?? ''}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message}
                  placeholder={field.placeholder}
                />
              )}
            </FormControl>
          )}
        />
      </Grid>
    );
  };

  const handleFormSubmit = (data: FormValues) => {
    onSubmit(data);
  };

  const handleReset = () => {
    reset(initialValues || {});
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <Grid container spacing={2} direction={config.layout === 'horizontal' ? 'row' : 'column'}>
        {config.fields.map(renderField)}
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={config.resetLabel ? 6 : 12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {config.submitLabel || 'ثبت'}
          </Button>
        </Grid>
        {config.resetLabel && (
          <Grid item xs={6}>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleReset}
            >
              {config.resetLabel}
            </Button>
          </Grid>
        )}
      </Grid>
    </form>
  );
}