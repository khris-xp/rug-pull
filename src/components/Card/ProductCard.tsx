import { BoardGameModelType } from '@/types/board-game.type';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Spacer from '../Spacer/Spacer';

type ProductCardProps = {
  boardGame: BoardGameModelType;
};

export default function ProductCard(props: ProductCardProps) {
  return (
    <div className='relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md'>
      <a
        className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'
        href='#'
      >
        <img
          className='object-cover'
          src={props.boardGame.thumbnail}
          alt='product image'
        />
      </a>
      <div className='mt-4 px-5 pb-5'>
        <a href='#'>
          <h5 className='text-xl tracking-tight text-slate-900'>
            {props.boardGame.name}
          </h5>
        </a>
        <div className='mt-2 mb-5 flex items-center justify-between'>
          <p>
            <span className='text-3xl font-bold text-slate-900'>
              {props.boardGame.price} ฿
            </span>
          </p>
          <div className='flex items-center'>
            <p className='text-sm text-gray-500'>
              {props.boardGame.players_min} - {props.boardGame.players_max}{' '}
              Players
            </p>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-sm text-gray-500'>
            {props.boardGame.category} | {props.boardGame.publisher}
          </p>
        </div>
        <Spacer margin='mb-6' />
        <Link to={`/board-game/${props.boardGame._id}`}>
          <Button
            variant={{
              textColor: 'text-white',
              padding: 'w-full px-5 py-2.5',
              fontWeight: 'font-normal',
              borderRadius: 'rounded-lg',
              color: 'bg-primary',
              textAlign: 'center',
              textSize: 'text-base',
              isHover: true,
            }}
            props={{
              onClick: () => null,
              text: 'Booked',
              type: 'button',
              icon: faBullseye,
            }}
          />
        </Link>
      </div>
    </div>
  );
}
