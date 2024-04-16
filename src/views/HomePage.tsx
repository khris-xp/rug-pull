import Banner from '@/components/Banner/Banner';
import BentoCard from '@/components/Card/BentoCard';
import ProductCard from '@/components/Card/ProductCard';
import Container from '@/layouts/Container';
import { boardGameService } from '@/services/board-game.service';
import { BoardGameModelType } from '@/types/board-game.type';
import { useEffect, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';

export default function HomePage() {
  const [boardGames, setBoardGames] = useState<BoardGameModelType[]>([]);
  async function fetchBoardGames() {
    const response = await boardGameService.getAllBoardGame('1', '10');
    setBoardGames(response.data.data);
  }

  useEffect(() => {
    fetchBoardGames();
  }, []);
  return (
    <Fragment>
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
          {boardGames.map((boardGame) => (
            <ProductCard key={boardGame._id} boardGame={boardGame} />
          ))}
        </div>
      </Container>
      {/* <Container
        variant={{
          display: 'flex',
          justifyContent: 'center',
          container: true,
          margin: 'mx-auto',
        }}
      >
        <Pagination
          totalItems={}
          itemsPerPage={}
          currentPage={}
        />
      </Container> */}
    </Fragment>
  );
}
