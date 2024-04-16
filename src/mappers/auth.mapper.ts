import { LoginDto } from '@/common/dto/auth.dto';
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
