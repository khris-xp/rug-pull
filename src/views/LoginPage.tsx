import Input from '@/components/Input/Input';
import Spacer from '@/components/Spacer/Spacer';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
          <form action='#' method='POST' className='space-y-4'>
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
            </div>
            <div>
              <button
                type='submit'
                className='w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300'
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className='mt-4 text-sm text-gray-600 text-center'>
            Don't have an account?{' '}
            <a href='#' className='text-black font-medium underline'>
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
