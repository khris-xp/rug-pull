import useSnackbarToast from '@/hooks/useSnackbar';
import { categoryService } from '@/services/category.service';
import { setCategoryList } from '@/store/category/category.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';
import { Fragment, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

export default function CategoryTable() {
  const category = useAppSelector((state) => state.categories.categoryList);
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbarToast();

  const fetchCategory = useCallback(async () => {
    if (category.length === 0) {
      const response = await categoryService.getAllCategory();
      dispatch(setCategoryList(response.data));
    }
  }, [dispatch, category.length]);

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await categoryService.deleteCategory(id);
      if (response.success) {
        const category_response = await categoryService.getAllCategory();
        dispatch(setCategoryList(category_response.data));
        showSnackbar('Category deleted successfully', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);
  return (
    <Fragment>
      <div className='flex justify-end items-center mr-10'>
        <Link to='/dashboard/create-category'>
          <Button
            props={{
              type: 'button',
              icon: faCaretSquareRight,
              text: 'Create Category',
            }}
          />
        </Link>
      </div>
      <div className='overflow-x-auto mx-auto container mt-10'>
        <table className='table'>
          <thead>
            <tr className='text-center'>
              <th>Name</th>
              <th>Description</th>
              <th>Topics</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {category.map((category) => (
              <tr key={category._id} className='text-center'>
                <td>
                  <div className='font-bold'>{category.name}</div>
                </td>
                <td>{category.description}</td>
                <td>{category.topics}</td>
                <td>{category.createdAt}</td>
                <th>
                  <Link to={`/dashboard/category/${category._id}`}>
                    <button className='btn btn-ghost btn-xs'>details</button>
                  </Link>
                  <button
                    className='btn btn-ghost btn-xs text-error'
                    onClick={() => handleDeleteCategory(category._id)}
                  >
                    delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
