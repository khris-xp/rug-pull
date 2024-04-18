import Banner from '@/components/Banner/Banner';
import BentoCard from '@/components/Card/BentoCard';
import Footer from '@/components/Footer/Footer';
import { FooterNavigation } from '@/constants/footer';
import Container from '@/layouts/Container';
import { boardGameService } from '@/services/board-game.service';
import { setBoardGameList } from '@/store/board-game/board-game.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useEffect } from 'react';

export default function HomePage() {
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
    <div>
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
      {/* <Container
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
      </Container> */}
      <Footer
        props={{
          footer: FooterNavigation,
        }}
      />
    </div>
  );
}
