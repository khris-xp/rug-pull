import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Spacer from '@/components/Spacer/Spacer';
import useSnackbarToast from '@/hooks/useSnackbar';
import { tableService } from '@/services/table.service';
import { useAppDispatch } from '@/store/hooks';
import { setTableList } from '@/store/table/table.slice';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function TabldeDasboardDetailsPage() {
  const { id } = useParams();
  const [number, setNumber] = useState('');
  const [capacity, setCapacity] = useState(0);
  const { showSnackbar } = useSnackbarToast();

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await tableService.updateTable(id, {
        number,
        capacity,
      });
      setNumber('');
      setCapacity(0);
      const table_response = await tableService.getAllTable();
      dispatch(setTableList(table_response.data));

      if (response.success) {
        showSnackbar('Table edit successfully', 'success');
        window.location.href = '/dashboard/table';
      } else {
        showSnackbar('Failed to edit table', 'error');
      }
    } catch (error) {
      showSnackbar('Failed to edit table', 'error');
    }
  };

  const fetchTable = useCallback(async () => {
    const response = await tableService.getTableById(id);
    setNumber(response.data.number);
    setCapacity(response.data.capacity);
  }, [id]);

  useEffect(() => {
    fetchTable();
  }, [fetchTable]);

  return (
    <>
      <div className='bg-white p-8 rounded shadow-md max-w-3xl w-full mx-auto mt-10'>
        <h2 className='text-2xl font-semibold mb-4'>Edit Table</h2>

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
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Table Capacity
              </label>
              <Spacer margin='my-2' />
              <Input
                props={{
                  variant: 'text',
                  value: capacity,
                  onChange: (e) => setCapacity(Number(e.target.value)),
                  placeholder: 'Table capacity',
                  isFull: true,
                }}
              />
            </div>
          </div>

          <div className='mt-6'>
            <Button
              props={{
                type: 'submit',
                text: 'Edit Table',
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
    </>
  );
}
