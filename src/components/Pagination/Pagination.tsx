import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';

interface IProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const MAX_VISIBLE_PAGES = 6;

const Pagination: React.FC<IProps> = (props) => {
  const startPage = Math.max(
    1,
    props.currentPage - Math.floor(MAX_VISIBLE_PAGES / 2)
  );
  const endPage = Math.min(props.totalItems, startPage + MAX_VISIBLE_PAGES - 1);

  return (
    <div>
      <nav aria-label='Page navigation example'>
        <ul className='flex items-center -space-x-px h-8 text-sm'>
          <li>
            <Button
              variant={{
                padding: 'px-3 h-8 mr-3',
                textColor: 'text-white',
                borderRadius: 'rounded-lg',
                textSize: 'text-sm',
                fontWeight: 'font-normal',
                isHover: true,
              }}
              props={{
                onClick: () => props.onPageChange(props.currentPage - 1),
                text: 'Previous',
                type: 'button',
                icon: faArrowLeft,
                disabled: props.currentPage === 0,
              }}
            />
          </li>

          {startPage > 1 && (
            <div className='px-1'>
              <Button
                variant={{
                  padding: 'px-3 h-8',
                  textColor: 'text-white',
                  borderRadius: 'rounded-full',
                  isHover: true,
                  textSize: 'text-sm',
                  fontWeight: 'font-normal',
                }}
                props={{
                  onClick: () => props.onPageChange(0),
                  text: '1',
                  type: 'button',
                }}
              />
            </div>
          )}

          {startPage > 2 && <div className='px-1'>...</div>}

          {Array.from(
            { length: endPage - startPage + 1 },
            (_, index) => startPage + index
          ).map((page) => (
            <div className='px-1' key={page}>
              <Button
                variant={{
                  padding: 'px-3 h-8',
                  textColor: 'text-white',
                  isHover: true,
                  borderRadius: 'rounded-full',
                  textSize: 'text-sm',
                  fontWeight: 'font-normal',
                }}
                props={{
                  onClick: () => props.onPageChange(page - 1),
                  text: page.toString(),
                  type: 'button',
                  disabled: props.currentPage === page - 1,
                }}
              />
            </div>
          ))}

          {endPage < props.totalItems - 1 && <div className='px-1'>...</div>}

          {endPage < props.totalItems && (
            <div className='px-1'>
              <Button
                variant={{
                  padding: 'px-3 h-8',
                  textColor: 'text-white',
                  isHover: true,
                  borderRadius: 'rounded-full',
                  textSize: 'text-sm',
                  fontWeight: 'font-normal',
                }}
                props={{
                  onClick: () => props.onPageChange(props.totalItems - 1),
                  text: props.totalItems.toString(),
                  type: 'button',
                }}
              />
            </div>
          )}

          <li>
            <Button
              variant={{
                padding: 'px-3 h-8 ml-3',
                textColor: 'text-white',
                borderRadius: 'rounded-lg',
                textSize: 'text-sm',
                fontWeight: 'font-normal',
                isHover: true,
              }}
              props={{
                onClick: () => props.onPageChange(props.currentPage + 1),
                text: 'Next',
                type: 'button',
                icon: faArrowRight,
                disabled: props.currentPage === props.totalItems - 1,
              }}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
