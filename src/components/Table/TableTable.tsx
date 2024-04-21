import useSnackbarToast from '@/hooks/useSnackbar';
import { tableService } from '@/services/table.service';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTableList } from '@/store/table/table.slice';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { formatDateDifference } from '@/libs/date';

export default function TableTable() {
  const tables = useAppSelector((state) => state.table.tableList);
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbarToast();

  const fetchTables = useCallback(async () => {
    if (tables.length === 0) {
      const response = await tableService.getAllTable();
      dispatch(setTableList(response.data));
    }
  }, [dispatch, tables.length]);

  const handleDeleteTable = async (id: string) => {
    try {
      const response = await tableService.deleteTable(id);
      if (response.success) {
        const table_response = await tableService.getAllTable();
        dispatch(setTableList(table_response.data));
        showSnackbar('Table deleted successfully', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);
  return (
    <>
      <div className='flex justify-end items-center mr-10'>
        <Link to='/dashboard/create-table'>
          <Button
            props={{
              type: 'button',
              icon: faTable,
              text: 'Create Table',
            }}
          />
        </Link>
      </div>
      <div className='overflow-x-auto mx-auto container mt-10'>
        <table className='table'>
          <thead>
            <tr className='text-center'>
              <th>Table Number</th>
              <th>Capacity</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => (
              <tr key={table._id} className='text-center'>
                <td>
                  <div className='font-bold'>{table.number}</div>
                </td>
                <td>{table.capacity}</td>
                <td>{formatDateDifference(table.createdAt)}</td>
                <th>
                  <Link to={`/dashboard/table/${table._id}`}>
                    <button className='btn btn-ghost btn-xs'>details</button>
                  </Link>
                  <button
                    className='btn btn-ghost btn-xs text-error'
                    onClick={() => handleDeleteTable(table._id)}
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
