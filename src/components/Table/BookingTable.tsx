import useSnackbarToast from '@/hooks/useSnackbar';
import { formatDateDifference } from '@/libs/date';
import { boardGameService } from '@/services/board-game.service';
import { bookingService } from '@/services/booked.service';
import { roomService } from '@/services/room.service';
import { tableService } from '@/services/table.service';
import { userService } from '@/services/user.service';
import { setBookingList } from '@/store/booking/booking.slice';
import { useAppDispatch } from '@/store/hooks';
import { BookingModelType } from '@/types/booking.type';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function BookingTable() {
  const [booking, setBooking] = useState<BookingModelType[]>([]);
  const [tableNumbers, setTableNumbers] = useState<{ [key: string]: string }>(
    {}
  );
  const [roomNames, setRoomNames] = useState<{ [key: string]: string }>({});
  const [boardGameNames, setBoardGameNames] = useState<{
    [key: string]: string;
  }>({});
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
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

  const getTablebyId = async (id: string) => {
    try {
      const response = await tableService.getTableById(id);
      return response.data.number;
    } catch (error) {
      console.log(error);
    }
  };

  const getRoomById = async (id: string) => {
    try {
      const response = await roomService.getRoomById(id);
      return response.data.name;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async (id: string) => {
    try {
      const response = await userService.getUserById(id);
      return `${response.data.firstName} ${response.data.lastName}`;
    } catch (error) {
      console.log(error);
    }
  };

  const getBoardGameById = async (id: string) => {
    try {
      const response = await boardGameService.getBoardGameById(id);
      return response.data.name;
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    const updateTableNumbers = async () => {
      const newTableNumbers: { [key: string]: string } = {};
      for (const booked of booking) {
        const tableNumber = await getTablebyId(booked.table_id);
        if (tableNumber !== undefined) {
          newTableNumbers[booked._id] = tableNumber;
        }
      }
      setTableNumbers(newTableNumbers);
    };
    updateTableNumbers();
  }, [booking]);

  useEffect(() => {
    const updateRoomNames = async () => {
      const newRoomNames: { [key: string]: string } = {};
      for (const booked of booking) {
        const roomName = await getRoomById(booked.room_id);
        if (roomName !== undefined) {
          newRoomNames[booked._id] = roomName;
        }
      }
      setRoomNames(newRoomNames);
    };
    updateRoomNames();
  }, [booking]);

  useEffect(() => {
    const updateBoardGameNames = async () => {
      const newBoardGameNames: { [key: string]: string } = {};
      for (const booked of booking) {
        const boardGameName = await getBoardGameById(booked.board_game_id);
        if (boardGameName !== undefined) {
          newBoardGameNames[booked._id] = boardGameName;
        }
      }
      setBoardGameNames(newBoardGameNames);
    };
    updateBoardGameNames();
  }, [booking]);

  useEffect(() => {
    const updateUserNames = async () => {
      const newUserNames: { [key: string]: string } = {};
      for (const booked of booking) {
        const userName = await getUserById(booked.user);
        if (userName !== undefined) {
          newUserNames[booked._id] = userName;
        }
      }
      setUserNames(newUserNames);
    };
    updateUserNames();
  }, [booking]);

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
                      {userNames[boooked._id] !== undefined
                        ? userNames[boooked._id]
                        : 'User not found'}
                    </td>
                    <td>{boardGameNames[boooked._id]}</td>
                    <td>{roomNames[boooked._id]}</td>
                    <td>{tableNumbers[boooked._id]}</td>
                    <td>{boooked.status}</td>
                    <td>{formatDateDifference(boooked.start_time)}</td>
                    <td>{formatDateDifference(boooked.end_time)}</td>
                    <td>{boooked.total_price}</td>
                    <td>{boooked.duration}</td>
                    <td>{formatDateDifference(boooked.createdAt)}</td>
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
