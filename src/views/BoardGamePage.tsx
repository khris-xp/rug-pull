import ProductCard from '@/components/Card/ProductCard';
import Container from '@/layouts/Container';
import { useAppSelector } from '@/store/hooks';
import { Fragment } from 'react/jsx-runtime';

export default function BoardGamePage() {
  const boardGames = useAppSelector((state) => state.boardGames.boardGameList);
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
            <ProductCard key={boardGame._id} boardGame={boardGame} />
          ))}
        </div>
      </Container>
    </Fragment>
  );
}
