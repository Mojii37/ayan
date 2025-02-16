import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required('نام کاربری الزامی است')
    .min(3, 'نام کاربری باید حداقل 3 کاراکتر باشد'),
  password: yup
    .string()
    .required('رمز عبور الزامی است')
    .min(6, 'رمز عبور باید حداقل 6 کاراکتر باشد'),
});

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required('نام کاربری الزامی است')
    .min(3, 'نام کاربری باید حداقل 3 کاراکتر باشد'),
  email: yup.string().required('ایمیل الزامی است').email('ایمیل معتبر نیست'),
  password: yup
    .string()
    .required('رمز عبور الزامی است')
    .min(6, 'رمز عبور باید حداقل 6 کاراکتر باشد'),
  confirmPassword: yup
    .string()
    .required('تکرار رمز عبور الزامی است')
    .oneOf([yup.ref('password')], 'رمز عبور و تکرار آن باید یکسان باشند'),
});
