import { formatDateDifference } from '@/libs/date';
import { boardGameService } from '@/services/board-game.service';
import { bookingService } from '@/services/booked.service';
import { roomService } from '@/services/room.service';
import { tableService } from '@/services/table.service';
import { useAppSelector } from '@/store/hooks';
import { BookingModelType } from '@/types/booking.type';
import { useCallback, useEffect, useState } from 'react';

export default function HistoryTable() {
  const [booking, setBooking] = useState<BookingModelType[]>([]);
  const [tableNumbers, setTableNumbers] = useState<{ [key: string]: string }>(
    {}
  );
  const [roomNames, setRoomNames] = useState<{ [key: string]: string }>({});
  const [boardGameNames, setBoardGameNames] = useState<{
    [key: string]: string;
  }>({});
  const userData = useAppSelector((state) => state.auth.user);

  const fetchBooking = useCallback(async () => {
    try {
      if (userData) {
        const response = await bookingService.getBookingByUserId(userData?._id);
        setBooking(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [userData]);

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

  const getBoardGameById = async (id: string) => {
    try {
      const response = await boardGameService.getBoardGameById(id);
      return response.data.name;
    } catch (error) {
      console.log(error);
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

  return (
    <>
      <div className='overflow-x-auto mx-auto container mt-10'>
        <table className='table'>
          <thead>
            <tr className='text-center'>
              <th>Board Game</th>
              <th>Room</th>
              <th>Table</th>
              <th>Status</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Total Price</th>
              <th>Amount Player</th>
              <th>Duration</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {booking && (
              <>
                {booking.map((boooked) => (
                  <tr key={boooked._id} className='text-center'>
                    <td>{boardGameNames[boooked._id]}</td>
                    <td>{roomNames[boooked._id]}</td>
                    <td>{tableNumbers[boooked._id]}</td>
                    <td>{boooked.status}</td>
                    <td>{formatDateDifference(boooked.start_time)}</td>
                    <td>{formatDateDifference(boooked.end_time)}</td>
                    <td>{boooked.total_price}</td>
                    <td>{boooked.amount_player}</td>
                    <td>{boooked.duration}</td>
                    <td>{formatDateDifference(boooked.createdAt)}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
