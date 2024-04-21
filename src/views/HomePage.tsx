import Banner from '@/components/Banner/Banner';
import BentoCard from '@/components/Card/BentoCard';
import ProductCard from '@/components/Card/ProductCard';
import Footer from '@/components/Footer/Footer';
import { FooterNavigation } from '@/constants/footer';
import Container from '@/layouts/Container';
import { boardGameService } from '@/services/board-game.service';
import { setBoardGameList } from '@/store/board-game/board-game.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const boardGames = useAppSelector((state) => state.boardGames.boardGameList);

  const fetchBoardGames = useCallback(async () => {
    if (boardGames.length === 0) {
      const response = await boardGameService.getAllBoardGame('1', '10');
      dispatch(setBoardGameList(response.data.boardGames));
    }
  }, [boardGames.length, dispatch]);

  useEffect(() => {
    fetchBoardGames();
  }, [fetchBoardGames]);

  return (
    <>
      <Banner
        title='Welcome to Rug Pull'
        description='The best place to find rug pulls'
        backgroundImage='https://canazeegames.ca/cdn/shop/files/game-play-DSCF3536.jpg?v=1653398205&width=3200'
        height='75vh'
      />
      <Container
        variant={{
          display: 'flex',
          justifyContent: 'center',
          container: false,
          margin: 'mx-auto',
        }}
      >
        <BentoCard />
      </Container>
      <Container
        variant={{
          display: 'flex',
          justifyContent: 'center',
          container: false,
          margin: 'mx-auto',
        }}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {boardGames && boardGames.length > 0 ? (
            boardGames.map((boardGame) => (
              <Link key={boardGame._id} to={`/board-game/${boardGame._id}`}>
                <ProductCard boardGame={boardGame} />
              </Link>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </Container>
      <Footer
        props={{
          footer: FooterNavigation,
        }}
      />
    </>
  );
}
