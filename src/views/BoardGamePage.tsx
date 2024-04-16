import ProductCard from '@/components/Card/ProductCard';
import Container from '@/layouts/Container';
import { boardGameService } from '@/services/board-game.service';
import { setBoardGameList } from '@/store/board-game/board-game.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

export default function BoardGamePage() {
  const dispatch = useAppDispatch();
  const boardGames = useAppSelector((state) => state.boardGames.boardGameList);

  const fetchBoardGames = useCallback(async () => {
    const response = await boardGameService.getAllBoardGame('1', '10');
    dispatch(setBoardGameList(response.data.data));
  }, [dispatch]);

  useEffect(() => {
    if (boardGames.length === 0) fetchBoardGames();
  }, [boardGames.length, fetchBoardGames]);

  return (
    <Fragment>
      <Container
        variant={{
          display: 'flex',
          justifyContent: 'center',
          container: false,
          margin: 'mx-auto',
        }}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {boardGames.map((boardGame) => (
            <Link to={`/board-game/${boardGame._id}`}>
              <ProductCard key={boardGame._id} boardGame={boardGame} />
            </Link>
          ))}
        </div>
      </Container>
    </Fragment>
  );
}
