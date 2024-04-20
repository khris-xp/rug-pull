import useSnackbarToast from '@/hooks/useSnackbar';
import { bookingService } from '@/services/booked.service';
import { setBookingList } from '@/store/booking/booking.slice';
import { useAppDispatch } from '@/store/hooks';
import { BookingModelType } from '@/types/booking.type';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function BookingTable() {
  const [booking, setBooking] = useState<BookingModelType[]>([]);
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbarToast();

  const fetchBooking = useCallback(async () => {
    try {
      const response = await bookingService.getBookings();
      setBooking(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDeleteBooking = async (id: string) => {
    try {
      const response = await bookingService.deleteBooking(id);
      if (response.success) {
        showSnackbar('Booking deleted successfully', 'success');
      }
    } catch (error) {
      dispatch(setBookingList([]));
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);
  return (
    <>
      <div className='overflow-x-auto mx-auto container mt-10'>
        <table className='table'>
          <thead>
            <tr className='text-center'>
              <th>User</th>
              <th>Board Game</th>
              <th>Room</th>
              <th>Table</th>
              <th>Status</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Total Price</th>
              <th>Duration</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(booking) && booking.length > 0 ? (
              <>
                {booking.map((boooked) => (
                  <tr key={boooked._id} className='text-center'>
                    <td>
                      <div className='font-bold'>{boooked.user}</div>
                    </td>
                    <td>{boooked.board_game_id}</td>
                    <td>{boooked.room_id}</td>
                    <td>{boooked.table_id}</td>
                    <td>{boooked.status}</td>
                    <td>{boooked.start_time}</td>
                    <td>{boooked.end_time}</td>
                    <td>{boooked.total_price}</td>
                    <td>{boooked.duration}</td>
                    <td>{boooked.createdAt}</td>
                    <th>
                      <Link to={`/dashboard/booking/${boooked._id}`}>
                        <button className='btn btn-ghost btn-xs'>
                          details
                        </button>
                      </Link>
                      <button
                        className='btn btn-ghost btn-xs text-error'
                        onClick={() => handleDeleteBooking(boooked._id)}
                      >
                        delete
                      </button>
                    </th>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={5} className='text-center'>
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
