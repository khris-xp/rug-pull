import Button from '@/components/Button/Button';
import Dropdown from '@/components/Button/Dropdown';
import InputErrors from '@/components/Errors/InputErrors';
import Input from '@/components/Input/Input';
import Spacer from '@/components/Spacer/Spacer';
import useSnackbarToast from '@/hooks/useSnackbar';
import { useValidate } from '@/hooks/useValidate';
import { generateStatusFields } from '@/mappers/status.mapper';
import { statusService } from '@/services/status.service';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setStatusList } from '@/store/status/status.slice';
import { useState } from 'react';

export default function CreateStatusPage() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [topics, setTopics] = useState<string>('');
  const [topicsDropdown, setTopicsDropdown] = useState<boolean>(false);
  const topicsStore = useAppSelector((state) => state.topics.topicsList);
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbarToast();

  const { validateField, errors, setErrors } = useValidate();

  function toggleTopicsDropdown() {
    setTopicsDropdown(!topicsDropdown);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = generateStatusFields(
      { name, description, topics },
      setErrors
    );
    const validate = validateField(fields);
    try {
      if (!validate) {
        showSnackbar('Please fill in all fields', 'error');
        return;
      } else {
        const response = await statusService.createStatus({
          name,
          description,
          topics,
        });
        setName('');
        setDescription('');
        setTopics('');
        const status_response = await statusService.getAllStatus();
        dispatch(setStatusList(status_response.data));

        if (response.success) {
          showSnackbar('Status created successfully', 'success');
          window.location.href = '/dashboard/status';
        } else {
          showSnackbar('Failed to create status', 'error');
        }
      }
    } catch (error) {
      showSnackbar('Failed to create status', 'error');
    }
  };
  return (
    <div className='bg-white p-8 rounded shadow-md max-w-3xl w-full mx-auto mt-10'>
      <h2 className='text-2xl font-semibold mb-4'>Create Status</h2>

      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Status Name
            </label>
            <Spacer margin='my-2' />
            <Input
              props={{
                variant: 'text',
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: 'Status Name',
                isFull: true,
              }}
            />
            {errors.name && <InputErrors errors={errors.name} />}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Status Description
            </label>
            <Spacer margin='my-2' />
            <Input
              props={{
                variant: 'text',
                value: description,
                onChange: (e) => setDescription(e.target.value),
                placeholder: 'Status Description',
                isFull: true,
              }}
            />
            {errors.description && <InputErrors errors={errors.description} />}
          </div>
        </div>

        <div className='mt-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Status Topics
          </label>
          <Spacer margin='my-2' />
          <Dropdown
            props={{
              onClick: () => toggleTopicsDropdown(),
              text: topics || 'Topics',
              list: topicsStore.map((topic) => topic.title),
              open: topicsDropdown,
              onToggle: () => toggleTopicsDropdown(),
              onSelectItem: (e: string) => setTopics(e),
            }}
          />
        </div>

        <div className='mt-6'>
          <Button
            props={{
              type: 'submit',
              text: 'Create Status',
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
