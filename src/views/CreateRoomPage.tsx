import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Spacer from '@/components/Spacer/Spacer';
import { Fragment, useState } from 'react';

export default function CreateRoomPage() {
  const [name, setName] = useState<string>('');
  const [capacity, setCapacity] = useState<number>();
  return (
    <Fragment>
      <div className='bg-white p-8 rounded shadow-md max-w-3xl w-full mx-auto mt-10'>
        <h2 className='text-2xl font-semibold mb-4'>Create Room</h2>

        <form action='#' method='POST'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Room Name
              </label>
              <Spacer margin='my-2' />
              <Input
                props={{
                  variant: 'text',
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  placeholder: 'Room Name',
                  isFull: true,
                }}
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Capacity
              </label>
              <Spacer margin='my-2' />
              <Input
                props={{
                  variant: 'number',
                  value: capacity,
                  onChange: (e) => setCapacity(Number(e.target.value)),
                  placeholder: 'Capacity',
                  isFull: true,
                }}
              />
            </div>
          </div>

          <div className='mt-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Room Status
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='mt-1 p-2 w-full border rounded-md'
            />
          </div>

          <div className='mt-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Select Room Table
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='mt-1 p-2 w-full border rounded-md'
            />
          </div>

          <div className='mt-6'>
            <Button
              props={{
                type: 'submit',
                text: 'Create Room',
              }}
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
            />
          </div>
        </form>
      </div>
    </Fragment>
  );
}
