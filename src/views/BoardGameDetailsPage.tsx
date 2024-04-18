import Button from '@/components/Button/Button';
import { boardGameService } from '@/services/board-game.service';
import { roomService } from '@/services/room.service';
import { setBoardGame } from '@/store/board-game/board-game.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setRoomList } from '@/store/room/room.slice';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function BoardGameDetailsPage() {
  const { id } = useParams();
  const boardGame = useAppSelector((state) => state.boardGames.boardGame);
  const rooms = useAppSelector((state) => state.rooms.roomList);
  const dispatch = useAppDispatch();
  const [selectedRoom, setSelectedRoom] = useState<string>('');

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

  function handleRoomClick(roomName: string) {
    if (selectedRoom === roomName) {
      setSelectedRoom('');
    } else {
      setSelectedRoom(roomName);
    }
  }

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
            </div>

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
                  onClick: () => console.log('Book Now'),
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

                <a
                  href='#'
                  title=''
                  className='inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-600'
                >
                  Reviews
                  <span className='ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100'>
                    1,209
                  </span>
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
