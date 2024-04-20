import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

interface IProps {
  onClick?: () => void;
  text: string;
  icon?: IconProp;
  list: string[];
  open: boolean;
  onToggle: () => void;
  onSelectItem: (e: string) => void;
}

interface IVariant {
  color?: string;
  padding: string;
  hoverColor?: string;
  textColor: string;
  borderRadius: string;
  iconMargin?: string;
  duration?: string;
  borderWidth?: string;
  textAlign?: string;
  isHover: boolean;
  textSize?: string;
  borderColor?: string;
  fontWeight?: string;
}

export default function Dropdown({
  variant,
  ...props
}: {
  variant?: IVariant;
  props: IProps;
}) {
  const defaultVariant: IVariant = {
    color: 'bg-primary',
    padding: 'px-5 py-2.5',
    fontWeight: 'font-normal',
    textColor: 'text-white',
    borderRadius: 'rounded-lg',
    iconMargin: 'mr-2',
    duration: 'duration-300',
    textAlign: 'text-left',
    textSize: 'text-xs',
    borderWidth: 'border',
    borderColor: 'border-black',
    isHover: true,
  };

  const mergedVariant = { ...defaultVariant, ...variant };

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${mergedVariant.textColor} ${mergedVariant.borderColor} ${
          mergedVariant.isHover ? 'hover:bg-hover hover:text-primary' : ''
        } ${mergedVariant.borderWidth} ${mergedVariant.color} ${
          mergedVariant.borderRadius
        } ${mergedVariant.fontWeight} ${mergedVariant.padding} ${
          mergedVariant.duration
        } focus:outline-none`}
        type='button'
      >
        <div className='flex items-center text-center'>
          {props.props.text}
          {isOpen ? (
            <FontAwesomeIcon icon={faChevronUp} className='w-2.5 h-2.5 ms-3' />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              className='w-2.5 h-2.5 ms-3'
            />
          )}
        </div>
      </button>
      <div
        className={`z-10 ${
          !isOpen && 'hidden'
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute`}
      >
        <ul className='py-2 text-sm text-gray-700 max-h-64 overflow-y-auto'>
          {props.props.list.map((item, index) => (
            <li key={index}>
              <div
                onClick={() => {
                  props.props.onSelectItem(item);
                  setIsOpen(false);
                }}
                className='block px-4 py-2 hover:bg-gray-100 cursor-pointer'
              >
                {item}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
