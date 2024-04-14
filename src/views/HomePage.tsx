import Banner from '@/components/Banner/Banner';
import ProductCard from '@/components/Card/ProductCard';
import { Fragment } from 'react/jsx-runtime';

export default function HomePage() {
  return (
    <Fragment>
      <Banner
        title='Welcome to Rug Pull'
        description='The best place to find rug pulls'
        backgroundImage='https://canazeegames.ca/cdn/shop/files/game-play-DSCF3536.jpg?v=1653398205&width=3200'
        height='75vh'
      />
      <div className='flex justify-center container mx-auto'>
        <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3'>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </Fragment>
  );
}
