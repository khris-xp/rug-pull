import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Spacer from '@/components/Spacer/Spacer';
import useSnackbarToast from '@/hooks/useSnackbar';
import { topicsService } from '@/services/topics.service';
import { useAppDispatch } from '@/store/hooks';
import { setTopicsList } from '@/store/topics/topics.slice';
import { useState } from 'react';

export default function CreateTopicsPage() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbarToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await topicsService.createTopics({ title, description });
      setTitle('');
      setDescription('');
      const topics_response = await topicsService.getAllTopics();
      dispatch(setTopicsList(topics_response.data));

      if (response.success) {
        showSnackbar('Topics created successfully', 'success');
        window.location.href = '/dashboard/topics';
      } else {
        showSnackbar('Failed to create topics', 'error');
      }
    } catch (error) {
      showSnackbar('Failed to create topics', 'error');
    }
  };
  return (
    <div className='bg-white p-8 rounded shadow-md max-w-3xl w-full mx-auto mt-10'>
      <h2 className='text-2xl font-semibold mb-4'>Create Topics</h2>

      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Topics Title
            </label>
            <Spacer margin='my-2' />
            <Input
              props={{
                variant: 'text',
                value: title,
                onChange: (e) => setTitle(e.target.value),
                placeholder: 'Topics Title',
                isFull: true,
              }}
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Description
            </label>
            <Spacer margin='my-2' />
            <Input
              props={{
                variant: 'text',
                value: description,
                onChange: (e) => setDescription(e.target.value),
                placeholder: 'Topics Description',
                isFull: true,
              }}
            />
          </div>
        </div>

        <div className='mt-6'>
          <Button
            props={{
              type: 'submit',
              text: 'Create Topics',
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
