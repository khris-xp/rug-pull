import ProductCard from '@/components/Card/ProductCard';
import Input from '@/components/Input/Input';
import Skeleton from '@/components/Loading/Skeleton';
import Pagination from '@/components/Pagination/Pagination';
import Container from '@/layouts/Container';
import { boardGameService } from '@/services/board-game.service';
import { setBoardGameList } from '@/store/board-game/board-game.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function BoardGamePage() {
  const [search, setSearch] = useState<string>('');
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useAppDispatch();
  const boardGames = useAppSelector((state) => state.boardGames.boardGameList);

  const filteredBoardGames = boardGames.filter((boardGame) =>
    boardGame.name.toLowerCase().includes(search.toLowerCase())
  );

  const calPagination = useCallback(() => {
    if (totalPages) {
      return Math.ceil(totalPages / LIMIT);
    }
    return 1;
  }, [totalPages]);

  const fetchBoardGames = useCallback(
    async (page: number) => {
      if (boardGames.length === 0) {
        const response = await boardGameService.getAllBoardGame(
          String(page),
          String(LIMIT)
        );
        dispatch(setBoardGameList(response.data.boardGames));
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      }
    },
    [dispatch, boardGames.length]
  );
  useEffect(() => {
    if (boardGames.length === 0) fetchBoardGames(0);
  }, [boardGames.length, fetchBoardGames]);

  return (
    <>
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
          container: true,
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
      <div className='flex justify-center mt-7'>
        <Pagination
          totalItems={calPagination()}
          itemsPerPage={10}
          currentPage={parseInt(String(currentPage))}
          onPageChange={fetchBoardGames}
        />
      </div>
    </>
  );
}
