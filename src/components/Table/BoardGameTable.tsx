import useSnackbarToast from '@/hooks/useSnackbar';
import { boardGameService } from '@/services/board-game.service';
import { setBoardGameList } from '@/store/board-game/board-game.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

export default function BoardGameTable() {
  const boardGames = useAppSelector((state) => state.boardGames.boardGameList);
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbarToast();

  const fetchBoardGames = useCallback(async () => {
    if (boardGames.length === 0) {
      const response = await boardGameService.getAllBoardGame('1', '10');
      dispatch(setBoardGameList(response.data.boardGames.data));
    }
  }, [dispatch, boardGames.length]);

  const handleDeleteBoardGame = async (id: string) => {
    try {
      const response = await boardGameService.deleteBoardGame(id);
      if (response.success) {
        const boardGame_response = await boardGameService.getAllBoardGame(
          '1',
          '10'
        );
        dispatch(setBoardGameList(boardGame_response.data.boardGames.data));
        showSnackbar('Board Game deleted successfully', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBoardGames();
  }, [fetchBoardGames]);
  return (
    <>
      <div className='flex justify-end items-center mr-10'>
        <Link to='/dashboard/create-boardgame'>
          <Button
            props={{
              type: 'button',
              icon: faGamepad,
              text: 'Create Board Game',
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
              <th>Price</th>
              <th>Category</th>
              <th>Publisher</th>
              <th>Duration</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {boardGames.map((boardGame) => (
              <tr key={boardGame._id} className='text-center'>
                <td>
                  <div className='font-bold'>{boardGame.name}</div>
                </td>
                <td>{boardGame.description}</td>
                <td>{boardGame.price}</td>
                <td>{boardGame.category}</td>
                <td>{boardGame.publisher}</td>
                <td>{boardGame.duration}</td>
                <td>{boardGame.createdAt}</td>
                <th>
                  <Link to={`/dashboard/board-game/${boardGame._id}`}>
                    <button className='btn btn-ghost btn-xs'>details</button>
                  </Link>
                  <button
                    className='btn btn-ghost btn-xs text-error'
                    onClick={() => handleDeleteBoardGame(boardGame._id)}
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
