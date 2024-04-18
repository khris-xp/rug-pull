import ProductCard from '@/components/Card/ProductCard';
import Input from '@/components/Input/Input';
import Skeleton from '@/components/Loading/Skeleton';
import Container from '@/layouts/Container';
import { boardGameService } from '@/services/board-game.service';
import { setBoardGameList } from '@/store/board-game/board-game.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function BoardGamePage() {
  const [search, setSearch] = useState<string>('');
  const dispatch = useAppDispatch();
  const boardGames = useAppSelector((state) => state.boardGames.boardGameList);

  const filteredBoardGames = boardGames.filter((boardGame) =>
    boardGame.name.toLowerCase().includes(search.toLowerCase())
  );

  const fetchBoardGames = useCallback(async () => {
    const response = await boardGameService.getAllBoardGame('1', '10');
    dispatch(setBoardGameList(response.data.data));
  }, [dispatch]);

  useEffect(() => {
    if (boardGames.length === 0) fetchBoardGames();
  }, [boardGames.length, fetchBoardGames]);

  return (
    <div>
      <Container
        variant={{
          display: 'flex',
          justifyContent: 'center',
          container: true,
          margin: 'mx-auto',
        }}
      >
        <Input
          props={{
            variant: 'email',
            value: search,
            placeholder: 'Search your board game',
            isFull: true,
            onChange: (event) => setSearch(event.target.value),
          }}
        />
      </Container>
      <Container
        variant={{
          display: 'flex',
          justifyContent: 'center',
          container: false,
          margin: 'mx-auto',
        }}
      >
        {filteredBoardGames.length === 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        )}

        {filteredBoardGames.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
            {filteredBoardGames.map((boardGame) => (
              <Link key={boardGame._id} to={`/board-game/${boardGame._id}`}>
                <ProductCard boardGame={boardGame} />
              </Link>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
