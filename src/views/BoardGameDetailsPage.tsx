import Button from '@/components/Button/Button';
import InputErrors from '@/components/Errors/InputErrors';
import Input from '@/components/Input/Input';
import useSnackbarToast from '@/hooks/useSnackbar';
import { useValidate } from '@/hooks/useValidate';
import { generateBookingFields } from '@/mappers/booking.mapper';
import { boardGameService } from '@/services/board-game.service';
import { bookingService } from '@/services/booked.service';
import { roomService } from '@/services/room.service';
import { tableService } from '@/services/table.service';
import { setBoardGame } from '@/store/board-game/board-game.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setRoomList } from '@/store/room/room.slice';
import { TableModelType } from '@/types/table.type';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { useParams } from 'react-router-dom';

export default function BoardGameDetailsPage() {
  const { id } = useParams();
  const boardGame = useAppSelector((state) => state.boardGames.boardGame);
  const rooms = useAppSelector((state) => state.rooms.roomList);
  const dispatch = useAppDispatch();
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [tableData, setTableData] = useState<TableModelType[]>([]);
  const [selectedStartDate, setSelectedStartDate] = useState<string>('');
  const [selectedEndDate, setSelectedEndDate] = useState<string>('');
  const [amount_player, setAmountPlayer] = useState<number>(0);
  const userData = useAppSelector((state) => state.auth.user);
  const { showSnackbar } = useSnackbarToast();
  const { validateField, errors, setErrors } = useValidate();

  const hanldeBooking = async () => {
    try {
      if (
        selectedRoom === '' ||
        selectedTable === '' ||
        selectedStartDate === '' ||
        selectedEndDate === '' ||
        amount_player === 0 ||
        userData ||
        boardGame
      ) {
        const fields = generateBookingFields(
          {
            user: userData?._id,
            amount_player,
            total_price: boardGame?.price,
            duration: moment(selectedEndDate).diff(moment(selectedStartDate)),
            room_id: selectedRoom,
            board_game_id: boardGame?._id,
            table_id: selectedTable,
            status: 'pending',
            start_time: selectedStartDate,
            end_time: selectedEndDate,
          },
          setErrors
        );
        const validate = validateField(fields);
        if (!validate) {
          showSnackbar('Please fill all fields', 'error');
          return;
        } else {
          const duration = moment(selectedEndDate).diff(
            selectedStartDate,
            'hours'
          );
          const response = await bookingService.createBooking({
            table_id: selectedTable,
            user: userData?._id,
            room_id: selectedRoom,
            start_time: selectedStartDate,
            end_time: selectedEndDate,
            amount_player: amount_player,
            total_price: boardGame ? boardGame.price * amount_player : 0,
            duration: duration * 60,
            board_game_id: boardGame?._id,
            status: 'Pending',
          });

          if (response.success) {
            showSnackbar('Booking success', 'success');
          } else {
            showSnackbar('Booking failed', 'error');
          }
        }
      }
    } catch (error) {
      showSnackbar('Booking failed', 'error');
    }
  };

  const fetchBoardGame = useCallback(async () => {
    if (id && boardGame?._id !== id) {
      const response = await boardGameService.getBoardGameById(id);
      dispatch(setBoardGame(response.data));
    }
  }, [id, boardGame?._id, dispatch]);

  const fetchRooms = useCallback(async () => {
    const response = await roomService.getAllRoom();
    dispatch(setRoomList(response.data));
  }, [dispatch]);

  async function handleRoomClick(roomName: string) {
    if (selectedRoom === roomName) {
      setSelectedRoom('');
    } else {
      setSelectedRoom(roomName);
      const response = await roomService.getRoomById(roomName);

      const tableDataPromises = response.data.tables.map((table) =>
        tableService.getTableById(table)
      );

      const resolvedTableData = await Promise.all(tableDataPromises);

      const tableDataArray = resolvedTableData.map((response) => response.data);

      setTableData(tableDataArray);
    }
  }

  const handleTableClick = (tableId: string) => {
    if (selectedTable === tableId) {
      setSelectedTable('');
    } else {
      setSelectedTable(tableId);
    }
  };

  useEffect(() => {
    fetchBoardGame();
    fetchRooms();
  }, [fetchBoardGame, fetchRooms, id]);
  return (
    <section className='py-12 sm:py-16'>
      <div className='container mx-auto px-4'>
        <div className='lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16'>
          <div className='lg:col-span-3 lg:row-end-1'>
            <div className='max-w-xl overflow-hidden rounded-lg'>
              <img
                className='h-full w-full'
                src={boardGame?.thumbnail}
                alt=''
              />
            </div>
          </div>

          <div className='lg:col-span-2 lg:row-span-2 lg:row-end-2'>
            <h1 className='sm: text-2xl font-bold text-gray-900 sm:text-3xl'>
              {boardGame?.name}
            </h1>

            <div className='mt-5 flex items-center'>
              <div className='flex items-center'>
                <svg
                  className='block h-4 w-4 align-middle text-yellow-500'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
                    className=''
                  ></path>
                </svg>
                <svg
                  className='block h-4 w-4 align-middle text-yellow-500'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
                    className=''
                  ></path>
                </svg>
                <svg
                  className='block h-4 w-4 align-middle text-yellow-500'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
                    className=''
                  ></path>
                </svg>
                <svg
                  className='block h-4 w-4 align-middle text-yellow-500'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
                    className=''
                  ></path>
                </svg>
                <svg
                  className='block h-4 w-4 align-middle text-yellow-500'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
                    className=''
                  ></path>
                </svg>
              </div>
              <p className='ml-2 text-sm font-medium text-gray-500'>
                1,209 Reviews
              </p>
            </div>

            <h2 className='mt-8 text-base text-gray-900'>
              Board Game Category
            </h2>
            <div className='mt-3 flex select-none flex-wrap items-center gap-1'>
              <label className=''>
                <input
                  type='radio'
                  name='type'
                  value='Powder'
                  className='peer sr-only'
                  checked
                />
                <p className='peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold'>
                  {boardGame?.category}
                </p>
              </label>
            </div>

            <h2 className='mt-8 text-base text-gray-900'>
              Choose rooms to play
            </h2>
            <div className='mt-3 flex select-none flex-wrap items-center gap-1'>
              {rooms.map((room) => (
                <button
                  onClick={() => handleRoomClick(room._id)}
                  className={`px-6 py-2 ${
                    selectedRoom === room._id
                      ? 'bg-black text-white'
                      : 'text-black bg-white'
                  } border border-black rounded-lg font-bold duration-100`}
                >
                  {room.name}
                </button>
              ))}
              {errors.roomId && <InputErrors errors={errors.roomId} />}
            </div>

            {selectedRoom !== '' && (
              <>
                <h2 className='mt-8 text-base text-gray-900'>
                  Choose table to play
                </h2>
                <div className='mt-3 flex select-none flex-wrap items-center gap-1'>
                  {tableData && (
                    <>
                      {tableData.map((table) => (
                        <button
                          onClick={() => handleTableClick(table?._id)}
                          className={`px-6 py-2 ${
                            selectedTable === table?._id
                              ? 'bg-black text-white'
                              : 'text-black bg-white'
                          } border border-black rounded-lg font-bold duration-100`}
                        >
                          {table?.number}
                        </button>
                      ))}
                    </>
                  )}
                  {errors.tableId && <InputErrors errors={errors.tableId} />}
                </div>
              </>
            )}

            {selectedTable !== '' && (
              <>
                <div className='flex justify-center space-x-5'>
                  <div className='mt-8'>
                    <h2 className='text-base text-gray-900 mb-2'>
                      Select Start Date and Time
                    </h2>
                    <Datetime
                      className='bg-white shadow-md border rounded-md py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500'
                      inputProps={{
                        placeholder: 'Select Start Date and Time',
                      }}
                      value={
                        selectedStartDate ? new Date(selectedStartDate) : ''
                      }
                      onChange={(date) =>
                        setSelectedStartDate(
                          date instanceof moment ? date.format() : ''
                        )
                      }
                      isValidDate={(current) => {
                        return current.isAfter(moment().subtract(1, 'days'));
                      }}
                    />
                    {errors.startTime && (
                      <InputErrors errors={errors.startTime} />
                    )}
                  </div>
                  <div className='mt-8'>
                    <h2 className='text-base text-gray-900 mb-2'>
                      Select End Date and Time
                    </h2>
                    <Datetime
                      className='bg-white shadow-md border rounded-md py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500'
                      inputProps={{ placeholder: 'Select End Date and Time' }}
                      value={selectedEndDate ? new Date(selectedEndDate) : ''}
                      onChange={(date) =>
                        setSelectedEndDate(
                          date instanceof moment ? date.format() : ''
                        )
                      }
                    />
                    {errors.endTime && <InputErrors errors={errors.endTime} />}
                  </div>
                </div>
                <div>
                  <div className='mt-8'>
                    <h2 className='text-base text-gray-900 mb-2'>
                      Amount of player
                    </h2>
                    <Input
                      props={{
                        variant: 'number',
                        value: amount_player,
                        onChange: (e) =>
                          setAmountPlayer(Number(e.target.value)),
                        placeholder: 'Amount of player',
                        isFull: true,
                      }}
                    />
                    {errors.amountPlayer && (
                      <InputErrors errors={errors.amountPlayer} />
                    )}
                  </div>
                </div>
              </>
            )}

            <div className='mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0'>
              <div className='flex items-end'>
                <h1 className='text-3xl font-bold'>฿{boardGame?.price}</h1>
              </div>
              <Button
                variant={{
                  padding: 'px-12 py-3',
                  textColor: 'text-white',
                  color: 'bg-gray-900',
                  isHover: true,
                  borderRadius: 'rounded-lg',
                  textSize: 'text-lg',
                  fontWeight: 'font-bold',
                }}
                props={{
                  type: 'button',
                  text: 'Book Now',
                  icon: faBullseye,
                  onClick: hanldeBooking,
                }}
              />
            </div>

            <ul className='mt-8 space-y-2'>
              <li className='flex items-center text-left text-sm font-medium text-gray-600'>
                <svg
                  className='mr-2 block h-5 w-5 align-middle text-gray-500'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    className=''
                  ></path>
                </svg>
                Free shipping worldwide
              </li>

              <li className='flex items-center text-left text-sm font-medium text-gray-600'>
                <svg
                  className='mr-2 block h-5 w-5 align-middle text-gray-500'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
                    className=''
                  ></path>
                </svg>
                Cancel Anytime
              </li>
            </ul>
          </div>

          <div className='lg:col-span-3'>
            <div className='border-b border-gray-300'>
              <nav className='flex gap-4'>
                <a
                  href='#'
                  title=''
                  className='border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800'
                >
                  Description
                </a>
              </nav>
            </div>

            <div className='mt-8 flow-root sm:mt-12'>
              <h1 className='text-3xl font-bold'>Description</h1>
              <p className='mt-4'>{boardGame?.description}</p>
              <div className='flex items-center justify-between mr-32'>
                <div className='flex flex-col'>
                  <h1 className='mt-8 text-3xl font-bold'>Publisher</h1>
                  <p className='mt-4'>{boardGame?.publisher}</p>
                </div>
                <div className='flex flex-col'>
                  <h1 className='mt-8 text-3xl font-bold'>Players</h1>
                  <p className='mt-4'>
                    Player min: {boardGame?.players_min} - Player max:{' '}
                    {boardGame?.players_max}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
