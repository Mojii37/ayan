import React from 'react';
import { DynamicForm } from '../components/form/DynamicForm';
import { FormConfig } from '../types/form';

const formConfig: FormConfig = {
  id: 'user-registration',
  title: 'ثبت‌نام کاربر جدید',
  description: 'لطفاً اطلاعات خود را وارد کنید',
  columns: 2,
  fields: [
    {
      name: 'firstName',
      label: 'نام',
      type: 'text',
      validation: [
        { type: 'required', message: 'نام الزامی است' },
        { type: 'minLength', params: 2, message: 'نام باید حداقل ۲ حرف باشد' },
      ],
    },
    {
      name: 'lastName',
      label: 'نام خانوادگی',
      type: 'text',
      validation: [{ type: 'required', message: 'نام خانوادگی الزامی است' }],
    },
    {
      name: 'email',
      label: 'ایمیل',
      type: 'email',
      validation: [
        { type: 'required', message: 'ایمیل الزامی است' },
        { type: 'email', message: 'ایمیل نامعتبر است' },
      ],
    },
    {
      name: 'password',
      label: 'رمز عبور',
      type: 'password',
      validation: [
        { type: 'required', message: 'رمز عبور الزامی است' },
        {
          type: 'minLength',
          params: 8,
          message: 'رمز عبور باید حداقل ۸ کاراکتر باشد',
        },
      ],
    },
    {
      name: 'role',
      label: 'نقش',
      type: 'select',
      options: [
        { label: 'کاربر عادی', value: 'user' },
        { label: 'مدیر', value: 'admin' },
      ],
      defaultValue: 'user',
    },
    {
      name: 'bio',
      label: 'درباره من',
      type: 'textarea',
      rows: 4,
    },
  ],
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  bio?: string;
};

export const FormExample: React.FC = () => {
  const handleSubmit = async (data: FormData) => {
    try {
      // ارسال داده‌ها به سرور
      console.log('Form data:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <DynamicForm
      config={formConfig}
      onSubmit={handleSubmit}
      initialValues={{
        role: 'user',
      }}
    />
  );
};
