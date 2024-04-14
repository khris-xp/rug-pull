import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  onClick?: () => void;
  text?: string;
  icon?: IconProp;
  type: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
}

interface IVariant {
  color?: string;
  padding: string;
  hoverColor?: string;
  fontSize: string;
  fontWeight: string;
  textColor: string;
  hoverTextColor: string;
  borderRadius: string;
  iconMargin?: string;
  duration?: string;
}

export default function Button({
  variant,
  ...props
}: {
  variant?: IVariant;
  props: IProps;
}) {
  const defaultVariant: IVariant = {
    color: 'primary',
    padding: 'px-5 py-2.5',
    hoverColor: 'red-900',
    fontSize: 'text-sm',
    fontWeight: 'font-normal',
    textColor: 'black',
    hoverTextColor: 'white',
    borderRadius: 'rounded-lg',
    iconMargin: 'mr-2',
    duration: 'duration-300',
  };

  const mergedVariant = { ...defaultVariant, ...variant };

  return (
    <button
      onClick={props.props.onClick}
      type={props.props.type === 'submit' ? 'submit' : 'button'}
      className={`text-${mergedVariant.textColor} bg-${mergedVariant.color} hover:bg-[#FF6C22] ${mergedVariant.borderRadius} ${mergedVariant.fontSize} ${mergedVariant.fontWeight} ${mergedVariant.padding} ${mergedVariant.duration} focus:outline-none`}
      disabled={props.props.disabled}
    >
      <div className='flex items-center'>
        {props.props.icon && (
          <FontAwesomeIcon
            icon={props.props.icon}
            className={`${mergedVariant.iconMargin} h-4 w-4`}
          />
        )}
        {props.props.text}
      </div>
    </button>
  );
}
