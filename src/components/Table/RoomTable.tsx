import useSnackbarToast from '@/hooks/useSnackbar';
import { roomService } from '@/services/room.service';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setRoomList } from '@/store/room/room.slice';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

export default function RoomTable() {
  const rooms = useAppSelector((state) => state.rooms.roomList);
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbarToast();

  const fetchRooms = useCallback(async () => {
    if (rooms.length === 0) {
      const response = await roomService.getAllRoom();
      dispatch(setRoomList(response.data));
    }
  }, [dispatch, rooms.length]);

  const handleDeleteTable = async (id: string) => {
    try {
      const response = await roomService.deleteRoom(id);
      if (response.success) {
        const room_response = await roomService.getAllRoom();
        dispatch(setRoomList(room_response.data));
        showSnackbar('Room deleted successfully', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return (
    <>
      <div className='flex justify-end items-center mr-10'>
        <Link to='/dashboard/create-room'>
          <Button
            props={{
              type: 'button',
              icon: faDoorOpen,
              text: 'Create Room',
            }}
          />
        </Link>
      </div>
      <div className='overflow-x-auto mx-auto container mt-10'>
        <table className='table'>
          <thead>
            <tr className='text-center'>
              <th>Name</th>
              <th>Capacity</th>
              <th>Tables Amount</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id} className='text-center'>
                <td>
                  <div className='font-bold'>{room.name}</div>
                </td>
                <td>
                  {room.capacity} people
                  <br />
                  <span className='badge badge-ghost badge-sm'>
                    {room.status}
                  </span>
                </td>
                <td>{room.tables.length}</td>
                <td>{room.createdAt}</td>
                <th>
                  <Link to={`/dashboard/room/${room._id}`}>
                    <button className='btn btn-ghost btn-xs'>details</button>
                  </Link>
                  <button
                    onClick={() => handleDeleteTable(room._id)}
                    className='btn btn-ghost btn-xs text-error'
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
