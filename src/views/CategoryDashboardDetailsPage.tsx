import Button from '@/components/Button/Button';
import Dropdown from '@/components/Button/Dropdown';
import InputErrors from '@/components/Errors/InputErrors';
import Input from '@/components/Input/Input';
import Spacer from '@/components/Spacer/Spacer';
import useSnackbarToast from '@/hooks/useSnackbar';
import { useValidate } from '@/hooks/useValidate';
import { generateCategoryFields } from '@/mappers/category.mapper';
import { categoryService } from '@/services/category.service';
import { setCategoryList } from '@/store/category/category.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CategoryDashboardDetailsPage() {
  const { id } = useParams();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [topics, setTopics] = useState<string>('');
  const [topicsDropdown, setTopicsDropdown] = useState<boolean>(false);
  const topicsStore = useAppSelector((state) => state.topics.topicsList);
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbarToast();
  const { validateField, errors, setErrors } = useValidate();

  const fetchCategory = useCallback(async () => {
    const response = await categoryService.getCategoryById(id);
    setName(response.data.name);
    setDescription(response.data.description);
    setTopics(response.data.topics);
  }, [id]);

  function toggleTopicsDropdown() {
    setTopicsDropdown(!topicsDropdown);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const fields = generateCategoryFields(
        { name, description, topics },
        setErrors
      );

      const validate = validateField(fields);

      if (!validate) {
        showSnackbar('Please fill in all fields', 'error');
        return;
      } else {
        const response = await categoryService.updateCategory(id, {
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
          showSnackbar('Category edit successfully', 'success');
          window.location.href = '/dashboard/category';
        } else {
          showSnackbar('Failed to edit status', 'error');
        }
      }
    } catch (error) {
      showSnackbar('Failed to edit status', 'error');
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);
  return (
    <div className='bg-white p-8 rounded shadow-md max-w-3xl w-full mx-auto mt-10'>
      <h2 className='text-2xl font-semibold mb-4'>Edit Category</h2>
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
            {errors.name && <InputErrors errors={errors.name} />}
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
                placeholder: 'Category Name',
                isFull: true,
              }}
            />
            {errors.description && <InputErrors errors={errors.description} />}
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
          {errors.topics && <InputErrors errors={errors.topics} />}
        </div>

        <div className='mt-6'>
          <Button
            props={{
              type: 'submit',
              text: 'Edit Category',
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
