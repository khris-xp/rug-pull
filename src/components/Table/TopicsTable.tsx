import useSnackbarToast from '@/hooks/useSnackbar';
import { topicsService } from '@/services/topics.service';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTopicsList } from '@/store/topics/topics.slice';
import { faAtom } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import Button from '../Button/Button';

export default function TopicsTable() {
  const topics = useAppSelector((state) => state.topics.topicsList);
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbarToast();

  const fetchTopics = useCallback(async () => {
    if (topics.length === 0) {
      const response = await topicsService.getAllTopics();
      dispatch(setTopicsList(response.data));
    }
  }, [dispatch, topics.length]);

  const handleDeleteTopics = async (id: string) => {
    try {
      const response = await topicsService.deleteTopics(id);
      if (response.success) {
        const topics_response = await topicsService.getAllTopics();
        dispatch(setTopicsList(topics_response.data));
        showSnackbar('Topics deleted successfully', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  return (
    <Fragment>
      <div className='flex justify-end items-center mr-10'>
        <Link to='/dashboard/create-topics'>
          <Button
            props={{
              type: 'button',
              icon: faAtom,
              text: 'Create Topics',
            }}
          />
        </Link>
      </div>
      <div className='overflow-x-auto mx-auto container mt-10'>
        <table className='table'>
          <thead>
            <tr className='text-center'>
              <th>Title</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((topics) => (
              <tr key={topics._id} className='text-center'>
                <td>
                  <div className='font-bold'>{topics.title}</div>
                </td>

                <td>{topics.description}</td>
                <td>{topics.createdAt}</td>
                <th>
                  <Link to={`/dashboard/topics/${topics._id}`}>
                    <button className='btn btn-ghost btn-xs'>details</button>
                  </Link>
                  <button
                    className='btn btn-ghost btn-xs text-error'
                    onClick={() => handleDeleteTopics(topics._id)}
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
