import Button from '@/components/Button/Button';
import InputErrors from '@/components/Errors/InputErrors';
import Input from '@/components/Input/Input';
import Spacer from '@/components/Spacer/Spacer';
import useSnackbarToast from '@/hooks/useSnackbar';
import { useValidate } from '@/hooks/useValidate';
import { generateRegisterFields } from '@/mappers/auth.mapper';
import { authService } from '@/services/auth.service';
import { userService } from '@/services/user.service';
import { setAuthState } from '@/store/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

export default function RegisterPage() {
  const userData = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const { showSnackbar } = useSnackbarToast();

  const { validateField, errors, setErrors } = useValidate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    const registerRequest = { firstName, lastName, email, password, age };
    const fields = generateRegisterFields(registerRequest, setErrors);
    validateField(fields);
    try {
      if (!email || !password || !firstName || !lastName || !age) {
        showSnackbar('Please fill in all fields', 'error');
      } else {
        const registerRequest = { firstName, lastName, email, password, age };
        const response = await authService.register(registerRequest);
        if (response.success) {
          Cookies.set('token', response.data.accessToken);
          const user = await userService.getUser();
          dispatch(
            setAuthState({
              user: user.data,
              accessToken: response.data.accessToken,
            })
          );
          showSnackbar('Register successfully.', 'success');
        } else {
          showSnackbar('Failed to register', 'error');
        }
      }
    } catch (error) {
      showSnackbar('Failed to register', 'error');
    }
  };

  useEffect(() => {
    if (userData) {
      window.location.href = '/';
    }
  }, [userData]);
  return (
    <div className='flex min-h-screen'>
      <div className='hidden lg:flex items-center justify-center flex-1 bg-white text-black'>
        <div className='max-w-md text-center'>
          <img src='/assets/login.svg' />
        </div>
      </div>
      <div className='w-full bg-gray-100 lg:w-1/2 flex items-center justify-center'>
        <div className='max-w-md w-full p-6'>
          <h1 className='text-3xl font-semibold mb-6 text-black text-center'>
            Sign Up
          </h1>
          <h1 className='text-sm font-semibold mb-6 text-gray-500 text-center'>
            Join to Our Community with all time access and free{' '}
          </h1>
          <form onSubmit={handleRegister} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                First Name
              </label>
              <Spacer margin='my-2' />
              <Input
                props={{
                  variant: 'text',
                  value: firstName,
                  onChange: (e) => setFirstName(e.target.value),
                  placeholder: 'Enter your First Name',
                  isFull: true,
                }}
              />
              {errors.firstName && <InputErrors errors={errors.firstName} />}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Last Name
              </label>
              <Spacer margin='my-2' />
              <Input
                props={{
                  variant: 'text',
                  value: lastName,
                  onChange: (e) => setLastName(e.target.value),
                  placeholder: 'Enter your Last Name',
                  isFull: true,
                }}
              />
              {errors.lastName && <InputErrors errors={errors.lastName} />}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Email
              </label>
              <Spacer margin='my-2' />
              <Input
                props={{
                  variant: 'email',
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  placeholder: 'Enter your email',
                  isFull: true,
                }}
              />
              {errors.email && <InputErrors errors={errors.email} />}
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <Spacer margin='my-2' />
              <Input
                props={{
                  variant: 'password',
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  placeholder: 'Enter your password',
                  isFull: true,
                }}
              />
              {errors.password && <InputErrors errors={errors.password} />}
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Age
              </label>
              <Spacer margin='my-2' />
              <Input
                props={{
                  variant: 'number',
                  value: age,
                  onChange: (e) => setAge(parseInt(e.target.value)),
                  placeholder: 'Enter your age',
                  isFull: true,
                }}
              />
              {errors.age && <InputErrors errors={errors.age} />}
            </div>
            <Spacer margin='mt-3' />
            <Button
              variant={{
                textColor: 'text-white',
                isHover: true,
                padding: 'w-full px-5 py-2.5',
                fontWeight: 'font-normal',
                borderRadius: 'rounded-lg',
                color: 'bg-primary',
                textAlign: 'center',
                textSize: 'text-base',
              }}
              props={{
                text: 'Sign Up',
                type: 'submit',
              }}
            />
          </form>
          <div className='mt-4 text-sm text-gray-600 text-center'>
            Already have an account?{' '}
            <a href='/login' className='text-black font-medium underline'>
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
