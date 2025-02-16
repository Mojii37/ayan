export interface ValidationRule {
  type: 'required' | 'minLength' | 'email' | 'min' | 'max' | 'pattern';
  message: string;
  params?: number | RegExp | string;
}

export interface Option {
  label: string;
  value: string | number;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'select' | 'date' | 'file' | 'textarea';
  required?: boolean;
  validation?: ValidationRule[];
  options?: Option[];
  defaultValue?: string | number | Date | null;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  rows?: number;
}

export interface FormConfig {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  submitLabel?: string;
  resetLabel?: string;
  layout?: 'vertical' | 'horizontal';
  columns?: 1 | 2 | 3;
}

export type FormValues = Record<string, unknown>;