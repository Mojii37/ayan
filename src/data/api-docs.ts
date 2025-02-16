// src/data/api-docs.ts
import { APIGroup } from '../types/api-docs';

export const apiDocs: APIGroup[] = [
  {
    name: 'احراز هویت',
    description: 'API‌های مربوط به احراز هویت و مدیریت کاربران',
    endpoints: [
      {
        path: '/api/auth/login',
        method: 'POST',
        description: 'ورود کاربر به سیستم',
        requestBody: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'نام کاربری',
              required: true,
            },
            password: {
              type: 'string',
              description: 'رمز عبور',
              required: true,
            },
          },
        },
        responses: {
          '200': {
            description: 'ورود موفق',
            schema: {
              type: 'object',
              properties: {
                token: { type: 'string' },
                user: { type: 'object' },
              },
            },
          },
          '401': {
            description: 'خطای احراز هویت',
          },
        },
        examples: {
          request: {
            username: 'user@example.com',
            password: '********',
          },
          response: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            user: {
              id: 1,
              username: 'user@example.com',
              name: 'کاربر نمونه',
            },
          },
        },
      },
      // سایر endpoint ها
    ],
  },
  // سایر گروه‌ها
];
