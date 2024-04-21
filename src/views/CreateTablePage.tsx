import Button from '@/components/Button/Button';
import InputErrors from '@/components/Errors/InputErrors';
import Input from '@/components/Input/Input';
import Spacer from '@/components/Spacer/Spacer';
import useSnackbarToast from '@/hooks/useSnackbar';
import { useValidate } from '@/hooks/useValidate';
import { generateTableFields } from '@/mappers/table.mapper';
import { tableService } from '@/services/table.service';
import { useAppDispatch } from '@/store/hooks';
import { setTableList } from '@/store/table/table.slice';
import { useState } from 'react';

export default function CreateTablePage() {
  const [number, setNumber] = useState<string>('');
  const [capacity, setCapacity] = useState<number>();
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbarToast();
  const { validateField, errors, setErrors } = useValidate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (capacity) {
        const fields = generateTableFields({ number, capacity }, setErrors);
        const validate = validateField(fields);
        if (!validate) {
          showSnackbar('Please fill in all fields', 'error');
          return;
        } else {
          const response = await tableService.createTable({ number, capacity });
          setNumber('');
          setCapacity(0);
          const table_response = await tableService.getAllTable();
          dispatch(setTableList(table_response.data));

          if (response.success) {
            showSnackbar('Table created successfully', 'success');
            window.location.href = '/dashboard/table';
          } else {
            showSnackbar('Failed to create table', 'error');
          }
        }
      }
    } catch (error) {
      showSnackbar('Failed to create table', 'error');
    }
  };
  return (
    <div className='bg-white p-8 rounded shadow-md max-w-3xl w-full mx-auto mt-10'>
      <h2 className='text-2xl font-semibold mb-4'>Create Table</h2>

      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Table Number
            </label>
            <Spacer margin='my-2' />
            <Input
              props={{
                variant: 'text',
                value: number,
                onChange: (e) => setNumber(e.target.value),
                placeholder: 'Table Number',
                isFull: true,
              }}
            />
            {errors.number && <InputErrors errors={errors.number} />}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Table Capacity
            </label>
            <Spacer margin='my-2' />
            <Input
              props={{
                variant: 'number',
                value: capacity,
                onChange: (e) => setCapacity(Number(e.target.value)),
                placeholder: 'Table capacity',
                isFull: true,
              }}
            />
            {errors.capacity && <InputErrors errors={errors.capacity} />}
          </div>
        </div>

        <div className='mt-6'>
          <Button
            props={{
              type: 'submit',
              text: 'Create Table',
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
  );
}
