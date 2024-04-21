import Button from '@/components/Button/Button';
import Dropdown from '@/components/Button/Dropdown';
import Input from '@/components/Input/Input';
import Loading from '@/components/Loading/Loading';
import Spacer from '@/components/Spacer/Spacer';
import useSnackbarToast from '@/hooks/useSnackbar';
import { boardGameService } from '@/services/board-game.service';
import { bookingService } from '@/services/booked.service';
import { roomService } from '@/services/room.service';
import { statusService } from '@/services/status.service';
import { tableService } from '@/services/table.service';
import { userService } from '@/services/user.service';
import { BookingModelType } from '@/types/booking.type';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { useParams } from 'react-router-dom';

export default function BookingDashboardDetailsPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState<BookingModelType>();
  const [tableNumber, setTableNumbers] = useState<string>('');
  const [roomName, setRoomNames] = useState<string>('');
  const [boardGameName, setBoardGameNames] = useState<string>('');
  const [userName, setUserNames] = useState<string>('');
  const { showSnackbar } = useSnackbarToast();
  const [statusDropdown, setStatusDropdown] = useState<boolean>(false);
  const [status, setStaus] = useState<string | undefined>(booking?.status);
  const [statusByTopics, setStatusByTopics] = useState<string[]>([]);

  const handleValueChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    key: string
  ) => {
    setBooking(
      (prev) => ({ ...prev, [key]: e.target.value } as BookingModelType)
    );
  };

  const fetchStatusByTopics = useCallback(async () => {
    try {
      const response = await statusService.getAllStatus();
      const statusByTopics = response.data.filter(
        (status) => status.topics === 'Booking'
      );

      setStatusByTopics(statusByTopics.map((status) => status.name));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateBookingStatus = async (status: string | undefined) => {
    try {
      const updatedBooking = {
        ...booking,
        status,
        amount_player: booking?.amount_player ?? 0,
      };
      const response = await bookingService.updateBooking(id, updatedBooking);
      if (response.success) {
        showSnackbar('Booking status updated successfully', 'success');
        window.location.href = '/dashboard/booking';
      } else {
        showSnackbar('Failed to update booking status', 'error');
      }
    } catch (error) {
      showSnackbar('Failed to update booking status', 'error');
    }
  };

  const fetchBooking = useCallback(async () => {
    try {
      const response = await bookingService.getBooking(id);
      setBooking(response.data);
      const tableResponse = await tableService.getTableById(
        response.data.table_id
      );
      setTableNumbers(tableResponse.data.number);
      const roomResponse = await roomService.getRoomById(response.data.room_id);
      setRoomNames(roomResponse.data.name);
      const userResponse = await userService.getUserById(response.data.user);
      setUserNames(
        `${userResponse.data.firstName} ${userResponse.data.lastName}`
      );
      const boardGameResponse = await boardGameService.getBoardGameById(
        response.data.board_game_id
      );
      setBoardGameNames(boardGameResponse.data.name);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchBooking();
    fetchStatusByTopics();
  }, [fetchBooking, fetchStatusByTopics]);

  return (
    <>
      {booking && statusByTopics && userName && tableNumber && roomName ? (
        <div className='bg-white p-8 rounded shadow-md max-w-3xl w-full mx-auto mt-10'>
          <h2 className='text-2xl font-semibold mb-4'>Edit Booking</h2>
          <form>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  User
                </label>
                <Spacer margin='my-2' />
                <Input
                  props={{
                    variant: 'text',
                    value: userName,
                    placeholder: 'User Name',
                    onChange: (e) => handleValueChange(e, 'user'),
                    isFull: true,
                    disabled: true,
                  }}
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Booking Table
                </label>
                <Spacer margin='my-2' />
                <Input
                  props={{
                    variant: 'text',
                    value: tableNumber,
                    placeholder: 'Table Number',
                    isFull: true,
                    disabled: true,
                  }}
                />
              </div>
            </div>
            <Spacer margin='my-4' />
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Booking Room
                </label>
                <Spacer margin='my-2' />
                <Input
                  props={{
                    variant: 'text',
                    value: roomName,
                    placeholder: 'Booking Room',
                    isFull: true,
                    disabled: true,
                  }}
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Booking Boardgame
                </label>
                <Spacer margin='my-2' />
                <Input
                  props={{
                    variant: 'text',
                    value: boardGameName,
                    placeholder: 'Table Number',
                    isFull: true,
                    disabled: true,
                  }}
                />
              </div>
            </div>
            <Spacer margin='my-4' />
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Total Price
                </label>
                <Spacer margin='my-2' />
                <Input
                  props={{
                    variant: 'number',
                    value: booking?.total_price,
                    placeholder: 'Total Price',
                    isFull: true,
                    disabled: true,
                  }}
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Amount Player
                </label>
                <Spacer margin='my-2' />
                <Input
                  props={{
                    variant: 'number',
                    value: booking?.amount_player,
                    placeholder: 'Amount Player',
                    isFull: true,
                    disabled: true,
                  }}
                />
              </div>
            </div>
            <Spacer margin='my-4' />
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Start Time
                </label>
                <Spacer margin='my-2' />
                <Datetime
                  className='bg-white shadow-md border rounded-md py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500'
                  inputProps={{
                    placeholder: 'Start Date and Time',
                    disabled: true,
                  }}
                  value={moment(booking?.start_time)}
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  End Time
                </label>
                <Spacer margin='my-2' />
                <Datetime
                  className='bg-white shadow-md border rounded-md py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500'
                  inputProps={{
                    placeholder: 'End Date and Time',
                    disabled: true,
                  }}
                  value={moment(booking?.end_time)}
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Booking Status
                </label>
                <Spacer margin='my-2' />
                <Dropdown
                  props={{
                    onClick: () => setStatusDropdown(!statusDropdown),
                    text: status ?? booking?.status ?? 'Select Status',
                    list: statusByTopics,
                    open: statusDropdown,
                    onToggle: () => setStatusDropdown(!statusDropdown),
                    onSelectItem: (e: string) => setStaus(e),
                  }}
                />
              </div>
              <div className='mt-6'>
                <Button
                  props={{
                    type: 'button',
                    text: 'Edit Booking',
                    onClick: () => updateBookingStatus(status),
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
            </div>
          </form>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
