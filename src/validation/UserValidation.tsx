import * as yup from 'yup';
export interface IFormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  tc?: boolean;
  image?: HTMLInputElement | string;
  country: string;
}

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, { message: 'Name must start with capital letter' }),
  age: yup
    .number()
    .typeError('Age must be a number')
    .required('Age is required')
    .positive('Age must be a positive number'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character'
    ),
  confirmPassword: yup
    .string()
    .required('Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required('Gender is required'),
  tc: yup.boolean().oneOf([true], 'You must agree to Terms and Conditions'),
  image: yup.mixed().test('fileSize', 'The file is too large', (value) => {
    console.dir(value);
    if (!value) {
      return true;
    }
    const val = value.files ? value.files[0] : value[0];

    return val?.size < 2097152;
  }),
  country: yup.string().required('Country is required'),
});
