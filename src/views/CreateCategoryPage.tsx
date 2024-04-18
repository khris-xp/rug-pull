import Button from '@/components/Button/Button';
import Dropdown from '@/components/Button/Dropdown';
import Input from '@/components/Input/Input';
import Spacer from '@/components/Spacer/Spacer';
import useSnackbarToast from '@/hooks/useSnackbar';
import { categoryService } from '@/services/category.service';
import { setCategoryList } from '@/store/category/category.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Fragment, useState } from 'react';

export default function CreateCategoryPage() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [topics, setTopics] = useState<string>('');
  const [topicsDropdown, setTopicsDropdown] = useState<boolean>(false);
  const topicsStore = useAppSelector((state) => state.topics.topicsList);
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbarToast();

  function toggleTopicsDropdown() {
    setTopicsDropdown(!topicsDropdown);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await categoryService.createCategory({
        name,
        description,
        topics,
      });
      setName('');
      setDescription('');
      setTopics('');
      const category_response = await categoryService.getAllCategory();
      dispatch(setCategoryList(category_response.data));

      if (response.success) {
        showSnackbar('Category created successfully', 'success');
        window.location.href = '/dashboard/category';
      } else {
        showSnackbar('Failed to create category', 'error');
      }
    } catch (error) {
      showSnackbar('Failed to create category', 'error');
    }
  };
  return (
    <Fragment>
      <div className='bg-white p-8 rounded shadow-md max-w-3xl w-full mx-auto mt-10'>
        <h2 className='text-2xl font-semibold mb-4'>Create Category</h2>

        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Category Name
              </label>
              <Spacer margin='my-2' />
              <Input
                props={{
                  variant: 'text',
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  placeholder: 'Category Name',
                  isFull: true,
                }}
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Category Description
              </label>
              <Spacer margin='my-2' />
              <Input
                props={{
                  variant: 'text',
                  value: description,
                  onChange: (e) => setDescription(e.target.value),
                  placeholder: 'Category Description',
                  isFull: true,
                }}
              />
            </div>
          </div>

          <div className='mt-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Category Topics
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
                text: 'Create Category',
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
