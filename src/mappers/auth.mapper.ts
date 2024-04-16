import { LoginDto, RegisterDto } from '@/common/dto/auth.dto';
import { ValidationErrors, ValidationFields } from '@/hooks/useValidate';

export const generateLoginFields = (
  login: LoginDto,
  setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>
): ValidationFields => {
  return {
    email: {
      value: login.email,
      errorSetter: setErrors,
      errorMessage: 'Email is required',
    },
    password: {
      value: login.password,
      errorSetter: setErrors,
      errorMessage: 'Password is required',
    },
  };
};

export const generateRegisterFields = (
  register: RegisterDto,
  setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>
): ValidationFields => {
  return {
    email: {
      value: register.email,
      errorSetter: setErrors,
      errorMessage: 'Email is required',
    },
    password: {
      value: register.password,
      errorSetter: setErrors,
      errorMessage: 'Password is required',
    },
    firstName: {
      value: register.firstName,
      errorSetter: setErrors,
      errorMessage: 'First Name is required',
    },
    lastName: {
      value: register.lastName,
      errorSetter: setErrors,
      errorMessage: 'Last Name is required',
    },
    age: {
      value: register.age,
      errorSetter: setErrors,
      errorMessage: 'Age is required',
    },
  };
};
