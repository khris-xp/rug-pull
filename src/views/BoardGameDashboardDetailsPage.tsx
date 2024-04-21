import Button from '@/components/Button/Button';
import Dropdown from '@/components/Button/Dropdown';
import Input from '@/components/Input/Input';
import Spacer from '@/components/Spacer/Spacer';
import { boardGameService } from '@/services/board-game.service';
import { uploadService } from '@/services/upload.service';
import { setBoardGameList } from '@/store/board-game/board-game.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function BoardGameDashboardDetailsPage() {
  const { id } = useParams();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>();
  const [players_min, setPlayersMin] = useState<number>();
  const [players_max, setPlayersMax] = useState<number>();
  const [duration, setDuration] = useState<number>();
  const [category, setCategory] = useState<string>('');
  const [publisher, setPublisher] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const [categoryDropdown, setCategoryDropdown] = useState<boolean>(false);
  const categoryStore = useAppSelector(
    (state) => state.categories.categoryList
  );
  const dispatch = useAppDispatch();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      console.log(formData);
      uploadService.uploadImage(formData).then((response) => {
        setThumbnail(response.data.url);
      });
    }
  };

  const fetchBoardGameById = useCallback(async () => {
    const response = await boardGameService.getBoardGameById(id);
    setName(response.data.name);
    setDescription(response.data.description);
    setPrice(response.data.price);
    setPlayersMin(response.data.players_min);
    setPlayersMax(response.data.players_max);
    setDuration(response.data.duration);
    setCategory(response.data.category);
    setPublisher(response.data.publisher);
    setThumbnail(response.data.thumbnail);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        thumbnail &&
        name &&
        description &&
        price &&
        players_min &&
        players_max &&
        duration &&
        category &&
        publisher
      ) {
        const response = await boardGameService.updateBoardGame(id, {
          name,
          description,
          price,
          players_min,
          players_max,
          duration,
          category,
          publisher,
          thumbnail,
        });
        if (response.success) {
          const board_game_response = await boardGameService.getAllBoardGame(
            '1',
            '10'
          );
          dispatch(setBoardGameList(board_game_response.data.boardGames));
          window.location.href = '/dashboard/board-game';
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setThumbnail('');
  };

  useEffect(() => {
    fetchBoardGameById();
  }, [fetchBoardGameById]);

  return (
    <div className='bg-white p-8 rounded shadow-md max-w-3xl w-full mx-auto my-10'>
      <h2 className='text-2xl font-semibold mb-4'>Edit Board Game</h2>

      <div className='p-4 bg-white  bg-whtie m-auto rounded-lg mb-10'>
        {thumbnail !== '' ? (
          <img
            src={thumbnail}
            className='w-full h-60 object-cover rounded-lg'
            alt='blog-image'
          />
        ) : (
          <div className='file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg'>
            <svg
              className='text-blue-500 w-24 mx-auto mb-4'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
              />
            </svg>
            <div className='flex flex-col w-max mx-auto text-center'>
              <label>
                <input
                  className='text-sm cursor-pointer w-36 hidden'
                  type='file'
                  onChange={handleUpload}
                />
                <div className='text bg-blue-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-500'>
                  Select
                </div>
              </label>

              <div className='title text-blue-500 uppercase'>
                or drop files here
              </div>
            </div>
          </div>
        )}

        {thumbnail !== '' && (
          <div className='flex justify-end'>
            <button className='text-red-500' onClick={handleDelete}>
              Remove
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-4 my-2'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Board Game Name
            </label>
            <Spacer margin='my-2' />
            <Input
              props={{
                variant: 'text',
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: 'Board Game Name',
                isFull: true,
              }}
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Board Game Description
            </label>
            <Spacer margin='my-2' />
            <Input
              props={{
                variant: 'text',
                value: description,
                onChange: (e) => setDescription(e.target.value),
                placeholder: 'Board Game Description',
                isFull: true,
              }}
            />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 my-2'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Board Game Price
            </label>
            <Spacer margin='my-2' />
            <Input
              props={{
                variant: 'number',
                value: price,
                onChange: (e) => setPrice(Number(e.target.value)),
                placeholder: 'Board Game Price',
                isFull: true,
              }}
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Board Game Players Min
            </label>
            <Spacer margin='my-2' />
            <Input
              props={{
                variant: 'number',
                value: players_min,
                onChange: (e) => setPlayersMin(Number(e.target.value)),
                placeholder: 'Board Game Players Min',
                isFull: true,
              }}
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 my-2'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Board Game Players Max
            </label>
            <Spacer margin='my-2' />
            <Input
              props={{
                variant: 'number',
                value: players_max,
                onChange: (e) => setPlayersMax(Number(e.target.value)),
                placeholder: 'Board Game Players Max',
                isFull: true,
              }}
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Board Game Duration
            </label>
            <Spacer margin='my-2' />
            <Input
              props={{
                variant: 'number',
                value: duration,
                onChange: (e) => setDuration(Number(e.target.value)),
                placeholder: 'Board Game Duration',
                isFull: true,
              }}
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 my-2'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Board Game Publisher
            </label>
            <Spacer margin='my-2' />
            <Input
              props={{
                variant: 'text',
                value: publisher,
                onChange: (e) => setPublisher(e.target.value),
                placeholder: 'Board Game Publisher',
                isFull: true,
              }}
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Board Game Category
            </label>
            <Spacer margin='my-2' />
            <Dropdown
              props={{
                onClick: () => setCategoryDropdown(!categoryDropdown),
                text: category || 'Category',
                list: categoryStore.map((category) => category.name),
                open: categoryDropdown,
                onToggle: () => setCategoryDropdown(!categoryDropdown),
                onSelectItem: (e: string) => setCategory(e),
              }}
            />
          </div>
        </div>

        <div className='mt-6'>
          <Button
            props={{
              type: 'submit',
              text: 'Edit BoardGame',
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
      </form>
    </div>
  );
}
