import useSnackbarToast from '@/hooks/useSnackbar';
import { statusService } from '@/services/status.service';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setStatusList } from '@/store/status/status.slice';
import { faDemocrat } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

export default function StatusTable() {
  const status = useAppSelector((state) => state.status.statusList);
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbarToast();

  const fetchStatus = useCallback(async () => {
    if (status.length === 0) {
      const response = await statusService.getAllStatus();
      dispatch(setStatusList(response.data));
    }
  }, [dispatch, status.length]);

  const handleDeleteStatus = async (id: string) => {
    try {
      const response = await statusService.deleteStatus(id);
      if (response.success) {
        const status_response = await statusService.getAllStatus();
        dispatch(setStatusList(status_response.data));
        showSnackbar('Status deleted successfully', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return (
    <>
      <div className='flex justify-end items-center mr-10'>
        <Link to='/dashboard/create-status'>
          <Button
            props={{
              type: 'button',
              icon: faDemocrat,
              text: 'Create Status',
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
            {status.map((status) => (
              <tr key={status._id} className='text-center'>
                <td>
                  <div className='font-bold'>{status.name}</div>
                </td>{' '}
                <td>{status.description}</td>
                <td>{status.topics}</td>
                <td>{status.createdAt}</td>
                <th>
                  <Link to={`/dashboard/status/${status._id}`}>
                    <button className='btn btn-ghost btn-xs'>details</button>
                  </Link>
                  <button
                    className='btn btn-ghost btn-xs text-error'
                    onClick={() => handleDeleteStatus(status._id)}
                  >
                    delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
